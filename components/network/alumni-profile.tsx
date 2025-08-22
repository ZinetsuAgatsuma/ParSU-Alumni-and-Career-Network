"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  MapPin,
  GraduationCap,
  Users,
  MessageCircle,
  UserPlus,
  UserCheck,
  Clock,
  ArrowLeft,
  Briefcase,
  Award,
  Heart,
} from "lucide-react"
import { useRouter } from "next/navigation"

interface AlumniProfileProps {
  alumni: {
    id: string
    name: string
    title: string
    company: string
    location: string
    university: string
    graduationYear: string
    major: string
    skills: string[]
    bio: string
    connections: number
    mutualConnections: number
    profileImage?: string | null
    isConnected: boolean
    connectionStatus: "connected" | "pending" | null
    experience: Array<{
      title: string
      company: string
      duration: string
      description: string
    }>
    education: Array<{
      degree: string
      school: string
      year: string
      details: string
    }>
    achievements: string[]
    interests: string[]
  }
  currentUser: {
    userType?: string
  }
}

export function AlumniProfile({ alumni, currentUser }: AlumniProfileProps) {
  const router = useRouter()
  const [connectionStatus, setConnectionStatus] = useState(alumni.connectionStatus)
  const [isConnected, setIsConnected] = useState(alumni.isConnected)

  const getUserInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  const handleConnect = () => {
    // In real app, this would send connection request to backend
    setConnectionStatus("pending")
  }

  const handleMessage = () => {
    // In real app, this would open messaging interface
    console.log("Opening message interface for", alumni.name)
  }

  const getConnectionButton = () => {
    if (isConnected) {
      return (
        <Button variant="outline" className="bg-transparent">
          <UserCheck className="mr-2 h-4 w-4" />
          Connected
        </Button>
      )
    }

    if (connectionStatus === "pending") {
      return (
        <Button variant="outline" disabled className="bg-transparent">
          <Clock className="mr-2 h-4 w-4" />
          Pending
        </Button>
      )
    }

    return (
      <Button onClick={handleConnect}>
        <UserPlus className="mr-2 h-4 w-4" />
        Connect
      </Button>
    )
  }

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Button variant="ghost" onClick={() => router.back()} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Network
      </Button>

      {/* Profile Header */}
      <Card className="border-border">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-6">
              <Avatar className="h-24 w-24">
                <AvatarImage src={alumni.profileImage || undefined} alt={alumni.name} />
                <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                  {getUserInitials(alumni.name)}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <h1 className="font-serif font-black text-3xl text-foreground mb-2">{alumni.name}</h1>
                <p className="text-lg font-medium text-muted-foreground mb-1">{alumni.title}</p>
                <p className="text-lg text-muted-foreground mb-4">{alumni.company}</p>

                <div className="flex items-center space-x-6 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span>{alumni.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <GraduationCap className="h-4 w-4" />
                    <span>
                      {alumni.major} • {alumni.university} • {alumni.graduationYear}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4" />
                    <span>{alumni.connections} connections</span>
                  </div>
                </div>

                {alumni.mutualConnections > 0 && (
                  <div className="flex items-center space-x-1 text-sm text-muted-foreground mb-4">
                    <Users className="h-4 w-4" />
                    <span>{alumni.mutualConnections} mutual connections</span>
                  </div>
                )}

                <p className="text-muted-foreground leading-relaxed max-w-2xl">{alumni.bio}</p>
              </div>
            </div>

            <div className="flex flex-col space-y-3">
              {getConnectionButton()}
              {(isConnected || connectionStatus === "connected") && (
                <Button variant="outline" onClick={handleMessage} className="bg-transparent">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Message
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Experience */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="font-serif font-bold flex items-center">
                <Briefcase className="mr-2 h-5 w-5" />
                Experience
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {alumni.experience.map((exp, index) => (
                <div key={index}>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Briefcase className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-foreground">{exp.title}</h3>
                      <p className="text-sm text-muted-foreground mb-1">{exp.company}</p>
                      <p className="text-xs text-muted-foreground mb-3">{exp.duration}</p>
                      <p className="text-sm text-muted-foreground">{exp.description}</p>
                    </div>
                  </div>
                  {index < alumni.experience.length - 1 && <Separator className="mt-6" />}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Education */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="font-serif font-bold flex items-center">
                <GraduationCap className="mr-2 h-5 w-5" />
                Education
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {alumni.education.map((edu, index) => (
                <div key={index}>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <GraduationCap className="h-6 w-6 text-secondary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-foreground">{edu.degree}</h3>
                      <p className="text-sm text-muted-foreground mb-1">{edu.school}</p>
                      <p className="text-xs text-muted-foreground mb-3">{edu.year}</p>
                      <p className="text-sm text-muted-foreground">{edu.details}</p>
                    </div>
                  </div>
                  {index < alumni.education.length - 1 && <Separator className="mt-6" />}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Skills */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="font-serif font-bold">Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {alumni.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="text-sm">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="font-serif font-bold flex items-center">
                <Award className="mr-2 h-5 w-5" />
                Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {alumni.achievements.map((achievement, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{achievement}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Interests */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="font-serif font-bold flex items-center">
                <Heart className="mr-2 h-5 w-5" />
                Interests
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {alumni.interests.map((interest, index) => (
                  <Badge key={index} variant="outline" className="text-sm">
                    {interest}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
