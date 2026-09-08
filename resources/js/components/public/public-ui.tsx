import { Link } from '@inertiajs/react';
import { ImageOff, Link2, Share2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { Paginated, PublicBreadcrumbItem } from '@/types';

export function PageContainer({
    className,
    ...props
}: React.ComponentProps<'div'>) {
    return (
        <div
            className={cn('mx-auto w-full max-w-6xl px-4 sm:px-6', className)}
            {...props}
        />
    );
}

export function PageHeader({
    eyebrow,
    title,
    description,
}: {
    eyebrow?: string;
    title: string;
    description?: string;
}) {
    return (
        <header className="max-w-3xl py-10 sm:py-14">
            {eyebrow && (
                <p className="text-primary text-sm font-semibold tracking-wide uppercase">
                    {eyebrow}
                </p>
            )}
            <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                {title}
            </h1>
            {description && (
                <p className="text-muted-foreground mt-4 text-lg leading-8">
                    {description}
                </p>
            )}
        </header>
    );
}

export function PublicBreadcrumbs({
    items,
}: {
    items: PublicBreadcrumbItem[];
}) {
    return (
        <nav aria-label="Breadcrumb" className="pt-6 text-sm">
            <ol className="text-muted-foreground flex flex-wrap items-center gap-2">
                {items.map((item, index) => (
                    <li
                        key={`${item.label}-${index}`}
                        className="flex items-center gap-2"
                    >
                        {index > 0 && <span aria-hidden="true">/</span>}
                        {item.href ? (
                            <Link
                                className="hover:text-foreground underline-offset-4 hover:underline"
                                href={item.href}
                            >
                                {item.label}
                            </Link>
                        ) : (
                            <span
                                className="text-foreground"
                                aria-current="page"
                            >
                                {item.label}
                            </span>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
}

export function PublicImage({
    src,
    alt,
    className,
    imageClassName,
    aspect = 'portrait',
    priority = false,
}: {
    src: string | null;
    alt: string;
    className?: string;
    imageClassName?: string;
    aspect?: 'portrait' | 'landscape' | 'square';
    priority?: boolean;
}) {
    const [failed, setFailed] = useState(!src);
    useEffect(() => setFailed(!src), [src]);
    const aspectClass =
        aspect === 'portrait'
            ? 'aspect-[3/4]'
            : aspect === 'landscape'
              ? 'aspect-video'
              : 'aspect-square';

    return (
        <div
            className={cn(
                'bg-muted text-muted-foreground relative overflow-hidden rounded-lg',
                aspectClass,
                className,
            )}
        >
            {!failed && src ? (
                <img
                    src={src}
                    alt={alt}
                    width={aspect === 'portrait' ? 600 : 1200}
                    height={
                        aspect === 'portrait'
                            ? 800
                            : aspect === 'landscape'
                              ? 675
                              : 1200
                    }
                    loading={priority ? 'eager' : 'lazy'}
                    fetchPriority={priority ? 'high' : 'auto'}
                    className={cn('size-full object-cover', imageClassName)}
                    onError={() => setFailed(true)}
                />
            ) : (
                <div
                    className="flex size-full flex-col items-center justify-center gap-2 p-6 text-center"
                    role="img"
                    aria-label={`Gambar tidak tersedia: ${alt}`}
                >
                    <ImageOff className="size-8" aria-hidden="true" />
                    <span className="text-xs">Gambar tidak tersedia</span>
                </div>
            )}
        </div>
    );
}

export function CategoryBadges({
    categories,
}: {
    categories: { name: string; slug: string }[];
}) {
    if (categories.length === 0) return null;
    return (
        <ul className="flex flex-wrap gap-2" aria-label="Kategori">
            {categories.map((category) => (
                <li
                    key={category.slug}
                    className="bg-secondary text-secondary-foreground rounded-full px-2.5 py-1 text-xs font-medium"
                >
                    {category.name}
                </li>
            ))}
        </ul>
    );
}

export function EmptyState({
    title = 'Belum ada konten',
    description,
    resetHref,
}: {
    title?: string;
    description: string;
    resetHref?: string;
}) {
    return (
        <div className="border-border bg-muted/30 rounded-xl border border-dashed px-6 py-14 text-center">
            <h2 className="text-lg font-semibold">{title}</h2>
            <p className="text-muted-foreground mx-auto mt-2 max-w-lg">
                {description}
            </p>
            {resetHref && (
                <Button asChild variant="outline" className="mt-6">
                    <Link href={resetHref}>Reset filter</Link>
                </Button>
            )}
        </div>
    );
}

export function ShareButton({
    url,
    title,
    text,
}: {
    url: string;
    title: string;
    text?: string;
}) {
    const [status, setStatus] = useState('');

    async function share() {
        try {
            if (navigator.share) {
                await navigator.share({ title, text, url });
                setStatus('Tautan berhasil dibagikan.');
                return;
            }
            await navigator.clipboard.writeText(url);
            setStatus('Tautan berhasil disalin.');
        } catch (error) {
            if (error instanceof DOMException && error.name === 'AbortError')
                return;
            setStatus(
                'Tautan belum dapat disalin. Silakan salin dari bilah alamat.',
            );
        }
    }

    return (
        <div>
            <Button type="button" variant="outline" onClick={share}>
                {typeof navigator !== 'undefined' && 'share' in navigator ? (
                    <Share2 aria-hidden="true" />
                ) : (
                    <Link2 aria-hidden="true" />
                )}
                Bagikan
            </Button>
            <p className="sr-only" aria-live="polite">
                {status}
            </p>
        </div>
    );
}

function cleanPaginationLabel(label: string) {
    return label
        .replace('&laquo;', '‹')
        .replace('&raquo;', '›')
        .replace(/<[^>]*>/g, '');
}

export function CatalogPagination<T>({
    pagination,
}: {
    pagination: Paginated<T>;
}) {
    if (pagination.lastPage <= 1) return null;
    return (
        <nav
            className="mt-10 flex flex-col items-center gap-4"
            aria-label="Pagination katalog"
        >
            <p className="text-muted-foreground text-sm">
                Menampilkan {pagination.from ?? 0}–{pagination.to ?? 0} dari{' '}
                {pagination.total}
            </p>
            <ul className="flex flex-wrap justify-center gap-2">
                {pagination.links.map((link, index) => (
                    <li key={`${link.label}-${index}`}>
                        {link.url ? (
                            <Link
                                href={link.url}
                                preserveScroll
                                aria-current={link.active ? 'page' : undefined}
                                className={cn(
                                    'focus-visible:ring-ring inline-flex min-h-9 min-w-9 items-center justify-center rounded-md border px-3 text-sm focus-visible:ring-2 focus-visible:outline-none',
                                    link.active
                                        ? 'bg-primary text-primary-foreground border-primary'
                                        : 'bg-background hover:bg-accent',
                                )}
                            >
                                {cleanPaginationLabel(link.label)}
                            </Link>
                        ) : (
                            <span
                                className="text-muted-foreground inline-flex min-h-9 min-w-9 items-center justify-center rounded-md border px-3 text-sm opacity-50"
                                aria-disabled="true"
                            >
                                {cleanPaginationLabel(link.label)}
                            </span>
                        )}
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export function ErrorState({
    code,
    title,
    description,
}: {
    code: string;
    title: string;
    description: string;
}) {
    return (
        <PageContainer className="flex min-h-[65vh] items-center justify-center py-16 text-center">
            <div className="max-w-xl">
                <p className="text-primary text-sm font-bold tracking-widest">
                    ERROR {code}
                </p>
                <h1 className="mt-3 text-4xl font-bold tracking-tight">
                    {title}
                </h1>
                <p className="text-muted-foreground mt-4 text-lg">
                    {description}
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                    <Button asChild>
                        <Link href="/">Kembali ke Beranda</Link>
                    </Button>
                    <Button asChild variant="outline">
                        <Link href="/buku">Jelajahi buku</Link>
                    </Button>
                </div>
            </div>
        </PageContainer>
    );
}
