<?php

namespace App\Http\Controllers\Public;

use App\Data\Public\PublicPropsMapper;
use App\Http\Controllers\Controller;
use App\Models\Article;
use App\Models\Category;
use App\Queries\Public\ArticleCatalogQuery;
use App\Queries\Public\PublishedArticleQuery;
use App\Support\PublicSeo;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

final class ArticleController extends Controller
{
    public function index(Request $request, ArticleCatalogQuery $query): Response
    {
        $result = $query->get($request);

        return Inertia::render('articles/index', [
            'articles' => PublicPropsMapper::pagination($result['articles'], fn (Article $article) => PublicPropsMapper::article($article)),
            'categories' => $result['categories']->map(fn (Category $category) => PublicPropsMapper::category($category))->all(),
            'filters' => $result['filters']->props(),
            'seo' => PublicSeo::make('Berita', 'Baca berita terbaru dari Taretan Media.', route('articles.index')),
        ]);
    }

    public function show(string $slug, PublishedArticleQuery $query): Response
    {
        $article = $query->find($slug);
        $data = PublicPropsMapper::article($article, detail: true);
        $categoryIds = $article->categories->modelKeys();
        $relatedNews = Article::query()
            ->published()
            ->where('id', '!=', $article->id)
            ->with(['author:id,name', 'categories:id,name,slug'])
            ->when($categoryIds !== [], fn ($related) => $related->whereHas('categories', fn ($categories) => $categories->whereIn('id', $categoryIds)))
            ->latest('published_at')
            ->limit(3)
            ->get()
            ->map(fn (Article $relatedArticle): array => PublicPropsMapper::article($relatedArticle))
            ->values()
            ->all();

        return Inertia::render('articles/show', [
            'article' => $data,
            'relatedNews' => $relatedNews,
            'seo' => PublicSeo::make($article->title, $article->excerpt ?? $article->title, route('articles.show', $article->slug), 'article', $data['featuredImageUrl']),
        ]);
    }
}
