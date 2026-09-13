import { useEffect, useMemo } from "react"
import { motion } from "motion/react"
import { CatalogResultSummary } from "@/new-ui/components/CatalogResultSummary"
import { EmptyState } from "@/new-ui/components/feedback/EmptyState"
import { JournalListItem } from "@/new-ui/components/JournalListItem"
import { JournalFilterChips } from "@/new-ui/components/JournalFilterChips"
import { JournalFilterPanel } from "@/new-ui/components/JournalFilterPanel"
import { PageIntro } from "@/new-ui/components/PageIntro"
import { JournalPagination } from "@/new-ui/components/catalog/JournalPagination"
import { buildJournalCatalogUrl, normalizeJournalQuery, patchJournalQuery } from "@/new-ui/lib/journalCatalogQuery"
import { saveJournalCatalogReturnUrl } from "@/new-ui/lib/journalCatalogReturnUrl"
import type { PublicNavigation } from "@/new-ui/app/navigation"
import type { JournalQuery, JournalsIndexProps } from "@/new-ui/types/journal"
import "@/new-ui/styles/catalog.css"

export type JournalsIndexPageProps = JournalsIndexProps & { navigation: PublicNavigation }

export function JournalsIndexPage({ journals, filters, filterOptions, navigation }: JournalsIndexPageProps) {
  useEffect(() => {
    saveJournalCatalogReturnUrl()
  }, [])

  const currentQuery = useMemo<JournalQuery>(() => normalizeJournalQuery({
    q: filters.q ?? undefined,
    category: filters.category ?? undefined,
    year: filters.year ?? undefined,
    page: journals.pagination.currentPage,
  }, {
    categorySlugs: filterOptions.categories.map((category) => category.slug),
    years: filterOptions.years,
  }), [filters, journals.pagination.currentPage, filterOptions.categories, filterOptions.years])
  const hasActiveFilters = Boolean(currentQuery.q || currentQuery.category || currentQuery.year)

  const navigate = (patch: Partial<Record<keyof JournalQuery, string | number | null | undefined>>) => {
    const nextQuery = normalizeJournalQuery(patchJournalQuery(currentQuery, patch), {
      categorySlugs: filterOptions.categories.map((category) => category.slug),
      years: filterOptions.years,
    })
    navigation.visit(buildJournalCatalogUrl(nextQuery), { preserveScroll: false, preserveState: true })
  }

  const removeFilter = (key: "q" | "category" | "year") => navigate({ [key]: null })

  return (
    <div className="journal-page">
      <PageIntro
        eyebrow="Publikasi ilmiah"
        title="Katalog Jurnal"
        description="Temukan jurnal berdasarkan bidang pengetahuan yang anda minati"
        showBreadcrumbs={false}
        tone="catalog"
      />

      <div className="mx-auto max-w-content px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
        <JournalFilterPanel
          filters={filters}
          categories={filterOptions.categories}
          years={filterOptions.years}
          isNavigating={navigation.isNavigating}
          hasActiveFilters={hasActiveFilters}
          onSearch={(q) => navigate({ q })}
          onCategoryChange={(category) => navigate({ category })}
          onYearChange={(year) => navigate({ year })}
          onReset={() => navigation.visit("/jurnal", { preserveScroll: false, preserveState: true })}
        />

        <div className="mt-6 min-h-9">
          <JournalFilterChips filters={filters} categories={filterOptions.categories} disabled={navigation.isNavigating} onRemove={removeFilter} />
        </div>

        <section aria-labelledby="journal-results-title" aria-busy={navigation.isNavigating} className="mt-10">
          <div className="flex flex-col gap-3 border-b border-border pb-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-micro-uppercase font-semibold uppercase text-brand-green-dark">Koleksi publikasi</p>
              <h2 id="journal-results-title" className="mt-2 text-heading-2 font-semibold tracking-[-0.04em] text-brand-teal-deep" tabIndex={-1}>Hasil Jurnal</h2>
            </div>
            <CatalogResultSummary pagination={journals.pagination} isNavigating={navigation.isNavigating} />
          </div>

          {journals.data.length > 0 ? (
            <motion.div layout role="list" aria-label="Daftar katalog jurnal" className="journal-list mt-8">
              {journals.data.map((journal, index) => <JournalListItem key={journal.slug} journal={journal} index={index} />)}
            </motion.div>
          ) : (
            <div className="mt-8">
              <EmptyState
                filtered={hasActiveFilters}
                navigation={navigation}
                title={hasActiveFilters ? "Jurnal tidak ditemukan" : "Belum ada jurnal yang ditampilkan"}
                description={hasActiveFilters ? "Coba gunakan kata kunci lain atau hapus beberapa filter." : "Katalog jurnal sedang diperbarui. Silakan kembali lagi nanti."}
                emptyHref="/"
                emptyLabel="Kembali ke beranda"
                focusTargetId="journal-search"
                resetHref="/jurnal"
                resetPreserveState
              />
            </div>
          )}

          {journals.data.length > 0 ? <div className="mt-12"><JournalPagination pagination={journals.pagination} query={currentQuery} navigation={navigation} /></div> : null}
        </section>
      </div>
    </div>
  )
}
