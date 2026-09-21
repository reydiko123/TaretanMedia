import type { ReactNode } from "react"
import { SiteHeader } from "@/new-ui/components/layout/SiteHeader"
import { HomeContactFooter } from "@/new-ui/pages/Home/components/HomeContactFooter"
import { publicNavigation } from "@/new-ui/config/publicNavigation"
import { homeContact } from "@/new-ui/pages/Home/data/homeContact"
import type { HomeContact } from "@/new-ui/pages/Home/data/homeTypes"

type AppShellProps = {
  children: ReactNode
  brandName?: string
  contact?: HomeContact
  showHeader?: boolean
}

export function AppShell({
  children,
  brandName = "CV Taretan Media Publishing",
  contact = homeContact,
  showHeader = true,
}: AppShellProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {showHeader ? <SiteHeader brandName={brandName} navigation={publicNavigation} /> : null}
      <main id="main-content">{children}</main>
      <HomeContactFooter contact={contact} />
    </div>
  )
}
