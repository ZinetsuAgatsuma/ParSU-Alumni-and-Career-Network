import { DashboardNav } from "@/components/dashboard/dashboard-nav"
import { MentorshipDashboard } from "@/components/mentorship/mentorship-dashboard"

export default function MentorshipPage() {
  const mockUser = {
    id: "1",
    name: "Alex Johnson",
    email: "alex.johnson@university.edu",
    userType: "student",
    university: "Stanford University",
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav user={mockUser} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="font-serif font-black text-3xl text-foreground mb-2">
            {mockUser.userType === "student" ? "Find Mentors" : "Mentorship Program"}
          </h1>
          <p className="text-muted-foreground">
            {mockUser.userType === "student"
              ? "Connect with experienced alumni who can guide your career journey"
              : "Share your experience and help the next generation of professionals"}
          </p>
        </div>

        <MentorshipDashboard user={mockUser} />
      </main>
    </div>
  )
}
