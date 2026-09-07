<?php

namespace App\Policies\Concerns;

use App\Models\Admin;

/**
 * Single-admin authorization (plan §7.14, FR-M11): any authenticated admin
 * may perform every content action; guests are denied by the guard. Policies
 * are declared explicitly so audit is clear and future roles can slot in.
 */
trait AdminOnlyPolicy
{
    public function viewAny(Admin $admin): bool
    {
        return true;
    }

    public function view(Admin $admin): bool
    {
        return true;
    }

    public function create(Admin $admin): bool
    {
        return true;
    }

    public function update(Admin $admin): bool
    {
        return true;
    }

    public function delete(Admin $admin): bool
    {
        return true;
    }

    public function restore(Admin $admin): bool
    {
        return true;
    }

    public function forceDelete(Admin $admin): bool
    {
        return true;
    }
}
