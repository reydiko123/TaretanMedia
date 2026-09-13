import { BookOpen, Search } from "lucide-react"
import { motion, useReducedMotion } from "motion/react"
import type { PublicNavigation } from "@/new-ui/app/navigation"

type EmptyStateProps = {
  filtered: boolean
  navigation?: PublicNavigation
  title?: string
  description?: string
  emptyHref?: string
  emptyLabel?: string
  focusTargetId?: string
  resetHref?: string
  resetPreserveState?: boolean
}

export function EmptyState({ filtered, navigation, title, description, emptyHref = "/", emptyLabel = "Kembali ke beranda", focusTargetId = "book-search", resetHref = "/buku", resetPreserveState = false }: EmptyStateProps) {
  const shouldReduceMotion = useReducedMotion()
  const resolvedTitle = title ?? (filtered ? "Buku tidak ditemukan" : "Katalog buku sedang disiapkan")
  const resolvedDescription = description ?? (filtered ? "Belum ada buku yang cocok dengan pencarian atau filter Anda. Coba ubah kata kunci, rentang harga, kategori, atau tahun terbit." : "Belum ada buku yang dapat ditampilkan saat ini. Silakan kembali lagi atau jelajahi publikasi Taretan Media lainnya.")
  return (
    <motion.section initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: shouldReduceMotion ? 0 : 0.35, ease: "easeOut" }} className="rounded-2xl border border-dashed border-border bg-surface-soft px-6 py-16 text-center" aria-labelledby="empty-content-title">
      {filtered ? <Search className="mx-auto size-10 text-brand-green-dark/60" aria-hidden="true" /> : <BookOpen className="mx-auto size-10 text-brand-green-dark/60" aria-hidden="true" />}
      <h2 id="empty-content-title" className="mt-5 text-2xl font-semibold tracking-[-0.04em] text-brand-teal-deep">{resolvedTitle}</h2>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">{resolvedDescription}</p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        {filtered ? (
          <>
          <button type="button" onClick={() => navigation?.visit(resetHref, { preserveScroll: false, preserveState: resetPreserveState })} className="inline-flex min-h-11 items-center rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground hover:bg-primary-deep">Reset filter</button>
            <button type="button" onClick={() => document.getElementById(focusTargetId)?.focus()} className="inline-flex min-h-11 items-center rounded-full border border-border px-5 text-sm font-semibold text-brand-teal-deep hover:bg-accent">Ubah pencarian</button>
          </>
        ) : <a href={emptyHref} className="inline-flex min-h-11 items-center rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground hover:bg-primary-deep">{emptyLabel}</a>}
      </div>
    </motion.section>
  )
}
