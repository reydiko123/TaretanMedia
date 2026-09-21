import type { JournalsIndexProps } from "@/new-ui/types/journal"

const categories = [
  { id: 1, name: "Sosial dan Humaniora", slug: "sosial-humaniora" },
  { id: 2, name: "Pendidikan", slug: "pendidikan" },
  { id: 3, name: "Bahasa dan Literasi", slug: "bahasa-literasi" },
]

const journals: JournalsIndexProps["journals"]["data"] = [
  { title: "Jurnal Pendidikan dan Masyarakat", slug: "jurnal-pendidikan-dan-masyarakat", theme: "Pendidikan, kebudayaan, dan masyarakat", editionLabel: "Edisi 1", publicationYear: 2026, cover: { src: "/book-covers/merawat-ingatan-madura.svg", alt: "Sampul Jurnal Pendidikan dan Masyarakat", width: 400, height: 600 } },
  { title: "Jurnal Kajian Ekonomi Islam", slug: "jurnal-kajian-ekonomi-islam", theme: "Ekonomi Islam dan transformasi sosial", editionLabel: "Vol. 2 No. 1", publicationYear: 2026 },
  { title: "Jurnal Bahasa dan Literasi", slug: "jurnal-bahasa-dan-literasi", theme: "Bahasa, sastra, dan praktik literasi", editionLabel: "Edisi 4", publicationYear: 2025 },
  { title: "Jurnal Riset Sosial Humaniora", slug: "jurnal-riset-sosial-humaniora", theme: "Riset sosial dan humaniora terapan", publicationYear: 2025 },
  { title: "Jurnal Inovasi Pembelajaran", slug: "jurnal-inovasi-pembelajaran", theme: "Strategi belajar dan teknologi pendidikan", editionLabel: "Vol. 3 No. 2", publicationYear: 2024, cover: null },
  { title: "Jurnal Komunikasi dan Perubahan Sosial", slug: "jurnal-komunikasi-dan-perubahan-sosial", theme: "Komunikasi publik, media, dan perubahan sosial", editionLabel: "Edisi 2", publicationYear: 2024 },
  { title: "Jurnal Kajian Madura", slug: "jurnal-kajian-madura", theme: "Budaya, sejarah, dan masyarakat Madura", editionLabel: "Edisi 1", publicationYear: 2023 },
  { title: "Jurnal Literasi Digital", slug: "jurnal-literasi-digital", theme: "Literasi, teknologi, dan kewargaan digital", publicationYear: 2023 },
  { title: "Jurnal Administrasi Pendidikan", slug: "jurnal-administrasi-pendidikan", theme: "Kebijakan, manajemen, dan administrasi pendidikan", editionLabel: "Vol. 5 No. 1", publicationYear: 2026 },
  { title: "Jurnal Ekonomi dan Kewirausahaan", slug: "jurnal-ekonomi-dan-kewirausahaan", theme: "Ekonomi kerakyatan dan kewirausahaan sosial", editionLabel: "Edisi 3", publicationYear: 2025 },
  { title: "Jurnal Sastra Madura", slug: "jurnal-sastra-madura", theme: "Sastra, bahasa, dan ekspresi budaya Madura", publicationYear: 2024 },
  { title: "Jurnal Pemberdayaan Komunitas", slug: "jurnal-pemberdayaan-komunitas", theme: "Pemberdayaan masyarakat dan pembangunan berkelanjutan", editionLabel: "Vol. 2 No. 2", publicationYear: 2024 },
  { title: "Jurnal Pendidikan Anak Usia Dini", slug: "jurnal-pendidikan-anak-usia-dini", theme: "Pendidikan anak, keluarga, dan tumbuh kembang", editionLabel: "Edisi 2", publicationYear: 2023 },
  { title: "Jurnal Media dan Masyarakat", slug: "jurnal-media-dan-masyarakat", theme: "Media, komunikasi, dan dinamika masyarakat", publicationYear: 2023 },
  { title: "Jurnal Kajian Budaya Lokal", slug: "jurnal-kajian-budaya-lokal", theme: "Budaya lokal, identitas, dan pelestarian tradisi", editionLabel: "Vol. 1 No. 2", publicationYear: 2025 },
]

export const populatedJournalsIndexProps: JournalsIndexProps = {
  site: { name: "CV Taretan Media Publishing", tagline: "Penerbit Buku & Publikasi Ilmiah", shortDescription: "Penerbitan buku dan publikasi ilmiah yang bertumbuh bersama penulis." },
  contact: {},
  journals: { data: journals.slice(0, 10), pagination: { currentPage: 1, lastPage: Math.max(Math.ceil(journals.length / 10), 1), total: journals.length, perPage: 10, from: 1, to: Math.min(journals.length, 10) } },
  filters: {},
  filterOptions: { categories, years: [2026, 2025, 2024, 2023] },
}

export function getLocalJournalsIndexProps(search = ""): JournalsIndexProps {
  const params = new URLSearchParams(search)
  const q = params.get("q")?.trim() ?? ""
  const category = params.get("category") ?? ""
  const yearParam = params.get("year")
  const year = yearParam ? Number(yearParam) : null
  const requestedPage = Math.max(Number(params.get("page") ?? "1") || 1, 1)
  const filtered = journals.filter((journal) => {
    const searchable = `${journal.title} ${journal.theme}`.toLowerCase()
    const categoryMatch = !category || (category === "pendidikan" && journal.theme.toLowerCase().includes("pendidikan")) || (category === "bahasa-literasi" && journal.theme.toLowerCase().includes("bahasa")) || (category === "sosial-humaniora" && (journal.theme.toLowerCase().includes("sosial") || journal.theme.toLowerCase().includes("masyarakat")))
    return (!q || searchable.includes(q.toLowerCase())) && categoryMatch && (year == null || journal.publicationYear === year)
  })
  const perPage = 10
  const lastPage = Math.max(Math.ceil(filtered.length / perPage), 1)
  const currentPage = Math.min(requestedPage, lastPage)
  const data = filtered.slice((currentPage - 1) * perPage, currentPage * perPage)
  const from = filtered.length === 0 ? null : (currentPage - 1) * perPage + 1
  const to = filtered.length === 0 ? null : from! + data.length - 1
  return {
    ...populatedJournalsIndexProps,
    journals: { data, pagination: { currentPage, lastPage, total: filtered.length, perPage, from, to } },
    filters: { q: q || null, category: category || null, year: Number.isInteger(year) ? year : null },
  }
}

export function getLocalJournalBySlug(slug: string): JournalsIndexProps["journals"]["data"][number] | null {
  return journals.find((journal) => journal.slug === slug) ?? null
}

export function getLocalJournalIndex(slug: string): number {
  return journals.findIndex((journal) => journal.slug === slug)
}
