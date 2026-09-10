export const publicAppearance = 'light' as const;

export const publicSectionClass = 'py-16 md:py-24';

export const publicSurfaceClass =
    'rounded-2xl border border-border bg-card shadow-[0_20px_50px_-30px_rgba(20,83,45,0.35)]';

export const publicServiceAnimationClass =
    'group hover:border-primary/30 hover:-translate-y-1 hover:shadow-[0_20px_40px_-24px_rgba(20,83,45,0.45)]';

export const publicMutedSectionClass = 'border-border bg-secondary/50 border-y';

export const publicDiscoveryItemClass =
    'w-[78vw] max-w-[19rem] shrink-0 snap-start sm:w-[17rem] lg:w-auto lg:max-w-none';

export const publicTeamImageFrameClass =
    'bg-secondary aspect-[4/3] overflow-hidden';

export const publicTeamImageClass = 'size-full object-contain';

export function publicPathname(url: string) {
    return url.split(/[?#]/)[0] || '/';
}

export function publicNavIsActive(currentUrl: string, href: string) {
    const pathname = publicPathname(currentUrl);

    return href === '/'
        ? pathname === '/'
        : pathname === href || pathname.startsWith(`${href}/`);
}

export function publicNavLinkClass(active: boolean, mobile = false) {
    const base =
        'focus-visible:ring-ring min-w-0 max-w-full rounded-lg font-medium transition-colors focus-visible:ring-2 focus-visible:outline-none';
    const size = mobile
        ? 'block px-3 py-2.5 text-sm leading-5 whitespace-normal break-words'
        : 'px-3 py-2 text-sm';
    const state = active
        ? 'bg-primary/10 text-primary'
        : 'text-muted-foreground hover:bg-secondary hover:text-foreground';

    return `${base} ${size} ${state}`;
}
