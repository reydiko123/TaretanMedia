import { ServicesPage } from '@/new-ui/pages/Services/Index'
import { toServicesProps, useBackendSharedProps } from '@/new-ui/inertia-adapters'
import type { PublicService, SeoProps } from '@/types'

export default function ServicesIndex({ seo, services }: { seo: SeoProps; services: PublicService[] }) {
    return <ServicesPage {...toServicesProps(services, useBackendSharedProps())} />
}
