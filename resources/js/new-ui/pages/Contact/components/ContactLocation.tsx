import type { ContactLocationProps } from "@/new-ui/pages/Contact/contactTypes"

export function ContactLocation({ address, mapHref }: ContactLocationProps) {
  if (!address && !mapHref) return null

  const content = (
    <div className="flex items-center gap-6 sm:gap-8">
      <img src="/google-maps-platform.svg" alt="" aria-hidden="true" className="size-16 shrink-0 sm:size-20" />

      <div className="min-w-0">
        <h2 id="contact-location-title" className="text-heading-4 font-semibold tracking-[-0.03em] text-brand-teal-deep">Lokasi kami</h2>

        {address ? (
          <address className="mt-3 text-sm not-italic leading-6 text-muted-foreground sm:text-base sm:leading-7">{address}</address>
        ) : (
          <p className="mt-3 text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">Lihat lokasi melalui layanan peta.</p>
        )}
      </div>
    </div>
  )

  const cardClass = "rounded-2xl border border-brand-green/20 bg-brand-green/5 p-6 shadow-subtle sm:p-8 transition-shadow duration-200 hover:shadow-card"

  return (
    <section aria-labelledby="contact-location-title" className="bg-background">
      <div className="mx-auto max-w-content px-5 pb-5 pt-16 sm:px-8 sm:pb-6 sm:pt-20 lg:px-12 lg:pb-8 lg:pt-24">
        {mapHref ? (
          <a href={mapHref} target="_blank" rel="noopener noreferrer" aria-label="Buka lokasi di Google Maps" className={`block ${cardClass}`}>
            {content}
          </a>
        ) : (
          <div className={cardClass}>
            {content}
          </div>
        )}
      </div>
    </section>
  )
}
