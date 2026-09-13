import {
  BookOpenCheck,
  Lightbulb,
  Newspaper,
  PencilRuler,
  PenLine,
  type LucideIcon,
} from "lucide-react"
import { motion, type Variants } from "motion/react"

import { Spotlight } from "@/new-ui/pages/Home/components/motion-primitives/spotlight"

export type ServiceHighlight = {
  id: number
  slug: string
  title: string
  description: string
  ctaLabel?: string | null
}

const serviceIcons: Record<string, LucideIcon> = {
  "penerbitan-buku": BookOpenCheck,
  "publikasi-jurnal": Newspaper,
  "editing-proofreading": PenLine,
  "layout-desain-cover": PencilRuler,
  "konsultasi-publikasi": Lightbulb,
}

const sectionReveal: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
}

const cardsReveal: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { delayChildren: 0.08, staggerChildren: 0.1 },
  },
}

const cardReveal: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
}

function FeatureHighlightCard({ service }: { service: ServiceHighlight }) {
  const Icon = serviceIcons[service.slug] ?? Lightbulb

  return (
    <motion.article
      variants={cardReveal}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      className="group h-full"
    >
      <div className="relative h-full min-h-[18rem] overflow-hidden rounded-[1.65rem] border-2 border-border bg-border p-px shadow-subtle transition-shadow group-hover:shadow-card">
        <Spotlight
          size={124}
          springOptions={{ bounce: 0, stiffness: 180, damping: 24 }}
          className="from-primary via-primary to-primary blur-3xl"
        />

        <div className="relative z-10 flex h-full flex-col rounded-[calc(1.65rem-1px)] bg-background p-6 sm:p-7">
          <div className="grid size-12 place-items-center rounded-2xl bg-accent text-brand-teal-deep ring-1 ring-border">
            <Icon className="size-5" aria-hidden="true" />
          </div>

          <h3 className="mt-8 text-2xl font-semibold tracking-[-0.05em] text-brand-teal-deep">{service.title}</h3>
          <p className="mt-3 max-w-sm text-sm leading-7 text-muted-foreground">{service.description}</p>
        </div>
      </div>
    </motion.article>
  )
}

type FeatureHighlightsSectionProps = {
  services: ServiceHighlight[]
}

export function FeatureHighlightsSection({ services }: FeatureHighlightsSectionProps) {
  return (
    <section id="layanan" aria-labelledby="feature-highlights-title" className="border-b border-border bg-background px-5 py-24 sm:px-8 sm:py-28 lg:px-12 lg:py-32">
      <div className="mx-auto max-w-content">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.45 }}
          variants={sectionReveal}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 id="feature-highlights-title" className="text-4xl font-semibold tracking-[-0.065em] text-brand-teal-deep sm:text-6xl">
            Layanan Penerbitan
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
            Diskusikan kebutuhan penerbitan anda bersama Taretan Media dan temukan dukungan yang sesuai untuk karya anda
          </p>
        </motion.div>

        {services.length > 0 ? (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={cardsReveal}
            className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5"
          >
            {services.map((service) => (
              <FeatureHighlightCard key={service.slug} service={service} />
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.35 }}
            variants={sectionReveal}
            role="status"
            className="mt-12 rounded-[1.65rem] border border-dashed border-border bg-surface px-6 py-12 text-center sm:px-10"
          >
            <p className="text-lg font-semibold tracking-[-0.03em] text-brand-teal-deep">Informasi layanan akan segera diperbarui.</p>
          </motion.div>
        )}
      </div>
    </section>
  )
}
