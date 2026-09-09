import {
    EmptyState,
    PageContainer,
    PageHeader,
    PublicBreadcrumbs,
} from '@/components/public/public-ui';
import { SeoHead } from '@/components/public/seo-head';
import { ServiceCard } from '@/components/public/service-card';
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
                    title="Dukungan penerbitan yang terarah"
                    description="Kenali layanan Taretan Media dan harga yang tersedia. Setiap kebutuhan dapat dibicarakan melalui kanal resmi kami."
                />
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
            </PageContainer>
        </>
    );
}
