"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const data = [
  { month: "Jan", users: 1200, jobs: 45, connections: 890 },
  { month: "Feb", users: 1350, jobs: 52, connections: 1120 },
  { month: "Mar", users: 1580, jobs: 68, connections: 1450 },
  { month: "Apr", users: 1820, jobs: 78, connections: 1780 },
  { month: "May", users: 2100, jobs: 95, connections: 2340 },
  { month: "Jun", users: 2450, jobs: 112, connections: 2890 },
  { month: "Jul", users: 2847, jobs: 156, connections: 4521 },
]

const chartConfig = {
  users: {
    label: "Users",
    color: "hsl(var(--primary))",
  },
  jobs: {
    label: "Jobs",
    color: "hsl(var(--secondary))",
  },
  connections: {
    label: "Connections",
    color: "hsl(var(--accent))",
  },
}

export function AnalyticsChart() {
  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle className="font-serif font-bold">Platform Growth</CardTitle>
        <CardDescription>User registration, job postings, and network connections over time</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <XAxis dataKey="month" axisLine={false} tickLine={false} className="text-xs" />
              <YAxis axisLine={false} tickLine={false} className="text-xs" />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area
                type="monotone"
                dataKey="users"
                stackId="1"
                stroke={chartConfig.users.color}
                fill={chartConfig.users.color}
                fillOpacity={0.6}
              />
              <Area
                type="monotone"
                dataKey="connections"
                stackId="2"
                stroke={chartConfig.connections.color}
                fill={chartConfig.connections.color}
                fillOpacity={0.6}
              />
              <Area
                type="monotone"
                dataKey="jobs"
                stackId="3"
                stroke={chartConfig.jobs.color}
                fill={chartConfig.jobs.color}
                fillOpacity={0.6}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
