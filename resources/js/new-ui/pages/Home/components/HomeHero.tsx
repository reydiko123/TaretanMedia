import { ArrowRight, BookmarkPlus, Send } from "lucide-react"
import { motion } from "motion/react"
import { Link } from "@inertiajs/react"
import taretanLogo from "@/new-ui/assets/taretan-media.png"

type HomeHeroProps = {
  manuscriptHref?: string
  manuscriptLabel?: string
}

const ease = [0.16, 1, 0.3, 1] as const

export function HomeHero({ manuscriptHref = "/kirim-naskah", manuscriptLabel = "Kirim Naskah" }: HomeHeroProps) {
  return (
    <section id="beranda" aria-labelledby="home-hero-title" className="relative isolate overflow-hidden bg-background">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background via-surface to-background" />

      <div className="relative z-10 mx-auto grid min-h-[min(760px,calc(100svh-4rem))] w-full max-w-content items-center gap-14 px-5 pb-28 pt-32 sm:px-8 sm:pb-32 sm:pt-36 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:px-12 lg:pb-36 lg:pt-40">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease }}
          className="relative z-10 max-w-2xl"
        >
          <h1 id="home-hero-title" className="max-w-3xl text-balance text-4xl font-semibold leading-[1.08] tracking-[-0.065em] text-brand-teal-deep sm:text-6xl lg:text-7xl">
            Menerbitkan Gagasan, Mengabadikan Pengetahuan.
          </h1>

          <p className="mt-6 max-w-xl text-pretty text-base leading-7 text-muted-foreground sm:mt-7 sm:text-lg sm:leading-8">
            CV Taretan Media Publishing hadir sebagai mitra penerbitan buku dan publikasi ilmiah bagi penulis, akademisi, peneliti, pendidik, dan praktisi untuk menghadirkan karya berkualitas kepada masyarakat.
          </p>

          <div className="mt-8 flex w-full flex-col gap-3 sm:mt-10 sm:flex-row sm:items-center">
            <Link
              href="/buku"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-subtle transition-all hover:bg-primary-deep active:scale-[0.98] sm:w-auto"
            >
              Jelajahi Buku
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
            <Link
              href={manuscriptHref}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-border bg-background/60 px-5 text-sm font-semibold text-brand-teal-deep transition-all hover:border-brand-green-dark hover:bg-background active:scale-[0.98] sm:w-auto"
            >
              <Send className="size-4" aria-hidden="true" />
              {manuscriptLabel}
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 28 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease }}
          aria-hidden="true"
          className="relative mx-auto flex min-h-[22rem] w-full max-w-[34rem] items-center justify-center sm:min-h-[28rem] lg:min-h-[34rem]"
        >
          <div className="absolute inset-x-5 top-6 h-[78%] rounded-[2rem] bg-brand-teal-deep/[0.06] blur-2xl sm:inset-x-10" />
          <div className="absolute left-0 top-12 hidden h-56 w-32 -rotate-12 rounded-2xl border border-border bg-background/70 p-4 shadow-card sm:block">
            <div className="flex h-full flex-col justify-between">
              <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">/ Buku</span>
              <span className="h-20 w-full rounded-xl bg-primary/25" />
              <span className="text-xs font-semibold tracking-tight text-brand-teal-deep">Metodologi Penelitian Sosial</span>
            </div>
          </div>
          <div className="absolute right-1 top-20 h-56 w-32 rotate-12 rounded-2xl border border-border bg-background/70 p-4 shadow-card sm:right-4">
            <div className="flex h-full flex-col justify-between">
              <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">/ Jurnal</span>
              <span className="flex h-20 items-end gap-1 rounded-xl bg-accent p-3">
                <span className="h-6 w-1/4 rounded-sm bg-accent-purple/70" />
                <span className="h-10 w-1/4 rounded-sm bg-accent-orange/70" />
                <span className="h-14 w-1/4 rounded-sm bg-accent-pink/70" />
              </span>
              <span className="text-xs font-semibold tracking-tight text-brand-teal-deep">Ekonomi Islam Kontemporer</span>
            </div>
          </div>

          <div className="relative z-10 flex aspect-[0.82] w-[min(74%,19rem)] flex-col overflow-hidden rounded-[1.75rem] border border-brand-teal-deep/15 bg-background p-5 shadow-mockup sm:w-[min(70%,22rem)] sm:p-7">
            <div className="flex items-center justify-between text-[9px] font-semibold uppercase tracking-[0.2em] text-muted-foreground sm:text-[10px]">
              <span>/ CV Taretan Media Publishing</span>
              <span>2026</span>
            </div>
            <div className="my-auto flex flex-col items-center text-center">
              <img src={taretanLogo} alt="" className="size-24 object-contain sm:size-32" />
            </div>
            <div className="flex items-end justify-between border-t border-border pt-4">
              <div>
                <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-brand-green-dark">Penerbit</p>
                <p className="mt-1 text-xs text-muted-foreground">Buku · Jurnal</p>
              </div>
              <span className="grid size-8 place-items-center rounded-full bg-primary text-primary-foreground">
                <BookmarkPlus className="size-4" aria-hidden="true" />
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 -bottom-px h-28 bg-gradient-to-t from-background via-background/95 to-transparent sm:h-36" />
    </section>
  )
}
