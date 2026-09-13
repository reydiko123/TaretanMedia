import { X } from "lucide-react"
import { motion } from "motion/react"
import { formatRupiah } from "@/new-ui/lib/formatting"
import { createBookCatalogHref, removeBookFilter } from "@/new-ui/lib/bookCatalogQuery"
import type { BookFilters, BookFilterOptions, FilterKey } from "@/new-ui/types/catalog"
import type { PublicNavigation } from "@/new-ui/app/navigation"

type FilterChipsProps = {
  filters: BookFilters
  filterOptions: BookFilterOptions
  navigation: PublicNavigation
}

export function FilterChips({ filters, filterOptions, navigation }: FilterChipsProps) {
  const chips: { key: FilterKey; label: string }[] = []
  if (filters.q) chips.push({ key: "q", label: `Pencarian: “${filters.q}”` })
  if (filters.category) {
    const category = filterOptions.categories.find((option) => option.slug === filters.category)
    chips.push({ key: "category", label: `Kategori: ${category?.name ?? filters.category}` })
  }
  if (filters.minPrice != null) chips.push({ key: "minPrice", label: `Mulai ${formatRupiah(filters.minPrice)}` })
  if (filters.maxPrice != null) chips.push({ key: "maxPrice", label: `Sampai ${formatRupiah(filters.maxPrice)}` })
  if (filters.year != null) chips.push({ key: "year", label: `Tahun ${filters.year}` })
  if (filters.hasIsbn) chips.push({ key: "hasIsbn", label: "ISBN: tersedia" })
  if (filters.sort !== "latest") {
    const label = { oldest: "Terlama", price_asc: "Harga terendah", price_desc: "Harga tertinggi", title: "Judul A–Z" }[filters.sort]
    chips.push({ key: "sort", label: `Urutan: ${label}` })
  }
  if (chips.length === 0) return null

  return (
    <div className="flex flex-wrap gap-2" aria-label="Filter aktif">
      {chips.map((chip) => (
        <motion.span key={chip.key} layout initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.92 }} className="inline-flex min-h-9 items-center gap-1.5 rounded-full border border-brand-green-dark/20 bg-surface-feature px-3 text-xs font-semibold text-brand-green-dark">
          {chip.label}
          <button type="button" disabled={navigation.isNavigating} onClick={() => navigation.visit(createBookCatalogHref(removeBookFilter(filters, chip.key)), { preserveScroll: true, preserveState: true })} aria-label={`Hapus ${chip.label}`} className="grid size-6 place-items-center rounded-full hover:bg-brand-green-dark/10 disabled:opacity-50">
            <X className="size-3.5" aria-hidden="true" />
          </button>
        </motion.span>
      ))}
    </div>
  )
}
