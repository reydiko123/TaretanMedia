import { JournalsShowPage } from '@/new-ui/pages/Journals/Show'
import { toJournalDetail, toShellProps, useBackendSharedProps } from '@/new-ui/inertia-adapters'
import type { JournalDetail, SeoProps } from '@/types'

export default function JournalsShow({ seo, journal }: { seo: SeoProps; journal: JournalDetail }) {
    const shared = useBackendSharedProps()
    return <JournalsShowPage {...toShellProps(shared)} journal={toJournalDetail(journal)} canonicalUrl={seo.canonicalUrl} />
}
