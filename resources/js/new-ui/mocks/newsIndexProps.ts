import { normalizeNewsCatalogQuery } from "@/new-ui/lib/newsCatalog"
import type { NewsCardData, NewsIndexProps } from "@/new-ui/types/public"

const categories = [
  { id: 1, name: "Penerbitan", slug: "penerbitan" },
  { id: 2, name: "Edukasi", slug: "edukasi" },
  { id: 3, name: "Literasi", slug: "literasi" },
]

const newsItems: NewsCardData[] = [
  { title: "Membangun Kebiasaan Membaca yang Menumbuhkan Gagasan", slug: "membangun-kebiasaan-membaca-menumbuhkan-gagasan", excerpt: "Membaca bukan sekadar menambah jumlah buku yang selesai, melainkan membangun cara berpikir yang lebih sabar, kritis, dan kaya gagasan.", featuredImage: { src: "/book-covers/merawat-ingatan-madura.svg", alt: "Ilustrasi kebiasaan membaca dan mencatat gagasan", width: 800, height: 500 }, authorName: "Taretan Editorial", categories: ["Literasi", "Edukasi"], publishedAt: "2026-04-05" },
  { title: "Menata Gagasan Menjadi Naskah Buku", slug: "menata-gagasan-menjadi-naskah-buku", excerpt: "Cara sederhana memetakan gagasan agar naskah buku terasa utuh sejak halaman pertama.", featuredImage: { src: "/book-covers/merawat-ingatan-madura.svg", alt: "Ilustrasi naskah buku", width: 800, height: 500 }, authorName: "Ayu Rahma", categories: ["Penerbitan", "Edukasi"], publishedAt: "2026-03-14" },
  { title: "Mengapa Editing Penting dalam Proses Penerbitan", slug: "mengapa-editing-penting", excerpt: "Editing membantu menjaga ketepatan pesan, alur, dan pengalaman pembaca dalam sebuah karya.", featuredImage: null, authorName: "Budi Santoso", categories: ["Penerbitan"], publishedAt: "2026-02-28" },
  { title: "Membaca Lebih Kritis di Tengah Banjir Informasi", slug: "membaca-lebih-kritis", excerpt: "Beberapa kebiasaan membaca yang dapat membantu kita memahami informasi dengan lebih jernih.", featuredImage: { src: "/missing-article-cover.webp", alt: "Ilustrasi membaca kritis", width: 800, height: 500 }, authorName: "Nadia Fitria", categories: ["Literasi", "Edukasi"], publishedAt: "2026-02-09" },
  { title: "Panduan Ringkas Menyusun Referensi Akademik", slug: "panduan-menyusun-referensi-akademik", excerpt: "Kenali langkah penting untuk merapikan referensi agar tulisan akademik lebih dapat dipercaya.", featuredImage: { src: "/book-covers/merawat-ingatan-madura.svg", alt: "Ilustrasi referensi akademik", width: 800, height: 500 }, authorName: "Rizal Maulana", categories: ["Edukasi"], publishedAt: "2026-01-21" },
  { title: "Bahasa yang Jernih untuk Tulisan yang Berdaya", slug: "bahasa-jernih-tulisan-berdaya", excerpt: null, featuredImage: null, authorName: "", categories: ["Literasi"], publishedAt: "2025-12-10" },
  { title: "Dari Catatan Lapangan Menjadi Buku yang Bermakna", slug: "catatan-lapangan-menjadi-buku", excerpt: "Catatan lapangan dapat berkembang menjadi buku yang bermakna ketika dirawat melalui proses yang terarah.", featuredImage: { src: "/book-covers/merawat-ingatan-madura.svg", alt: "Ilustrasi catatan lapangan", width: 800, height: 500 }, authorName: "Siti Aminah", categories: ["Penerbitan", "Literasi"], publishedAt: "2025-11-06" },
  { title: "Mengenal Alur Publikasi Ilmiah untuk Penulis Pemula", slug: "alur-publikasi-ilmiah-penulis-pemula", excerpt: "Memahami alur publikasi membantu penulis menyiapkan naskah dan berkomunikasi dengan lebih baik.", featuredImage: null, authorName: "Taretan Editorial", categories: ["Edukasi", "Penerbitan"], publishedAt: "2025-10-18" },
  { title: "Merawat Ingatan Lokal Melalui Tulisan", slug: "merawat-ingatan-lokal", excerpt: "Tulisan adalah salah satu cara untuk menjaga cerita lokal agar terus dipelajari lintas generasi.", featuredImage: { src: "/book-covers/merawat-ingatan-madura.svg", alt: "Ilustrasi ingatan lokal", width: 800, height: 500 }, authorName: "Fauzan Hakim", categories: ["Literasi"], publishedAt: "2025-09-02" },
]

const baseProps: Omit<NewsIndexProps, "news" | "filters"> = {
  site: { name: "Taretan Media", tagline: "Penerbit Buku & Publikasi Ilmiah", shortDescription: "Penerbitan buku dan publikasi ilmiah yang bertumbuh bersama penulis." },
  contact: { email: "halo@taretan.media" },
  filterOptions: { categories },
}

export const populatedNewsIndexProps: NewsIndexProps = {
  ...baseProps,
  news: { data: newsItems.slice(0, 6), pagination: { currentPage: 1, lastPage: 2, total: newsItems.length, perPage: 6, from: 1, to: 6 } },
  filters: {},
}

export function getLocalNewsIndexProps(search = ""): NewsIndexProps {
  const raw = Object.fromEntries(new URLSearchParams(search).entries())
  const query = normalizeNewsCatalogQuery(raw, categories.map((category) => category.slug))
  const filtered = newsItems.filter((item) => {
    const searchable = `${item.title} ${item.excerpt ?? ""}`.toLowerCase()
    const queryMatch = !query.q || searchable.includes(query.q.toLowerCase())
    const categoryMatch = !query.category || item.categories.some((category) => categories.find((option) => option.slug === query.category)?.name === category)
    return queryMatch && categoryMatch
  })
  const perPage = 6
  const lastPage = Math.max(Math.ceil(filtered.length / perPage), 1)
  const currentPage = Math.min(query.page ?? 1, lastPage)
  const data = filtered.slice((currentPage - 1) * perPage, currentPage * perPage)
  const from = filtered.length ? (currentPage - 1) * perPage + 1 : null
  const to = data.length ? from! + data.length - 1 : null

  return {
    ...baseProps,
    news: { data, pagination: { currentPage, lastPage, total: filtered.length, perPage, from, to } },
    filters: { q: query.q ?? null, category: query.category ?? null },
  }
}
