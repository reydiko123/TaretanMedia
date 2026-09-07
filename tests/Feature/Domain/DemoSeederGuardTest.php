<?php

namespace Tests\Feature\Domain;

use App\Models\Book;
use Database\Seeders\DatabaseSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class DemoSeederGuardTest extends TestCase
{
    use RefreshDatabase;

    public function test_demo_content_runs_in_testing_environment(): void
    {
        config(['taretan.admin.username' => 'admin', 'taretan.admin.password' => 'secret-password']);

        $this->artisan('db:seed', ['--class' => DatabaseSeeder::class, '--force' => true]);

        $this->assertGreaterThan(0, Book::count());
    }

    public function test_demo_content_blocked_in_production(): void
    {
        config(['taretan.admin.username' => 'admin', 'taretan.admin.password' => 'secret-password']);
        app()->detectEnvironment(fn () => 'production');

        try {
            $this->artisan('db:seed', ['--class' => DatabaseSeeder::class, '--force' => true]);
            $this->assertSame(0, Book::count());
        } finally {
            app()->detectEnvironment(fn () => 'testing');
        }
    }
}
