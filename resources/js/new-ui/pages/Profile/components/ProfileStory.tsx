import { motion } from "motion/react"

import { BlurFade } from "@/new-ui/components/magicui/BlurFade"

type ProfileStoryProps = {
  about?: string
  vision?: string
  mission?: string[]
}

export function ProfileStory({ about, vision, mission = [] }: ProfileStoryProps) {
  if (!about && !vision && mission.length === 0) return null

  const aboutParagraphs = about
    ?.replace(/\\r\\n|\\n/g, "\n")
    .replace(/\r\n?/g, "\n")
    .split(/\n\s*\n+/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean) ?? []

  return (
    <section className="border-b border-border bg-background" aria-label="Cerita Taretan Media">
      <div className="mx-auto flex max-w-content flex-col gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:gap-14 lg:px-12 lg:py-24">
        {about ? (
          <BlurFade>
            <div className="min-w-0 max-w-3xl">
              <h2 className="max-w-lg text-heading-2 font-semibold tracking-[-0.04em] text-brand-teal-deep">Ruang bagi Lahirnya Karya Berkualitas</h2>
              <div className="mt-6 max-w-3xl space-y-6 border-l-2 border-brand-green/40 pl-5 text-base font-normal leading-8 tracking-[-0.01em] text-muted-foreground sm:space-y-7 sm:pl-6">
                {aboutParagraphs.map((paragraph, index) => (
                  <p key={paragraph} className={index === 0 ? "text-pretty text-lg font-medium leading-8 text-brand-teal-deep" : "text-pretty"}>{paragraph}</p>
                ))}
              </div>
            </div>
          </BlurFade>
        ) : null}

        {vision || mission.length > 0 ? (
          <div className="grid items-start gap-4 sm:grid-cols-2">
            {vision ? (
              <motion.article
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, delay: 0.08, ease: "easeOut" }}
                aria-labelledby="profile-vision-heading"
                className="relative min-w-0 overflow-hidden rounded-xl border border-brand-green/30 bg-surface-feature p-7 shadow-subtle sm:p-9"
              >
                <span aria-hidden="true" className="absolute -right-8 -top-12 size-32 rounded-full border-[18px] border-brand-green/15" />
                <h2 id="profile-vision-heading" className="relative text-heading-3 font-semibold tracking-[-0.03em] text-brand-teal-deep">Visi</h2>
                <blockquote className="relative mt-5 text-xl leading-8 tracking-[-0.02em] text-brand-teal-deep">{vision}</blockquote>
              </motion.article>
            ) : null}

            {mission.length > 0 ? (
              <motion.article
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, delay: 0.14, ease: "easeOut" }}
                aria-labelledby="profile-mission-heading"
                className="relative min-w-0 overflow-hidden rounded-xl border border-border bg-card p-7 shadow-subtle sm:p-9"
              >
                <span aria-hidden="true" className="absolute -bottom-12 -right-8 size-32 rounded-full border-[18px] border-brand-green/10" />
                <h2 id="profile-mission-heading" className="relative text-heading-3 font-semibold tracking-[-0.03em] text-brand-teal-deep">Misi</h2>
                <ol aria-labelledby="profile-mission-heading" className="relative mt-5 grid gap-4">
                  {mission.map((item, index) => (
                    <li key={item} className="flex gap-4 text-base leading-8 text-brand-teal-deep">
                      <span aria-hidden="true" className="shrink-0 text-sm font-semibold tabular-nums text-brand-green-dark">{String(index + 1).padStart(2, "0")}</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ol>
              </motion.article>
            ) : null}
          </div>
        ) : null}
      </div>
    </section>
  )
}
