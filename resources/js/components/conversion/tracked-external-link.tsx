import type { ReactNode } from 'react';
import { track, type AnalyticsEvent } from '@/lib/analytics';

export function TrackedExternalLink({
    href,
    event,
    children,
}: {
    href: string;
    event: AnalyticsEvent;
    children: ReactNode;
}) {
    if (!href.startsWith('https://')) return null;

    let safeHref: string | null = null;
    try {
        const url = new URL(href, 'https://taretan.invalid');
        if (url.protocol === 'https:') safeHref = url.toString();
    } catch {
        safeHref = null;
    }

    if (!safeHref) return null;

    return (
        <a
            href={safeHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track(event)}
        >
            {children}
        </a>
    );
}
