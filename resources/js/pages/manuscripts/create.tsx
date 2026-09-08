import {
    PageContainer,
    PageHeader,
    PublicBreadcrumbs,
} from '@/components/public/public-ui';
import { SeoHead } from '@/components/public/seo-head';
import { ManuscriptForm } from '@/components/conversion/manuscript-form';
import type { SeoProps, PublicSite } from '@/types';

export default function ManuscriptsCreate({
    seo,
    site,
}: {
    seo: SeoProps;
    site: PublicSite;
}) {
    return (
        <>
            <SeoHead seo={seo} />
            <PageContainer className="pb-16">
                <PublicBreadcrumbs
                    items={[
                        { label: 'Beranda', href: '/' },
                        { label: 'Kirim Naskah' },
                    ]}
                />
                <PageHeader
                    eyebrow="Kirim Naskah"
                    title="Mulai percakapan tentang naskah Anda"
                    description="Isi informasi singkat berikut. Data hanya digunakan untuk membentuk pesan yang Anda tinjau di WhatsApp."
                />
                <div className="mx-auto max-w-2xl">
                    <ManuscriptForm
                        config={
                            site.conversion?.whatsapp ?? {
                                available: false,
                                number: null,
                                templates: {
                                    book: '',
                                    service: '',
                                    manuscript: '',
                                    contact: '',
                                },
                                publicationTypes: [],
                            }
                        }
                    />
                </div>
            </PageContainer>
        </>
    );
}
