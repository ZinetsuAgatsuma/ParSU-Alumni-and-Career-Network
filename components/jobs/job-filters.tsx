"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { X, Search } from "lucide-react"

export function JobFilters() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])

  const jobTypes = ["Full-time", "Part-time", "Internship", "Contract"]
  const locations = ["Remote", "San Francisco, CA", "New York, NY", "Austin, TX", "Seattle, WA"]
  const companies = ["TechCorp", "StartupXYZ", "DataCorp", "DesignStudio", "InnovateLab"]
  const skills = ["JavaScript", "React", "Python", "Machine Learning", "Product Management", "UX Design"]

  const addFilter = (filter: string) => {
    if (!selectedFilters.includes(filter)) {
      setSelectedFilters([...selectedFilters, filter])
    }
  }

  const removeFilter = (filter: string) => {
    setSelectedFilters(selectedFilters.filter((f) => f !== filter))
  }

  const clearAllFilters = () => {
    setSelectedFilters([])
    setSearchTerm("")
  }

  return (
    <div className="space-y-6">
      {/* Search */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="font-serif font-bold text-lg">Search Jobs</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by title, company, or skills..."
              className="pl-10 bg-input border-border"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Active Filters */}
      {selectedFilters.length > 0 && (
        <Card className="border-border">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="font-serif font-bold text-lg">Active Filters</CardTitle>
              <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                Clear All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {selectedFilters.map((filter) => (
                <Badge key={filter} variant="secondary" className="text-xs">
                  {filter}
                  <button onClick={() => removeFilter(filter)} className="ml-2 hover:text-destructive">
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Job Type */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="font-serif font-bold text-lg">Job Type</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {jobTypes.map((type) => (
            <div key={type} className="flex items-center space-x-2">
              <Checkbox
                id={type}
                checked={selectedFilters.includes(type)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    addFilter(type)
                  } else {
                    removeFilter(type)
                  }
                }}
              />
              <Label htmlFor={type} className="text-sm font-normal cursor-pointer">
                {type}
              </Label>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Location */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="font-serif font-bold text-lg">Location</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {locations.map((location) => (
            <div key={location} className="flex items-center space-x-2">
              <Checkbox
                id={location}
                checked={selectedFilters.includes(location)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    addFilter(location)
                  } else {
                    removeFilter(location)
                  }
                }}
              />
              <Label htmlFor={location} className="text-sm font-normal cursor-pointer">
                {location}
              </Label>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Company */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="font-serif font-bold text-lg">Company</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {companies.map((company) => (
            <div key={company} className="flex items-center space-x-2">
              <Checkbox
                id={company}
                checked={selectedFilters.includes(company)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    addFilter(company)
                  } else {
                    removeFilter(company)
                  }
                }}
              />
              <Label htmlFor={company} className="text-sm font-normal cursor-pointer">
                {company}
              </Label>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Skills */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="font-serif font-bold text-lg">Required Skills</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {skills.map((skill) => (
            <div key={skill} className="flex items-center space-x-2">
              <Checkbox
                id={skill}
                checked={selectedFilters.includes(skill)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    addFilter(skill)
                  } else {
                    removeFilter(skill)
                  }
                }}
              />
              <Label htmlFor={skill} className="text-sm font-normal cursor-pointer">
                {skill}
              </Label>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
