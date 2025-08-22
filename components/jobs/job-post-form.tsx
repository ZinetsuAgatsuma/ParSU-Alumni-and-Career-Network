"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Plus, X, Save, Loader2 } from "lucide-react"

interface JobPostFormProps {
  user: {
    name?: string | null
    email?: string | null
    userType?: string
    university?: string
  }
}

export function JobPostForm({ user }: JobPostFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [newRequirement, setNewRequirement] = useState("")

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    type: "",
    remote: false,
    salaryMin: "",
    salaryMax: "",
    salaryType: "hourly", // hourly or annual
    description: "",
    responsibilities: "",
    qualifications: "",
    requirements: [] as string[],
    applicationDeadline: "",
    contactEmail: user.email || "",
    benefits: "",
  })

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const addRequirement = () => {
    if (newRequirement.trim() && !formData.requirements.includes(newRequirement.trim())) {
      setFormData((prev) => ({
        ...prev,
        requirements: [...prev.requirements, newRequirement.trim()],
      }))
      setNewRequirement("")
    }
  }

  const removeRequirement = (requirement: string) => {
    setFormData((prev) => ({
      ...prev,
      requirements: prev.requirements.filter((req) => req !== requirement),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Validate required fields
    if (!formData.title || !formData.company || !formData.location || !formData.type || !formData.description) {
      setError("Please fill in all required fields")
      setIsLoading(false)
      return
    }

    try {
      // Simulate API call to create job posting
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Redirect to jobs page on success
      router.push("/jobs")
    } catch (error) {
      setError("Failed to post job. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Basic Information */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="font-serif font-bold">Job Details</CardTitle>
          <CardDescription>Provide basic information about the position</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Job Title *</Label>
              <Input
                id="title"
                placeholder="Software Engineer Intern"
                className="bg-input border-border"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">Company *</Label>
              <Input
                id="company"
                placeholder="Your Company Name"
                className="bg-input border-border"
                value={formData.company}
                onChange={(e) => handleInputChange("company", e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                placeholder="San Francisco, CA"
                className="bg-input border-border"
                value={formData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Job Type *</Label>
              <Select onValueChange={(value) => handleInputChange("type", value)}>
                <SelectTrigger className="bg-input border-border">
                  <SelectValue placeholder="Select job type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="full-time">Full-time</SelectItem>
                  <SelectItem value="part-time">Part-time</SelectItem>
                  <SelectItem value="internship">Internship</SelectItem>
                  <SelectItem value="contract">Contract</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="remote"
              checked={formData.remote}
              onChange={(e) => handleInputChange("remote", e.target.checked)}
              className="rounded border-border"
            />
            <Label htmlFor="remote" className="text-sm">
              This is a remote position
            </Label>
          </div>
        </CardContent>
      </Card>

      {/* Compensation */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="font-serif font-bold">Compensation</CardTitle>
          <CardDescription>Specify salary or hourly rate information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="salaryType">Pay Type</Label>
              <Select onValueChange={(value) => handleInputChange("salaryType", value)} defaultValue="hourly">
                <SelectTrigger className="bg-input border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hourly">Hourly</SelectItem>
                  <SelectItem value="annual">Annual</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="salaryMin">Minimum {formData.salaryType === "hourly" ? "Rate" : "Salary"}</Label>
              <Input
                id="salaryMin"
                placeholder={formData.salaryType === "hourly" ? "$25" : "$60,000"}
                className="bg-input border-border"
                value={formData.salaryMin}
                onChange={(e) => handleInputChange("salaryMin", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="salaryMax">Maximum {formData.salaryType === "hourly" ? "Rate" : "Salary"}</Label>
              <Input
                id="salaryMax"
                placeholder={formData.salaryType === "hourly" ? "$35" : "$80,000"}
                className="bg-input border-border"
                value={formData.salaryMax}
                onChange={(e) => handleInputChange("salaryMax", e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Job Description */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="font-serif font-bold">Job Description</CardTitle>
          <CardDescription>Provide detailed information about the role</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="description">Job Description *</Label>
            <Textarea
              id="description"
              placeholder="Describe the role, what the candidate will be doing, and what makes this opportunity exciting..."
              className="bg-input border-border min-h-[120px]"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="responsibilities">Key Responsibilities</Label>
            <Textarea
              id="responsibilities"
              placeholder="List the main responsibilities and duties for this position..."
              className="bg-input border-border min-h-[100px]"
              value={formData.responsibilities}
              onChange={(e) => handleInputChange("responsibilities", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="qualifications">Qualifications</Label>
            <Textarea
              id="qualifications"
              placeholder="Describe the required education, experience, and qualifications..."
              className="bg-input border-border min-h-[100px]"
              value={formData.qualifications}
              onChange={(e) => handleInputChange("qualifications", e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Requirements & Skills */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="font-serif font-bold">Required Skills</CardTitle>
          <CardDescription>Add specific skills and technologies required for this role</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {formData.requirements.map((requirement, index) => (
              <Badge key={index} variant="secondary" className="text-sm">
                {requirement}
                <button
                  type="button"
                  onClick={() => removeRequirement(requirement)}
                  className="ml-2 hover:text-destructive"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>

          <div className="flex space-x-2">
            <Input
              placeholder="Add a required skill"
              className="bg-input border-border"
              value={newRequirement}
              onChange={(e) => setNewRequirement(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addRequirement())}
            />
            <Button type="button" onClick={addRequirement} size="sm">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Application Details */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="font-serif font-bold">Application Details</CardTitle>
          <CardDescription>Set application deadline and contact information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="applicationDeadline">Application Deadline</Label>
              <Input
                id="applicationDeadline"
                type="date"
                className="bg-input border-border"
                value={formData.applicationDeadline}
                onChange={(e) => handleInputChange("applicationDeadline", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactEmail">Contact Email</Label>
              <Input
                id="contactEmail"
                type="email"
                placeholder="hiring@company.com"
                className="bg-input border-border"
                value={formData.contactEmail}
                onChange={(e) => handleInputChange("contactEmail", e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="benefits">Benefits & Perks</Label>
            <Textarea
              id="benefits"
              placeholder="Describe benefits, perks, and what makes your company a great place to work..."
              className="bg-input border-border min-h-[80px]"
              value={formData.benefits}
              onChange={(e) => handleInputChange("benefits", e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Submit Button */}
      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading} className="px-8">
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          <Save className="mr-2 h-4 w-4" />
          Post Job
        </Button>
      </div>
    </form>
  )
}
