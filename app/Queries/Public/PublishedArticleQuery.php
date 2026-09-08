<?php

namespace App\Queries\Public;

use App\Models\Article;

final class PublishedArticleQuery
{
    public function find(string $slug): Article
    {
        return Article::query()->published()->with(['author:id,name', 'categories:id,name,slug'])->where('slug', $slug)->firstOrFail();
    }
}
