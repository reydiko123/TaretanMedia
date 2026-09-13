import { useState } from "react"
import { motion } from "motion/react"

import { BlurFade } from "@/new-ui/components/magicui/BlurFade"
import type { TeamMember } from "@/new-ui/pages/Profile/profileTypes"

function TeamPortrait({ member }: { member: TeamMember }) {
  const [imageFailed, setImageFailed] = useState(false)

  return imageFailed ? (
    <div role="img" aria-label={member.image.alt} className="grid aspect-[4/5] place-items-center bg-brand-teal-deep text-6xl font-semibold tracking-[-0.08em] text-on-dark">{member.name.slice(0, 1)}</div>
  ) : (
    <img src={member.image.src} alt={member.image.alt} width={member.image.width ?? 1024} height={member.image.height ?? 1536} loading="lazy" onError={() => setImageFailed(true)} className="aspect-[4/5] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
  )
}

type ProfileTeamProps = { members: TeamMember[] }

export function ProfileTeam({ members }: ProfileTeamProps) {
  if (members.length === 0) return null

  return (
    <section className="border-b border-border bg-surface" aria-labelledby="profile-team-heading">
      <div className="mx-auto max-w-content px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
        <BlurFade>
          <div className="mx-auto max-w-2xl text-center">
            <h2 id="profile-team-heading" className="text-heading-2 font-semibold tracking-[-0.04em] text-brand-teal-deep">Tim Profesional Kami</h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-8 text-muted-foreground">Dua peran yang bekerja bersama untuk menjaga proses penerbitan tetap rapi, komunikatif, dan siap membawa karya anda lebih jauh</p>
          </div>
        </BlurFade>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={{ hidden: { opacity: 1 }, visible: { opacity: 1, transition: { delayChildren: 0.08, staggerChildren: 0.12 } } }} className="mx-auto mt-10 grid max-w-4xl gap-5 md:grid-cols-2">
          {members.slice(0, 2).map((member) => (
            <motion.article key={member.id} variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } } }} whileHover={{ y: -6 }} transition={{ duration: 0.22, ease: "easeOut" }} className="group overflow-hidden rounded-xl border border-border bg-card p-3 shadow-subtle transition-shadow hover:shadow-card">
              <div className="overflow-hidden rounded-lg bg-surface"><TeamPortrait member={member} /></div>
              <div className="p-3 pb-4 pt-5 sm:p-4 sm:pb-5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-brand-green-dark">{member.team}</p>
                <h3 className="mt-2 text-heading-4 font-semibold tracking-[-0.04em] text-brand-teal-deep">{member.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{member.role}</p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
