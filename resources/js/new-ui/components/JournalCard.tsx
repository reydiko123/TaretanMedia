import { ArrowUpRight } from "lucide-react"
import { motion } from "motion/react"
import { CoverImage } from "@/new-ui/components/publication/CoverImage"
import { journalDetailHref } from "@/new-ui/lib/routes"
import type { JournalCard as JournalCardData } from "@/new-ui/types/public"

type JournalCardProps = {
  journal: JournalCardData
  headingLevel?: 2 | 3
  index?: number
}

export function JournalCard({ journal, headingLevel = 3, index = 0 }: JournalCardProps) {
  const Heading = `h${headingLevel}` as const
  const href = journalDetailHref(journal.slug)
  const metadata = [journal.editionLabel?.trim(), journal.publicationYear ? String(journal.publicationYear) : null].filter(Boolean).join(" \u00b7 ")

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
      <a href={href} className="block rounded-xl focus-visible:outline-offset-4" aria-label={`Buka detail ${journal.title}`}>
        <CoverImage image={journal.cover} title={journal.title} index={index} fallbackLabel="Jurnal" showFallbackTitle={false} />
      </a>

      <div className="flex flex-1 flex-col px-2 pb-2 pt-4">
        <p className="min-h-6 text-micro-uppercase font-semibold uppercase tracking-[0.12em] text-brand-green-dark">{journal.theme?.trim() || "Tema belum dicantumkan"}</p>
        <Heading className="mt-3 line-clamp-3 text-lg font-semibold leading-snug tracking-[-0.04em] text-brand-teal-deep">
          <a href={href} className="rounded-sm transition-colors hover:text-brand-green-dark">{journal.title}</a>
        </Heading>
        {metadata ? <p className="mt-3 text-sm font-medium text-muted-foreground">{metadata}</p> : null}
        <a href={href} className="mt-auto inline-flex min-h-11 items-center gap-1.5 pt-5 text-sm font-semibold text-brand-green-dark transition-colors hover:text-brand-teal-deep focus-visible:outline-offset-2">
          Lihat detail
          <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
        </a>
      </div>
    </motion.article>
  )
}
