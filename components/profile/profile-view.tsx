"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { MapPin, Calendar, Mail, ExternalLink } from "lucide-react"

interface ProfileViewProps {
  user: {
    name?: string | null
    email?: string | null
    image?: string | null
    userType?: string
    university?: string
  }
}

export function ProfileView({ user }: ProfileViewProps) {
  const getUserInitials = (name?: string | null) => {
    if (!name) return "U"
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  const getUserTypeColor = (userType?: string) => {
    switch (userType) {
      case "student":
        return "bg-primary text-primary-foreground"
      case "alumni":
        return "bg-secondary text-secondary-foreground"
      case "employer":
        return "bg-accent text-accent-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  // Mock profile data - in real app, this would come from database
  const profileData = {
    bio: "Passionate computer science student with interests in full-stack development and AI. Looking to connect with alumni in the tech industry.",
    location: "San Francisco, CA",
    joinDate: "January 2024",
    skills: ["JavaScript", "React", "Node.js", "Python", "Machine Learning"],
    experience: [
      {
        title: "Software Engineering Intern",
        company: "TechCorp",
        duration: "Summer 2023",
        description: "Developed web applications using React and Node.js",
      },
    ],
    education: [
      {
        degree: "Bachelor of Science in Computer Science",
        school: user.university || "University",
        year: "2021-2025",
      },
    ],
  }

  return (
    <div className="space-y-6">
      {/* Basic Info Card */}
      <Card className="border-border">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center text-center space-y-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src={user.image || undefined} alt={user.name || "User"} />
              <AvatarFallback className="bg-primary text-primary-foreground text-xl">
                {getUserInitials(user.name)}
              </AvatarFallback>
            </Avatar>

            <div className="space-y-2">
              <h2 className="font-serif font-bold text-xl">{user.name}</h2>
              <Badge className={getUserTypeColor(user.userType)}>
                {user.userType?.charAt(0).toUpperCase() + user.userType?.slice(1)}
              </Badge>
            </div>

            <p className="text-sm text-muted-foreground max-w-xs">{profileData.bio}</p>

            <div className="space-y-2 text-sm text-muted-foreground w-full">
              <div className="flex items-center justify-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>{profileData.location}</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>Joined {profileData.joinDate}</span>
              </div>
            </div>

            <Button variant="outline" className="w-full bg-transparent">
              <ExternalLink className="mr-2 h-4 w-4" />
              View Public Profile
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Skills Card */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="font-serif font-bold text-lg">Skills</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {profileData.skills.map((skill, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {skill}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="font-serif font-bold text-lg">Network Stats</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Connections</span>
            <span className="font-medium">24</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Profile Views</span>
            <span className="font-medium">156</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Applications</span>
            <span className="font-medium">8</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
