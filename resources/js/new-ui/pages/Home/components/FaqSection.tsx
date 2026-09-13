import { ChevronDown } from "lucide-react"
import { Accordion } from "@base-ui/react/accordion"
import { motion, type Variants } from "motion/react"

import type { HomeFaq } from "@/new-ui/pages/Home/data/homeTypes"

const sectionReveal: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
}

const itemReveal: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
}

const faqPanelVariants: Variants = {
  closed: { opacity: 0, y: -8 },
  open: { opacity: 1, y: 0 },
}

type FaqSectionProps = { faqs: HomeFaq[] }

export function FaqSection({ faqs }: FaqSectionProps) {
  if (faqs.length === 0) return null

  return (
    <section id="faq" aria-labelledby="faq-title" className="border-b border-border bg-surface px-5 py-24 sm:px-8 sm:py-28 lg:px-12 lg:py-32">
      <div className="mx-auto max-w-3xl">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.45 }} variants={sectionReveal} className="text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-green-dark">Pertanyaan umum</span>
          <h2 id="faq-title" className="mt-5 text-4xl font-semibold tracking-[-0.065em] text-brand-teal-deep sm:text-6xl">Yang sering ditanyakan</h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">Temukan jawaban singkat sebelum memulai percakapan tentang karya dan kebutuhan penerbitan anda</p>
        </motion.div>

        <Accordion.Root multiple className="mt-12 rounded-[1.65rem] border border-border bg-background px-5 sm:px-8">
          {faqs.map((faq) => (
            <motion.div key={faq.id} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={itemReveal}>
              <Accordion.Item value={faq.id} className="border-b border-border last:border-b-0">
                <Accordion.Header>
                  <Accordion.Trigger className="group flex min-h-16 w-full cursor-pointer items-center justify-between gap-6 py-5 text-left text-base font-semibold tracking-[-0.025em] text-brand-teal-deep transition-colors hover:text-brand-green-dark">
                    <span>{faq.question}</span>
                    <ChevronDown className="size-5 shrink-0 text-brand-green-dark transition-transform group-data-[open]:rotate-180" aria-hidden="true" />
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Panel
                  keepMounted
                  className="overflow-hidden text-sm leading-7 text-muted-foreground"
                  render={(props, state) => {
                    return (
                      <div
                        {...props}
                        style={{
                          ...props.style,
                          height: "var(--accordion-panel-height)",
                          transition: "height 240ms cubic-bezier(0.22, 1, 0.36, 1)",
                        }}
                      >
                        <motion.div
                          initial={false}
                          animate={state.open ? "open" : "closed"}
                          variants={faqPanelVariants}
                          transition={{ duration: 0.24, ease: "easeOut" }}
                        >
                          {props.children}
                        </motion.div>
                      </div>
                    )
                  }}
                >
                  <p className="pb-6 pr-8">{faq.answer}</p>
                </Accordion.Panel>
              </Accordion.Item>
            </motion.div>
          ))}
        </Accordion.Root>
      </div>
    </section>
  )
}
