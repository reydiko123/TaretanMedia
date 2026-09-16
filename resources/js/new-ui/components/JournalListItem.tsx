import { ArrowUpRight } from "lucide-react"
import { motion } from "motion/react"
import type { KeyboardEvent, MouseEvent } from "react"
import { Link, router } from "@inertiajs/react"
import { AnimatedListItem } from "@/new-ui/components/ui/animated-list"
import { CoverImage } from "@/new-ui/components/publication/CoverImage"
import { journalDetailHref } from "@/new-ui/lib/routes"
import type { JournalCard as JournalCardData } from "@/new-ui/types/public"

type JournalListItemProps = {
  journal: JournalCardData
  index?: number
}

export function JournalListItem({ journal, index = 0 }: JournalListItemProps) {
  const href = journalDetailHref(journal.slug)
  const metadata = [journal.editionLabel?.trim(), journal.publicationYear ? String(journal.publicationYear) : null].filter(Boolean).join(" \u00b7 ")
  const itemClassName = "journal-list-item group grid grid-cols-[auto_minmax(0,1fr)_auto] gap-3 rounded-xl px-1 py-6 transition-colors hover:bg-surface sm:gap-5 sm:px-2 sm:py-8"
  const isCompactViewport = () => typeof window !== "undefined" && window.matchMedia?.("(max-width: 767.98px)").matches
  const navigateToDetail = () => router.visit(href)
  const handleSurfaceClick = (event: MouseEvent<HTMLDivElement>) => {
    if (!isCompactViewport() || (event.target instanceof Element && event.target.closest("a"))) return
    navigateToDetail()
  }
  const handleSurfaceKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!isCompactViewport() || event.target !== event.currentTarget || !["Enter", " "].includes(event.key)) return
    event.preventDefault()
    navigateToDetail()
  }
  const content = (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.38, delay: Math.min(index * 0.06, 0.3), ease: "easeOut" }}
      whileHover={{ x: 4 }}
      className={`${itemClassName} cursor-pointer md:cursor-default`}
      role="link"
      tabIndex={0}
      aria-label={`Buka detail ${journal.title}`}
      onClick={handleSurfaceClick}
      onKeyDown={handleSurfaceKeyDown}
      data-testid="journal-list-surface"
    >
      <Link href={href} className="block w-20 shrink-0 rounded-xl focus-visible:outline-offset-4 sm:w-28 lg:w-32" aria-label={`Buka detail ${journal.title}`}>
        <CoverImage image={journal.cover} title={journal.title} index={index} fallbackLabel="Jurnal" showFallbackTitle={false} className="rounded-xl" />
      </Link>

      <div className="flex min-w-0 flex-col justify-center py-1">
        <p className="text-micro-uppercase font-semibold uppercase tracking-[0.12em] text-brand-green-dark">{journal.theme?.trim() || "Tema belum dicantumkan"}</p>
        <h2 className="mt-2 max-w-3xl text-xl font-semibold leading-tight tracking-[-0.04em] text-brand-teal-deep sm:text-2xl">
          <Link href={href} className="rounded-sm transition-colors hover:text-brand-green-dark">{journal.title}</Link>
        </h2>
        {metadata ? <p className="mt-3 text-sm font-medium text-muted-foreground">{metadata}</p> : null}
      </div>

      <div className="hidden items-center justify-end pl-1 md:flex md:pl-3" data-testid="journal-list-action-wrapper">
        <Link href={href} className="journal-list-action mr-2 inline-flex min-h-11 items-center gap-1 rounded-full border border-brand-green-dark/25 px-3 text-xs font-semibold text-brand-green-dark transition-colors hover:bg-surface-feature hover:text-brand-teal-deep focus-visible:outline-offset-2 sm:mr-4 sm:gap-1.5 sm:px-4 sm:text-sm">
          <span className="whitespace-nowrap">Lihat detail</span>
          <ArrowUpRight className="size-4 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
        </Link>
      </div>
    </motion.div>
  )

  return <AnimatedListItem as="li" className="border-b border-border/70 last:border-b-0">{content}</AnimatedListItem>
}
