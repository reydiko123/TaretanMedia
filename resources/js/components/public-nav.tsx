import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
    { title: 'Beranda', href: '/' },
    { title: 'Buku', href: '/buku' },
    { title: 'Jurnal', href: '/jurnal' },
    { title: 'Artikel', href: '/artikel' },
    { title: 'Layanan', href: '/layanan' },
    { title: 'Kirim Naskah', href: '/kirim-naskah' },
    { title: 'Profil', href: '/profil' },
    { title: 'Kontak', href: '/kontak' },
];

export function PublicNav() {
    const [open, setOpen] = useState(false);
    const currentUrl = usePage().url;

    return (
        <header className="border-border bg-background/95 supports-[backdrop-filter]:bg-background/80 sticky top-0 z-40 w-full border-b backdrop-blur">
            <nav
                aria-label="Navigasi utama"
                className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6"
            >
                <Link
                    href="/"
                    className="text-foreground font-semibold tracking-tight"
                >
                    Taretan Media
                </Link>

                <ul className="hidden items-center gap-1 lg:flex">
                    {navItems.map((item) => {
                        const active =
                            item.href === '/'
                                ? currentUrl === '/'
                                : currentUrl.startsWith(item.href);
                        return (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className={cn(
                                        'hover:bg-accent hover:text-accent-foreground focus-visible:outline-ring rounded-md px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2',
                                        active
                                            ? 'text-foreground'
                                            : 'text-muted-foreground',
                                    )}
                                    aria-current={active ? 'page' : undefined}
                                >
                                    {item.title}
                                </Link>
                            </li>
                        );
                    })}
                </ul>

                <button
                    type="button"
                    className="text-foreground focus-visible:outline-ring inline-flex items-center justify-center rounded-md p-2 focus-visible:outline-2 focus-visible:outline-offset-2 lg:hidden"
                    aria-expanded={open}
                    aria-controls="mobile-nav"
                    aria-label={open ? 'Tutup menu' : 'Buka menu'}
                    onClick={() => setOpen((v) => !v)}
                >
                    {open ? (
                        <X className="size-5" />
                    ) : (
                        <Menu className="size-5" />
                    )}
                </button>
            </nav>

            {open && (
                <ul
                    id="mobile-nav"
                    className="border-border border-t px-4 pb-4 lg:hidden"
                >
                    {navItems.map((item) => (
                        <li key={item.href}>
                            <Link
                                href={item.href}
                                className="text-muted-foreground hover:bg-accent hover:text-accent-foreground block rounded-md px-3 py-2 text-sm font-medium"
                                onClick={() => setOpen(false)}
                            >
                                {item.title}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </header>
    );
}
