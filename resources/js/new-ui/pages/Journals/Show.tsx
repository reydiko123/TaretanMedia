import { ArrowLeft } from "lucide-react"
import { motion } from "motion/react"
import { BlurFade } from "@/new-ui/components/magicui/BlurFade"
import { Breadcrumbs } from "@/new-ui/components/navigation/Breadcrumbs"
import { CoverImage } from "@/new-ui/components/publication/CoverImage"
import { JournalAccessPanel } from "@/new-ui/components/publication/JournalAccessPanel"
import { JournalMeta } from "@/new-ui/components/publication/JournalMeta"
import { getSecureExternalUrl, toJournalDetailViewModel } from "@/new-ui/lib/journalDetail"
import { getJournalCatalogReturnUrl } from "@/new-ui/lib/journalCatalogReturnUrl"
import type { TrackEvent } from "@/new-ui/types/analytics"
import type { JournalShowProps } from "@/new-ui/types/journal"
import "@/new-ui/styles/journal-detail.css"

export type JournalsShowPageProps = JournalShowProps & { trackEvent?: TrackEvent }

export function JournalsShowPage({ journal, contact, trackEvent }: JournalsShowPageProps) {
  const viewModel = toJournalDetailViewModel(journal)
  const catalogReturnUrl = getJournalCatalogReturnUrl()
  const title = viewModel.title || "Detail jurnal"
  const hasContactAlternative = [contact.whatsappNumber, contact.email, contact.instagramUrl, contact.mapUrl].some((value) => Boolean(value?.trim()))
  const externalUrl = getSecureExternalUrl(viewModel.externalUrl)
  const handleExternalClick = () => {
    try {
      trackEvent?.({ name: "journal_external_click", payload: { journalSlug: journal.slug } })
    } catch {
      // Analytics is optional and must never interrupt native link navigation.
    }
  }

  return (
    <div className="journal-detail-page">
      <section className="journal-detail-hero border-b border-border bg-surface-soft">
        <div className="mx-auto max-w-content px-5 py-10 sm:px-8 sm:py-14 lg:px-12 lg:py-16">
          <BlurFade>
            <Breadcrumbs items={[{ label: "Beranda", href: "/" }, { label: "Jurnal", href: catalogReturnUrl }]} currentLabel={title} />
          </BlurFade>

          <BlurFade delay={0.05}>
            <motion.a
              href={catalogReturnUrl}
              whileHover={{ x: -4 }}
              whileTap={{ scale: 0.98 }}
              className="journal-detail-back-link"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
              Kembali ke katalog jurnal
            </motion.a>
          </BlurFade>

          <article aria-labelledby="journal-title" className="mt-10 lg:mt-14">
            <div className="journal-detail-layout">
              <BlurFade className="mx-auto w-full max-w-[280px] lg:max-w-[360px]" delay={0.08}>
                <CoverImage image={journal.cover} title={title} loading="eager" fallbackLabel="Sampul jurnal belum tersedia" className="journal-detail-cover shadow-card" />
              </BlurFade>

              <BlurFade className="min-w-0" delay={0.14}>
                <h1 id="journal-title" className="mt-0 max-w-3xl break-words text-heading-1 font-semibold leading-[1.05] tracking-[-0.065em] text-brand-teal-deep">{title}</h1>
                <JournalMeta theme={viewModel.theme} editionLabel={viewModel.editionLabel} publicationYear={viewModel.publicationYear} categories={viewModel.categories} />

                <section aria-labelledby="journal-description-title" className="journal-detail-description">
                  <h2 id="journal-description-title">Tentang jurnal</h2>
                  <p>{viewModel.description ?? "Deskripsi jurnal belum tersedia."}</p>
                </section>

                <JournalAccessPanel
                  externalUrl={externalUrl}
                  hasContactAlternative={hasContactAlternative}
                  onExternalClick={handleExternalClick}
                  catalogHref={catalogReturnUrl}
                />
              </BlurFade>
            </div>
          </article>
        </div>
      </section>
    </div>
  )
}
