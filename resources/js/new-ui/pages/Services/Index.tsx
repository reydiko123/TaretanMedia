import { BlurFade } from "@/new-ui/components/magicui/BlurFade"
import { PageIntro } from "@/new-ui/components/PageIntro"
import { ServicesCta } from "@/new-ui/pages/Services/components/ServicesCta"
import { ServicesList } from "@/new-ui/pages/Services/components/ServicesList"
import { createServicesPageViewModel } from "@/new-ui/pages/Services/servicesViewModel"
import type { ServicesPageProps } from "@/new-ui/pages/Services/servicesTypes"

export function ServicesPage(props: ServicesPageProps) {
  const viewModel = createServicesPageViewModel(props)

  return (
    <div>
      <PageIntro
        eyebrow="Paket Layanan"
        title="Pilih Paket yang Sesuai Untuk Karya Anda"
        description="Setiap paket dirancang untuk mendukung kebutuhan penerbitan yang berbeda. Temukan yang paling cocok dan mulai langkah Anda."
        showBreadcrumbs={false}
        tone="dark"
      />

      <section className="bg-background" aria-labelledby="services-list-heading">
        <div className="mx-auto max-w-content px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
          <BlurFade>
            <div className="max-w-2xl">
              <p className="text-micro-uppercase font-semibold uppercase text-brand-green-dark">Paket penerbitan</p>
              <h2 id="services-list-heading" className="mt-4 text-heading-2 font-semibold tracking-[-0.04em] text-brand-teal-deep">Temukan Dukungan yang Anda Butuhkan</h2>
              <p className="mt-4 text-base leading-7 text-muted-foreground">Setiap paket mencakup dukungan penerbitan yang jelas. Konsultasikan konteks karya Anda untuk menemukan paket yang tepat.</p>
            </div>
          </BlurFade>

          <div className="mt-10">
            <ServicesList services={viewModel.services} onWhatsAppClick={props.onServiceWhatsAppClick} />
          </div>
        </div>
      </section>

      <ServicesCta />
    </div>
  )
}
