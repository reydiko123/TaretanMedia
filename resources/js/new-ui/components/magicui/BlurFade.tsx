import type { ReactNode } from "react"
import { motion, useInView, useReducedMotion, type Variants } from "motion/react"
import { useRef } from "react"

type BlurFadeProps = {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
  yOffset?: number
  inView?: boolean
}

export function BlurFade({ children, className, delay = 0, duration = 0.45, yOffset = 12, inView = true }: BlurFadeProps) {
  const ref = useRef<HTMLDivElement>(null)
  const visible = useInView(ref, { once: true, amount: 0.15 })
  const shouldReduceMotion = useReducedMotion()
  const variants: Variants = {
    hidden: { opacity: 0, y: yOffset, filter: "blur(6px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)" },
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={variants}
      initial={shouldReduceMotion ? false : "hidden"}
      animate={shouldReduceMotion || (inView && visible) ? "visible" : "hidden"}
      transition={{ duration: shouldReduceMotion ? 0 : duration, delay: shouldReduceMotion ? 0 : delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  )
}
