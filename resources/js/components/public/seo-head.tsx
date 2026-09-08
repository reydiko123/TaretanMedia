import { Head } from '@inertiajs/react';
import type { SeoProps } from '@/types';

type SeoHeadProps = {
    seo: SeoProps;
    structuredData?: Record<string, unknown> | Record<string, unknown>[];
};

export function SeoHead({ seo, structuredData }: SeoHeadProps) {
    const og = seo.openGraph;

    return (
        <Head title={seo.title}>
            <meta
                head-key="description"
                name="description"
                content={seo.description}
            />
            <link
                head-key="canonical"
                rel="canonical"
                href={seo.canonicalUrl}
            />
            <meta head-key="og:type" property="og:type" content={og.type} />
            <meta head-key="og:title" property="og:title" content={og.title} />
            <meta
                head-key="og:description"
                property="og:description"
                content={og.description}
            />
            <meta head-key="og:url" property="og:url" content={og.url} />
            {og.imageUrl && (
                <meta
                    head-key="og:image"
                    property="og:image"
                    content={og.imageUrl}
                />
            )}
            {structuredData && (
                <script type="application/ld+json">
                    {JSON.stringify(structuredData)}
                </script>
            )}
        </Head>
    );
}
