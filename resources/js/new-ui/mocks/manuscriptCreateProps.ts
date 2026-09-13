import type { ManuscriptCreateProps } from "@/new-ui/types/public"

export function getLocalManuscriptCreateProps(): ManuscriptCreateProps {
  return {
    site: {
      name: "Taretan Media",
      tagline: "Penerbit Buku & Publikasi Ilmiah",
      shortDescription: "Penerbitan buku dan publikasi ilmiah yang bertumbuh bersama penulis.",
    },
    contact: { email: "halo@taretan.media" },
    publicationTypes: [
      { value: "book", label: "Buku" },
      { value: "journal", label: "Jurnal" },
      { value: "news", label: "Berita" },
    ],
    whatsapp: {
      number: "+62 812-3456-7890",
      messageTemplate: "",
    },
    privacyNotice: {
      text: "Informasi ini hanya digunakan untuk menyiapkan pesan konsultasi. Data baru diteruskan setelah anda meninjau dan mengirim pesan melalui WhatsApp.",
      privacyPolicyUrl: "/kebijakan-privasi",
    },
    alternativeContact: {
      type: "email",
      label: "Hubungi melalui email",
      href: "mailto:halo@taretan.media",
    },
  }
}
