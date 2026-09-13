import { NewsShowPage } from '@/new-ui/pages/News/Show'
import { toNewsDetail, toShellProps, useBackendSharedProps } from '@/new-ui/inertia-adapters'
import type { ArticleDetail, SeoProps } from '@/types'

export default function ArticlesShow({ seo, article }: { seo: SeoProps; article: ArticleDetail }) {
    const shared = useBackendSharedProps()
    return <NewsShowPage {...toShellProps(shared)} news={toNewsDetail(article)} canonicalUrl={seo.canonicalUrl} siteOrigin={window.location.origin} />
}
