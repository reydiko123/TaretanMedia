import { buildJournalCatalogUrl } from "@/new-ui/lib/journalCatalogQuery"
import { motion } from "motion/react"
import type { JournalQuery } from "@/new-ui/types/journal"
import type { PublicNavigation } from "@/new-ui/app/navigation"

type JournalPaginationProps = {
  pagination: { currentPage: number; lastPage: number }
  query: JournalQuery
  navigation: PublicNavigation
}

export function JournalPagination({ pagination, query, navigation }: JournalPaginationProps) {
  if (pagination.lastPage <= 1) return null
  const pages = new Set<number>([1, pagination.lastPage])
  for (let page = pagination.currentPage - 2; page <= pagination.currentPage + 2; page += 1) {
    if (page > 0 && page <= pagination.lastPage) pages.add(page)
  }
  const visiblePages = [...pages].sort((a, b) => a - b)
  const hrefForPage = (page: number) => buildJournalCatalogUrl({ ...query, page })
  const navigate = (event: React.MouseEvent<HTMLAnchorElement>, page: number) => {
    event.preventDefault()
    navigation.visit(hrefForPage(page), { preserveScroll: false, preserveState: true })
  }

  return (
    <motion.nav initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, ease: "easeOut" }} aria-label="Pagination jurnal" className="flex flex-wrap items-center justify-center gap-2">
      {pagination.currentPage > 1 ? <a href={hrefForPage(pagination.currentPage - 1)} onClick={(event) => navigate(event, pagination.currentPage - 1)} className="inline-flex min-h-11 items-center rounded-full border border-border px-4 text-sm font-semibold text-brand-teal-deep hover:bg-accent">Sebelumnya</a> : <span aria-disabled="true" className="inline-flex min-h-11 items-center rounded-full border border-border px-4 text-sm font-semibold text-muted-foreground">Sebelumnya</span>}
      <div className="flex flex-wrap items-center justify-center gap-1">
        {visiblePages.map((page, index) => {
          const previous = visiblePages[index - 1]
          const needsGap = previous != null && page - previous > 1
          return (
            <span key={page} className="contents">
              {needsGap ? <span aria-hidden="true" className="px-1 text-muted-foreground">…</span> : null}
              {page === pagination.currentPage ? <span aria-current="page" aria-label={`Halaman ${page}, saat ini`} className="grid size-11 place-items-center rounded-full bg-brand-teal-deep text-sm font-semibold text-on-dark">{page}</span> : <a href={hrefForPage(page)} onClick={(event) => navigate(event, page)} aria-label={`Buka halaman ${page}`} className="grid size-11 place-items-center rounded-full border border-border text-sm font-semibold text-brand-teal-deep hover:bg-accent">{page}</a>}
            </span>
          )
        })}
      </div>
      {pagination.currentPage < pagination.lastPage ? <a href={hrefForPage(pagination.currentPage + 1)} onClick={(event) => navigate(event, pagination.currentPage + 1)} className="inline-flex min-h-11 items-center rounded-full border border-border px-4 text-sm font-semibold text-brand-teal-deep hover:bg-accent">Berikutnya</a> : <span aria-disabled="true" className="inline-flex min-h-11 items-center rounded-full border border-border px-4 text-sm font-semibold text-muted-foreground">Berikutnya</span>}
    </motion.nav>
  )
}
