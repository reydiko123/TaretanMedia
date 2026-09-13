import { Check, Clipboard, LoaderCircle, Share2 } from "lucide-react"
import { motion } from "motion/react"
import { useRef, useState } from "react"
import { shareOrCopy, shareOrCopyNews, type ShareDependencies } from "@/new-ui/lib/sharing"

type ShareButtonProps = {
  title: string
  url: string | null
  text?: string
  contentLabel?: "buku" | "berita"
  dependencies?: ShareDependencies
  onResult?: (result: "shared" | "copied" | "failed") => void
  onMethodComplete?: (method: "native" | "clipboard" | "manual") => void
}

const resultCopy = {
  shared: "Pilihan berbagi telah dibuka.",
  copied: "Tautan telah disalin.",
  failed: "Tautan belum dapat disalin.",
} as const

export function ShareButton({ title, url, text, contentLabel = "buku", dependencies, onResult, onMethodComplete }: ShareButtonProps) {
  const [isPending, setIsPending] = useState(false)
  const [result, setResult] = useState<keyof typeof resultCopy | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const isNews = contentLabel === "berita"
  const buttonLabel = isNews ? "Bagikan berita" : "Bagikan"
  const unavailableLabel = `Tautan ${contentLabel} belum tersedia.`
  const copiedLabel = `Tautan ${contentLabel} telah disalin.`
  const inputLabel = `Tautan ${contentLabel}`
  const failedLabel = isNews ? "Tautan belum dapat disalin otomatis." : resultCopy.failed

  const handleShare = async () => {
    if (isPending || !url) return
    setIsPending(true)
    const nextResult = isNews
      ? await shareOrCopyNews({ title, text: text?.trim() || title, url }, dependencies)
      : await shareOrCopy({ title, url }, dependencies)

    if (nextResult === "cancelled") {
      setResult(null)
    } else {
      setResult(nextResult)
      onResult?.(nextResult)
      if (nextResult === "shared") onMethodComplete?.("native")
      if (nextResult === "copied") onMethodComplete?.("clipboard")
    }
    setIsPending(false)
  }

  if (!url) {
    return <p className="text-sm leading-6 text-muted-foreground">{unavailableLabel}</p>
  }

  return (
    <div className="flex flex-col items-start gap-3">
      <motion.button
        type="button"
        onClick={handleShare}
        disabled={isPending}
        aria-busy={isPending}
        aria-label={buttonLabel}
        whileHover={isPending ? undefined : { y: -2 }}
        whileTap={isPending ? undefined : { scale: 0.98 }}
        transition={{ duration: 0.18, ease: "easeOut" }}
        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-border bg-card px-6 text-sm font-semibold text-brand-teal-deep transition-colors hover:border-brand-green-dark/40 hover:bg-surface-feature disabled:cursor-wait disabled:opacity-60 focus-visible:outline-offset-4"
      >
        {isPending ? <LoaderCircle className="size-4 animate-spin" aria-hidden="true" /> : result === "copied" ? <Check className="size-4 text-brand-green-dark" aria-hidden="true" /> : <Share2 className="size-4" aria-hidden="true" />}
        {isPending ? "Menyiapkan tautan…" : result === "copied" ? "Tautan disalin" : buttonLabel}
      </motion.button>

      <div className="min-h-5" role="status" aria-live="polite" aria-atomic="true">
        {result ? <p className="text-xs leading-5 text-muted-foreground">{result === "copied" ? copiedLabel : result === "failed" ? failedLabel : resultCopy[result]}</p> : null}
      </div>

      {result === "failed" ? (
        <div className="flex w-full max-w-xl flex-col gap-2 sm:flex-row">
          <label className="sr-only" htmlFor={`${contentLabel}-share-url`}>{inputLabel}</label>
          <input ref={inputRef} id={`${contentLabel}-share-url`} value={url} readOnly className="min-h-11 min-w-0 flex-1 rounded-xl border border-border bg-background px-3 text-xs text-muted-foreground outline-none focus-visible:ring-2 focus-visible:ring-brand-green-dark" />
          <button type="button" onClick={() => { inputRef.current?.select(); onMethodComplete?.("manual") }} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-border px-4 text-xs font-semibold text-brand-teal-deep transition-colors hover:bg-surface-feature focus-visible:outline-offset-2">
            <Clipboard className="size-3.5" aria-hidden="true" />
            Pilih tautan
          </button>
        </div>
      ) : null}
    </div>
  )
}
