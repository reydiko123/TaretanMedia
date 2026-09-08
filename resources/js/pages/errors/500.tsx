import { Head } from '@inertiajs/react';
import { ErrorState } from '@/components/public/public-ui';
import { SeoHead } from '@/components/public/seo-head';
import type { SeoProps } from '@/types';

export default function ServerError({ seo }: { seo?: SeoProps }) {
    return (
        <>
            {seo ? (
                <SeoHead seo={seo} />
            ) : (
                <Head title="Terjadi kendala">
                    <meta
                        name="description"
                        content="Terjadi kendala saat memuat halaman."
                    />
                </Head>
            )}
            <ErrorState
                code="500"
                title="Terjadi kendala"
                description="Kami belum dapat memuat halaman ini. Silakan coba beberapa saat lagi atau kembali ke halaman utama."
            />
        </>
    );
}
