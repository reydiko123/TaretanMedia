import { motion } from "motion/react"
import type { AuthorSummary } from "@/new-ui/types/public"

type AuthorProfilesProps = {
  authors: AuthorSummary[]
}

export function AuthorProfiles({ authors }: AuthorProfilesProps) {
  const validAuthors = authors.filter((author) => author.name.trim())
  if (validAuthors.length === 0) return null

  return (
    <motion.section initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.4, ease: "easeOut" }} aria-labelledby="book-authors-heading" className="book-detail-authors">
      <h2 id="book-authors-heading" className="text-2xl font-semibold tracking-[-0.04em] text-brand-teal-deep">Tentang Penulis</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {validAuthors.map((author, index) => (
          <motion.article key={author.id} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.32, delay: index * 0.06, ease: "easeOut" }} className="rounded-2xl border border-border bg-card p-5">
            <h3 className="text-lg font-semibold tracking-[-0.03em] text-brand-teal-deep">{author.name.trim()}</h3>
            {author.about?.trim() ? <p className="mt-3 whitespace-pre-line text-sm leading-7 text-muted-foreground">{author.about.trim()}</p> : null}
          </motion.article>
        ))}
      </div>
    </motion.section>
  )
}
