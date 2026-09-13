import { useEffect, useState } from "react"
import { motion } from "motion/react"
import { Search, X } from "lucide-react"
import { buildNewsCatalogUrl } from "@/new-ui/lib/newsCatalog"
import type { PublicNavigation } from "@/new-ui/app/navigation"
import type { NewsFilters, CategoryOption } from "@/new-ui/types/public"
import { Button } from "@/new-ui/components/ui/button"
import { Input } from "@/new-ui/components/ui/input"
import { Label } from "@/new-ui/components/ui/label"
import { NativeSelect } from "@/new-ui/components/ui/native-select"

type NewsCatalogControlsProps = {
  filters: NewsFilters
  filterOptions: { categories: CategoryOption[] }
  navigation: PublicNavigation
}

export function NewsCatalogControls({ filters, filterOptions, navigation }: NewsCatalogControlsProps) {
  const [draftQuery, setDraftQuery] = useState(filters.q ?? "")
  const categoryName = filterOptions.categories.find((category) => category.slug === filters.category)?.name ?? filters.category
  const hasActiveFilters = Boolean(filters.q || filters.category)

  useEffect(() => {
    // The server-owned URL state replaces the draft after a navigation.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDraftQuery(filters.q ?? "")
  }, [filters.q])

  const navigate = (query: { q?: string; category?: string }) => {
    if (navigation.isNavigating) return
    navigation.visit(buildNewsCatalogUrl(query), { preserveScroll: false, preserveState: true })
  }

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    navigate({ q: draftQuery, category: filters.category ?? undefined })
  }

  const removeSearch = () => navigate({ category: filters.category ?? undefined })
  const removeCategory = () => navigate({ q: filters.q ?? undefined })

  return (
    <section aria-labelledby="news-filter-title" aria-busy={navigation.isNavigating} className="catalog-controls">
      <h2 id="news-filter-title" className="sr-only">Filter katalog berita</h2>
      <form role="search" onSubmit={submit} className="rounded-2xl border border-border bg-surface-soft p-4 sm:p-5">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(15rem,0.45fr)_auto] lg:items-end">
          <div className="min-w-0">
            <Label htmlFor="news-search" className="mb-2 block text-sm font-semibold text-brand-teal-deep">Cari berita</Label>
            <div className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 z-10 size-5 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
              <Input
                id="news-search"
                type="search"
                value={draftQuery}
                onChange={(event) => setDraftQuery(event.target.value)}
                placeholder="Cari berdasarkan judul"
                className="h-14 rounded-lg pl-12 pr-4 text-base focus-visible:border-brand-green-dark"
              />
            </div>
          </div>

          <div className="min-w-0">
            <Label htmlFor="news-category" className="mb-2 block text-sm font-semibold text-brand-teal-deep">Kategori</Label>
            <NativeSelect
              id="news-category"
              value={filters.category ?? ""}
              onValueChange={(value) => navigate({ q: filters.q ?? undefined, category: value || undefined })}
              wrapperClassName="w-full"
              className="h-14 pl-4 text-base"
            >
              <option value="">Semua kategori</option>
              {filterOptions.categories.map((category) => <option key={category.slug} value={category.slug}>{category.name}</option>)}
            </NativeSelect>
          </div>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
            <Button type="submit" variant="brand" size="pill-lg" disabled={navigation.isNavigating} className="min-h-14 disabled:cursor-wait">
              <Search className="size-4" aria-hidden="true" />
              Cari
            </Button>
          </motion.div>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
          <p className="text-sm text-muted-foreground">Jelajahi wawasan terbaru Taretan Media</p>
          <Button type="button" variant="brand-outline" size="pill-sm" onClick={() => navigate({})} disabled={!hasActiveFilters || navigation.isNavigating}>
            Reset filter
          </Button>
        </div>

        {hasActiveFilters ? (
          <div className="mt-4 flex flex-wrap gap-2" aria-label="Filter aktif">
            {filters.q ? (
              <motion.span layout initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} className="inline-flex min-h-9 items-center gap-1.5 rounded-full border border-brand-green-dark/20 bg-surface-feature px-3 text-xs font-semibold text-brand-green-dark">
                Pencarian: "{filters.q}"
                <button type="button" disabled={navigation.isNavigating} onClick={removeSearch} aria-label={`Hapus filter pencarian ${filters.q}`} className="grid size-6 place-items-center rounded-full transition-colors hover:bg-brand-green-dark/10 disabled:opacity-50">
                  <X className="size-3.5" aria-hidden="true" />
                </button>
              </motion.span>
            ) : null}
            {filters.category ? (
              <motion.span layout initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} className="inline-flex min-h-9 items-center gap-1.5 rounded-full border border-brand-green-dark/20 bg-surface-feature px-3 text-xs font-semibold text-brand-green-dark">
                Kategori: {categoryName}
                <button type="button" disabled={navigation.isNavigating} onClick={removeCategory} aria-label={`Hapus filter kategori ${categoryName}`} className="grid size-6 place-items-center rounded-full transition-colors hover:bg-brand-green-dark/10 disabled:opacity-50">
                  <X className="size-3.5" aria-hidden="true" />
                </button>
              </motion.span>
            ) : null}
          </div>
        ) : null}
      </form>
    </section>
  )
}
