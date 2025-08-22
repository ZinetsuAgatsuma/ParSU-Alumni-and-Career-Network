import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, AlertTriangle, CheckCircle } from "lucide-react"
import { AdminNav } from "@/components/admin/admin-nav"
import { StatsCards } from "@/components/admin/stats-cards"
import { AnalyticsChart } from "@/components/admin/analytics-chart"
import { RecentActivity } from "@/components/admin/recent-activity"

export default function AdminDashboardPage() {
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
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-serif font-black text-3xl text-foreground mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Monitor platform activity and manage the Parsu community</p>
        </div>

        {/* Stats Overview */}
        <StatsCards />

        {/* Analytics and Activity */}
        <div className="grid lg:grid-cols-3 gap-8 mt-8">
          {/* Analytics Chart */}
          <div className="lg:col-span-2">
            <AnalyticsChart />
          </div>

          {/* Recent Activity */}
          <div>
            <RecentActivity />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="font-serif font-bold flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2 text-destructive" />
                Pending Reports
              </CardTitle>
              <CardDescription>Content requiring moderation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive mb-2">12</div>
              <p className="text-sm text-muted-foreground">3 new reports today</p>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader>
              <CardTitle className="font-serif font-bold flex items-center">
                <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
                Approved Jobs
              </CardTitle>
              <CardDescription>Jobs approved this week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600 mb-2">47</div>
              <p className="text-sm text-muted-foreground">+12% from last week</p>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader>
              <CardTitle className="font-serif font-bold flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-primary" />
                Platform Growth
              </CardTitle>
              <CardDescription>New users this month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary mb-2">284</div>
              <p className="text-sm text-muted-foreground">+18% growth rate</p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
