export type NewsCatalogQuery = {
  q?: string
  category?: string
  page?: number
}

function stringValue(value: unknown) {
  return typeof value === "string" ? value.trim() : ""
}

export function normalizeNewsCatalogQuery(input: Record<string, unknown>, validCategorySlugs: string[]): NewsCatalogQuery {
  const query: NewsCatalogQuery = {}
  const q = stringValue(input.q)
  const category = stringValue(input.category)
  const pageValue = typeof input.page === "number" ? input.page : Number(stringValue(input.page))

  if (q) query.q = q
  if (category && validCategorySlugs.includes(category)) query.category = category
  if (Number.isInteger(pageValue) && pageValue > 1) query.page = pageValue

  return query
}

export function buildNewsCatalogUrl(query: NewsCatalogQuery) {
  const params = new URLSearchParams()
  if (query.q?.trim()) params.set("q", query.q.trim())
  if (query.category?.trim()) params.set("category", query.category.trim())
  if (Number.isInteger(query.page) && query.page! > 1) params.set("page", String(query.page))
  const serialized = params.toString()
  return serialized ? `/berita?${serialized}` : "/berita"
}

export function buildNewsDetailUrl(slug: string) {
  return `/berita/${encodeURIComponent(slug)}`
}
