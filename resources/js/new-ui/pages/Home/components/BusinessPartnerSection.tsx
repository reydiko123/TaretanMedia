import { motion, type Variants } from "motion/react"

import type { BusinessPartner } from "@/new-ui/pages/Home/data/homeTypes"

const sectionReveal: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
}

const gridReveal: Variants = {
  hidden: { opacity: 1 },
  visible: { opacity: 1, transition: { delayChildren: 0.08, staggerChildren: 0.1 } },
}

const logoReveal: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
}

type BusinessPartnerSectionProps = { partners: BusinessPartner[] }

export function BusinessPartnerSection({ partners }: BusinessPartnerSectionProps) {
  if (partners.length === 0) return null

  return (
    <section id="mitra" aria-labelledby="business-partner-title" className="border-b border-border bg-surface px-5 py-24 sm:px-8 sm:py-28 lg:px-12 lg:py-32">
      <div className="mx-auto max-w-content">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.45 }} variants={sectionReveal} className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-green-dark">Kemitraan</span>
          <h2 id="business-partner-title" className="mt-5 text-4xl font-semibold tracking-[-0.065em] text-brand-teal-deep sm:text-6xl">Mitra Bisnis Kami</h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">Dipercaya oleh institusi pendidikan untuk mendukung publikasi karya ilmiah</p>
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={gridReveal} className="mx-auto mt-12 grid max-w-3xl grid-cols-2 items-center gap-8 sm:grid-cols-3 sm:gap-10">
          {partners.map((partner) => (
            <motion.div key={partner.name} variants={logoReveal} className="flex flex-col items-center gap-3">
              <img src={partner.logo.src} alt={partner.logo.alt} loading="lazy" className="h-20 w-auto object-contain grayscale transition-all duration-300 hover:grayscale-0 sm:h-24" />
              <p className="text-center text-xs font-medium text-muted-foreground sm:text-sm">{partner.name}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
