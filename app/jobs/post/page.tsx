import { DashboardNav } from "@/components/dashboard/dashboard-nav"
import { JobPostForm } from "@/components/jobs/job-post-form"

export default function PostJobPage() {
  const mockUser = {
    id: "1",
    name: "Sarah Wilson",
    email: "sarah.wilson@company.com",
    userType: "alumni",
    university: "Stanford University",
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav user={mockUser} />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="font-serif font-black text-3xl text-foreground mb-2">Post a Job</h1>
          <p className="text-muted-foreground">
            Share opportunities with talented students and alumni from top universities.
          </p>
        </div>

        <JobPostForm user={mockUser} />
      </main>
    </div>
  )
}
