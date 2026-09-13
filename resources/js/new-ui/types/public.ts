export type BreadcrumbItem = {
  label: string
  href?: string
}

export type Pagination = {
  currentPage: number
  lastPage: number
  total: number
  perPage?: number
  from?: number | null
  to?: number | null
}

export type CategoryOption = {
  id: number
  name: string
  slug: string
}

export type ImageAsset = {
  src: string
  alt: string
  width?: number
  height?: number
}

export type BookCard = {
  title: string
  slug: string
  cover?: ImageAsset | null
  authors: string[]
  categories: string[]
  price: number
  publicationYear: number
  isbn?: string | null
}

export type JournalCard = {
  title: string
  slug: string
  theme: string
  editionLabel?: string | null
  publicationYear: number
  cover?: ImageAsset | null
}

export type NewsCardData = {
  title: string
  slug: string
  excerpt?: string | null
  featuredImage?: ImageAsset | null
  authorName: string
  categories: string[]
  publishedAt: string
}

export type AuthorSummary = {
  id: number
  name: string
  about?: string | null
}

export type BookDetail = {
  id: number
  title: string
  slug: string
  isbn?: string | null
  publisher: string
  pageCount?: number | null
  publicationYear: number
  price: number
  cover?: ImageAsset | null
  synopsis?: string | null
  tableOfContents?: string | null
  authors: AuthorSummary[]
  categories: CategoryOption[]
  publishedAt?: string | null
}

export type BookFilters = {
  q?: string | null
  category?: string | null
  minPrice?: number | null
  maxPrice?: number | null
  year?: number | null
  hasIsbn?: boolean | null
  sort: "latest" | "oldest" | "price_asc" | "price_desc" | "title"
}

export type CatalogPage<T> = {
  data: T[]
  pagination: Pagination
}

export type SiteContact = {
  whatsappNumber?: string | null
  whatsappLabel?: string | null
  whatsappGreeting?: string | null
  email?: string | null
  instagramUrl?: string | null
  mapUrl?: string | null
  address?: string | null
}

export type SiteSummary = {
  name: string
  tagline: string
  shortDescription: string
  about?: string | null
  vision?: string | null
  mission?: string[]
  values?: string[]
}

export type PublicShellProps = {
  site: SiteSummary
  contact: SiteContact
  currentUrl?: string
}

export type BookShowProps = PublicShellProps & {
  book: BookDetail
  canonicalUrl: string
  whatsapp: {
    number: string
    messageTemplate: string
  }
  relatedBooks?: BookCard[]
}

export type NewsFilters = {
  q?: string | null
  category?: string | null
}

export type NewsIndexProps = PublicShellProps & {
  news: CatalogPage<NewsCardData>
  filters: NewsFilters
  filterOptions: { categories: CategoryOption[] }
}

export type NewsDetail = NewsCardData & {
  id: number
  bodyHtml: string
  author: AuthorSummary
}

export type NewsShowProps = PublicShellProps & {
  news: NewsDetail
  canonicalUrl: string
  relatedNews?: NewsCardData[]
}

export type PublicationTypeOption = {
  value: string
  label: string
}

export type ContactChannel = {
  type: "email" | "phone" | "whatsapp"
  label: string
  href: string
}

export type ManuscriptCreateProps = PublicShellProps & {
  publicationTypes: PublicationTypeOption[]
  whatsapp: {
    number: string
    messageTemplate: string
  }
  privacyNotice: {
    text: string
    privacyPolicyUrl?: string | null
  }
  alternativeContact?: ContactChannel | null
}

export type ManuscriptFormValues = {
  fullName: string
  email: string
  manuscriptTitle: string
  publicationType: string
}

export type ManuscriptField = keyof ManuscriptFormValues
export type ManuscriptFormErrors = Partial<Record<ManuscriptField, string>>
export type ManuscriptTouched = Record<ManuscriptField, boolean>

export type OpenExternalUrl = (url: string) => Window | null

export type Service = {
  id: number
  name: string
  slug: string
  summary: string
  description: string
  features: string[]
  ctaLabel: string
  price: number
}

export type ServicesProps = PublicShellProps & {
  services: Service[]
  whatsapp: {
    number: string
    messageTemplate: string
  }
}
