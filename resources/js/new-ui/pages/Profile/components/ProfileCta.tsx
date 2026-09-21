import { ArrowRight } from "lucide-react"
import { motion } from "motion/react"
import { Link } from "@inertiajs/react"

import { BlurFade } from "@/new-ui/components/magicui/BlurFade"

export function ProfileCta() {
  return (
    <section className="bg-background pt-8 sm:pt-12 lg:pt-16" aria-labelledby="profile-cta-heading">
      <div className="mx-auto max-w-content px-5 pb-16 sm:px-8 sm:pb-20 lg:px-12 lg:pb-24">
        <div className="relative overflow-hidden rounded-2xl bg-brand-teal-deep p-7 shadow-card sm:p-10 lg:flex lg:items-end lg:justify-between lg:gap-12 lg:p-14">
          <span aria-hidden="true" className="absolute -right-16 -top-20 size-56 rounded-full border-[30px] border-brand-green/15" />
          <BlurFade>
            <div className="relative max-w-2xl">
              <p className="text-micro-uppercase font-semibold uppercase text-brand-green">Langkah berikutnya</p>
              <h2 id="profile-cta-heading" className="mt-4 text-heading-2 font-semibold tracking-[-0.04em] text-on-dark">Mulai Terbitkan Karya Anda</h2>
              <p className="mt-4 max-w-xl text-base leading-7 text-on-dark-muted">Bawa gagasan Anda menuju terbitan yang profesional bersama CV Taretan Media Publishing.</p>
            </div>
          </BlurFade>

          <motion.div
            initial={{ opacity: 0, x: 18 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="relative mt-8 flex w-full sm:w-auto lg:mt-0 lg:shrink-0"
          >
            <Link href="/kirim-naskah" className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-brand-green px-5 text-sm font-semibold text-on-primary transition-colors hover:bg-primary-deep sm:w-auto">
              Mulai Terbitkan Karya Anda
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
