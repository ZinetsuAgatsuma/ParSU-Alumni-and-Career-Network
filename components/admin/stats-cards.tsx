import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Briefcase, Building, GraduationCap } from "lucide-react"

export function StatsCards() {
  const stats = [
    {
      title: "Total Users",
      value: "2,847",
      change: "+12.5%",
      changeType: "positive" as const,
      icon: Users,
      description: "Active platform users",
    },
    {
      title: "Students",
      value: "1,923",
      change: "+8.2%",
      changeType: "positive" as const,
      icon: GraduationCap,
      description: "Currently enrolled students",
    },
    {
      title: "Alumni",
      value: "824",
      change: "+15.3%",
      changeType: "positive" as const,
      icon: Users,
      description: "Graduated alumni members",
    },
    {
      title: "Active Jobs",
      value: "156",
      change: "+23.1%",
      changeType: "positive" as const,
      icon: Briefcase,
      description: "Open job postings",
    },
    {
      title: "Companies",
      value: "89",
      change: "+6.7%",
      changeType: "positive" as const,
      icon: Building,
      description: "Registered employers",
    },
    {
      title: "Connections",
      value: "4,521",
      change: "+18.9%",
      changeType: "positive" as const,
      icon: Users,
      description: "Total network connections",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <Card key={stat.title} className="border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <div className="flex items-center space-x-2 text-xs">
                <span
                  className={`font-medium ${stat.changeType === "positive" ? "text-green-600" : "text-destructive"}`}
                >
                  {stat.change}
                </span>
                <span className="text-muted-foreground">from last month</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
