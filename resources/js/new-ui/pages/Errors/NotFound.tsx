import { ErrorPage } from "@/new-ui/components/feedback/ErrorPage"
import { ERROR_PAGE_CONTENT } from "@/new-ui/pages/Errors/errorPageContent"

export type NotFoundPageProps = {
  homeHref?: "/"
  catalogHref?: "/buku"
}

export function NotFoundPage({ homeHref = "/", catalogHref = "/buku" }: NotFoundPageProps = {}) {
  const content = ERROR_PAGE_CONTENT[404]

  return (
    <ErrorPage
      status={content.status}
      title={content.title}
      description={content.description}
      primaryAction={{ kind: "link", label: "Kembali ke beranda", href: homeHref }}
      secondaryAction={{ kind: "link", label: "Lihat katalog buku", href: catalogHref }}
    />
  )
}
