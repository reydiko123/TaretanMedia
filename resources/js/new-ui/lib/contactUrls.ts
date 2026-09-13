export function normalizeWhatsAppNumber(value: string | null | undefined): string | null {
  if (value == null) return null

  const trimmed = value.trim()
  if (!trimmed) return null

  // Allow a single leading "+" only; strip presentational separators.
  const withoutLeadingPlus = trimmed.startsWith("+") ? trimmed.slice(1) : trimmed
  const digits = withoutLeadingPlus.replace(/[\s.\-()]/g, "")

  // Any remaining non-digit (letters, "#", "*", mid-string "+", extensions) is invalid.
  if (!/^\d{8,15}$/.test(digits)) return null

  return digits
}

export function buildWhatsAppContactUrl(value: string | null | undefined, greeting?: string | null): string | null {
  const digits = normalizeWhatsAppNumber(value)
  if (!digits) return null

  const base = `https://wa.me/${digits}`
  const text = greeting?.trim()
  if (!text) return base

  return `${base}?text=${encodeURIComponent(text)}`
}

export function buildMailtoUrl(value: string | null | undefined): string | null {
  if (value == null) return null

  const trimmed = value.trim()
  if (!trimmed) return null

  // Reject already-wrapped mailto values; prop must be a bare address.
  if (/^mailto:/i.test(trimmed)) return null

  // Reject control characters and whitespace.
  // eslint-disable-next-line no-control-regex
  if (/[\s\u0000-\u001f]/.test(trimmed)) return null

  const atCount = (trimmed.match(/@/g) ?? []).length
  if (atCount !== 1) return null

  const [local, domain] = trimmed.split("@")
  if (!local || !domain) return null

  // Domain must have at least one dot-separated readable label.
  if (!/^[^.\s]+(\.[^.\s]+)+$/.test(domain)) return null

  return `mailto:${trimmed}`
}

export function normalizeHttpsUrl(value: string | null | undefined): string | null {
  if (value == null) return null

  const trimmed = value.trim()
  if (!trimmed) return null

  let url: URL
  try {
    url = new URL(trimmed)
  } catch {
    return null
  }

  if (url.protocol !== "https:") return null
  if (!url.hostname) return null
  if (url.username || url.password) return null

  return url.href
}
