import { ErrorPage } from "@/new-ui/components/feedback/ErrorPage"
import { ERROR_PAGE_CONTENT } from "@/new-ui/pages/Errors/errorPageContent"

export type ServerErrorPageProps = {
  homeHref?: "/"
  onReload?: () => void
}

export function ServerErrorPage({ homeHref = "/", onReload }: ServerErrorPageProps = {}) {
  const content = ERROR_PAGE_CONTENT[500]
  const handleReload = onReload ?? (() => window.location.reload())

  return (
    <ErrorPage
      status={content.status}
      title={content.title}
      description={content.description}
      primaryAction={{ kind: "button", label: "Coba muat ulang", onActivate: handleReload }}
      secondaryAction={{ kind: "link", label: "Kembali ke beranda", href: homeHref }}
    />
  )
}
