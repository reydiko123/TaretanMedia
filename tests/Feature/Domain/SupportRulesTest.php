<?php

namespace Tests\Feature\Domain;

use App\Enums\CategoryType;
use App\Models\Article;
use App\Models\Book;
use App\Models\Category;
use App\Rules\CategoryMatchesType;
use App\Rules\HttpsUrl;
use App\Support\SlugGenerator;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Validator;
use Tests\TestCase;

class SupportRulesTest extends TestCase
{
    use RefreshDatabase;

    public function test_slug_generator_handles_collision_including_trashed(): void
    {
        Book::factory()->create(['title' => 'Sample Title', 'slug' => 'sample-title']);
        $second = SlugGenerator::unique(Book::class, 'Sample Title');
        $this->assertSame('sample-title-2', $second);

        // Trashed rows still count.
        $book = Book::factory()->create(['title' => 'Gone', 'slug' => 'gone']);
        $book->delete();
        $this->assertSame('gone-2', SlugGenerator::unique(Book::class, 'Gone'));
    }

    public function test_https_url_rule(): void
    {
        $this->assertTrue($this->passes(['url' => 'https://example.org'], ['url' => [new HttpsUrl]]));
        $this->assertFalse($this->passes(['url' => 'http://example.org'], ['url' => [new HttpsUrl]]));
        $this->assertFalse($this->passes(['url' => 'not-a-url'], ['url' => [new HttpsUrl]]));
    }

    public function test_category_matches_type_rule_rejects_cross_type(): void
    {
        $bookCat = Category::factory()->book()->create();
        $journalCat = Category::factory()->journal()->create();

        $rule = new CategoryMatchesType(CategoryType::Book);

        $this->assertTrue($this->passes(['ids' => [$bookCat->id]], ['ids' => [$rule]]));
        $this->assertFalse($this->passes(['ids' => [$bookCat->id, $journalCat->id]], ['ids' => [$rule]]));
    }

    public function test_article_html_is_sanitized_before_persistence(): void
    {
        $article = Article::factory()->create([
            'body' => <<<'HTML'
                <h2>Judul aman</h2>
                <p onclick="alert('xss')">Isi <strong>penting</strong></p>
                <a href="javascript:alert('xss')">Tautan jahat</a>
                <script>alert('xss')</script>
                <iframe src="https://example.org"></iframe>
                HTML,
        ]);

        $stored = $article->fresh()->body;

        $this->assertStringContainsString('<h2>Judul aman</h2>', $stored);
        $this->assertStringContainsString('<strong>penting</strong>', $stored);
        $this->assertStringNotContainsString('<script', $stored);
        $this->assertStringNotContainsString('<iframe', $stored);
        $this->assertStringNotContainsString('onclick=', $stored);
        $this->assertStringNotContainsString('javascript:', $stored);
    }

    private function passes(array $data, array $rules): bool
    {
        return Validator::make($data, $rules)->passes();
    }
}
