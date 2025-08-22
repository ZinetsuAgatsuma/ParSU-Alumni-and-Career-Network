"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X, Search } from "lucide-react"

export function AlumniFilters() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])

  const universities = ["Stanford University", "UC Berkeley", "MIT", "NYU", "Harvard University"]
  const companies = ["Google", "Meta", "Apple", "Netflix", "Spotify", "Airbnb", "Microsoft"]
  const locations = ["San Francisco, CA", "Mountain View, CA", "New York, NY", "Seattle, WA", "Austin, TX"]
  const skills = ["JavaScript", "React", "Python", "Machine Learning", "Product Management", "UX Design", "Analytics"]
  const majors = ["Computer Science", "Business Administration", "Design", "Marketing", "Engineering"]

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
          <CardTitle className="font-serif font-bold text-lg">Search Alumni</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, company, or skills..."
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

      {/* Graduation Year */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="font-serif font-bold text-lg">Graduation Year</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-2">
              <Label htmlFor="yearFrom" className="text-sm">
                From
              </Label>
              <Select>
                <SelectTrigger className="bg-input border-border">
                  <SelectValue placeholder="2015" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 10 }, (_, i) => 2015 + i).map((year) => (
                    <SelectItem key={year} value={year.toString()}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="yearTo" className="text-sm">
                To
              </Label>
              <Select>
                <SelectTrigger className="bg-input border-border">
                  <SelectValue placeholder="2024" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 10 }, (_, i) => 2015 + i).map((year) => (
                    <SelectItem key={year} value={year.toString()}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* University */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="font-serif font-bold text-lg">University</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {universities.map((university) => (
            <div key={university} className="flex items-center space-x-2">
              <Checkbox
                id={university}
                checked={selectedFilters.includes(university)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    addFilter(university)
                  } else {
                    removeFilter(university)
                  }
                }}
              />
              <Label htmlFor={university} className="text-sm font-normal cursor-pointer">
                {university}
              </Label>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Company */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="font-serif font-bold text-lg">Current Company</CardTitle>
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

      {/* Skills */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="font-serif font-bold text-lg">Skills</CardTitle>
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
