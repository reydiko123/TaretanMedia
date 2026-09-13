import { motion } from "motion/react"
import type { Pagination } from "@/new-ui/types/public"

type CatalogResultSummaryProps = {
  pagination: Pagination
  isNavigating?: boolean
}

export function CatalogResultSummary({ pagination, isNavigating = false }: CatalogResultSummaryProps) {
  const message = isNavigating
    ? "Memperbarui hasil jurnal…"
    : pagination.from != null && pagination.to != null
      ? `Menampilkan ${pagination.from}–${pagination.to} dari ${pagination.total} jurnal`
      : `${pagination.total} jurnal ditemukan`

  return <motion.p layout role="status" aria-live="polite" aria-atomic="true" className="min-h-6 text-sm font-medium text-muted-foreground">{message}</motion.p>
}
