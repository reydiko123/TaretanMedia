<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Admin account is always seeded from environment (production-safe).
        $this->call(AdminSeeder::class);

        // Demo/content seeders are only for non-production environments.
        // Production must never receive demo data (Q10-B / plan §12).
        if (app()->environment(['local', 'testing', 'staging'])) {
            $this->call(DemoContentSeeder::class);
        }
    }
}
