import { AnimatedListItem } from "@/new-ui/components/ui/animated-list"

const steps = [
  { number: "01", title: "Isi informasi naskah", description: "Lengkapi empat informasi dasar pada formulir." },
  { number: "02", title: "Tinjau di WhatsApp", description: "Kami menyiapkan pesan; Anda tetap dapat memeriksanya." },
  { number: "03", title: "Kirim saat siap", description: "Pesan baru diterima setelah Anda menekan tombol kirim di WhatsApp." },
]

export function SubmissionSteps() {
  return (
    <ol className="grid gap-3 md:grid-cols-3">
      {steps.map((step) => (
        <AnimatedListItem key={step.number} as="li" className="h-full">
          <div className="h-full rounded-2xl border border-border bg-card p-5 transition-colors hover:border-brand-green-dark/30 hover:bg-surface-feature sm:p-6">
            <span className="text-micro-uppercase font-semibold tracking-[0.12em] text-brand-green-dark">{step.number}</span>
            <h3 className="mt-5 text-heading-5 font-semibold tracking-[-0.03em] text-brand-teal-deep">{step.title}</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{step.description}</p>
          </div>
        </AnimatedListItem>
      ))}
    </ol>
  )
}
