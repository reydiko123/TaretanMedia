import { getLocalJournalBySlug, getLocalJournalIndex } from "@/new-ui/data/journalsIndexData"
import type { JournalDetail } from "@/new-ui/types/journal"

export const completeJournal: JournalDetail = {
  id: 1,
  title: "Jurnal Kajian Masyarakat dan Pendidikan",
  slug: "jurnal-kajian-masyarakat-dan-pendidikan",
  theme: "Riset sosial, pendidikan, dan transformasi masyarakat",
  editionLabel: "Vol. 3 No. 1",
  publicationYear: 2026,
  cover: { src: "/book-covers/merawat-ingatan-madura.svg", alt: "Sampul Jurnal Kajian Masyarakat dan Pendidikan", width: 400, height: 600 },
  description: "Jurnal ini mempertemukan kajian sosial dan pendidikan dalam percakapan yang kontekstual.\n\nSetiap edisi menghadirkan gagasan yang relevan bagi pengembangan masyarakat.",
  categories: [
    { id: 1, name: "Sosial dan Humaniora", slug: "sosial-humaniora" },
    { id: 2, name: "Pendidikan", slug: "pendidikan" },
  ],
  externalUrl: "https://journal.example.org/issues/3-1?source=taretan",
}

export const minimalJournal: JournalDetail = {
  id: 2,
  title: "Jurnal Perspektif Nusantara",
  slug: "jurnal-perspektif-nusantara",
  theme: "Budaya dan masyarakat",
  publicationYear: 2025,
  cover: null,
  categories: [],
  description: null,
  externalUrl: "https://journal.example.org/jurnal/perspektif-nusantara",
}

export const unavailableJournal: JournalDetail = {
  id: 3,
  title: "Jurnal Ruang Pembelajaran",
  slug: "jurnal-ruang-pembelajaran",
  theme: "",
  publicationYear: 2024,
  cover: null,
  categories: [],
  description: "",
  externalUrl: null,
}

export const journalDetailFixtures: Record<string, JournalDetail> = {
  complete: completeJournal,
  minimal: minimalJournal,
  unavailable: unavailableJournal,
}

const localCategoryOptions = [
  { id: 1, name: "Sosial dan Humaniora", slug: "sosial-humaniora" },
  { id: 2, name: "Pendidikan", slug: "pendidikan" },
  { id: 3, name: "Bahasa dan Literasi", slug: "bahasa-literasi" },
]

function createLocalCatalogDetail(slug: string): JournalDetail | null {
  const catalogJournal = getLocalJournalBySlug(slug)
  if (!catalogJournal) return null

  const theme = catalogJournal.theme.toLowerCase()
  const categories = localCategoryOptions.filter((category) => {
    if (category.slug === "pendidikan") return theme.includes("pendidikan")
    if (category.slug === "bahasa-literasi") return theme.includes("bahasa") || theme.includes("literasi")
    return theme.includes("sosial") || theme.includes("masyarakat")
  })
  const journalIndex = getLocalJournalIndex(slug)

  return {
    id: 100 + journalIndex,
    ...catalogJournal,
    description: `Publikasi ${catalogJournal.title} menghadirkan kajian seputar ${catalogJournal.theme.toLowerCase()}. Detail edisi dan naskah tersedia melalui halaman jurnal eksternal.`,
    categories,
    externalUrl: `https://journal.example.org/jurnal/${encodeURIComponent(catalogJournal.slug)}`,
  }
}

export function getLocalJournalDetail(slug: string): JournalDetail | null {
  const fixtureKey = slug.replace(/^jurnal-/, "")
  return journalDetailFixtures[fixtureKey] ?? journalDetailFixtures[slug] ?? createLocalCatalogDetail(slug)
}
