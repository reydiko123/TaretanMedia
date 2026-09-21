import { useEffect, useMemo, useRef } from "react"
import { motion } from "motion/react"
import { NewsCatalogControls } from "@/new-ui/components/catalog/NewsCatalogControls"
import { Pagination } from "@/new-ui/components/catalog/Pagination"
import { EmptyState } from "@/new-ui/components/feedback/EmptyState"
import { LoadingSkeleton } from "@/new-ui/components/feedback/LoadingSkeleton"
import { StatusMessage } from "@/new-ui/components/feedback/StatusMessage"
import { NewsCard } from "@/new-ui/components/publication/NewsCard"
import { PageIntro } from "@/new-ui/components/PageIntro"
import { getNewsResultSummary } from "@/new-ui/lib/formatting"
import { buildNewsCatalogUrl, normalizeNewsCatalogQuery } from "@/new-ui/lib/newsCatalog"
import { saveNewsCatalogReturnUrl } from "@/new-ui/lib/newsCatalogReturnUrl"
import type { PublicNavigation } from "@/new-ui/app/navigation"
import type { NewsIndexProps } from "@/new-ui/types/public"
import "@/new-ui/styles/catalog.css"

export type NewsIndexPageProps = NewsIndexProps & {
  navigation: PublicNavigation
  navigationError?: boolean
}

export function NewsIndexPage({ news, filters, filterOptions, navigation, navigationError = false }: NewsIndexPageProps) {
  const resultHeadingRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    saveNewsCatalogReturnUrl()
  }, [])
  const currentQuery = useMemo(() => normalizeNewsCatalogQuery({
    q: filters.q,
    category: filters.category,
    page: news.pagination.currentPage,
  }, filterOptions.categories.map((category) => category.slug)), [news.pagination.currentPage, filterOptions.categories, filters.category, filters.q])
  const hasActiveFilters = Boolean(currentQuery.q || currentQuery.category)
  const summary = getNewsResultSummary(news.pagination, hasActiveFilters)
  const retryHref = buildNewsCatalogUrl(currentQuery)

  useEffect(() => {
    const focusState = resultHeadingRef.current?.dataset.initialized
    if (focusState !== "true") {
      if (resultHeadingRef.current) resultHeadingRef.current.dataset.initialized = "true"
      return
    }
    if (!navigation.isNavigating) resultHeadingRef.current?.focus()
  }, [news.pagination.currentPage, filters.category, filters.q, navigation.isNavigating])

  return (
    <div className="news-page catalog-page">
      <PageIntro
        eyebrow="Wawasan CV Taretan Media Publishing"
        title="Berita & Informasi"
        description="Temukan gagasan, panduan, dan informasi seputar buku, penerbitan, serta publikasi ilmiah"
        currentLabel="Berita"
        showBreadcrumbs={false}
        tone="dark"
      />

      <div className="mx-auto max-w-content px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
        <NewsCatalogControls filters={filters} filterOptions={filterOptions} navigation={navigation} />

        <section ref={resultHeadingRef} aria-labelledby="news-results-title" aria-busy={navigation.isNavigating} className="mt-12">
          <div className="flex flex-col gap-3 border-b border-border pb-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-micro-uppercase font-semibold uppercase text-brand-green-dark">Koleksi editorial</p>
              <h2 id="news-results-title" tabIndex={-1} className="mt-2 text-heading-2 font-semibold tracking-[-0.04em] text-brand-teal-deep">Berita Terbaru</h2>
            </div>
            <StatusMessage message={summary} busy={navigation.isNavigating} busyMessage="Memperbarui katalog berita." />
          </div>

          {navigationError ? (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} role="alert" className="mt-8 rounded-xl border border-destructive/25 bg-destructive/5 px-6 py-12 text-center">
              <h3 className="text-heading-5 font-semibold text-brand-teal-deep">Berita belum dapat dimuat</h3>
              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">Terjadi kendala saat memuat katalog. Silakan coba lagi.</p>
              <button type="button" onClick={() => navigation.visit(retryHref, { preserveScroll: false, preserveState: true })} className="mt-6 inline-flex min-h-11 items-center rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-deep">Coba lagi</button>
            </motion.div>
          ) : navigation.isNavigating ? (
            <div className="mt-8"><LoadingSkeleton count={3} /></div>
          ) : news.data.length > 0 ? (
            <motion.div layout className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {news.data.map((item, index) => <NewsCard key={item.slug} news={item} headingLevel={3} index={index} />)}
            </motion.div>
          ) : (
            <div className="mt-8">
              <EmptyState
                filtered={hasActiveFilters}
                navigation={navigation}
                title={hasActiveFilters ? "Tidak ada berita yang cocok" : "Belum ada berita yang diterbitkan"}
                description={hasActiveFilters ? "Coba ganti kata kunci atau pilih kategori lain untuk menemukan berita." : "Katalog berita sedang disiapkan. Silakan kembali lagi nanti."}
                emptyHref="/"
                emptyLabel="Kembali ke beranda"
                resetHref="/berita"
                resetPreserveState
                focusTargetId="news-search"
              />
            </div>
          )}

          {!navigation.isNavigating && !navigationError && news.data.length > 0 ? (
            <div className="mt-12">
              <Pagination
                pagination={news.pagination}
                navigation={navigation}
                ariaLabel="Pagination katalog berita"
                buildHref={(page) => buildNewsCatalogUrl({ ...currentQuery, page })}
              />
            </div>
          ) : null}
        </section>
      </div>
    </div>
  )
}
