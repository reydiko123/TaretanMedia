export type ErrorStatus = 404 | 500

export type ErrorPageContent = {
  status: ErrorStatus
  title: string
  description: string
}

export const ERROR_PAGE_CONTENT: Record<ErrorStatus, ErrorPageContent> = {
  404: {
    status: 404,
    title: "Halaman tidak ditemukan",
    description: "Halaman yang Anda cari tidak tersedia atau alamatnya telah berubah.",
  },
  500: {
    status: 500,
    title: "Terjadi kendala sementara",
    description: "Kami belum dapat memuat halaman ini. Coba muat ulang, atau kembali ke beranda.",
  },
}
