import { describe, expect, it } from 'vitest';
import {
    publicNavIsActive,
    publicNavLinkClass,
    publicServiceAnimationClass,
    publicMutedSectionClass,
    publicDiscoveryItemClass,
    publicTeamImageFrameClass,
    publicTeamImageClass,
    publicAppearance,
    publicSectionClass,
    publicSurfaceClass,
} from './public-theme';

describe('public visual theme', () => {
    it('uses light mode regardless of device preference', () => {
        expect(publicAppearance).toBe('light');
    });

    it('keeps active navigation visually distinct', () => {
        expect(publicNavLinkClass(true)).toContain('bg-primary/10');
        expect(publicNavLinkClass(true)).toContain('text-primary');
    });

    it('treats hash destinations as the current navigation page', () => {
        expect(publicNavIsActive('/layanan#penerbitan-buku', '/layanan')).toBe(
            true,
        );
        expect(publicNavIsActive('/buku?sort=baru', '/buku')).toBe(true);
        expect(publicNavIsActive('/profil', '/layanan')).toBe(false);
    });

    it('keeps mobile navigation labels inside the menu width', () => {
        const mobileClass = publicNavLinkClass(false, true);

        expect(mobileClass).toContain('min-w-0');
        expect(mobileClass).toContain('break-words');
        expect(mobileClass).toContain('whitespace-normal');
    });

    it('keeps service cards animated even when they are not links', () => {
        expect(publicServiceAnimationClass).toContain('hover:-translate-y-1');
        expect(publicServiceAnimationClass).toContain(
            'hover:border-primary/30',
        );
        expect(publicServiceAnimationClass).toContain('hover:shadow-');
    });

    it('provides the alternating section and desktop discovery treatments', () => {
        expect(publicMutedSectionClass).toContain('bg-secondary/50');
        expect(publicMutedSectionClass).toContain('border-y');
        expect(publicDiscoveryItemClass).toContain('lg:max-w-none');
    });

    it('keeps team portraits fully visible inside portrait media frames', () => {
        expect(publicTeamImageFrameClass).toContain('aspect-[4/3]');
        expect(publicTeamImageClass).toContain('object-contain');
    });

    it('provides shared public section and surface treatments', () => {
        expect(publicSectionClass).toContain('py-16');
        expect(publicSurfaceClass).toContain('rounded-2xl');
        expect(publicSurfaceClass).toContain('border-border');
    });
});
