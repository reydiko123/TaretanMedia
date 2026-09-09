export type AnalyticsEvent =
    | 'book_view'
    | 'book_filter'
    | 'book_whatsapp_click'
    | 'journal_external_click'
    | 'service_whatsapp_click'
    | 'manuscript_form_start'
    | 'manuscript_whatsapp_click'
    | 'contact_whatsapp_click'
    | 'share_click';

export type AnalyticsProperties =
    | {
          filter_kind:
              | 'search'
              | 'category'
              | 'price'
              | 'year'
              | 'sort'
              | 'reset';
      }
    | { method: 'native' | 'clipboard' }
    | Record<string, never>;

export type AnalyticsConfig = { enabled: boolean; endpoint: string | null };

const allowedEvents = new Set<AnalyticsEvent>([
    'book_view',
    'book_filter',
    'book_whatsapp_click',
    'journal_external_click',
    'service_whatsapp_click',
    'manuscript_form_start',
    'manuscript_whatsapp_click',
    'contact_whatsapp_click',
    'share_click',
]);

function safeProperties(
    event: AnalyticsEvent,
    properties: unknown,
): AnalyticsProperties | null {
    if (event === 'book_filter') {
        const value = (properties as { filter_kind?: unknown } | null)
            ?.filter_kind;
        return [
            'search',
            'category',
            'price',
            'year',
            'sort',
            'reset',
        ].includes(String(value))
            ? { filter_kind: value as 'search' }
            : null;
    }

    if (event === 'share_click') {
        const value = (properties as { method?: unknown } | null)?.method;
        return value === 'native' || value === 'clipboard'
            ? { method: value }
            : null;
    }

    return properties === undefined || properties === null ? {} : null;
}

export function createAnalytics(
    config: AnalyticsConfig,
    send: (event: AnalyticsEvent, properties: AnalyticsProperties) => void,
) {
    return {
        track: (
            event: AnalyticsEvent,
            properties?: AnalyticsProperties,
        ): void => {
            if (
                !config.enabled ||
                !config.endpoint ||
                !allowedEvents.has(event)
            )
                return;

            const safe = safeProperties(event, properties);
            if (safe !== null) send(event, safe);
        },
    };
}

let browserAnalytics = createAnalytics(
    { enabled: false, endpoint: null },
    () => undefined,
);

export function configureAnalytics(config: AnalyticsConfig): void {
    const safeEndpoint = config.endpoint?.startsWith('https://')
        ? config.endpoint
        : null;
    browserAnalytics = createAnalytics(
        {
            enabled: config.enabled && safeEndpoint !== null,
            endpoint: safeEndpoint,
        },
        (event, properties) => {
            const body = JSON.stringify({ name: event, props: properties });
            try {
                if (typeof navigator !== 'undefined' && navigator.sendBeacon) {
                    navigator.sendBeacon(safeEndpoint!, body);
                } else if (typeof fetch !== 'undefined') {
                    void fetch(safeEndpoint!, {
                        method: 'POST',
                        body,
                        keepalive: true,
                        headers: { 'content-type': 'application/json' },
                    });
                }
            } catch {
                // Conversion must remain usable when analytics is unavailable.
            }
        },
    );
}

export const track = (
    event: AnalyticsEvent,
    properties?: AnalyticsProperties,
): void => browserAnalytics.track(event, properties);
