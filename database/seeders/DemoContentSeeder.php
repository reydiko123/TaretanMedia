<?php

namespace Database\Seeders;

use App\Models\Article;
use App\Models\Author;
use App\Models\Book;
use App\Models\Category;
use App\Models\Journal;
use App\Models\Service;
use Illuminate\Database\Seeder;

/**
 * Demo content for local/testing/staging only. Never seeded in production
 * (guarded by DatabaseSeeder). See plan §12 / Q10-B.
 */
class DemoContentSeeder extends Seeder
{
    public function run(): void
    {
        $authors = Author::factory()->count(6)->create();

        $bookCategories = Category::factory()->book()->count(4)->create();
        $journalCategories = Category::factory()->journal()->count(3)->create();
        $articleCategories = Category::factory()->article()->count(3)->create();

        // Books: mix of published/draft, multi-author with ordering, multi-category.
        Book::factory()->count(8)->published()->create()->each(function (Book $book) use ($authors, $bookCategories): void {
            $picked = $authors->random(rand(1, 3))->values();
            $book->authors()->attach(
                $picked->mapWithKeys(fn ($author, $i) => [$author->id => ['sort_order' => $i]])->all()
            );
            $book->categories()->attach($bookCategories->random(rand(1, 2))->pluck('id')->all());
        });

        Book::factory()->count(3)->create()->each(function (Book $book) use ($authors, $bookCategories): void {
            $book->authors()->attach([$authors->random()->id => ['sort_order' => 0]]);
            $book->categories()->attach($bookCategories->random()->id);
        });

        // Journals.
        Journal::factory()->count(6)->published()->create()->each(function (Journal $journal) use ($journalCategories): void {
            $journal->categories()->attach($journalCategories->random(rand(1, 2))->pluck('id')->all());
        });
        Journal::factory()->count(2)->create();

        // Articles (rich body), tied to an author.
        Article::factory()->count(7)->published()->create()->each(function (Article $article) use ($articleCategories): void {
            $article->categories()->attach($articleCategories->random(rand(1, 2))->pluck('id')->all());
        });
        Article::factory()->count(2)->create();

        // Services with fixed Rupiah prices.
        Service::factory()->count(4)->create();
        Service::factory()->inactive()->count(1)->create();
    }
}
