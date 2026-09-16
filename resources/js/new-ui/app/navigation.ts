import { router } from "@inertiajs/react"

export type NavigationVisitOptions = {
  preserveScroll?: boolean
  preserveState?: boolean
}

export type PublicNavigation = {
  visit: (href: string, options?: NavigationVisitOptions) => void
  isNavigating: boolean
}

export const localNavigation: PublicNavigation = {
  visit: (href, options) => router.visit(href, options),
  isNavigating: false,
}
