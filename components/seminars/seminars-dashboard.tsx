"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Calendar, UserPlus } from "lucide-react"

interface SeminarsDashboardProps {
  user: {
    userType?: string
    name?: string | null
  }
}

const seminars = [
  {
    id: 1,
    title: "Tech Careers 2025",
    host: "Sarah Chen",
    company: "Google",
    date: "2025-09-10",
    description: "Explore the latest trends and opportunities in technology careers.",
    slots: 50,
    registered: 32,
  },
  {
    id: 2,
    title: "Finance for Graduates",
    host: "Dr. Emily Watson",
    company: "Goldman Sachs",
    date: "2025-09-15",
    description: "A seminar for students and graduates interested in finance careers.",
    slots: 40,
    registered: 28,
  },
]

export function SeminarsDashboard({ user }: SeminarsDashboardProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [requests, setRequests] = useState<number[]>([])
  const [filter, setFilter] = useState<string>("all")

  const handleRequest = (seminarId: number) => {
    setRequests([...requests, seminarId])
  }

  return (
    <Tabs defaultValue="browse" className="w-full">
      <TabsList className="mb-4">
        <TabsTrigger value="browse">Browse Seminars</TabsTrigger>
        <TabsTrigger value="requests">My Requests</TabsTrigger>
      </TabsList>
      <TabsContent value="browse">
        <div className="flex gap-4 mb-4">
          <Input
            placeholder="Search seminars..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-1/2"
          />
          <select
            value={filter}
            onChange={e => setFilter(e.target.value)}
            className="border rounded px-2 py-1 text-sm bg-background"
            style={{ minWidth: 120 }}
          >
            <option value="all">All</option>
            <option value="Technology">Technology</option>
            <option value="Finance">Finance</option>
          </select>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {seminars
            .filter(s => s.title.toLowerCase().includes(searchTerm.toLowerCase()))
            .filter(s => filter === "all" || s.company === (filter === "Technology" ? "Google" : "Goldman Sachs"))
            .map(seminar => (
              <Card key={seminar.id}>
                <CardHeader>
                  <CardTitle>{seminar.title}</CardTitle>
                  <CardDescription>{seminar.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 mb-2">
                    <Avatar>
                      <AvatarFallback>{seminar.host[0]}</AvatarFallback>
                    </Avatar>
                    <span>{seminar.host} ({seminar.company})</span>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar size={16} />
                    <span>{seminar.date}</span>
                  </div>
                  <div className="mb-2">Slots: {seminar.registered} / {seminar.slots}</div>
                  <Button
                    variant={requests.includes(seminar.id) ? "secondary" : "default"}
                    disabled={requests.includes(seminar.id)}
                    onClick={() => handleRequest(seminar.id)}
                  >
                    <UserPlus size={16} className="mr-2" />
                    {requests.includes(seminar.id) ? "Requested" : "Request to Join"}
                  </Button>
                </CardContent>
              </Card>
            ))}
        </div>
      </TabsContent>
      <TabsContent value="requests">
        {requests.length === 0 ? (
          <div className="text-muted-foreground">No seminar requests yet.</div>
        ) : (
          <ul className="list-disc pl-4">
            {requests.map(id => {
              const seminar = seminars.find(s => s.id === id)
              return seminar ? (
                <li key={id}>{seminar.title} on {seminar.date} (Requested)</li>
              ) : null
            })}
          </ul>
        )}
      </TabsContent>
    </Tabs>
  )
}
