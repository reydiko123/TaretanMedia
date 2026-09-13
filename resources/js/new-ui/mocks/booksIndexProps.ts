import type { BooksIndexProps } from "@/new-ui/types/catalog"

const categories = [
  { id: 1, name: "Sosial dan Budaya", slug: "sosial-budaya" },
  { id: 2, name: "Pendidikan", slug: "pendidikan" },
  { id: 3, name: "Ekonomi", slug: "ekonomi" },
  { id: 4, name: "Kepenulisan", slug: "kepenulisan" },
  { id: 5, name: "Sejarah", slug: "sejarah" },
]

const titles: Array<[string, string | string[], string, number, number]> = [
  ["Membaca Nusantara", "Ayu Pratiwi", "sosial-budaya", 85000, 2026],
  ["Metodologi Penelitian Sosial", "Raka Adinata", "pendidikan", 98000, 2026],
  ["Ekonomi Islam Kontemporer", "Naila Fitria", "ekonomi", 92000, 2025],
  ["Menulis untuk Publik", "Dimas Prabowo", "kepenulisan", 78000, 2025],
  ["Sejarah Kota dan Ingatan", "Fajar Maulana", "sejarah", 112000, 2024],
  ["Pendidikan yang Membebaskan", "Laras Wulandari", "pendidikan", 105000, 2024],
  ["Ruang-Ruang Ekonomi Rakyat", "Bima Santoso", "ekonomi", 120000, 2023],
  ["Bahasa, Identitas, dan Budaya", "Maya Kartika", "sosial-budaya", 88000, 2023],
  ["Riset Kualitatif untuk Pemula", "Raka Adinata", "pendidikan", 95000, 2022],
  ["Catatan dari Pesisir", "Ayu Pratiwi", "sosial-budaya", 74000, 2022],
  ["Kajian Pesisir dan Ekologi", ["Nadia Prameswari", "Rizal Mahendra"], "sosial-budaya", 110000, 2022],
  ["Jurnalistik dan Etika Digital", "Dimas Prabowo", "kepenulisan", 89000, 2021],
  ["Mengenal Sejarah Nusantara", "Fajar Maulana", "sejarah", 102000, 2021],
]

const baseBooks = titles.map(([title, author, category, price, publicationYear], index) => ({
  title,
  slug: title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
  cover: index % 4 === 0 ? null : { src: `/book-covers/${index + 1}.jpg`, alt: `Sampul ${title}`, width: 400, height: 600 },
  authors: Array.isArray(author) ? author : [author],
  categories: [categories.find((item) => item.slug === category)?.name ?? category],
  price,
  publicationYear,
  isbn: index % 3 === 0 ? null : `978-623-0000-${String(index + 1).padStart(2, "0")}-${index % 10}`,
}))

export const localBookCards = baseBooks

export const populatedBooksIndexProps: BooksIndexProps = {
  site: {
    name: "Taretan Media",
    tagline: "Penerbit Buku & Publikasi Ilmiah",
    shortDescription: "Penerbitan buku dan publikasi ilmiah yang bertumbuh bersama penulis.",
  },
  contact: {},
  books: {
    data: baseBooks,
    pagination: { currentPage: 1, lastPage: Math.max(Math.ceil(baseBooks.length / 12), 1), total: baseBooks.length, perPage: 12, from: 1, to: Math.min(baseBooks.length, 12) },
  },
  filters: { sort: "latest" },
  filterOptions: { categories, years: [2026, 2025, 2024, 2023, 2022, 2021], priceBounds: { min: 0, max: 250000 } },
}

export const filteredEmptyBooksIndexProps: BooksIndexProps = {
  ...populatedBooksIndexProps,
  books: { data: [], pagination: { currentPage: 1, lastPage: 1, total: 0, from: null, to: null } },
  filters: { q: "tidak ada buku", sort: "latest" },
}

export const emptyBooksIndexProps: BooksIndexProps = {
  ...populatedBooksIndexProps,
  books: { data: [], pagination: { currentPage: 1, lastPage: 1, total: 0, from: null, to: null } },
}

export function getLocalBooksIndexProps(search = ""): BooksIndexProps {
  const params = new URLSearchParams(search)
  if (params.get("preview") === "empty") return emptyBooksIndexProps

  const q = params.get("q")?.trim() ?? ""
  const category = params.get("category") ?? ""
  const minPrice = params.get("min_price") ? Number(params.get("min_price")) : null
  const maxPrice = params.get("max_price") ? Number(params.get("max_price")) : null
  const year = params.get("year") ? Number(params.get("year")) : null
  const hasIsbn = params.get("has_isbn") === "1"
  const sort = (params.get("sort") as BooksIndexProps["filters"]["sort"] | null) ?? "latest"
  const page = Math.max(Number(params.get("page") ?? "1") || 1, 1)
  const perPage = 8
  const needle = q.toLowerCase()
  const filtered = baseBooks.filter((book) => {
    const searchable = `${book.title} ${book.authors.join(" ")} ${book.categories.join(" ")}`.toLowerCase()
    return (!needle || searchable.includes(needle)) && (!category || categories.find((item) => item.slug === category)?.name === book.categories[0]) && (minPrice == null || book.price >= minPrice) && (maxPrice == null || book.price <= maxPrice) && (year == null || book.publicationYear === year) && (!hasIsbn || book.isbn != null)
  })
  const sorted = [...filtered].sort((a, b) => {
    if (sort === "oldest") return a.publicationYear - b.publicationYear
    if (sort === "price_asc") return a.price - b.price
    if (sort === "price_desc") return b.price - a.price
    if (sort === "title") return a.title.localeCompare(b.title)
    return b.publicationYear - a.publicationYear
  })
  const lastPage = Math.max(Math.ceil(sorted.length / perPage), 1)
  const currentPage = Math.min(page, lastPage)
  const data = sorted.slice((currentPage - 1) * perPage, currentPage * perPage)
  const from = sorted.length === 0 ? null : (currentPage - 1) * perPage + 1
  const to = sorted.length === 0 ? null : from! + data.length - 1

  return {
    ...populatedBooksIndexProps,
    books: { data, pagination: { currentPage, lastPage, total: sorted.length, perPage, from, to } },
    filters: { q: q || null, category: category || null, minPrice, maxPrice, year, hasIsbn: hasIsbn || null, sort },
  }
}
