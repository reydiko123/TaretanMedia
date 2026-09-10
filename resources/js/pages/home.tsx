import { Link, usePage } from '@inertiajs/react';
import {
    ArrowRight,
    BookOpen,
    Check,
    FileText,
    LibraryBig,
    MessagesSquare,
    Send,
    ShieldCheck,
    Sparkles,
} from 'lucide-react';
import {
    ArticleCardView,
    BookCardView,
    JournalCardView,
} from '@/components/public/catalog';
import {
    ProfessionalTeam,
    PublishingServiceGrid,
    PublishingSteps,
} from '@/components/public/landing-sections';
import { EmptyState, PageContainer } from '@/components/public/public-ui';
import { SeoHead } from '@/components/public/seo-head';
import { Button } from '@/components/ui/button';
import {
    publicDiscoveryItemClass,
    publicMutedSectionClass,
    publicSectionClass,
} from '@/lib/public-theme';
import type {
    ArticleCard,
    BookCard,
    JournalCard,
    PublicService,
    PublicSharedProps,
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
        title: 'Buku Pilihan',
        description:
            'Temukan karya terbitan dari beragam bidang dan perspektif.',
        href: '/buku',
        icon: BookOpen,
    },
    {
        title: 'Jurnal Ilmiah',
        description: 'Jelajahi publikasi ilmiah dan kanal resmi yang tersedia.',
        href: '/jurnal',
        icon: LibraryBig,
    },
    {
        title: 'Artikel Terbaru',
        description: 'Baca wawasan tentang karya, pengetahuan, dan penerbitan.',
        href: '/artikel',
        icon: FileText,
    },
];

const trustPoints = [
    'Pendampingan penerbitan yang jelas',
    'Editing, layout, dan desain terarah',
    'Kanal publikasi resmi dan mudah diakses',
];

export default function Home(props: HomeProps) {
    const page = usePage();
    const shared = page.props as unknown as Partial<PublicSharedProps>;
    const siteName = shared.site?.name || 'Taretan Media';
    const books = props.featuredBooks ?? props.books ?? [];
    const journals = props.featuredJournals ?? props.journals ?? [];
    const articles = props.latestArticles ?? props.articles ?? [];

    return (
        <>
            <SeoHead seo={props.seo} />

            <section className="public-glow public-grid-paper border-border border-b">
                <PageContainer className="grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-[1.05fr_.95fr] lg:py-28">
                    <div>
                        <p className="public-eyebrow">
                            <Sparkles className="size-4" aria-hidden="true" />
                            Penerbit buku dan publikasi ilmiah
                        </p>
                        <h1 className="public-display mt-5 max-w-3xl text-4xl leading-[1.08] font-bold tracking-tight sm:text-6xl lg:text-[4.5rem]">
                            Gagasan Bermakna,
                            <em className="text-primary block not-italic">
                                Terbit Menjadi Karya.
                            </em>
                        </h1>
                        <p className="text-muted-foreground mt-6 max-w-2xl text-base leading-8 sm:text-lg">
                            {siteName} membantu penulis, akademisi, peneliti,
                            pendidik, dan praktisi menerbitkan karya dengan
                            proses yang lebih terarah.
                        </p>
                        <div className="mt-8 flex flex-wrap gap-3">
                            <Button asChild size="lg" className="rounded-xl">
                                <Link href="/buku">
                                    Jelajahi buku <ArrowRight />
                                </Link>
                            </Button>
                            <Button
                                asChild
                                variant="outline"
                                size="lg"
                                className="bg-background/80 rounded-xl"
                            >
                                <Link href="/kirim-naskah">
                                    <Send /> Kirim naskah
                                </Link>
                            </Button>
                        </div>
                        <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold">
                            {['Profesional', 'Terarah', 'Terpercaya'].map(
                                (point) => (
                                    <span
                                        key={point}
                                        className="inline-flex items-center gap-2"
                                    >
                                        <span className="bg-primary/10 text-primary flex size-5 items-center justify-center rounded-full">
                                            <Check className="size-3.5" />
                                        </span>
                                        {point}
                                    </span>
                                ),
                            )}
                        </div>
                    </div>

                    <div className="relative mx-auto w-full max-w-lg">
                        <div className="bg-card/80 border-border relative rounded-[2rem] border p-5 shadow-[0_30px_80px_-36px_rgba(20,83,45,0.55)] backdrop-blur sm:p-8">
                            <div className="text-muted-foreground flex items-center justify-between text-xs font-bold tracking-[0.2em] uppercase">
                                <span>Publishing studio</span>
                                <span className="text-primary">01 / 03</span>
                            </div>
                            <div className="mt-7 flex items-end justify-center gap-2 sm:gap-4">
                                <BookVisual
                                    title="Riset"
                                    color="bg-[#7f3f3f]"
                                    className="translate-y-4 -rotate-6"
                                />
                                <BookVisual
                                    title="Gagasan"
                                    color="bg-primary"
                                    className="z-10"
                                    featured
                                />
                                <BookVisual
                                    title="Karya"
                                    color="bg-[#a07826]"
                                    className="translate-y-4 rotate-6"
                                />
                            </div>
                            <div className="bg-secondary mt-8 flex items-center gap-3 rounded-2xl p-4">
                                <span className="bg-primary text-primary-foreground flex size-10 shrink-0 items-center justify-center rounded-xl">
                                    <ShieldCheck className="size-5" />
                                </span>
                                <div>
                                    <p className="text-sm font-bold">
                                        Dari naskah hingga publikasi
                                    </p>
                                    <p className="text-muted-foreground mt-0.5 text-xs">
                                        Satu ruang untuk bertumbuh bersama
                                        karya.
                                    </p>
                                </div>
                            </div>
                        </div>
                        {/* <span className="bg-accent text-accent-foreground absolute -top-4 -right-3 rounded-full px-4 py-2 text-xs font-bold shadow-sm sm:-right-6">
                            Ideas matter
                        </span> */}
                    </div>
                </PageContainer>
            </section>

            <div className="bg-primary overflow-hidden py-3">
                <div className="animate-marquee text-primary-foreground flex w-max gap-10 text-sm font-semibold tracking-wide">
                    {[0, 1].map((item) => (
                        <div key={item} className="flex gap-10">
                            {[
                                'Editing profesional',
                                'Layout & desain cover',
                                'E-book',
                                'Buku cetak',
                                'Publikasi jurnal',
                                'Konsultasi publikasi',
                            ].map((label) => (
                                <span key={label} className="whitespace-nowrap">
                                    {label}{' '}
                                    <span className="text-accent">•</span>
                                </span>
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            <section className={publicMutedSectionClass}>
                <PageContainer className="py-12 sm:py-16">
                    <div className="grid gap-4 md:grid-cols-3">
                        {shortcuts.map(
                            ({ title, description, href, icon: Icon }) => (
                                <Link
                                    key={href}
                                    href={href}
                                    className="group border-border bg-card hover:border-primary/30 focus-visible:ring-primary rounded-2xl border p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-24px_rgba(20,83,45,0.45)] focus-visible:ring-2 focus-visible:outline-none sm:p-6"
                                >
                                    <span className="bg-primary/10 text-primary flex size-12 items-center justify-center rounded-xl">
                                        <Icon className="size-6" />
                                    </span>
                                    <h2 className="public-display mt-4 text-xl font-bold sm:mt-5 sm:text-2xl">
                                        {title}
                                    </h2>
                                    <p className="text-muted-foreground mt-2 text-sm leading-7">
                                        {description}
                                    </p>
                                    <span className="text-primary mt-4 inline-flex items-center gap-1.5 text-sm font-bold sm:mt-5">
                                        Jelajahi
                                        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                                    </span>
                                </Link>
                            ),
                        )}
                    </div>
                </PageContainer>
            </section>

            <DiscoverySection
                title="Buku Terbitan Taretan Media"
                eyebrow="Pilihan Editor"
                href="/buku"
                empty="Katalog buku sedang disiapkan."
                maxItems={4}
            >
                {books.map((book) => (
                    <BookCardView key={book.slug} book={book} />
                ))}
            </DiscoverySection>

            <section className={publicMutedSectionClass}>
                <PageContainer
                    className={`${publicSectionClass} grid items-center gap-12 lg:grid-cols-[.8fr_1.2fr]`}
                >
                    <div className="public-grid-paper border-border bg-card relative overflow-hidden rounded-[2rem] border p-7 shadow-sm sm:p-9">
                        <div className="bg-primary absolute -top-12 -right-12 size-36 rounded-full opacity-10" />
                        <span className="bg-primary text-primary-foreground flex size-14 items-center justify-center rounded-2xl">
                            <MessagesSquare className="size-7" />
                        </span>
                        <p className="public-section-label mt-8">
                            Ruang bertumbuh
                        </p>
                        <h2 className="public-display mt-3 text-3xl leading-tight font-bold sm:text-4xl">
                            Setiap karya punya cerita untuk sampai kepada
                            pembacanya.
                        </h2>
                        <p className="text-muted-foreground mt-5 leading-7">
                            Kami merapikan proses, memperjelas informasi, dan
                            membuka kanal yang membuat perjalanan penerbitan
                            terasa lebih dekat.
                        </p>
                    </div>
                    <div>
                        <p className="public-section-label">
                            Tentang Taretan Media
                        </p>
                        <h2 className="public-display mt-3 text-3xl leading-tight font-bold sm:text-5xl">
                            Mendekatkan Penulis, Pembaca, dan Pengetahuan.
                        </h2>
                        <p className="text-muted-foreground mt-5 max-w-2xl leading-8">
                            Kami hadir sebagai mitra penerbitan buku dan
                            publikasi ilmiah bagi siapa pun yang ingin mengubah
                            gagasan menjadi karya yang dapat dibaca dan
                            dirasakan.
                        </p>
                        <ul className="mt-7 space-y-3">
                            {trustPoints.map((point) => (
                                <li
                                    key={point}
                                    className="flex items-start gap-3 text-sm font-medium"
                                >
                                    <span className="bg-primary/10 text-primary mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full">
                                        <Check className="size-3.5" />
                                    </span>
                                    {point}
                                </li>
                            ))}
                        </ul>
                        <Link
                            href="/profil"
                            className="text-primary mt-7 inline-flex items-center gap-2 text-sm font-bold hover:underline"
                        >
                            Kenali kami <ArrowRight className="size-4" />
                        </Link>
                    </div>
                </PageContainer>
            </section>

            <DiscoverySection
                title="Jurnal Terbaru"
                eyebrow="Publikasi ilmiah"
                href="/jurnal"
                empty="Belum ada jurnal yang dipublikasikan."
                columns="lg:grid-cols-4"
                maxItems={4}
            >
                {journals.map((journal) => (
                    <JournalCardView key={journal.slug} journal={journal} />
                ))}
            </DiscoverySection>

            <section className={publicMutedSectionClass}>
                <PageContainer className={`${publicSectionClass}`}>
                    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
                        <div>
                            <p className="public-section-label">Layanan</p>
                            <h2 className="public-display mt-3 text-3xl leading-tight font-bold sm:text-4xl">
                                Dukungan untuk Perjalanan Penerbitan.
                            </h2>
                            <p className="text-muted-foreground mt-4 leading-7">
                                Pilih kebutuhan Anda dan mulai percakapan dengan
                                tim kami.
                            </p>
                        </div>
                        <Button
                            asChild
                            variant="outline"
                            className="mt-6 rounded-xl"
                        >
                            <Link href="/layanan">
                                Lihat semua layanan <ArrowRight />
                            </Link>
                        </Button>
                    </div>
                    <PublishingServiceGrid />
                </PageContainer>
            </section>

            <PublishingSteps />

            <ProfessionalTeam />

            <DiscoverySection
                title="Artikel Terbaru"
                eyebrow="Wawasan"
                href="/artikel"
                empty="Belum ada artikel yang dipublikasikan."
                columns="lg:grid-cols-3"
                maxItems={3}
            >
                {articles.map((article) => (
                    <ArticleCardView key={article.slug} article={article} />
                ))}
            </DiscoverySection>

            <section className="bg-primary text-primary-foreground">
                <PageContainer className="py-16 text-center sm:py-20">
                    <p className="text-accent text-xs font-bold tracking-[0.2em] uppercase">
                        Mari mulai
                    </p>
                    <h2 className="public-display mx-auto mt-4 max-w-3xl text-3xl leading-tight font-bold sm:text-5xl">
                        Punya Naskah atau Ide Penerbitan?
                    </h2>
                    <p className="text-primary-foreground/80 mx-auto mt-4 max-w-2xl leading-8">
                        Ceritakan kebutuhan Anda melalui kanal resmi kami dan
                        temukan langkah yang paling tepat untuk karya Anda.
                    </p>
                    <div className="mt-8 flex flex-wrap justify-center gap-3">
                        <Button
                            asChild
                            variant="secondary"
                            size="lg"
                            className="rounded-xl"
                        >
                            <Link href="/kirim-naskah">
                                <Send /> Kirim naskah
                            </Link>
                        </Button>
                        <Button
                            asChild
                            variant="outline"
                            size="lg"
                            className="border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground rounded-xl bg-transparent"
                        >
                            <Link href="/kontak">
                                Hubungi kami <ArrowRight />
                            </Link>
                        </Button>
                    </div>
                </PageContainer>
            </section>
        </>
    );
}

function BookVisual({
    title,
    color,
    className,
    featured = false,
}: {
    title: string;
    color: string;
    className?: string;
    featured?: boolean;
}) {
    return (
        <div
            className={`${color} ${className ?? ''} ${featured ? 'h-56 w-36 sm:h-64 sm:w-44' : 'h-44 w-24 sm:h-52 sm:w-32'} flex shrink-0 flex-col justify-between rounded-t-md rounded-b-sm p-3 text-white shadow-xl sm:p-4`}
        >
            <BookOpen className="size-5 opacity-80" />
            <div>
                <div className="mb-3 h-px w-8 bg-white/60" />
                <p
                    className={`${featured ? 'text-2xl' : 'text-lg'} public-display leading-none font-bold`}
                >
                    {title}
                </p>
                <p className="mt-2 text-[9px] font-bold tracking-[0.15em] uppercase opacity-75">
                    Taretan Media
                </p>
            </div>
        </div>
    );
}

function DiscoverySection({
    eyebrow,
    title,
    href,
    empty,
    columns = 'grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4',
    maxItems = 4,
    children,
}: {
    eyebrow: string;
    title: string;
    href: string;
    empty: string;
    columns?: string;
    maxItems?: number;
    children: React.ReactNode[];
}) {
    const items = children.slice(0, maxItems);

    return (
        <section>
            <PageContainer className={`${publicSectionClass} pt-12`}>
                <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
                    <div>
                        <p className="public-section-label">{eyebrow}</p>
                        <h2 className="public-display mt-2 text-2xl font-bold tracking-tight sm:text-4xl">
                            {title}
                        </h2>
                    </div>
                    <Button asChild variant="ghost" className="rounded-xl">
                        <Link href={href}>
                            Lihat semua <ArrowRight />
                        </Link>
                    </Button>
                </div>
                {items.length > 0 ? (
                    <div
                        className={`-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-3 sm:mx-0 sm:px-0 lg:grid lg:overflow-visible lg:pb-0 ${columns}`}
                    >
                        {items.map((child, index) => (
                            <div
                                key={index}
                                className={publicDiscoveryItemClass}
                            >
                                {child}
                            </div>
                        ))}
                    </div>
                ) : (
                    <EmptyState description={empty} />
                )}
            </PageContainer>
        </section>
    );
}
