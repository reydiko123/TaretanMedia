import { ArrowRight } from "lucide-react"
import { motion, useReducedMotion } from "motion/react"
import { Link } from "@inertiajs/react"

export function ServicesCta() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section className="bg-background pt-8 sm:pt-12 lg:pt-16" aria-labelledby="services-cta-heading">
      <div className="mx-auto max-w-content px-5 pb-16 sm:px-8 sm:pb-20 lg:px-12 lg:pb-24">
        <div className="relative overflow-hidden rounded-2xl bg-brand-teal-deep p-7 shadow-card sm:p-10 lg:flex lg:items-end lg:justify-between lg:gap-12 lg:p-14">
          <span aria-hidden="true" className="absolute -right-16 -top-20 size-56 rounded-full border-[30px] border-brand-green/15" />
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="relative max-w-2xl"
          >
            <p className="text-micro-uppercase font-semibold uppercase text-brand-green">Langkah berikutnya</p>
            <h2 id="services-cta-heading" className="mt-4 text-heading-2 font-semibold tracking-[-0.04em] text-on-dark">Mari bicarakan kebutuhan karya Anda</h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-on-dark-muted">Ceritakan konteks karya Anda dan temukan langkah yang paling sesuai untuk memulainya.</p>
          </motion.div>

          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, x: 18 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.08, ease: "easeOut" }}
            className="relative mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row lg:mt-0 lg:shrink-0"
          >
            <motion.div whileHover={shouldReduceMotion ? undefined : { y: -2 }} whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}>
              <Link href="/kirim-naskah" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-brand-green px-5 text-sm font-semibold text-on-primary transition-colors hover:bg-primary-deep">
                Kirim Naskah
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            </motion.div>
            <motion.div whileHover={shouldReduceMotion ? undefined : { y: -2 }} whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}>
              <Link href="/kontak" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-hairline-dark px-5 text-sm font-semibold text-on-dark transition-colors hover:border-brand-green hover:text-brand-green">
                Hubungi Kami
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
