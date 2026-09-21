import { motion, type Variants } from "motion/react"
import { Quote } from "lucide-react"

import { Carousel } from "@/new-ui/components/ui/Carousel/Carousel"
import type { Testimony } from "@/new-ui/pages/Home/data/homeTypes"

const sectionReveal: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
}

function TestimonyCard({ testimony }: { testimony: Testimony }) {
  const initial = testimony.name.slice(0, 1).toUpperCase()

  return (
    <div className="flex h-full flex-col justify-between p-5 sm:p-6">
      <Quote className="size-7 text-primary/30" aria-hidden="true" />
      <p className="mt-4 flex-1 text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">&ldquo;{testimony.quote}&rdquo;</p>
      <div className="mt-5 flex items-center gap-3">
        <span role="img" aria-label={testimony.name} className="grid size-10 shrink-0 place-items-center rounded-full bg-brand-teal-deep text-base font-semibold text-on-dark">
          {initial}
        </span>
        <div>
          <p className="text-sm font-semibold text-brand-teal-deep">{testimony.name}</p>
          <p className="text-xs text-muted-foreground">{testimony.role}</p>
        </div>
      </div>
    </div>
  )
}

type FeaturedTestimonySectionProps = { testimonies: Testimony[] }

export function FeaturedTestimonySection({ testimonies }: FeaturedTestimonySectionProps) {
  if (testimonies.length === 0) return null

  return (
    <section id="testimoni" aria-labelledby="testimony-title" className="border-b border-border bg-background px-5 py-24 sm:px-8 sm:py-28 lg:px-12 lg:py-32">
      <div className="mx-auto max-w-content">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.45 }} variants={sectionReveal} className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-green-dark">Kata Mereka</span>
          <h2 id="testimony-title" className="mt-5 text-4xl font-semibold tracking-[-0.065em] text-brand-teal-deep sm:text-6xl">Apa Kata Penulis Kami</h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">Pengalaman nyata dari penulis dan peneliti yang telah menerbitkan karyanya bersama CV Taretan Media Publishing</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5, ease: "easeOut" }} className="mt-12">
          <Carousel
            items={testimonies.map((t) => ({ id: t.id, content: <TestimonyCard testimony={t} /> }))}
            visibleItems={{ base: 1, sm: 2, lg: 3 }}
            autoplay
            autoplayDelay={5000}
            pauseOnHover
            loop
          />
        </motion.div>
      </div>
    </section>
  )
}
