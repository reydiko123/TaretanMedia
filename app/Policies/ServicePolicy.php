<?php

namespace App\Policies;

use App\Policies\Concerns\AdminOnlyPolicy;

class ServicePolicy
{
    use AdminOnlyPolicy;
}
