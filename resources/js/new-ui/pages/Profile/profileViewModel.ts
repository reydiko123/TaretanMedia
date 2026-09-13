import type { ProfilePageViewModel, ProfileProps, ProfileValue } from "@/new-ui/pages/Profile/profileTypes"

function trimOptional(value: string | null | undefined) {
  const trimmed = value?.trim() ?? ""
  return trimmed || undefined
}

function compactStrings(values: string[] | null | undefined) {
  return (values ?? []).map((value) => value.trim()).filter(Boolean)
}

function normalizeValues(values: ProfileValue[] | null | undefined) {
  return (values ?? []).reduce<ProfileValue[]>((result, value) => {
    const title = trimOptional(value.title)
    const description = trimOptional(value.description)

    if (title && description) {
      result.push({ title, description })
    }

    return result
  }, [])
}

export function createProfilePageViewModel(props: ProfileProps): ProfilePageViewModel {
  const siteName = trimOptional(props.site.name) ?? "Taretan Media"
  const description = trimOptional(props.site.tagline) ?? trimOptional(props.site.shortDescription)
  const mission = compactStrings(props.profile.mission)

  return {
    intro: {
      eyebrow: "Profil",
      title: `Tentang ${siteName}`,
      ...(description ? { description } : {}),
    },
    about: trimOptional(props.profile.about) ?? trimOptional(props.site.about),
    vision: trimOptional(props.profile.vision) ?? trimOptional(props.site.vision),
    mission: mission.length > 0 ? mission : compactStrings(props.site.mission),
    values: normalizeValues(props.profile.values),
  }
}
