import { buildServiceMessage, buildWhatsAppUrl, normalizeWhatsAppNumber } from "@/new-ui/lib/whatsapp"
import type { Service, ServicesProps, ServicesPageViewModel } from "@/new-ui/pages/Services/servicesTypes"

const defaultCtaLabel = "Hubungi Kami"

function trimString(value: unknown): string {
  return typeof value === "string" ? value.trim() : ""
}

function isValidService(service: Service): boolean {
  return Number.isFinite(service.id)
    && Boolean(trimString(service.name))
    && Boolean(trimString(service.slug))
    && Boolean(trimString(service.summary))
    && Number.isFinite(service.price)
    && service.price >= 0
}

function computePopularIndex(count: number): number {
  if (count === 0) return -1
  if (count === 4) return 2
  return Math.floor(count / 2)
}

export function createServicesPageViewModel(props: ServicesProps): ServicesPageViewModel {
  const normalizedNumber = normalizeWhatsAppNumber(props.whatsapp.number)
  const services = props.services.reduce<ServicesPageViewModel["services"]>((result, service) => {
    if (!isValidService(service)) return result

    const name = trimString(service.name)
    const slug = trimString(service.slug)
    const summary = trimString(service.summary)
    const description = trimString(service.description)
    const features = Array.isArray(service.features)
      ? service.features.map(trimString).filter(Boolean)
      : []
    const ctaLabel = trimString(service.ctaLabel) || defaultCtaLabel
    const whatsappMessage = buildServiceMessage(props.whatsapp.messageTemplate, name)
    const whatsappHref = normalizedNumber ? buildWhatsAppUrl(normalizedNumber, whatsappMessage) ?? undefined : undefined
    const orderLabel = String(result.length + 1).padStart(2, "0")

    result.push({
      id: service.id,
      slug,
      orderLabel,
      name,
      summary,
      ...(description ? { description } : {}),
      features,
      ctaLabel,
      price: service.price,
      isPopular: false,
      ...(whatsappHref ? {
        whatsappHref,
        whatsappAccessibleLabel: `${ctaLabel} via WhatsApp — ${name}`,
      } : {}),
    })

    return result
  }, [])

  const popularIndex = computePopularIndex(services.length)
  if (popularIndex >= 0 && popularIndex < services.length) {
    services[popularIndex] = { ...services[popularIndex], isPopular: true }
  }

  return { services, hasConfiguredWhatsApp: Boolean(normalizedNumber) }
}
