<?php

namespace Tests\Feature\Admin;

use App\Models\Admin;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class AdminPanelTest extends TestCase
{
    use RefreshDatabase;

    public function test_login_page_is_accessible_to_guests(): void
    {
        $this->get('/admin/login')->assertOk();
    }

    public function test_dashboard_redirects_guests_to_login(): void
    {
        $this->get('/admin')->assertRedirect('/admin/login');
    }

    public function test_authenticated_admin_can_access_dashboard(): void
    {
        $admin = Admin::create([
            'username' => 'tester',
            'password' => Hash::make('secret-password'),
        ]);

        $this->actingAs($admin, 'admin')
            ->get('/admin')
            ->assertOk();
    }
}
