import { Link } from '@inertiajs/react';
import {
    BookOpen,
    CalendarDays,
    FileText,
    Library,
    UsersRound,
} from 'lucide-react';
import {
    CategoryBadges,
    PageContainer,
    PublicBreadcrumbs,
    PublicImage,
    ShareButton,
} from '@/components/public/public-ui';
import { SeoHead } from '@/components/public/seo-head';
import { Button } from '@/components/ui/button';
import type { BookDetail, SeoProps } from '@/types';

export default function BooksShow({
    seo,
    book,
}: {
    seo: SeoProps;
    book: BookDetail;
}) {
    const metadata = [
        book.authors.length
            ? {
                  label: 'Penulis',
                  value: book.authors.join(', '),
                  icon: UsersRound,
              }
            : null,
        book.publisher
            ? { label: 'Penerbit', value: book.publisher, icon: Library }
            : null,
        book.publicationYear
            ? {
                  label: 'Tahun terbit',
                  value: String(book.publicationYear),
                  icon: CalendarDays,
              }
            : null,
        book.isbn ? { label: 'ISBN', value: book.isbn, icon: BookOpen } : null,
        book.pageCount
            ? {
                  label: 'Jumlah halaman',
                  value: `${book.pageCount} halaman`,
                  icon: FileText,
              }
            : null,
    ].filter((item): item is NonNullable<typeof item> => item !== null);
    const structuredData = {
        '@context': 'https://schema.org',
        '@type': 'Book',
        name: book.title,
        author: book.authors.map((name) => ({ '@type': 'Person', name })),
        isbn: book.isbn || undefined,
        publisher: book.publisher || undefined,
        datePublished: book.publishedAt,
        image: book.coverUrl || undefined,
        url: seo.canonicalUrl,
    };

    return (
        <>
            <SeoHead seo={seo} structuredData={structuredData} />
            <PageContainer className="pb-16">
                <PublicBreadcrumbs
                    items={[
                        { label: 'Beranda', href: '/' },
                        { label: 'Buku', href: '/buku' },
                        { label: book.title },
                    ]}
                />
                <article className="grid gap-10 py-10 lg:grid-cols-[minmax(0,22rem)_1fr] lg:py-14">
                    <PublicImage
                        src={book.coverUrl}
                        alt={`Sampul ${book.title}`}
                        priority
                        className="w-full shadow-lg"
                    />
                    <div>
                        <CategoryBadges categories={book.categories} />
                        <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
                            {book.title}
                        </h1>
                        {book.authors.length > 0 && (
                            <p className="text-muted-foreground mt-4 text-lg">
                                oleh {book.authors.join(', ')}
                            </p>
                        )}
                        <p className="mt-6 text-2xl font-bold">
                            {book.formattedPrice}
                        </p>
                        <div className="mt-7 flex flex-wrap gap-3">
                            <Button asChild size="lg">
                                <Link href="/kontak">
                                    Tanyakan ketersediaan
                                </Link>
                            </Button>
                            <ShareButton
                                url={seo.canonicalUrl}
                                title={book.title}
                                text={seo.description}
                            />
                        </div>
                        {metadata.length > 0 && (
                            <dl className="mt-10 grid gap-4 sm:grid-cols-2">
                                {metadata.map(
                                    ({ label, value, icon: Icon }) => (
                                        <div
                                            key={label}
                                            className="bg-muted/40 rounded-lg border p-4"
                                        >
                                            <dt className="text-muted-foreground flex items-center gap-2 text-sm">
                                                <Icon className="size-4" />
                                                {label}
                                            </dt>
                                            <dd className="mt-1 font-medium">
                                                {value}
                                            </dd>
                                        </div>
                                    ),
                                )}
                            </dl>
                        )}
                    </div>
                    {(book.synopsis || book.tableOfContents) && (
                        <div className="space-y-10 lg:col-start-2">
                            {book.synopsis && (
                                <section>
                                    <h2 className="text-2xl font-semibold">
                                        Sinopsis
                                    </h2>
                                    <div className="text-muted-foreground mt-4 leading-8 whitespace-pre-line">
                                        {book.synopsis}
                                    </div>
                                </section>
                            )}
                            {book.tableOfContents && (
                                <section>
                                    <h2 className="text-2xl font-semibold">
                                        Daftar isi
                                    </h2>
                                    <div className="text-muted-foreground bg-muted/30 mt-4 rounded-xl border p-6 leading-8 whitespace-pre-line">
                                        {book.tableOfContents}
                                    </div>
                                </section>
                            )}
                        </div>
                    )}
                </article>
            </PageContainer>
        </>
    );
}
