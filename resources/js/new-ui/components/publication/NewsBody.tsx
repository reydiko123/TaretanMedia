import { motion } from "motion/react"
import { useEffect, useRef } from "react"
import { hardenNewsBodyLinks } from "@/new-ui/lib/newsDetail"

type NewsBodyProps = {
  bodyHtml: string | null
  siteOrigin: string
}

export function NewsBody({ bodyHtml, siteOrigin }: NewsBodyProps) {
  const bodyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (bodyRef.current && bodyHtml) hardenNewsBodyLinks(bodyRef.current, siteOrigin)
  }, [bodyHtml, siteOrigin])

  if (!bodyHtml?.trim()) {
    return <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, ease: "easeOut" }} className="news-body-empty text-base leading-7 text-muted-foreground">Isi berita belum tersedia.</motion.p>
  }

  return (
    <motion.div
      ref={bodyRef}
      className="news-prose"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.1, ease: "easeOut" }}
      dangerouslySetInnerHTML={{ __html: bodyHtml }}
    />
  )
}
