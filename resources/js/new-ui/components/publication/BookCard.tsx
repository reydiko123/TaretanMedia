import { motion } from "motion/react"
import { Link } from "@inertiajs/react"
import { ArrowUpRight } from "lucide-react"
import { formatRupiah } from "@/new-ui/lib/formatting"
import { cn } from "@/new-ui/lib/utils"
import type { BookCard as BookCardData } from "@/new-ui/types/public"
import { CoverImage } from "@/new-ui/components/publication/CoverImage"

type BookCardProps = {
  book: BookCardData
  headingLevel?: 2 | 3
  index?: number
}

export function BookCard({ book, headingLevel = 2, index = 0 }: BookCardProps) {
  const Heading = `h${headingLevel}` as const
  const detailHref = `/buku/${encodeURIComponent(book.slug)}`
  const categories = book.categories.filter(Boolean).slice(0, 2)
  const additionalCategories = Math.max(book.categories.filter(Boolean).length - categories.length, 0)

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.04, 0.24), ease: "easeOut" }}
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.99 }}
      className="group flex h-full flex-col rounded-xl border border-border bg-card p-3 shadow-subtle transition-shadow hover:shadow-card"
    >
      <Link href={detailHref} className="block rounded-xl focus-visible:outline-offset-4" aria-label={`Buka detail ${book.title}`}>
        <CoverImage image={book.cover} title={book.title} index={index} />
      </Link>

      <div className="flex flex-1 flex-col px-2 pb-2 pt-4">
        <div className="flex min-h-6 flex-wrap items-center gap-1.5">
          {categories.map((category, categoryIndex) => (
            <span
              key={`${category}-${categoryIndex}`}
              className={cn(
                "inline-flex rounded-md px-2 py-1 text-[11px] font-semibold",
                categoryIndex % 2 === 0 ? "bg-surface-feature text-brand-green-dark" : "bg-accent/70 text-brand-teal-deep",
              )}
            >
              {category}
            </span>
          ))}
          {additionalCategories > 0 ? (
            <span className="text-[11px] font-semibold text-muted-foreground" aria-label={`${additionalCategories} kategori lainnya`}>
              +{additionalCategories}
            </span>
          ) : null}
        </div>

        <Heading className="mt-3 line-clamp-2 text-lg font-semibold leading-snug tracking-[-0.04em] text-brand-teal-deep">
          <Link href={detailHref} className="rounded-sm transition-colors hover:text-brand-green-dark">
            {book.title}
          </Link>
        </Heading>
        <p className="mt-1.5 line-clamp-2 text-sm leading-6 text-muted-foreground">
          {book.authors.filter(Boolean).join(", ") || "Penulis tidak dicantumkan"}
        </p>

        <div className="mt-auto flex items-end justify-between gap-3 border-t border-border pt-4">
          <p className="text-base font-semibold text-brand-green-dark">{formatRupiah(book.price)}</p>
          <Link href={detailHref} className="inline-flex min-h-11 items-center gap-1 rounded-full border border-brand-green-dark/30 px-3 text-xs font-semibold text-brand-green-dark transition-colors hover:bg-accent focus-visible:outline-offset-2">
            Detail
            <ArrowUpRight className="size-3.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </motion.article>
  )
}
