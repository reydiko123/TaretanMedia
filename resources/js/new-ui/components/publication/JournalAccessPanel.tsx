import { motion } from "motion/react"
import { Link } from "@inertiajs/react"
import { ExternalLink } from "@/new-ui/components/conversion/ExternalLink"

type JournalAccessPanelProps = {
  externalUrl: string | null
  hasContactAlternative: boolean
  onExternalClick?: () => void
  catalogHref?: string
}

export function JournalAccessPanel({ externalUrl, hasContactAlternative, onExternalClick, catalogHref = "/jurnal" }: JournalAccessPanelProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.42, ease: "easeOut" }}
      aria-labelledby="journal-access-title"
      className={`journal-detail-access ${externalUrl ? "journal-detail-access--available" : "journal-detail-access--unavailable"}`}
    >
      <h2 id="journal-access-title">Akses jurnal</h2>
      {externalUrl ? (
        <>
          <ExternalLink
            href={externalUrl}
            accessibleLabel="Kunjungi Halaman Jurnal (buka di tab baru)"
            onActivate={onExternalClick}
            className="journal-detail-external-link"
          >
            Kunjungi Halaman Jurnal
          </ExternalLink>
        </>
      ) : (
        <>
          <p className="font-semibold text-brand-teal-deep">Tautan jurnal belum tersedia</p>
          <p>Silakan kembali lagi nanti atau hubungi CV Taretan Media Publishing untuk informasi lebih lanjut.</p>
          {hasContactAlternative ? (
            <Link href="/kontak" className="journal-detail-recovery-link">Lihat informasi kontak</Link>
          ) : (
            <Link href={catalogHref} className="journal-detail-recovery-link">Kembali ke katalog jurnal</Link>
          )}
        </>
      )}
    </motion.section>
  )
}
