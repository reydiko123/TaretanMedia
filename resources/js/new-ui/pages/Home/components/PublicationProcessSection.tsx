import { motion, type Variants } from "motion/react"

import type { PublicationStep } from "@/new-ui/pages/Home/data/homeTypes"

const sectionReveal: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
}

const stepReveal: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
}

type PublicationProcessSectionProps = { steps: PublicationStep[]; contactHref?: string }

export function PublicationProcessSection({ steps, contactHref = "/kontak" }: PublicationProcessSectionProps) {
  const orderedSteps = [...steps].sort((a, b) => a.order - b.order)

  return (
    <section id="proses-penerbitan" aria-labelledby="publication-process-title" className="border-b border-border bg-surface px-5 py-24 sm:px-8 sm:py-28 lg:px-12 lg:py-32">
      <div className="mx-auto max-w-content">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.45 }} variants={sectionReveal} className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center rounded-full bg-background px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-brand-teal-deep ring-1 ring-border">Alur penerbitan</span>
          <h2 id="publication-process-title" className="mt-6 text-4xl font-semibold tracking-[-0.065em] text-brand-teal-deep sm:text-6xl">Bagaimana Proses Penerbitan Berlangsung?</h2>
        </motion.div>

        {orderedSteps.length > 0 ? (
          <div className="relative mt-14">
            <div aria-hidden="true" className="pointer-events-none absolute bottom-7 left-12 top-7 w-px bg-border sm:bottom-auto sm:left-[10%] sm:right-[10%] sm:top-7 sm:h-px sm:w-auto" />
            <motion.ol initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={{ hidden: { opacity: 1 }, visible: { opacity: 1, transition: { delayChildren: 0.1, staggerChildren: 0.1 } } }} className="relative grid gap-8 sm:grid-cols-5 sm:gap-0">
            {orderedSteps.map((step) => (
              <motion.li key={step.id} variants={stepReveal} className="relative z-10 flex gap-4 rounded-2xl border border-border bg-background p-5 sm:block sm:rounded-none sm:border-0 sm:bg-transparent sm:p-0 sm:text-center">
                <div className="relative z-10 grid size-14 shrink-0 place-items-center rounded-full border-2 border-primary bg-background text-lg font-semibold text-brand-teal-deep shadow-subtle sm:mx-auto">
                  <span className="sr-only">Langkah </span>{step.order}
                </div>
                <div className="relative z-10 pt-1 sm:pt-6">
                  <h3 className="text-lg font-semibold tracking-[-0.035em] text-brand-teal-deep">{step.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{step.description}</p>
                </div>
              </motion.li>
            ))}
            </motion.ol>
          </div>
        ) : (
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.35 }} variants={sectionReveal} className="mx-auto mt-12 max-w-2xl rounded-[1.65rem] border border-dashed border-border bg-background px-6 py-12 text-center">
            <p className="text-lg font-semibold tracking-[-0.03em] text-brand-teal-deep">Informasi proses penerbitan sedang disiapkan.</p>
            <a href={contactHref} className="mt-5 inline-flex min-h-11 items-center justify-center rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-subtle transition-colors hover:bg-primary-deep">Hubungi Taretan Media</a>
          </motion.div>
        )}
      </div>
    </section>
  )
}
