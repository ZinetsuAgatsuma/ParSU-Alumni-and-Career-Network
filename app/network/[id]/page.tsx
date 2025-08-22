import { DashboardNav } from "@/components/dashboard/dashboard-nav"
import { AlumniProfile } from "@/components/network/alumni-profile"

interface AlumniProfilePageProps {
  params: {
    id: string
  }
}

export default async function AlumniProfilePage({ params }: AlumniProfilePageProps) {
  const mockUser = {
    id: "1",
    name: "Alex Johnson",
    email: "alex.johnson@university.edu",
    userType: "student",
    university: "Stanford University",
  }

  // Mock alumni data - in real app, this would be fetched from database using params.id
  const alumni = {
    id: params.id,
    name: "Sarah Johnson",
    title: "Senior Software Engineer",
    company: "Google",
    location: "Mountain View, CA",
    university: "Stanford University",
    graduationYear: "2019",
    major: "Computer Science",
    skills: ["JavaScript", "React", "Python", "Machine Learning", "Node.js", "AWS", "Docker", "Kubernetes"],
    bio: "Passionate about building scalable systems and mentoring junior developers. I love working on challenging problems that impact millions of users.",
    connections: 156,
    mutualConnections: 8,
    profileImage: null,
    isConnected: false,
    connectionStatus: null,
    experience: [
      {
        title: "Senior Software Engineer",
        company: "Google",
        duration: "2021 - Present",
        description: "Leading development of scalable microservices architecture serving millions of users daily.",
      },
      {
        title: "Software Engineer",
        company: "Facebook",
        duration: "2019 - 2021",
        description: "Developed and maintained React-based web applications for the main Facebook platform.",
      },
      {
        title: "Software Engineering Intern",
        company: "Microsoft",
        duration: "Summer 2018",
        description: "Built internal tools using .NET and Azure cloud services.",
      },
    ],
    education: [
      {
        degree: "Master of Science in Computer Science",
        school: "Stanford University",
        year: "2017-2019",
        details: "Focus on Machine Learning and Distributed Systems",
      },
      {
        degree: "Bachelor of Science in Computer Science",
        school: "UC Berkeley",
        year: "2013-2017",
        details: "Magna Cum Laude, Phi Beta Kappa",
      },
    ],
    achievements: [
      "Google Cloud Certified Professional",
      "Published 3 papers on distributed systems",
      "Mentored 15+ junior engineers",
      "Led team of 8 engineers on critical infrastructure project",
    ],
    interests: ["Machine Learning", "Open Source", "Mentoring", "Rock Climbing", "Photography"],
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav user={mockUser} />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AlumniProfile alumni={alumni} currentUser={mockUser} />
      </main>
    </div>
  )
}
