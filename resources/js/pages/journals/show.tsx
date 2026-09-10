import { ExternalLink } from 'lucide-react';
import { formatDate } from '@/components/public/catalog';
import {
    CategoryBadges,
    PageContainer,
    PublicBreadcrumbs,
    PublicImage,
    ShareButton,
} from '@/components/public/public-ui';
import { SeoHead } from '@/components/public/seo-head';
import { Button } from '@/components/ui/button';
import type { JournalDetail, SeoProps } from '@/types';
import { TrackedExternalLink } from '@/components/conversion/tracked-external-link';
import { publicSurfaceClass } from '@/lib/public-theme';

export default function JournalsShow({
    seo,
    journal,
}: {
    seo: SeoProps;
    journal: JournalDetail;
}) {
    const externalIsSafe = journal.externalUrl.startsWith('https://');
    const structuredData = {
        '@context': 'https://schema.org',
        '@type': 'Periodical',
        name: journal.title,
        datePublished: journal.publishedAt,
        description: journal.description || seo.description,
        image: journal.coverUrl || undefined,
        url: seo.canonicalUrl,
    };
    return (
        <>
            <SeoHead seo={seo} structuredData={structuredData} />
            <PageContainer className="pb-16">
                <PublicBreadcrumbs
                    items={[
                        { label: 'Beranda', href: '/' },
                        { label: 'Jurnal', href: '/jurnal' },
                        { label: journal.title },
                    ]}
                />
                <article className="grid gap-10 py-10 lg:grid-cols-[minmax(0,22rem)_1fr] lg:py-14">
                    <PublicImage
                        src={journal.coverUrl}
                        alt={`Sampul ${journal.title}`}
                        priority
                        className="w-full shadow-[0_25px_60px_-25px_rgba(20,83,45,0.5)]"
                    />
                    <div>
                        <CategoryBadges categories={journal.categories} />
                        <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
                            {journal.title}
                        </h1>
                        {(journal.editionLabel || journal.publicationYear) && (
                            <p className="text-muted-foreground mt-4 text-lg">
                                {[journal.editionLabel, journal.publicationYear]
                                    .filter(Boolean)
                                    .join(' · ')}
                            </p>
                        )}
                        {journal.theme && (
                            <div
                                className={`${publicSurfaceClass} bg-secondary/60 mt-7 p-4 shadow-none`}
                            >
                                <p className="text-muted-foreground text-sm">
                                    Tema
                                </p>
                                <p className="mt-1 font-medium">
                                    {journal.theme}
                                </p>
                            </div>
                        )}
                        <p className="text-muted-foreground mt-5 text-sm">
                            Dipublikasikan {formatDate(journal.publishedAt)}
                        </p>
                        <div className="mt-7 flex flex-wrap gap-3">
                            {externalIsSafe && (
                                <Button asChild size="lg">
                                    <TrackedExternalLink
                                        href={journal.externalUrl}
                                        event="journal_external_click"
                                    >
                                        Buka situs jurnal eksternal{' '}
                                        <ExternalLink />
                                    </TrackedExternalLink>
                                </Button>
                            )}
                            <ShareButton
                                url={seo.canonicalUrl}
                                title={journal.title}
                                text={seo.description}
                            />
                        </div>
                        {!externalIsSafe && (
                            <p className="text-destructive mt-5 text-sm">
                                Tautan publikasi eksternal belum tersedia dengan
                                aman.
                            </p>
                        )}
                        {journal.description && (
                            <section className="mt-10">
                                <h2 className="public-display text-3xl font-bold">
                                    Tentang jurnal
                                </h2>
                                <div className="text-muted-foreground mt-4 leading-8 whitespace-pre-line">
                                    {journal.description}
                                </div>
                            </section>
                        )}
                    </div>
                </article>
            </PageContainer>
        </>
    );
}
