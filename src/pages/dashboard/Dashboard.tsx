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
} from "lucide-react";
import { motion } from "framer-motion";

export default function Dashboard() {
  const stats = [
    {
      name: "Total Savings",
      value: "UGX 2,500,000",
      change: "+12.3%",
      trend: "up",
      icon: PiggyBank,
    },
    {
      name: "Active Circles",
      value: "3",
      change: "+2",
      trend: "up",
      icon: Users,
    },
    {
      name: "Monthly Contributions",
      value: "UGX 450,000",
      change: "+5.2%",
      trend: "up",
      icon: TrendingUp,
    },
  ];

  const upcomingPayments = [
    {
      circle: "Family Savings",
      amount: 100000,
      dueDate: "2024-01-01",
      status: "pending",
    },
    {
      circle: "Wedding Fund",
      amount: 50000,
      dueDate: "2024-01-05",
      status: "upcoming",
    },
  ];

  const recentActivities = [
    {
      type: "contribution",
      circle: "Family Savings",
      amount: 100000,
      date: "2023-12-24",
      status: "completed",
    },
    {
      type: "withdrawal",
      circle: "Wedding Fund",
      amount: 500000,
      date: "2023-12-23",
      status: "pending",
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Welcome back, John! 👋</h2>
            <p className="text-muted-foreground">
              Here's what's happening with your savings
            </p>
          </div>
          <Button>Quick Contribution</Button>
        </div>

        {/* Stats Overview */}
        <div className="grid gap-4 md:grid-cols-3">
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
          {/* Upcoming Payments */}
          <Card className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold">Upcoming Payments</h3>
              <Button variant="ghost" size="sm">
                View All <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-4">
              {upcomingPayments.map((payment, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-lg bg-muted/50"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-full bg-primary/10">
                      <Calendar className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{payment.circle}</p>
                      <p className="text-sm text-muted-foreground">
                        Due: {new Date(payment.dueDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">
                      UGX {payment.amount.toLocaleString()}
                    </p>
                    <Badge
                      variant={payment.status === "pending" ? "default" : "secondary"}
                    >
                      {payment.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Recent Activity */}
          <Card className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold">Recent Activity</h3>
              <Button variant="ghost" size="sm">
                View All <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-lg bg-muted/50"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`p-2 rounded-full ${
                        activity.type === "contribution"
                          ? "bg-green-500/10"
                          : "bg-blue-500/10"
                      }`}
                    >
                      {activity.type === "contribution" ? (
                        <ArrowUpRight
                          className={`h-4 w-4 ${
                            activity.type === "contribution"
                              ? "text-green-500"
                              : "text-blue-500"
                          }`}
                        />
                      ) : (
                        <ArrowDownRight className="h-4 w-4 text-blue-500" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">
                        {activity.type.charAt(0).toUpperCase() +
                          activity.type.slice(1)}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {activity.circle}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p
                      className={`font-medium ${
                        activity.type === "contribution"
                          ? "text-green-600"
                          : "text-blue-600"
                      }`}
                    >
                      UGX {activity.amount.toLocaleString()}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(activity.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Savings Goals */}
        <Card className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold">Savings Goals Progress</h3>
            <Button variant="outline" size="sm">
              Add New Goal
            </Button>
          </div>
          <div className="space-y-6">
            {[
              {
                name: "Family Savings",
                current: 2500000,
                target: 5000000,
                progress: 50,
              },
              {
                name: "Wedding Fund",
                current: 7500000,
                target: 10000000,
                progress: 75,
              },
            ].map((goal, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{goal.name}</p>
                    <p className="text-sm text-muted-foreground">
                      UGX {goal.current.toLocaleString()} of UGX{" "}
                      {goal.target.toLocaleString()}
                    </p>
                  </div>
                  <Badge variant="outline">{goal.progress}%</Badge>
                </div>
                <Progress value={goal.progress} className="h-2" />
              </div>
            ))}
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="grid gap-4 md:grid-cols-4">
          {[
            {
              title: "Make Contribution",
              description: "Add funds to your circles",
              icon: ArrowUpRight,
              color: "bg-green-500/10 text-green-500",
            },
            {
              title: "Request Withdrawal",
              description: "Withdraw from your savings",
              icon: ArrowDownRight,
              color: "bg-blue-500/10 text-blue-500",
            },
            {
              title: "Invite Members",
              description: "Grow your savings circle",
              icon: Users,
              color: "bg-purple-500/10 text-purple-500",
            },
            {
              title: "View Reports",
              description: "Track your progress",
              icon: TrendingUp,
              color: "bg-orange-500/10 text-orange-500",
            },
          ].map((action, index) => (
            <Card
              key={index}
              className="p-6 hover:shadow-lg transition-shadow cursor-pointer"
            >
              <div
                className={`w-12 h-12 rounded-full ${action.color} flex items-center justify-center mb-4`}
              >
                <action.icon className="h-6 w-6" />
              </div>
              <h4 className="font-semibold">{action.title}</h4>
              <p className="text-sm text-muted-foreground">
                {action.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
