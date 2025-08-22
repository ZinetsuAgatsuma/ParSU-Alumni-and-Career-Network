import { DashboardNav } from "@/components/dashboard/dashboard-nav"
import { JobFilters } from "@/components/jobs/job-filters"
import { JobCard } from "@/components/jobs/job-card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

export default function JobsPage() {
  const mockUser = {
    id: "1",
    name: "Alex Johnson",
    email: "alex.johnson@university.edu",
    userType: "student",
    university: "Stanford University",
  }

  // Mock job data - in real app, this would come from database
  const jobs = [
    {
      id: "1",
      title: "Software Engineering Intern",
      company: "TechCorp",
      location: "San Francisco, CA",
      type: "Internship",
      remote: false,
      salary: "$25-30/hour",
      postedDate: "2024-01-15",
      description: "Join our engineering team to build scalable web applications using React and Node.js.",
      requirements: ["JavaScript", "React", "Node.js", "Git"],
      applicants: 12,
      postedBy: {
        name: "John Smith",
        title: "Senior Engineering Manager",
        company: "TechCorp",
      },
    },
    {
      id: "2",
      title: "Product Manager",
      company: "StartupXYZ",
      location: "Remote",
      type: "Full-time",
      remote: true,
      salary: "$90k-120k",
      postedDate: "2024-01-14",
      description: "Lead product strategy and work with cross-functional teams to deliver innovative solutions.",
      requirements: ["Product Management", "Analytics", "Agile", "Leadership"],
      applicants: 8,
      postedBy: {
        name: "Sarah Johnson",
        title: "VP of Product",
        company: "StartupXYZ",
      },
    },
    {
      id: "3",
      title: "Data Science Intern",
      company: "DataCorp",
      location: "New York, NY",
      type: "Internship",
      remote: false,
      salary: "$28-35/hour",
      postedDate: "2024-01-13",
      description: "Work on machine learning projects and data analysis to drive business insights.",
      requirements: ["Python", "Machine Learning", "SQL", "Statistics"],
      applicants: 15,
      postedBy: {
        name: "Dr. Emily Chen",
        title: "Head of Data Science",
        company: "DataCorp",
      },
    },
    {
      id: "4",
      title: "UX Designer",
      company: "DesignStudio",
      location: "Austin, TX",
      type: "Full-time",
      remote: true,
      salary: "$70k-90k",
      postedDate: "2024-01-12",
      description: "Create user-centered designs for web and mobile applications.",
      requirements: ["Figma", "User Research", "Prototyping", "Design Systems"],
      applicants: 6,
      postedBy: {
        name: "Michael Brown",
        title: "Design Director",
        company: "DesignStudio",
      },
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav user={mockUser} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="font-serif font-black text-3xl text-foreground mb-2">
              {mockUser.userType === "employer" ? "Manage Jobs" : "Job Opportunities"}
            </h1>
            <p className="text-muted-foreground">
              {mockUser.userType === "employer"
                ? "Post new opportunities and manage applications"
                : "Discover internships and full-time positions from top companies"}
            </p>
          </div>

          {(mockUser.userType === "employer" || mockUser.userType === "alumni") && (
            <Link href="/jobs/post">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Post Job
              </Button>
            </Link>
          )}
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <JobFilters />
          </div>

          {/* Job Listings */}
          <div className="lg:col-span-3">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <p className="text-sm text-muted-foreground">Showing {jobs.length} opportunities</p>
              </div>

              <div className="space-y-4">
                {jobs.map((job) => (
                  <JobCard key={job.id} job={job} userType={mockUser.userType} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
