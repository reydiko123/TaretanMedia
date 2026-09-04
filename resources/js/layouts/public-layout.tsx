import type { ReactNode } from 'react';
import { PublicFooter } from '@/components/public-footer';
import { PublicNav } from '@/components/public-nav';

export default function PublicLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex min-h-screen flex-col bg-background text-foreground">
            <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
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
