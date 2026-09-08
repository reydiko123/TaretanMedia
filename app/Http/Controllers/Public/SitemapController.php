<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Queries\Public\PublicSitemapQuery;
use Illuminate\Http\Response;

final class SitemapController extends Controller
{
    public function __invoke(PublicSitemapQuery $query): Response
    {
        return response()->view('sitemap', ['urls' => $query->get()])
            ->header('Content-Type', 'application/xml; charset=UTF-8');
    }
}
