import { motion } from "motion/react"
import { useEffect, useState } from "react"
import { Link } from "@inertiajs/react"
import { cn } from "@/new-ui/lib/utils"
import { getCurrentHref } from "@/new-ui/components/layout/navigationState"
import type { NavigationItem } from "@/new-ui/types/navigation"

type NavMenuProps = {
  navigation: NavigationItem[]
  onNavigate?: () => void
}

export function NavMenu({ navigation, onNavigate }: NavMenuProps) {
  const [activeHref, setActiveHref] = useState(() => getCurrentHref(navigation))

  useEffect(() => {
    const syncActiveRoute = () => setActiveHref(getCurrentHref(navigation))

    window.addEventListener("popstate", syncActiveRoute)
    document.addEventListener("inertia:navigate", syncActiveRoute)

    return () => {
      window.removeEventListener("popstate", syncActiveRoute)
      document.removeEventListener("inertia:navigate", syncActiveRoute)
    }
  }, [navigation])

  const handleClick = (item: NavigationItem) => {
    setActiveHref(item.href)
    onNavigate?.()
  }

  return (
    <nav aria-label="Navigasi utama" className="hidden flex-1 lg:block">
      <ul className="mx-auto flex h-11 w-fit items-center justify-center rounded-full px-1">
        {navigation.map((item) => {
          const isActive = item.href === activeHref

          return (
            <li
              key={item.id}
              className={cn(
                "relative flex h-full cursor-pointer items-center justify-center px-3 py-2 text-sm font-medium tracking-tight transition-colors duration-200 xl:px-4",
                isActive ? "text-brand-green-dark" : "text-muted-foreground hover:text-brand-green-dark",
              )}
            >
              {isActive ? (
                <motion.span
                  layoutId="desktop-nav-indicator"
                  aria-hidden="true"
                  transition={{ type: "spring", stiffness: 420, damping: 32 }}
                  className="pointer-events-none absolute inset-1.5 rounded-full border border-border bg-accent/70"
                />
              ) : null}
              <Link
                href={item.href}
                onClick={() => handleClick(item)}
                aria-current={isActive ? "page" : undefined}
                className="relative z-10 whitespace-nowrap"
              >
                {item.label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
