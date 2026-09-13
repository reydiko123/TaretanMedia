import type {
  ManuscriptFormErrors,
  ManuscriptFormValues,
  PublicationTypeOption,
} from "@/new-ui/types/public"

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function normalizePublicationTypes(options: PublicationTypeOption[]): PublicationTypeOption[] {
  const seen = new Set<string>()

  return options.reduce<PublicationTypeOption[]>((normalized, option) => {
    const value = option.value.trim()
    const label = option.label.trim()

    if (!value || !label || seen.has(value)) return normalized

    seen.add(value)
    normalized.push({ value, label })
    return normalized
  }, [])
}

export function validateManuscriptForm(values: ManuscriptFormValues, publicationTypes: PublicationTypeOption[]): ManuscriptFormErrors {
  const errors: ManuscriptFormErrors = {}
  const fullName = values.fullName.trim()
  const email = values.email.trim()
  const manuscriptTitle = values.manuscriptTitle.trim()
  const publicationType = values.publicationType.trim()
  const normalizedOptions = normalizePublicationTypes(publicationTypes)

  if (!fullName) errors.fullName = "Masukkan nama lengkap"
  else if (fullName.length < 2) errors.fullName = "Nama lengkap minimal 2 karakter"
  else if (fullName.length > 100) errors.fullName = "Nama lengkap maksimal 100 karakter"

  if (!email) errors.email = "Masukkan alamat email"
  else if (email.length > 254) errors.email = "Email maksimal 254 karakter"
  else if (!EMAIL_PATTERN.test(email)) errors.email = "Masukkan alamat email yang valid"

  if (!manuscriptTitle) errors.manuscriptTitle = "Masukkan judul naskah"
  else if (manuscriptTitle.length < 3) errors.manuscriptTitle = "Judul naskah minimal 3 karakter"
  else if (manuscriptTitle.length > 200) errors.manuscriptTitle = "Judul naskah maksimal 200 karakter"

  if (!publicationType) errors.publicationType = "Pilih jenis publikasi"
  else if (!normalizedOptions.some((option) => option.value === publicationType)) {
    errors.publicationType = "Jenis publikasi tidak tersedia. Pilih kembali."
  }

  return errors
}

export function validateManuscriptField(
  field: keyof ManuscriptFormValues,
  values: ManuscriptFormValues,
  publicationTypes: PublicationTypeOption[],
): string | undefined {
  return validateManuscriptForm(values, publicationTypes)[field]
}
