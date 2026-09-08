<?php

namespace App\Queries\Public;

use App\Data\Public\CatalogFilters;
use App\Enums\CategoryType;
use App\Models\Category;
use App\Models\Journal;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

final class JournalCatalogQuery
{
    private const PER_PAGE = 12;

    /** @return array<string, mixed> */
    public function get(Request $request): array
    {
        $filters = CatalogFilters::fromRequest($request, [
            'newest', 'oldest', 'title_asc', 'title_desc', 'year_desc', 'year_asc',
        ]);
        $categories = Category::query()->where('type', CategoryType::Journal->value)->orderBy('name')->get(['id', 'name', 'slug']);
        if ($filters->category !== null && ! $categories->contains('slug', $filters->category)) {
            $filters = $filters->withoutCategory();
        }

        $query = Journal::query()
            ->published()
            ->with('categories:id,name,slug')
            ->when($filters->search !== '', function (Builder $query) use ($filters): void {
                $search = '%'.$filters->search.'%';
                $query->where(fn (Builder $query) => $query->where('title', 'like', $search)
                    ->orWhere('theme', 'like', $search)
                    ->orWhere('edition_label', 'like', $search));
            })
            ->when($filters->category, fn (Builder $query, string $slug) => $query->whereHas(
                'categories',
                fn (Builder $categories) => $categories->where('slug', $slug)->where('type', CategoryType::Journal->value),
            ));

        match ($filters->sort) {
            'oldest' => $query->oldest('published_at'),
            'title_asc' => $query->orderBy('title'),
            'title_desc' => $query->orderByDesc('title'),
            'year_desc' => $query->orderByDesc('publication_year'),
            'year_asc' => $query->orderBy('publication_year'),
            default => $query->latest('published_at'),
        };

        $journals = $query->paginate(self::PER_PAGE, ['*'], 'page', $filters->page)->appends($filters->query());

        return compact('journals', 'categories', 'filters');
    }
}
