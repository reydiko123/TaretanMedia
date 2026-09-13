import { Info } from "lucide-react"
import { motion, useReducedMotion } from "motion/react"

export function ContactExternalNotice() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.aside
      aria-label="Informasi kanal eksternal"
      initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.35, ease: "easeOut" }}
      className="rounded-xl border border-border bg-surface-soft px-5 py-4"
    >
      <div className="flex items-start gap-3">
        <Info aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-brand-green-dark" />
        <p className="text-sm leading-6 text-muted-foreground">Saat memilih kanal, Anda akan melanjutkan komunikasi melalui layanan pihak ketiga.</p>
      </div>
    </motion.aside>
  )
}
