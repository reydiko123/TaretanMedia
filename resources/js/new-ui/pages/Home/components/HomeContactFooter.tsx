import { Mail, MessageCircle } from "lucide-react"
import { motion, type Variants } from "motion/react"
import { Link } from "@inertiajs/react"

import taretanLogo from "@/new-ui/assets/taretan-media.svg"
import { buildWhatsAppUrl } from "@/new-ui/lib/whatsapp"
import type { HomeContact } from "@/new-ui/pages/Home/data/homeTypes"

const footerReveal: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
}

type HomeContactFooterProps = { contact: HomeContact }

export function HomeContactFooter({ contact }: HomeContactFooterProps) {
  const whatsappHref = contact.whatsappNumber
    ? buildWhatsAppUrl({ number: contact.whatsappNumber, message: contact.whatsappGreeting ?? "" })
    : null

  return (
    <motion.footer initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={footerReveal} className="bg-brand-teal-deep px-5 py-14 text-on-dark sm:px-8 sm:py-16 lg:px-12">
      <div className="mx-auto max-w-content">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr_0.8fr] lg:gap-16">
          <div>
            <Link href="/" className="group inline-flex items-center gap-2.5 rounded-sm text-on-dark outline-none">
              <img src={taretanLogo} alt="" aria-hidden="true" className="size-10 shrink-0 rounded-xl bg-background/90 p-1 object-contain transition-transform duration-200 group-hover:scale-[1.03]" />
              <span className="flex min-w-0 flex-col justify-center leading-tight">
                <span className="text-base font-semibold tracking-[-0.04em]">CV Taretan Media Publishing</span>
                <span className="text-[9px] font-medium tracking-[-0.01em] text-on-dark-muted">Penerbit Buku &amp; Publikasi Ilmiah</span>
              </span>
            </Link>
            <p className="mt-6 max-w-sm text-sm leading-7 text-on-dark-muted">Menerbitkan gagasan, mengabadikan pengetahuan melalui buku, publikasi ilmiah, dan layanan penerbitan.</p>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">Jelajahi</h2>
            <nav aria-label="Tautan footer" className="mt-5 grid gap-3 text-sm text-on-dark-muted">
              <Link href="/buku" className="transition-colors hover:text-on-dark">Katalog Buku</Link>
              <Link href="/jurnal" className="transition-colors hover:text-on-dark">Jurnal</Link>
              <Link href="/berita" className="transition-colors hover:text-on-dark">Berita</Link>
              <Link href="/layanan" className="transition-colors hover:text-on-dark">Layanan</Link>
              <Link href="/profil" className="transition-colors hover:text-on-dark">Profil</Link>
            </nav>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">Kontak</h2>
            <div className="mt-5 grid gap-3 text-sm text-on-dark-muted">
              {whatsappHref ? <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 transition-colors hover:text-on-dark"><MessageCircle className="size-4 shrink-0 text-primary" aria-hidden="true" />{contact.whatsappLabel ?? "WhatsApp CV Taretan Media Publishing"}</a> : null}
              {contact.email ? <a href={`mailto:${contact.email}`} className="inline-flex items-center gap-2 transition-colors hover:text-on-dark"><Mail className="size-4 shrink-0 text-primary" aria-hidden="true" />{contact.email}</a> : null}
              {contact.mapUrl ? <a href={contact.mapUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-start gap-2 transition-colors hover:text-on-dark"><img src="/google-maps-platform.svg" alt="" aria-hidden="true" className="mt-0.5 size-4 shrink-0" />Pamekasan, Jawa Timur</a> : null}
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-on-dark/15 pt-5 text-xs text-on-dark-muted"><span>© 2026 CV Taretan Media Publishing. Semua hak cipta dilindungi.</span></div>
      </div>
    </motion.footer>
  )
}
