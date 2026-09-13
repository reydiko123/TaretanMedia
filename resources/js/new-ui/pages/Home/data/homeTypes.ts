export type HomeImageAsset = {
  src: string
  alt: string
  width?: number
  height?: number
}

export type FeaturedJournal = {
  title: string
  slug: string
  theme: string
  editionLabel?: string | null
  publicationYear: number
  cover?: HomeImageAsset | null
}

export type PublicationStep = {
  id: string
  order: number
  title: string
  description: string
}

export type LatestNews = {
  title: string
  slug: string
  excerpt?: string | null
  featuredImage?: HomeImageAsset | null
  authorName: string
  categories: string[]
  publishedAt: string
}

export type Testimony = {
  id: string
  name: string
  role: string
  quote: string
}

export type BusinessPartner = {
  name: string
  logo: HomeImageAsset
}

export type HomeFaq = {
  id: string
  question: string
  answer: string
}

export type HomeContact = {
  whatsappNumber?: string | null
  whatsappLabel?: string | null
  whatsappGreeting?: string | null
  email?: string | null
  instagramUrl?: string | null
  mapUrl?: string | null
  address?: string | null
}
