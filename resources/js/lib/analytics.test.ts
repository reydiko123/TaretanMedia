import { describe, expect, it, vi } from 'vitest';
import { createAnalytics } from './analytics';

describe('analytics adapter', () => {
    it('does not contact a provider while disabled', () => {
        const send = vi.fn();
        const analytics = createAnalytics(
            { enabled: false, endpoint: null },
            send,
        );

        analytics.track('book_whatsapp_click');

        expect(send).not.toHaveBeenCalled();
    });

    it('drops unknown and PII-like properties', () => {
        const send = vi.fn();
        const analytics = createAnalytics(
            {
                enabled: true,
                endpoint: 'https://analytics.example.test/api/event',
            },
            send,
        );

        analytics.track('book_filter', {
            filter_kind: 'search',
            query: 'email@example.test',
        } as never);
        analytics.track('not_an_event' as never);

        expect(send).toHaveBeenCalledTimes(1);
        expect(send).toHaveBeenCalledWith('book_filter', {
            filter_kind: 'search',
        });
    });
});
