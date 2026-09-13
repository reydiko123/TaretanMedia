import { motion } from "motion/react"

import { ProfileCta } from "@/new-ui/pages/Profile/components/ProfileCta"
import { ProfileHero } from "@/new-ui/pages/Profile/components/ProfileHero"
import { ProfilePrinciples } from "@/new-ui/pages/Profile/components/ProfilePrinciples"
import { ProfileStory } from "@/new-ui/pages/Profile/components/ProfileStory"
import { ProfileTeam } from "@/new-ui/pages/Profile/components/ProfileTeam"
import { teamMembers } from "@/new-ui/pages/Profile/data/teamMembers"
import { createProfilePageViewModel } from "@/new-ui/pages/Profile/profileViewModel"
import type { ProfileProps } from "@/new-ui/pages/Profile/profileTypes"

export function ProfilePage(props: ProfileProps) {
  const viewModel = createProfilePageViewModel(props)

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.35, ease: "easeOut" }}>
      <ProfileHero title={viewModel.intro.title} description={viewModel.intro.description} />
      <ProfileStory about={viewModel.about} vision={viewModel.vision} mission={viewModel.mission} />
      <ProfilePrinciples values={viewModel.values} />
      <ProfileTeam members={teamMembers} />
      <ProfileCta />
    </motion.div>
  )
}
