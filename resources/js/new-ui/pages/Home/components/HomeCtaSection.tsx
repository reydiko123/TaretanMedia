import { ArrowUpRight } from "lucide-react"
import { motion, type Variants } from "motion/react"

const sectionReveal: Variants = {
  hidden: { opacity: 0, y: 18, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: "easeOut" } },
}

type HomeCtaSectionProps = {
  manuscriptLabel: string
  manuscriptHref: string
}

export function HomeCtaSection({ manuscriptLabel, manuscriptHref }: HomeCtaSectionProps) {
  if (!manuscriptHref) return null

  return (
    <section id="cta-kirim-naskah" aria-labelledby="home-cta-title" className="border-b border-border bg-background px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.4 }} variants={sectionReveal} className="relative mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-brand-teal-deep bg-brand-teal-deep px-6 py-14 text-center shadow-card sm:px-10 lg:px-16">
        <div aria-hidden="true" className="absolute -right-20 -top-24 size-72 rounded-full border border-primary/30" />
        <div aria-hidden="true" className="absolute -bottom-36 -left-24 size-96 rounded-full border border-primary/20" />
        <div className="relative z-10 mx-auto max-w-3xl">
          <h2 id="home-cta-title" className="mt-6 text-3xl font-semibold tracking-[-0.06em] text-on-dark sm:text-5xl">Punya naskah yang ingin dibicarakan?</h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-on-dark-muted sm:text-lg">Jangan biarkan gagasan Anda berhenti sebagai naskah. Mari bersama Taretan Media menjadikannya karya yang dapat dibaca, dibagikan, dan memberikan manfaat.</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href={manuscriptHref} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-subtle transition-colors hover:bg-primary-deep">{manuscriptLabel || "Kirim Naskah"} <ArrowUpRight className="size-4" aria-hidden="true" /></a>
            <a href="/kontak" className="inline-flex min-h-11 items-center justify-center rounded-full border border-on-dark/30 px-5 text-sm font-semibold text-on-dark transition-colors hover:bg-on-dark/10">Hubungi Taretan Media</a>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
