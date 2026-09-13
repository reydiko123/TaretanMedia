import { useEffect, useState } from "react"
import { motion } from "motion/react"
import { ChevronDown, Search, SlidersHorizontal } from "lucide-react"
import { createBookCatalogHref, createBookCatalogQuery, validateBookPriceRange } from "@/new-ui/lib/bookCatalogQuery"
import type { BookFilterDraft, BookFilterOptions, BookFilters, BookSort } from "@/new-ui/types/catalog"
import type { PublicNavigation } from "@/new-ui/app/navigation"
import { Button } from "@/new-ui/components/ui/button"
import { Checkbox } from "@/new-ui/components/ui/checkbox"
import { Input } from "@/new-ui/components/ui/input"
import { Label } from "@/new-ui/components/ui/label"
import { NativeSelect } from "@/new-ui/components/ui/native-select"

const sortOptions: { value: BookSort; label: string }[] = [
  { value: "latest", label: "Terbaru" },
  { value: "oldest", label: "Terlama" },
  { value: "price_asc", label: "Harga terendah" },
  { value: "price_desc", label: "Harga tertinggi" },
  { value: "title", label: "Judul A–Z" },
]

type BookCatalogControlsProps = {
  filters: BookFilters
  filterOptions: BookFilterOptions
  navigation: PublicNavigation
}

function filtersToDraft(filters: BookFilters): BookFilterDraft {
  return {
    q: filters.q ?? "",
    category: filters.category ?? "",
    minPrice: filters.minPrice == null ? "" : String(filters.minPrice),
    maxPrice: filters.maxPrice == null ? "" : String(filters.maxPrice),
    year: filters.year == null ? "" : String(filters.year),
    hasIsbn: Boolean(filters.hasIsbn),
    sort: filters.sort,
  }
}

export function BookCatalogControls({ filters, filterOptions, navigation }: BookCatalogControlsProps) {
  const [draft, setDraft] = useState(() => filtersToDraft(filters))
  const [filterOpen, setFilterOpen] = useState(false)
  const [errors, setErrors] = useState<Partial<Record<"minPrice" | "maxPrice", string>>>({})

  useEffect(() => {
    // Inertia replaces server-owned props after navigation; the draft must follow them.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDraft(filtersToDraft(filters))
    setErrors({})
  }, [filters])

  const updateDraft = <K extends keyof BookFilterDraft>(key: K, value: BookFilterDraft[K]) => {
    setDraft((current) => ({ ...current, [key]: value }))
    if (key === "minPrice" || key === "maxPrice") setErrors((current) => ({ ...current, [key]: undefined }))
  }

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const validation = validateBookPriceRange(draft, filterOptions.priceBounds)
    if (!validation.valid) {
      setErrors(validation.errors)
      return
    }
    navigation.visit(createBookCatalogHref(createBookCatalogQuery(draft, filterOptions.priceBounds, 1, filterOptions.years)), {
      preserveScroll: true,
      preserveState: true,
    })
  }

  const changeSort = (sort: BookSort) => {
    const nextDraft = { ...draft, sort }
    setDraft(nextDraft)
    navigation.visit(createBookCatalogHref(createBookCatalogQuery(nextDraft, filterOptions.priceBounds, 1, filterOptions.years)), {
      preserveScroll: true,
      preserveState: true,
    })
  }

  const reset = () => {
    setDraft(filtersToDraft({ sort: "latest" }))
    setErrors({})
    navigation.visit("/buku", { preserveScroll: false, preserveState: false })
  }

  const activeFilterCount = [draft.category, draft.minPrice, draft.maxPrice, draft.year, draft.hasIsbn].filter(Boolean).length

  return (
    <section className="catalog-controls" aria-labelledby="catalog-filter-title">
      <h2 id="catalog-filter-title" className="sr-only">Filter katalog</h2>
      <form role="search" onSubmit={submit} className="rounded-2xl border border-border bg-surface-soft p-4 sm:p-5">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end">
          <div className="min-w-0 flex-1">
            <Label htmlFor="book-search" className="mb-2 block text-sm font-semibold text-brand-teal-deep">Cari buku</Label>
            <div className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 z-10 size-5 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
              <Input
                id="book-search"
                value={draft.q}
                onChange={(event) => updateDraft("q", event.target.value)}
                placeholder="Judul, ISBN, penerbit, atau nama penulis"
                className="h-14 rounded-lg pl-12 pr-4 text-base focus-visible:border-brand-green-dark"
              />
            </div>
          </div>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
            <Button type="submit" variant="brand" size="pill" disabled={navigation.isNavigating} className="w-full disabled:cursor-wait lg:w-auto">
              <Search className="size-4" aria-hidden="true" />
              Cari
            </Button>
          </motion.div>
        </div>

        <div className="mt-4 flex items-center justify-between gap-3 border-t border-border pt-4 lg:hidden">
          <Button type="button" variant="brand-outline" size="pill-sm" aria-expanded={filterOpen} aria-controls="book-filter-panel" onClick={() => setFilterOpen((open) => !open)}>
            <SlidersHorizontal className="size-4" aria-hidden="true" />
            {filterOpen ? "Sembunyikan filter" : "Tampilkan filter"}
            {activeFilterCount > 0 ? <span className="grid size-5 place-items-center rounded-full bg-brand-green-dark text-xs text-on-dark">{activeFilterCount}</span> : null}
            <ChevronDown className={`size-4 transition-transform ${filterOpen ? "rotate-180" : ""}`} aria-hidden="true" />
          </Button>
          <Label className="flex items-center gap-2 text-sm font-semibold text-brand-teal-deep">
            <span>Urutkan</span>
            <NativeSelect value={draft.sort} onValueChange={(value) => changeSort(value as BookSort)} className="h-11 pl-2.5 text-sm font-medium">
              {sortOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
            </NativeSelect>
          </Label>
        </div>

        <div id="book-filter-panel" className={filterOpen ? "mt-4 block" : "mt-4 hidden lg:block"}>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr_1fr_auto]">
            <div>
              <Label htmlFor="book-category" className="mb-2 block text-sm font-semibold text-brand-teal-deep">Kategori</Label>
              <NativeSelect id="book-category" value={draft.category} onValueChange={(value) => updateDraft("category", value ?? "")} wrapperClassName="w-full" className="h-11 pl-2.5 text-sm">
                <option value="">Semua kategori</option>
                {filterOptions.categories.map((category) => <option key={category.slug} value={category.slug}>{category.name}</option>)}
              </NativeSelect>
            </div>
            <div>
              <Label htmlFor="book-min-price" className="mb-2 block text-sm font-semibold text-brand-teal-deep">Harga minimum</Label>
              <Input id="book-min-price" type="number" inputMode="numeric" min={filterOptions.priceBounds.min} max={filterOptions.priceBounds.max} value={draft.minPrice} onChange={(event) => updateDraft("minPrice", event.target.value)} placeholder="Rp0" aria-invalid={Boolean(errors.minPrice)} aria-describedby={errors.minPrice ? "book-min-price-error" : undefined} className="h-11 rounded-lg text-sm" />
              {errors.minPrice ? <p id="book-min-price-error" className="mt-1 text-xs font-medium text-destructive">{errors.minPrice}</p> : null}
            </div>
            <div>
              <Label htmlFor="book-max-price" className="mb-2 block text-sm font-semibold text-brand-teal-deep">Harga maksimum</Label>
              <Input id="book-max-price" type="number" inputMode="numeric" min={filterOptions.priceBounds.min} max={filterOptions.priceBounds.max} value={draft.maxPrice} onChange={(event) => updateDraft("maxPrice", event.target.value)} placeholder="Rp250.000" aria-invalid={Boolean(errors.maxPrice)} aria-describedby={errors.maxPrice ? "book-max-price-error" : undefined} className="h-11 rounded-lg text-sm" />
              {errors.maxPrice ? <p id="book-max-price-error" className="mt-1 text-xs font-medium text-destructive">{errors.maxPrice}</p> : null}
            </div>
            <div>
              <Label htmlFor="book-year" className="mb-2 block text-sm font-semibold text-brand-teal-deep">Tahun terbit</Label>
              <NativeSelect id="book-year" value={draft.year} onValueChange={(value) => updateDraft("year", value ?? "")} wrapperClassName="w-full" className="h-11 pl-2.5 text-sm">
                <option value="">Semua tahun</option>
                {filterOptions.years.map((year) => <option key={year} value={String(year)}>{year}</option>)}
              </NativeSelect>
            </div>
            <div className="flex items-end gap-2 md:col-span-2 lg:col-span-1">
              <Button type="submit" variant="brand" size="pill" disabled={navigation.isNavigating} className="flex-1 disabled:cursor-wait">Terapkan filter</Button>
              <Button type="button" variant="brand-outline" size="pill" onClick={reset} disabled={navigation.isNavigating}>Reset</Button>
            </div>
          </div>

          <Label htmlFor="book-has-isbn" className="mt-4 flex min-h-11 items-center gap-2 text-sm font-semibold text-brand-teal-deep">
            <Checkbox id="book-has-isbn" checked={draft.hasIsbn} onCheckedChange={(checked) => updateDraft("hasIsbn", checked === true)} className="data-checked:border-brand-green-dark data-checked:bg-brand-green-dark" />
            Hanya buku dengan ISBN
          </Label>
        </div>

        <div className="mt-4 hidden items-center justify-between border-t border-border pt-4 lg:flex">
          <p className="text-sm font-semibold text-brand-teal-deep">Filter katalog</p>
          <Label className="flex items-center gap-2 text-sm font-semibold text-brand-teal-deep">
            <span>Urutkan</span>
            <NativeSelect aria-label="Urutkan" value={draft.sort} onValueChange={(value) => changeSort(value as BookSort)} className="h-11 pl-2.5 text-sm font-medium">
              {sortOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
            </NativeSelect>
          </Label>
        </div>
      </form>
    </section>
  )
}
