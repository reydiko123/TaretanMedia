import { X } from "lucide-react"
import { motion } from "motion/react"
import type { JournalFilters } from "@/new-ui/types/journal"

type JournalFilterChipsProps = {
  filters: JournalFilters
  categories: Array<{ id: number; name: string; slug: string }>
  disabled?: boolean
  onRemove: (key: "q" | "category" | "year") => void
}

export function JournalFilterChips({ filters, categories, disabled = false, onRemove }: JournalFilterChipsProps) {
  const category = categories.find((option) => option.slug === filters.category)
  const chips: Array<{ key: "q" | "category" | "year"; label: string; actionLabel: string }> = []
  if (filters.q) chips.push({ key: "q", label: `Pencarian: “${filters.q}”`, actionLabel: `Hapus pencarian ${filters.q}` })
  if (category) chips.push({ key: "category", label: `Kategori: ${category.name}`, actionLabel: `Hapus filter kategori ${category.name}` })
  if (filters.year != null) chips.push({ key: "year", label: `Tahun: ${filters.year}`, actionLabel: `Hapus filter tahun ${filters.year}` })
  if (chips.length === 0) return null

  return (
    <div className="flex flex-wrap gap-2" aria-label="Filter aktif">
      {chips.map((chip) => (
        <motion.span key={chip.key} layout initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} className="inline-flex min-h-9 items-center gap-1.5 rounded-full border border-brand-green-dark/20 bg-surface-feature px-3 text-xs font-semibold text-brand-green-dark">
          {chip.label}
          <button type="button" disabled={disabled} onClick={() => onRemove(chip.key)} aria-label={chip.actionLabel} className="grid size-6 place-items-center rounded-full hover:bg-brand-green-dark/10 disabled:opacity-50">
            <X className="size-3.5" aria-hidden="true" />
          </button>
        </motion.span>
      ))}
    </div>
  )
}
