import { motion } from "motion/react"

type BookLongTextSectionProps = {
  heading: string
  content?: string | null
}

export function BookLongTextSection({ heading, content }: BookLongTextSectionProps) {
  if (!content?.trim()) return null

  return (
    <motion.section initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.4, ease: "easeOut" }} aria-labelledby={`book-section-${heading.toLowerCase().replaceAll(" ", "-")}`} className="book-detail-long-text">
      <h2 id={`book-section-${heading.toLowerCase().replaceAll(" ", "-")}`} className="text-2xl font-semibold tracking-[-0.04em] text-brand-teal-deep">{heading}</h2>
      <p className="mt-4 whitespace-pre-line break-words text-base leading-8 text-muted-foreground">{content.trim()}</p>
    </motion.section>
  )
}
