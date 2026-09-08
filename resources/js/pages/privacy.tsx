import {
    PageContainer,
    PageHeader,
    PublicBreadcrumbs,
} from '@/components/public/public-ui';
import { SeoHead } from '@/components/public/seo-head';
import type { SeoProps } from '@/types';

export default function Privacy({ seo }: { seo: SeoProps }) {
    return (
        <>
            <SeoHead seo={seo} />
            <PageContainer className="pb-16">
                <PublicBreadcrumbs
                    items={[
                        { label: 'Beranda', href: '/' },
                        { label: 'Privasi' },
                    ]}
                />
                <PageHeader
                    eyebrow="Privasi"
                    title="Privasi dan pemrosesan data"
                    description="Taretan Media meminimalkan data yang dikumpulkan dari pengunjung."
                />
                <article className="public-prose max-w-3xl">
                    <h2>Form Kirim Naskah</h2>
                    <p>
                        Data pada form tidak dikirim atau disimpan oleh server
                        Taretan Media. Setelah Anda memilih tombol WhatsApp,
                        pesan dibuka untuk Anda tinjau dan kirim sendiri.
                        Pemrosesan selanjutnya mengikuti kebijakan WhatsApp.
                    </p>
                    <h2>Analytics agregat</h2>
                    <p>
                        Jika diaktifkan pada environment yang sesuai, kami hanya
                        mencatat event agregat seperti tampilan buku, filter,
                        klik kanal, dan metode berbagi. Nama, email, judul
                        naskah, isi pesan, URL personal, credential, token, dan
                        pengenal individu tidak dikirim sebagai properti
                        analytics.
                    </p>
                    <h2>Kontak</h2>
                    <p>
                        Gunakan kanal resmi pada halaman{' '}
                        <a href="/kontak">Kontak</a> untuk pertanyaan privasi.
                    </p>
                </article>
            </PageContainer>
        </>
    );
}
