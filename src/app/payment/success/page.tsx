"use client";

import { CheckCircle } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const transactionId = searchParams.get("transactionId") || "N/A";
  const amount = searchParams.get("amount") || "N/A";
  const message =
    searchParams.get("message") || "Payment completed successfully";
  const status = searchParams.get("status") || "PAID";

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-950 dark:to-emerald-900 py-12">
      <div className="container mx-auto max-w-2xl px-4">
        <Card className="shadow-2xl border-0">
          <CardHeader className="text-center pb-6">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
              <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <CardTitle className="text-2xl font-bold text-green-800 dark:text-green-200">
              Payment Successful!
            </CardTitle>
            <p className="text-muted-foreground mt-2">
              Your transaction has been completed successfully.
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="rounded-lg bg-muted/50 p-4">
              <h3 className="font-semibold mb-3 text-lg">
                Transaction Details
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Transaction ID:</span>
                  <span className="font-mono text-sm">{transactionId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Amount:</span>
                  <span className="font-semibold text-green-600 dark:text-green-400">
                    ${amount}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status:</span>
                  <span className="font-semibold text-green-600 dark:text-green-400">
                    {status}
                  </span>
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-blue-50 dark:bg-blue-950 p-4 border border-blue-200 dark:border-blue-800">
              <p className="text-blue-800 dark:text-blue-200 text-sm">
                {message}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/" className="flex-1">
                <Button className="w-full" size="lg">
                  Return to Home
                </Button>
              </Link>
              <Link href="/dashboard/user/purchased" className="flex-1">
                <Button variant="outline" className="w-full" size="lg">
                  View Orders
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
