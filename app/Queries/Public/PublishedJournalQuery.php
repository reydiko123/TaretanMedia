<?php

namespace App\Queries\Public;

use App\Models\Journal;

final class PublishedJournalQuery
{
    public function find(string $slug): Journal
    {
        return Journal::query()
            ->published()
            ->with('categories:id,name,slug')
            ->where('slug', $slug)
            ->where('external_url', 'like', 'https://%')
            ->firstOrFail();
    }
}
