import type { ManuscriptFormValues } from "@/new-ui/types/public"

type BookMessageInput = {
  template: string
  title: string
  canonicalUrl: string
}

export function createBookOrderMessage({ template, title, canonicalUrl }: BookMessageInput) {
  return template
    .replaceAll("{title}", title)
    .replaceAll("{canonicalUrl}", canonicalUrl)
}

type WhatsAppUrlInput = {
  number: string
  message: string
}

export type ManuscriptMessageInput = {
  values: ManuscriptFormValues
  publicationTypeLabel: string
  template: string
}

const manuscriptFallbackTemplate = `Halo Taretan Media, saya ingin berkonsultasi mengenai naskah.

Nama: {fullName}
Email: {email}
Judul naskah: {manuscriptTitle}
Jenis publikasi: {publicationType}`

const serviceFallbackTemplate = "Halo Taretan Media, saya ingin berkonsultasi mengenai layanan {serviceName}."

export function buildServiceMessage(template: string, serviceName: string): string {
  const name = serviceName.trim()
  const selectedTemplate = template.trim()

  if (!selectedTemplate) return serviceFallbackTemplate.replace("{serviceName}", name)
  if (selectedTemplate.includes("{{serviceName}}")) return selectedTemplate.replaceAll("{{serviceName}}", name)

  return `${selectedTemplate}\n\nLayanan: ${name}`
}

export function normalizeWhatsAppNumber(value: string): string | null {
  const normalizedNumber = value.trim().replace(/[\s+\-()]/g, "")
  if (!/^\d{8,15}$/.test(normalizedNumber)) return null

  return normalizedNumber
}

export function buildManuscriptMessage({ values, publicationTypeLabel, template }: ManuscriptMessageInput): string {
  const selectedTemplate = template.trim() ? template : manuscriptFallbackTemplate
  const replacements: Record<string, string> = {
    fullName: values.fullName.trim(),
    email: values.email.trim(),
    manuscriptTitle: values.manuscriptTitle.trim(),
    publicationType: publicationTypeLabel.trim(),
  }

  return Object.entries(replacements).reduce(
    (message, [placeholder, value]) => message.replaceAll(`{${placeholder}}`, value),
    selectedTemplate,
  )
}

export function buildWhatsAppUrl(number: string, message: string): string | null
export function buildWhatsAppUrl(input: WhatsAppUrlInput): string | null
export function buildWhatsAppUrl(numberOrInput: string | WhatsAppUrlInput, message?: string): string | null {
  const number = typeof numberOrInput === "string" ? numberOrInput : numberOrInput.number
  const text = typeof numberOrInput === "string" ? message ?? "" : numberOrInput.message
  const normalizedNumber = normalizeWhatsAppNumber(number)
  if (!normalizedNumber) return null

  return `https://wa.me/${normalizedNumber}?text=${encodeURIComponent(text)}`
}
