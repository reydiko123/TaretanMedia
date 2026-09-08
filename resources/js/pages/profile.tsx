import { Link } from '@inertiajs/react';
import { BookMarked, Compass, Handshake, Library } from 'lucide-react';
import {
    PageContainer,
    PageHeader,
    PublicBreadcrumbs,
} from '@/components/public/public-ui';
import { SeoHead } from '@/components/public/seo-head';
import { Button } from '@/components/ui/button';
import type { SeoProps } from '@/types';

type ProfileContent = {
    introduction?: string;
    vision?: string;
    focusAreas?: string[];
    credibility?: string;
};

export default function Profile({
    seo,
    profile,
}: {
    seo: SeoProps;
    profile?: ProfileContent;
}) {
    const focuses = profile?.focusAreas?.length
        ? profile.focusAreas
        : ['Buku', 'Publikasi ilmiah', 'Artikel dan pengetahuan'];
    return (
        <>
            <SeoHead seo={seo} />
            <PageContainer>
                <PublicBreadcrumbs
                    items={[
                        { label: 'Beranda', href: '/' },
                        { label: 'Profil' },
                    ]}
                />
                <PageHeader
                    eyebrow="Profil"
                    title="Taretan Media"
                    description={
                        profile?.introduction ||
                        'Taretan Media hadir sebagai penerbit buku dan publikasi ilmiah yang menghubungkan gagasan penulis dengan pembacanya.'
                    }
                />
                <div className="grid gap-6 pb-16 md:grid-cols-2">
                    <section className="rounded-xl border p-6 sm:p-8">
                        <Compass className="text-primary size-7" />
                        <h2 className="mt-5 text-2xl font-semibold">
                            Arah kami
                        </h2>
                        <p className="text-muted-foreground mt-3 leading-7">
                            {profile?.vision ||
                                'Membangun ruang penerbitan yang terarah, mudah diakses, dan memberi tempat bagi karya yang bermakna.'}
                        </p>
                    </section>
                    <section className="rounded-xl border p-6 sm:p-8">
                        <Library className="text-primary size-7" />
                        <h2 className="mt-5 text-2xl font-semibold">
                            Fokus penerbitan
                        </h2>
                        <ul className="text-muted-foreground mt-3 space-y-2">
                            {focuses.map((focus) => (
                                <li
                                    key={focus}
                                    className="flex items-center gap-2"
                                >
                                    <BookMarked className="text-primary size-4" />
                                    {focus}
                                </li>
                            ))}
                        </ul>
                    </section>
                    <section className="bg-muted/40 rounded-xl border p-6 sm:col-span-2 sm:p-8">
                        <Handshake className="text-primary size-7" />
                        <h2 className="mt-5 text-2xl font-semibold">
                            Bertumbuh bersama karya
                        </h2>
                        <p className="text-muted-foreground mt-3 max-w-3xl leading-7">
                            {profile?.credibility ||
                                'Kami memusatkan pengalaman publik pada informasi karya, layanan, dan kanal resmi yang jelas. Jelajahi publikasi kami atau hubungi tim untuk mendiskusikan kebutuhan penerbitan Anda.'}
                        </p>
                        <div className="mt-6 flex flex-wrap gap-3">
                            <Button asChild>
                                <Link href="/buku">Lihat publikasi</Link>
                            </Button>
                            <Button asChild variant="outline">
                                <Link href="/layanan">Pelajari layanan</Link>
                            </Button>
                        </div>
                    </section>
                </div>
            </PageContainer>
        </>
    );
}
