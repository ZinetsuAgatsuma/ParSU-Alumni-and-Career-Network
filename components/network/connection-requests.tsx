"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Check, X, GraduationCap } from "lucide-react"

interface ConnectionRequest {
  id: string
  name: string
  title: string
  company: string
  university: string
  graduationYear: string
  message: string
  requestDate: string
}

interface ConnectionRequestsProps {
  requests: ConnectionRequest[]
}

export function ConnectionRequests({ requests }: ConnectionRequestsProps) {
  const [requestList, setRequestList] = useState(requests)

  const getUserInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 1) return "1 day ago"
    if (diffDays < 7) return `${diffDays} days ago`
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`
    return `${Math.ceil(diffDays / 30)} months ago`
  }

  const handleAccept = (requestId: string) => {
    // In real app, this would accept connection request via API
    setRequestList(requestList.filter((req) => req.id !== requestId))
  }

  const handleDecline = (requestId: string) => {
    // In real app, this would decline connection request via API
    setRequestList(requestList.filter((req) => req.id !== requestId))
  }

  if (requestList.length === 0) {
    return (
      <Card className="border-border">
        <CardContent className="py-12 text-center">
          <div className="space-y-4">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
              <Check className="h-8 w-8 text-muted-foreground" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-foreground mb-2">All caught up!</h3>
              <p className="text-muted-foreground">You don't have any pending connection requests.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {requestList.map((request) => (
        <Card key={request.id} className="border-border">
          <CardHeader>
            <div className="flex items-start space-x-4">
              <Avatar className="h-12 w-12">
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {getUserInitials(request.name)}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-serif font-bold text-lg text-foreground">{request.name}</h3>
                    <p className="text-sm font-medium text-muted-foreground">{request.title}</p>
                    <p className="text-sm text-muted-foreground">{request.company}</p>

                    <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <GraduationCap className="h-3 w-3" />
                        <span>
                          {request.university} • {request.graduationYear}
                        </span>
                      </div>
                    </div>
                  </div>

                  <Badge variant="outline" className="text-xs">
                    {getTimeAgo(request.requestDate)}
                  </Badge>
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="bg-muted/30 p-4 rounded-lg">
              <p className="text-sm text-muted-foreground italic">"{request.message}"</p>
            </div>

            <div className="flex space-x-3">
              <Button onClick={() => handleAccept(request.id)} size="sm" className="flex-1">
                <Check className="mr-2 h-4 w-4" />
                Accept
              </Button>
              <Button
                onClick={() => handleDecline(request.id)}
                variant="outline"
                size="sm"
                className="flex-1 bg-transparent"
              >
                <X className="mr-2 h-4 w-4" />
                Decline
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
