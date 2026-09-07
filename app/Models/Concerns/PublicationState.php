<?php

namespace App\Models\Concerns;

use App\Enums\PublicationStatus;
use App\Models\Article;
use App\Models\Book;
use App\Models\Journal;
use Illuminate\Support\Carbon;

/**
 * Enforces the publication-state invariant (plan §5.12, rule #9):
 * a published record must have a published_at timestamp. When publishing
 * without one, default to now(); returning to draft preserves published_at.
 */
class PublicationState
{
    public static function apply(Book|Journal|Article $model): void
    {
        if ($model->status === PublicationStatus::Published && $model->published_at === null) {
            $model->published_at = Carbon::now();
        }
    }
}
