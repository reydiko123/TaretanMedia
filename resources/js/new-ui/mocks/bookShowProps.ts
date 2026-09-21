import type { BookDetail, BookShowProps } from "@/new-ui/types/public"
import { localBookCards } from "@/new-ui/mocks/booksIndexProps"

const site = {
  name: "CV Taretan Media Publishing",
  tagline: "Penerbit Buku & Publikasi Ilmiah",
  shortDescription: "Penerbitan buku dan publikasi ilmiah yang bertumbuh bersama penulis.",
}

const messageTemplate = 'Halo CV Taretan Media Publishing, saya ingin memesan buku "{title}".\nURL buku: {canonicalUrl}'

const completeBook = {
  id: 101,
  title: "Merawat Ingatan Madura",
  slug: "merawat-ingatan-madura",
  isbn: "978-623-0000-01-2",
  publisher: "CV Taretan Media Publishing",
  pageCount: 248,
  publicationYear: 2025,
  price: 85000,
  cover: {
    src: "/book-covers/merawat-ingatan-madura.svg",
    alt: "Sampul buku Merawat Ingatan Madura",
    width: 800,
    height: 1200,
  },
  synopsis:
    "Buku ini merekam ingatan, lanskap, dan suara warga Madura melalui kisah-kisah yang dekat dengan kehidupan sehari-hari.\n\nSetiap bab mengajak pembaca melihat kembali hubungan antara budaya, ruang, dan perubahan sosial.",
  tableOfContents: "Pengantar\n1. Ingatan sebagai Ruang Hidup\n2. Lanskap dan Perubahan\n3. Merawat Cerita\nPenutup",
  authors: [
    {
      id: 1,
      name: "Siti Rahma",
      about: "Peneliti budaya dan penulis yang banyak bekerja pada isu ingatan kolektif serta kebudayaan Madura.",
    },
    {
      id: 2,
      name: "Ahmad Fauzi",
      about: "Pengajar dan esais yang menulis tentang masyarakat, pendidikan, dan perubahan ruang hidup.",
    },
  ],
  categories: [
    { id: 1, name: "Sosial dan Budaya", slug: "sosial-budaya" },
    { id: 5, name: "Sejarah", slug: "sejarah" },
  ],
  publishedAt: "2025-05-12",
}

const relatedBooks: NonNullable<BookShowProps["relatedBooks"]> = [
  {
    title: "Membaca Nusantara",
    slug: "membaca-nusantara",
    cover: { src: "/book-covers/membaca-nusantara.jpg", alt: "Sampul buku Membaca Nusantara", width: 400, height: 600 },
    authors: ["Ayu Pratiwi"],
    categories: ["Sosial dan Budaya"],
    price: 85000,
    publicationYear: 2026,
  },
  {
    title: "Catatan dari Pesisir",
    slug: "catatan-dari-pesisir",
    cover: null,
    authors: ["Ayu Pratiwi"],
    categories: ["Sosial dan Budaya"],
    price: 74000,
    publicationYear: 2022,
  },
  {
    title: "Bahasa, Identitas, dan Budaya",
    slug: "bahasa-identitas-dan-budaya",
    cover: { src: "/book-covers/bahasa-identitas.jpg", alt: "Sampul buku Bahasa, Identitas, dan Budaya", width: 400, height: 600 },
    authors: ["Maya Kartika"],
    categories: ["Sosial dan Budaya"],
    price: 88000,
    publicationYear: 2023,
  },
]

function createLocalPreviewDetails(catalogBook: (typeof localBookCards)[number], index: number) {
  const authorName = catalogBook.authors.find(Boolean) ?? "Penulis CV Taretan Media Publishing"
  const categoryName = catalogBook.categories.find(Boolean) ?? "Publikasi"

  return {
    pageCount: 160 + index * 8,
    synopsis: `“${catalogBook.title}” mengajak pembaca memahami ${categoryName.toLowerCase()} melalui gagasan, pengalaman, dan catatan yang dekat dengan kehidupan sehari-hari. Buku ini disusun sebagai bacaan pengantar yang tetap relevan untuk pembaca umum maupun pelajar.`,
    tableOfContents: `Pengantar\n1. Memahami ${categoryName}\n2. Membaca Perubahan\n3. Catatan dari Lapangan\nPenutup`,
    authorAbout: `${authorName} adalah penulis yang berkarya dan berbagi pengetahuan di bidang ${categoryName.toLowerCase()}.`,
  }
}

export const completeBookShowProps: BookShowProps = {
  site,
  contact: { whatsappNumber: "6285817702223" },
  book: completeBook,
  canonicalUrl: "https://taretanmedia.com/buku/merawat-ingatan-madura",
  whatsapp: { number: "6285817702223", messageTemplate },
  relatedBooks: [...relatedBooks],
}

function createBookPreviewVariant(
  bookOverrides: Partial<BookDetail> = {},
  propsOverrides: Partial<Pick<BookShowProps, "relatedBooks" | "whatsapp">> = {},
): BookShowProps {
  return {
    ...completeBookShowProps,
    ...propsOverrides,
    book: { ...completeBook, ...bookOverrides },
  }
}

export const minimalBookShowProps = createBookPreviewVariant({
  isbn: null,
  pageCount: null,
  cover: null,
  synopsis: null,
  tableOfContents: null,
  authors: [],
  categories: [],
}, { relatedBooks: undefined })

export const emptySynopsisBookShowProps = createBookPreviewVariant({ synopsis: null })

export const emptyTableOfContentsBookShowProps = createBookPreviewVariant({ tableOfContents: null })

export const emptyAuthorAboutBookShowProps = createBookPreviewVariant({
  authors: completeBook.authors.map((author) => ({ ...author, about: null })),
})

export const multipleAuthorsBookShowProps = createBookPreviewVariant({
  authors: [
    ...completeBook.authors,
    {
      id: 3,
      name: "Lukman Hakim",
      about: "Editor dan peneliti yang menulis tentang kebudayaan, arsip, dan pengetahuan lokal.",
    },
  ],
})

export const emptyAuthorsBookShowProps = createBookPreviewVariant({ authors: [] })

export const emptyCategoriesBookShowProps = createBookPreviewVariant({ categories: [] })

export const emptyRelatedBooksBookShowProps = createBookPreviewVariant({}, { relatedBooks: [] })

export const missingIsbnBookShowProps = createBookPreviewVariant({ isbn: null })

export const missingPageCountBookShowProps = createBookPreviewVariant({ pageCount: null })

export const unavailableWhatsAppProps = createBookPreviewVariant({}, { whatsapp: { number: "", messageTemplate } })

export const brokenCoverBookShowProps = createBookPreviewVariant({
  cover: {
    src: "/book-covers/does-not-exist.jpg",
    alt: "Sampul buku Merawat Ingatan Madura",
    width: 800,
    height: 1200,
  },
})

const localPreviewVariants: Record<string, BookShowProps> = {
  minimal: minimalBookShowProps,
  "empty-synopsis": emptySynopsisBookShowProps,
  "empty-table-of-contents": emptyTableOfContentsBookShowProps,
  "empty-author-about": emptyAuthorAboutBookShowProps,
  "multiple-authors": multipleAuthorsBookShowProps,
  "empty-authors": emptyAuthorsBookShowProps,
  "empty-categories": emptyCategoriesBookShowProps,
  "empty-related-books": emptyRelatedBooksBookShowProps,
  "missing-isbn": missingIsbnBookShowProps,
  "missing-page-count": missingPageCountBookShowProps,
  "unavailable-whatsapp": unavailableWhatsAppProps,
  "broken-cover": brokenCoverBookShowProps,
}

export function getLocalBookShowProps(slug: string, search = ""): BookShowProps | null {
  const preview = new URLSearchParams(search).get("preview")
  if (slug === completeBookShowProps.book.slug) {
    if (preview && localPreviewVariants[preview]) return localPreviewVariants[preview]
    return completeBookShowProps
  }

  const catalogBook = localBookCards.find((book) => book.slug === slug)
  if (!catalogBook) return null

  const categories = catalogBook.categories.filter(Boolean).map((name, index) => ({
    id: index + 1,
    name,
    slug: name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
  }))
  const catalogIndex = localBookCards.findIndex((book) => book.slug === slug)
  const previewDetails = createLocalPreviewDetails(catalogBook, catalogIndex)
  const authors = catalogBook.authors.filter(Boolean).map((name, index) => ({ id: index + 1, name, about: previewDetails.authorAbout }))
  const relatedBooks = localBookCards.filter((book) => book.slug !== slug).slice(0, 3)

  return {
    site,
    contact: { whatsappNumber: "6285817702223" },
    book: {
      id: catalogIndex + 1,
      ...catalogBook,
      authors,
      categories,
      synopsis: previewDetails.synopsis,
      tableOfContents: previewDetails.tableOfContents,
      publisher: "CV Taretan Media Publishing",
      pageCount: previewDetails.pageCount,
      isbn: catalogBook.isbn ?? null,
    },
    canonicalUrl: `https://taretanmedia.com/buku/${encodeURIComponent(catalogBook.slug)}`,
    whatsapp: { number: "6285817702223", messageTemplate },
    relatedBooks,
  }
}
