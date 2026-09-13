import { NewsShowPage } from '@/new-ui/pages/News/Show'
import { toNewsCard, toNewsDetail, toShellProps, useBackendSharedProps } from '@/new-ui/inertia-adapters'
import type { ArticleCard, ArticleDetail, SeoProps } from '@/types'

export default function ArticlesShow({ seo, article, relatedNews = [] }: { seo: SeoProps; article: ArticleDetail; relatedNews?: ArticleCard[] }) {
    const shared = useBackendSharedProps()
    return <NewsShowPage {...toShellProps(shared)} news={toNewsDetail(article)} relatedNews={relatedNews.map(toNewsCard)} canonicalUrl={seo.canonicalUrl} siteOrigin={window.location.origin} />
}
