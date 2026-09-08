import {
    CatalogFilterForm,
    JournalCardView,
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
    CatalogFilters,
    CategoryOption,
    JournalCard,
    Paginated,
    SeoProps,
} from '@/types';

export default function JournalsIndex({
    seo,
    journals,
    filters,
    categories,
}: {
    seo: SeoProps;
    journals: Paginated<JournalCard>;
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
                        { label: 'Jurnal' },
                    ]}
                />
                <PageHeader
                    eyebrow="Publikasi"
                    title="Jurnal"
                    description="Temukan metadata jurnal dan lanjutkan ke situs publikasi eksternal resminya."
                />
                <CatalogFilterForm
                    action="/jurnal"
                    filters={filters}
                    categories={categories}
                    kind="journal"
                />
                {journals.data.length > 0 ? (
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4">
                        {journals.data.map((journal) => (
                            <JournalCardView
                                key={journal.slug}
                                journal={journal}
                            />
                        ))}
                    </div>
                ) : (
                    <EmptyState
                        title={
                            filtered
                                ? 'Jurnal tidak ditemukan'
                                : 'Belum ada jurnal'
                        }
                        description={
                            filtered
                                ? 'Coba ubah kata kunci atau kategori Anda.'
                                : 'Jurnal yang telah dipublikasikan akan tampil di sini.'
                        }
                        resetHref={filtered ? '/jurnal' : undefined}
                    />
                )}
                <CatalogPagination pagination={journals} />
            </PageContainer>
        </>
    );
}
