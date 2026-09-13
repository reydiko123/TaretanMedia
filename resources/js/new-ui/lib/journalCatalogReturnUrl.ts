import { createCatalogReturnUrl } from "@/new-ui/lib/catalogReturnUrl"

const journalCatalogReturnUrl = createCatalogReturnUrl({
  routePath: "/jurnal",
  storageKey: "taretan:journal-catalog-return-url",
})

export function saveJournalCatalogReturnUrl(url?: string): void {
  journalCatalogReturnUrl.save(url)
}

export function getJournalCatalogReturnUrl(): string {
  return journalCatalogReturnUrl.get()
}
