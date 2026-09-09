import { ArrowRight, Check } from 'lucide-react';
import type { WhatsAppConfig } from '@/lib/whatsapp';
import type { PublicService } from '@/types';
import { WhatsAppCta } from '@/components/conversion/whatsapp-cta';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

type ServiceCardProps = {
    service: PublicService;
    showCta: boolean;
    whatsappConfig?: WhatsAppConfig;
};

export function ServiceCard({
    service,
    showCta,
    whatsappConfig,
}: ServiceCardProps) {
    return (
        <Card className="h-full">
            <CardHeader>
                <CardTitle className="text-xl">{service.name}</CardTitle>
                {service.summary && (
                    <p className="text-muted-foreground text-sm leading-6">
                        {service.summary}
                    </p>
                )}
                <p className="mt-2 text-2xl font-bold">
                    {service.formattedPrice}
                </p>
            </CardHeader>
            {(service.description || service.features.length > 0) && (
                <CardContent className="space-y-5">
                    {service.description && (
                        <p className="text-muted-foreground leading-7">
                            {service.description}
                        </p>
                    )}
                    {service.features.length > 0 && (
                        <ul className="space-y-2 text-sm">
                            {service.features.map((feature) => (
                                <li key={feature} className="flex gap-2">
                                    <Check className="text-primary mt-0.5 size-4 shrink-0" />
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    )}
                </CardContent>
            )}
            {showCta && (
                <CardFooter className="mt-auto">
                    <WhatsAppCta
                        kind="service"
                        context={{ service: service.name }}
                        config={whatsappConfig}
                        event="service_whatsapp_click"
                        fallbackHref="/kontak"
                    >
                        {service.ctaLabel || 'Konsultasikan layanan'}{' '}
                        <ArrowRight />
                    </WhatsAppCta>
                </CardFooter>
            )}
        </Card>
    );
}
