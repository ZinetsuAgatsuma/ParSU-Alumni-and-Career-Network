"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MapPin, GraduationCap, Users, MessageCircle, UserPlus, UserCheck, Clock, ExternalLink } from "lucide-react"
import Link from "next/link"

interface AlumniCardProps {
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
  }
  currentUser: {
    userType?: string
  }
  showConnectionActions?: boolean
}

export function AlumniCard({ alumni, currentUser, showConnectionActions = true }: AlumniCardProps) {
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
    if (!showConnectionActions) return null

    if (isConnected) {
      return (
        <Button variant="outline" size="sm" className="bg-transparent">
          <UserCheck className="mr-2 h-4 w-4" />
          Connected
        </Button>
      )
    }

    if (connectionStatus === "pending") {
      return (
        <Button variant="outline" size="sm" disabled className="bg-transparent">
          <Clock className="mr-2 h-4 w-4" />
          Pending
        </Button>
      )
    }

    return (
      <Button onClick={handleConnect} size="sm">
        <UserPlus className="mr-2 h-4 w-4" />
        Connect
      </Button>
    )
  }

  return (
    <Card className="border-border hover:shadow-lg transition-shadow">
      <CardHeader className="pb-4">
        <div className="flex items-start space-x-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={alumni.profileImage || undefined} alt={alumni.name} />
            <AvatarFallback className="bg-primary text-primary-foreground text-lg">
              {getUserInitials(alumni.name)}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-serif font-bold text-lg text-foreground truncate">{alumni.name}</h3>
                <p className="text-sm font-medium text-muted-foreground">{alumni.title}</p>
                <p className="text-sm text-muted-foreground">{alumni.company}</p>
              </div>

              <Link href={`/network/${alumni.id}`}>
                <Button variant="ghost" size="sm">
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-1 sm:space-y-0 mt-3 text-xs text-muted-foreground">
              <div className="flex items-center space-x-1">
                <MapPin className="h-3 w-3" />
                <span>{alumni.location}</span>
              </div>
              <div className="flex items-center space-x-1">
                <GraduationCap className="h-3 w-3" />
                <span>{alumni.graduationYear}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="h-3 w-3" />
                <span>{alumni.connections} connections</span>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-sm">
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">
              {alumni.major} • {alumni.university}
            </span>
          </div>

          {alumni.mutualConnections > 0 && (
            <div className="flex items-center space-x-2 text-sm">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">{alumni.mutualConnections} mutual connections</span>
            </div>
          )}
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2">{alumni.bio}</p>

        <div className="flex flex-wrap gap-2">
          {alumni.skills.slice(0, 3).map((skill, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {skill}
            </Badge>
          ))}
          {alumni.skills.length > 3 && (
            <Badge variant="secondary" className="text-xs">
              +{alumni.skills.length - 3} more
            </Badge>
          )}
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0 pt-2 border-t border-border">
          <div className="flex flex-col sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0 w-full sm:w-auto">
            {getConnectionButton()}
            {(isConnected || connectionStatus === "connected") && (
              <Button variant="outline" size="sm" onClick={handleMessage} className="bg-transparent w-full sm:w-auto">
                <MessageCircle className="mr-2 h-4 w-4" />
                Message
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
