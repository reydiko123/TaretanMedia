import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import { PublicFooter } from '@/components/public-footer';
import { PublicNav } from '@/components/public-nav';
import { configureAnalytics } from '@/lib/analytics';
import type { PublicSharedProps } from '@/types';

export default function PublicLayout({ children }: { children: ReactNode }) {
    const props = usePage().props as unknown as Partial<PublicSharedProps>;
    useEffect(() => {
        configureAnalytics(
            props.site?.conversion?.analytics ?? {
                enabled: false,
                endpoint: null,
            },
        );
    }, [props.site?.conversion?.analytics]);

    return (
        <div className="bg-background text-foreground flex min-h-screen flex-col">
            <a
                href="#main-content"
                className="focus:bg-primary focus:text-primary-foreground sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:px-4 focus:py-2"
            >
                Lewati ke konten
            </a>
            <PublicNav />
            <main id="main-content" className="flex-1">
                {children}
            </main>
            <PublicFooter />
        </div>
    );
}
