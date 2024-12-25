import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ArrowUpRight,
  ArrowDownRight,
  Users,
  PiggyBank,
  TrendingUp,
  Calendar,
  Bell,
  ChevronRight,
  Plus,
} from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const stats = [
    {
      name: "Total Circles",
      value: "5",
      change: "+2",
      trend: "up",
      icon: Users,
    },
    {
      name: "Total Members",
      value: "28",
      change: "+8",
      trend: "up",
      icon: Users,
    },
    {
      name: "Total Savings",
      value: "UGX 15,500,000",
      change: "+22.3%",
      trend: "up",
      icon: PiggyBank,
    },
    {
      name: "Monthly Growth",
      value: "UGX 2,450,000",
      change: "+15.2%",
      trend: "up",
      icon: TrendingUp,
    },
  ];

  const circles = [
    {
      id: "1",
      name: "Family Savings",
      members: 5,
      balance: 2500000,
      targetAmount: 5000000,
      nextContribution: "2024-01-01",
      contributionAmount: 100000,
      status: "active",
    },
    {
      id: "2",
      name: "Wedding Fund",
      members: 8,
      balance: 7500000,
      targetAmount: 10000000,
      nextContribution: "2024-01-05",
      contributionAmount: 50000,
      status: "active",
    },
  ];

  const pendingActions = [
    {
      type: "withdrawal",
      circle: "Family Savings",
      user: "Jane Smith",
      amount: 500000,
      requestDate: "2023-12-23",
    },
    {
      type: "join",
      circle: "Wedding Fund",
      user: "John Doe",
      requestDate: "2023-12-24",
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Welcome back, Admin! 👋
            </h2>
            <p className="text-muted-foreground">
              Here's what's happening across your circles
            </p>
          </div>
          <Button onClick={() => navigate("/dashboard/circles/create")}>
            <Plus className="mr-2 h-4 w-4" /> Create New Circle
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid gap-4 md:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <stat.icon className="h-8 w-8 text-primary" />
                  {stat.trend === "up" ? (
                    <ArrowUpRight className="h-4 w-4 text-green-500" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4 text-red-500" />
                  )}
                </div>
                <div className="mt-4">
                  <p className="text-sm text-muted-foreground">{stat.name}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p
                    className={`text-sm ${
                      stat.trend === "up" ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {stat.change}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Managed Circles */}
          <Card className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold">Your Circles</h3>
              <Button variant="ghost" size="sm" onClick={() => navigate("/dashboard/circles")}>
                View All <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-4">
              {circles.map((circle) => (
                <div
                  key={circle.id}
                  className="p-4 rounded-lg border cursor-pointer hover:border-primary transition-colors"
                  onClick={() => navigate(`/dashboard/circles/${circle.id}`)}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="font-semibold">{circle.name}</h4>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Users className="h-4 w-4 mr-1" />
                        {circle.members} members
                      </div>
                    </div>
                    <Badge variant="outline">{circle.status}</Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span>
                        {Math.round((circle.balance / circle.targetAmount) * 100)}%
                      </span>
                    </div>
                    <Progress
                      value={(circle.balance / circle.targetAmount) * 100}
                      className="h-2"
                    />
                    <div className="flex justify-between text-sm">
                      <span>UGX {circle.balance.toLocaleString()}</span>
                      <span>UGX {circle.targetAmount.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Pending Actions */}
          <Card className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold">Pending Actions</h3>
              <Button variant="ghost" size="sm">
                View All <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-4">
              {pendingActions.map((action, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-lg bg-muted"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`p-2 rounded-full ${
                        action.type === "withdrawal"
                          ? "bg-blue-500/10"
                          : "bg-green-500/10"
                      }`}
                    >
                      {action.type === "withdrawal" ? (
                        <ArrowDownRight
                          className="h-4 w-4 text-blue-500"
                        />
                      ) : (
                        <Users className="h-4 w-4 text-green-500" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">
                        {action.type === "withdrawal"
                          ? "Withdrawal Request"
                          : "Join Request"}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {action.circle} - {action.user}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    {action.type === "withdrawal" && (
                      <p className="font-medium text-blue-600">
                        UGX {action.amount.toLocaleString()}
                      </p>
                    )}
                    <p className="text-sm text-muted-foreground">
                      {new Date(action.requestDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold">Recent Activity</h3>
            <Button variant="ghost" size="sm">
              View All <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Circle</TableHead>
                <TableHead>Member</TableHead>
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
                  member: "John Doe",
                  type: "contribution",
                  amount: 100000,
                  date: "2023-12-24",
                  status: "completed",
                },
                {
                  circle: "Wedding Fund",
                  member: "Jane Smith",
                  type: "withdrawal",
                  amount: 500000,
                  date: "2023-12-23",
                  status: "pending",
                },
              ].map((activity, i) => (
                <TableRow key={i}>
                  <TableCell>{activity.circle}</TableCell>
                  <TableCell>{activity.member}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      {activity.type === "contribution" ? (
                        <ArrowUpRight className="mr-2 h-4 w-4 text-green-500" />
                      ) : (
                        <ArrowDownRight className="mr-2 h-4 w-4 text-blue-500" />
                      )}
                      {activity.type.charAt(0).toUpperCase() +
                        activity.type.slice(1)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span
                      className={
                        activity.type === "contribution"
                          ? "text-green-600"
                          : "text-blue-600"
                      }
                    >
                      UGX {activity.amount.toLocaleString()}
                    </span>
                  </TableCell>
                  <TableCell>
                    {new Date(activity.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        activity.status === "completed"
                          ? "default"
                          : "secondary"
                      }
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
    </DashboardLayout>
  );
}
