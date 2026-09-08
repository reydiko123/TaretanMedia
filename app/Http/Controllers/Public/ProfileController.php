<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Services\PublicSiteContent;
use App\Support\PublicSeo;
use Inertia\Inertia;
use Inertia\Response;

final class ProfileController extends Controller
{
    public function __invoke(PublicSiteContent $content): Response
    {
        return Inertia::render('profile', [
            'profile' => $content->profile(),
            'seo' => PublicSeo::make('Profil', (string) config('taretan.public.profile.summary'), route('profile')),
        ]);
    }
}
