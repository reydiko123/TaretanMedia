import { AnimatePresence, motion } from "motion/react"
import { ArrowUpRight, LoaderCircle, MessageCircle } from "lucide-react"
import { useEffect, useMemo, useRef, useState, type FormEvent } from "react"
import { ErrorSummary } from "@/new-ui/components/feedback/ErrorSummary"
import { buildManuscriptMessage, buildWhatsAppUrl, normalizeWhatsAppNumber } from "@/new-ui/lib/whatsapp"
import { normalizePublicationTypes, validateManuscriptField, validateManuscriptForm } from "@/new-ui/lib/manuscriptValidation"
import type {
  ManuscriptCreateProps,
  ManuscriptField,
  ManuscriptFormErrors,
  ManuscriptFormValues,
  ManuscriptTouched,
  OpenExternalUrl,
} from "@/new-ui/types/public"
import { Button } from "@/new-ui/components/ui/button"
import { Input } from "@/new-ui/components/ui/input"
import { Label } from "@/new-ui/components/ui/label"
import { NativeSelect } from "@/new-ui/components/ui/native-select"

export type ManuscriptFormProps = Pick<ManuscriptCreateProps, "publicationTypes" | "whatsapp" | "alternativeContact"> & {
  openExternalUrl?: OpenExternalUrl
  onValidWhatsAppClick?: (publicationType: string) => void
}

type OpenState = "idle" | "opening" | "blocked" | "unavailable"

const EMPTY_VALUES: ManuscriptFormValues = {
  fullName: "",
  email: "",
  manuscriptTitle: "",
  publicationType: "",
}

const EMPTY_TOUCHED: ManuscriptTouched = {
  fullName: false,
  email: false,
  manuscriptTitle: false,
  publicationType: false,
}

const fieldOrder: ManuscriptField[] = ["fullName", "email", "manuscriptTitle", "publicationType"]

const fieldCopy: Record<ManuscriptField, {
  label: string
  placeholder?: string
  autocomplete?: string
}> = {
  fullName: {
    label: "Nama lengkap",
    placeholder: "Contoh: Ahmad Fauzi",
    autocomplete: "name",
  },
  email: {
    label: "Email",
    placeholder: "nama@contoh.com",
    autocomplete: "email",
  },
  manuscriptTitle: {
    label: "Judul naskah",
    autocomplete: "off",
  },
  publicationType: {
    label: "Jenis publikasi",
  },
}

function defaultOpenExternalUrl(url: string): Window | null {
  return window.open(url, "_blank")
}

function isSafeAlternativeHref(href: string): boolean {
  if (href.startsWith("mailto:") || href.startsWith("tel:")) return true

  try {
    return new URL(href).protocol === "https:"
  } catch {
    return false
  }
}

function firstErrorField(errors: ManuscriptFormErrors): ManuscriptField | undefined {
  return fieldOrder.find((field) => errors[field])
}

export function ManuscriptForm({ publicationTypes, whatsapp, alternativeContact, openExternalUrl = defaultOpenExternalUrl, onValidWhatsAppClick }: ManuscriptFormProps) {
  const normalizedPublicationTypes = useMemo(() => normalizePublicationTypes(publicationTypes), [publicationTypes])
  const hasWhatsAppNumber = Boolean(normalizeWhatsAppNumber(whatsapp.number))
  const [values, setValues] = useState<ManuscriptFormValues>(EMPTY_VALUES)
  const [touched, setTouched] = useState<ManuscriptTouched>(EMPTY_TOUCHED)
  const [errors, setErrors] = useState<ManuscriptFormErrors>({})
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [openState, setOpenState] = useState<OpenState>(hasWhatsAppNumber ? "idle" : "unavailable")
  const [manualUrl, setManualUrl] = useState<string | null>(null)
  const openingRef = useRef(false)
  const errorSummaryRef = useRef<HTMLHeadingElement | null>(null)
  const fieldRefs = useRef<Partial<Record<ManuscriptField, HTMLInputElement | HTMLSelectElement | null>>>({})
  const lastOpenAttemptRef = useRef(0)

  const registerFieldRef = (field: ManuscriptField, element: HTMLInputElement | HTMLSelectElement | null) => {
    fieldRefs.current[field] = element
  }

  const errorCount = Object.keys(errors).length
  const showSummary = hasSubmitted && errorCount >= 2

  useEffect(() => {
    if (!hasSubmitted) return

    if (errorCount >= 2) errorSummaryRef.current?.focus()
    else fieldRefs.current[firstErrorField(errors) ?? "fullName"]?.focus()
  }, [hasSubmitted, errorCount, errors])

  const updateField = (field: ManuscriptField, value: string) => {
    const nextValues = { ...values, [field]: value }
    setValues(nextValues)

    if (touched[field] || hasSubmitted) {
      const nextError = validateManuscriptField(field, nextValues, normalizedPublicationTypes)
      setErrors((current) => {
        const next = { ...current }
        if (nextError) next[field] = nextError
        else delete next[field]
        return next
      })
    }
  }

  const handleBlur = (field: ManuscriptField) => {
    setTouched((current) => ({ ...current, [field]: true }))
    const nextError = validateManuscriptField(field, values, normalizedPublicationTypes)
    setErrors((current) => {
      const next = { ...current }
      if (nextError) next[field] = nextError
      else delete next[field]
      return next
    })
  }

  const handleSelectField = (field: ManuscriptField) => {
    fieldRefs.current[field]?.focus()
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const now = Date.now()
    if (openingRef.current || now - lastOpenAttemptRef.current < 500 || !hasWhatsAppNumber) return

    const nextErrors = validateManuscriptForm(values, normalizedPublicationTypes)
    setTouched({ fullName: true, email: true, manuscriptTitle: true, publicationType: true })
    setErrors(nextErrors)
    setHasSubmitted(true)

    if (Object.keys(nextErrors).length > 0) return

    const selectedOption = normalizedPublicationTypes.find((option) => option.value === values.publicationType.trim())
    if (!selectedOption) return

    const message = buildManuscriptMessage({ values, publicationTypeLabel: selectedOption.label, template: whatsapp.messageTemplate })
    const url = buildWhatsAppUrl(whatsapp.number, message)
    if (!url) {
      setOpenState("unavailable")
      return
    }

    openingRef.current = true
    lastOpenAttemptRef.current = now
    setOpenState("opening")
    setManualUrl(url)
    const openedWindow = openExternalUrl(url)
    onValidWhatsAppClick?.(selectedOption.value)
    window.setTimeout(() => {
      openingRef.current = false
    }, 0)

    if (openedWindow) {
      setOpenState("idle")
      return
    }

    setOpenState("blocked")
  }

  const buttonLabel = openState === "opening"
    ? "Menyiapkan WhatsApp…"
    : openState === "unavailable"
      ? "Konsultasi WhatsApp sedang tidak tersedia."
      : "Lanjutkan ke WhatsApp"
  const alternativeIsSafe = Boolean(alternativeContact && isSafeAlternativeHref(alternativeContact.href))

  return (
    <motion.form
      noValidate
      onSubmit={handleSubmit}
      className="manuscript-form rounded-3xl border border-border bg-card p-5 shadow-card sm:p-7 lg:p-8"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-heading-3 font-semibold tracking-[-0.04em] text-brand-teal-deep">Ceritakan Sedikit Tentang Naskah Anda</h2>
        </div>
        <MessageCircle className="size-6 shrink-0 text-brand-green-dark" aria-hidden="true" />
      </div>

      <AnimatePresence initial={false}>
        {showSummary ? (
          <div className="mt-6">
            <ErrorSummary errors={errors} onSelectField={handleSelectField} headingRef={errorSummaryRef} />
          </div>
        ) : null}
      </AnimatePresence>

      <div className="mt-7 space-y-5">
        {fieldOrder.map((field) => {
          const copy = fieldCopy[field]
          const error = errors[field]
          const errorId = `manuscript-error-${field}`
          const describedBy = error ? errorId : undefined
          const controlId = `manuscript-field-${field}`
          const controlClassName = `manuscript-control mt-2 min-h-12 w-full rounded-xl border bg-background px-4 text-base text-foreground outline-none transition-[border-color,box-shadow] placeholder:text-muted-foreground ${error ? "border-destructive" : "border-input"}`

          return (
            <motion.div key={field} layout="position" className="manuscript-field" transition={{ layout: { duration: 0.24, ease: "easeOut" } }}>
              <Label htmlFor={controlId} className="block text-sm font-semibold text-brand-teal-deep">
                {copy.label}
              </Label>
              {field === "publicationType" ? (
                <motion.div whileFocus={{ scale: 1.01 }}>
                  <NativeSelect
                    id={controlId}
                    ref={(element) => registerFieldRef(field, element)}
                    value={values.publicationType}
                    onValueChange={(value) => updateField(field, value ?? "")}
                    onBlur={() => handleBlur(field)}
                    aria-invalid={Boolean(error)}
                    aria-describedby={describedBy}
                    wrapperClassName="w-full"
                    className={`${controlClassName} pr-10`}
                  >
                    <option value="" disabled hidden>Pilih jenis publikasi</option>
                    {normalizedPublicationTypes.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                  </NativeSelect>
                </motion.div>
              ) : (
                <motion.div whileFocus={{ scale: 1.01 }}>
                  <Input
                    id={controlId}
                    name={field}
                    value={values[field]}
                    onChange={(event) => updateField(field, event.target.value)}
                    onBlur={() => handleBlur(field)}
                    aria-invalid={Boolean(error)}
                    aria-describedby={describedBy}
                    type={field === "email" ? "email" : "text"}
                    placeholder={copy.placeholder}
                    autoComplete={copy.autocomplete}
                    ref={(element) => registerFieldRef(field, element)}
                    maxLength={field === "fullName" ? 100 : field === "email" ? 254 : 200}
                    className={controlClassName}
                  />
                </motion.div>
              )}
              <AnimatePresence initial={false}>
                {error ? (
                  <motion.p id={errorId} role="alert" className="mt-2 text-sm font-medium text-destructive" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.16 }}>
                    {error}
                  </motion.p>
                ) : null}
              </AnimatePresence>
            </motion.div>
          )
        })}
      </div>

      <p className="mt-7 text-sm leading-6 text-muted-foreground">Data belum dikirim ke CV Taretan Media Publishing. Anda akan meninjau pesan terlebih dahulu di WhatsApp.</p>

      <div className="mt-5 flex flex-col items-start gap-3">
        <motion.div
          className="w-full sm:w-auto"
          whileHover={openState === "idle" ? { scale: 1.02 } : undefined}
          whileTap={openState === "idle" ? { scale: 0.97 } : undefined}
        >
          <Button
            type="submit"
            variant="brand-dark"
            size="pill-lg"
            disabled={openState === "opening" || openState === "unavailable"}
            aria-disabled={openState === "opening" || openState === "unavailable"}
            aria-busy={openState === "opening"}
          >
            {openState === "opening" ? <LoaderCircle className="size-4 animate-spin" aria-hidden="true" /> : <MessageCircle className="size-4" aria-hidden="true" />}
            {buttonLabel}
          </Button>
        </motion.div>

        <AnimatePresence initial={false}>
          {openState === "blocked" && manualUrl ? (
            <motion.div className="w-full rounded-2xl border border-warning-text/20 bg-warning-bg p-4 text-sm text-warning-text" role="status" aria-live="polite" aria-atomic="true" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }} transition={{ duration: 0.2 }}>
              <p>WhatsApp belum dapat dibuka otomatis. Gunakan tautan berikut untuk melanjutkan.</p>
              <a href={manualUrl} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex min-h-11 items-center gap-2 font-semibold underline underline-offset-4">
                Buka WhatsApp secara manual
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </a>
            </motion.div>
          ) : null}
        </AnimatePresence>

        {openState === "unavailable" ? (
          <div className="w-full rounded-2xl border border-border bg-surface-soft p-4 text-sm text-muted-foreground" role="status" aria-live="polite">
            <p>Silakan gunakan kanal alternatif yang tersedia.</p>
            {alternativeIsSafe ? (
              <a href={alternativeContact!.href} className="mt-3 inline-flex min-h-11 items-center gap-2 font-semibold text-brand-green-dark underline underline-offset-4">
                {alternativeContact!.label}
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </a>
            ) : null}
          </div>
        ) : null}
      </div>
    </motion.form>
  )
}
