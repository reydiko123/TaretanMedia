import { motion } from "motion/react"
import { NewsCard } from "@/new-ui/components/publication/NewsCard"
import type { NewsCardData } from "@/new-ui/types/public"

type RelatedNewsSectionProps = {
  news?: NewsCardData[]
}

export function RelatedNewsSection({ news }: RelatedNewsSectionProps) {
  const validNews = (news ?? []).filter((item) => Boolean(item.title.trim() && item.slug.trim()))
  if (validNews.length === 0) return null

  return (
    <motion.section
      aria-labelledby="related-news-title"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="news-detail-related"
    >
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-micro-uppercase font-semibold uppercase text-brand-green-dark">Lanjut membaca</p>
          <h2 id="related-news-title" className="mt-2 text-heading-2 font-semibold tracking-[-0.04em] text-brand-teal-deep">Berita terkait</h2>
        </div>
      </div>
      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {validNews.map((item, index) => <NewsCard key={item.slug} news={item} headingLevel={3} index={index} />)}
      </div>
    </motion.section>
  )
}
