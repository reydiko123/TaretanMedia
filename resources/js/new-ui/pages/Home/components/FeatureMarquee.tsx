import type { ReactNode } from "react"

import { cn } from "@/new-ui/lib/utils"

type FeatureMarqueeProps = {
  items: string[]
}

type MarqueeProps = {
  children: ReactNode
  className?: string
  repeat?: number
}

function Marquee({ children, className, repeat = 4 }: MarqueeProps) {
  return (
    <div className={cn("group flex gap-(--gap) overflow-hidden p-2 [--duration:40s] [--gap:1rem]", className)}>
      {Array.from({ length: repeat }, (_, index) => (
        <div key={index} className="animate-marquee flex shrink-0 flex-row justify-around gap-(--gap)">
          {children}
        </div>
      ))}
    </div>
  )
}

function FeatureText({ item }: { item: string }) {
  return <span className="shrink-0 whitespace-nowrap text-sm font-medium text-brand-teal-deep">{item}</span>
}

export function FeatureMarquee({ items }: FeatureMarqueeProps) {
  if (items.length === 0) {
    return null
  }

  return (
    <section aria-labelledby="feature-marquee-title" className="border-y border-border bg-background py-4 sm:py-5">
      <h2 id="feature-marquee-title" className="sr-only">
        Fitur Taretan Media
      </h2>
      <div className="mx-auto max-w-content px-5 sm:px-8 lg:px-12">
        <ul className="sr-only" aria-label="Fitur Taretan Media">
          {items.map((item, index) => (
            <li key={`${item}-${index}`}>{item}</li>
          ))}
        </ul>
        <div aria-hidden="true" className="relative min-w-0 overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-background to-transparent sm:w-20" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-background to-transparent sm:w-20" />
          <Marquee repeat={3} className="p-0 [--duration:34s] [--gap:2.5rem]">
              {items.map((item, index) => (
                <FeatureText key={`${item}-${index}`} item={item} />
              ))}
          </Marquee>
        </div>
      </div>
    </section>
  )
}
