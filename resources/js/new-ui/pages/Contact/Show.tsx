import { PageIntro } from "@/new-ui/components/PageIntro"
import { ContactChannelList } from "@/new-ui/pages/Contact/components/ContactChannelList"
import { ContactEmptyState } from "@/new-ui/pages/Contact/components/ContactEmptyState"
import { ContactLocation } from "@/new-ui/pages/Contact/components/ContactLocation"
import { createContactPageViewModel } from "@/new-ui/pages/Contact/contactViewModel"
import type { ContactProps } from "@/new-ui/pages/Contact/contactTypes"

export function ContactPage(props: ContactProps) {
  const viewModel = createContactPageViewModel(props.contact)
  const hasChannels = viewModel.channels.length > 0

  return (
    <div>
      <PageIntro
        eyebrow={viewModel.intro.eyebrow}
        title={viewModel.intro.title}
        description={viewModel.intro.description}
        showBreadcrumbs={false}
        tone="dark"
      />

      {viewModel.hasAnyContactInformation ? (
        <>
          <ContactLocation address={viewModel.location?.address} mapHref={viewModel.location?.mapHref} />

          {hasChannels ? (
            <section className="bg-background">
              <div className="mx-auto max-w-content px-5 pb-16 sm:px-8 sm:pb-20 lg:px-12 lg:pb-24">
                <ContactChannelList channels={viewModel.channels} />
              </div>
            </section>
          ) : null}
        </>
      ) : (
        <ContactEmptyState />
      )}
    </div>
  )
}
