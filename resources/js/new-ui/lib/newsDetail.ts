import { formatIndonesianDate } from "@/new-ui/lib/formatting"
import type { NewsCardData, NewsShowProps, ImageAsset } from "@/new-ui/types/public"

export type NewsDetailViewModel = {
  title: string
  categories: string[]
  authorName: string | null
  publishedDate: { label: string; dateTime: string } | null
  publishedDateFallback: string | null
  featuredImage: ImageAsset | null
  bodyHtml: string | null
  shareUrl: string | null
  relatedNews: NewsCardData[]
}

export function getPublicHttpUrl(candidate: string | null | undefined): string | null {
  if (!candidate?.trim()) return null

  try {
    const url = new URL(candidate.trim())
    return url.protocol === "http:" || url.protocol === "https:" ? url.href : null
  } catch {
    return null
  }
}

function isValidDate(value: string) {
  return value.trim() !== "" && !Number.isNaN(new Date(value).getTime())
}

function normalizeImage(image: ImageAsset | null | undefined): ImageAsset | null {
  if (!image?.src?.trim()) return null
  return { ...image, src: image.src.trim(), alt: image.alt?.trim() ?? "" }
}

export function toNewsDetailViewModel(
  props: Pick<NewsShowProps, "news" | "canonicalUrl" | "relatedNews">,
): NewsDetailViewModel {
  const news = props.news
  const title = news.title.trim() || "Detail berita"
  const authorName = news.author.name.trim() || news.authorName.trim() || null
  const hasValidDate = isValidDate(news.publishedAt)
  const publishedDate = hasValidDate
    ? { label: formatIndonesianDate(news.publishedAt), dateTime: news.publishedAt }
    : null
  const relatedNews = (props.relatedNews ?? []).filter((related) => {
    const title = related.title.trim()
    const slug = related.slug.trim()
    return Boolean(title && slug && slug !== news.slug.trim())
  })

  return {
    title,
    categories: news.categories.map((category) => category.trim()).filter(Boolean),
    authorName,
    publishedDate,
    publishedDateFallback: publishedDate ? null : "Tanggal publikasi belum tersedia",
    featuredImage: normalizeImage(news.featuredImage),
    bodyHtml: news.bodyHtml.trim() || null,
    shareUrl: getPublicHttpUrl(props.canonicalUrl),
    relatedNews,
  }
}

const externalLinkContext = " (buka di tab baru)"

export function hardenNewsBodyLinks(root: HTMLElement, siteOrigin: string): void {
  let origin: URL
  try {
    origin = new URL(siteOrigin)
  } catch {
    return
  }

  root.querySelectorAll<HTMLAnchorElement>("a").forEach((link) => {
    const href = link.getAttribute("href")
    if (!href) return

    let destination: URL
    try {
      destination = new URL(href, origin.href)
    } catch {
      return
    }

    const isHttp = destination.protocol === "http:" || destination.protocol === "https:"
    if (!isHttp || destination.origin === origin.origin) return

    link.target = "_blank"
    const relTokens = new Set((link.getAttribute("rel") ?? "").split(/\s+/).filter(Boolean))
    relTokens.add("noopener")
    relTokens.add("noreferrer")
    link.setAttribute("rel", [...relTokens].join(" "))

    const currentLabel = link.getAttribute("aria-label")?.trim() || link.textContent?.trim() || "Tautan eksternal"
    if (!currentLabel.endsWith(externalLinkContext)) {
      link.setAttribute("aria-label", `${currentLabel}${externalLinkContext}`)
    }
  })
}
