import { JournalsIndexPage } from '@/new-ui/pages/JournalsIndexPage'
import { toJournalIndexProps, useBackendSharedProps, useInertiaNavigation } from '@/new-ui/inertia-adapters'
import type { CatalogFilters, CategoryOption, JournalCard, Paginated, SeoProps } from '@/types'

export default function JournalsIndex({ seo, journals, filters, categories, filterOptions }: { seo: SeoProps; journals: Paginated<JournalCard>; filters: CatalogFilters; categories: CategoryOption[]; filterOptions?: { years: number[] } }) {
    const navigation = useInertiaNavigation()
    return <JournalsIndexPage {...toJournalIndexProps(journals, filters, categories, useBackendSharedProps(), filterOptions)} navigation={navigation} />
}
