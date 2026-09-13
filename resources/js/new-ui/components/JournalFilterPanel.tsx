import { useState } from "react"
import { ChevronDown, SlidersHorizontal } from "lucide-react"
import { motion } from "motion/react"
import { SearchField } from "@/new-ui/components/SearchField"
import type { JournalFilters } from "@/new-ui/types/journal"
import { Button } from "@/new-ui/components/ui/button"
import { Label } from "@/new-ui/components/ui/label"
import { NativeSelect } from "@/new-ui/components/ui/native-select"

type JournalFilterPanelProps = {
  filters: JournalFilters
  categories: Array<{ id: number; name: string; slug: string }>
  years: number[]
  isNavigating?: boolean
  hasActiveFilters: boolean
  onSearch: (query: string) => void
  onCategoryChange: (category: string | null) => void
  onYearChange: (year: number | null) => void
  onReset: () => void
}

export function JournalFilterPanel({
  filters,
  categories,
  years,
  isNavigating = false,
  hasActiveFilters,
  onSearch,
  onCategoryChange,
  onYearChange,
  onReset,
}: JournalFilterPanelProps) {
  const [filterOpen, setFilterOpen] = useState(false)
  const activeFilterCount = [filters.category, filters.year].filter(Boolean).length

  return (
    <section className="journal-filter-panel" aria-labelledby="journal-filter-title">
      <h2 id="journal-filter-title" className="sr-only">Filter jurnal</h2>
      <div className="rounded-2xl border border-border bg-surface-soft p-4 sm:p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end">
          <SearchField value={filters.q ?? ""} disabled={isNavigating} onSubmit={onSearch} />
        </div>

        <div className="mt-4 flex items-center justify-between gap-3 border-t border-border pt-4 lg:hidden">
          <motion.button
            type="button"
            whileTap={{ scale: 0.97 }}
            aria-expanded={filterOpen}
            aria-controls="journal-filter-fields"
            onClick={() => setFilterOpen((open) => !open)}
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border bg-background px-4 text-sm font-semibold text-brand-teal-deep"
          >
            <SlidersHorizontal className="size-4" aria-hidden="true" />
            {filterOpen ? "Sembunyikan filter" : "Tampilkan filter"}
            {activeFilterCount > 0 ? <span className="grid size-5 place-items-center rounded-full bg-brand-green-dark text-xs text-on-dark">{activeFilterCount}</span> : null}
            <ChevronDown className={`size-4 transition-transform ${filterOpen ? "rotate-180" : ""}`} aria-hidden="true" />
          </motion.button>
        </div>

        <motion.div
          id="journal-filter-fields"
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          className={filterOpen ? "mt-4 block" : "mt-4 hidden lg:block"}
        >
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-[1fr_1fr_auto]">
            <div>
              <Label htmlFor="journal-category" className="mb-2 block text-sm font-semibold text-brand-teal-deep">Kategori</Label>
              <NativeSelect
                id="journal-category"
                value={filters.category ?? ""}
                disabled={isNavigating || categories.length === 0}
                onValueChange={(value) => onCategoryChange(value || null)}
                wrapperClassName="w-full"
                className="h-11 pl-2.5 text-sm"
              >
                <option value="">Semua kategori</option>
                {categories.map((category) => <option key={category.slug} value={category.slug}>{category.name}</option>)}
              </NativeSelect>
            </div>
            <div>
              <Label htmlFor="journal-year" className="mb-2 block text-sm font-semibold text-brand-teal-deep">Tahun publikasi</Label>
              <NativeSelect
                id="journal-year"
                value={filters.year == null ? "" : String(filters.year)}
                disabled={isNavigating || years.length === 0}
                onValueChange={(value) => onYearChange(value ? Number(value) : null)}
                wrapperClassName="w-full"
                className="h-11 pl-2.5 text-sm"
              >
                <option value="">Semua tahun</option>
                {years.map((year) => <option key={year} value={String(year)}>{year}</option>)}
              </NativeSelect>
            </div>
            <div className="flex items-end">
              <motion.div
                className="w-full"
                whileHover={hasActiveFilters && !isNavigating ? { scale: 1.02 } : undefined}
                whileTap={hasActiveFilters && !isNavigating ? { scale: 0.97 } : undefined}
              >
                <Button
                  type="button"
                  variant="brand-outline"
                  size="pill"
                  disabled={!hasActiveFilters || isNavigating}
                  onClick={onReset}
                  className="w-full"
                >
                  Reset filter
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
