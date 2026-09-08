export type WhatsAppConfig = {
    available: boolean;
    number: string | null;
    templates: {
        book: string;
        service: string;
        manuscript: string;
        contact: string;
    };
    publicationTypes: string[];
};

type WhatsAppContext =
    | { title: string; url: string }
    | { service: string }
    | {
          name: string;
          email: string;
          title: string;
          publicationType: string;
      }
    | Record<string, never>;

const fieldLimits = {
    name: 100,
    email: 254,
    title: 200,
    service: 200,
    url: 2048,
} as const;

function normalize(value: unknown, limit: number): string | null {
    if (typeof value !== 'string') return null;

    const normalized = value
        .replace(/\r\n?/g, '\n')
        // eslint-disable-next-line no-control-regex
        .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
        .trim();

    return normalized.length > 0 && normalized.length <= limit
        ? normalized
        : null;
}

function validNumber(number: string | null): number is string {
    return number !== null && /^[1-9][0-9]{7,14}$/.test(number);
}

export function buildWhatsAppUrl(
    kind: 'book' | 'service' | 'manuscript' | 'contact',
    context: WhatsAppContext,
    config: WhatsAppConfig,
): string | null {
    if (!config.available || !validNumber(config.number)) return null;

    const template = config.templates[kind];
    if (!template || template.length > 1500) return null;

    const values =
        kind === 'book'
            ? {
                  ':title': normalize(
                      (context as { title?: unknown }).title,
                      fieldLimits.title,
                  ),
                  ':url': normalize(
                      (context as { url?: unknown }).url,
                      fieldLimits.url,
                  ),
              }
            : kind === 'service'
              ? {
                    ':service': normalize(
                        (context as { service?: unknown }).service,
                        fieldLimits.service,
                    ),
                }
              : kind === 'manuscript'
                ? {
                      ':name': normalize(
                          (context as { name?: unknown }).name,
                          fieldLimits.name,
                      ),
                      ':email': normalize(
                          (context as { email?: unknown }).email,
                          fieldLimits.email,
                      ),
                      ':title': normalize(
                          (context as { title?: unknown }).title,
                          fieldLimits.title,
                      ),
                      ':publication_type': normalize(
                          (context as { publicationType?: unknown })
                              .publicationType,
                          fieldLimits.title,
                      ),
                  }
                : {};

    if (Object.values(values).some((value) => value === null)) return null;
    if (
        kind === 'manuscript' &&
        !config.publicationTypes.includes(
            (values as { ':publication_type': string })[':publication_type'],
        )
    ) {
        return null;
    }

    const message = template.replace(/:[a-z_]+/g, (token) => {
        const value = (values as Record<string, string | null>)[token];
        return value ?? token;
    });

    if (
        message.length === 0 ||
        message.length > 1500 ||
        /:[a-z_]+/.test(message)
    ) {
        return null;
    }

    const url = new URL(`https://wa.me/${config.number}`);
    url.searchParams.set('text', message);

    return url.toString();
}
