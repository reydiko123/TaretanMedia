import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import { AppShell } from '@/new-ui/components/layout/AppShell';
import { configureAnalytics } from '@/lib/analytics';
import type { PublicSharedProps } from '@/types';
import type { HomeContact } from '@/new-ui/pages/Home/data/homeTypes';

export default function PublicLayout({ children }: { children: ReactNode }) {
    const page = usePage();
    const props = page.props as unknown as Partial<PublicSharedProps>;
    const pathname = page.url.split(/[?#]/, 1)[0].replace(/\/+$/, '') || '/';
    const isManuscriptPage = pathname === '/kirim-naskah';
    useEffect(() => {
        configureAnalytics(
            props.site?.conversion?.analytics ?? {
                enabled: false,
                endpoint: null,
            },
        );
    }, [props.site?.conversion?.analytics]);

    const contact: HomeContact = {
        whatsappNumber: props.site?.conversion?.whatsapp?.number ?? null,
        whatsappLabel: props.site?.conversion?.whatsapp?.number
            ? 'WhatsApp Taretan Media'
            : null,
        whatsappGreeting:
            props.site?.conversion?.whatsapp?.templates.contact ?? null,
        email: props.site?.contact?.email ?? null,
        instagramUrl: props.site?.contact?.instagramUrl ?? null,
        mapUrl: props.site?.contact?.mapsUrl ?? null,
        address: props.site?.contact?.address ?? null,
    };

    return (
        <AppShell
            brandName={props.site?.name ?? 'Taretan Media'}
            contact={contact}
            showHeader={!isManuscriptPage}
        >
            {children}
        </AppShell>
    );
}
