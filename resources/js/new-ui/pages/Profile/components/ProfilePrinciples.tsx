import { motion } from "motion/react"
import { Check } from "lucide-react"

import { BlurFade } from "@/new-ui/components/magicui/BlurFade"
import type { ProfileValue } from "@/new-ui/pages/Profile/profileTypes"

type ProfilePrinciplesProps = {
  values: ProfileValue[]
}

export function ProfilePrinciples({ values }: ProfilePrinciplesProps) {
  if (values.length === 0) return null

  return (
    <section className="bg-background" aria-labelledby="profile-values-heading">
          <div className="mx-auto max-w-content px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
            <BlurFade>
              <div className="max-w-2xl">
                <h2 id="profile-values-heading" className="text-heading-2 font-semibold tracking-[-0.04em] text-brand-teal-deep">Prinsip yang Kami Pegang</h2>
              </div>
            </BlurFade>

            <ul aria-labelledby="profile-values-heading" className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {values.map((value, index) => (
                <motion.li
                  key={`${index}-${value.title}`}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.18 }}
                  transition={{ duration: 0.42, delay: index * 0.07, ease: "easeOut" }}
                  className="h-full"
                >
                  <article className="h-full rounded-xl border border-border bg-card p-6 shadow-subtle transition-transform transition-shadow duration-200 hover:-translate-y-1 hover:shadow-card">
                    <span aria-hidden="true" className="flex size-10 items-center justify-center rounded-full bg-surface-feature text-brand-green-dark">
                      <Check className="size-5" strokeWidth={2.2} />
                    </span>
                    <h3 className="mt-6 text-heading-5 font-semibold text-brand-teal-deep">{value.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">{value.description}</p>
                  </article>
                </motion.li>
              ))}
            </ul>
          </div>
        </section>
  )
}
