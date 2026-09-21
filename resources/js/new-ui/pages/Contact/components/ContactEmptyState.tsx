import { Mail } from "lucide-react"

import type { ContactEmptyStateProps } from "@/new-ui/pages/Contact/contactTypes"

export function ContactEmptyState({ homeHref = "/" }: ContactEmptyStateProps) {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-content px-5 pb-16 sm:px-8 sm:pb-20 lg:px-12 lg:pb-24">
        <div className="rounded-2xl border border-dashed border-border bg-surface-soft px-6 py-16 text-center">
          <Mail aria-hidden="true" className="mx-auto size-10 text-brand-green-dark/60" />
          <h2 className="mt-5 text-2xl font-semibold tracking-[-0.04em] text-brand-teal-deep">Informasi kontak sedang diperbarui</h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">Silakan kembali lagi nanti atau jelajahi informasi CV Taretan Media Publishing dari beranda.</p>
          <div className="mt-6 flex justify-center">
            <a href={homeHref} className="inline-flex min-h-11 items-center rounded-full bg-brand-green px-5 text-sm font-semibold text-on-primary transition-colors hover:bg-primary-deep">Kembali ke beranda</a>
          </div>
        </div>
      </div>
    </section>
  )
}
