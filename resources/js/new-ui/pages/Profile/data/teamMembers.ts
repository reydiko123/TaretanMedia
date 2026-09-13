import teamEditorial from "@/new-ui/assets/team-editorial.png"
import teamProduction from "@/new-ui/assets/team-production.png"
import type { TeamMember } from "@/new-ui/pages/Profile/profileTypes"

export const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Muhammad Isbad Addainuri, M.E",
    team: "Tim Taretan Media",
    role: "Managing Director CV Taretan Media",
    image: { src: teamEditorial, alt: "Potret Managing Director CV Taretan Media di ruang kerja dengan rak buku", width: 1024, height: 1536 },
  },
  {
    id: 2,
    name: "Moh. Sofwan Kastir Al Aziz, M.E",
    team: "Tim Taretan Media",
    role: "Publishing Director CV Taretan Media",
    image: { src: teamProduction, alt: "Potret Publishing Director CV Taretan Media di studio penerbitan", width: 1024, height: 1536 },
  },
]
