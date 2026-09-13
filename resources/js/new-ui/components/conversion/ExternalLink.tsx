import { ExternalLink as ExternalLinkIcon } from "lucide-react"
import { motion } from "motion/react"
import type { ReactNode } from "react"

type ExternalLinkProps = {
  href: string
  children: ReactNode
  accessibleLabel?: string
  onActivate?: () => void
  className?: string
}

export function ExternalLink({ href, children, accessibleLabel, onActivate, className }: ExternalLinkProps) {
  const fallbackLabel = typeof children === "string" ? children : "Buka tautan eksternal"
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={accessibleLabel ?? `${fallbackLabel} (buka di tab baru)`}
      onClick={onActivate}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      className={className}
    >
      <span>{children}</span>
      <ExternalLinkIcon className="size-4 shrink-0" aria-hidden="true" />
    </motion.a>
  )
}
