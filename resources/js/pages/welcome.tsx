import { Head, Link } from '@inertiajs/react';
import { PublicFooter } from '@/components/public-footer';
import { PublicNav } from '@/components/public-nav';
import { Button } from '@/components/ui/button';

export default function Welcome() {
    return (
        <>
            <Head title="Beranda" />
            <div className="flex min-h-screen flex-col bg-background text-foreground">
                <a
                    href="#main-content"
                    className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
                >
                    Lewati ke konten
                </a>
                <PublicNav />
                <main id="main-content" className="flex-1">
                    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
                        <div className="max-w-2xl">
                            <p className="text-sm font-medium text-primary">
                                Penerbit buku &amp; publikasi ilmiah
                            </p>
                            <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
                                Taretan Media
                            </h1>
                            <p className="mt-4 text-lg text-muted-foreground">
                                Temukan katalog buku, jurnal, dan artikel
                                Taretan Media. Konsultasikan kebutuhan
                                penerbitan naskah Anda dengan mudah.
                            </p>
                            <div className="mt-8 flex flex-wrap gap-3">
                                <Button asChild>
                                    <Link href="/buku">
                                        Jelajahi Katalog Buku
                                    </Link>
                                </Button>
                                <Button asChild variant="outline">
                                    <Link href="/kirim-naskah">
                                        Kirim Naskah
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </section>
                </main>
                <PublicFooter />
            </div>
        </>
    );
}
