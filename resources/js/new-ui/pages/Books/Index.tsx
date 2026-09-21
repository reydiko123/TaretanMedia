import { useEffect, useRef } from "react"
import { motion } from "motion/react"
import { BlurFade } from "@/new-ui/components/magicui/BlurFade"
import { BookCatalogControls } from "@/new-ui/components/catalog/BookCatalogControls"
import { FilterChips } from "@/new-ui/components/catalog/FilterChips"
import { Pagination } from "@/new-ui/components/catalog/Pagination"
import { EmptyState } from "@/new-ui/components/feedback/EmptyState"
import { StatusMessage } from "@/new-ui/components/feedback/StatusMessage"
import { BookCard } from "@/new-ui/components/publication/BookCard"
import { getBookResultSummary } from "@/new-ui/lib/formatting"
import { saveBookCatalogReturnUrl } from "@/new-ui/lib/bookCatalogReturnUrl"
import type { PublicNavigation } from "@/new-ui/app/navigation"
import type { BooksIndexProps } from "@/new-ui/types/catalog"
import "@/new-ui/styles/catalog.css"

export type BooksIndexPageProps = BooksIndexProps & { navigation: PublicNavigation }

export function BooksIndexPage({ books, filters, filterOptions, filterNotice, navigation }: BooksIndexPageProps) {
  const resultHeadingRef = useRef<HTMLHeadingElement>(null)
  const summary = getBookResultSummary(books.pagination)

  useEffect(() => {
    saveBookCatalogReturnUrl()
  }, [])
  const hasActiveFilters = Boolean(filters.q || filters.category || filters.minPrice != null || filters.maxPrice != null || filters.year != null || filters.hasIsbn || filters.sort !== "latest")

  return (
    <div className="catalog-page">
      <section className="journal-intro border-b border-brand-teal/60 journal-intro-dark-gradient">
        <div className="mx-auto max-w-content px-5 py-14 sm:px-8 sm:py-18 lg:px-12 lg:py-24">
          <BlurFade>
            <div className="max-w-3xl">
              <p className="text-micro-uppercase font-semibold uppercase text-brand-green">Publikasi CV Taretan Media Publishing</p>
              <h1 className="mt-4 text-heading-1 font-semibold text-on-dark">Katalog Buku</h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-on-dark-muted">Temukan buku untuk memperluas pengetahuan dan menemani perjalanan membaca anda</p>
            </div>
          </BlurFade>
        </div>
      </section>

      <div className="mx-auto max-w-content px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
        <BookCatalogControls filters={filters} filterOptions={filterOptions} navigation={navigation} />

        <div className="mt-6 min-h-9">
          <FilterChips filters={filters} filterOptions={filterOptions} navigation={navigation} />
        </div>

        <section ref={resultHeadingRef} aria-labelledby="catalog-results-title" aria-busy={navigation.isNavigating} className="mt-10">
          <div className="flex flex-col gap-3 border-b border-border pb-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-micro-uppercase font-semibold uppercase text-brand-green-dark">Koleksi pilihan</p>
              <h2 id="catalog-results-title" className="mt-2 text-heading-2 font-semibold tracking-[-0.04em] text-brand-teal-deep" tabIndex={-1}>Buku untuk Anda</h2>
            </div>
            <StatusMessage message={filterNotice ?? summary} busy={navigation.isNavigating} />
          </div>

          {books.data.length > 0 ? (
            <motion.div layout className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {books.data.map((book, index) => <BookCard key={book.slug} book={book} headingLevel={3} index={index} />)}
            </motion.div>
          ) : <div className="mt-8"><EmptyState filtered={hasActiveFilters} navigation={navigation} /></div>}

          {books.data.length > 0 ? <div className="mt-12"><Pagination pagination={books.pagination} filters={filters} filterOptions={filterOptions} navigation={navigation} /></div> : null}
        </section>
      </div>
    </div>
  )
}
