import { Mail, MessageCircle } from "lucide-react"
import { motion, useReducedMotion } from "motion/react"

import type { ContactChannelCardProps, ContactChannelId } from "@/new-ui/pages/Contact/contactTypes"

const CHANNEL_ICON: Record<ContactChannelId, typeof MessageCircle> = {
  whatsapp: MessageCircle,
  email: Mail,
}

const CHANNEL_CATEGORY: Record<ContactChannelId, string> = {
  whatsapp: "WhatsApp",
  email: "Email",
}

const CHANNEL_ACTION: Record<ContactChannelId, string> = {
  whatsapp: "Buka WhatsApp",
  email: "Kirim email",
}

export function ContactChannelCard({ channel }: ContactChannelCardProps) {
  const shouldReduceMotion = useReducedMotion()
  const Icon = CHANNEL_ICON[channel.id]
  const category = CHANNEL_CATEGORY[channel.id]
  const actionText = CHANNEL_ACTION[channel.id]
  const accessibleName = `${actionText} ${channel.label}`

  const externalAttributes = channel.external ? { target: "_blank" as const, rel: "noopener noreferrer" } : {}

  return (
    <motion.a
      href={channel.href}
      {...externalAttributes}
      aria-label={accessibleName}
      initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      whileHover={shouldReduceMotion ? undefined : { y: -3 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-subtle transition-shadow duration-200 hover:shadow-card focus-within:shadow-card sm:p-7"
    >
      <span className="inline-flex size-11 items-center justify-center rounded-full bg-surface-feature text-brand-green-dark">
        <Icon aria-hidden="true" className="size-5" />
      </span>

      <p className="mt-5 text-micro-uppercase font-semibold uppercase tracking-[0.14em] text-brand-green-dark">{category}</p>
      <p className="mt-2 text-lg font-semibold tracking-[-0.02em] text-brand-teal-deep break-words">{channel.label}</p>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">{channel.supportingText}</p>
    </motion.a>
  )
}
