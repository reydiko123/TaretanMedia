<?php

namespace App\Policies;

use App\Policies\Concerns\AdminOnlyPolicy;

class ArticlePolicy
{
    use AdminOnlyPolicy;
}
