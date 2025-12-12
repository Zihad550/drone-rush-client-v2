import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Products from "@/components/shared/products";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getCookie } from "@/services/auth/cookie.service";
import { verifyAccessToken } from "@/services/auth/token.service";
import { getDrones } from "@/services/drone/drone.service";

interface PageProps {
  params: Promise<{ "brand-id": string }>;
}

export default async function BrandPage({ params }: PageProps) {
  const { "brand-id": brandId } = await params;

  // Check authentication status server-side
  const accessToken = await getCookie("accessToken");
  let isLoggedIn = false;
  let userId: string | undefined;

  if (accessToken) {
    const verified = await verifyAccessToken(accessToken);
    if (verified.success && verified.payload) {
      isLoggedIn = true;
      userId = verified.payload.id;
    }
  }

  // Fetch drones for this brand
  let dronesData: Awaited<ReturnType<typeof getDrones>> | null = null;
  let brandInfo: { name: string; logo: string; description: string } | null =
    null;

  try {
    dronesData = await getDrones({
      brand: [brandId],
      sort: "-quantity",
      ...(userId && { userId }),
    });

    // Extract brand info from the first drone (all drones in this response have the same brand)
    if (dronesData.data && dronesData.data.length > 0) {
      const firstDrone = dronesData.data[0];
      if (typeof firstDrone.brand === "object" && firstDrone.brand !== null) {
        brandInfo = {
          name: firstDrone.brand.name,
          logo: firstDrone.brand.logo,
          description: firstDrone.brand.description,
        };
      }
    }
  } catch (error) {
    console.error("Failed to fetch brand drones:", error);
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-destructive">
              Failed to Load Brand
            </CardTitle>
            <CardDescription>
              We encountered an error while loading the brand information.
              Please try again.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col gap-2">
              <Button asChild className="w-full">
                <Link href={`/brand/${brandId}`}>Try Again</Link>
              </Button>
              <Button variant="outline" asChild className="w-full">
                <Link href="/">Go Home</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!dronesData || !brandInfo) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Go Back Button */}
          <div className="mb-6">
            <Button variant="outline" asChild className="gap-2">
              <Link href="/">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Link>
            </Button>
          </div>

          {/* Brand Header */}
          <Card className="mb-8">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center gap-6">
                {/* Brand Logo */}
                <div className="flex-shrink-0">
                  <div className="relative w-24 h-24 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 rounded-xl flex items-center justify-center">
                    <Image
                      src={brandInfo.logo}
                      alt={brandInfo.name}
                      width={64}
                      height={64}
                      className="w-16 h-16 object-contain"
                    />
                  </div>
                </div>

                {/* Brand Info */}
                <div className="flex-1 text-center md:text-left">
                  <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">
                    {brandInfo.name}
                  </h1>
                  <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl">
                    {brandInfo.description}
                  </p>
                  <div className="mt-4 text-sm text-muted-foreground">
                    {dronesData.meta?.total || 0} drone
                    {dronesData.meta?.total !== 1 ? "s" : ""} available
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Drones Section */}
          <div>
            <h2 className="text-2xl font-bold mb-6 text-center md:text-left">
              {brandInfo.name} Drones
            </h2>

            {dronesData.data && dronesData.data.length > 0 ? (
              <Products products={dronesData.data} isLoggedIn={isLoggedIn} />
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <div className="text-muted-foreground">
                    <p className="text-lg mb-2">
                      No drones available for this brand yet.
                    </p>
                    <p className="text-sm">
                      Check back later for new arrivals!
                    </p>
                  </div>
                  <div className="mt-6">
                    <Button asChild>
                      <Link href="/">Browse All Drones</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
