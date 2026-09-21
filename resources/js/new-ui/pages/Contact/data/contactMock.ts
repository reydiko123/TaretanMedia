import type { ContactContent, ContactProps } from "@/new-ui/pages/Contact/contactTypes"

const site = {
  name: "CV Taretan Media Publishing",
  tagline: "Penerbit Buku & Publikasi Ilmiah",
  shortDescription: "Penerbitan buku dan publikasi ilmiah yang bertumbuh bersama penulis.",
}

const completeContact: ContactContent = {
  heading: "Hubungi Kami",
  description: "Konsultasikan kebutuhan penerbitan dan publikasi ilmiah anda",
  whatsappNumber: "+62 858-1770-2223",
  whatsappLabel: "WhatsApp CV Taretan Media Publishing",
  whatsappGreeting: "Halo CV Taretan Media Publishing, saya ingin meminta informasi.",
  email: "admin.taretanmedia@gmail.com",
  address: "Sumber Papan I, Larangan Badung, Kec. Palengaan, Kabupaten Pamekasan, Jawa Timur 69312",
  mapUrl: "https://maps.app.goo.gl/Hadm2zqJcaK3d9Kh7",
}

function createProps(contact: ContactContent): ContactProps {
  return { site, contact }
}

export type ContactMockVariant = "complete" | "partial" | "addressOnly" | "mapOnly" | "malformed" | "empty"

export function getLocalContactProps(variant: ContactMockVariant = "complete"): ContactProps {
  switch (variant) {
    case "partial":
      return createProps({ email: "halo@taretan.media" })
    case "addressOnly":
      return createProps({ address: "Jalan Contoh No. 1\nBangkalan, Madura 69111" })
    case "mapOnly":
      return createProps({ mapUrl: "https://maps.app.goo.gl/contoh" })
    case "malformed":
      return createProps({
        whatsappNumber: "0812 ext 1",
        email: "halo taretan.media",
        mapUrl: "not a url",
      })
    case "empty":
      return createProps({})
    default:
      return createProps(completeContact)
  }
}
