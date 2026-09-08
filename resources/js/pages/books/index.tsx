import { BookCardView, CatalogFilterForm } from '@/components/public/catalog';
import {
    CatalogPagination,
    EmptyState,
    PageContainer,
    PageHeader,
    PublicBreadcrumbs,
} from '@/components/public/public-ui';
import { SeoHead } from '@/components/public/seo-head';
import type {
    BookCard,
    BookFilters,
    CategoryOption,
    Paginated,
    SeoProps,
} from '@/types';

export default function BooksIndex({
    seo,
    books,
    filters,
    categories,
}: {
    seo: SeoProps;
    books: Paginated<BookCard>;
    filters: BookFilters;
    categories: CategoryOption[];
}) {
    const filtered = Boolean(
        filters.search ||
        filters.category ||
        filters.minPrice !== null ||
        filters.maxPrice !== null ||
        filters.year !== null,
    );
    return (
        <>
            <SeoHead seo={seo} />
            <PageContainer className="pb-16">
                <PublicBreadcrumbs
                    items={[{ label: 'Beranda', href: '/' }, { label: 'Buku' }]}
                />
                <PageHeader
                    eyebrow="Katalog"
                    title="Buku"
                    description="Temukan karya berdasarkan judul, penulis, kategori, harga, dan tahun terbit."
                />
                <CatalogFilterForm
                    action="/buku"
                    filters={filters}
                    categories={categories}
                    kind="book"
                />
                {books.data.length > 0 ? (
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4">
                        {books.data.map((book) => (
                            <BookCardView key={book.slug} book={book} />
                        ))}
                    </div>
                ) : (
                    <EmptyState
                        title={
                            filtered ? 'Buku tidak ditemukan' : 'Belum ada buku'
                        }
                        description={
                            filtered
                                ? 'Coba ubah kata kunci atau rentang filter Anda.'
                                : 'Katalog buku yang telah diterbitkan akan tampil di sini.'
                        }
                        resetHref={filtered ? '/buku' : undefined}
                    />
                )}
                <CatalogPagination pagination={books} />
            </PageContainer>
        </>
    );
}
