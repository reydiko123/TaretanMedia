import { Link, usePage } from '@inertiajs/react';
import { Menu, Send } from 'lucide-react';
import { useState, type MouseEventHandler } from 'react';
import { Button } from '@/components/ui/button';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import type { PublicNavigationItem, PublicSharedProps } from '@/types';
import { publicNavIsActive, publicNavLinkClass } from '@/lib/public-theme';

const fallbackNavigation: PublicNavigationItem[] = [
    { label: 'Beranda', href: '/' },
    { label: 'Buku', href: '/buku' },
    { label: 'Jurnal', href: '/jurnal' },
    { label: 'Artikel', href: '/artikel' },
    { label: 'Profil', href: '/profil' },
    { label: 'Layanan', href: '/layanan' },
    { label: 'Kontak', href: '/kontak' },
];

function NavLink({
    item,
    currentUrl,
    mobile = false,
    onClick,
}: {
    item: PublicNavigationItem;
    currentUrl: string;
    mobile?: boolean;
    onClick?: MouseEventHandler<Element>;
}) {
    const active = publicNavIsActive(currentUrl, item.href);
    return (
        <Link
            href={item.href}
            aria-current={active ? 'page' : undefined}
            className={publicNavLinkClass(active, mobile)}
            onClick={onClick}
        >
            {item.label}
        </Link>
    );
}

export function PublicNav() {
    const page = usePage();
    const props = page.props as unknown as Partial<PublicSharedProps>;
    const navigation = props.navigation?.length
        ? props.navigation
        : fallbackNavigation;
    const siteName = props.site?.name || 'Taretan Media';
    const [open, setOpen] = useState(false);

    return (
        <header className="border-border bg-background/95 supports-[backdrop-filter]:bg-background/80 sticky top-0 z-40 w-full border-b backdrop-blur">
            <nav
                aria-label="Navigasi utama"
                className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between px-4 sm:px-6"
            >
                <Link
                    href="/"
                    aria-label={`${siteName}, Beranda`}
                    className="focus-visible:ring-ring flex items-center gap-3 rounded-md focus-visible:ring-2 focus-visible:outline-none"
                >
                    <img
                        src="/images/brand/logo-pojok-kiri-atas.png"
                        alt=""
                        className="size-10 object-contain"
                    />
                    <span className="leading-tight">
                        <span className="public-display text-foreground block text-lg font-bold tracking-tight">
                            {siteName}
                        </span>
                        <span className="text-muted-foreground hidden text-[10px] font-semibold tracking-[0.16em] uppercase sm:block">
                            Penerbit buku & publikasi ilmiah
                        </span>
                    </span>
                </Link>
                <ul className="hidden items-center gap-1 lg:flex">
                    {navigation.map((item) => (
                        <li key={item.href}>
                            <NavLink item={item} currentUrl={page.url} />
                        </li>
                    ))}
                </ul>
                <div className="hidden items-center gap-3 lg:flex">
                    <Button asChild className="rounded-xl px-4">
                        <Link href="/kirim-naskah">
                            <Send aria-hidden="true" /> Kirim naskah
                        </Link>
                    </Button>
                </div>
                <Sheet open={open} onOpenChange={setOpen}>
                    <SheetTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="lg:hidden"
                            aria-label="Buka menu navigasi"
                        >
                            <Menu className="size-5" aria-hidden="true" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent className="!inset-y-auto !top-0 !right-0 !h-auto max-h-[86vh] w-[min(21rem,88vw)] overflow-x-hidden rounded-bl-3xl border-b shadow-2xl">
                        <SheetHeader>
                            <SheetTitle>{siteName}</SheetTitle>
                            <SheetDescription>
                                Navigasi utama situs Taretan Media.
                            </SheetDescription>
                        </SheetHeader>
                        <ul className="grid min-w-0 gap-1 px-4">
                            {navigation.map((item) => (
                                <li key={item.href} className="min-w-0">
                                    <NavLink
                                        item={item}
                                        currentUrl={page.url}
                                        mobile
                                        onClick={() => setOpen(false)}
                                    />
                                </li>
                            ))}
                        </ul>
                        <div className="px-4 pt-4">
                            <Button asChild className="w-full rounded-xl">
                                <Link
                                    href="/kirim-naskah"
                                    onClick={() => setOpen(false)}
                                >
                                    <Send aria-hidden="true" /> Kirim naskah
                                </Link>
                            </Button>
                        </div>
                    </SheetContent>
                </Sheet>
            </nav>
        </header>
    );
}
