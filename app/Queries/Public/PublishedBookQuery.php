<?php

namespace App\Queries\Public;

use App\Models\Book;

final class PublishedBookQuery
{
    public function find(string $slug): Book
    {
        return Book::query()
            ->published()
            ->with(['authors:id,name,about', 'categories:id,name,slug'])
            ->where('slug', $slug)
            ->firstOrFail();
    }
}
