import { Link } from '@inertiajs/react';
import {
    ArrowRight,
    BookOpen,
    FileText,
    LibraryBig,
    Sparkles,
} from 'lucide-react';
import {
    ArticleCardView,
    BookCardView,
    JournalCardView,
} from '@/components/public/catalog';
import { EmptyState, PageContainer } from '@/components/public/public-ui';
import { ServiceCard } from '@/components/public/service-card';
import { SeoHead } from '@/components/public/seo-head';
import { Button } from '@/components/ui/button';
import type {
    ArticleCard,
    BookCard,
    JournalCard,
    PublicService,
    SeoProps,
} from '@/types';

type HomeProps = {
    seo: SeoProps;
    books?: BookCard[];
    featuredBooks?: BookCard[];
    journals?: JournalCard[];
    featuredJournals?: JournalCard[];
    articles?: ArticleCard[];
    latestArticles?: ArticleCard[];
    services?: PublicService[];
};

const shortcuts = [
    {
        title: 'Buku',
        description: 'Temukan karya pilihan dari beragam bidang.',
        href: '/buku',
        icon: BookOpen,
    },
    {
        title: 'Jurnal',
        description: 'Jelajahi metadata jurnal dan publikasi resminya.',
        href: '/jurnal',
        icon: LibraryBig,
    },
    {
        title: 'Artikel',
        description: 'Baca wawasan terbaru seputar penerbitan.',
        href: '/artikel',
        icon: FileText,
    },
];

export default function Home(props: HomeProps) {
    const books = props.featuredBooks ?? props.books ?? [];
    const journals = props.featuredJournals ?? props.journals ?? [];
    const articles = props.latestArticles ?? props.articles ?? [];
    const services = props.services ?? [];

    return (
        <>
            <SeoHead seo={props.seo} />
            <section className="border-border to-background border-b bg-gradient-to-b from-amber-50 dark:from-amber-950/20">
                <PageContainer className="grid items-center gap-10 py-20 lg:grid-cols-[1.15fr_.85fr] lg:py-28">
                    <div>
                        <p className="text-primary inline-flex items-center gap-2 text-sm font-semibold">
                            <Sparkles className="size-4" /> Penerbit buku dan
                            publikasi ilmiah
                        </p>
                        <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl">
                            Gagasan bermakna, terbit menjadi karya.
                        </h1>
                        <p className="text-muted-foreground mt-6 max-w-2xl text-lg leading-8">
                            Temukan buku, jurnal, artikel, dan layanan
                            penerbitan Taretan Media dalam satu ruang publik
                            yang mudah dijelajahi.
                        </p>
                        <div className="mt-8 flex flex-wrap gap-3">
                            <Button asChild size="lg">
                                <Link href="/buku">
                                    Jelajahi buku <ArrowRight />
                                </Link>
                            </Button>
                            <Button asChild variant="outline" size="lg">
                                <Link href="/kontak">
                                    Konsultasi penerbitan
                                </Link>
                            </Button>
                        </div>
                    </div>
                    <div className="bg-primary text-primary-foreground rounded-3xl p-8 shadow-xl sm:p-10">
                        <p className="text-sm font-semibold tracking-widest uppercase opacity-75">
                            Taretan Media
                        </p>
                        <p className="mt-5 text-2xl leading-9 font-semibold">
                            Mendekatkan penulis, pembaca, dan pengetahuan
                            melalui pengalaman penerbitan yang terarah.
                        </p>
                        <Button asChild variant="secondary" className="mt-8">
                            <Link href="/profil">Kenali kami</Link>
                        </Button>
                    </div>
                </PageContainer>
            </section>

            <PageContainer className="py-16">
                <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3">
                    {shortcuts.map(
                        ({ title, description, href, icon: Icon }) => (
                            <Link
                                key={href}
                                href={href}
                                className="focus-visible:ring-ring group rounded-xl border p-6 transition hover:-translate-y-1 hover:shadow-md focus-visible:ring-2 focus-visible:outline-none"
                            >
                                <Icon className="text-primary size-7" />
                                <h2 className="mt-5 text-xl font-semibold">
                                    {title}
                                </h2>
                                <p className="text-muted-foreground mt-2 text-sm leading-6">
                                    {description}
                                </p>
                                <span className="text-primary mt-5 inline-flex items-center gap-1 text-sm font-medium">
                                    Jelajahi{' '}
                                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                                </span>
                            </Link>
                        ),
                    )}
                </div>
            </PageContainer>

            <DiscoverySection
                title="Buku pilihan"
                href="/buku"
                empty="Katalog buku sedang disiapkan."
            >
                {books.map((book) => (
                    <BookCardView key={book.slug} book={book} />
                ))}
            </DiscoverySection>
            <DiscoverySection
                title="Jurnal terbaru"
                href="/jurnal"
                empty="Belum ada jurnal yang dipublikasikan."
            >
                {journals.map((journal) => (
                    <JournalCardView key={journal.slug} journal={journal} />
                ))}
            </DiscoverySection>
            <DiscoverySection
                title="Artikel terbaru"
                href="/artikel"
                empty="Belum ada artikel yang dipublikasikan."
                columns="grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-3"
            >
                {articles.map((article) => (
                    <ArticleCardView key={article.slug} article={article} />
                ))}
            </DiscoverySection>

            <section className="bg-muted/40 border-y">
                <PageContainer className="py-16">
                    <div className="flex flex-wrap items-end justify-between gap-4">
                        <div>
                            <p className="text-primary text-sm font-semibold uppercase">
                                Layanan
                            </p>
                            <h2 className="mt-2 text-3xl font-bold tracking-tight">
                                Dukungan untuk perjalanan penerbitan
                            </h2>
                        </div>
                        <Button asChild variant="outline">
                            <Link href="/layanan">Semua layanan</Link>
                        </Button>
                    </div>
                    {services.length > 0 ? (
                        <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-3">
                            {services.slice(0, 6).map((service) => (
                                <ServiceCard
                                    key={service.name}
                                    service={service}
                                    showCta={false}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="mt-8">
                            <EmptyState description="Informasi layanan sedang disiapkan. Anda tetap dapat menghubungi kami untuk berdiskusi." />
                        </div>
                    )}
                </PageContainer>
            </section>

            <PageContainer className="py-16 sm:py-20">
                <div className="bg-primary text-primary-foreground rounded-2xl px-6 py-10 text-center sm:px-10">
                    <h2 className="text-3xl font-bold">
                        Punya naskah atau ide penerbitan?
                    </h2>
                    <p className="mx-auto mt-3 max-w-2xl opacity-80">
                        Hubungi kanal resmi kami untuk membicarakan kebutuhan
                        Anda. Fitur pengiriman naskah akan hadir pada tahap
                        berikutnya.
                    </p>
                    <Button asChild variant="secondary" className="mt-6">
                        <Link href="/kontak">Buka halaman Kontak</Link>
                    </Button>
                </div>
            </PageContainer>
        </>
    );
}

function DiscoverySection({
    title,
    href,
    empty,
    columns = 'grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4',
    children,
}: {
    title: string;
    href: string;
    empty: string;
    columns?: string;
    children: React.ReactNode[];
}) {
    return (
        <section>
            <PageContainer className="pb-16">
                <div className="mb-7 flex items-center justify-between gap-4">
                    <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                        {title}
                    </h2>
                    <Button asChild variant="ghost">
                        <Link href={href}>
                            Lihat semua <ArrowRight />
                        </Link>
                    </Button>
                </div>
                {children.length > 0 ? (
                    <div className={`grid ${columns}`}>{children}</div>
                ) : (
                    <EmptyState description={empty} />
                )}
            </PageContainer>
        </section>
    );
}
