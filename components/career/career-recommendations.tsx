"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, Target, BookOpen, Users, Briefcase, Star, ArrowRight, Building, MapPin } from "lucide-react"

interface CareerRecommendationsProps {
  user: {
    userType?: string
    name?: string | null
  }
}

export function CareerRecommendations({ user }: CareerRecommendationsProps) {
  // Mock data - in real app, this would come from API based on user profile
  const recommendations = [
    {
      id: 1,
      title: "Software Engineer",
      company: "Google",
      location: "Mountain View, CA",
      match: 92,
      salary: "$120k - $180k",
      skills: ["React", "Node.js", "Python", "System Design"],
      description: "Join our team building next-generation web applications used by millions of users worldwide.",
      reasons: ["Strong match with your JavaScript skills", "Alumni connections at Google", "High growth potential"],
    },
    {
      id: 2,
      title: "Product Manager",
      company: "Meta",
      location: "Menlo Park, CA",
      match: 87,
      salary: "$130k - $200k",
      skills: ["Product Strategy", "Data Analysis", "User Research", "Leadership"],
      description: "Lead product development for our social media platforms and drive user engagement initiatives.",
      reasons: ["Your business background is valuable", "Strong alumni network", "Leadership experience"],
    },
    {
      id: 3,
      title: "Data Scientist",
      company: "Netflix",
      location: "Los Gatos, CA",
      match: 84,
      salary: "$110k - $160k",
      skills: ["Python", "Machine Learning", "Statistics", "SQL"],
      description: "Use data to improve content recommendations and user experience across our platform.",
      reasons: ["Math background aligns well", "Growing field", "Remote work options"],
    },
  ]

  const skillGaps = [
    { skill: "System Design", current: 60, target: 85, priority: "High" },
    { skill: "Leadership", current: 45, target: 75, priority: "Medium" },
    { skill: "Machine Learning", current: 30, target: 70, priority: "High" },
    { skill: "Public Speaking", current: 40, target: 65, priority: "Low" },
  ]

  const careerPaths = [
    {
      role: "Junior Developer",
      years: "0-2",
      skills: ["HTML/CSS", "JavaScript", "Git", "Basic Algorithms"],
      salary: "$60k - $80k",
      next: "Mid-level Developer",
    },
    {
      role: "Mid-level Developer",
      years: "2-5",
      skills: ["React/Vue", "Node.js", "Databases", "Testing"],
      salary: "$80k - $120k",
      next: "Senior Developer",
    },
    {
      role: "Senior Developer",
      years: "5-8",
      skills: ["System Design", "Mentoring", "Architecture", "Leadership"],
      salary: "$120k - $180k",
      next: "Tech Lead / Manager",
    },
    {
      role: "Tech Lead",
      years: "8+",
      skills: ["Team Leadership", "Strategic Planning", "Cross-team Collaboration"],
      salary: "$150k - $250k",
      next: "Engineering Manager",
    },
  ]

  const industryTrends = [
    {
      industry: "Technology",
      growth: "+15%",
      demand: "Very High",
      avgSalary: "$125k",
      topSkills: ["AI/ML", "Cloud Computing", "Cybersecurity", "Mobile Development"],
    },
    {
      industry: "Finance",
      growth: "+8%",
      demand: "High",
      avgSalary: "$110k",
      topSkills: ["Financial Modeling", "Risk Analysis", "Blockchain", "Quantitative Analysis"],
    },
    {
      industry: "Healthcare",
      growth: "+12%",
      demand: "High",
      avgSalary: "$95k",
      topSkills: ["Healthcare IT", "Data Analysis", "Regulatory Compliance", "Telemedicine"],
    },
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800"
      case "Medium":
        return "bg-yellow-100 text-yellow-800"
      case "Low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Tabs defaultValue="recommendations" className="space-y-6">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="recommendations">Job Matches</TabsTrigger>
        <TabsTrigger value="skills">Skill Development</TabsTrigger>
        <TabsTrigger value="paths">Career Paths</TabsTrigger>
        <TabsTrigger value="trends">Industry Trends</TabsTrigger>
      </TabsList>

      <TabsContent value="recommendations" className="space-y-6">
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="font-serif font-bold flex items-center">
              <Target className="h-5 w-5 mr-2 text-primary" />
              Personalized Job Recommendations
            </CardTitle>
            <CardDescription>Based on your profile, skills, and alumni network connections</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {recommendations.map((job) => (
              <div key={job.id} className="p-6 bg-muted/30 rounded-lg">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-serif font-bold text-lg">{job.title}</h3>
                      <Badge className="bg-primary text-primary-foreground">{job.match}% Match</Badge>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center">
                        <Building className="h-4 w-4 mr-1" />
                        {job.company}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {job.location}
                      </div>
                      <div className="font-medium text-foreground">{job.salary}</div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">{job.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {job.skills.map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Why this matches you:</p>
                      {job.reasons.map((reason, index) => (
                        <p key={index} className="text-sm text-muted-foreground flex items-center">
                          <Star className="h-3 w-3 mr-2 text-yellow-500" />
                          {reason}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex space-x-3">
                  <Button>
                    <Briefcase className="h-4 w-4 mr-2" />
                    View Job Details
                  </Button>
                  <Button variant="outline">
                    <Users className="h-4 w-4 mr-2" />
                    Connect with Alumni
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="skills" className="space-y-6">
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="font-serif font-bold flex items-center">
              <BookOpen className="h-5 w-5 mr-2 text-secondary" />
              Skill Development Plan
            </CardTitle>
            <CardDescription>Bridge the gap between your current skills and your career goals</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {skillGaps.map((skill) => (
              <div key={skill.skill} className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <h4 className="font-medium">{skill.skill}</h4>
                    <Badge className={`text-xs ${getPriorityColor(skill.priority)}`}>{skill.priority} Priority</Badge>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {skill.current}% → {skill.target}%
                  </span>
                </div>
                <Progress value={skill.current} className="h-2" />
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Current Level</span>
                  <Button variant="outline" size="sm">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Find Resources
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="paths" className="space-y-6">
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="font-serif font-bold flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-accent" />
              Software Engineering Career Path
            </CardTitle>
            <CardDescription>Typical progression and skills needed for each level</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {careerPaths.map((path, index) => (
                <div key={path.role} className="relative">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-serif font-bold text-lg">{path.role}</h3>
                        <div className="text-right">
                          <div className="text-sm font-medium">{path.salary}</div>
                          <div className="text-xs text-muted-foreground">{path.years} years</div>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {path.skills.map((skill) => (
                          <Badge key={skill} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                      {path.next && (
                        <div className="flex items-center text-sm text-muted-foreground">
                          <span>Next step: {path.next}</span>
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </div>
                      )}
                    </div>
                  </div>
                  {index < careerPaths.length - 1 && <div className="absolute left-6 top-12 w-px h-6 bg-border"></div>}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="trends" className="space-y-6">
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="font-serif font-bold flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-chart-3" />
              Industry Trends & Insights
            </CardTitle>
            <CardDescription>Current market trends and in-demand skills across industries</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-1 gap-6">
              {industryTrends.map((industry) => (
                <div key={industry.industry} className="p-6 bg-muted/30 rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-serif font-bold text-lg">{industry.industry}</h3>
                    <div className="flex items-center space-x-4 text-sm">
                      <div className="text-center">
                        <div className="font-medium text-green-600">{industry.growth}</div>
                        <div className="text-muted-foreground">Growth</div>
                      </div>
                      <div className="text-center">
                        <div className="font-medium">{industry.demand}</div>
                        <div className="text-muted-foreground">Demand</div>
                      </div>
                      <div className="text-center">
                        <div className="font-medium">{industry.avgSalary}</div>
                        <div className="text-muted-foreground">Avg Salary</div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-2">Top Skills in Demand:</p>
                    <div className="flex flex-wrap gap-2">
                      {industry.topSkills.map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
