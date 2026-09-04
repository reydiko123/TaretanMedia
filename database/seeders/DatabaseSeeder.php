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

        // Demo/content seeders are only for non-production environments and
        // are added in later phases. Production must never receive demo data.
        if (app()->environment(['local', 'testing', 'staging'])) {
            // Placeholder for future demo seeders (Phase 2+).
        }
    }
}
