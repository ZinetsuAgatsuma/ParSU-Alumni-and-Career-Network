"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { MapPin, Clock, DollarSign, Users, ExternalLink, Edit } from "lucide-react"
import Link from "next/link"

interface JobCardProps {
  job: {
    id: string
    title: string
    company: string
    location: string
    type: string
    remote: boolean
    salary: string
    postedDate: string
    description: string
    requirements: string[]
    applicants: number
    postedBy: {
      name: string
      title: string
      company: string
    }
  }
  userType?: string
}

export function JobCard({ job, userType }: JobCardProps) {
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

  const getCompanyInitials = (company: string) => {
    return company
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  const handleApply = () => {
    alert(`Apply to ${job.title} clicked! (Demo mode - no backend)`)
  }

  const handleViewApplications = () => {
    alert(`View applications for ${job.title} clicked! (Demo mode - no backend)`)
  }

  return (
    <Card className="border-border hover:shadow-lg transition-shadow">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4">
            <Avatar className="h-12 w-12">
              <AvatarFallback className="bg-primary text-primary-foreground">
                {getCompanyInitials(job.company)}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <h3 className="font-serif font-bold text-lg text-foreground">{job.title}</h3>
                <Badge variant={job.type === "Internship" ? "secondary" : "default"} className="text-xs">
                  {job.type}
                </Badge>
                {job.remote && (
                  <Badge variant="outline" className="text-xs">
                    Remote
                  </Badge>
                )}
              </div>

              <p className="text-sm font-medium text-muted-foreground mb-2">{job.company}</p>

              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-1 sm:space-y-0 text-xs text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <MapPin className="h-3 w-3" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <DollarSign className="h-3 w-3" />
                  <span>{job.salary}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-3 w-3" />
                  <span>{getTimeAgo(job.postedDate)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="h-3 w-3" />
                  <span>{job.applicants} applicants</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0">
            {userType === "employer" && (
              <Link href={`/jobs/${job.id}/edit`}>
                <Button variant="outline" size="sm" className="w-full sm:w-auto bg-transparent">
                  <Edit className="h-4 w-4 mr-2 sm:mr-0" />
                  <span className="sm:hidden">Edit Job</span>
                </Button>
              </Link>
            )}
            <Link href={`/jobs/${job.id}`}>
              <Button variant="outline" size="sm" className="w-full sm:w-auto bg-transparent">
                <ExternalLink className="h-4 w-4 mr-2 sm:mr-0" />
                <span className="sm:hidden">View Details</span>
              </Button>
            </Link>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-2">{job.description}</p>

        <div className="flex flex-wrap gap-2">
          {job.requirements.slice(0, 4).map((skill, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {skill}
            </Badge>
          ))}
          {job.requirements.length > 4 && (
            <Badge variant="secondary" className="text-xs">
              +{job.requirements.length - 4} more
            </Badge>
          )}
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0 pt-2 border-t border-border">
          <div className="flex items-center space-x-2">
            <Avatar className="h-6 w-6">
              <AvatarFallback className="bg-muted text-muted-foreground text-xs">
                {job.postedBy.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="text-xs text-muted-foreground">
              Posted by {job.postedBy.name} • {job.postedBy.title}
            </div>
          </div>

          <div className="flex space-x-2">
            {userType !== "employer" && (
              <Button size="sm" onClick={handleApply} className="flex-1 sm:flex-none">
                Apply Now
              </Button>
            )}

            {userType === "employer" && (
              <Button
                size="sm"
                variant="outline"
                onClick={handleViewApplications}
                className="flex-1 sm:flex-none bg-transparent"
              >
                <span className="hidden sm:inline">View Applications ({job.applicants})</span>
                <span className="sm:hidden">Applications ({job.applicants})</span>
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
