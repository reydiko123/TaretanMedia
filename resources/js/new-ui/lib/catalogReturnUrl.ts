export type CatalogReturnUrlOptions = {
  /** The plain catalog route path this instance manages, e.g. "/buku". */
  routePath: string
  /** A unique sessionStorage key for this catalog, e.g. "taretan:book-catalog-return-url". */
  storageKey: string
}

export type CatalogReturnUrl = {
  /**
   * Persists the current catalog URL (pathname + query string) so the
   * detail page can send users back to the exact filtered view they came
   * from. Safe to call even when sessionStorage is unavailable (e.g.
   * private browsing) or during SSR/tests without a `window`.
   */
  save: (url?: string) => void
  /**
   * Reads back the last saved catalog URL. Falls back to the plain
   * catalog route when nothing was saved or the stored value looks
   * invalid (e.g. tampered with or pointing outside the catalog route).
   */
  get: () => string
}

function getSessionStorage(): Storage | null {
  try {
    return window.sessionStorage
  } catch {
    return null
  }
}

export function createCatalogReturnUrl({ routePath, storageKey }: CatalogReturnUrlOptions): CatalogReturnUrl {
  const validReturnUrlPattern = new RegExp(`^${routePath.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(\\?.*)?$`)

  function save(url: string = `${window.location.pathname}${window.location.search}`): void {
    const storage = getSessionStorage()
    if (!storage) return

    try {
      storage.setItem(storageKey, url)
    } catch {
      // Ignore quota or access errors; falling back to the default catalog URL is acceptable.
    }
  }

  function get(): string {
    const storage = getSessionStorage()
    if (!storage) return routePath

    let stored: string | null
    try {
      stored = storage.getItem(storageKey)
    } catch {
      return routePath
    }

    if (!stored || !validReturnUrlPattern.test(stored)) return routePath

    return stored
  }

  return { save, get }
}
