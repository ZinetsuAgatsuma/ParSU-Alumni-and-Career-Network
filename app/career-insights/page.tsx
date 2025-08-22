import { DashboardNav } from "@/components/dashboard/dashboard-nav"
import { CareerRecommendations } from "@/components/career/career-recommendations"

export default function CareerInsightsPage() {
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
          <h1 className="font-serif font-black text-3xl text-foreground mb-2">Career Insights</h1>
          <p className="text-muted-foreground">
            Personalized career recommendations based on your profile, interests, and network
          </p>
        </div>

        <CareerRecommendations user={mockUser} />
      </main>
    </div>
  )
}
