import { motion } from "motion/react"
import type { AuthorSummary } from "@/new-ui/types/public"

type AuthorListProps = {
  authors: AuthorSummary[]
  prefix?: string
}

export function AuthorList({ authors, prefix = "Oleh" }: AuthorListProps) {
  const names = authors.map((author) => author.name.trim()).filter(Boolean)
  if (names.length === 0) return null

  return (
    <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.08, ease: "easeOut" }} className="text-base leading-7 text-muted-foreground">
      <span className="font-medium text-brand-teal-deep">{prefix} </span>
      {names.map((name, index) => (
        <span key={`${name}-${index}`}>
          {index > 0 ? (index === names.length - 1 ? " dan " : ", ") : ""}
          {name}
        </span>
      ))}
    </motion.p>
  )
}
