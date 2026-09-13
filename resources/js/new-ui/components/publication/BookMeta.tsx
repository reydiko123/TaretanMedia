import { motion } from "motion/react"

type BookMetaProps = {
  isbn?: string | null
  publisher: string
  publicationYear: number
  pageCount?: number | null
}

export function BookMeta({ isbn, publisher, publicationYear, pageCount }: BookMetaProps) {
  const items = [
    { label: "Penerbit", value: publisher.trim() },
    { label: "Tahun terbit", value: String(publicationYear) },
    ...(typeof pageCount === "number" && Number.isInteger(pageCount) && pageCount > 0 ? [{ label: "Jumlah halaman", value: `${pageCount} halaman` }] : []),
    ...(isbn?.trim() ? [{ label: "ISBN", value: isbn.trim() }] : []),
  ]

  return (
    <motion.dl initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.35, ease: "easeOut" }} className="grid grid-cols-2 gap-x-5 gap-y-5 rounded-2xl border border-border bg-card p-5 sm:grid-cols-3">
      {items.map((item) => (
        <div key={item.label} className="min-w-0">
          <dt className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">{item.label}</dt>
          <dd className="mt-1.5 break-words text-sm font-semibold text-brand-teal-deep">{item.value}</dd>
        </div>
      ))}
    </motion.dl>
  )
}
