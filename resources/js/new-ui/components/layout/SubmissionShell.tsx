import type { ReactNode } from "react"
import { motion } from "motion/react"
import { Link } from "@inertiajs/react"
import taretanLogo from "@/new-ui/assets/taretan-media.svg"

type SubmissionShellProps = {
  children: ReactNode
  brandName?: string
  pageTitle?: string
  pageDescription?: string
}

export function SubmissionShell({
  children,
  brandName = "Taretan Media",
  pageTitle = "Mari Bicarakan Naskah Anda",
  pageDescription = "Isi informasi singkat berikut untuk menyiapkan konsultasi awal bersama Taretan Media",
}: SubmissionShellProps) {
  return (
    <div className="submission-shell min-h-screen overflow-hidden bg-surface-soft text-foreground">
      <motion.header
        className="relative z-20 mx-auto flex w-full max-w-3xl flex-col items-center px-5 pb-10 pt-14 text-center sm:px-8 sm:pb-14 sm:pt-16"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <Link href="/" className="group inline-flex min-h-11 items-center gap-3 rounded-full" aria-label={`${brandName}, kembali ke beranda`}>
          <img src={taretanLogo} alt="" aria-hidden="true" className="size-11 object-contain transition-transform duration-300 group-hover:scale-105 sm:size-12" />
          <span className="flex flex-col text-left leading-tight">
            <span className="text-sm font-semibold tracking-[-0.04em] text-brand-green-dark sm:text-base">{brandName}</span>
            <span className="text-[10px] font-medium text-muted-foreground sm:text-xs">Penerbit Buku &amp; Publikasi Ilmiah</span>
          </span>
        </Link>

        <h1 className="mt-8 text-3xl font-semibold tracking-[-0.055em] text-brand-teal-deep sm:text-5xl">{pageTitle}</h1>
        <p className="mt-4 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">{pageDescription}</p>
      </motion.header>

      <main id="main-content">{children}</main>
    </div>
  )
}
