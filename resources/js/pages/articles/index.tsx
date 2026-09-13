import { NewsIndexPage } from '@/new-ui/pages/News/Index'
import { toNewsIndexProps, useBackendSharedProps, useInertiaNavigation } from '@/new-ui/inertia-adapters'
import type { ArticleCard, CatalogFilters, CategoryOption, Paginated, SeoProps } from '@/types'

export default function ArticlesIndex({ seo, articles, filters, categories }: { seo: SeoProps; articles: Paginated<ArticleCard>; filters: CatalogFilters; categories: CategoryOption[] }) {
    const navigation = useInertiaNavigation()
    return <NewsIndexPage {...toNewsIndexProps(articles, filters, categories, useBackendSharedProps())} navigation={navigation} />
}
