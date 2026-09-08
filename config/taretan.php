<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Initial Admin Credentials
    |--------------------------------------------------------------------------
    |
    | Used by the idempotent AdminSeeder to create the initial admin account.
    | Values come from the environment and must never be committed. The seeder
    | rejects empty values and never logs the password.
    |
    */

    'admin' => [
        'username' => env('ADMIN_USERNAME'),
        'password' => env('ADMIN_PASSWORD'),
    ],

    /*
    |--------------------------------------------------------------------------
    | Public Contact Configuration
    |--------------------------------------------------------------------------
    |
    | Public-safe values surfaced to visitors (WhatsApp deep links, contact
    | channels). Sourced from the environment per PRD Q9-C.
    |
    */

    'whatsapp_number' => env('WHATSAPP_NUMBER'),
    'whatsapp' => [
        'number' => env('WHATSAPP_NUMBER'),
        'templates' => [
            'book' => 'Halo Taretan Media, saya ingin menanyakan buku ":title". :url',
            'service' => 'Halo Taretan Media, saya ingin berkonsultasi tentang layanan ":service".',
            'manuscript' => "Halo Taretan Media, saya ingin berkonsultasi tentang naskah.\nNama: :name\nEmail: :email\nJudul: :title\nJenis: :publication_type",
            'contact' => 'Halo Taretan Media, saya ingin meminta informasi.',
        ],
        'publication_types' => ['Buku', 'Jurnal', 'Artikel'],
    ],
    'analytics' => [
        'enabled' => (bool) env('ANALYTICS_ENABLED', false),
        'driver' => env('ANALYTICS_DRIVER', 'none'),
        'endpoint' => env('ANALYTICS_ENDPOINT'),
    ],
    'contact_email' => env('CONTACT_EMAIL'),
    'social' => [
        'instagram_url' => env('SOCIAL_INSTAGRAM_URL'),
    ],
    'maps_url' => env('MAPS_URL'),

    'public' => [
        'name' => env('PUBLIC_SITE_NAME', env('APP_NAME', 'Taretan Media')),
        'tagline' => env('PUBLIC_SITE_TAGLINE', 'Penerbitan yang mendekatkan gagasan kepada pembaca.'),
        'address' => env('PUBLIC_ADDRESS'),
        'profile' => [
            'summary' => env('PUBLIC_PROFILE_SUMMARY', 'Taretan Media menghadirkan karya buku, jurnal, dan artikel untuk pembaca yang lebih luas.'),
            'vision' => env('PUBLIC_PROFILE_VISION', 'Menjadi ruang penerbitan yang terpercaya, relevan, dan mudah diakses.'),
            'mission' => [
                'Mendampingi lahirnya karya yang bernilai.',
                'Memperluas akses pembaca terhadap publikasi berkualitas.',
                'Membangun ekosistem literasi yang kolaboratif.',
            ],
            'values' => ['Integritas', 'Kolaborasi', 'Kualitas', 'Aksesibilitas'],
        ],
    ],

];
