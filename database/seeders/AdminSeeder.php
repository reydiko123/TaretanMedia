<?php

namespace Database\Seeders;

use App\Models\Admin;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use RuntimeException;

class AdminSeeder extends Seeder
{
    /**
     * Seed the initial admin account from environment variables.
     *
     * Idempotent: re-running does not create duplicates. Password is hashed
     * and never logged. Empty credentials are rejected.
     */
    public function run(): void
    {
        $username = trim((string) config('taretan.admin.username'));
        $password = (string) config('taretan.admin.password');

        if ($username === '' || $password === '') {
            throw new RuntimeException(
                'ADMIN_USERNAME and ADMIN_PASSWORD must be set and non-empty to seed the admin account.'
            );
        }

        Admin::query()->updateOrCreate(
            ['username' => $username],
            ['password' => Hash::make($password)],
        );
    }
}
