import {
    ExternalLink,
    Instagram,
    Mail,
    MapPin,
    MessageCircle,
} from 'lucide-react';
import {
    EmptyState,
    PageContainer,
    PageHeader,
    PublicBreadcrumbs,
} from '@/components/public/public-ui';
import { WhatsAppCta } from '@/components/conversion/whatsapp-cta';
import { SeoHead } from '@/components/public/seo-head';
import type { PublicSite, SeoProps } from '@/types';
import { publicSurfaceClass } from '@/lib/public-theme';

export default function Contact({
    seo,
    site,
}: {
    seo: SeoProps;
    site: PublicSite;
}) {
    const whatsapp = site.conversion?.whatsapp;
    const channels = [
        site.contact.email
            ? {
                  title: 'Email',
                  value: site.contact.email,
                  href: `mailto:${site.contact.email}`,
                  icon: Mail,
                  external: false,
              }
            : null,
        site.contact.instagramUrl
            ? {
                  title: 'Instagram',
                  value: 'Buka akun Instagram resmi',
                  href: site.contact.instagramUrl,
                  icon: Instagram,
                  external: true,
              }
            : null,
        site.contact.mapsUrl
            ? {
                  title: 'Lokasi',
                  value: 'Lihat lokasi di peta',
                  href: site.contact.mapsUrl,
                  icon: MapPin,
                  external: true,
              }
            : null,
    ].filter(
        (channel): channel is NonNullable<typeof channel> => channel !== null,
    );

    return (
        <>
            <SeoHead seo={seo} />
            <PageContainer className="pb-16">
                <PublicBreadcrumbs
                    items={[
                        { label: 'Beranda', href: '/' },
                        { label: 'Kontak' },
                    ]}
                />
                <PageHeader
                    eyebrow="Kontak"
                    title="Terhubung Melalui Kanal Resmi"
                    description="Gunakan kanal yang tersedia untuk memperoleh informasi atau mendiskusikan kebutuhan penerbitan Anda."
                />
                {channels.length > 0 ? (
                    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                        {channels.map(
                            ({ title, value, href, icon: Icon, external }) => (
                                <a
                                    key={href}
                                    href={href}
                                    target={external ? '_blank' : undefined}
                                    rel={
                                        external
                                            ? 'noopener noreferrer'
                                            : undefined
                                    }
                                    className={`${publicSurfaceClass} focus-visible:ring-ring group hover:border-primary/30 p-6 transition hover:-translate-y-1 focus-visible:ring-2 focus-visible:outline-none`}
                                >
                                    <Icon className="text-primary size-7" />
                                    <h2 className="public-display mt-5 text-2xl font-bold">
                                        {title}
                                    </h2>
                                    <p className="text-muted-foreground mt-2 text-sm break-words">
                                        {value}
                                    </p>
                                    {external && (
                                        <span className="text-primary mt-5 inline-flex items-center gap-1 text-sm font-medium">
                                            Buka kanal{' '}
                                            <ExternalLink className="size-4" />
                                        </span>
                                    )}
                                </a>
                            ),
                        )}
                    </div>
                ) : (
                    <EmptyState
                        title="Informasi kontak belum tersedia"
                        description="Kanal resmi sedang disiapkan. Silakan kembali lagi nanti."
                    />
                )}
                {site.contact.whatsappConfigured && (
                    <div className="border-border bg-secondary/60 mt-8 flex gap-4 rounded-2xl border p-6 shadow-sm">
                        <MessageCircle className="text-primary mt-1 size-6 shrink-0" />
                        <div>
                            <h2 className="font-semibold">
                                {whatsapp?.available
                                    ? 'Hubungi kami melalui WhatsApp'
                                    : 'Konsultasi WhatsApp belum tersedia'}
                            </h2>
                            {whatsapp?.available ? (
                                <>
                                    <p className="text-muted-foreground mt-1 text-sm leading-6">
                                        Sampaikan pertanyaan Anda langsung
                                        melalui WhatsApp.
                                    </p>
                                    <div className="mt-4">
                                        <WhatsAppCta
                                            kind="contact"
                                            context={{}}
                                            config={whatsapp}
                                            event="contact_whatsapp_click"
                                        >
                                            Hubungi via WhatsApp
                                        </WhatsAppCta>
                                    </div>
                                </>
                            ) : (
                                <p className="text-muted-foreground mt-1 text-sm leading-6">
                                    Kanal WhatsApp sedang disiapkan. Silakan
                                    gunakan kanal kontak lain yang tersedia.
                                </p>
                            )}
                        </div>
                    </div>
                )}
            </PageContainer>
        </>
    );
}
