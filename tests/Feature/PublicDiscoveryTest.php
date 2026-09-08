<?php

namespace Tests\Feature;

use App\Models\Article;
use App\Models\Author;
use App\Models\Book;
use App\Models\Category;
use App\Models\Journal;
use App\Models\Service;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Route;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class PublicDiscoveryTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        $this->withoutVite();
    }

    public function test_informational_routes_expose_public_safe_shared_props(): void
    {
        config()->set('taretan.admin.password', 'never-share-this');
        config()->set('taretan.contact_email', 'halo@example.test');
        config()->set('taretan.whatsapp_number', '628123456789');

        foreach ([
            ['/', 'home'],
            ['/profil', 'profile'],
            ['/layanan', 'services/index'],
            ['/kontak', 'contact'],
        ] as [$uri, $component]) {
            $this->get($uri)
                ->assertOk()
                ->assertInertia(fn (Assert $page) => $page
                    ->component($component)
                    ->where('site.contact.email', 'halo@example.test')
                    ->where('site.contact.whatsappConfigured', true)
                    ->has('navigation', 8)
                    ->missing('site.admin')
                    ->missing('admin'));
        }
    }

    public function test_home_and_services_only_expose_visible_ordered_content(): void
    {
        $published = Book::factory()->published()->featured()->create(['title' => 'Published']);
        Book::factory()->create(['title' => 'Draft']);
        Book::factory()->published()->create(['title' => 'Future', 'published_at' => now()->addDay()]);
        Service::factory()->create(['name' => 'Second', 'sort_order' => 2]);
        Service::factory()->create(['name' => 'First', 'sort_order' => 1]);
        Service::factory()->inactive()->create(['name' => 'Hidden']);

        $this->get('/')
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->where('books.0.slug', $published->slug)
                ->has('books', 1)
                ->where('services.0.name', 'First')
                ->where('services.1.name', 'Second')
                ->has('services', 2));

        $this->get('/layanan')->assertInertia(fn (Assert $page) => $page
            ->where('services.0.name', 'First')
            ->where('services.1.name', 'Second')
            ->has('services', 2));
    }

    public function test_book_catalog_applies_filters_sorting_pagination_and_normalization(): void
    {
        $author = Author::factory()->create(['name' => 'Siti Penulis']);
        $category = Category::factory()->book()->create(['name' => 'Sastra', 'slug' => 'sastra']);
        $matching = Book::factory()->published()->create([
            'title' => 'Buku Pilihan',
            'price' => 75_000,
            'publication_year' => 2025,
        ]);
        $matching->authors()->attach($author, ['sort_order' => 0]);
        $matching->categories()->attach($category);
        Book::factory()->published()->create(['title' => 'Tidak Cocok', 'price' => 10_000]);
        Book::factory()->create(['title' => 'Siti Draft']);

        $this->get('/buku?q=++Siti+++Penulis++&category=sastra&min_price=50000&max_price=100000&year=2025&sort=price_desc&unknown=secret')
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('books/index')
                ->has('books.data', 1)
                ->where('books.data.0.slug', $matching->slug)
                ->where('books.data.0.formattedPrice', 'Rp 75.000')
                ->where('filters.search', 'Siti Penulis')
                ->where('filters.category', 'sastra')
                ->where('filters.minPrice', 50000)
                ->where('filters.maxPrice', 100000)
                ->where('filters.year', 2025)
                ->where('filters.sort', 'price_desc'));

        $this->get('/buku?category=invalid&min_price=100&max_price=1&year=nope&sort=invalid&page=-2')
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->where('filters.category', null)
                ->where('filters.minPrice', null)
                ->where('filters.maxPrice', null)
                ->where('filters.year', null)
                ->where('filters.sort', 'newest')
                ->where('books.currentPage', 1));
    }

    public function test_book_detail_preserves_author_order_and_hides_unpublished_content(): void
    {
        $book = Book::factory()->published()->create([
            'isbn_display' => '978-602-000-000-1',
            'price' => 99_000,
        ]);
        $second = Author::factory()->create(['name' => 'Penulis Kedua']);
        $first = Author::factory()->create(['name' => 'Penulis Pertama']);
        $book->authors()->attach([
            $second->id => ['sort_order' => 2],
            $first->id => ['sort_order' => 1],
        ]);

        $this->get('/buku/'.$book->slug)
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('books/show')
                ->where('book.authors', ['Penulis Pertama', 'Penulis Kedua'])
                ->where('book.isbn', '978-602-000-000-1')
                ->where('book.formattedPrice', 'Rp 99.000')
                ->where('seo.canonicalUrl', route('books.show', $book->slug)));

        $draft = Book::factory()->create();
        $future = Book::factory()->published()->create(['published_at' => now()->addDay()]);
        $deleted = Book::factory()->published()->create();
        $deleted->delete();

        foreach ([$draft, $future, $deleted] as $hidden) {
            $this->get('/buku/'.$hidden->slug)->assertNotFound();
        }
    }

    public function test_journal_and_article_catalogs_and_details_are_publication_safe(): void
    {
        $journal = Journal::factory()->published()->create(['title' => 'Jurnal Aman']);
        Journal::factory()->create(['title' => 'Jurnal Draft']);
        $article = Article::factory()->published()->create([
            'title' => 'Artikel Aman',
            'body' => '<p>Aman</p><script>alert(1)</script>',
        ]);
        $draftArticle = Article::factory()->create();

        $this->get('/jurnal?q=aman')->assertInertia(fn (Assert $page) => $page
            ->has('journals.data', 1)
            ->where('journals.data.0.slug', $journal->slug));
        $this->get('/jurnal/'.$journal->slug)->assertInertia(fn (Assert $page) => $page
            ->where('journal.externalUrl', $journal->external_url));

        $this->get('/artikel?q=aman')->assertInertia(fn (Assert $page) => $page
            ->has('articles.data', 1)
            ->where('articles.data.0.slug', $article->slug));
        $this->get('/artikel/'.$article->slug)->assertInertia(fn (Assert $page) => $page
            ->where('article.bodyHtml', fn (string $body) => ! str_contains($body, '<script')));
        $this->get('/artikel/'.$draftArticle->slug)->assertNotFound();
    }

    public function test_sitemap_and_robots_only_advertise_public_urls(): void
    {
        $book = Book::factory()->published()->create();
        $draft = Book::factory()->create();

        $this->get('/sitemap.xml')
            ->assertOk()
            ->assertHeader('Content-Type', 'application/xml; charset=UTF-8')
            ->assertSee(route('books.show', $book->slug), escape: false)
            ->assertDontSee(route('books.show', $draft->slug), escape: false)
            ->assertDontSee('/admin');

        $this->get('/robots.txt')
            ->assertOk()
            ->assertHeader('Content-Type', 'text/plain; charset=UTF-8')
            ->assertSee('Disallow: /admin')
            ->assertSee('Sitemap: '.route('sitemap'));
    }

    public function test_missing_public_route_uses_generic_inertia_404(): void
    {
        $this->get('/tidak-ada')
            ->assertNotFound()
            ->assertInertia(fn (Assert $page) => $page
                ->component('errors/404')
                ->where('status', 404)
                ->where('seo.canonicalUrl', route('home'))
                ->where('seo.openGraph.type', 'website')
                ->where('seo.openGraph.url', route('home'))
                ->missing('exception'));
    }

    public function test_server_error_uses_generic_inertia_500_contract(): void
    {
        Route::get('/uji-error-public-discovery', static function (): never {
            throw new RuntimeException('secret exception detail');
        });

        $this->get('/uji-error-public-discovery')
            ->assertStatus(500)
            ->assertInertia(fn (Assert $page) => $page
                ->component('errors/500')
                ->where('status', 500)
                ->where('seo.canonicalUrl', route('home'))
                ->where('seo.openGraph.type', 'website')
                ->where('seo.openGraph.url', route('home'))
                ->missing('exception'));
    }
}
