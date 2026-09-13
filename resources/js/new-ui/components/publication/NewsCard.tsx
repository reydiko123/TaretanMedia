import { useState } from "react"
import { motion } from "motion/react"
import { CalendarDays, FileText } from "lucide-react"
import { buildNewsDetailUrl } from "@/new-ui/lib/newsCatalog"
import { formatIndonesianDate } from "@/new-ui/lib/formatting"
import type { NewsCardData } from "@/new-ui/types/public"

type NewsCardProps = {
  news: NewsCardData
  headingLevel?: 2 | 3
  index?: number
}

function NewsImage({ news }: { news: NewsCardData }) {
  const [hasError, setHasError] = useState(false)
  const title = `Ilustrasi berita ${news.title}`
  const image = news.featuredImage

  if (!image || hasError) {
    return (
      <div role="img" aria-label={title} className="flex aspect-[16/10] items-center justify-center bg-brand-teal-deep px-6 text-center">
        <div className="flex flex-col items-center gap-2 text-on-dark">
          <span className="grid size-11 place-items-center rounded-full border border-brand-green/40 bg-brand-green/10 text-brand-green">
            <FileText className="size-5" aria-hidden="true" />
          </span>
          <span className="text-xs font-semibold tracking-wide text-on-dark-muted">Taretan Media</span>
        </div>
      </div>
    )
  }

  return (
    <img
      src={image.src}
      alt={image.alt || title}
      width={image.width ?? 800}
      height={image.height ?? 500}
      loading="lazy"
      onError={() => setHasError(true)}
      className="aspect-[16/10] w-full object-cover transition-transform duration-300 group-hover:scale-[1.025]"
    />
  )
}

export function NewsCard({ news, headingLevel = 3, index = 0 }: NewsCardProps) {
  const Heading = `h${headingLevel}` as const
  const href = buildNewsDetailUrl(news.slug)
  const categories = news.categories.filter(Boolean)

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.05, 0.3), ease: "easeOut" }}
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.99 }}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card shadow-subtle transition-shadow duration-200 hover:shadow-card"
    >
      <a href={href} aria-label={`Buka berita ${news.title}`} className="flex h-full flex-col focus-visible:outline-offset-[-3px]">
        <div className="overflow-hidden">
          <NewsImage news={news} />
        </div>

        <div className="flex flex-1 flex-col p-5">
          {categories.length > 0 ? (
            <div className="flex flex-wrap gap-1.5" aria-label="Kategori berita">
              {categories.map((category, categoryIndex) => (
                <span key={`${category}-${categoryIndex}`} className={`inline-flex rounded-md px-2 py-1 text-[11px] font-semibold ${categoryIndex % 3 === 0 ? "bg-surface-feature text-brand-green-dark" : categoryIndex % 3 === 1 ? "bg-accent-purple/10 text-accent-purple" : "bg-accent-blue/10 text-accent-blue"}`}>
                  {category}
                </span>
              ))}
            </div>
          ) : null}

          <div className="mt-4 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
            <CalendarDays className="size-3.5" aria-hidden="true" />
            <span>{formatIndonesianDate(news.publishedAt)}</span>
          </div>

          <Heading className="mt-3 line-clamp-2 text-heading-5 font-semibold leading-snug tracking-[-0.02em] text-brand-teal-deep transition-colors duration-200 group-hover:text-brand-green-dark">{news.title}</Heading>

          {news.excerpt?.trim() ? <p className="mt-2 line-clamp-3 text-sm leading-6 text-muted-foreground">{news.excerpt}</p> : null}
          {news.authorName.trim() ? <p className="mt-4 text-xs font-medium text-brand-teal-deep/70">Oleh {news.authorName}</p> : null}
        </div>
      </a>
    </motion.article>
  )
}
