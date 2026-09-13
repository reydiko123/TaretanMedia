import { motion } from "motion/react"
import type { CategoryOption } from "@/new-ui/types/public"

type JournalMetaProps = {
  theme?: string | null
  editionLabel?: string | null
  publicationYear?: string | null
  categories: CategoryOption[]
}

export function JournalMeta({ theme, editionLabel, publicationYear, categories }: JournalMetaProps) {
  const normalizedTheme = theme?.trim() || null
  const normalizedEdition = editionLabel?.trim() || null
  const normalizedYear = publicationYear?.trim() || null
  const normalizedCategories = categories.filter((category) => category.name.trim())
  const hasRows = Boolean(normalizedEdition || normalizedYear || normalizedCategories.length)

  if (!normalizedTheme && !hasRows) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.36, ease: "easeOut" }}
      className="journal-detail-meta"
    >
      {normalizedTheme ? <p className="journal-detail-theme">{normalizedTheme}</p> : null}
      {hasRows ? (
        <dl className="mt-6 grid gap-x-6 gap-y-5 sm:grid-cols-2">
          {normalizedEdition ? <div><dt>Edisi</dt><dd>{normalizedEdition}</dd></div> : null}
          {normalizedYear ? <div><dt>Tahun terbit</dt><dd>{normalizedYear}</dd></div> : null}
          {normalizedCategories.length ? (
            <div className="sm:col-span-2">
              <dt>Kategori</dt>
              <dd className="mt-2 flex flex-wrap gap-2">
                {normalizedCategories.map((category) => <span key={category.id} className="journal-detail-category">{category.name}</span>)}
              </dd>
            </div>
          ) : null}
        </dl>
      ) : null}
    </motion.div>
  )
}
