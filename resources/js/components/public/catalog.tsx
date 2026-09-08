import { Link } from '@inertiajs/react';
import { ArrowRight, CalendarDays, UserRound } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import type {
    ArticleCard,
    BookCard,
    BookFilters,
    CatalogFilters,
    CategoryOption,
    JournalCard,
} from '@/types';
import { CategoryBadges, PublicImage } from './public-ui';
import { track } from '@/lib/analytics';

type FilterProps = {
    action: string;
    filters: CatalogFilters | BookFilters;
    categories: CategoryOption[];
    kind: 'book' | 'journal' | 'article';
};

const sortOptions = {
    book: [
        ['newest', 'Terbaru'],
        ['oldest', 'Terlama'],
        ['title_asc', 'Judul A–Z'],
        ['title_desc', 'Judul Z–A'],
        ['price_asc', 'Harga terendah'],
        ['price_desc', 'Harga tertinggi'],
    ],
    journal: [
        ['newest', 'Terbaru'],
        ['oldest', 'Terlama'],
        ['title_asc', 'Judul A–Z'],
        ['title_desc', 'Judul Z–A'],
        ['year_desc', 'Tahun terbaru'],
        ['year_asc', 'Tahun terlama'],
    ],
    article: [
        ['newest', 'Terbaru'],
        ['oldest', 'Terlama'],
        ['title_asc', 'Judul A–Z'],
        ['title_desc', 'Judul Z–A'],
    ],
} as const;

export function CatalogFilterForm({
    action,
    filters,
    categories,
    kind,
}: FilterProps) {
    const bookFilters = kind === 'book' ? (filters as BookFilters) : null;
    return (
        <form
            method="get"
            action={action}
            onSubmit={() => {
                if (kind === 'book')
                    track('book_filter', { filter_kind: 'search' });
            }}
            className="bg-muted/40 mb-8 rounded-xl border p-4 sm:p-5"
        >
            <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-4">
                <label className="col-span-2 grid gap-1.5 text-sm font-medium lg:col-span-2">
                    Cari
                    <input
                        type="search"
                        name="q"
                        defaultValue={filters.search}
                        placeholder={`Cari ${kind === 'book' ? 'judul atau penulis' : kind === 'journal' ? 'judul atau tema' : 'judul atau penulis'}`}
                        className="border-input bg-background focus-visible:ring-ring h-10 rounded-md border px-3 outline-none focus-visible:ring-2"
                    />
                </label>
                <label className="grid gap-1.5 text-sm font-medium">
                    Kategori
                    <select
                        name="category"
                        defaultValue={filters.category ?? ''}
                        className="border-input bg-background focus-visible:ring-ring h-10 rounded-md border px-3 outline-none focus-visible:ring-2"
                    >
                        <option value="">Semua kategori</option>
                        {categories.map((category) => (
                            <option key={category.slug} value={category.slug}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </label>
                <label className="grid gap-1.5 text-sm font-medium">
                    Urutkan
                    <select
                        name="sort"
                        defaultValue={filters.sort}
                        className="border-input bg-background focus-visible:ring-ring h-10 rounded-md border px-3 outline-none focus-visible:ring-2"
                    >
                        {sortOptions[kind].map(([value, label]) => (
                            <option key={value} value={value}>
                                {label}
                            </option>
                        ))}
                    </select>
                </label>
                {bookFilters && (
                    <>
                        <label className="grid gap-1.5 text-sm font-medium">
                            Harga minimum
                            <input
                                className="border-input bg-background focus-visible:ring-ring h-10 rounded-md border px-3 outline-none focus-visible:ring-2"
                                type="number"
                                name="min_price"
                                min="0"
                                step="1"
                                defaultValue={bookFilters.minPrice ?? ''}
                            />
                        </label>
                        <label className="grid gap-1.5 text-sm font-medium">
                            Harga maksimum
                            <input
                                className="border-input bg-background focus-visible:ring-ring h-10 rounded-md border px-3 outline-none focus-visible:ring-2"
                                type="number"
                                name="max_price"
                                min="0"
                                step="1"
                                defaultValue={bookFilters.maxPrice ?? ''}
                            />
                        </label>
                        <label className="grid gap-1.5 text-sm font-medium">
                            Tahun terbit
                            <input
                                className="border-input bg-background focus-visible:ring-ring h-10 rounded-md border px-3 outline-none focus-visible:ring-2"
                                type="number"
                                name="year"
                                min="1900"
                                max="2100"
                                step="1"
                                defaultValue={bookFilters.year ?? ''}
                            />
                        </label>
                    </>
                )}
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
                <Button type="submit">Terapkan filter</Button>
                <Button asChild variant="ghost">
                    <Link href={action}>Reset</Link>
                </Button>
            </div>
        </form>
    );
}

export function BookCardView({ book }: { book: BookCard }) {
    return (
        <Card className="h-full overflow-hidden py-0 transition-shadow hover:shadow-md">
            <Link href={`/buku/${book.slug}`} className="block">
                <PublicImage
                    src={book.coverUrl}
                    alt={`Sampul ${book.title}`}
                    className="rounded-none"
                />
            </Link>
            <CardHeader className="gap-3">
                <CategoryBadges categories={book.categories} />
                <CardTitle className="text-lg leading-snug">
                    <Link
                        className="hover:underline"
                        href={`/buku/${book.slug}`}
                    >
                        {book.title}
                    </Link>
                </CardTitle>
                {book.authors.length > 0 && (
                    <p className="text-muted-foreground text-sm">
                        {book.authors.join(', ')}
                    </p>
                )}
            </CardHeader>
            <CardContent className="mt-auto flex items-center justify-between gap-3 pb-0 text-sm">
                <span className="font-semibold">{book.formattedPrice}</span>
                {book.publicationYear && (
                    <span className="text-muted-foreground">
                        {book.publicationYear}
                    </span>
                )}
            </CardContent>
            <CardFooter className="pb-6">
                <Button asChild variant="link" className="h-auto px-0">
                    <Link href={`/buku/${book.slug}`}>
                        Lihat detail <ArrowRight />
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    );
}

export function JournalCardView({ journal }: { journal: JournalCard }) {
    return (
        <Card className="h-full overflow-hidden py-0 transition-shadow hover:shadow-md">
            <Link href={`/jurnal/${journal.slug}`}>
                <PublicImage
                    src={journal.coverUrl}
                    alt={`Sampul ${journal.title}`}
                    className="rounded-none"
                />
            </Link>
            <CardHeader className="gap-3">
                <CategoryBadges categories={journal.categories} />
                <CardTitle className="text-lg leading-snug">
                    <Link
                        className="hover:underline"
                        href={`/jurnal/${journal.slug}`}
                    >
                        {journal.title}
                    </Link>
                </CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground mt-auto space-y-1 pb-0 text-sm">
                {journal.theme && <p>{journal.theme}</p>}
                {(journal.editionLabel || journal.publicationYear) && (
                    <p>
                        {[journal.editionLabel, journal.publicationYear]
                            .filter(Boolean)
                            .join(' · ')}
                    </p>
                )}
            </CardContent>
            <CardFooter className="pb-6">
                <Button asChild variant="link" className="h-auto px-0">
                    <Link href={`/jurnal/${journal.slug}`}>
                        Lihat detail <ArrowRight />
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    );
}

export function ArticleCardView({ article }: { article: ArticleCard }) {
    return (
        <Card className="h-full overflow-hidden py-0 transition-shadow hover:shadow-md">
            <Link href={`/artikel/${article.slug}`}>
                <PublicImage
                    src={article.featuredImageUrl}
                    alt={`Ilustrasi ${article.title}`}
                    aspect="landscape"
                    className="rounded-none"
                />
            </Link>
            <CardHeader className="gap-3">
                <CategoryBadges categories={article.categories} />
                <CardTitle className="text-xl leading-snug">
                    <Link
                        className="hover:underline"
                        href={`/artikel/${article.slug}`}
                    >
                        {article.title}
                    </Link>
                </CardTitle>
                <div className="text-muted-foreground flex flex-wrap gap-x-4 gap-y-1 text-sm">
                    <span className="inline-flex items-center gap-1">
                        <UserRound className="size-4" />
                        {article.author.name}
                    </span>
                    <time
                        dateTime={article.publishedAt}
                        className="inline-flex items-center gap-1"
                    >
                        <CalendarDays className="size-4" />
                        {formatDate(article.publishedAt)}
                    </time>
                </div>
            </CardHeader>
            {article.excerpt && (
                <CardContent className="text-muted-foreground line-clamp-3 pb-0 text-sm leading-6">
                    {article.excerpt}
                </CardContent>
            )}
            <CardFooter className="mt-auto pb-6">
                <Button asChild variant="link" className="h-auto px-0">
                    <Link href={`/artikel/${article.slug}`}>
                        Baca artikel <ArrowRight />
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    );
}

export function formatDate(value: string) {
    return new Intl.DateTimeFormat('id-ID', { dateStyle: 'long' }).format(
        new Date(value),
    );
}
