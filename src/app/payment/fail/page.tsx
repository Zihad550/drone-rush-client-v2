"use client";

import { XCircle } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PaymentFailPage() {
  const searchParams = useSearchParams();
  const transactionId = searchParams.get("transactionId") || "N/A";
  const amount = searchParams.get("amount") || "N/A";
  const message =
    searchParams.get("message") || "Payment failed. Please try again.";
  const status = searchParams.get("status") || "FAILED";

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-rose-100 dark:from-red-950 dark:to-rose-900 py-12">
      <div className="container mx-auto max-w-2xl px-4">
        <Card className="shadow-2xl border-0">
          <CardHeader className="text-center pb-6">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-900">
              <XCircle className="h-8 w-8 text-red-600 dark:text-red-400" />
            </div>
            <CardTitle className="text-2xl font-bold text-red-800 dark:text-red-200">
              Payment Failed
            </CardTitle>
            <p className="text-muted-foreground mt-2">
              We couldn't process your payment. Please try again.
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
                  <span className="font-semibold text-red-600 dark:text-red-400">
                    ${amount}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status:</span>
                  <span className="font-semibold text-red-600 dark:text-red-400">
                    {status}
                  </span>
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-red-50 dark:bg-red-950 p-4 border border-red-200 dark:border-red-800">
              <p className="text-red-800 dark:text-red-200 text-sm">
                {message}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/dashboard/user/cart" className="flex-1">
                <Button className="w-full" size="lg">
                  Try Again
                </Button>
              </Link>
              <Link href="/contact-us" className="flex-1">
                <Button variant="outline" className="w-full" size="lg">
                  Contact Support
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
