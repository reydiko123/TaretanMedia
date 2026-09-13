import { createCatalogReturnUrl } from "@/new-ui/lib/catalogReturnUrl"

const newsCatalogReturnUrl = createCatalogReturnUrl({
  routePath: "/berita",
  storageKey: "taretan:news-catalog-return-url",
})

export function saveNewsCatalogReturnUrl(url?: string): void {
  newsCatalogReturnUrl.save(url)
}

export function getNewsCatalogReturnUrl(): string {
  return newsCatalogReturnUrl.get()
}
