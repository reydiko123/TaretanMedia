import {
    EmptyState,
    PageContainer,
    PageHeader,
    PublicBreadcrumbs,
} from '@/components/public/public-ui';
import { SeoHead } from '@/components/public/seo-head';
import { ServiceCard } from '@/components/public/service-card';
import { PublishingServiceGrid } from '@/components/public/landing-sections';
import type { PublicService, SeoProps } from '@/types';
import { usePage } from '@inertiajs/react';

export default function ServicesIndex({
    seo,
    services,
}: {
    seo: SeoProps;
    services: PublicService[];
}) {
    const site = (usePage().props as { site?: import('@/types').PublicSite })
        .site;
    return (
        <>
            <SeoHead seo={seo} />
            <PageContainer className="pb-16">
                <PublicBreadcrumbs
                    items={[
                        { label: 'Beranda', href: '/' },
                        { label: 'Layanan' },
                    ]}
                />
                <PageHeader
                    eyebrow="Layanan"
                    title="Dukungan Penerbitan yang Terarah"
                    description="Kenali layanan Taretan Media dan harga yang tersedia. Setiap kebutuhan dapat dibicarakan melalui kanal resmi kami."
                />
                <section className="pb-16">
                    <div className="mb-8 max-w-2xl">
                        <p className="public-section-label">Pilihan layanan</p>
                        <h2 className="public-display mt-3 text-3xl font-bold sm:text-4xl">
                            Temukan Dukungan yang Anda Butuhkan
                        </h2>
                        <p className="text-muted-foreground mt-3 leading-7">
                            Setiap layanan dapat dibicarakan sesuai kebutuhan
                            karya dan tahap penerbitan Anda.
                        </p>
                    </div>
                    <PublishingServiceGrid interactive={false} />
                </section>
                <section
                    id="paket-penerbitan"
                    className="border-border bg-secondary/60 -mx-4 border-y px-4 py-16 sm:-mx-6 sm:px-6"
                >
                    <div className="mb-8 max-w-2xl">
                        <p className="public-section-label">Paket penerbitan</p>
                        <h2 className="public-display mt-3 text-3xl font-bold sm:text-4xl">
                            Pilih Paket yang Sesuai
                        </h2>
                        <p className="text-muted-foreground mt-3 leading-7">
                            Paket di bawah ini berasal dari informasi layanan
                            yang telah tersedia di sistem Anda.
                        </p>
                    </div>
                    {services.length > 0 ? (
                        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
                            {services.map((service) => (
                                <ServiceCard
                                    key={service.name}
                                    service={service}
                                    showCta
                                    whatsappConfig={site?.conversion?.whatsapp}
                                />
                            ))}
                        </div>
                    ) : (
                        <EmptyState
                            title="Layanan sedang disiapkan"
                            description="Belum ada layanan aktif untuk ditampilkan. Hubungi kami untuk membicarakan kebutuhan penerbitan Anda."
                        />
                    )}
                </section>
            </PageContainer>
        </>
    );
}
