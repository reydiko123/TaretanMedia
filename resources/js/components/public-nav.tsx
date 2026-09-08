import { Link, usePage } from '@inertiajs/react';
import { Menu } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import type { PublicNavigationItem, PublicSharedProps } from '@/types';

const fallbackNavigation: PublicNavigationItem[] = [
    { label: 'Beranda', href: '/' },
    { label: 'Buku', href: '/buku' },
    { label: 'Jurnal', href: '/jurnal' },
    { label: 'Artikel', href: '/artikel' },
    { label: 'Profil', href: '/profil' },
    { label: 'Layanan', href: '/layanan' },
    { label: 'Kontak', href: '/kontak' },
];

function isActive(currentUrl: string, href: string) {
    const pathname = currentUrl.split('?')[0];
    return href === '/'
        ? pathname === '/'
        : pathname === href || pathname.startsWith(`${href}/`);
}

function NavLink({
    item,
    currentUrl,
    mobile = false,
}: {
    item: PublicNavigationItem;
    currentUrl: string;
    mobile?: boolean;
}) {
    const active = isActive(currentUrl, item.href);
    return (
        <Link
            href={item.href}
            aria-current={active ? 'page' : undefined}
            className={cn(
                'focus-visible:ring-ring rounded-md font-medium transition-colors focus-visible:ring-2 focus-visible:outline-none',
                mobile ? 'block px-3 py-3 text-base' : 'px-3 py-2 text-sm',
                active
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:bg-accent hover:text-foreground',
            )}
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
                className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6"
            >
                <Link
                    href="/"
                    aria-label={`${siteName}, Beranda`}
                    className="focus-visible:ring-ring rounded-md text-lg font-bold tracking-tight focus-visible:ring-2 focus-visible:outline-none"
                >
                    {siteName}
                </Link>
                <ul className="hidden items-center gap-1 lg:flex">
                    {navigation.map((item) => (
                        <li key={item.href}>
                            <NavLink item={item} currentUrl={page.url} />
                        </li>
                    ))}
                </ul>
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
                    <SheetContent className="w-[min(22rem,88vw)]">
                        <SheetHeader>
                            <SheetTitle>{siteName}</SheetTitle>
                            <SheetDescription>
                                Navigasi utama situs Taretan Media.
                            </SheetDescription>
                        </SheetHeader>
                        <ul className="grid gap-1 px-4">
                            {navigation.map((item) => (
                                <li key={item.href}>
                                    <SheetClose
                                        asChild
                                        onClick={() => setOpen(false)}
                                    >
                                        <NavLink
                                            item={item}
                                            currentUrl={page.url}
                                            mobile
                                        />
                                    </SheetClose>
                                </li>
                            ))}
                        </ul>
                    </SheetContent>
                </Sheet>
            </nav>
        </header>
    );
}
