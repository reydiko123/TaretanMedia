import type { BookCard, BookFilters as PublicBookFilters, CategoryOption, CatalogPage, PublicShellProps } from "@/new-ui/types/public"

export type BookSort = "latest" | "oldest" | "price_asc" | "price_desc" | "title"

export type BookFilters = Omit<PublicBookFilters, "sort"> & { sort: BookSort }

export type BookFilterOptions = {
  categories: CategoryOption[]
  years: number[]
  priceBounds: { min: number; max: number }
}

export type BookFilterDraft = {
  q: string
  category: string
  minPrice: string
  maxPrice: string
  year: string
  hasIsbn: boolean
  sort: BookSort
}

export type BookCatalogQuery = Partial<{
  q: string
  category: string
  min_price: string
  max_price: string
  year: string
  has_isbn: string
  sort: BookSort | "title_asc" | "title_desc" | "price_asc" | "price_desc"
  page: string
}>

export type BooksIndexProps = PublicShellProps & {
  books: CatalogPage<BookCard>
  filters: BookFilters
  filterOptions: BookFilterOptions
  filterNotice?: string | null
}

export type FilterKey = keyof BookFilters
