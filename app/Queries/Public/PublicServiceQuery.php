<?php

namespace App\Queries\Public;

use App\Models\Service;
use Illuminate\Database\Eloquent\Collection;

final class PublicServiceQuery
{
    /** @return Collection<int, Service> */
    public function get(?int $limit = null): Collection
    {
        $query = Service::query()->active();

        if ($limit !== null) {
            $query->limit($limit);
        }

        return $query->get();
    }
}
