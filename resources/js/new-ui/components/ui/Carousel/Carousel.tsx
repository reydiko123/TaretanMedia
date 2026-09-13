import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { motion, type PanInfo, useMotionValue } from "motion/react"
import useMeasure from "react-use-measure"
import type { JSX, ReactNode } from "react"

export interface CarouselItem {
  id: string | number
  content: ReactNode
}

export type ResponsiveVisible = { base: number; sm: number; lg: number }

export interface CarouselProps {
  items: CarouselItem[]
  /** Number of items visible at once — fixed number or responsive breakpoints */
  visibleItems?: number | ResponsiveVisible
  autoplay?: boolean
  autoplayDelay?: number
  pauseOnHover?: boolean
  loop?: boolean
}

const DRAG_BUFFER = 0
const VELOCITY_THRESHOLD = 500
const GAP = 16
const SPRING_OPTIONS = { type: "spring" as const, stiffness: 300, damping: 30 }

/* ── breakpoint helper (matches Tailwind v4 defaults) ── */
const SM = 640
const LG = 1024

function resolveVisible(spec: number | ResponsiveVisible, width: number): number {
  if (typeof spec === "number") return spec
  if (width >= LG) return spec.lg
  if (width >= SM) return spec.sm
  return spec.base
}

function useWindowWidth() {
  const [width, setWidth] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth : LG,
  )
  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth)
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [])
  return width
}

/* ── main component ── */

export function Carousel({
  items,
  visibleItems = 1,
  autoplay = false,
  autoplayDelay = 3000,
  pauseOnHover = false,
  loop = false,
}: CarouselProps): JSX.Element {
  /* measure container width */
  const [measureRef, bounds] = useMeasure()
  const containerWidth = bounds.width || 0

  /* responsive visible count */
  const windowWidth = useWindowWidth()
  const visible = resolveVisible(visibleItems, windowWidth)

  /* derived sizes */
  const itemWidth =
    containerWidth > 0
      ? (containerWidth - GAP * (visible - 1)) / visible
      : 0
  const trackItemOffset = itemWidth + GAP

  /* build render array with clone buffer for loop */
  const itemsForRender = useMemo(() => {
    if (!loop || items.length === 0) return items
    const cloneCount = visible
    const headClones = items.slice(-cloneCount)
    const tailClones = items.slice(0, cloneCount)
    return [...headClones, ...items, ...tailClones]
  }, [items, loop, visible])

  const cloneOffset = loop ? visible : 0

  /* position state */
  const [position, setPosition] = useState<number>(cloneOffset)
  const x = useMotionValue(0)
  const [isHovered, setIsHovered] = useState(false)
  const [isJumping, setIsJumping] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  /* hover detection */
  const containerRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!pauseOnHover || !containerRef.current) return
    const el = containerRef.current
    const enter = () => setIsHovered(true)
    const leave = () => setIsHovered(false)
    el.addEventListener("mouseenter", enter)
    el.addEventListener("mouseleave", leave)
    return () => {
      el.removeEventListener("mouseenter", enter)
      el.removeEventListener("mouseleave", leave)
    }
  }, [pauseOnHover])

  /* autoplay */
  useEffect(() => {
    if (!autoplay || items.length <= visible) return
    if (pauseOnHover && isHovered) return

    const timer = setInterval(() => {
      setPosition((prev) => prev + 1)
    }, autoplayDelay)

    return () => clearInterval(timer)
  }, [autoplay, autoplayDelay, isHovered, pauseOnHover, items.length, visible])

  /* sync position when items/visible change */
  useEffect(() => {
    const start = loop ? visible : 0
    setPosition(start)
    x.set(-start * trackItemOffset)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items.length, loop, visible, trackItemOffset])

  /* clamp for non-loop */
  useEffect(() => {
    if (!loop) {
      const maxPos = Math.max(0, itemsForRender.length - visible)
      if (position > maxPos) setPosition(maxPos)
    }
  }, [itemsForRender.length, loop, position, visible])

  const effectiveTransition = isJumping ? { duration: 0 } : SPRING_OPTIONS

  const handleAnimationStart = () => setIsAnimating(true)

  const handleAnimationComplete = useCallback(() => {
    if (!loop || items.length === 0) {
      setIsAnimating(false)
      return
    }

    const lastValidIndex = items.length + cloneOffset - 1
    const firstOriginal = cloneOffset

    /* scrolled past tail clones → jump back to beginning */
    if (position > lastValidIndex) {
      setIsJumping(true)
      const target = firstOriginal + (position - lastValidIndex - 1)
      setPosition(target)
      x.set(-target * trackItemOffset)
      requestAnimationFrame(() => {
        setIsJumping(false)
        setIsAnimating(false)
      })
      return
    }

    /* scrolled before head clones → jump to end */
    if (position < firstOriginal) {
      setIsJumping(true)
      const target = lastValidIndex - (firstOriginal - position - 1)
      setPosition(target)
      x.set(-target * trackItemOffset)
      requestAnimationFrame(() => {
        setIsJumping(false)
        setIsAnimating(false)
      })
      return
    }

    setIsAnimating(false)
  }, [loop, items.length, cloneOffset, position, trackItemOffset, x])

  /* drag */
  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo): void => {
    const { offset, velocity } = info
    const direction =
      offset.x < -DRAG_BUFFER || velocity.x < -VELOCITY_THRESHOLD
        ? 1
        : offset.x > DRAG_BUFFER || velocity.x > VELOCITY_THRESHOLD
          ? -1
          : 0
    if (direction === 0) return

    setPosition((prev) => {
      const next = prev + direction
      if (loop) return next
      const max = Math.max(0, itemsForRender.length - visible)
      return Math.max(0, Math.min(next, max))
    })
  }

  const dragProps = loop
    ? {}
    : {
        dragConstraints: {
          left: -trackItemOffset * Math.max(itemsForRender.length - visible, 0),
          right: 0,
        },
      }

  /* active dot index (maps to original items array) */
  const activeIndex =
    items.length === 0
      ? 0
      : loop
        ? ((position - cloneOffset) % items.length + items.length) % items.length
        : Math.min(position, items.length - 1)

  if (items.length === 0 || containerWidth === 0) {
    return <div ref={measureRef} className="w-full" />
  }

  return (
    <div ref={containerRef} className="relative w-full overflow-hidden">
      <div ref={measureRef} className="w-full">
        <motion.div
          className="flex"
          drag={isAnimating ? false : "x"}
          {...dragProps}
          style={{
            gap: `${GAP}px`,
            x,
          }}
          onDragEnd={handleDragEnd}
          animate={{ x: -(position * trackItemOffset) }}
          transition={effectiveTransition}
          onAnimationStart={handleAnimationStart}
          onAnimationComplete={handleAnimationComplete}
        >
          {itemsForRender.map((item, index) => (
            <motion.div
              key={`${item.id}-${index}`}
              className="relative flex shrink-0 flex-col overflow-hidden rounded-[1.65rem] border border-border bg-background cursor-grab active:cursor-grabbing"
              style={{ width: itemWidth }}
              transition={effectiveTransition}
            >
              {item.content}
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* dot indicators */}
      <div className="flex w-full justify-center">
        <div className="mt-5 flex gap-2">
          {items.map((_, index) => (
            <motion.button
              type="button"
              key={index}
              aria-label={`Ke item ${index + 1}`}
              aria-current={activeIndex === index}
              className={`h-2 w-2 cursor-pointer appearance-none rounded-full border-0 p-0 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                activeIndex === index ? "bg-brand-teal-deep" : "bg-border"
              }`}
              animate={{ scale: activeIndex === index ? 1.2 : 1 }}
              onClick={() => setPosition(loop ? index + cloneOffset : index)}
              transition={{ duration: 0.15 }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
