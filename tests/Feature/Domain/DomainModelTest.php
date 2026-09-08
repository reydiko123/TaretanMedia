<?php

namespace Tests\Feature\Domain;

use App\Enums\PublicationStatus;
use App\Models\Article;
use App\Models\Author;
use App\Models\Book;
use App\Models\Category;
use Illuminate\Database\QueryException;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class DomainModelTest extends TestCase
{
    use RefreshDatabase;

    public function test_published_scope_excludes_draft_trashed_and_future(): void
    {
        Book::factory()->published()->create();
        Book::factory()->create(); // draft
        Book::factory()->published()->create(['published_at' => now()->addDay()]); // future
        $trashed = Book::factory()->published()->create();
        $trashed->delete();

        $this->assertSame(1, Book::published()->count());
    }

    public function test_publication_invariant_auto_fills_published_at(): void
    {
        $book = Book::create([
            'title' => 'Publish Me',
            'status' => PublicationStatus::Published->value,
            'price' => 1000,
        ]);

        $this->assertNotNull($book->published_at);
    }

    public function test_isbn_display_is_preserved_while_isbn_is_normalized(): void
    {
        $book = Book::factory()->create(['isbn_display' => '978-0-13-468599-1']);
        $this->assertSame('9780134685991', $book->isbn);
        $this->assertSame('978-0-13-468599-1', $book->isbn_display);

        $book2 = Book::factory()->create(['isbn_display' => '']);
        $this->assertNull($book2->isbn);
        $this->assertNull($book2->isbn_display);
    }

    public function test_multiple_isbn_null_allowed_but_duplicate_rejected(): void
    {
        Book::factory()->create(['isbn_display' => null]);
        Book::factory()->create(['isbn_display' => null]);
        Book::factory()->create(['isbn_display' => '978-602-4451-04-8']);

        $this->expectException(QueryException::class);
        Book::factory()->create(['isbn_display' => '9786024451048']);
    }

    public function test_price_negative_rejected_by_check(): void
    {
        $this->expectException(QueryException::class);
        Book::factory()->create(['price' => -1]);
    }

    public function test_price_cast_is_integer(): void
    {
        $book = Book::factory()->create(['price' => 85000]);
        $this->assertIsInt($book->fresh()->price);
    }

    public function test_book_authors_are_ordered_by_sort_order(): void
    {
        $book = Book::factory()->create();
        $a1 = Author::factory()->create(['name' => 'Second']);
        $a2 = Author::factory()->create(['name' => 'First']);
        $book->authors()->attach([$a1->id => ['sort_order' => 1], $a2->id => ['sort_order' => 0]]);

        $this->assertSame(['First', 'Second'], $book->authors->pluck('name')->all());
    }

    public function test_article_author_cannot_be_force_deleted_when_referenced(): void
    {
        $author = Author::factory()->create();
        Article::factory()->create(['author_id' => $author->id]);

        $this->expectException(QueryException::class);
        $author->forceDelete();
    }

    public function test_force_delete_removes_cover_file(): void
    {
        Storage::fake('public');
        Storage::disk('public')->put('books/cover.jpg', 'x');
        $book = Book::factory()->create(['cover_path' => 'books/cover.jpg']);

        $book->forceDelete();

        Storage::disk('public')->assertMissing('books/cover.jpg');
    }

    public function test_soft_delete_keeps_cover_file_and_pivots(): void
    {
        Storage::fake('public');
        Storage::disk('public')->put('books/cover.jpg', 'x');
        $book = Book::factory()->create(['cover_path' => 'books/cover.jpg']);
        $cat = Category::factory()->book()->create();
        $book->categories()->attach($cat->id);

        $book->delete();

        Storage::disk('public')->assertExists('books/cover.jpg');
        $this->assertDatabaseHas('book_category', ['book_id' => $book->id, 'category_id' => $cat->id]);
    }

    public function test_pivot_composite_unique_rejects_duplicate(): void
    {
        $book = Book::factory()->create();
        $cat = Category::factory()->book()->create();
        $book->categories()->attach($cat->id);

        $this->expectException(QueryException::class);
        $book->categories()->attach($cat->id);
    }

    public function test_factories_and_relations_are_valid(): void
    {
        $article = Article::factory()->published()->create();
        $this->assertInstanceOf(Author::class, $article->author);
        $this->assertNotNull($article->slug);
    }
}
