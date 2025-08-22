import { DashboardNav } from "@/components/dashboard/dashboard-nav"
import { AlumniFilters } from "@/components/network/alumni-filters"
import { AlumniCard } from "@/components/network/alumni-card"
import { ConnectionRequests } from "@/components/network/connection-requests"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default async function NetworkPage() {
  const mockUser = {
    id: "1",
    name: "Alex Johnson",
    email: "alex.johnson@university.edu",
    userType: "student",
    university: "Stanford University",
  }

  // Mock alumni data - in real app, this would come from database
  const alumni = [
    {
      id: "1",
      name: "Sarah Johnson",
      title: "Senior Software Engineer",
      company: "Google",
      location: "Mountain View, CA",
      university: "Stanford University",
      graduationYear: "2019",
      major: "Computer Science",
      skills: ["JavaScript", "React", "Python", "Machine Learning"],
      bio: "Passionate about building scalable systems and mentoring junior developers.",
      connections: 156,
      mutualConnections: 8,
      profileImage: null,
      isConnected: false,
      connectionStatus: null,
    },
    {
      id: "2",
      name: "Michael Chen",
      title: "Product Manager",
      company: "Meta",
      location: "Menlo Park, CA",
      university: "UC Berkeley",
      graduationYear: "2020",
      major: "Business Administration",
      skills: ["Product Strategy", "Analytics", "User Research", "Agile"],
      bio: "Leading product initiatives that impact billions of users worldwide.",
      connections: 203,
      mutualConnections: 12,
      profileImage: null,
      isConnected: true,
      connectionStatus: "connected",
    },
    {
      id: "3",
      name: "Emily Rodriguez",
      title: "UX Designer",
      company: "Airbnb",
      location: "San Francisco, CA",
      university: "Stanford University",
      graduationYear: "2021",
      major: "Design",
      skills: ["Figma", "User Research", "Prototyping", "Design Systems"],
      bio: "Creating delightful user experiences through research-driven design.",
      connections: 89,
      mutualConnections: 5,
      profileImage: null,
      isConnected: false,
      connectionStatus: "pending",
    },
    {
      id: "4",
      name: "David Kim",
      title: "Data Scientist",
      company: "Netflix",
      location: "Los Gatos, CA",
      university: "MIT",
      graduationYear: "2018",
      major: "Computer Science",
      skills: ["Python", "Machine Learning", "SQL", "Statistics"],
      bio: "Using data to drive content recommendations and business decisions.",
      connections: 134,
      mutualConnections: 3,
      profileImage: null,
      isConnected: false,
      connectionStatus: null,
    },
    {
      id: "5",
      name: "Lisa Wang",
      title: "Marketing Director",
      company: "Spotify",
      location: "New York, NY",
      university: "NYU",
      graduationYear: "2017",
      major: "Marketing",
      skills: ["Digital Marketing", "Brand Strategy", "Analytics", "Growth"],
      bio: "Building brand awareness and driving user acquisition through innovative campaigns.",
      connections: 267,
      mutualConnections: 15,
      profileImage: null,
      isConnected: false,
      connectionStatus: null,
    },
  ]

  // Mock connection requests
  const connectionRequests = [
    {
      id: "1",
      name: "Alex Thompson",
      title: "Software Engineer",
      company: "Apple",
      university: "Stanford University",
      graduationYear: "2022",
      message: "Hi! I'd love to connect and learn about your experience in the tech industry.",
      requestDate: "2024-01-16",
    },
    {
      id: "2",
      name: "Jessica Brown",
      title: "Product Designer",
      company: "Adobe",
      university: "UC Berkeley",
      graduationYear: "2023",
      message: "Hello! I'm interested in transitioning to product design and would appreciate your insights.",
      requestDate: "2024-01-15",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav user={mockUser} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-serif font-black text-3xl text-foreground mb-2">Professional Network</h1>
          <p className="text-muted-foreground">
            Connect with alumni, discover career paths, and build meaningful professional relationships.
          </p>
        </div>

        <Tabs defaultValue="discover" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="discover">Discover Alumni</TabsTrigger>
            <TabsTrigger value="connections">My Connections</TabsTrigger>
            <TabsTrigger value="requests">
              Requests {connectionRequests.length > 0 && `(${connectionRequests.length})`}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="discover" className="space-y-6">
            <div className="grid lg:grid-cols-4 gap-8">
              {/* Filters Sidebar */}
              <div className="lg:col-span-1">
                <AlumniFilters />
              </div>

              {/* Alumni Listings */}
              <div className="lg:col-span-3">
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-muted-foreground">Showing {alumni.length} alumni</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {alumni.map((person) => (
                      <AlumniCard key={person.id} alumni={person} currentUser={mockUser} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="connections" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {alumni
                .filter((person) => person.isConnected)
                .map((person) => (
                  <AlumniCard key={person.id} alumni={person} currentUser={mockUser} showConnectionActions={false} />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="requests" className="space-y-6">
            <ConnectionRequests requests={connectionRequests} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
