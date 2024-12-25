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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Calendar,
  Download,
  Search,
  ArrowUpRight,
  ArrowDownRight,
  Filter,
} from "lucide-react";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { addDays, format } from "date-fns";

// Mock data - replace with real data later
const transactions = [
  {
    id: "TX123",
    circle: "Family Savings",
    type: "contribution",
    amount: 100000,
    date: "2023-12-24",
    status: "completed",
    method: "Mobile Money",
    reference: "MM789456",
  },
  {
    id: "TX124",
    circle: "Wedding Fund",
    type: "withdrawal",
    amount: 500000,
    date: "2023-12-23",
    status: "pending",
    method: "Bank Transfer",
    reference: "BT123456",
  },
  // Add more transactions
];

export default function Transactions() {
  const date = {
    from: new Date(2023, 11, 1),
    to: addDays(new Date(2023, 11, 1), 20),
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Transactions</h2>
            <p className="text-muted-foreground">
              View and manage all your circle transactions
            </p>
          </div>
          <Button>
            <Download className="mr-2 h-4 w-4" /> Export
          </Button>
        </div>

        <Card className="p-6">
          {/* Filters */}
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                <Input
                  placeholder="Search transactions..."
                  className="pl-10"
                />
              </div>
            </div>
            <DatePickerWithRange date={date} />
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Transaction Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="contribution">Contributions</SelectItem>
                <SelectItem value="withdrawal">Withdrawals</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              More Filters
            </Button>
          </div>

          {/* Summary Cards */}
          <div className="grid gap-4 md:grid-cols-3 mb-6">
            <Card className="p-4">
              <div className="flex justify-between items-center">
                <p className="text-sm font-medium text-muted-foreground">
                  Total Contributions
                </p>
                <ArrowUpRight className="h-4 w-4 text-green-500" />
              </div>
              <p className="text-2xl font-bold">UGX 2,500,000</p>
              <p className="text-sm text-green-500">+12.3% from last month</p>
            </Card>
            <Card className="p-4">
              <div className="flex justify-between items-center">
                <p className="text-sm font-medium text-muted-foreground">
                  Total Withdrawals
                </p>
                <ArrowDownRight className="h-4 w-4 text-blue-500" />
              </div>
              <p className="text-2xl font-bold">UGX 500,000</p>
              <p className="text-sm text-blue-500">-5.2% from last month</p>
            </Card>
            <Card className="p-4">
              <div className="flex justify-between items-center">
                <p className="text-sm font-medium text-muted-foreground">
                  Net Balance
                </p>
                <Calendar className="h-4 w-4 text-primary" />
              </div>
              <p className="text-2xl font-bold">UGX 2,000,000</p>
              <p className="text-sm text-primary">This month</p>
            </Card>
          </div>

          {/* Transactions Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Transaction ID</TableHead>
                  <TableHead>Circle</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Reference</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((tx) => (
                  <TableRow key={tx.id}>
                    <TableCell className="font-medium">{tx.id}</TableCell>
                    <TableCell>{tx.circle}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        {tx.type === "contribution" ? (
                          <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                        ) : (
                          <ArrowDownRight className="h-4 w-4 text-blue-500 mr-1" />
                        )}
                        {tx.type.charAt(0).toUpperCase() + tx.type.slice(1)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={tx.type === "contribution" ? "text-green-600" : "text-blue-600"}>
                        UGX {tx.amount.toLocaleString()}
                      </span>
                    </TableCell>
                    <TableCell>{new Date(tx.date).toLocaleDateString()}</TableCell>
                    <TableCell>{tx.method}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          tx.status === "completed"
                            ? "default"
                            : tx.status === "pending"
                            ? "secondary"
                            : "destructive"
                        }
                      >
                        {tx.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-mono">{tx.reference}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between py-4">
            <p className="text-sm text-muted-foreground">
              Showing 1 to 10 of 100 entries
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                Previous
              </Button>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
