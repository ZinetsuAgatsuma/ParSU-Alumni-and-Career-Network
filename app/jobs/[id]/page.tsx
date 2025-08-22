import { DashboardNav } from "@/components/dashboard/dashboard-nav"
import { JobDetail } from "@/components/jobs/job-detail"

interface JobDetailPageProps {
  params: {
    id: string
  }
}

export default function JobDetailPage({ params }: JobDetailPageProps) {
  const mockUser = {
    id: "1",
    name: "Alex Johnson",
    email: "alex.johnson@university.edu",
    userType: "student",
    university: "Stanford University",
  }

  // Mock job data - in real app, this would be fetched from database using params.id
  const job = {
    id: params.id,
    title: "Software Engineering Intern",
    company: "TechCorp",
    location: "San Francisco, CA",
    type: "Internship",
    remote: false,
    salary: "$25-30/hour",
    postedDate: "2024-01-15",
    applicationDeadline: "2024-02-15",
    description:
      "Join our engineering team to build scalable web applications using React and Node.js. You'll work alongside senior developers on real projects that impact millions of users.",
    responsibilities: [
      "Develop and maintain web applications using React and Node.js",
      "Collaborate with cross-functional teams to define and implement new features",
      "Write clean, maintainable, and well-documented code",
      "Participate in code reviews and contribute to team best practices",
      "Learn and apply new technologies and frameworks",
    ],
    qualifications: [
      "Currently pursuing a degree in Computer Science or related field",
      "Strong foundation in JavaScript, HTML, and CSS",
      "Experience with React or similar frontend frameworks",
      "Familiarity with version control systems (Git)",
      "Strong problem-solving skills and attention to detail",
    ],
    requirements: ["JavaScript", "React", "Node.js", "Git", "HTML/CSS"],
    benefits: [
      "Competitive hourly compensation",
      "Mentorship from senior engineers",
      "Flexible working hours",
      "Professional development opportunities",
      "Potential for full-time offer",
    ],
    applicants: 12,
    postedBy: {
      name: "John Smith",
      title: "Senior Engineering Manager",
      company: "TechCorp",
      email: "john.smith@techcorp.com",
    },
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav user={mockUser} />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <JobDetail job={job} user={mockUser} />
      </main>
    </div>
  )
}
