import { Head } from '@inertiajs/react';
import { ErrorState } from '@/components/public/public-ui';
import { SeoHead } from '@/components/public/seo-head';
import type { SeoProps } from '@/types';

export default function NotFound({ seo }: { seo?: SeoProps }) {
    return (
        <>
            {seo ? (
                <SeoHead seo={seo} />
            ) : (
                <Head title="Halaman tidak ditemukan">
                    <meta
                        name="description"
                        content="Halaman yang Anda cari tidak ditemukan."
                    />
                </Head>
            )}
            <ErrorState
                code="404"
                title="Halaman tidak ditemukan"
                description="Alamat mungkin berubah atau konten sudah tidak tersedia. Kembali ke beranda atau jelajahi katalog publik kami."
            />
        </>
    );
}
