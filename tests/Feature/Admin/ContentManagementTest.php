<?php

namespace Tests\Feature\Admin;

use App\Models\Admin;
use App\Models\Article;
use App\Models\Author;
use App\Models\Book;
use App\Models\Category;
use App\Models\Journal;
use App\Models\Service;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class ContentManagementTest extends TestCase
{
    use RefreshDatabase;

    public function test_guests_are_redirected_from_content_resources(): void
    {
        foreach ($this->resourceIndexRoutes() as $route) {
            $this->get(route($route))->assertRedirect('/admin/login');
        }
    }

    public function test_admin_can_render_all_content_index_and_create_pages(): void
    {
        $this->requireIntlExtension();
        $this->actingAs($this->admin(), 'admin');

        foreach ($this->resourceIndexRoutes() as $route) {
            $this->get(route($route))->assertOk();
        }

        foreach ($this->resourceCreateRoutes() as $route) {
            $this->get(route($route))->assertOk();
        }
    }

    public function test_admin_can_render_content_view_and_edit_pages(): void
    {
        $this->requireIntlExtension();
        $this->actingAs($this->admin(), 'admin');

        $author = Author::factory()->create();
        $category = Category::factory()->book()->create();
        $book = Book::factory()->create();
        $journal = Journal::factory()->create();
        $article = Article::factory()->create();
        $service = Service::factory()->create();

        $editRoutes = [
            ['filament.admin.resources.authors.edit', $author],
            ['filament.admin.resources.categories.edit', $category],
            ['filament.admin.resources.books.edit', $book],
            ['filament.admin.resources.journals.edit', $journal],
            ['filament.admin.resources.articles.edit', $article],
            ['filament.admin.resources.services.edit', $service],
        ];

        foreach ($editRoutes as [$route, $record]) {
            $this->get(route($route, $record))->assertOk();
        }

        foreach ([
            ['filament.admin.resources.books.view', $book],
            ['filament.admin.resources.journals.view', $journal],
            ['filament.admin.resources.articles.view', $article],
        ] as [$route, $record]) {
            $this->get(route($route, $record))->assertOk();
        }
    }

    public function test_content_policies_allow_admin_and_deny_guests(): void
    {
        $admin = $this->admin();

        foreach ([Author::class, Category::class, Book::class, Journal::class, Article::class, Service::class] as $model) {
            $this->assertTrue(Gate::forUser($admin)->allows('viewAny', $model));
            $this->assertTrue(Gate::forUser($admin)->allows('create', $model));
            $this->assertFalse(Gate::forUser(null)->allows('viewAny', $model));
        }
    }

    /** @return list<string> */
    private function resourceIndexRoutes(): array
    {
        return [
            'filament.admin.resources.authors.index',
            'filament.admin.resources.categories.index',
            'filament.admin.resources.books.index',
            'filament.admin.resources.journals.index',
            'filament.admin.resources.articles.index',
            'filament.admin.resources.services.index',
        ];
    }

    /** @return list<string> */
    private function resourceCreateRoutes(): array
    {
        return [
            'filament.admin.resources.authors.create',
            'filament.admin.resources.categories.create',
            'filament.admin.resources.books.create',
            'filament.admin.resources.journals.create',
            'filament.admin.resources.articles.create',
            'filament.admin.resources.services.create',
        ];
    }

    private function admin(): Admin
    {
        return Admin::create([
            'username' => 'content-admin',
            'password' => Hash::make('secret-password'),
        ]);
    }

    private function requireIntlExtension(): void
    {
        if (! extension_loaded('intl')) {
            $this->markTestSkipped('Filament table rendering requires the ext-intl runtime dependency.');
        }
    }
}
