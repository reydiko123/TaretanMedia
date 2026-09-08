import { Link } from '@inertiajs/react';
import { ArrowRight, Check } from 'lucide-react';
import {
    EmptyState,
    PageContainer,
    PageHeader,
    PublicBreadcrumbs,
} from '@/components/public/public-ui';
import { SeoHead } from '@/components/public/seo-head';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import type { PublicService, SeoProps } from '@/types';

export default function ServicesIndex({
    seo,
    services,
}: {
    seo: SeoProps;
    services: PublicService[];
}) {
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
                    description="Kenali layanan Taretan Media tanpa paket harga tetap. Setiap kebutuhan dapat dibicarakan melalui kanal resmi kami."
                />
                {services.length > 0 ? (
                    <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
                        {services.map((service) => (
                            <Card key={service.name} className="h-full">
                                <CardHeader>
                                    <CardTitle className="text-xl">
                                        {service.name}
                                    </CardTitle>
                                    {service.summary && (
                                        <p className="text-muted-foreground text-sm leading-6">
                                            {service.summary}
                                        </p>
                                    )}
                                </CardHeader>
                                {(service.description ||
                                    service.features.length > 0) && (
                                    <CardContent className="space-y-5">
                                        {service.description && (
                                            <p className="text-muted-foreground leading-7">
                                                {service.description}
                                            </p>
                                        )}
                                        {service.features.length > 0 && (
                                            <ul className="space-y-2 text-sm">
                                                {service.features.map(
                                                    (feature) => (
                                                        <li
                                                            key={feature}
                                                            className="flex gap-2"
                                                        >
                                                            <Check className="text-primary mt-0.5 size-4 shrink-0" />
                                                            {feature}
                                                        </li>
                                                    ),
                                                )}
                                            </ul>
                                        )}
                                    </CardContent>
                                )}
                                <CardFooter className="mt-auto">
                                    <Button asChild variant="outline">
                                        <Link href="/kontak">
                                            {service.ctaLabel ||
                                                'Konsultasikan layanan'}{' '}
                                            <ArrowRight />
                                        </Link>
                                    </Button>
                                </CardFooter>
                            </Card>
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
