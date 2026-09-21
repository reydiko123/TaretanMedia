import type { ServicesProps } from "@/new-ui/pages/Services/servicesTypes"

const site = {
  name: "CV Taretan Media Publishing",
  tagline: "Penerbit Buku & Publikasi Ilmiah",
  shortDescription: "Penerbitan buku dan publikasi ilmiah yang bertumbuh bersama penulis.",
}

const contact = { email: "halo@taretan.media" }

const completeServices: ServicesProps["services"] = [
  {
    id: 1,
    name: "E-Book",
    slug: "e-book",
    summary: "Terbit cepat dalam bentuk buku digital.",
    description: "",
    features: ["Layout Profesional", "Desain Cover", "E-book PDF", "Sertifikat Penulis"],
    ctaLabel: "Hubungi Kami",
    price: 300_000,
  },
  {
    id: 2,
    name: "Reguler",
    slug: "reguler",
    summary: "Terbit cetak dan digital untuk karya Anda.",
    description: "",
    features: ["Layout Profesional", "Desain Cover", "E-book PDF", "Buku Cetak", "Sertifikat Penulis"],
    ctaLabel: "Hubungi Kami",
    price: 500_000,
  },
  {
    id: 3,
    name: "Profesional",
    slug: "profesional",
    summary: "Layanan lengkap dengan editing dan distribusi.",
    description: "",
    features: ["Editing Naskah", "Layout Profesional", "Cover Premium", "E-book PDF", "Buku Cetak", "Distribusi"],
    ctaLabel: "Hubungi Kami",
    price: 700_000,
  },
  {
    id: 4,
    name: "Akademik",
    slug: "akademik",
    summary: "Pendampingan penuh untuk karya ilmiah.",
    description: "",
    features: ["Editing Akademik", "Layout Profesional", "Desain Cover", "E-book PDF", "Buku Cetak", "Pendampingan Publikasi"],
    ctaLabel: "Hubungi Kami",
    price: 1_000_000,
  },
]

function createProps(services: ServicesProps["services"], number = "6285817702223"): ServicesProps {
  return {
    site,
    contact,
    services,
    whatsapp: {
      number,
      messageTemplate: "Halo CV Taretan Media Publishing, saya ingin berkonsultasi mengenai paket {{serviceName}}.",
    },
  }
}

export function getLocalServicesProps(variant: "complete" | "empty" | "invalid-whatsapp" | "malformed" = "complete"): ServicesProps {
  if (variant === "empty") return createProps([])
  if (variant === "invalid-whatsapp") return createProps(completeServices, "nomor belum tersedia")
  if (variant === "malformed") {
    return createProps([
      { ...completeServices[0], id: Number.NaN },
      { ...completeServices[1], name: " ", summary: "Informasi tanpa nama" },
    ])
  }

  return createProps(completeServices)
}
