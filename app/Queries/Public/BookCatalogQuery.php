<?php

namespace App\Queries\Public;

use App\Data\Public\CatalogFilters;
use App\Enums\CategoryType;
use App\Models\Book;
use App\Models\Category;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

final class BookCatalogQuery
{
    private const PER_PAGE = 12;

    /** @return array<string, mixed> */
    public function get(Request $request): array
    {
        $filters = CatalogFilters::fromRequest($request, [
            'newest', 'oldest', 'title_asc', 'title_desc', 'price_asc', 'price_desc',
        ], books: true);

        $categories = Category::query()->where('type', CategoryType::Book->value)->orderBy('name')->get(['id', 'name', 'slug']);
        if ($filters->category !== null && ! $categories->contains('slug', $filters->category)) {
            $filters = $filters->withoutCategory();
        }

        $query = Book::query()
            ->published()
            ->with(['authors:id,name', 'categories:id,name,slug'])
            ->when($filters->search !== '', function (Builder $query) use ($filters): void {
                $search = '%'.$filters->search.'%';
                $query->where(function (Builder $query) use ($search): void {
                    $query->where('title', 'like', $search)
                        ->orWhere('isbn', 'like', $search)
                        ->orWhere('isbn_display', 'like', $search)
                        ->orWhere('publisher', 'like', $search)
                        ->orWhereHas('authors', fn (Builder $authors) => $authors->where('name', 'like', $search));
                });
            })
            ->when($filters->category, fn (Builder $query, string $slug) => $query->whereHas(
                'categories',
                fn (Builder $categories) => $categories->where('slug', $slug)->where('type', CategoryType::Book->value),
            ))
            ->when($filters->minPrice !== null, fn (Builder $query) => $query->where('price', '>=', $filters->minPrice))
            ->when($filters->maxPrice !== null, fn (Builder $query) => $query->where('price', '<=', $filters->maxPrice))
            ->when($filters->year !== null, fn (Builder $query) => $query->where('publication_year', $filters->year));

        match ($filters->sort) {
            'oldest' => $query->oldest('published_at'),
            'title_asc' => $query->orderBy('title'),
            'title_desc' => $query->orderByDesc('title'),
            'price_asc' => $query->orderBy('price'),
            'price_desc' => $query->orderByDesc('price'),
            default => $query->latest('published_at'),
        };

        $books = $query->paginate(self::PER_PAGE, ['*'], 'page', $filters->page)->appends($filters->query());

        return compact('books', 'categories', 'filters');
    }
}
