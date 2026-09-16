import { ArrowRight, CalendarDays, FileText } from "lucide-react"
import { useState } from "react"
import { motion, type Variants } from "motion/react"
import { Link } from "@inertiajs/react"

import type { LatestNews } from "@/new-ui/pages/Home/data/homeTypes"

const sectionReveal: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
}

const cardReveal: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
}

function formatIndonesianDate(value: string) {
  const date = new Date(`${value}T00:00:00`)
  if (Number.isNaN(date.getTime())) return "Tanggal publikasi"
  return new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "short", year: "numeric" }).format(date)
}

function NewsImage({ news }: { news: LatestNews }) {
  const [imageFailed, setImageFailed] = useState(false)
  if (!news.featuredImage?.src || imageFailed) {
    return <div role="img" aria-label={`Ilustrasi berita ${news.title}`} className="grid aspect-[16/10] place-items-center bg-accent text-brand-green-dark"><FileText className="size-10" aria-hidden="true" /></div>
  }
  return <img src={news.featuredImage.src} alt={news.featuredImage.alt || news.title} width={news.featuredImage.width ?? 1280} height={news.featuredImage.height ?? 800} loading="lazy" onError={() => setImageFailed(true)} className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
}

type LatestNewsSectionProps = { news: LatestNews[] }

export function LatestNewsSection({ news }: LatestNewsSectionProps) {
  const visibleNews = news.slice(0, 3)
  const hasNews = visibleNews.length > 0

  return (
    <section id="berita-terbaru" aria-labelledby="latest-news-title" className="border-b border-border bg-background px-5 py-24 sm:px-8 sm:py-28 lg:px-12 lg:py-32">
      <div className="mx-auto max-w-content">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.45 }} variants={sectionReveal} className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-green-dark">Wawasan Taretan Media</span>
            <h2 id="latest-news-title" className="mt-5 text-4xl font-semibold tracking-[-0.065em] text-brand-teal-deep sm:text-6xl">Berita Terbaru</h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">Gagasan, catatan, dan percakapan seputar buku, penerbitan, dan publikasi ilmiah</p>
          </div>
          {hasNews ? <Link href="/berita" className="inline-flex min-h-11 shrink-0 items-center gap-2 self-start rounded-full border border-border bg-background px-5 text-sm font-semibold text-brand-teal-deep transition-colors hover:bg-accent sm:self-auto">Lihat semua berita <ArrowRight className="size-4" aria-hidden="true" /></Link> : null}
        </motion.div>

        {visibleNews.length > 0 ? (
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={{ hidden: { opacity: 1 }, visible: { opacity: 1, transition: { delayChildren: 0.08, staggerChildren: 0.1 } } }} className="mt-12 grid gap-5 md:grid-cols-3">
            {visibleNews.map((item) => (
              <motion.article key={item.slug} variants={cardReveal} whileHover={{ y: -6 }} transition={{ duration: 0.22, ease: "easeOut" }} className="group overflow-hidden rounded-[1.65rem] border border-border bg-surface p-3 shadow-subtle transition-shadow hover:shadow-card">
                <div className="overflow-hidden rounded-[1.35rem] bg-background"><NewsImage news={item} /></div>
                <div className="p-3 pb-4 pt-5 sm:p-4 sm:pb-5">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground"><span className="inline-flex items-center gap-1"><CalendarDays className="size-3" aria-hidden="true" />{formatIndonesianDate(item.publishedAt)}</span><span>{item.categories[0] ?? "Berita"}</span></div>
                  <h3 className="mt-4 min-h-[3.5rem] line-clamp-2 text-xl font-semibold leading-tight tracking-[-0.045em] text-brand-teal-deep"><Link href={`/berita/${item.slug}`} className="rounded-sm outline-none transition-colors hover:text-brand-green-dark">{item.title}</Link></h3>
                  <p className="mt-3 line-clamp-3 text-sm leading-7 text-muted-foreground">{item.excerpt ?? "Baca catatan terbaru dari Taretan Media."}</p>
                  <p className="mt-5 text-xs font-medium text-muted-foreground">Oleh {item.authorName}</p>
                </div>
              </motion.article>
            ))}
          </motion.div>
        ) : (
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.35 }} variants={sectionReveal} className="mt-12 rounded-[1.65rem] border border-dashed border-border bg-surface px-6 py-12 text-center"><p className="text-lg font-semibold tracking-[-0.03em] text-brand-teal-deep">Belum ada berita terbaru untuk ditampilkan.</p><p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">Berita akan ditampilkan di sini setelah tersedia.</p></motion.div>
        )}
      </div>
    </section>
  )
}
