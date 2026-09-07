<?php

namespace App\Policies;

use App\Policies\Concerns\AdminOnlyPolicy;

class AuthorPolicy
{
    use AdminOnlyPolicy;
}
