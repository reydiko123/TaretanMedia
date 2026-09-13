import type { JournalQuery } from "@/new-ui/types/journal"

type JournalQueryOptions = {
  categorySlugs: string[]
  years: number[]
}

export function normalizeJournalQuery(input: JournalQuery, options: JournalQueryOptions): JournalQuery {
  const normalized: JournalQuery = {}
  const query = input.q?.trim()

  if (query) normalized.q = query
  if (input.category && options.categorySlugs.includes(input.category)) normalized.category = input.category
  if (Number.isInteger(input.year) && options.years.includes(input.year as number)) normalized.year = input.year
  if (Number.isInteger(input.page) && (input.page as number) > 1) normalized.page = input.page

  return normalized
}

export function patchJournalQuery(
  current: JournalQuery,
  patch: Partial<Record<keyof JournalQuery, string | number | null | undefined>>,
): JournalQuery {
  const next = { ...current }
  if ("q" in patch) {
    if (typeof patch.q === "string") next.q = patch.q
    else delete next.q
  }
  if ("category" in patch) {
    if (typeof patch.category === "string") next.category = patch.category
    else delete next.category
  }
  if ("year" in patch) {
    if (typeof patch.year === "number") next.year = patch.year
    else delete next.year
  }
  if ("page" in patch) {
    if (typeof patch.page === "number") next.page = patch.page
    else delete next.page
  }
  const discoveryKeys: Array<keyof JournalQuery> = ["q", "category", "year"]
  if (discoveryKeys.some((key) => key in patch)) delete next.page
  return next
}

export function buildJournalCatalogUrl(query: JournalQuery): string {
  const params = new URLSearchParams()
  if (query.q?.trim()) params.set("q", query.q.trim())
  if (query.category) params.set("category", query.category)
  if (Number.isInteger(query.year)) params.set("year", String(query.year))
  if (Number.isInteger(query.page) && (query.page as number) > 1) params.set("page", String(query.page))
  const serialized = params.toString()
  return serialized ? `/jurnal?${serialized}` : "/jurnal"
}
