import { HomeHero } from "@/new-ui/pages/Home/components/HomeHero"
import { FeatureMarquee } from "@/new-ui/pages/Home/components/FeatureMarquee"
import { FeaturedBooksSection } from "@/new-ui/pages/Home/components/FeaturedBooksSection"
import { FeaturedTestimonySection } from "@/new-ui/pages/Home/components/FeaturedTestimonySection"
import { BusinessPartnerSection } from "@/new-ui/pages/Home/components/BusinessPartnerSection"
import { FeatureHighlightsSection } from "@/new-ui/pages/Home/components/FeatureHighlightsSection"
import { PublicationProcessSection } from "@/new-ui/pages/Home/components/PublicationProcessSection"
import { FeaturedJournalsSection } from "@/new-ui/pages/Home/components/FeaturedJournalsSection"
import { LatestNewsSection } from "@/new-ui/pages/Home/components/LatestNewsSection"
import { FaqSection } from "@/new-ui/pages/Home/components/FaqSection"
import { HomeCtaSection } from "@/new-ui/pages/Home/components/HomeCtaSection"
import { featuredBooks } from "@/new-ui/pages/Home/data/featuredBooks"
import { testimonies } from "@/new-ui/pages/Home/data/testimonies"
import { businessPartners } from "@/new-ui/pages/Home/data/businessPartners"
import { featuredJournals } from "@/new-ui/pages/Home/data/featuredJournals"
import { publicationSteps } from "@/new-ui/pages/Home/data/publicationSteps"
import { featuredServices } from "@/new-ui/pages/Home/data/featuredServices"
import { latestNews } from "@/new-ui/pages/Home/data/latestNews"
import { faqs } from "@/new-ui/pages/Home/data/faqs"
import type { BookCard as BackendBookCard, JournalCard as BackendJournalCard, ArticleCard as BackendArticleCard } from "@/types"
import { toBookCard, toJournalCard, toNewsCard } from "@/new-ui/inertia-adapters"

const featureMarquee = [
  "Editing Profesional",
  "Publikasi Jurnal",
  "Konsultasi Resmi",
  "Desain & Layout",
  "Penerbitan Buku",
  "Distribusi Publikasi",
]

export type HomePageProps = {
  books?: BackendBookCard[]
  journals?: BackendJournalCard[]
  articles?: BackendArticleCard[]
}

export function HomePage({ books, journals, articles }: HomePageProps = {}) {
  const displayedBooks = books ? books.map(toBookCard) : featuredBooks
  const displayedJournals = journals ? journals.map(toJournalCard) : featuredJournals
  const displayedNews = articles ? articles.map(toNewsCard) : latestNews

  return (
    <>
      <HomeHero />
      <FeatureMarquee items={featureMarquee} />
      <FeaturedBooksSection books={displayedBooks} />
      <FeaturedTestimonySection testimonies={testimonies} />
      <BusinessPartnerSection partners={businessPartners} />
      <FeatureHighlightsSection services={featuredServices} />
      <PublicationProcessSection steps={publicationSteps} />
      <FeaturedJournalsSection journals={displayedJournals} />
      <LatestNewsSection news={displayedNews} />
      <FaqSection faqs={faqs} />
      <HomeCtaSection manuscriptLabel="Kirim Naskah" manuscriptHref="/kirim-naskah" />
    </>
  )
}
