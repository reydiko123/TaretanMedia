import { BlurFade } from "@/new-ui/components/magicui/BlurFade"
import { ShareButton } from "@/new-ui/components/conversion/ShareButton"
import { Breadcrumbs } from "@/new-ui/components/navigation/Breadcrumbs"
import { NewsBody } from "@/new-ui/components/publication/NewsBody"
import { NewsHeader } from "@/new-ui/components/publication/NewsHeader"
import { RelatedNewsSection } from "@/new-ui/components/publication/RelatedNewsSection"
import { toNewsDetailViewModel } from "@/new-ui/lib/newsDetail"
import { getNewsCatalogReturnUrl } from "@/new-ui/lib/newsCatalogReturnUrl"
import type { ShareDependencies } from "@/new-ui/lib/sharing"
import type { TrackNewsEvent } from "@/new-ui/types/analytics"
import type { NewsShowProps } from "@/new-ui/types/public"
import "@/new-ui/styles/news-detail.css"

export type NewsShowPageProps = NewsShowProps & {
  siteOrigin: string
  trackEvent?: TrackNewsEvent
  shareDependencies?: ShareDependencies
}

export function NewsShowPage({ news, canonicalUrl, relatedNews, siteOrigin, trackEvent, shareDependencies }: NewsShowPageProps) {
  const viewModel = toNewsDetailViewModel({ news, canonicalUrl, relatedNews })
  const catalogReturnUrl = getNewsCatalogReturnUrl()
  const handleShareMethod = (method: "native" | "clipboard" | "manual") => {
    try {
      trackEvent?.({ name: "share_click", payload: { contentType: "news", identifier: news.slug, method } })
    } catch {
      // Optional analytics must never interrupt sharing.
    }
  }

  return (
    <div className="news-detail-page">
      <section className="border-b border-border bg-surface-soft">
        <div className="mx-auto max-w-content px-5 py-10 sm:px-8 sm:py-14 lg:px-12 lg:py-16">
          <BlurFade>
            <Breadcrumbs items={[{ label: "Beranda", href: "/" }, { label: "Berita", href: catalogReturnUrl }]} currentLabel={viewModel.title} />
          </BlurFade>

          <article aria-labelledby="news-title" className="mt-10">
            <NewsHeader {...viewModel} />

            <div className="news-detail-content-layout mt-10">
              <div className="news-detail-body">
                <NewsBody bodyHtml={viewModel.bodyHtml} siteOrigin={siteOrigin} />
              </div>

              <aside aria-labelledby="share-title" className="news-detail-share">
                <h2 id="share-title" className="text-heading-5 font-semibold text-brand-teal-deep">Bagikan berita</h2>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">Sebarkan berita informatif ini jika menurutmu bermanfaat</p>
                <div className="mt-5">
                  <ShareButton
                    title={viewModel.title}
                    text={news.excerpt?.trim() || viewModel.title}
                    url={viewModel.shareUrl}
                    contentLabel="berita"
                    dependencies={shareDependencies}
                    onMethodComplete={handleShareMethod}
                  />
                </div>
              </aside>
            </div>
          </article>
        </div>
      </section>

      <div className="px-5 sm:px-8 lg:px-12">
        <RelatedNewsSection news={viewModel.relatedNews} />
      </div>
    </div>
  )
}
