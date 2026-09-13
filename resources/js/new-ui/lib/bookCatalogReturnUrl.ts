import { createCatalogReturnUrl } from "@/new-ui/lib/catalogReturnUrl"

const bookCatalogReturnUrl = createCatalogReturnUrl({
  routePath: "/buku",
  storageKey: "taretan:book-catalog-return-url",
})

export function saveBookCatalogReturnUrl(url?: string): void {
  bookCatalogReturnUrl.save(url)
}

export function getBookCatalogReturnUrl(): string {
  return bookCatalogReturnUrl.get()
}
