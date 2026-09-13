import type { PublicationStep } from "@/new-ui/pages/Home/data/homeTypes"

export const publicationSteps: PublicationStep[] = [
  { id: "submit", order: 1, title: "Kirim Naskah", description: "Kirim naskah dan konsultasikan kebutuhan penerbitan." },
  { id: "review", order: 2, title: "Review", description: "Tim melakukan pemeriksaan awal terhadap naskah." },
  { id: "approval", order: 3, title: "Persetujuan", description: "Penulis menyetujui proses dan layanan penerbitan." },
  { id: "editing-layout", order: 4, title: "Editing & Layout", description: "Naskah disunting, dilayout, dan dibuatkan desain cover." },
  { id: "publish-distribute", order: 5, title: "Terbit & Distribusi", description: "Buku diterbitkan dan siap didistribusikan." },
]
