import {
    ArticleCardView,
    CatalogFilterForm,
} from '@/components/public/catalog';
import {
    CatalogPagination,
    EmptyState,
    PageContainer,
    PageHeader,
    PublicBreadcrumbs,
} from '@/components/public/public-ui';
import { SeoHead } from '@/components/public/seo-head';
import type {
    ArticleCard,
    CatalogFilters,
    CategoryOption,
    Paginated,
    SeoProps,
} from '@/types';

export default function ArticlesIndex({
    seo,
    articles,
    filters,
    categories,
}: {
    seo: SeoProps;
    articles: Paginated<ArticleCard>;
    filters: CatalogFilters;
    categories: CategoryOption[];
}) {
    const filtered = Boolean(filters.search || filters.category);
    return (
        <>
            <SeoHead seo={seo} />
            <PageContainer className="pb-16">
                <PublicBreadcrumbs
                    items={[
                        { label: 'Beranda', href: '/' },
                        { label: 'Artikel' },
                    ]}
                />
                <PageHeader
                    eyebrow="Wawasan"
                    title="Artikel"
                    description="Baca artikel terbaru dari Taretan Media dan temukan gagasan seputar karya serta penerbitan."
                />
                <CatalogFilterForm
                    action="/artikel"
                    filters={filters}
                    categories={categories}
                    kind="article"
                />
                {articles.data.length > 0 ? (
                    <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
                        {articles.data.map((article) => (
                            <ArticleCardView
                                key={article.slug}
                                article={article}
                            />
                        ))}
                    </div>
                ) : (
                    <EmptyState
                        title={
                            filtered
                                ? 'Artikel tidak ditemukan'
                                : 'Belum ada artikel'
                        }
                        description={
                            filtered
                                ? 'Coba ubah kata kunci atau kategori Anda.'
                                : 'Artikel yang telah dipublikasikan akan tampil di sini.'
                        }
                        resetHref={filtered ? '/artikel' : undefined}
                    />
                )}
                <CatalogPagination pagination={articles} />
            </PageContainer>
        </>
    );
}
