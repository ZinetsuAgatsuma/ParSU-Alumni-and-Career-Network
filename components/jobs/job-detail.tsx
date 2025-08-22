"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { MapPin, Clock, DollarSign, Users, Calendar, Mail, ArrowLeft, ExternalLink, CheckCircle } from "lucide-react"
import { useRouter } from "next/navigation"

interface JobDetailProps {
  job: {
    id: string
    title: string
    company: string
    location: string
    type: string
    remote: boolean
    salary: string
    postedDate: string
    applicationDeadline: string
    description: string
    responsibilities: string[]
    qualifications: string[]
    requirements: string[]
    benefits: string[]
    applicants: number
    postedBy: {
      name: string
      title: string
      company: string
      email: string
    }
  }
  user: {
    userType?: string
    name?: string | null
  }
}

export function JobDetail({ job, user }: JobDetailProps) {
  const router = useRouter()
  const [hasApplied, setHasApplied] = useState(false)

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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const handleApply = () => {
    // In real app, this would submit application to backend
    setHasApplied(true)
  }

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Button variant="ghost" onClick={() => router.back()} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Jobs
      </Button>

      {/* Job Header */}
      <Card className="border-border">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                  {getCompanyInitials(job.company)}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h1 className="font-serif font-black text-2xl text-foreground">{job.title}</h1>
                  <Badge variant={job.type === "Internship" ? "secondary" : "default"}>{job.type}</Badge>
                  {job.remote && <Badge variant="outline">Remote</Badge>}
                </div>

                <p className="text-lg font-medium text-muted-foreground mb-3">{job.company}</p>

                <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <DollarSign className="h-4 w-4" />
                    <span>{job.salary}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>Posted {getTimeAgo(job.postedDate)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4" />
                    <span>{job.applicants} applicants</span>
                  </div>
                </div>
              </div>
            </div>

            {user.userType !== "employer" && (
              <div className="flex flex-col space-y-2">
                {hasApplied ? (
                  <Alert className="w-64">
                    <CheckCircle className="h-4 w-4" />
                    <AlertDescription>Application submitted successfully!</AlertDescription>
                  </Alert>
                ) : (
                  <Button onClick={handleApply} size="lg" className="w-64">
                    Apply for this Position
                  </Button>
                )}

                <div className="flex items-center justify-center space-x-1 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  <span>Deadline: {formatDate(job.applicationDeadline)}</span>
                </div>
              </div>
            )}
          </div>
        </CardHeader>
      </Card>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Job Description */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="font-serif font-bold">About this Role</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">{job.description}</p>
            </CardContent>
          </Card>

          {/* Responsibilities */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="font-serif font-bold">Key Responsibilities</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {job.responsibilities.map((responsibility, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <span className="text-muted-foreground">{responsibility}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Qualifications */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="font-serif font-bold">Qualifications</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {job.qualifications.map((qualification, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-secondary rounded-full mt-2 flex-shrink-0" />
                    <span className="text-muted-foreground">{qualification}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Benefits */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="font-serif font-bold">Benefits & Perks</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {job.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0" />
                    <span className="text-muted-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Required Skills */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="font-serif font-bold">Required Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {job.requirements.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="text-sm">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Posted By */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="font-serif font-bold">Posted By</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-muted text-muted-foreground">
                    {job.postedBy.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{job.postedBy.name}</p>
                  <p className="text-sm text-muted-foreground">{job.postedBy.title}</p>
                  <p className="text-sm text-muted-foreground">{job.postedBy.company}</p>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Button variant="outline" size="sm" className="w-full bg-transparent">
                  <Mail className="mr-2 h-4 w-4" />
                  Contact Recruiter
                </Button>
                <Button variant="outline" size="sm" className="w-full bg-transparent">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  View Company Profile
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Similar Jobs */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="font-serif font-bold">Similar Jobs</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-muted/30 rounded-lg">
                <h4 className="font-medium text-sm mb-1">Frontend Developer Intern</h4>
                <p className="text-xs text-muted-foreground">StartupXYZ • Remote</p>
              </div>
              <div className="p-3 bg-muted/30 rounded-lg">
                <h4 className="font-medium text-sm mb-1">Full Stack Engineer</h4>
                <p className="text-xs text-muted-foreground">TechFlow • San Francisco, CA</p>
              </div>
              <div className="p-3 bg-muted/30 rounded-lg">
                <h4 className="font-medium text-sm mb-1">Software Developer</h4>
                <p className="text-xs text-muted-foreground">InnovateLab • New York, NY</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
