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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  CreditCard,
  Smartphone,
  Building2,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

const contributionSchema = z.object({
  circle: z.string({
    required_error: "Please select a circle",
  }),
  amount: z.string().refine(
    (val) => {
      const num = Number(val.replace(/[^0-9]/g, ""));
      return num >= 1000 && num <= 10000000;
    },
    {
      message: "Amount must be between UGX 1,000 and 10,000,000",
    }
  ),
  paymentMethod: z.string({
    required_error: "Please select a payment method",
  }),
  phoneNumber: z.string().optional(),
  accountNumber: z.string().optional(),
});

const paymentMethods = [
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
  {
    id: "card",
    name: "Card Payment",
    icon: CreditCard,
    providers: ["Visa", "Mastercard"],
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
];

export default function Contribute() {
  const [selectedProvider, setSelectedProvider] = useState("");
  const [step, setStep] = useState(1);

  const form = useForm({
    resolver: zodResolver(contributionSchema),
    defaultValues: {
      circle: "",
      amount: "",
      paymentMethod: "",
      phoneNumber: "",
      accountNumber: "",
    },
  });

  const circles = [
    {
      id: "1",
      name: "Family Savings",
      balance: 2500000,
      nextDue: "2024-01-01",
      contribution: 100000,
    },
    {
      id: "2",
      name: "Wedding Fund",
      balance: 7500000,
      nextDue: "2024-01-05",
      contribution: 50000,
    },
  ];

  const onSubmit = (data: z.infer<typeof contributionSchema>) => {
    console.log(data);
    // Handle payment processing here
    setStep(3);
  };

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto space-y-8">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Make a Contribution</h2>
          <p className="text-muted-foreground">
            Add funds to your savings circle
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
                                  Next: UGX {circle.contribution.toLocaleString()}
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
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full">
                  Continue to Payment
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
                <div className="grid gap-6 md:grid-cols-3">
                  {paymentMethods.map((method) => (
                    <div
                      key={method.id}
                      className={`relative rounded-lg border-2 p-4 cursor-pointer transition-all ${
                        form.watch("paymentMethod") === method.id
                          ? "border-primary"
                          : "border-muted hover:border-primary/50"
                      }`}
                      onClick={() => {
                        form.setValue("paymentMethod", method.id);
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

                {form.watch("paymentMethod") && (
                  <div className="space-y-4">
                    <FormLabel>Select Provider</FormLabel>
                    <div className="grid gap-4 md:grid-cols-2">
                      {paymentMethods
                        .find((m) => m.id === form.watch("paymentMethod"))
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

                    {selectedProvider && form.watch("paymentMethod") === "mobile_money" && (
                      <FormField
                        control={form.control}
                        name="phoneNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter phone number"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}

                    {selectedProvider && form.watch("paymentMethod") === "bank" && (
                      <FormField
                        control={form.control}
                        name="accountNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Account Number</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter account number"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}

                    <Button
                      type="submit"
                      className="w-full"
                      disabled={!selectedProvider}
                    >
                      Proceed to Pay
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
            <h3 className="text-xl font-semibold mb-2">Payment Successful!</h3>
            <p className="text-muted-foreground mb-6">
              Your contribution has been processed successfully.
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
                    <p className="text-sm text-muted-foreground">Payment Method</p>
                    <p className="font-medium">{selectedProvider}</p>
                  </div>
                  <div className="text-left">
                    <p className="text-sm text-muted-foreground">Date</p>
                    <p className="font-medium">
                      {new Date().toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-left">
                    <p className="text-sm text-muted-foreground">Reference</p>
                    <p className="font-medium">TX{Math.random().toString(36).substr(2, 9)}</p>
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
      </div>
    </DashboardLayout>
  );
}
