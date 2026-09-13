import { ArrowUpRight, Check } from "lucide-react"
import { motion } from "motion/react"

import { formatRupiah } from "@/new-ui/lib/formatting"
import type { ServiceCardProps } from "@/new-ui/pages/Services/servicesTypes"

export function ServiceCard({ service, onWhatsAppClick }: ServiceCardProps) {
  const handleWhatsAppClick = () => {
    try {
      onWhatsAppClick?.({ serviceId: service.id, serviceSlug: service.slug })
    } catch {
      // Analytics is an enhancement; native anchor navigation must continue.
    }
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className={`group relative flex h-full flex-col rounded-2xl p-6 transition-shadow duration-200 sm:p-7 ${
        service.isPopular
          ? "border-2 border-brand-green bg-surface-feature shadow-mockup lg:scale-105 lg:-translate-y-1 z-10"
          : "border border-border bg-card shadow-subtle hover:shadow-card"
      }`}
    >
      {service.isPopular && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-brand-green px-3 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-on-primary shadow-card">
          Paling Populer
        </span>
      )}

      <div className="text-center">
        <h3 className="mt-1 text-heading-4 font-semibold tracking-[-0.03em] text-brand-teal-deep">{service.name}</h3>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">{service.summary}</p>
      </div>

      <div className="mt-6 text-center">
        <p className="text-heading-2 font-bold tracking-tight text-brand-teal-deep sm:text-heading-2 lg:text-heading-3 xl:text-heading-3">{formatRupiah(service.price)}</p>
      </div>

      {service.features.length > 0 && (
        <div className="mt-6 border-t border-border pt-5">
          <ul className="space-y-2.5">
            {service.features.map((feature, index) => (
              <li key={`${feature}-${index}`} className="flex items-start gap-2.5 text-sm leading-6 text-muted-foreground">
                <Check
                  aria-hidden="true"
                  className={`mt-0.5 size-4 shrink-0 ${service.isPopular ? "text-brand-green" : "text-brand-green-dark"}`}
                  strokeWidth={2.4}
                />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-auto pt-7">
        {service.whatsappHref && service.whatsappAccessibleLabel ? (
          <motion.a
            href={service.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={service.whatsappAccessibleLabel}
            onClick={handleWhatsAppClick}
            whileHover={{ x: 3 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className={`inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold transition-colors ${
              service.isPopular
                ? "bg-brand-green text-on-primary hover:bg-primary-deep"
                : "border border-border bg-card text-brand-teal-deep hover:border-brand-green hover:bg-brand-green hover:text-on-primary"
            }`}
          >
            {service.ctaLabel}
            <ArrowUpRight aria-hidden="true" className="size-4" />
          </motion.a>
        ) : (
          <div className="rounded-xl border border-warning-bg bg-warning-bg px-4 py-3 text-sm leading-6 text-warning-text">
            <p>Konsultasi WhatsApp sedang tidak tersedia.</p>
            <a href="/kontak" className="mt-1 inline-flex min-h-11 items-center font-semibold underline decoration-1 underline-offset-4 hover:no-underline">
              Hubungi kami melalui halaman kontak
            </a>
          </div>
        )}
      </div>
    </motion.article>
  )
}
