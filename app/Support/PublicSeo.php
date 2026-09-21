<?php

namespace App\Support;

use Illuminate\Support\Str;

final class PublicSeo
{
    /** @return array<string, mixed> */
    public static function make(string $title, string $description, string $canonicalUrl, string $type = 'website', ?string $imageUrl = null): array
    {
        $siteName = (string) config('taretan.public.name', config('app.name'));
        $title = self::brand($title);
        $description = self::brand($description);
        $description = Str::limit(trim(strip_tags($description)), 160, '');
        $fullTitle = $title === $siteName ? $title : $title.' | '.$siteName;

        return [
            'title' => $fullTitle,
            'description' => $description,
            'canonicalUrl' => $canonicalUrl,
            'openGraph' => [
                'type' => $type,
                'title' => $fullTitle,
                'description' => $description,
                'url' => $canonicalUrl,
                'imageUrl' => $imageUrl,
            ],
        ];
    }

    private static function brand(string $value): string
    {
        return str_replace('Taretan Media', 'CV Taretan Media Publishing', $value);
    }
}
