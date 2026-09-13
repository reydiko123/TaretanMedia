import { motion, useReducedMotion } from "motion/react"
import { ContactChannelCard } from "@/new-ui/pages/Contact/components/ContactChannelCard"
import type { ContactChannelListProps } from "@/new-ui/pages/Contact/contactTypes"

export function ContactChannelList({ channels }: ContactChannelListProps) {
  const shouldReduceMotion = useReducedMotion()
  if (channels.length === 0) return null

  return (
    <motion.ul
      role="list"
      aria-label="Daftar kanal komunikasi"
      initial={shouldReduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.3, ease: "easeOut" }}
      className="grid gap-5 md:grid-cols-2"
    >
      {channels.map((channel) => (
        <li key={channel.id} className={`min-w-0 ${channel.primary ? "md:col-span-2" : ""}`}>
          <ContactChannelCard channel={channel} />
        </li>
      ))}
    </motion.ul>
  )
}
