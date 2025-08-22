import { AdminNav } from "@/components/admin/admin-nav"
import { UserManagement } from "@/components/admin/user-management"

export default function AdminUsersPage() {
  const mockUser = {
    id: "1",
    name: "Admin User",
    email: "admin@parsu.edu",
    userType: "admin",
    university: "System Admin",
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminNav user={mockUser} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="font-serif font-black text-3xl text-foreground mb-2">User Management</h1>
          <p className="text-muted-foreground">Manage platform users, roles, and permissions</p>
        </div>

        <UserManagement />
      </main>
    </div>
  )
}
