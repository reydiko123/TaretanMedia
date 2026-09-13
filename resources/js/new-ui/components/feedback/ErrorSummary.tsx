import { motion } from "motion/react"
import type { RefObject } from "react"
import type { ManuscriptField, ManuscriptFormErrors } from "@/new-ui/types/public"

type ErrorSummaryProps = {
  errors: ManuscriptFormErrors
  onSelectField: (field: ManuscriptField) => void
  headingRef?: RefObject<HTMLHeadingElement | null>
}

const fieldOrder: ManuscriptField[] = ["fullName", "email", "manuscriptTitle", "publicationType"]

export function ErrorSummary({ errors, onSelectField, headingRef }: ErrorSummaryProps) {
  const entries = fieldOrder.flatMap((field) => errors[field] ? [{ field, message: errors[field] }] : [])

  if (entries.length === 0) return null

  return (
    <motion.section
      aria-labelledby="manuscript-error-summary-title"
      className="rounded-2xl border border-destructive/30 bg-destructive-soft p-4 text-sm text-destructive sm:p-5"
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      <h2 ref={headingRef} id="manuscript-error-summary-title" tabIndex={-1} className="font-semibold focus:outline-none">
        Periksa kembali informasi berikut:
      </h2>
      <ol className="mt-3 list-decimal space-y-2 pl-5">
        {entries.map(({ field, message }) => (
          <li key={field}>
            <a
              href={`#manuscript-field-${field}`}
              className="font-medium underline decoration-destructive/40 underline-offset-4 hover:text-brand-teal-deep"
              onClick={(event) => {
                event.preventDefault()
                onSelectField(field)
              }}
            >
              {message}
            </a>
          </li>
        ))}
      </ol>
    </motion.section>
  )
}
