<?php

namespace App\Services;

final class PublicSiteContent
{
    /** @return array<string, mixed> */
    public function profile(): array
    {
        return [
            'summary' => (string) config('taretan.public.profile.summary', ''),
            'vision' => (string) config('taretan.public.profile.vision', ''),
            'mission' => array_values(array_filter((array) config('taretan.public.profile.mission', []), 'is_string')),
            'values' => array_values(array_filter((array) config('taretan.public.profile.values', []), 'is_string')),
        ];
    }
}
