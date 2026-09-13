import type { Pagination } from "@/new-ui/types/public"

const rupiahFormatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
})

export function formatRupiah(value: number) {
  return rupiahFormatter.format(value).replace(/\u00a0/g, "").replace("Rp ", "Rp")
}

export function getBookResultSummary(pagination: Pagination) {
  if (pagination.total === 1) return "1 buku ditemukan"
  if (pagination.from != null && pagination.to != null) {
    return `Menampilkan ${pagination.from}–${pagination.to} dari ${pagination.total} buku`
  }
  return `${pagination.total} buku ditemukan`
}

const indonesianDateFormatter = new Intl.DateTimeFormat("id-ID", {
  day: "numeric",
  month: "long",
  year: "numeric",
})

export function formatIndonesianDate(value: string) {
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? "Tanggal publikasi belum tersedia" : indonesianDateFormatter.format(date)
}

export function getNewsResultSummary(pagination: Pagination, hasActiveFilters: boolean) {
  if (pagination.from != null && pagination.to != null) {
    return `Menampilkan ${pagination.from}–${pagination.to} dari ${pagination.total} berita`
  }
  return `${pagination.total} berita ${hasActiveFilters ? "ditemukan" : "tersedia"}`
}
