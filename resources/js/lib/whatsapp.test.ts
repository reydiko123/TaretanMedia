import { describe, expect, it } from 'vitest';
import { buildWhatsAppUrl, type WhatsAppConfig } from './whatsapp';

const config: WhatsAppConfig = {
    available: true,
    number: '628123456789',
    templates: {
        book: 'Halo, buku ":title". :url',
        service: 'Halo, layanan :service.',
        manuscript: 'Halo, naskah :name / :email / :title / :publication_type',
        contact: 'Halo, saya ingin meminta informasi.',
    },
    publicationTypes: ['Buku', 'Jurnal', 'Artikel'],
};

describe('buildWhatsAppUrl', () => {
    it('encodes a book title exactly once and retains the canonical URL', () => {
        const result = buildWhatsAppUrl(
            'book',
            { title: 'A & "B" #1 😊', url: 'https://example.test/buku/a-b' },
            config,
        );

        expect(result).not.toBeNull();
        const url = new URL(result!);
        expect(url.origin).toBe('https://wa.me');
        expect(url.pathname).toBe('/628123456789');
        expect(url.searchParams.get('text')).toBe(
            'Halo, buku "A & "B" #1 😊". https://example.test/buku/a-b',
        );
    });

    it('rejects invalid configuration and invalid manuscript publication types', () => {
        expect(
            buildWhatsAppUrl(
                'service',
                { service: 'Penyuntingan' },
                { ...config, available: false },
            ),
        ).toBeNull();
        expect(
            buildWhatsAppUrl(
                'manuscript',
                {
                    name: 'Rina',
                    email: 'rina@example.test',
                    title: 'Naskah',
                    publicationType: 'Lainnya',
                },
                config,
            ),
        ).toBeNull();
    });
});
