import { BlurFade } from "@/new-ui/components/magicui/BlurFade"
import { Breadcrumbs } from "@/new-ui/components/navigation/Breadcrumbs"
import type { BreadcrumbItem } from "@/new-ui/types/public"

type PageIntroProps = {
  eyebrow?: string
  title: string
  description?: string
  supportingCopy?: string
  breadcrumbs?: BreadcrumbItem[]
  currentLabel?: string
  showBreadcrumbs?: boolean
  tone?: "soft" | "dark" | "catalog"
}

export function PageIntro({ eyebrow, title, description, supportingCopy, breadcrumbs = [{ label: "Beranda", href: "/" }], currentLabel = "Jurnal", showBreadcrumbs = true, tone = "soft" }: PageIntroProps) {
  const isDark = tone === "dark"
  const isCatalog = tone === "catalog"
  return (
    <section className={`journal-intro border-b ${isDark ? "border-brand-teal/60 journal-intro-dark-gradient" : isCatalog ? "border-border journal-intro-catalog-gradient" : "border-border bg-surface-soft"}`}>
      <div className="mx-auto max-w-content px-5 py-14 sm:px-8 sm:py-18 lg:px-12 lg:py-24">
        <BlurFade>
          {showBreadcrumbs ? <Breadcrumbs items={breadcrumbs} currentLabel={currentLabel} tone={isDark ? "dark" : "default"} /> : null}
          <div className={`${showBreadcrumbs ? "mt-10" : "mt-0"} max-w-3xl`}>
            {eyebrow ? <p className={`text-micro-uppercase font-semibold uppercase ${isDark ? "text-brand-green" : "text-brand-green-dark"}`}>{eyebrow}</p> : null}
            <h1 className={`mt-4 text-heading-1 font-semibold tracking-[-0.04em] ${isDark ? "text-on-dark" : "text-brand-teal-deep"}`}>{title}</h1>
            {description ? <p className={`mt-5 max-w-2xl text-lg leading-8 ${isDark ? "text-on-dark-muted" : "text-brand-teal-deep"}`}>{description}</p> : null}
            {supportingCopy ? <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">{supportingCopy}</p> : null}
          </div>
        </BlurFade>
      </div>
    </section>
  )
}
