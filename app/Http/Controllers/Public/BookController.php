<?php

namespace App\Http\Controllers\Public;

use App\Data\Public\PublicPropsMapper;
use App\Http\Controllers\Controller;
use App\Models\Book;
use App\Models\Category;
use App\Queries\Public\BookCatalogQuery;
use App\Queries\Public\PublishedBookQuery;
use App\Support\PublicSeo;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

final class BookController extends Controller
{
    public function index(Request $request, BookCatalogQuery $query): Response
    {
        $result = $query->get($request);

        return Inertia::render('books/index', [
            'books' => PublicPropsMapper::pagination($result['books'], fn (Book $book) => PublicPropsMapper::book($book)),
            'categories' => $result['categories']->map(fn (Category $category) => PublicPropsMapper::category($category))->all(),
            'filters' => $result['filters']->props(books: true),
            'seo' => PublicSeo::make('Buku', 'Temukan buku terbitan Taretan Media.', route('books.index')),
        ]);
    }

    public function show(string $slug, PublishedBookQuery $query): Response
    {
        $book = $query->find($slug);
        $data = PublicPropsMapper::book($book, detail: true);

        return Inertia::render('books/show', [
            'book' => $data,
            'seo' => PublicSeo::make($book->title, $book->synopsis ?? $book->title, route('books.show', $book->slug), 'book', $data['coverUrl']),
        ]);
    }
}
