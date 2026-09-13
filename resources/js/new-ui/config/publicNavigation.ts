import type { NavigationItem } from "@/new-ui/types/navigation"

export const publicNavigation: NavigationItem[] = [
  { id: "beranda", label: "Beranda", href: "/" },
  { id: "katalog", label: "Katalog Buku", href: "/buku" },
  { id: "jurnal", label: "Jurnal", href: "/jurnal" },
  { id: "berita", label: "Berita", href: "/berita" },
  { id: "layanan", label: "Layanan", href: "/layanan" },
  { id: "profil", label: "Profil", href: "/profil" },
  { id: "kontak", label: "Kontak", href: "/kontak" },
]
