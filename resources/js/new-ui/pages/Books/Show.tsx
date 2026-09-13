import { ArrowLeft } from "lucide-react"
import { BlurFade } from "@/new-ui/components/magicui/BlurFade"
import { ShareButton } from "@/new-ui/components/conversion/ShareButton"
import { WhatsAppButton } from "@/new-ui/components/conversion/WhatsAppButton"
import { Breadcrumbs } from "@/new-ui/components/navigation/Breadcrumbs"
import { AuthorList } from "@/new-ui/components/publication/AuthorList"
import { AuthorProfiles } from "@/new-ui/components/publication/AuthorProfiles"
import { BookLongTextSection } from "@/new-ui/components/publication/BookLongTextSection"
import { BookMeta } from "@/new-ui/components/publication/BookMeta"
import { CoverImage } from "@/new-ui/components/publication/CoverImage"
import { RelatedBooksSection } from "@/new-ui/components/publication/RelatedBooksSection"
import { getBookCatalogReturnUrl } from "@/new-ui/lib/bookCatalogReturnUrl"
import { formatRupiah } from "@/new-ui/lib/formatting"
import { buildWhatsAppUrl, createBookOrderMessage } from "@/new-ui/lib/whatsapp"
import type { BookShowProps } from "@/new-ui/types/public"
import { motion } from "motion/react"
import "@/new-ui/styles/book-detail.css"

export function BookShowPage({ book, canonicalUrl, whatsapp, relatedBooks }: BookShowProps) {
  const message = createBookOrderMessage({ template: whatsapp.messageTemplate, title: book.title, canonicalUrl })
  const whatsappHref = buildWhatsAppUrl({ number: whatsapp.number, message })
  const categories = book.categories.filter((category) => category.name.trim())
  const catalogReturnUrl = getBookCatalogReturnUrl()

  return (
    <div className="book-detail-page">
      <section className="book-detail-hero border-b border-border bg-surface-soft">
        <div className="mx-auto max-w-content px-5 py-10 sm:px-8 sm:py-14 lg:px-12 lg:py-16">
          <BlurFade>
            <Breadcrumbs
              items={[{ label: "Beranda", href: "/" }, { label: "Katalog Buku", href: catalogReturnUrl }]}
              currentLabel={book.title}
            />
          </BlurFade>

          <BlurFade delay={0.05}>
            <motion.a
              href={catalogReturnUrl}
              whileHover={{ x: -4 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="mt-8 inline-flex min-h-11 items-center gap-2 rounded-full border border-brand-green-dark px-4 py-2 text-sm font-semibold text-brand-green-dark transition-colors hover:bg-surface-feature hover:text-brand-teal-deep focus-visible:outline-offset-4 sm:px-5"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
              Kembali ke katalog buku
            </motion.a>
          </BlurFade>

          <article className="mt-10 lg:mt-14">
            <div className="grid items-start gap-10 lg:grid-cols-[minmax(240px,0.38fr)_minmax(0,0.62fr)] lg:gap-16 xl:gap-20">
              <BlurFade className="mx-auto w-full max-w-[280px] lg:sticky lg:top-28 lg:max-w-[360px]" delay={0.08}>
                <CoverImage image={book.cover} title={book.title} loading="eager" className="book-detail-cover shadow-card" />
              </BlurFade>

              <BlurFade className="min-w-0" delay={0.14}>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category, index) => (
                    <span key={category.id} className={`rounded-full px-3 py-1.5 text-[11px] font-semibold ${index % 2 === 0 ? "bg-surface-feature text-brand-green-dark" : "bg-accent/70 text-brand-teal-deep"}`}>
                      {category.name}
                    </span>
                  ))}
                </div>

                <h1 className="mt-6 max-w-3xl break-words text-heading-1 font-semibold leading-[1.03] tracking-[-0.065em] text-brand-teal-deep">{book.title}</h1>
                <div className="mt-4"><AuthorList authors={book.authors} prefix="" /></div>

                <div className="mt-7">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">Harga buku</p>
                    <p className="mt-1 text-3xl font-semibold tracking-[-0.05em] text-brand-green-dark sm:text-4xl">{formatRupiah(book.price)}</p>
                  </div>
                </div>

                <div className="mt-8"><BookMeta isbn={book.isbn} publisher={book.publisher} publicationYear={book.publicationYear} pageCount={book.pageCount} /></div>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-start">
                  <WhatsAppButton href={whatsappHref} bookTitle={book.title} />
                  <ShareButton title={book.title} url={canonicalUrl} />
                </div>
              </BlurFade>
            </div>
          </article>
        </div>
      </section>

      <div className="book-detail-content mx-auto max-w-content px-5 py-14 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
        <div className="mx-auto min-w-0 max-w-3xl space-y-12">
          <BookLongTextSection heading="Sinopsis" content={book.synopsis} />
          <BookLongTextSection heading="Daftar Isi" content={book.tableOfContents} />
          <AuthorProfiles authors={book.authors} />
        </div>
      </div>

      <RelatedBooksSection books={relatedBooks} />
    </div>
  )
}
