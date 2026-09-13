import { CalendarDays, FileText } from "lucide-react"
import { motion } from "motion/react"
import { useState } from "react"
import type { NewsDetailViewModel } from "@/new-ui/lib/newsDetail"

type NewsHeaderProps = Pick<NewsDetailViewModel, "title" | "categories" | "authorName" | "publishedDate" | "publishedDateFallback" | "featuredImage">

export function NewsHeader({ title, categories, authorName, publishedDate, publishedDateFallback, featuredImage }: NewsHeaderProps) {
  const [hasImageError, setHasImageError] = useState(false)
  const imageAlt = featuredImage?.alt || `Ilustrasi berita ${title}`
  const showImage = Boolean(featuredImage?.src) && !hasImageError

  return (
    <header className="news-detail-header">
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease: "easeOut" }}>
        <p className="text-micro-uppercase font-semibold uppercase text-brand-green-dark">Berita</p>

        {categories.length > 0 ? (
          <ul aria-label="Kategori berita" className="mt-5 flex flex-wrap gap-2">
            {categories.map((category, index) => (
              <li key={`${category}-${index}`} className={`inline-flex rounded-md px-2.5 py-1.5 text-xs font-semibold ${index % 3 === 0 ? "bg-surface-feature text-brand-green-dark" : index % 3 === 1 ? "bg-accent-purple/10 text-accent-purple" : "bg-accent-blue/10 text-accent-blue"}`}>
                {category}
              </li>
            ))}
          </ul>
        ) : null}

        <h1 id="news-title" className="mt-5 max-w-4xl break-words text-heading-1 font-semibold leading-[1.08] tracking-[-0.06em] text-brand-teal-deep">{title}</h1>

        <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-muted-foreground">
          {authorName ? <span>Oleh {authorName}</span> : null}
          {authorName && (publishedDate || publishedDateFallback) ? <span aria-hidden="true">•</span> : null}
          {publishedDate ? (
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="size-4" aria-hidden="true" />
              <time dateTime={publishedDate.dateTime}>{publishedDate.label}</time>
            </span>
          ) : publishedDateFallback ? <span>{publishedDateFallback}</span> : null}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.985 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.08, ease: "easeOut" }}
        className="news-detail-featured-image mt-8 overflow-hidden rounded-xl border border-border bg-brand-teal-deep shadow-card"
      >
        {showImage ? (
          <img
            src={featuredImage!.src}
            alt={imageAlt}
            width={featuredImage!.width ?? 1200}
            height={featuredImage!.height ?? 675}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            onError={() => setHasImageError(true)}
            className="aspect-video w-full object-cover"
          />
        ) : (
          <div role="img" aria-label="Ilustrasi berita belum tersedia" className="flex aspect-video items-center justify-center px-6 text-center text-on-dark">
            <div className="flex flex-col items-center gap-3">
              <span className="grid size-12 place-items-center rounded-full border border-brand-green/40 bg-brand-green/10 text-brand-green">
                <FileText className="size-5" aria-hidden="true" />
              </span>
              <span className="text-sm font-semibold">Ilustrasi berita belum tersedia</span>
            </div>
          </div>
        )}
      </motion.div>
    </header>
  )
}
