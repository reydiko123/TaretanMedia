<?php

namespace App\Models\Concerns;

use App\Enums\PublicationStatus;
use Illuminate\Database\Eloquent\Builder;

/**
 * Centralises the "published" definition so FR-M13 is enforced consistently
 * across Book, Journal, and Article (plan §5.9).
 */
trait HasPublicationState
{
    /**
     * Scope to records that are publicly visible: published status, a
     * published_at timestamp in the past, and (via SoftDeletes) not trashed.
     *
     * @param  Builder<static>  $query
     * @return Builder<static>
     */
    public function scopePublished(Builder $query): Builder
    {
        return $query
            ->where('status', PublicationStatus::Published->value)
            ->whereNotNull('published_at')
            ->where('published_at', '<=', now());
    }

    /**
     * Whether the record is currently publicly visible.
     */
    public function isPublished(): bool
    {
        return $this->status === PublicationStatus::Published
            && $this->published_at !== null
            && $this->published_at->lessThanOrEqualTo(now());
    }
}
