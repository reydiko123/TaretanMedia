import { motion, useReducedMotion } from "motion/react"
import type { BreadcrumbItem } from "@/new-ui/types/public"

type BreadcrumbsProps = {
  items: BreadcrumbItem[]
  currentLabel: string
  tone?: "default" | "dark"
}

export function Breadcrumbs({ items, currentLabel, tone = "default" }: BreadcrumbsProps) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.nav aria-label="Breadcrumb" className="book-detail-breadcrumbs" initial={shouldReduceMotion ? false : { opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: shouldReduceMotion ? 0 : 0.3, ease: "easeOut" }}>
      <ol className={`flex flex-wrap items-center gap-2 text-sm ${tone === "dark" ? "text-on-dark-muted" : "text-muted-foreground"}`}>
        {items.map((item) => (
          <li key={`${item.href}-${item.label}`} className="flex items-center gap-2">
            {item.href ? <a href={item.href} className={`rounded-sm transition-colors ${tone === "dark" ? "hover:text-brand-green" : "hover:text-brand-green-dark"}`}>{item.label}</a> : item.label}
            <span aria-hidden="true" className={tone === "dark" ? "text-on-dark-muted/60" : "text-border"}>/</span>
          </li>
        ))}
        <li aria-current="page" className={`min-w-0 max-w-full truncate font-medium ${tone === "dark" ? "text-on-dark" : "text-brand-teal-deep"}`}>{currentLabel}</li>
      </ol>
    </motion.nav>
  )
}
