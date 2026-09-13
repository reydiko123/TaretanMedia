import type { ServicesProps } from "@/new-ui/types/public"

export type { Service, ServicesProps } from "@/new-ui/types/public"

export type ServiceCardViewModel = {
  id: number
  slug: string
  orderLabel: string
  name: string
  summary: string
  description?: string
  features: string[]
  ctaLabel: string
  price: number
  isPopular: boolean
  whatsappHref?: string
  whatsappAccessibleLabel?: string
}

export type ServicesPageViewModel = {
  services: ServiceCardViewModel[]
  hasConfiguredWhatsApp: boolean
}

export type ServiceAnalyticsPayload = {
  serviceId: number
  serviceSlug: string
}

export type ServiceCardProps = {
  service: ServiceCardViewModel
  onWhatsAppClick?: (payload: ServiceAnalyticsPayload) => void
}

export type ServicesListProps = {
  services: ServiceCardViewModel[]
  onWhatsAppClick?: (payload: ServiceAnalyticsPayload) => void
}

export type ServicesPageProps = ServicesProps & {
  onServiceWhatsAppClick?: (payload: ServiceAnalyticsPayload) => void
}
