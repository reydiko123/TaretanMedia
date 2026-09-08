<?php

namespace App\Queries\Public;

use App\Models\Article;
use App\Models\Book;
use App\Models\Journal;

final class HomeDiscoveryQuery
{
    public function __construct(private readonly PublicServiceQuery $services) {}

    /** @return array<string, mixed> */
    public function get(): array
    {
        return [
            'books' => Book::query()->published()->with(['authors:id,name', 'categories:id,name,slug'])->orderByDesc('is_featured')->latest('published_at')->limit(6)->get(),
            'journals' => Journal::query()->published()->with('categories:id,name,slug')->orderByDesc('is_featured')->latest('published_at')->limit(6)->get(),
            'articles' => Article::query()->published()->with(['author:id,name', 'categories:id,name,slug'])->orderByDesc('is_featured')->latest('published_at')->limit(6)->get(),
            'services' => $this->services->get(4),
        ];
    }
}
