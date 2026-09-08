<?php

namespace App\Queries\Public;

use App\Data\Public\CatalogFilters;
use App\Enums\CategoryType;
use App\Models\Article;
use App\Models\Category;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

final class ArticleCatalogQuery
{
    private const PER_PAGE = 12;

    /** @return array<string, mixed> */
    public function get(Request $request): array
    {
        $filters = CatalogFilters::fromRequest($request, ['newest', 'oldest', 'title_asc', 'title_desc']);
        $categories = Category::query()->where('type', CategoryType::Article->value)->orderBy('name')->get(['id', 'name', 'slug']);
        if ($filters->category !== null && ! $categories->contains('slug', $filters->category)) {
            $filters = $filters->withoutCategory();
        }

        $query = Article::query()
            ->published()
            ->with(['author:id,name', 'categories:id,name,slug'])
            ->when($filters->search !== '', function (Builder $query) use ($filters): void {
                $search = '%'.$filters->search.'%';
                $query->where(fn (Builder $query) => $query->where('title', 'like', $search)
                    ->orWhere('excerpt', 'like', $search)
                    ->orWhereHas('author', fn (Builder $author) => $author->where('name', 'like', $search)));
            })
            ->when($filters->category, fn (Builder $query, string $slug) => $query->whereHas(
                'categories',
                fn (Builder $categories) => $categories->where('slug', $slug)->where('type', CategoryType::Article->value),
            ));

        match ($filters->sort) {
            'oldest' => $query->oldest('published_at'),
            'title_asc' => $query->orderBy('title'),
            'title_desc' => $query->orderByDesc('title'),
            default => $query->latest('published_at'),
        };

        $articles = $query->paginate(self::PER_PAGE, ['*'], 'page', $filters->page)->appends($filters->query());

        return compact('articles', 'categories', 'filters');
    }
}
