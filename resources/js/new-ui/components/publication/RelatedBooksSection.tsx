import { ArrowUpRight } from "lucide-react"
import { motion } from "motion/react"
import { BlurFade } from "@/new-ui/components/magicui/BlurFade"
import { BookCard } from "@/new-ui/components/publication/BookCard"
import type { BookCard as BookCardData } from "@/new-ui/types/public"

type RelatedBooksSectionProps = {
  books?: BookCardData[]
}

export function RelatedBooksSection({ books }: RelatedBooksSectionProps) {
  if (!books?.length) return null

  return (
    <section aria-labelledby="related-books-heading" className="book-detail-related border-t border-border bg-surface-soft">
      <div className="mx-auto max-w-content px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
        <BlurFade>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-micro-uppercase font-semibold uppercase text-brand-green-dark">Lanjutkan penjelajahan</p>
              <h2 id="related-books-heading" className="mt-2 text-heading-2 font-semibold tracking-[-0.04em] text-brand-teal-deep">Buku Terkait</h2>
              <p className="mt-3 max-w-2xl text-base leading-7 text-muted-foreground">Temukan buku lain yang mungkin relevan untuk bacaan anda</p>
            </div>
            <ArrowUpRight className="hidden size-6 text-brand-green-dark sm:block" aria-hidden="true" />
          </div>
        </BlurFade>
        <motion.div layout className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {books.map((book, index) => <BookCard key={book.slug} book={book} headingLevel={3} index={index} />)}
        </motion.div>
      </div>
    </section>
  )
}
