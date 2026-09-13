import { ArrowRight, BookOpen, CalendarDays } from "lucide-react"
import { motion, type Variants } from "motion/react"

import type { FeaturedJournal } from "@/new-ui/pages/Home/data/homeTypes"

const sectionReveal: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
}

const cardReveal: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
}

const journalTones = [
  "bg-brand-teal-deep text-on-dark",
  "bg-accent-purple text-on-dark",
  "bg-accent-orange text-brand-teal-deep",
  "bg-primary text-primary-foreground",
]

function JournalCover({ journal, index }: { journal: FeaturedJournal; index: number }) {
  return (
    <div className={`relative aspect-[1.45/1] overflow-hidden rounded-[1.35rem] p-5 ${journalTones[index % journalTones.length]}`}>
      <div className="absolute -right-8 -top-10 size-32 rounded-full border border-current/20" />
      <div className="absolute -bottom-16 -left-10 size-40 rounded-full border border-current/20" />
      <div className="relative flex h-full flex-col justify-between">
        <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.18em] opacity-80">
          <span>Taretan Media</span>
          <BookOpen className="size-4" aria-hidden="true" />
        </div>
        <p className="max-w-[15rem] text-2xl font-semibold leading-[0.98] tracking-[-0.06em]">{journal.title}</p>
        <span className="text-[10px] font-medium uppercase tracking-[0.16em] opacity-80">Publikasi ilmiah</span>
      </div>
    </div>
  )
}

function FeaturedJournalCard({ journal, index }: { journal: FeaturedJournal; index: number }) {
  return (
    <motion.article variants={cardReveal} whileHover={{ y: -6 }} transition={{ duration: 0.22, ease: "easeOut" }} className="group h-[28rem] w-[min(82vw,21rem)] shrink-0 lg:h-[30rem] lg:w-auto">
      <div className="flex h-full flex-col overflow-hidden rounded-[1.65rem] border border-border bg-background p-3 shadow-subtle transition-shadow group-hover:shadow-card">
        <JournalCover journal={journal} index={index} />
        <div className="flex flex-1 flex-col px-2 pb-2 pt-5">
          <div className="flex items-center justify-between gap-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            <span className="truncate">{journal.editionLabel ?? "Edisi jurnal"}</span>
            <span className="inline-flex shrink-0 items-center gap-1"><CalendarDays className="size-3" aria-hidden="true" />{journal.publicationYear}</span>
          </div>
          <h3 className="mt-3 min-h-[4.5rem] line-clamp-2 overflow-hidden text-xl font-semibold leading-tight tracking-[-0.045em] text-brand-teal-deep">
            <a href={`/jurnal/${journal.slug}`} className="rounded-sm outline-none transition-colors hover:text-brand-green-dark">{journal.title}</a>
          </h3>
          <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted-foreground">{journal.theme}</p>
          <a href={`/jurnal/${journal.slug}`} className="mt-auto inline-flex min-h-11 items-center gap-2 pt-5 text-sm font-semibold text-brand-green-dark transition-colors hover:text-brand-teal-deep">
            Lihat detail jurnal <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </a>
        </div>
      </div>
    </motion.article>
  )
}

type FeaturedJournalsSectionProps = { journals: FeaturedJournal[] }

export function FeaturedJournalsSection({ journals }: FeaturedJournalsSectionProps) {
  const visibleJournals = journals.slice(0, 4)

  return (
    <section id="jurnal-unggulan" aria-labelledby="featured-journals-title" className="border-b border-border bg-background px-5 py-24 sm:px-8 sm:py-28 lg:px-12 lg:py-32">
      <div className="mx-auto max-w-content">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.45 }} variants={sectionReveal} className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center rounded-full bg-accent px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-brand-teal-deep ring-1 ring-border">Publikasi Ilmiah</span>
          <h2 id="featured-journals-title" className="mt-6 text-4xl font-semibold tracking-[-0.065em] text-brand-teal-deep sm:text-6xl">Jurnal Unggulan</h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">Temukan publikasi ilmiah pilihan di berbagai bidang studi</p>
        </motion.div>

        {visibleJournals.length > 0 ? (
          <>
            <div className="-mx-5 mt-12 overflow-x-auto px-5 pb-3 sm:-mx-8 sm:px-8 lg:mx-0 lg:overflow-visible lg:px-0 lg:pb-0">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={{ hidden: { opacity: 1 }, visible: { opacity: 1, transition: { delayChildren: 0.08, staggerChildren: 0.1 } } }} className="flex w-max gap-5 lg:grid lg:w-full lg:grid-cols-4">
                {visibleJournals.map((journal, index) => <FeaturedJournalCard key={journal.slug} journal={journal} index={index} />)}
                <motion.div variants={cardReveal} className="flex w-[min(82vw,21rem)] shrink-0 items-center justify-center lg:hidden">
                  <a href="/jurnal" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-subtle transition-colors hover:bg-primary-deep">Lihat semua jurnal <ArrowRight className="size-4" aria-hidden="true" /></a>
                </motion.div>
              </motion.div>
            </div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.4 }} variants={sectionReveal} className="mt-10 hidden justify-center lg:flex">
              <a href="/jurnal" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-subtle transition-colors hover:bg-primary-deep">Lihat semua jurnal <ArrowRight className="size-4" aria-hidden="true" /></a>
            </motion.div>
          </>
        ) : (
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.35 }} variants={sectionReveal} className="mt-12 rounded-[1.65rem] border border-dashed border-border bg-surface px-6 py-12 text-center sm:px-10">
            <p className="text-lg font-semibold tracking-[-0.03em] text-brand-teal-deep">Belum ada jurnal unggulan untuk ditampilkan.</p>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">Publikasi ilmiah akan ditampilkan di sini setelah tersedia.</p>
          </motion.div>
        )}
      </div>
    </section>
  )
}
