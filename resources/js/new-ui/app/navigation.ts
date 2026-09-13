export type NavigationVisitOptions = {
  preserveScroll?: boolean
  preserveState?: boolean
}

export type PublicNavigation = {
  visit: (href: string, options?: NavigationVisitOptions) => void
  isNavigating: boolean
}

export const localNavigation: PublicNavigation = {
  visit: (href) => window.location.assign(href),
  isNavigating: false,
}
