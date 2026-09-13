import type { NavigationItem } from "@/new-ui/types/navigation"

function normalizePath(path: string) {
  const normalizedPath = path.replace(/\/+$/, "")
  return normalizedPath || "/"
}

export function matchesNavigationItem(itemHref: string, currentPath: string) {
  const normalizedItemHref = normalizePath(itemHref)
  if (normalizedItemHref === "/buku") {
    return currentPath === normalizedItemHref || currentPath.startsWith("/buku/")
  }

  if (normalizedItemHref === "/jurnal") {
    return currentPath === normalizedItemHref || currentPath.startsWith("/jurnal/")
  }

  if (normalizedItemHref === "/berita") {
    return currentPath === normalizedItemHref || currentPath.startsWith("/berita/")
  }

  return normalizedItemHref === currentPath
}

export function getCurrentHref(navigation: NavigationItem[]) {
  if (typeof window === "undefined") return navigation[0]?.href ?? "/"

  const currentPath = normalizePath(window.location.pathname)
  return navigation.find((item) => matchesNavigationItem(item.href, currentPath))?.href ?? navigation[0]?.href ?? "/"
}
