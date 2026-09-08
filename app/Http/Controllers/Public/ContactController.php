<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Services\PublicSiteConfig;
use App\Support\PublicSeo;
use Inertia\Inertia;
use Inertia\Response;

final class ContactController extends Controller
{
    public function __invoke(PublicSiteConfig $config): Response
    {
        return Inertia::render('contact', [
            'contact' => $config->toArray()['contact'],
            'seo' => PublicSeo::make('Kontak', 'Hubungi Taretan Media melalui kanal resmi yang tersedia.', route('contact')),
        ]);
    }
}
