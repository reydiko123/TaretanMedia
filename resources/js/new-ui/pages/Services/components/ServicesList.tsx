import { EmptyState } from "@/new-ui/components/feedback/EmptyState"
import { ServiceCard } from "@/new-ui/pages/Services/components/ServiceCard"
import type { ServicesListProps } from "@/new-ui/pages/Services/servicesTypes"

export function ServicesList({ services, onWhatsAppClick }: ServicesListProps) {
  if (services.length === 0) {
    return (
      <EmptyState
        filtered={false}
        title="Informasi paket layanan sedang diperbarui"
        description="Belum ada informasi paket yang dapat ditampilkan saat ini. Silakan hubungi kami untuk mendiskusikan kebutuhan karya Anda."
        emptyHref="/kontak"
        emptyLabel="Hubungi Kami"
      />
    )
  }

  return (
    <ul role="list" className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {services.map((service) => (
        <li key={service.id} className="min-w-0">
          <ServiceCard service={service} onWhatsAppClick={onWhatsAppClick} />
        </li>
      ))}
    </ul>
  )
}
