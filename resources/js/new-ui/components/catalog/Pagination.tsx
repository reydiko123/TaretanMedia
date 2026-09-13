import type { BookFilterOptions, BookFilters } from "@/new-ui/types/catalog"
import type { PublicNavigation } from "@/new-ui/app/navigation"
import { createBookCatalogHref, createBookCatalogQuery } from "@/new-ui/lib/bookCatalogQuery"

type PaginationProps = {
  pagination: { currentPage: number; lastPage: number }
  filters?: BookFilters
  filterOptions?: BookFilterOptions
  navigation: PublicNavigation
  buildHref?: (page: number) => string
  ariaLabel?: string
}

function pageQuery(filters: BookFilters, page: number, filterOptions: BookFilterOptions) {
  return createBookCatalogQuery({
    q: filters.q ?? "",
    category: filters.category ?? "",
    minPrice: filters.minPrice == null ? "" : String(filters.minPrice),
    maxPrice: filters.maxPrice == null ? "" : String(filters.maxPrice),
    year: filters.year == null ? "" : String(filters.year),
    hasIsbn: Boolean(filters.hasIsbn),
    sort: filters.sort,
  }, filterOptions.priceBounds, page, filterOptions.years)
}

export function Pagination({ pagination, filters, filterOptions, navigation, buildHref, ariaLabel }: PaginationProps) {
  if (pagination.lastPage <= 1) return null
  const pages = new Set<number>([1, pagination.lastPage])
  for (let page = pagination.currentPage - 1; page <= pagination.currentPage + 1; page += 1) {
    if (page > 0 && page <= pagination.lastPage) pages.add(page)
  }
  const visiblePages = [...pages].sort((a, b) => a - b)
  const hrefForPage = (page: number) => buildHref
    ? buildHref(page)
    : createBookCatalogHref(pageQuery(filters!, page, filterOptions!))
  const goTo = (event: React.MouseEvent<HTMLAnchorElement>, page: number) => {
    event.preventDefault()
    navigation.visit(hrefForPage(page), { preserveState: true, preserveScroll: false })
  }

  return (
    <nav aria-label={ariaLabel ?? "Pagination katalog buku"} className="flex flex-wrap items-center justify-center gap-2">
      {pagination.currentPage > 1 ? (
        <a href={hrefForPage(pagination.currentPage - 1)} onClick={(event) => goTo(event, pagination.currentPage - 1)} className="inline-flex min-h-11 items-center rounded-full border border-border px-4 text-sm font-semibold text-brand-teal-deep hover:bg-accent">Sebelumnya</a>
      ) : <span aria-disabled="true" className="inline-flex min-h-11 items-center rounded-full border border-border px-4 text-sm font-semibold text-muted-foreground">Sebelumnya</span>}

      <div className="flex flex-wrap items-center justify-center gap-1">
        {visiblePages.map((page, index) => {
          const previous = visiblePages[index - 1]
          const needsGap = previous != null && page - previous > 1
          return (
            <span key={page} className="contents">
              {needsGap ? <span aria-hidden="true" className="px-1 text-muted-foreground">…</span> : null}
              {page === pagination.currentPage ? (
                <span aria-current="page" aria-label={`Halaman ${page}, saat ini`} className="grid size-11 place-items-center rounded-full bg-brand-teal-deep text-sm font-semibold text-on-dark">{page}</span>
              ) : (
                <a href={hrefForPage(page)} onClick={(event) => goTo(event, page)} aria-label={`Buka halaman ${page}`} className="grid size-11 place-items-center rounded-full border border-border text-sm font-semibold text-brand-teal-deep hover:bg-accent">{page}</a>
              )}
            </span>
          )
        })}
      </div>

      {pagination.currentPage < pagination.lastPage ? (
        <a href={hrefForPage(pagination.currentPage + 1)} onClick={(event) => goTo(event, pagination.currentPage + 1)} className="inline-flex min-h-11 items-center rounded-full border border-border px-4 text-sm font-semibold text-brand-teal-deep hover:bg-accent">Berikutnya</a>
      ) : <span aria-disabled="true" className="inline-flex min-h-11 items-center rounded-full border border-border px-4 text-sm font-semibold text-muted-foreground">Berikutnya</span>}
    </nav>
  )
}
