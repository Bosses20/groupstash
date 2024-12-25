import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Smartphone,
  Building2,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Info,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const withdrawalSchema = z.object({
  circle: z.string({
    required_error: "Please select a circle",
  }),
  amount: z.string().refine(
    (val) => {
      const num = Number(val.replace(/[^0-9]/g, ""));
      return num >= 10000 && num <= 5000000;
    },
    {
      message: "Amount must be between UGX 10,000 and 5,000,000",
    }
  ),
  reason: z.string().min(10, {
    message: "Please provide a reason for withdrawal (minimum 10 characters)",
  }),
  withdrawalMethod: z.string({
    required_error: "Please select a withdrawal method",
  }),
  accountDetails: z.string({
    required_error: "Please provide account details",
  }),
});

const withdrawalMethods = [
  {
    id: "mobile_money",
    name: "Mobile Money",
    icon: Smartphone,
    providers: ["MTN Mobile Money", "Airtel Money"],
    color: "text-yellow-600",
    bgColor: "bg-yellow-50",
  },
  {
    id: "bank",
    name: "Bank Transfer",
    icon: Building2,
    providers: ["Stanbic Bank", "Centenary Bank", "ABSA", "DTB"],
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
];

export default function Withdraw() {
  const [selectedProvider, setSelectedProvider] = useState("");
  const [step, setStep] = useState(1);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const form = useForm({
    resolver: zodResolver(withdrawalSchema),
    defaultValues: {
      circle: "",
      amount: "",
      reason: "",
      withdrawalMethod: "",
      accountDetails: "",
    },
  });

  const circles = [
    {
      id: "1",
      name: "Family Savings",
      balance: 2500000,
      withdrawalFee: 0.01,
      minWithdrawal: 10000,
    },
    {
      id: "2",
      name: "Wedding Fund",
      balance: 7500000,
      withdrawalFee: 0.015,
      minWithdrawal: 50000,
    },
  ];

  const selectedCircle = circles.find(
    (circle) => circle.id === form.watch("circle")
  );

  const onSubmit = (data: z.infer<typeof withdrawalSchema>) => {
    setShowConfirmDialog(true);
  };

  const handleConfirmWithdrawal = () => {
    setShowConfirmDialog(false);
    setStep(3);
    // Process withdrawal request here
  };

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto space-y-8">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Request Withdrawal</h2>
          <p className="text-muted-foreground">
            Withdraw funds from your savings circle
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-between items-center">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className="flex items-center"
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  s <= step
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {s < step ? (
                  <CheckCircle2 className="h-5 w-5" />
                ) : (
                  s
                )}
              </div>
              {s < 3 && (
                <div
                  className={`w-24 h-1 ${
                    s < step ? "bg-primary" : "bg-muted"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {step === 1 && (
          <Card className="p-6">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(() => setStep(2))}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="circle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Select Circle</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a circle" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {circles.map((circle) => (
                            <SelectItem key={circle.id} value={circle.id}>
                              <div className="flex justify-between items-center w-full">
                                <span>{circle.name}</span>
                                <Badge variant="outline">
                                  Balance: UGX {circle.balance.toLocaleString()}
                                </Badge>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {selectedCircle && (
                  <div className="rounded-lg bg-muted p-4 space-y-3">
                    <div className="flex items-center text-sm">
                      <Info className="h-4 w-4 mr-2 text-primary" />
                      <span>Withdrawal Information</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Available Balance</p>
                        <p className="font-medium">
                          UGX {selectedCircle.balance.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Withdrawal Fee</p>
                        <p className="font-medium">
                          {(selectedCircle.withdrawalFee * 100).toFixed(1)}%
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Minimum Withdrawal</p>
                        <p className="font-medium">
                          UGX {selectedCircle.minWithdrawal.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Amount (UGX)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter amount"
                          {...field}
                          onChange={(e) => {
                            const value = e.target.value.replace(/[^0-9]/g, "");
                            const formatted = Number(value).toLocaleString();
                            field.onChange(formatted);
                          }}
                        />
                      </FormControl>
                      {selectedCircle && (
                        <FormDescription>
                          Withdrawal fee:{" "}
                          {(
                            Number(field.value.replace(/[^0-9]/g, "")) *
                            selectedCircle.withdrawalFee
                          ).toLocaleString()}{" "}
                          UGX
                        </FormDescription>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="reason"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Reason for Withdrawal</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Please provide a reason for your withdrawal request"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full">
                  Continue
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </Form>
          </Card>
        )}

        {step === 2 && (
          <Card className="p-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  {withdrawalMethods.map((method) => (
                    <div
                      key={method.id}
                      className={`relative rounded-lg border-2 p-4 cursor-pointer transition-all ${
                        form.watch("withdrawalMethod") === method.id
                          ? "border-primary"
                          : "border-muted hover:border-primary/50"
                      }`}
                      onClick={() => {
                        form.setValue("withdrawalMethod", method.id);
                        setSelectedProvider("");
                      }}
                    >
                      <div className="flex flex-col items-center text-center">
                        <div
                          className={`p-3 rounded-full ${method.bgColor} ${method.color} mb-3`}
                        >
                          <method.icon className="h-6 w-6" />
                        </div>
                        <h3 className="font-medium">{method.name}</h3>
                      </div>
                    </div>
                  ))}
                </div>

                {form.watch("withdrawalMethod") && (
                  <div className="space-y-4">
                    <FormLabel>Select Provider</FormLabel>
                    <div className="grid gap-4 md:grid-cols-2">
                      {withdrawalMethods
                        .find((m) => m.id === form.watch("withdrawalMethod"))
                        ?.providers.map((provider) => (
                          <div
                            key={provider}
                            className={`relative rounded-lg border-2 p-4 cursor-pointer transition-all ${
                              selectedProvider === provider
                                ? "border-primary"
                                : "border-muted hover:border-primary/50"
                            }`}
                            onClick={() => setSelectedProvider(provider)}
                          >
                            <div className="flex items-center justify-between">
                              <span>{provider}</span>
                              {selectedProvider === provider && (
                                <CheckCircle2 className="h-4 w-4 text-primary" />
                              )}
                            </div>
                          </div>
                        ))}
                    </div>

                    <FormField
                      control={form.control}
                      name="accountDetails"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            {form.watch("withdrawalMethod") === "mobile_money"
                              ? "Phone Number"
                              : "Account Number"}
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder={
                                form.watch("withdrawalMethod") === "mobile_money"
                                  ? "Enter phone number"
                                  : "Enter account number"
                              }
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      className="w-full"
                      disabled={!selectedProvider}
                    >
                      Request Withdrawal
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                )}
              </form>
            </Form>
          </Card>
        )}

        {step === 3 && (
          <Card className="p-6 text-center">
            <div className="mb-4">
              <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold mb-2">
              Withdrawal Request Submitted
            </h3>
            <p className="text-muted-foreground mb-6">
              Your withdrawal request has been submitted successfully and is pending
              approval.
            </p>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-muted">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-left">
                    <p className="text-sm text-muted-foreground">Amount</p>
                    <p className="font-medium">
                      UGX {Number(form.getValues("amount").replace(/[^0-9]/g, "")).toLocaleString()}
                    </p>
                  </div>
                  <div className="text-left">
                    <p className="text-sm text-muted-foreground">
                      Withdrawal Method
                    </p>
                    <p className="font-medium">{selectedProvider}</p>
                  </div>
                  <div className="text-left">
                    <p className="text-sm text-muted-foreground">Request Date</p>
                    <p className="font-medium">
                      {new Date().toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-left">
                    <p className="text-sm text-muted-foreground">Reference</p>
                    <p className="font-medium">
                      WD{Math.random().toString(36).substr(2, 9)}
                    </p>
                  </div>
                </div>
              </div>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => window.location.href = "/dashboard"}
              >
                Back to Dashboard
              </Button>
            </div>
          </Card>
        )}

        <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirm Withdrawal Request</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to request a withdrawal of UGX{" "}
                {Number(
                  form.getValues("amount").replace(/[^0-9]/g, "")
                ).toLocaleString()}{" "}
                from {circles.find((c) => c.id === form.getValues("circle"))?.name}
                ?
                <div className="mt-4 p-4 rounded-lg bg-muted">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Withdrawal Amount:</span>
                      <span className="font-medium">
                        UGX{" "}
                        {Number(
                          form.getValues("amount").replace(/[^0-9]/g, "")
                        ).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Withdrawal Fee:</span>
                      <span className="font-medium">
                        UGX{" "}
                        {(
                          Number(form.getValues("amount").replace(/[^0-9]/g, "")) *
                          (selectedCircle?.withdrawalFee || 0)
                        ).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                      <span>Total Amount:</span>
                      <span className="font-medium">
                        UGX{" "}
                        {(
                          Number(form.getValues("amount").replace(/[^0-9]/g, "")) *
                          (1 - (selectedCircle?.withdrawalFee || 0))
                        ).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleConfirmWithdrawal}>
                Confirm Withdrawal
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </DashboardLayout>
  );
}
