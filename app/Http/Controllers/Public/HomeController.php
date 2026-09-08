<?php

namespace App\Http\Controllers\Public;

use App\Data\Public\PublicPropsMapper;
use App\Http\Controllers\Controller;
use App\Models\Article;
use App\Models\Book;
use App\Models\Journal;
use App\Models\Service;
use App\Queries\Public\HomeDiscoveryQuery;
use App\Support\PublicSeo;
use Inertia\Inertia;
use Inertia\Response;

final class HomeController extends Controller
{
    public function __invoke(HomeDiscoveryQuery $query): Response
    {
        $content = $query->get();

        return Inertia::render('home', [
            'books' => $content['books']->map(fn (Book $book) => PublicPropsMapper::book($book))->all(),
            'journals' => $content['journals']->map(fn (Journal $journal) => PublicPropsMapper::journal($journal))->all(),
            'articles' => $content['articles']->map(fn (Article $article) => PublicPropsMapper::article($article))->all(),
            'services' => $content['services']->map(fn (Service $service) => PublicPropsMapper::service($service))->all(),
            'seo' => PublicSeo::make(
                (string) config('taretan.public.name'),
                (string) config('taretan.public.tagline'),
                route('home'),
            ),
        ]);
    }
}
