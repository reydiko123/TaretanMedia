<?php

namespace App\Data\Public;

use App\Models\Article;
use App\Models\Book;
use App\Models\Category;
use App\Models\Journal;
use App\Models\Service;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Storage;

final class PublicPropsMapper
{
    /** @return array{name: string, slug: string} */
    public static function category(Category $category): array
    {
        return ['name' => $category->name, 'slug' => $category->slug];
    }

    /** @return array<string, mixed> */
    public static function book(Book $book, bool $detail = false): array
    {
        $data = [
            'title' => $book->title,
            'slug' => $book->slug,
            'coverUrl' => self::media($book->cover_path),
            'authors' => $book->authors->pluck('name')->values()->all(),
            'categories' => $book->categories->map(self::category(...))->values()->all(),
            'price' => $book->price,
            'formattedPrice' => 'Rp '.number_format($book->price, 0, ',', '.'),
            'publicationYear' => $book->publication_year,
        ];

        if ($detail) {
            $data += [
                'isbn' => $book->isbn_display,
                'publisher' => $book->publisher,
                'pageCount' => $book->page_count,
                'synopsis' => $book->synopsis,
                'tableOfContents' => $book->table_of_contents,
                'publishedAt' => $book->published_at?->toIso8601String(),
            ];
        }

        return $data;
    }

    /** @return array<string, mixed> */
    public static function journal(Journal $journal, bool $detail = false): array
    {
        $data = [
            'title' => $journal->title,
            'slug' => $journal->slug,
            'coverUrl' => self::media($journal->cover_path),
            'theme' => $journal->theme,
            'editionLabel' => $journal->edition_label,
            'publicationYear' => $journal->publication_year,
            'categories' => $journal->categories->map(self::category(...))->values()->all(),
        ];

        if ($detail) {
            $data += [
                'description' => $journal->description,
                'externalUrl' => $journal->external_url,
                'publishedAt' => $journal->published_at?->toIso8601String(),
            ];
        }

        return $data;
    }

    /** @return array<string, mixed> */
    public static function article(Article $article, bool $detail = false): array
    {
        $data = [
            'title' => $article->title,
            'slug' => $article->slug,
            'excerpt' => $article->excerpt,
            'featuredImageUrl' => self::media($article->featured_image_path),
            'author' => ['name' => $article->author->name],
            'categories' => $article->categories->map(self::category(...))->values()->all(),
            'publishedAt' => $article->published_at?->toIso8601String(),
        ];

        if ($detail) {
            $data['bodyHtml'] = $article->body;
        }

        return $data;
    }

    /** @return array<string, mixed> */
    public static function service(Service $service): array
    {
        return [
            'name' => $service->name,
            'slug' => $service->slug,
            'summary' => $service->summary,
            'description' => $service->description,
            'features' => array_values(array_filter($service->features ?? [], 'is_string')),
            'ctaLabel' => $service->cta_label,
        ];
    }

    /**
     * @param  LengthAwarePaginator<int, mixed>  $paginator
     * @param  callable(mixed): array<string, mixed>  $mapper
     * @return array<string, mixed>
     */
    public static function pagination(LengthAwarePaginator $paginator, callable $mapper): array
    {
        return [
            'data' => collect($paginator->items())->map($mapper)->values()->all(),
            'currentPage' => $paginator->currentPage(),
            'lastPage' => $paginator->lastPage(),
            'perPage' => $paginator->perPage(),
            'total' => $paginator->total(),
            'from' => $paginator->firstItem(),
            'to' => $paginator->lastItem(),
            'links' => collect($paginator->linkCollection())->map(static fn (array $link): array => [
                'url' => $link['url'],
                'label' => html_entity_decode((string) $link['label']),
                'active' => (bool) $link['active'],
            ])->all(),
        ];
    }

    private static function media(?string $path): ?string
    {
        return filled($path) ? Storage::disk('public')->url($path) : null;
    }
}
