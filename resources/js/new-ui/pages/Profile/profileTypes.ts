import type { PublicShellProps } from "@/new-ui/types/public"

export type ProfileValue = {
  title: string
  description: string
}

export type TeamMember = {
  id: number
  name: string
  team: string
  role: string
  image: {
    src: string
    alt: string
    width?: number
    height?: number
  }
}

export type ProfileContent = {
  about: string
  vision: string
  mission: string[]
  values: ProfileValue[]
}

export type ProfileProps = PublicShellProps & {
  profile: ProfileContent
}

export type ProfilePageViewModel = {
  intro: {
    eyebrow: "Profil"
    title: string
    description?: string
  }
  about?: string
  vision?: string
  mission: string[]
  values: ProfileValue[]
}
