import type { CategoryOption, ImageAsset, JournalCard, PublicShellProps } from "@/new-ui/types/public"

export type JournalFilters = {
  q?: string | null
  category?: string | null
  year?: number | null
}

export type JournalQuery = {
  q?: string
  category?: string
  year?: number
  page?: number
}

export type JournalsIndexProps = PublicShellProps & {
  journals: {
    data: JournalCard[]
    pagination: {
      currentPage: number
      lastPage: number
      total: number
      perPage?: number
      from?: number | null
      to?: number | null
    }
  }
  filters: JournalFilters
  filterOptions: {
    categories: Array<{ id: number; name: string; slug: string }>
    years: number[]
  }
}

export type JournalCardData = JournalCard

export type JournalDetail = JournalCardData & {
  id: number
  description?: string | null
  categories: CategoryOption[]
  /** Server normally provides a validated HTTPS URL; nullable for legacy fallback states. */
  externalUrl?: string | null
}

export type JournalDetailViewModel = {
  title: string
  theme: string | null
  editionLabel: string | null
  publicationYear: string | null
  categories: CategoryOption[]
  description: string | null
  externalUrl: string | null
}

export type JournalShowProps = PublicShellProps & {
  journal: JournalDetail
  canonicalUrl: string
}

export type { CategoryOption, ImageAsset }
