import { ProfilePage } from '@/new-ui/pages/Profile/Show'
import { toProfileProps, useBackendSharedProps } from '@/new-ui/inertia-adapters'
import type { SeoProps } from '@/types'

type BackendProfile = { summary?: string; vision?: string; mission?: string[]; values?: string[] }

export default function Profile({ seo, profile }: { seo: SeoProps; profile?: BackendProfile }) {
    return <ProfilePage {...toProfileProps(profile ?? {}, useBackendSharedProps())} />
}
