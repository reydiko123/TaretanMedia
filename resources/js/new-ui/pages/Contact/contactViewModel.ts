import { buildMailtoUrl, buildWhatsAppContactUrl, normalizeHttpsUrl } from "@/new-ui/lib/contactUrls"
import type { ContactChannelViewModel, ContactContent, ContactPageViewModel } from "@/new-ui/pages/Contact/contactTypes"

const COPY = {
  title: "Hubungi Kami",
  description: "Konsultasikan kebutuhan penerbitan dan publikasi ilmiah anda",
  whatsappLabel: "WhatsApp Taretan Media",
  whatsappSupport: "Lanjutkan percakapan melalui WhatsApp.",
  emailSupport: "Kirim pesan melalui aplikasi email Anda.",
} as const

function cleanText(value: string | null | undefined): string {
  return (value ?? "").trim()
}

function formatWhatsAppNumber(value: string): string {
  const digits = value.replace(/\D/g, "")
  const nationalNumber = digits.startsWith("62")
    ? digits.slice(2)
    : digits.startsWith("0")
      ? digits.slice(1)
      : ""

  if (!nationalNumber) return value

  const groups = [nationalNumber.slice(0, 3), nationalNumber.slice(3, 7), nationalNumber.slice(7)].filter(Boolean)
  return `+62 ${groups.join("-")}`
}

export function createContactPageViewModel(contact: ContactContent): ContactPageViewModel {
  const title = cleanText(contact.heading) || COPY.title
  const description = cleanText(contact.description) || COPY.description

  const channels: ContactChannelViewModel[] = []

  const whatsappNumber = cleanText(contact.whatsappNumber)
  const whatsappHref = buildWhatsAppContactUrl(contact.whatsappNumber, contact.whatsappGreeting)
  if (whatsappHref) {
    channels.push({
      id: "whatsapp",
      label: whatsappNumber ? formatWhatsAppNumber(whatsappNumber) : cleanText(contact.whatsappLabel) || COPY.whatsappLabel,
      supportingText: COPY.whatsappSupport,
      href: whatsappHref,
      external: true,
      primary: false,
    })
  }

  const mailtoHref = buildMailtoUrl(contact.email)
  if (mailtoHref) {
    channels.push({
      id: "email",
      label: cleanText(contact.email),
      supportingText: COPY.emailSupport,
      href: mailtoHref,
      external: false,
      primary: false,
    })
  }

  const address = cleanText(contact.address)
  const mapHref = normalizeHttpsUrl(contact.mapUrl)

  let location: ContactPageViewModel["location"]
  if (address || mapHref) {
    location = {}
    if (address) location.address = address
    if (mapHref) location.mapHref = mapHref
  }

  const hasAnyContactInformation = channels.length > 0 || Boolean(address) || Boolean(mapHref)

  return {
    intro: {
      eyebrow: "Kontak",
      title,
      description,
    },
    channels,
    location,
    hasAnyContactInformation,
  }
}
