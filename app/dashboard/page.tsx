import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Briefcase, MessageCircle, Search } from "lucide-react"
import Link from "next/link"
import { DashboardNav } from "@/components/dashboard/dashboard-nav"

export default function DashboardPage() {
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
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="font-serif font-black text-3xl text-foreground mb-2">
            Welcome back, {mockUser.name?.split(" ")[0]}!
          </h1>
          <p className="text-muted-foreground">
            {mockUser.userType === "student" &&
              "Continue building your professional network and exploring career opportunities."}
            {mockUser.userType === "alumni" && "Share your experience and help the next generation of professionals."}
            {mockUser.userType === "employer" && "Find talented candidates and post new opportunities."}
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-border hover:shadow-lg transition-shadow cursor-pointer">
            <Link href="/profile">
              <CardHeader className="text-center pb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="font-serif font-bold text-lg">My Profile</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <CardDescription className="text-center">
                  Update your profile and showcase your experience
                </CardDescription>
              </CardContent>
            </Link>
          </Card>

          <Card className="border-border hover:shadow-lg transition-shadow cursor-pointer">
            <Link href="/network">
              <CardHeader className="text-center pb-4">
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Search className="h-6 w-6 text-secondary" />
                </div>
                <CardTitle className="font-serif font-bold text-lg">Find Alumni</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <CardDescription className="text-center">Connect with alumni in your field of interest</CardDescription>
              </CardContent>
            </Link>
          </Card>

          <Card className="border-border hover:shadow-lg transition-shadow cursor-pointer">
            <Link href="/jobs">
              <CardHeader className="text-center pb-4">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Briefcase className="h-6 w-6 text-accent" />
                </div>
                <CardTitle className="font-serif font-bold text-lg">
                  {mockUser.userType === "employer" ? "Post Jobs" : "Find Jobs"}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <CardDescription className="text-center">
                  {mockUser.userType === "employer"
                    ? "Post new opportunities for students and alumni"
                    : "Discover internships and job opportunities"}
                </CardDescription>
              </CardContent>
            </Link>
          </Card>

          <Card className="border-border hover:shadow-lg transition-shadow cursor-pointer">
            <Link href="/mentorship">
              <CardHeader className="text-center pb-4">
                <div className="w-12 h-12 bg-chart-3/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <MessageCircle className="h-6 w-6 text-chart-3" />
                </div>
                <CardTitle className="font-serif font-bold text-lg">Mentorship</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <CardDescription className="text-center">
                  {mockUser.userType === "student"
                    ? "Find mentors to guide your career journey"
                    : "Mentor the next generation of professionals"}
                </CardDescription>
              </CardContent>
            </Link>
          </Card>
        </div>

        {/* Recent Activity & Recommendations */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="font-serif font-bold">Recent Activity</CardTitle>
                <CardDescription>Stay updated with your network</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-4 p-4 bg-muted/30 rounded-lg">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-primary-foreground font-medium text-sm">JD</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">John Doe posted a new job opportunity</p>
                    <p className="text-xs text-muted-foreground">Software Engineer at TechCorp • 2 hours ago</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 bg-muted/30 rounded-lg">
                  <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                    <span className="text-secondary-foreground font-medium text-sm">AS</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Alice Smith updated her profile</p>
                    <p className="text-xs text-muted-foreground">Added new skills in Data Science • 1 day ago</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 bg-muted/30 rounded-lg">
                  <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
                    <span className="text-accent-foreground font-medium text-sm">MB</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Mike Brown joined your network</p>
                    <p className="text-xs text-muted-foreground">Alumni from Computer Science • 3 days ago</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recommendations */}
          <div>
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="font-serif font-bold">Recommended for You</CardTitle>
                <CardDescription>Based on your profile and interests</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockUser.userType === "student" && (
                  <>
                    <div className="p-4 bg-primary/5 rounded-lg">
                      <h4 className="font-medium text-sm mb-2">Connect with Alumni</h4>
                      <p className="text-xs text-muted-foreground mb-3">
                        Find alumni working at companies you're interested in
                      </p>
                      <Button size="sm" variant="outline">
                        Explore Alumni
                      </Button>
                    </div>

                    <div className="p-4 bg-secondary/5 rounded-lg">
                      <h4 className="font-medium text-sm mb-2">Complete Your Profile</h4>
                      <p className="text-xs text-muted-foreground mb-3">
                        Add your skills and experience to get better recommendations
                      </p>
                      <Button size="sm" variant="outline">
                        Update Profile
                      </Button>
                    </div>
                  </>
                )}

                {mockUser.userType === "alumni" && (
                  <>
                    <div className="p-4 bg-primary/5 rounded-lg">
                      <h4 className="font-medium text-sm mb-2">Mentor Students</h4>
                      <p className="text-xs text-muted-foreground mb-3">Share your experience with current students</p>
                      <Button size="sm" variant="outline">
                        Become a Mentor
                      </Button>
                    </div>

                    <div className="p-4 bg-secondary/5 rounded-lg">
                      <h4 className="font-medium text-sm mb-2">Post Opportunities</h4>
                      <p className="text-xs text-muted-foreground mb-3">Share job openings at your company</p>
                      <Button size="sm" variant="outline">
                        Post Job
                      </Button>
                    </div>
                  </>
                )}

                {mockUser.userType === "employer" && (
                  <>
                    <div className="p-4 bg-primary/5 rounded-lg">
                      <h4 className="font-medium text-sm mb-2">Find Candidates</h4>
                      <p className="text-xs text-muted-foreground mb-3">Browse student and alumni profiles</p>
                      <Button size="sm" variant="outline">
                        Search Talent
                      </Button>
                    </div>

                    <div className="p-4 bg-secondary/5 rounded-lg">
                      <h4 className="font-medium text-sm mb-2">Post New Job</h4>
                      <p className="text-xs text-muted-foreground mb-3">
                        Reach qualified candidates from top universities
                      </p>
                      <Button size="sm" variant="outline">
                        Create Posting
                      </Button>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
