import { ManuscriptCreatePage } from '@/new-ui/pages/Manuscripts/Create'
import { toManuscriptProps, useBackendSharedProps } from '@/new-ui/inertia-adapters'
import type { SeoProps } from '@/types'

export default function ManuscriptsCreate({ seo }: { seo: SeoProps }) {
    return <ManuscriptCreatePage {...toManuscriptProps(useBackendSharedProps())} />
}
