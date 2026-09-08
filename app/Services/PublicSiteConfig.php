<?php

namespace App\Services;

final class PublicSiteConfig
{
    /** @return array<string, mixed> */
    public function toArray(): array
    {
        return [
            'name' => $this->value(config('taretan.public.name')) ?? 'Taretan Media',
            'tagline' => $this->value(config('taretan.public.tagline')) ?? '',
            'contact' => [
                'email' => $this->value(config('taretan.contact_email')),
                'whatsappConfigured' => $this->value(config('taretan.whatsapp_number')) !== null,
                'instagramUrl' => $this->httpsUrl(config('taretan.social.instagram_url')),
                'mapsUrl' => $this->httpsUrl(config('taretan.maps_url')),
                'address' => $this->value(config('taretan.public.address')),
            ],
        ];
    }

    /** @return list<array{label: string, href: string}> */
    public function navigation(): array
    {
        return [
            ['label' => 'Beranda', 'href' => route('home', absolute: false)],
            ['label' => 'Buku', 'href' => route('books.index', absolute: false)],
            ['label' => 'Jurnal', 'href' => route('journals.index', absolute: false)],
            ['label' => 'Artikel', 'href' => route('articles.index', absolute: false)],
            ['label' => 'Profil', 'href' => route('profile', absolute: false)],
            ['label' => 'Layanan', 'href' => route('services.index', absolute: false)],
            ['label' => 'Kontak', 'href' => route('contact', absolute: false)],
        ];
    }

    private function value(mixed $value): ?string
    {
        if (! is_scalar($value)) {
            return null;
        }

        $value = trim((string) $value);

        return $value === '' ? null : $value;
    }

    private function httpsUrl(mixed $value): ?string
    {
        $value = $this->value($value);

        return $value !== null && str_starts_with(strtolower($value), 'https://') ? $value : null;
    }
}
