<?php

namespace App\Http\Controllers\Public;

use App\Data\Public\PublicPropsMapper;
use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Journal;
use App\Queries\Public\JournalCatalogQuery;
use App\Queries\Public\PublishedJournalQuery;
use App\Support\PublicSeo;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

final class JournalController extends Controller
{
    public function index(Request $request, JournalCatalogQuery $query): Response
    {
        $result = $query->get($request);

        return Inertia::render('journals/index', [
            'journals' => PublicPropsMapper::pagination($result['journals'], fn (Journal $journal) => PublicPropsMapper::journal($journal)),
            'categories' => $result['categories']->map(fn (Category $category) => PublicPropsMapper::category($category))->all(),
            'filters' => $result['filters']->props(),
            'seo' => PublicSeo::make('Jurnal', 'Temukan jurnal dan halaman publikasi eksternal resmi.', route('journals.index')),
        ]);
    }

    public function show(string $slug, PublishedJournalQuery $query): Response
    {
        $journal = $query->find($slug);
        $data = PublicPropsMapper::journal($journal, detail: true);

        return Inertia::render('journals/show', [
            'journal' => $data,
            'seo' => PublicSeo::make($journal->title, $journal->description ?? $journal->theme ?? $journal->title, route('journals.show', $journal->slug), imageUrl: $data['coverUrl']),
        ]);
    }
}
