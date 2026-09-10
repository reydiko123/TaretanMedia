import { describe, expect, it } from 'vitest';
import {
    publishingServices,
    publishingSteps,
    teamMembers,
} from './public-content';

describe('public publishing content', () => {
    it('defines five service entries with section destinations', () => {
        expect(publishingServices).toHaveLength(5);
        expect(publishingServices.map((service) => service.href)).toEqual([
            '/layanan#penerbitan-buku',
            '/layanan#publikasi-jurnal',
            '/layanan#editing-proofreading',
            '/layanan#layout-desain-cover',
            '/layanan#konsultasi-publikasi',
        ]);
    });

    it('keeps the active publishing procedure and two team profiles', () => {
        expect(publishingSteps).toHaveLength(5);
        expect(publishingSteps[0].title).toBe('Kirim Naskah');
        expect(publishingSteps.at(-1)?.title).toBe('Terbit & Distribusi');
        expect(teamMembers).toHaveLength(2);
        expect(
            teamMembers.every((member) =>
                member.image.startsWith('/images/team/'),
            ),
        ).toBe(true);
    });
});
