import { ArrowLeft } from "lucide-react"
import { motion } from "motion/react"
import { ManuscriptForm } from "@/new-ui/components/conversion/ManuscriptForm"
import { PrivacyNotice } from "@/new-ui/components/conversion/PrivacyNotice"
import { SubmissionShell } from "@/new-ui/components/layout/SubmissionShell"
import type { ManuscriptCreateProps, OpenExternalUrl } from "@/new-ui/types/public"

export type ManuscriptCreatePageProps = ManuscriptCreateProps & {
  openExternalUrl?: OpenExternalUrl
  trackEvent?: (event: { name: "manuscript_whatsapp_click"; payload: { publicationType: string } }) => void
}

export function ManuscriptCreatePage({ openExternalUrl, trackEvent, ...props }: ManuscriptCreatePageProps) {
  const handleValidWhatsAppClick = (publicationType: string) => {
    try {
      trackEvent?.({ name: "manuscript_whatsapp_click", payload: { publicationType } })
    } catch {
      // Analytics must never prevent the user from continuing to WhatsApp.
    }
  }

  return (
    <SubmissionShell brandName={props.site.name}>
      <div className="manuscript-page">
      <motion.div
        className="mx-auto max-w-content px-5 pb-12 sm:px-8 sm:pb-16 lg:px-12 lg:pb-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.45, ease: "easeOut", delay: 0.12 }}
      >
        <motion.a
          href="/"
          whileHover={{ x: -4 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          className="mb-8 inline-flex min-h-11 items-center gap-2 rounded-full border border-brand-green-dark px-4 py-2 text-sm font-semibold text-brand-green-dark transition-colors hover:bg-surface-feature hover:text-brand-teal-deep focus-visible:outline-offset-4 sm:px-5"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Kembali ke beranda
        </motion.a>

        <div className="manuscript-layout grid items-start gap-6 lg:grid-cols-[minmax(240px,0.38fr)_minmax(0,0.62fr)] lg:gap-8">
          <div className="lg:sticky lg:top-8">
            <PrivacyNotice text={props.privacyNotice.text} />
          </div>
          <ManuscriptForm
            publicationTypes={props.publicationTypes}
            whatsapp={props.whatsapp}
            alternativeContact={props.alternativeContact}
            openExternalUrl={openExternalUrl}
            onValidWhatsAppClick={handleValidWhatsAppClick}
          />
        </div>
      </motion.div>
      </div>
    </SubmissionShell>
  )
}
