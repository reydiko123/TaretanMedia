import { motion } from "motion/react"

type LoadingSkeletonProps = {
  count?: number
}

export function LoadingSkeleton({ count = 3 }: LoadingSkeletonProps) {
  return (
    <div aria-hidden="true" className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: Math.min(Math.max(count, 1), 6) }).map((_, index) => (
        <motion.div key={index} data-testid="news-card-skeleton" initial={{ opacity: 0.55 }} animate={{ opacity: [0.55, 0.9, 0.55] }} transition={{ duration: 1.4, repeat: Infinity, delay: index * 0.08 }} className="overflow-hidden rounded-xl border border-border bg-card p-3">
          <div className="aspect-[16/10] rounded-lg bg-surface-soft" />
          <div className="space-y-3 p-2 pt-5">
            <div className="h-3 w-24 rounded-full bg-surface-soft" />
            <div className="h-5 w-11/12 rounded-full bg-surface-soft" />
            <div className="h-4 w-3/4 rounded-full bg-surface-soft" />
            <div className="h-4 w-28 rounded-full bg-surface-soft" />
          </div>
        </motion.div>
      ))}
    </div>
  )
}
