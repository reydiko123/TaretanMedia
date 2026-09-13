import type { PublicShellProps, SiteContact } from "@/new-ui/types/public"

export type ContactContent = SiteContact & {
  heading?: string | null
  description?: string | null
}

export type ContactProps = Omit<PublicShellProps, "contact"> & {
  contact: ContactContent
}

export type ContactChannelId = "whatsapp" | "email"

export type ContactChannelViewModel = {
  id: ContactChannelId
  label: string
  supportingText: string
  href: string
  external: boolean
  primary: boolean
}

export type ContactPageViewModel = {
  intro: {
    eyebrow: "Kontak"
    title: string
    description: string
  }
  channels: ContactChannelViewModel[]
  location?: {
    address?: string
    mapHref?: string
  }
  hasAnyContactInformation: boolean
}

export type ContactChannelListProps = {
  channels: ContactChannelViewModel[]
}

export type ContactChannelCardProps = {
  channel: ContactChannelViewModel
}

export type ContactLocationProps = {
  address?: string
  mapHref?: string
}

export type ContactEmptyStateProps = {
  homeHref?: "/"
}
