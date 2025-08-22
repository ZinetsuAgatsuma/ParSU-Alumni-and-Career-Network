import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { UserPlus, Briefcase, AlertTriangle, CheckCircle } from "lucide-react"

export function RecentActivity() {
  const activities = [
    {
      id: 1,
      type: "user_registered",
      user: "Sarah Johnson",
      userType: "student",
      action: "registered as a new student",
      time: "2 minutes ago",
      icon: UserPlus,
      iconColor: "text-green-600",
    },
    {
      id: 2,
      type: "job_posted",
      user: "TechCorp Inc.",
      userType: "employer",
      action: "posted a new Software Engineer position",
      time: "15 minutes ago",
      icon: Briefcase,
      iconColor: "text-primary",
    },
    {
      id: 3,
      type: "report_submitted",
      user: "Anonymous",
      userType: "user",
      action: "reported inappropriate content",
      time: "1 hour ago",
      icon: AlertTriangle,
      iconColor: "text-destructive",
    },
    {
      id: 4,
      type: "job_approved",
      user: "Admin",
      userType: "admin",
      action: "approved Marketing Intern position",
      time: "2 hours ago",
      icon: CheckCircle,
      iconColor: "text-green-600",
    },
    {
      id: 5,
      type: "user_registered",
      user: "Michael Chen",
      userType: "alumni",
      action: "registered as an alumni member",
      time: "3 hours ago",
      icon: UserPlus,
      iconColor: "text-secondary",
    },
  ]

  const getUserTypeColor = (userType: string) => {
    switch (userType) {
      case "student":
        return "bg-primary text-primary-foreground"
      case "alumni":
        return "bg-secondary text-secondary-foreground"
      case "employer":
        return "bg-accent text-accent-foreground"
      case "admin":
        return "bg-destructive text-destructive-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getUserInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle className="font-serif font-bold">Recent Activity</CardTitle>
        <CardDescription>Latest platform events and user actions</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity) => {
          const Icon = activity.icon
          return (
            <div key={activity.id} className="flex items-start space-x-4 p-3 bg-muted/30 rounded-lg">
              <div className={`p-2 rounded-full bg-background ${activity.iconColor}`}>
                <Icon className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="font-medium text-sm truncate">{activity.user}</span>
                  {activity.userType !== "user" && (
                    <Badge className={`text-xs ${getUserTypeColor(activity.userType)}`}>{activity.userType}</Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{activity.action}</p>
                <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
