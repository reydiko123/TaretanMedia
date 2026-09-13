import type { JournalDetail, JournalDetailViewModel } from "@/new-ui/types/journal"

export function getSecureExternalUrl(candidate: string | null | undefined): string | null {
  const value = candidate?.trim()
  if (!value) return null

  try {
    const url = new URL(value)
    return url.protocol === "https:" ? url.href : null
  } catch {
    return null
  }
}

export function toJournalDetailViewModel(journal: JournalDetail): JournalDetailViewModel {
  const title = journal.title?.trim() ?? ""
  const theme = journal.theme?.trim() || null
  const editionLabel = journal.editionLabel?.trim() || null
  const publicationYear = Number.isInteger(journal.publicationYear) && journal.publicationYear > 0
    ? String(journal.publicationYear)
    : null
  const categories = (journal.categories ?? []).filter((category) => category.name?.trim()).map((category) => ({
    ...category,
    name: category.name.trim(),
  }))
  const description = journal.description?.trim() || null

  return {
    title,
    theme,
    editionLabel,
    publicationYear,
    categories,
    description,
    externalUrl: getSecureExternalUrl(journal.externalUrl),
  }
}
