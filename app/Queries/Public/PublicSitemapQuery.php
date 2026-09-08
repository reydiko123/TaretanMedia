<?php

namespace App\Queries\Public;

use App\Models\Article;
use App\Models\Book;
use App\Models\Journal;
use Carbon\CarbonInterface;
use Illuminate\Support\Collection;

final class PublicSitemapQuery
{
    /** @return list<array{loc: string, lastmod: string|null}> */
    public function get(): array
    {
        /** @var Collection<int, array{loc: string, lastmod: string|null}> $urls */
        $urls = collect([
            ['loc' => route('home'), 'lastmod' => null],
            ['loc' => route('profile'), 'lastmod' => null],
            ['loc' => route('services.index'), 'lastmod' => null],
            ['loc' => route('contact'), 'lastmod' => null],
            ['loc' => route('books.index'), 'lastmod' => null],
            ['loc' => route('journals.index'), 'lastmod' => null],
            ['loc' => route('articles.index'), 'lastmod' => null],
        ]);

        Book::query()->published()->get(['slug', 'updated_at'])->each(function (Book $book) use ($urls): void {
            $urls->push($this->entry('books.show', $book->slug, $book->getAttribute('updated_at')));
        });
        Journal::query()->published()->get(['slug', 'updated_at'])->each(function (Journal $journal) use ($urls): void {
            $urls->push($this->entry('journals.show', $journal->slug, $journal->getAttribute('updated_at')));
        });
        Article::query()->published()->get(['slug', 'updated_at'])->each(function (Article $article) use ($urls): void {
            $urls->push($this->entry('articles.show', $article->slug, $article->getAttribute('updated_at')));
        });

        return array_values($urls->all());
    }

    /** @return array{loc: string, lastmod: string|null} */
    private function entry(string $route, string $slug, mixed $updatedAt): array
    {
        return [
            'loc' => route($route, $slug),
            'lastmod' => $updatedAt instanceof CarbonInterface ? $updatedAt->toAtomString() : null,
        ];
    }
}
