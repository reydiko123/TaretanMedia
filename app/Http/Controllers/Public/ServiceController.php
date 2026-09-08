<?php

namespace App\Http\Controllers\Public;

use App\Data\Public\PublicPropsMapper;
use App\Http\Controllers\Controller;
use App\Models\Service;
use App\Queries\Public\PublicServiceQuery;
use App\Support\PublicSeo;
use Inertia\Inertia;
use Inertia\Response;

final class ServiceController extends Controller
{
    public function index(PublicServiceQuery $query): Response
    {
        return Inertia::render('services/index', [
            'services' => $query->get()->map(fn (Service $service) => PublicPropsMapper::service($service))->all(),
            'seo' => PublicSeo::make('Layanan', 'Layanan penerbitan dan pendampingan karya dari Taretan Media.', route('services.index')),
        ]);
    }
}
