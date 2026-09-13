import { ArrowRight, BookmarkPlus } from "lucide-react"
import { useState } from "react"
import { motion, type Variants } from "motion/react"

import { cn } from "@/new-ui/lib/utils"
import type { BookCard as FeaturedBook } from "@/new-ui/types/public"

export type { FeaturedBook }

const fallbackCoverTones = [
  "bg-brand-teal-deep text-on-dark",
  "bg-brand-green-dark text-on-dark",
  "bg-accent-purple text-on-dark",
  "bg-accent-orange text-brand-teal-deep",
]

const sectionReveal: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
}

const booksGridReveal: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { delayChildren: 0.1, staggerChildren: 0.1 },
  },
}

const bookCardReveal: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
}

const emptyStateReveal: Variants = {
  hidden: { opacity: 0, y: 16, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: "easeOut" },
  },
}

function formatRupiah(price: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(price)
}

function BookCover({ book, index }: { book: FeaturedBook; index: number }) {
  const [imageFailed, setImageFailed] = useState(false)
  const cover = book.cover
  const showFallback = !cover?.src || imageFailed

  return (
    <div className="aspect-[2/3] overflow-hidden rounded-[1.35rem] bg-surface">
      {showFallback || !cover ? (
        <div
          role="img"
          aria-label={`Sampul buku ${book.title}`}
          className={cn("flex h-full flex-col justify-between p-5 sm:p-6", fallbackCoverTones[index % fallbackCoverTones.length])}
        >
          <div className="flex items-center justify-between text-[9px] font-semibold uppercase tracking-[0.18em] opacity-75">
            <span>Taretan</span>
            <BookmarkPlus className="size-4" aria-hidden="true" />
          </div>
          <p className="max-w-[12rem] text-2xl font-semibold leading-[0.95] tracking-[-0.06em] sm:text-3xl">{book.title}</p>
          <p className="text-[10px] font-medium uppercase tracking-[0.16em] opacity-75">Buku pilihan editor</p>
        </div>
      ) : (
        <img
          src={cover.src}
          alt={cover.alt || `Sampul buku ${book.title}`}
          width={cover.width ?? 640}
          height={cover.height ?? 960}
          loading="lazy"
          onError={() => setImageFailed(true)}
          className="size-full object-cover"
        />
      )}
    </div>
  )
}

function FeaturedBookCard({ book, index, className }: { book: FeaturedBook; index: number; className?: string }) {
  return (
    <motion.article
      variants={bookCardReveal}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      className={cn("group h-[38rem]", className)}
    >
      <div className="flex h-full min-h-[38rem] flex-col overflow-hidden rounded-[1.65rem] border border-border bg-background p-3 shadow-subtle transition-shadow group-hover:shadow-card">
        <BookCover book={book} index={index} />

        <div className="flex flex-1 flex-col px-2 pb-2 pt-5">
          <div className="flex items-center justify-between gap-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            <span className="truncate">{book.categories[0] ?? "Publikasi Taretan"}</span>
            {book.publicationYear ? <span>{book.publicationYear}</span> : null}
          </div>

          <h3 className="mt-3 min-h-[3.5rem] line-clamp-2 overflow-hidden text-xl font-semibold leading-tight tracking-[-0.045em] text-brand-teal-deep">
            <a href={`/buku/${book.slug}`} className="rounded-sm outline-none transition-colors hover:text-brand-green-dark">
              {book.title}
            </a>
          </h3>

          <p className="mt-2 min-h-[3rem] line-clamp-2 overflow-hidden text-sm leading-6 text-muted-foreground">
            {book.authors.length > 0 ? book.authors.join(", ") : "Penulis tidak dicantumkan"}
          </p>

          {book.price !== undefined ? <p className="mt-auto pt-6 text-sm font-semibold text-brand-green-dark">{formatRupiah(book.price)}</p> : null}
        </div>
      </div>
    </motion.article>
  )
}

type FeaturedBooksSectionProps = {
  books: FeaturedBook[]
}

export function FeaturedBooksSection({ books }: FeaturedBooksSectionProps) {
  const visibleBooks = books.slice(0, 4)
  const hasBooks = visibleBooks.length > 0

  return (
    <section id="katalog" aria-labelledby="featured-books-title" className="border-b border-border bg-surface px-5 py-24 sm:px-8 sm:py-28 lg:px-12 lg:py-32">
      <div className="mx-auto max-w-content">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={sectionReveal}
          className="flex flex-col items-center text-center"
        >
          <span className="inline-flex items-center rounded-full bg-accent px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-brand-teal-deep ring-1 ring-border">
            Pilihan Editor
          </span>

          <div className="mt-6 max-w-2xl">
            <h2 id="featured-books-title" className="text-4xl font-semibold tracking-[-0.065em] text-brand-teal-deep sm:text-6xl">
              Buku Unggulan
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base leading-8 text-muted-foreground sm:text-lg">
              Jelajahi pilihan buku yang tersedia dari Taretan Media
            </p>
          </div>
        </motion.div>

        {hasBooks ? (
          <>
            <div className="-mx-5 mt-12 overflow-x-auto px-5 pb-3 sm:-mx-8 sm:px-8 lg:mx-0 lg:overflow-visible lg:px-0 lg:pb-0">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={booksGridReveal}
                className="flex w-max gap-5 lg:grid lg:w-full lg:grid-cols-4"
              >
              {visibleBooks.map((book, index) => (
                  <FeaturedBookCard key={book.slug} book={book} index={index} className="w-[min(78vw,18rem)] shrink-0 lg:w-auto" />
              ))}
                <motion.div variants={bookCardReveal} className="flex w-[min(78vw,18rem)] shrink-0 items-center justify-center lg:hidden">
                  <motion.a
                    href="/buku"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-subtle transition-colors hover:bg-primary-deep"
                  >
                    Lihat semua buku
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </motion.a>
                </motion.div>
              </motion.div>
            </div>

            <div className="mt-10 hidden justify-center lg:flex">
              <motion.a
                href="/buku"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-subtle transition-colors hover:bg-primary-deep active:scale-[0.98]"
              >
                Lihat semua buku
                <ArrowRight className="size-4" aria-hidden="true" />
              </motion.a>
            </div>
          </>
        ) : (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.35 }}
            variants={emptyStateReveal}
            className="mt-12 rounded-[1.65rem] border border-dashed border-border bg-background/60 px-6 py-12 text-center sm:px-10"
          >
            <p className="text-lg font-semibold tracking-[-0.03em] text-brand-teal-deep">Belum ada buku unggulan untuk ditampilkan.</p>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">
              Koleksi buku akan ditampilkan di sini setelah tersedia.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  )
}
