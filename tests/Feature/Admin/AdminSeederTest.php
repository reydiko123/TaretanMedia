<?php

namespace Tests\Feature\Admin;

use App\Models\Admin;
use Database\Seeders\AdminSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use RuntimeException;
use Tests\TestCase;

class AdminSeederTest extends TestCase
{
    use RefreshDatabase;

    public function test_seeder_is_idempotent(): void
    {
        config([
            'taretan.admin.username' => 'admin',
            'taretan.admin.password' => 'secret-password',
        ]);

        $this->seed(AdminSeeder::class);
        $this->seed(AdminSeeder::class);

        $this->assertSame(1, Admin::query()->count());
    }

    public function test_seeder_rejects_empty_credentials(): void
    {
        config([
            'taretan.admin.username' => '',
            'taretan.admin.password' => '',
        ]);

        $this->expectException(RuntimeException::class);

        $this->seed(AdminSeeder::class);
    }

    public function test_seeder_hashes_password(): void
    {
        config([
            'taretan.admin.username' => 'admin',
            'taretan.admin.password' => 'secret-password',
        ]);

        $this->seed(AdminSeeder::class);

        $admin = Admin::query()->firstOrFail();
        $this->assertNotSame('secret-password', $admin->password);
        $this->assertTrue(password_verify('secret-password', $admin->password));
    }
}
