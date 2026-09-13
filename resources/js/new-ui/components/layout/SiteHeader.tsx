import { AnimatePresence, motion, useScroll } from "motion/react"
import { Menu, X } from "lucide-react"
import { useEffect, useState } from "react"
import taretanLogo from "@/new-ui/assets/taretan-media.svg"
import { NavMenu } from "@/new-ui/components/layout/NavMenu"
import { getCurrentHref } from "@/new-ui/components/layout/navigationState"
import { getHeaderMaxWidth } from "@/new-ui/components/layout/siteHeaderLayout"
import { cn } from "@/new-ui/lib/utils"
import type { NavigationItem } from "@/new-ui/types/navigation"

type SiteHeaderProps = {
  brandName: string
  navigation: NavigationItem[]
}

const drawerVariants = {
  hidden: { opacity: 0, y: 100 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, damping: 18, stiffness: 220, staggerChildren: 0.035 },
  },
  exit: { opacity: 0, y: 100, transition: { duration: 0.16 } },
}

const drawerItemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
}

export function SiteHeader({ brandName, navigation }: SiteHeaderProps) {
  const { scrollY } = useScroll()
  const [hasScrolled, setHasScrolled] = useState(false)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [activeHref, setActiveHref] = useState(() => getCurrentHref(navigation))

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (latest) => {
      setHasScrolled((previous) => {
        const next = latest > 12
        return previous === next ? previous : next
      })
    })

    return unsubscribe
  }, [scrollY])

  useEffect(() => {
    const syncActiveRoute = () => setActiveHref(getCurrentHref(navigation))

    window.addEventListener("popstate", syncActiveRoute)
    document.addEventListener("inertia:navigate", syncActiveRoute)

    return () => {
      window.removeEventListener("popstate", syncActiveRoute)
      document.removeEventListener("inertia:navigate", syncActiveRoute)
    }
  }, [navigation])

  useEffect(() => {
    if (!isDrawerOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsDrawerOpen(false)
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [isDrawerOpen])

  const closeDrawer = () => setIsDrawerOpen(false)

  return (
    <header
      className={`sticky z-50 flex justify-center transition-all duration-300 ${hasScrolled ? "top-5 mx-3 sm:mx-5" : "top-3 mx-2 sm:mx-3"}`}
    >
      <motion.div
        initial={false}
        animate={{ maxWidth: getHeaderMaxWidth(hasScrolled) }}
        transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
        className="w-[calc(100vw-1rem)] max-w-[70rem]"
      >
        <div
          className={`mx-auto transition-all duration-300 ${hasScrolled ? "rounded-2xl border border-border bg-background/80 px-2 shadow-card backdrop-blur-xl" : "rounded-2xl bg-background/65 px-2 shadow-subtle backdrop-blur-md sm:px-4"}`}
        >
          <div className="flex min-h-14 items-center justify-between gap-3 p-2 sm:p-3">
            <a href="/" className="group flex shrink-0 items-center gap-2.5" aria-label={`${brandName}, kembali ke beranda`}>
              <img src={taretanLogo} alt="" aria-hidden="true" className="size-9 shrink-0 object-contain transition-transform duration-200 group-hover:scale-[1.03] sm:size-10" />
              <span className="flex min-w-0 flex-col justify-center leading-tight">
                <span className="text-sm font-semibold tracking-[-0.04em] text-brand-green-dark sm:text-base">{brandName}</span>
                <span className="text-[9px] font-medium tracking-[-0.01em] text-muted-foreground sm:text-[10px]">Penerbit Buku &amp; Publikasi Ilmiah</span>
              </span>
            </a>

            <NavMenu navigation={navigation} />

            <div className="flex shrink-0 items-center gap-2 sm:gap-3">
              <a
                href="/kirim-naskah"
                className="hidden min-h-10 items-center justify-center rounded-full bg-primary px-4 text-sm font-medium tracking-wide text-secondary-foreground shadow-subtle transition-all hover:bg-secondary/80 active:scale-95 lg:flex"
              >
                Kirim Naskah
              </a>
              <button
                type="button"
                className="grid size-10 cursor-pointer place-items-center rounded-md border border-border bg-background/70 transition-colors hover:bg-accent lg:hidden"
                aria-label={isDrawerOpen ? "Tutup menu" : "Buka menu"}
                aria-expanded={isDrawerOpen}
                aria-controls="mobile-navigation"
                onClick={() => setIsDrawerOpen((open) => !open)}
              >
                {isDrawerOpen ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {isDrawerOpen ? (
          <>
            <motion.button
              type="button"
              aria-label="Tutup menu navigasi"
              className="fixed inset-0 z-[60] cursor-default border-0 bg-brand-teal-deep/50 p-0 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={closeDrawer}
            />
            <motion.div
              id="mobile-navigation"
              role="dialog"
              aria-modal="true"
              aria-label="Menu navigasi mobile"
              className="fixed inset-x-0 bottom-3 z-[61] mx-auto w-[calc(100%-1.5rem)] max-w-lg rounded-2xl border border-border bg-background p-4 shadow-modal"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={drawerVariants}
            >
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <a href="/" onClick={closeDrawer} className="flex items-center gap-2.5" aria-label={`${brandName}, kembali ke beranda`}>
                    <img src={taretanLogo} alt="" aria-hidden="true" className="size-9 shrink-0 object-contain" />
                    <span className="flex flex-col justify-center leading-tight">
                      <span className="text-base font-semibold tracking-[-0.04em] text-brand-green-dark">{brandName}</span>
                      <span className="text-[9px] font-medium tracking-[-0.01em] text-muted-foreground">Penerbit Buku &amp; Publikasi Ilmiah</span>
                    </span>
                  </a>
                  <button type="button" className="grid size-9 cursor-pointer place-items-center rounded-md border border-border hover:bg-accent" aria-label="Tutup menu" onClick={closeDrawer}>
                    <X className="size-5" aria-hidden="true" />
                  </button>
                </div>

                <motion.ul className="flex flex-col rounded-xl border border-border text-sm" variants={drawerItemVariants}>
                  {navigation.map((item) => (
                    <motion.li
                      key={item.id}
                      variants={drawerItemVariants}
                      className={cn("relative border-b border-border last:border-b-0", item.href === activeHref && "bg-accent/70")}
                    >
                      <a
                        href={item.href}
                        onClick={closeDrawer}
                        aria-current={item.href === activeHref ? "page" : undefined}
                        className={cn(
                          "relative z-10 block px-3.5 py-3 font-medium transition-colors",
                          item.href === activeHref ? "text-brand-green-dark" : "text-muted-foreground hover:text-brand-green-dark",
                        )}
                      >
                        {item.label}
                      </a>
                    </motion.li>
                  ))}
                </motion.ul>

                <motion.a
                  href="/kirim-naskah"
                  onClick={closeDrawer}
                  variants={drawerItemVariants}
                  className="inline-flex min-h-11 items-center justify-center rounded-full bg-primary px-4 text-sm font-semibold text-secondary-foreground transition-all hover:bg-secondary/80 active:scale-95"
                >
                  Kirim Naskah
                </motion.a>
              </div>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
