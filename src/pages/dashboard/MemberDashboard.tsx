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
  Search,
} from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";

export default function MemberDashboard() {
  const navigate = useNavigate();

  const stats = [
    {
      name: "My Circles",
      value: "2",
      change: "+1",
      trend: "up",
      icon: Users,
    },
    {
      name: "Total Savings",
      value: "UGX 900,000",
      change: "+12.3%",
      trend: "up",
      icon: PiggyBank,
    },
    {
      name: "Monthly Contribution",
      value: "UGX 150,000",
      change: "Next: Jan 1",
      trend: "up",
      icon: TrendingUp,
    },
  ];

  const myCircles = [
    {
      id: "1",
      name: "Family Savings",
      role: "member",
      balance: 2500000,
      myContribution: 400000,
      targetAmount: 5000000,
      nextContribution: "2024-01-01",
      contributionAmount: 100000,
      status: "active",
    },
    {
      id: "2",
      name: "Wedding Fund",
      role: "member",
      balance: 7500000,
      myContribution: 500000,
      targetAmount: 10000000,
      nextContribution: "2024-01-05",
      contributionAmount: 50000,
      status: "active",
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Welcome back, John! 👋
            </h2>
            <p className="text-muted-foreground">
              Track your savings and contributions
            </p>
          </div>
          <div className="flex gap-4">
            <Button
              variant="outline"
              onClick={() => navigate("/dashboard/circles/join")}
            >
              <Search className="mr-2 h-4 w-4" /> Find Circles
            </Button>
            <Button onClick={() => navigate("/dashboard/circles/create")}>
              <Plus className="mr-2 h-4 w-4" /> Create Circle
            </Button>
          </div>
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

        {/* My Circles */}
        <div className="grid gap-6">
          <h3 className="text-lg font-semibold">My Circles</h3>
          <div className="grid gap-6 md:grid-cols-2">
            {myCircles.map((circle) => (
              <Card
                key={circle.id}
                className="p-6 cursor-pointer hover:shadow-lg transition-all"
                onClick={() => navigate(`/dashboard/circles/${circle.id}`)}
              >
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h4 className="font-semibold">{circle.name}</h4>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Badge variant="outline">{circle.role}</Badge>
                      <span>•</span>
                      <span>{circle.status}</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/dashboard/contribute?circle=${circle.id}`);
                  }}>
                    Contribute
                  </Button>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Circle Progress</span>
                      <span>
                        {Math.round((circle.balance / circle.targetAmount) * 100)}%
                      </span>
                    </div>
                    <Progress
                      value={(circle.balance / circle.targetAmount) * 100}
                      className="h-2"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">My Contribution</p>
                      <p className="font-medium">
                        UGX {circle.myContribution.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Circle Balance</p>
                      <p className="font-medium">
                        UGX {circle.balance.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center text-sm">
                      <Calendar className="h-4 w-4 mr-1 text-primary" />
                      <span>
                        Next: {new Date(circle.nextContribution).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm font-medium">
                      UGX {circle.contributionAmount.toLocaleString()}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
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
                  type: "contribution",
                  amount: 100000,
                  date: "2023-12-24",
                  status: "completed",
                },
                {
                  circle: "Wedding Fund",
                  type: "contribution",
                  amount: 50000,
                  date: "2023-12-20",
                  status: "completed",
                },
              ].map((activity, i) => (
                <TableRow key={i}>
                  <TableCell>{activity.circle}</TableCell>
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
