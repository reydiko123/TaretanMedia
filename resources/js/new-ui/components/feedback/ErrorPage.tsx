import { AlertTriangle, Compass } from "lucide-react"
import { motion, useReducedMotion } from "motion/react"

import type { ErrorStatus } from "@/new-ui/pages/Errors/errorPageContent"

export type ErrorPageAction =
  | { kind: "link"; label: string; href: "/" | "/buku" }
  | { kind: "button"; label: string; onActivate: () => void }

export type ErrorPageProps = {
  status: ErrorStatus
  title: string
  description: string
  primaryAction: ErrorPageAction
  secondaryAction: ErrorPageAction
}

const STATUS_ICON: Record<ErrorStatus, typeof Compass> = {
  404: Compass,
  500: AlertTriangle,
}

function ActionControl({ action, variant }: { action: ErrorPageAction; variant: "primary" | "secondary" }) {
  const className =
    variant === "primary"
      ? "inline-flex min-h-11 w-full items-center justify-center rounded-full bg-brand-green px-6 text-sm font-semibold text-on-primary transition-colors hover:bg-primary-deep sm:w-auto"
      : "inline-flex min-h-11 w-full items-center justify-center rounded-full border border-border px-6 text-sm font-semibold text-brand-teal-deep transition-colors hover:bg-accent sm:w-auto"

  if (action.kind === "link") {
    return (
      <a href={action.href} className={className}>
        {action.label}
      </a>
    )
  }

  return (
    <button type="button" onClick={action.onActivate} className={className}>
      {action.label}
    </button>
  )
}

export function ErrorPage({ status, title, description, primaryAction, secondaryAction }: ErrorPageProps) {
  const shouldReduceMotion = useReducedMotion()
  const Icon = STATUS_ICON[status]

  return (
    <section aria-labelledby="error-page-title" className="bg-background">
      <div className="mx-auto flex max-w-content flex-col items-center px-5 py-24 text-center sm:px-8 sm:py-28 lg:px-12 lg:py-32">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.35, ease: "easeOut" }}
          className="w-full max-w-xl"
        >
          <p aria-hidden="true" className="text-micro-uppercase font-semibold uppercase tracking-[0.18em] text-brand-green-dark">Error {status}</p>

          <span className="mt-6 inline-flex size-14 items-center justify-center rounded-full bg-surface-feature text-brand-green-dark">
            <Icon aria-hidden="true" className="size-7" />
          </span>

          <h1 id="error-page-title" className="mt-6 text-heading-1 font-semibold tracking-[-0.04em] text-brand-teal-deep">{title}</h1>
          <p className="mx-auto mt-4 max-w-md text-base leading-7 text-muted-foreground">{description}</p>

          <div aria-label="Pilihan pemulihan" className="mt-8 flex w-full flex-col justify-center gap-3 sm:flex-row">
            <ActionControl action={primaryAction} variant="primary" />
            <ActionControl action={secondaryAction} variant="secondary" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
