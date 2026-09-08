<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Support\PublicSeo;
use Inertia\Inertia;
use Inertia\Response;

final class ManuscriptController extends Controller
{
    public function create(): Response
    {
        return Inertia::render('manuscripts/create', [
            'seo' => PublicSeo::make(
                'Kirim Naskah',
                'Sampaikan informasi awal naskah melalui WhatsApp Taretan Media.',
                route('manuscripts.create'),
            ),
        ]);
    }
}
