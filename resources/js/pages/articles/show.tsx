import { CalendarDays, UserRound } from 'lucide-react';
import { formatDate } from '@/components/public/catalog';
import {
    CategoryBadges,
    PageContainer,
    PublicBreadcrumbs,
    PublicImage,
    ShareButton,
} from '@/components/public/public-ui';
import { SeoHead } from '@/components/public/seo-head';
import type { ArticleDetail, SeoProps } from '@/types';

export default function ArticlesShow({
    seo,
    article,
}: {
    seo: SeoProps;
    article: ArticleDetail;
}) {
    const structuredData = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: article.title,
        description: article.excerpt || seo.description,
        author: { '@type': 'Person', name: article.author.name },
        datePublished: article.publishedAt,
        image: article.featuredImageUrl || undefined,
        mainEntityOfPage: seo.canonicalUrl,
    };
    return (
        <>
            <SeoHead seo={seo} structuredData={structuredData} />
            <PageContainer className="pb-16">
                <PublicBreadcrumbs
                    items={[
                        { label: 'Beranda', href: '/' },
                        { label: 'Artikel', href: '/artikel' },
                        { label: article.title },
                    ]}
                />
                <article className="mx-auto max-w-4xl py-10 sm:py-14">
                    <header className="text-center">
                        <div className="flex justify-center">
                            <CategoryBadges categories={article.categories} />
                        </div>
                        <h1 className="public-display mt-5 text-4xl font-bold tracking-tight sm:text-6xl sm:leading-tight">
                            {article.title}
                        </h1>
                        {article.excerpt && (
                            <p className="text-muted-foreground mx-auto mt-5 max-w-3xl text-lg leading-8">
                                {article.excerpt}
                            </p>
                        )}
                        <div className="text-muted-foreground mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm">
                            <span className="inline-flex items-center gap-1.5">
                                <UserRound className="size-4" />
                                {article.author.name}
                            </span>
                            <time
                                dateTime={article.publishedAt}
                                className="inline-flex items-center gap-1.5"
                            >
                                <CalendarDays className="size-4" />
                                {formatDate(article.publishedAt)}
                            </time>
                        </div>
                        <div className="mt-6 flex justify-center">
                            <ShareButton
                                url={seo.canonicalUrl}
                                title={article.title}
                                text={article.excerpt || seo.description}
                            />
                        </div>
                    </header>
                    <PublicImage
                        src={article.featuredImageUrl}
                        alt={`Ilustrasi ${article.title}`}
                        aspect="landscape"
                        priority
                        className="mt-10 w-full shadow-[0_25px_60px_-25px_rgba(20,83,45,0.5)]"
                    />
                    <div
                        className="public-prose mt-10"
                        dangerouslySetInnerHTML={{ __html: article.bodyHtml }}
                    />
                </article>
            </PageContainer>
        </>
    );
}
