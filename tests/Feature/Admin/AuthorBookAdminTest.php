<?php

namespace Tests\Feature\Admin;

use App\Filament\Resources\Articles\Pages\CreateArticle;
use App\Filament\Resources\Articles\Pages\EditArticle;
use App\Filament\Resources\Authors\Pages\EditAuthor;
use App\Filament\Resources\Authors\Pages\ListAuthors;
use App\Filament\Resources\Books\Pages\CreateBook;
use App\Filament\Resources\Books\Pages\EditBook;
use App\Filament\Resources\Books\RelationManagers\AuthorsRelationManager;
use App\Models\Admin;
use App\Models\Article;
use App\Models\Author;
use App\Models\Book;
use Filament\Actions\AttachAction;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\Testing\TestAction;
use Filament\Facades\Filament;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Select;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Livewire\Livewire;
use Tests\TestCase;

class AuthorBookAdminTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        if (! extension_loaded('intl')) {
            $this->markTestSkipped('Filament table rendering requires the ext-intl runtime dependency.');
        }

        $this->actingAs(Admin::create([
            'username' => 'author-admin',
            'password' => Hash::make('secret-password'),
        ]), 'admin');

        Filament::setCurrentPanel('admin');
    }

    public function test_create_book_form_attaches_authors_with_sort_order(): void
    {
        $first = Author::factory()->create();
        $second = Author::factory()->create();
        $undoRepeaterFake = Repeater::fake();

        Livewire::test(CreateBook::class)
            ->fillForm([
                'title' => 'Buku Dengan Penulis',
                'price' => 50000,
                'status' => 'draft',
                'author_entries' => [
                    ['author_id' => $second->id, 'sort_order' => 0],
                    ['author_id' => $first->id, 'sort_order' => 1],
                ],
            ])
            ->call('create')
            ->assertHasNoFormErrors();

        $undoRepeaterFake();

        $book = Book::query()->where('title', 'Buku Dengan Penulis')->firstOrFail();

        $this->assertSame([$second->id, $first->id], $book->authors->pluck('id')->all());
        $this->assertSame([0, 1], $book->authors->pluck('pivot.sort_order')->map(fn ($order): int => (int) $order)->all());
    }

    public function test_create_book_form_rejects_duplicate_authors(): void
    {
        $author = Author::factory()->create();
        $undoRepeaterFake = Repeater::fake();

        Livewire::test(CreateBook::class)
            ->fillForm([
                'title' => 'Buku Penulis Ganda',
                'price' => 0,
                'status' => 'draft',
                'author_entries' => [
                    ['author_id' => $author->id, 'sort_order' => 0],
                    ['author_id' => $author->id, 'sort_order' => 1],
                ],
            ])
            ->call('create')
            ->assertHasFormErrors(['author_entries.0.author_id', 'author_entries.1.author_id']);

        $undoRepeaterFake();

        $this->assertDatabaseMissing('books', ['title' => 'Buku Penulis Ganda']);
    }

    public function test_author_pickers_hide_soft_deleted_authors(): void
    {
        $active = Author::factory()->create();
        $trashed = Author::factory()->create();
        $trashed->delete();
        $book = Book::factory()->create();

        $assertOnlyActive = function (Select $field) use ($active, $trashed): bool {
            $options = $field->getOptions();

            return array_key_exists($active->id, $options) && ! array_key_exists($trashed->id, $options);
        };

        Livewire::test(CreateArticle::class)
            ->assertFormFieldExists('author_id', $assertOnlyActive);

        $undoRepeaterFake = Repeater::fake();
        Livewire::test(CreateBook::class)
            ->assertFormFieldExists('author_entries.0.author_id', $assertOnlyActive);
        $undoRepeaterFake();

        Livewire::test(AuthorsRelationManager::class, ['ownerRecord' => $book, 'pageClass' => EditBook::class])
            ->mountAction(TestAction::make(AttachAction::class)->table())
            ->assertFormFieldExists('recordId', $assertOnlyActive);

        Livewire::test(ListAuthors::class)
            ->filterTable('trashed', false)
            ->assertCanSeeTableRecords([$trashed]);
    }

    public function test_article_with_soft_deleted_author_can_still_be_edited(): void
    {
        $other = Author::factory()->create();
        $other->delete();
        $author = Author::factory()->create();
        $article = Article::factory()->published()->create(['author_id' => $author->id]);
        $author->delete();

        Livewire::test(EditArticle::class, ['record' => $article->getRouteKey()])
            ->assertFormFieldExists('author_id', fn (Select $field): bool => array_key_exists($author->id, $field->getOptions())
                && ! array_key_exists($other->id, $field->getOptions()))
            ->fillForm(['title' => 'Judul Diperbarui'])
            ->call('save')
            ->assertHasNoFormErrors();

        $this->assertSame('Judul Diperbarui', $article->fresh()->title);
    }

    public function test_author_with_works_cannot_be_soft_deleted(): void
    {
        $withBook = Author::factory()->create();
        $withBook->books()->attach(Book::factory()->create());
        $withArticle = Author::factory()->create();
        Article::factory()->create(['author_id' => $withArticle->id]);

        Livewire::test(ListAuthors::class)
            ->callAction(TestAction::make(DeleteAction::class)->table($withBook))
            ->assertNotified('Penulis tidak dapat dihapus');

        Livewire::test(EditAuthor::class, ['record' => $withArticle->getRouteKey()])
            ->callAction(DeleteAction::class)
            ->assertNotified('Penulis tidak dapat dihapus');

        $this->assertNotSoftDeleted($withBook);
        $this->assertNotSoftDeleted($withArticle);
    }

    public function test_bulk_delete_is_cancelled_when_any_author_has_works(): void
    {
        $free = Author::factory()->create();
        $withBook = Author::factory()->create();
        $withBook->books()->attach(Book::factory()->create());

        Livewire::test(ListAuthors::class)
            ->selectTableRecords([$free, $withBook])
            ->callAction(TestAction::make(DeleteBulkAction::class)->table()->bulk())
            ->assertNotified('Penulis tidak dapat dihapus');

        $this->assertNotSoftDeleted($free);
        $this->assertNotSoftDeleted($withBook);
    }

    public function test_author_without_works_can_be_soft_deleted(): void
    {
        $author = Author::factory()->create();
        $trashedBook = Book::factory()->create();
        $author->books()->attach($trashedBook);
        $trashedBook->delete();

        Livewire::test(ListAuthors::class)
            ->callAction(TestAction::make(DeleteAction::class)->table($author));

        $this->assertSoftDeleted($author);
    }
}
