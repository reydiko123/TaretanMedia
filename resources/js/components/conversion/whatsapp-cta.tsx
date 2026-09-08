import { MessageCircle } from 'lucide-react';
import { buildWhatsAppUrl, type WhatsAppConfig } from '@/lib/whatsapp';
import { track } from '@/lib/analytics';
import { Button } from '@/components/ui/button';

export function WhatsAppCta({
    kind,
    context,
    config,
    event,
    fallbackHref = '/kontak',
    children,
}: {
    kind: 'book' | 'service' | 'manuscript' | 'contact';
    context: Parameters<typeof buildWhatsAppUrl>[1];
    config?: WhatsAppConfig;
    event: Parameters<typeof track>[0];
    fallbackHref?: string;
    children: React.ReactNode;
}) {
    const href = config ? buildWhatsAppUrl(kind, context, config) : null;
    if (!href) {
        return (
            <Button asChild size="lg">
                <a href={fallbackHref}>{children}</a>
            </Button>
        );
    }
    return (
        <Button asChild size="lg">
            <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track(event)}
            >
                <MessageCircle aria-hidden="true" /> {children}
            </a>
        </Button>
    );
}
