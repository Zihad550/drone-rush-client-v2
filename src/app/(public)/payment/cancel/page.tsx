"use client";

import { AlertTriangle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PaymentCancelPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-amber-100 dark:from-yellow-950 dark:to-amber-900 py-12">
      <div className="container mx-auto max-w-2xl px-4">
        <Card className="shadow-2xl border-0">
          <CardHeader className="text-center pb-6">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-yellow-100 dark:bg-yellow-900">
              <AlertTriangle className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
            </div>
            <CardTitle className="text-2xl font-bold text-yellow-800 dark:text-yellow-200">
              Payment Cancelled
            </CardTitle>
            <p className="text-muted-foreground mt-2">
              Your payment process was cancelled.
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/dashboard/user/cart" className="flex-1">
                <Button className="w-full" size="lg">
                  Back to Cart
                </Button>
              </Link>
              <Link href="/" className="flex-1">
                <Button variant="outline" className="w-full" size="lg">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
