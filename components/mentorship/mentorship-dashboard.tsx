"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Users, MessageCircle, Calendar, Star, Search, Filter, Clock, CheckCircle, UserPlus } from "lucide-react"

interface MentorshipDashboardProps {
  user: {
    userType?: string
    name?: string | null
  }
}

export function MentorshipDashboard({ user }: MentorshipDashboardProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [industryFilter, setIndustryFilter] = useState("all")

  // Mock data - in real app, this would come from API
  const mentors = [
    {
      id: 1,
      name: "Sarah Chen",
      title: "Senior Software Engineer",
      company: "Google",
      industry: "Technology",
      experience: "8 years",
      skills: ["React", "Node.js", "System Design", "Leadership"],
      rating: 4.9,
      sessions: 45,
      bio: "Passionate about helping students transition into tech careers. Specialized in full-stack development and technical leadership.",
      availability: "Available",
    },
    {
      id: 2,
      name: "Michael Rodriguez",
      title: "Product Manager",
      company: "Meta",
      industry: "Technology",
      experience: "6 years",
      skills: ["Product Strategy", "Data Analysis", "User Research", "Agile"],
      rating: 4.8,
      sessions: 32,
      bio: "Former startup founder turned PM. Love helping students understand product thinking and career pivots.",
      availability: "Limited",
    },
    {
      id: 3,
      name: "Dr. Emily Watson",
      title: "Investment Banking VP",
      company: "Goldman Sachs",
      industry: "Finance",
      experience: "12 years",
      skills: ["Financial Modeling", "M&A", "Client Relations", "Team Management"],
      rating: 4.7,
      sessions: 28,
      bio: "Helping students break into finance and navigate the demanding but rewarding world of investment banking.",
      availability: "Available",
    },
  ]

  const mentorshipRequests = [
    {
      id: 1,
      mentorName: "Sarah Chen",
      studentName: "Alex Johnson",
      topic: "Career transition to tech",
      status: "pending",
      requestDate: "2024-01-15",
      message: "Hi Sarah, I'm looking to transition from marketing to software engineering...",
    },
    {
      id: 2,
      mentorName: "Michael Rodriguez",
      studentName: "Lisa Park",
      topic: "Product management career path",
      status: "accepted",
      requestDate: "2024-01-12",
      scheduledDate: "2024-01-20",
    },
  ]

  const myMentorships = [
    {
      id: 1,
      name: "Alex Johnson",
      university: "MIT",
      major: "Computer Science",
      year: "Junior",
      interests: ["Web Development", "AI/ML", "Startups"],
      sessions: 3,
      nextSession: "2024-01-18",
      progress: "Excellent",
    },
    {
      id: 2,
      name: "Maria Garcia",
      university: "Stanford",
      major: "Business",
      year: "Senior",
      interests: ["Product Management", "Tech Strategy", "Entrepreneurship"],
      sessions: 5,
      nextSession: "2024-01-22",
      progress: "Good",
    },
  ]

  const getUserInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "accepted":
        return "bg-green-100 text-green-800"
      case "declined":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case "Available":
        return "bg-green-100 text-green-800"
      case "Limited":
        return "bg-yellow-100 text-yellow-800"
      case "Unavailable":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredMentors = mentors.filter((mentor) => {
    const matchesSearch =
      mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentor.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentor.skills.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesIndustry = industryFilter === "all" || mentor.industry.toLowerCase() === industryFilter
    return matchesSearch && matchesIndustry
  })

  if (user.userType === "student") {
    return (
      <Tabs defaultValue="find-mentors" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="find-mentors">Find Mentors</TabsTrigger>
          <TabsTrigger value="my-requests">My Requests</TabsTrigger>
          <TabsTrigger value="career-paths">Career Paths</TabsTrigger>
        </TabsList>

        <TabsContent value="find-mentors" className="space-y-6">
          {/* Search and Filters */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="font-serif font-bold">Find Your Perfect Mentor</CardTitle>
              <CardDescription>Connect with experienced alumni in your field of interest</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by name, company, or skills..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Select value={industryFilter} onValueChange={setIndustryFilter}>
                  <SelectTrigger className="w-full md:w-48">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Industries</SelectItem>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="consulting">Consulting</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Mentor Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMentors.map((mentor) => (
              <Card key={mentor.id} className="border-border hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex items-start space-x-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={undefined || "/placeholder.svg"} alt={mentor.name} />
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {getUserInitials(mentor.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-serif font-bold text-lg truncate">{mentor.name}</h3>
                      <p className="text-sm text-muted-foreground truncate">{mentor.title}</p>
                      <p className="text-sm font-medium text-primary">{mentor.company}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <Badge className={`text-xs ${getAvailabilityColor(mentor.availability)}`}>
                      {mentor.availability}
                    </Badge>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{mentor.rating}</span>
                      <span className="text-xs text-muted-foreground">({mentor.sessions})</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground line-clamp-3">{mentor.bio}</p>
                  <div className="flex flex-wrap gap-1">
                    {mentor.skills.slice(0, 3).map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {mentor.skills.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{mentor.skills.length - 3} more
                      </Badge>
                    )}
                  </div>
                  <Button className="w-full" size="sm">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Request Mentorship
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="my-requests" className="space-y-6">
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="font-serif font-bold">My Mentorship Requests</CardTitle>
              <CardDescription>Track your mentorship applications and scheduled sessions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {mentorshipRequests.map((request) => (
                <div key={request.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                  <div className="flex items-start space-x-4">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-secondary text-secondary-foreground">
                        {getUserInitials(request.mentorName)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium">{request.mentorName}</h4>
                      <p className="text-sm text-muted-foreground">{request.topic}</p>
                      <p className="text-xs text-muted-foreground">Requested: {request.requestDate}</p>
                      {request.scheduledDate && (
                        <p className="text-xs text-primary">Scheduled: {request.scheduledDate}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Badge className={`text-xs ${getStatusColor(request.status)}`}>
                      {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                    </Badge>
                    {request.status === "accepted" && (
                      <Button size="sm" variant="outline">
                        <Calendar className="h-4 w-4 mr-2" />
                        Join Session
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="career-paths" className="space-y-6">
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="font-serif font-bold">Explore Career Paths</CardTitle>
              <CardDescription>
                Discover different career trajectories and get personalized recommendations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-primary/5 rounded-lg">
                  <h3 className="font-serif font-bold text-lg mb-3">Technology</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Software Engineer</span>
                      <Badge variant="secondary" className="text-xs">
                        High Demand
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Product Manager</span>
                      <Badge variant="secondary" className="text-xs">
                        Growing
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Data Scientist</span>
                      <Badge variant="secondary" className="text-xs">
                        Hot
                      </Badge>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="mt-4 w-full bg-transparent">
                    Explore Tech Careers
                  </Button>
                </div>

                <div className="p-6 bg-secondary/5 rounded-lg">
                  <h3 className="font-serif font-bold text-lg mb-3">Finance</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Investment Banking</span>
                      <Badge variant="secondary" className="text-xs">
                        Competitive
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Private Equity</span>
                      <Badge variant="secondary" className="text-xs">
                        Elite
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Corporate Finance</span>
                      <Badge variant="secondary" className="text-xs">
                        Stable
                      </Badge>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="mt-4 w-full bg-transparent">
                    Explore Finance Careers
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    )
  }

  // Alumni/Employer view
  return (
    <Tabs defaultValue="my-mentees" className="space-y-6">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="my-mentees">My Mentees</TabsTrigger>
        <TabsTrigger value="requests">Requests</TabsTrigger>
        <TabsTrigger value="become-mentor">Become a Mentor</TabsTrigger>
      </TabsList>

      <TabsContent value="my-mentees" className="space-y-6">
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="font-serif font-bold">My Mentees</CardTitle>
            <CardDescription>Students you're currently mentoring</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {myMentorships.map((mentee) => (
              <div key={mentee.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                <div className="flex items-start space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {getUserInitials(mentee.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{mentee.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {mentee.major} • {mentee.year} at {mentee.university}
                    </p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {mentee.interests.slice(0, 2).map((interest) => (
                        <Badge key={interest} variant="secondary" className="text-xs">
                          {interest}
                        </Badge>
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      {mentee.sessions} sessions • Next: {mentee.nextSession}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge className="text-xs bg-green-100 text-green-800">{mentee.progress}</Badge>
                  <Button size="sm" variant="outline">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Message
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="requests" className="space-y-6">
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="font-serif font-bold">Mentorship Requests</CardTitle>
            <CardDescription>Students who want your guidance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {mentorshipRequests
              .filter((req) => req.status === "pending")
              .map((request) => (
                <div key={request.id} className="p-4 bg-muted/30 rounded-lg">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start space-x-4">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {getUserInitials(request.studentName)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-medium">{request.studentName}</h4>
                        <p className="text-sm text-muted-foreground">{request.topic}</p>
                        <p className="text-xs text-muted-foreground">Requested: {request.requestDate}</p>
                      </div>
                    </div>
                    <Badge className={`text-xs ${getStatusColor(request.status)}`}>Pending</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 pl-14">{request.message}</p>
                  <div className="flex space-x-2 pl-14">
                    <Button size="sm">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Accept
                    </Button>
                    <Button size="sm" variant="outline">
                      Decline
                    </Button>
                  </div>
                </div>
              ))}
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="become-mentor" className="space-y-6">
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="font-serif font-bold">Become a Mentor</CardTitle>
            <CardDescription>Share your experience and help students succeed</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-primary/5 rounded-lg">
                <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-serif font-bold text-lg mb-2">Share Knowledge</h3>
                <p className="text-sm text-muted-foreground">
                  Help students learn from your real-world experience and career journey
                </p>
              </div>
              <div className="text-center p-6 bg-secondary/5 rounded-lg">
                <Clock className="h-12 w-12 text-secondary mx-auto mb-4" />
                <h3 className="font-serif font-bold text-lg mb-2">Flexible Schedule</h3>
                <p className="text-sm text-muted-foreground">Set your own availability and mentor on your own terms</p>
              </div>
              <div className="text-center p-6 bg-accent/5 rounded-lg">
                <Star className="h-12 w-12 text-accent mx-auto mb-4" />
                <h3 className="font-serif font-bold text-lg mb-2">Make Impact</h3>
                <p className="text-sm text-muted-foreground">
                  Shape the next generation of professionals in your field
                </p>
              </div>
            </div>
            <div className="text-center">
              <Button size="lg">
                <UserPlus className="h-5 w-5 mr-2" />
                Apply to Become a Mentor
              </Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
