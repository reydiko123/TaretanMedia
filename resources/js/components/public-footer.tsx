import { Link, usePage } from '@inertiajs/react';
import { ExternalLink, Instagram, Mail, MapPin, Send } from 'lucide-react';
import type { PublicSharedProps } from '@/types';
import { publishingServices } from '@/lib/public-content';

const footerLinks = [
    { label: 'Buku', href: '/buku' },
    { label: 'Jurnal', href: '/jurnal' },
    { label: 'Artikel', href: '/artikel' },
    { label: 'Profil', href: '/profil' },
    { label: 'Layanan', href: '/layanan' },
    { label: 'Kontak', href: '/kontak' },
    { label: 'Privasi', href: '/privasi' },
];

export function PublicFooter() {
    const props = usePage().props as unknown as Partial<PublicSharedProps>;
    const site = props.site;
    const contact = site?.contact;
    const channels = [
        contact?.email
            ? {
                  label: contact.email,
                  href: `mailto:${contact.email}`,
                  icon: Mail,
                  external: false,
              }
            : null,
        contact?.instagramUrl
            ? {
                  label: 'Instagram',
                  href: contact.instagramUrl,
                  icon: Instagram,
                  external: true,
              }
            : null,
        contact?.mapsUrl
            ? {
                  label: 'Lokasi',
                  href: contact.mapsUrl,
                  icon: MapPin,
                  external: true,
              }
            : null,
    ].filter(
        (channel): channel is NonNullable<typeof channel> => channel !== null,
    );

    return (
        <footer className="border-border bg-secondary/60 border-t">
            <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4">
                <div>
                    <img
                        src="/images/brand/logo-footer.jpeg"
                        alt={site?.name || 'Taretan Media'}
                        className="h-16 w-56 object-cover object-center"
                    />
                    <p className="text-muted-foreground mt-5 max-w-sm text-sm leading-7">
                        {site?.tagline || 'Penerbit buku dan publikasi ilmiah.'}
                    </p>
                    <Link
                        href="/kirim-naskah"
                        className="text-primary mt-5 inline-flex items-center gap-2 text-sm font-semibold hover:underline"
                    >
                        Kirim naskah <Send className="size-4" />
                    </Link>
                </div>
                <nav aria-label="Navigasi footer">
                    <p className="public-section-label">Jelajahi</p>
                    <ul className="mt-3 grid grid-cols-2 gap-2 text-sm">
                        {footerLinks.map((item) => (
                            <li key={item.href}>
                                <Link
                                    className="text-muted-foreground hover:text-foreground hover:underline"
                                    href={item.href}
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
                <nav aria-label="Layanan footer">
                    <p className="public-section-label">Layanan</p>
                    <ul className="mt-3 space-y-2 text-sm">
                        {publishingServices.map((service) => (
                            <li key={service.href}>
                                <Link
                                    className="text-muted-foreground hover:text-foreground hover:underline"
                                    href={service.href}
                                >
                                    {service.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
                <div>
                    <p className="public-section-label">Kanal resmi</p>
                    {channels.length > 0 ? (
                        <ul className="mt-3 space-y-2 text-sm">
                            {channels.map(
                                ({ label, href, icon: Icon, external }) => (
                                    <li key={href}>
                                        <a
                                            className="text-muted-foreground hover:text-foreground inline-flex items-center gap-2 hover:underline"
                                            href={href}
                                            target={
                                                external ? '_blank' : undefined
                                            }
                                            rel={
                                                external
                                                    ? 'noopener noreferrer'
                                                    : undefined
                                            }
                                        >
                                            <Icon
                                                className="size-4"
                                                aria-hidden="true"
                                            />
                                            {label}
                                            {external && (
                                                <ExternalLink
                                                    className="size-3"
                                                    aria-hidden="true"
                                                />
                                            )}
                                        </a>
                                    </li>
                                ),
                            )}
                        </ul>
                    ) : (
                        <p className="text-muted-foreground mt-3 text-sm">
                            Informasi kanal resmi akan tersedia di halaman
                            Kontak.
                        </p>
                    )}
                </div>
            </div>
            <div className="border-border border-t">
                <div className="text-muted-foreground mx-auto max-w-7xl px-4 py-5 text-sm sm:px-6">
                    &copy; {new Date().getFullYear()}{' '}
                    {site?.name || 'Taretan Media'}. Seluruh hak cipta
                    dilindungi.
                </div>
            </div>
        </footer>
    );
}
