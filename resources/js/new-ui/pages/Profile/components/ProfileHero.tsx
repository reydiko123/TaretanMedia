import { motion } from "motion/react"

import taretanLogo from "@/new-ui/assets/taretan-media.svg"
import { BlurFade } from "@/new-ui/components/magicui/BlurFade"

type ProfileHeroProps = {
  title: string
  description?: string
}

export function ProfileHero({ title, description }: ProfileHeroProps) {
  return (
    <section className="relative isolate overflow-hidden bg-brand-teal-deep text-on-dark" aria-labelledby="profile-hero-heading">
      <div aria-hidden="true" className="absolute -left-24 -top-28 size-72 rounded-full border-[36px] border-brand-green/15" />
      <div aria-hidden="true" className="absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(circle_at_70%_30%,rgba(184,220,104,0.18),transparent_42%)]" />

      <div className="relative mx-auto grid max-w-content gap-12 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[minmax(0,1.1fr)_minmax(20rem,0.9fr)] lg:items-center lg:gap-16 lg:px-12 lg:py-28">
        <BlurFade>
          <div className="max-w-2xl">
            <h1 id="profile-hero-heading" className="text-heading-1 font-semibold tracking-[-0.05em] text-on-dark">{title}</h1>
            {description ? <p className="mt-6 max-w-xl text-lg leading-8 text-on-dark-muted">{description}</p> : null}
          </div>
        </BlurFade>

        <motion.div
          initial={{ opacity: 0, x: 24, rotate: 1.5 }}
          whileInView={{ opacity: 1, x: 0, rotate: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, delay: 0.1, ease: "easeOut" }}
          className="relative mx-auto w-full max-w-md lg:justify-self-end"
        >
          <div className="relative overflow-hidden rounded-2xl border border-on-dark/20 bg-on-dark/[0.06] p-6 shadow-2xl backdrop-blur-sm sm:p-8">
            <div aria-hidden="true" className="absolute -right-10 -top-12 size-40 rounded-full border-[24px] border-brand-green/20" />
            <div className="relative flex min-h-72 flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-4">
                  <img src={taretanLogo} alt="" aria-hidden="true" className="size-14 rounded-xl bg-background/90 p-2 object-contain shadow-subtle" />
                  <p className="text-micro-uppercase font-semibold uppercase tracking-[0.18em] text-brand-green">CV Taretan Media Publishing</p>
                </div>
                <p className="mt-7 max-w-xs text-3xl font-semibold leading-tight tracking-[-0.04em] text-on-dark">Penerbit Buku &amp; Publikasi Ilmiah</p>
              </div>

              <div>
                <div aria-hidden="true" className="grid grid-cols-5 gap-2">
                  {["w-8", "w-14", "w-20", "w-10", "w-16"].map((width, index) => (
                    <span key={index} className={`h-1.5 rounded-full bg-brand-green/80 ${width}`} />
                  ))}
                </div>
                <p className="mt-5 text-sm font-medium text-on-dark-muted">Mengabadikan pengetahuan bersama penulis.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
