import { DashboardNav } from "@/components/dashboard/dashboard-nav"
import { ProfileForm } from "@/components/profile/profile-form"
import { ProfileView } from "@/components/profile/profile-view"

export default function ProfilePage() {
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

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="font-serif font-black text-3xl text-foreground mb-2">My Profile</h1>
          <p className="text-muted-foreground">
            Manage your profile information and showcase your experience to the network.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile View */}
          <div className="lg:col-span-1">
            <ProfileView user={mockUser} />
          </div>

          {/* Profile Form */}
          <div className="lg:col-span-2">
            <ProfileForm user={mockUser} />
          </div>
        </div>
      </main>
    </div>
  )
}
