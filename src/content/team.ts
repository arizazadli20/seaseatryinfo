export interface TeamMember {
  id: string;
  name: string;
  role: string;
  responsibility: string;
  photoUrl: string;
  linkedinUrl: string;
}

export const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Ariz Azadli",
    role: "Backend Developer",
    responsibility: "System and data architecture.",
    photoUrl: "/team/ariz.png",
    linkedinUrl: "https://www.linkedin.com/in/ariz-azadli/"
  },
  {
    id: "2",
    name: "Murad Huseynov",
    role: "ML Engineer",
    responsibility: "AI and anomaly detection.",
    photoUrl: "/team/murad.png",
    linkedinUrl: "https://www.linkedin.com/in/muraddhuseynov/"
  },
  {
    id: "3",
    name: "Kanan Shukurzade",
    role: "Backend & Frontend Developer",
    responsibility: "Core systems and UI.",
    photoUrl: "/team/kanan.png",
    linkedinUrl: "https://www.linkedin.com/in/kananshukurzade/"
  },
  {
    id: "4",
    name: "Rufat Jabrailli",
    role: "Chemical Engineer",
    responsibility: "Sorbent and materials research.",
    photoUrl: "/team/rufat.png",
    linkedinUrl: "https://www.linkedin.com/in/rufatjabra/"
  },
  {
    id: "5",
    name: "Shikhi Ibrahimov",
    role: "Full Stack Developer",
    responsibility: "End-to-end system development.",
    photoUrl: "/team/shikhi.png",
    linkedinUrl: "https://www.linkedin.com/in/shikhiibrahimov/"
  }
];
