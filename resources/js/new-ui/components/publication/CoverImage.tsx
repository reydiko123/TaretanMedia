import { useState } from "react"
import { BookmarkPlus } from "lucide-react"
import { motion, useReducedMotion } from "motion/react"
import { cn } from "@/new-ui/lib/utils"
import type { ImageAsset } from "@/new-ui/types/public"

const fallbackTones = [
  "bg-brand-teal-deep text-on-dark",
  "bg-brand-green-dark text-on-dark",
  "bg-accent-purple text-on-dark",
  "bg-accent-orange text-brand-teal-deep",
]

type CoverImageProps = {
  image?: ImageAsset | null
  title: string
  index?: number
  className?: string
  loading?: "eager" | "lazy"
  fallbackLabel?: string
  fallbackTitle?: string
  showFallbackTitle?: boolean
  showFallbackLabel?: boolean
}

export function CoverImage({ image, title, index = 0, className, loading = "lazy", fallbackLabel = "Buku", fallbackTitle, showFallbackTitle = true, showFallbackLabel = true }: CoverImageProps) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null)
  const [loaded, setLoaded] = useState(false)
  const shouldReduceMotion = useReducedMotion()
  const showFallback = !image?.src || failedSrc === image.src

  return (
    <div className={cn("catalog-cover aspect-[2/3] overflow-hidden rounded-xl bg-surface", className)}>
      {showFallback ? (
        <motion.div
          role="img"
          aria-label={`Sampul ${fallbackLabel.toLowerCase()} ${title}`}
          initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.3, ease: "easeOut" }}
          className={cn("flex h-full flex-col justify-between p-5", fallbackTones[index % fallbackTones.length])}
        >
          <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.16em] opacity-80">
            <span>CV Taretan Media Publishing</span>
            <BookmarkPlus className="size-4" aria-hidden="true" />
          </div>
          {showFallbackTitle ? <p className="max-w-[12rem] text-2xl font-semibold leading-[0.98] tracking-[-0.06em]">{fallbackTitle ?? title}</p> : null}
          {showFallbackLabel ? <p className="text-[10px] font-medium uppercase tracking-[0.14em] opacity-80">{fallbackLabel}</p> : null}
        </motion.div>
      ) : (
        <motion.img
          src={image.src}
          alt={image.alt || `Sampul ${fallbackLabel.toLowerCase()} ${title}`}
          width={image.width ?? 400}
          height={image.height ?? 600}
          loading={loading}
          decoding="async"
          onError={() => setFailedSrc(image.src)}
          onLoad={() => setLoaded(true)}
          initial={shouldReduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: shouldReduceMotion || loaded ? 1 : 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.3, ease: "easeOut" }}
          className="size-full object-cover"
        />
      )}
    </div>
  )
}
