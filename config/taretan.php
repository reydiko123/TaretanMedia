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
    'contact_email' => env('CONTACT_EMAIL'),
    'social' => [
        'instagram_url' => env('SOCIAL_INSTAGRAM_URL'),
    ],
    'maps_url' => env('MAPS_URL'),

];
