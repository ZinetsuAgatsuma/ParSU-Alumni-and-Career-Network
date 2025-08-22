import { DashboardNav } from "@/components/dashboard/dashboard-nav"
import { SeminarsDashboard } from "@/components/seminars/seminars-dashboard"

export default function SeminarsPage() {
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
            {mockUser.userType === "student" ? "Find Seminars" : "Seminar Program"}
          </h1>
          <p className="text-muted-foreground">
            {mockUser.userType === "student"
              ? "Request to join seminars hosted by alumni and professionals."
              : "Host seminars and help students and graduates advance their careers."}
          </p>
        </div>

        <SeminarsDashboard user={mockUser} />
      </main>
    </div>
  )
}
