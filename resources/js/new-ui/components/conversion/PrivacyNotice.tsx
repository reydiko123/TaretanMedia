import { ShieldCheck } from "lucide-react"
import { motion } from "motion/react"

type PrivacyNoticeProps = {
  text: string
}

export function PrivacyNotice({ text }: PrivacyNoticeProps) {
  return (
    <motion.aside
      aria-labelledby="privacy-title"
      className="manuscript-privacy-panel rounded-2xl border border-brand-green-dark/15 bg-surface-feature p-5 sm:p-6"
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      <div className="flex gap-3">
        <ShieldCheck className="mt-0.5 size-5 shrink-0 text-brand-green-dark" aria-hidden="true" />
        <div className="min-w-0">
          <h2 id="privacy-title" className="text-heading-5 font-semibold text-brand-teal-deep">Privasi Data Anda</h2>
          <p className="mt-3 max-w-prose text-sm leading-6 text-brand-teal-deep/80">{text}</p>
        </div>
      </div>
    </motion.aside>
  )
}
