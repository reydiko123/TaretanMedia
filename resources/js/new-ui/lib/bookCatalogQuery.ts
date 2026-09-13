import { formatRupiah } from "@/new-ui/lib/formatting"
import type { BookCatalogQuery, BookFilterDraft, BookFilters, BookSort } from "@/new-ui/types/catalog"

const queryOrder = ["q", "category", "min_price", "max_price", "year", "has_isbn", "sort", "page"] as const

export type PriceBounds = { min: number; max: number }
export type PriceRangeValidation =
  | { valid: true }
  | { valid: false; errors: Partial<Record<"minPrice" | "maxPrice", string>> }

function isValidInteger(value: string, bounds: PriceBounds) {
  if (value.trim() === "") return true
  const parsed = Number(value)
  return Number.isInteger(parsed) && parsed >= bounds.min && parsed <= bounds.max
}

export function validateBookPriceRange(
  draft: Pick<BookFilterDraft, "minPrice" | "maxPrice">,
  bounds: PriceBounds,
): PriceRangeValidation {
  const errors: Partial<Record<"minPrice" | "maxPrice", string>> = {}
  const message = `Masukkan harga dalam rentang ${formatRupiah(bounds.min)} sampai ${formatRupiah(bounds.max)}.`

  if (!isValidInteger(draft.minPrice, bounds)) errors.minPrice = message
  if (!isValidInteger(draft.maxPrice, bounds)) errors.maxPrice = message

  if (!errors.minPrice && !errors.maxPrice && draft.minPrice.trim() && draft.maxPrice.trim()) {
    if (Number(draft.minPrice) > Number(draft.maxPrice)) {
      errors.minPrice = "Harga minimum tidak boleh lebih besar dari harga maksimum."
    }
  }

  return Object.keys(errors).length > 0 ? { valid: false, errors } : { valid: true }
}

function toBackendBookSort(sort: BookSort): Exclude<BookCatalogQuery['sort'], undefined> {
  return sort === "title" ? "title_asc" : sort
}

export function createBookCatalogQuery(
  draft: BookFilterDraft,
  priceBounds: PriceBounds,
  page = 1,
  years?: number[],
): BookCatalogQuery {
  const query: BookCatalogQuery = {}
  const q = draft.q.trim()
  const category = draft.category.trim()
  const validation = validateBookPriceRange(draft, priceBounds)

  if (q) query.q = q
  if (category) query.category = category
  if (validation.valid) {
    if (draft.minPrice.trim()) query.min_price = String(Number(draft.minPrice))
    if (draft.maxPrice.trim()) query.max_price = String(Number(draft.maxPrice))
  }

  const parsedYear = Number(draft.year)
  if (draft.year.trim() && Number.isInteger(parsedYear) && (!years || years.includes(parsedYear))) {
    query.year = String(parsedYear)
  }
  if (draft.hasIsbn) query.has_isbn = "1"
  if (draft.sort !== "latest") query.sort = toBackendBookSort(draft.sort)
  if (Number.isInteger(page) && page > 1) query.page = String(page)
  return query
}

export function createBookCatalogHref(query: BookCatalogQuery) {
  const params = new URLSearchParams()
  for (const key of queryOrder) {
    const value = query[key]
    if (value) params.set(key, value)
  }
  const serialized = params.toString()
  return serialized ? `/buku?${serialized}` : "/buku"
}

export function removeBookFilter(filters: BookFilters, key: keyof BookFilters): BookCatalogQuery {
  const query: BookCatalogQuery = {}
  if (key !== "q" && filters.q) query.q = filters.q.trim()
  if (key !== "category" && filters.category) query.category = filters.category
  if (key !== "minPrice" && filters.minPrice != null) query.min_price = String(filters.minPrice)
  if (key !== "maxPrice" && filters.maxPrice != null) query.max_price = String(filters.maxPrice)
  if (key !== "year" && filters.year != null) query.year = String(filters.year)
  if (key !== "hasIsbn" && filters.hasIsbn) query.has_isbn = "1"
  if (key !== "sort" && filters.sort !== "latest") query.sort = toBackendBookSort(filters.sort)
  return query
}
