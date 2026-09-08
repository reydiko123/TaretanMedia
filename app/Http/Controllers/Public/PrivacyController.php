<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Support\PublicSeo;
use Inertia\Inertia;
use Inertia\Response;

final class PrivacyController extends Controller
{
    public function __invoke(): Response
    {
        return Inertia::render('privacy', [
            'seo' => PublicSeo::make(
                'Privasi',
                'Informasi privasi dan pemrosesan data pada Taretan Media.',
                route('privacy'),
            ),
        ]);
    }
}
