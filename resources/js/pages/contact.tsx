import { ContactPage } from '@/new-ui/pages/Contact/Show'
import { toContactProps, useBackendSharedProps } from '@/new-ui/inertia-adapters'
import type { SeoProps } from '@/types'
import '@/new-ui/styles/catalog.css'

export default function Contact({ seo }: { seo: SeoProps }) {
    return <ContactPage {...toContactProps(useBackendSharedProps(), seo)} />
}
