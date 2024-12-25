import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Users,
  MoreVertical,
  Plus,
  Search,
  ArrowUpRight,
  PiggyBank,
  Calendar,
} from "lucide-react";
import { motion } from "framer-motion";

// Mock data - replace with real data later
const circles = [
  {
    id: 1,
    name: "Family Savings",
    members: 5,
    targetAmount: 5000000,
    currentAmount: 2500000,
    nextContribution: "2024-01-01",
    status: "active",
    contributionFrequency: "Monthly",
    contributionAmount: 100000,
  },
  {
    id: 2,
    name: "Wedding Fund",
    members: 8,
    targetAmount: 10000000,
    currentAmount: 7500000,
    nextContribution: "2024-01-05",
    status: "active",
    contributionFrequency: "Weekly",
    contributionAmount: 50000,
  },
  {
    id: 3,
    name: "Business Investment",
    members: 4,
    targetAmount: 20000000,
    currentAmount: 5000000,
    nextContribution: "2024-01-10",
    status: "active",
    contributionFrequency: "Monthly",
    contributionAmount: 250000,
  },
];

export default function Circles() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">My Circles</h2>
            <p className="text-muted-foreground">
              Manage your savings circles and track their progress
            </p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Create New Circle
          </Button>
        </div>

        {/* Search and Filter */}
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <Input
              placeholder="Search circles..."
              className="pl-10"
            />
          </div>
          <Button variant="outline">Filter</Button>
        </div>

        {/* Circle Cards */}
        <div className="grid gap-6 md:grid-cols-3">
          {circles.map((circle, index) => (
            <motion.div
              key={circle.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-lg">{circle.name}</h3>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Users className="h-4 w-4 mr-1" />
                      {circle.members} members
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Invite Members</DropdownMenuItem>
                      <DropdownMenuItem>Edit Circle</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">
                        Leave Circle
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">
                        {Math.round((circle.currentAmount / circle.targetAmount) * 100)}%
                      </span>
                    </div>
                    <Progress
                      value={(circle.currentAmount / circle.targetAmount) * 100}
                      className="h-2"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Target</p>
                      <p className="font-medium">
                        UGX {circle.targetAmount.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Current</p>
                      <p className="font-medium">
                        UGX {circle.currentAmount.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center text-sm">
                      <Calendar className="h-4 w-4 mr-1 text-primary" />
                      <span>Next: {new Date(circle.nextContribution).toLocaleDateString()}</span>
                    </div>
                    <Badge variant="outline">
                      {circle.contributionFrequency}
                    </Badge>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Recent Activity</h3>
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Circle</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  {
                    circle: "Family Savings",
                    type: "Contribution",
                    amount: 100000,
                    date: "2023-12-24",
                    status: "completed",
                  },
                  {
                    circle: "Wedding Fund",
                    type: "Withdrawal",
                    amount: 500000,
                    date: "2023-12-23",
                    status: "pending",
                  },
                  // Add more activity items
                ].map((activity, i) => (
                  <TableRow key={i}>
                    <TableCell>{activity.circle}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        {activity.type === "Contribution" ? (
                          <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                        ) : (
                          <PiggyBank className="h-4 w-4 text-blue-500 mr-1" />
                        )}
                        {activity.type}
                      </div>
                    </TableCell>
                    <TableCell>UGX {activity.amount.toLocaleString()}</TableCell>
                    <TableCell>{new Date(activity.date).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Badge
                        variant={activity.status === "completed" ? "default" : "secondary"}
                      >
                        {activity.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
