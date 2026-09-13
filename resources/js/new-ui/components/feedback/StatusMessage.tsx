import { AnimatePresence, motion, useReducedMotion } from "motion/react"

type StatusMessageProps = {
  message?: string | null
  busy?: boolean
  busyMessage?: string
}

export function StatusMessage({ message, busy = false, busyMessage = "Memperbarui katalog buku." }: StatusMessageProps) {
  const shouldReduceMotion = useReducedMotion()
  const text = busy ? busyMessage : message

  return (
    <div role="status" aria-live="polite" aria-atomic="true" className="min-h-6 text-sm font-medium text-muted-foreground">
      <AnimatePresence mode="wait">
        <motion.span
          key={text}
          initial={shouldReduceMotion ? false : { opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={shouldReduceMotion ? undefined : { opacity: 0, y: -4 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.2, ease: "easeOut" }}
          className="inline-block"
        >
          {text}
        </motion.span>
      </AnimatePresence>
    </div>
  )
}
