import { useState } from "react";
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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  ArrowUpRight,
  ArrowDownRight,
  Users,
  PiggyBank,
  Calendar,
  Settings,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const circleData = {
  "1": {
    name: "Family Savings",
    balance: 2500000,
    targetAmount: 5000000,
    contributionAmount: 100000,
    contributionInterval: "weekly",
    nextContribution: "2024-01-01",
    members: [
      {
        id: 1,
        name: "John Doe",
        role: "admin",
        phone: "+256700000000",
        payoutWeek: 1,
        contributions: [
          { date: "2023-12-24", status: "completed" },
          { date: "2023-12-17", status: "completed" },
        ],
      },
      {
        id: 2,
        name: "Jane Smith",
        role: "member",
        phone: "+256700000001",
        payoutWeek: 2,
        contributions: [
          { date: "2023-12-24", status: "completed" },
          { date: "2023-12-17", status: "missed" },
        ],
      },
    ],
    transactions: [
      {
        id: 1,
        type: "contribution",
        member: "John Doe",
        amount: 100000,
        date: "2023-12-24",
        status: "completed",
      },
      {
        id: 2,
        type: "payout",
        member: "Jane Smith",
        amount: 500000,
        date: "2023-12-20",
        status: "completed",
      },
    ],
  },
};

export default function CircleDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("overview");

  const circle = circleData[id as keyof typeof circleData];

  if (!circle) {
    return <div>Circle not found</div>;
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">{circle.name}</h2>
            <p className="text-muted-foreground">
              {circle.contributionInterval.charAt(0).toUpperCase() +
                circle.contributionInterval.slice(1)}{" "}
              contributions of UGX {circle.contributionAmount.toLocaleString()}
            </p>
          </div>
          <Button onClick={() => navigate(`/dashboard/contribute?circle=${id}`)}>
            Make Contribution
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="members">Members & Schedule</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Progress Card */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Circle Progress</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Total Balance</span>
                    <span>
                      {Math.round(
                        (circle.balance / circle.targetAmount) * 100
                      )}
                      %
                    </span>
                  </div>
                  <Progress
                    value={(circle.balance / circle.targetAmount) * 100}
                    className="h-2"
                  />
                  <div className="flex justify-between text-sm mt-2">
                    <span>UGX {circle.balance.toLocaleString()}</span>
                    <span>UGX {circle.targetAmount.toLocaleString()}</span>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-primary" />
                      <span>Next Contribution</span>
                    </div>
                    <span>
                      {new Date(circle.nextContribution).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Recent Activity */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {circle.transactions.slice(0, 5).map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between p-4 rounded-lg bg-muted"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`p-2 rounded-full ${
                          transaction.type === "contribution"
                            ? "bg-green-500/10"
                            : "bg-blue-500/10"
                        }`}
                      >
                        {transaction.type === "contribution" ? (
                          <ArrowUpRight className="h-4 w-4 text-green-500" />
                        ) : (
                          <ArrowDownRight className="h-4 w-4 text-blue-500" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">
                          {transaction.type.charAt(0).toUpperCase() +
                            transaction.type.slice(1)}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {transaction.member}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p
                        className={`font-medium ${
                          transaction.type === "contribution"
                            ? "text-green-600"
                            : "text-blue-600"
                        }`}
                      >
                        UGX {transaction.amount.toLocaleString()}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(transaction.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="members" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Members & Payout Schedule</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Member</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Payout Week</TableHead>
                    <TableHead>Last Contribution</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {circle.members.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{member.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {member.phone}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{member.role}</Badge>
                      </TableCell>
                      <TableCell>Week {member.payoutWeek}</TableCell>
                      <TableCell>
                        {member.contributions[0]?.date
                          ? new Date(
                              member.contributions[0].date
                            ).toLocaleDateString()
                          : "No contributions"}
                      </TableCell>
                      <TableCell>
                        {member.contributions[0]?.status === "completed" ? (
                          <div className="flex items-center text-green-600">
                            <CheckCircle2 className="h-4 w-4 mr-1" />
                            Up to date
                          </div>
                        ) : (
                          <div className="flex items-center text-red-600">
                            <XCircle className="h-4 w-4 mr-1" />
                            Missing contribution
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Contribution History</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    {circle.members.map((member) => (
                      <TableHead key={member.id}>{member.name}</TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {["2023-12-24", "2023-12-17"].map((date) => (
                    <TableRow key={date}>
                      <TableCell>
                        {new Date(date).toLocaleDateString()}
                      </TableCell>
                      {circle.members.map((member) => {
                        const contribution = member.contributions.find(
                          (c) => c.date === date
                        );
                        return (
                          <TableCell key={member.id}>
                            {contribution?.status === "completed" ? (
                              <CheckCircle2 className="h-4 w-4 text-green-600" />
                            ) : (
                              <XCircle className="h-4 w-4 text-red-600" />
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>

          <TabsContent value="transactions" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">All Transactions</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Member</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {circle.transactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>
                        {new Date(transaction.date).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          {transaction.type === "contribution" ? (
                            <ArrowUpRight className="mr-2 h-4 w-4 text-green-500" />
                          ) : (
                            <ArrowDownRight className="mr-2 h-4 w-4 text-blue-500" />
                          )}
                          {transaction.type.charAt(0).toUpperCase() +
                            transaction.type.slice(1)}
                        </div>
                      </TableCell>
                      <TableCell>{transaction.member}</TableCell>
                      <TableCell>
                        <span
                          className={
                            transaction.type === "contribution"
                              ? "text-green-600"
                              : "text-blue-600"
                          }
                        >
                          UGX {transaction.amount.toLocaleString()}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            transaction.status === "completed"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {transaction.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Circle Settings</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-4 border-b">
                  <div>
                    <p className="font-medium">Contribution Amount</p>
                    <p className="text-sm text-muted-foreground">
                      Amount each member contributes
                    </p>
                  </div>
                  <p>UGX {circle.contributionAmount.toLocaleString()}</p>
                </div>

                <div className="flex justify-between items-center py-4 border-b">
                  <div>
                    <p className="font-medium">Contribution Interval</p>
                    <p className="text-sm text-muted-foreground">
                      How often members contribute
                    </p>
                  </div>
                  <p>
                    {circle.contributionInterval.charAt(0).toUpperCase() +
                      circle.contributionInterval.slice(1)}
                  </p>
                </div>

                <div className="flex justify-between items-center py-4 border-b">
                  <div>
                    <p className="font-medium">Members</p>
                    <p className="text-sm text-muted-foreground">
                      Current member count
                    </p>
                  </div>
                  <p>{circle.members.length} members</p>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
