import { MessageCircle } from "lucide-react"
import { motion } from "motion/react"

type WhatsAppButtonProps = {
  href: string | null
  bookTitle: string
  onIntent?: () => void
}

const buttonClassName = "inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-brand-green-dark px-6 text-sm font-semibold text-on-dark shadow-card transition-colors hover:bg-brand-teal-deep focus-visible:outline-offset-4"

export function WhatsAppButton({ href, bookTitle, onIntent }: WhatsAppButtonProps) {
  if (href) {
    return (
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onIntent}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.18, ease: "easeOut" }}
        className={buttonClassName}
        aria-label={`Pesan buku ${bookTitle} via WhatsApp`}
      >
        <MessageCircle className="size-4" aria-hidden="true" />
        Pesan via WhatsApp
      </motion.a>
    )
  }

  return (
    <div className="flex flex-col items-start gap-2">
      <button type="button" disabled aria-disabled="true" className={`${buttonClassName} cursor-not-allowed opacity-55`}>
        <MessageCircle className="size-4" aria-hidden="true" />
        Pesan via WhatsApp
      </button>
      <p className="max-w-md text-xs leading-5 text-muted-foreground">
        Pemesanan via WhatsApp belum tersedia. Silakan gunakan informasi kontak lain di bagian bawah halaman.
      </p>
    </div>
  )
}
