import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Badge } from "@/components/ui/badge";
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
import { getDroneById } from "@/services/drone/drone.service";
import { ProductActions } from "./product-actions";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function DroneDetailsPage({ params }: PageProps) {
  const { id } = await params;

  // Check authentication status server-side
  const accessToken = await getCookie("accessToken");
  let userId: string | undefined;
  if (accessToken) {
    const verified = await verifyAccessToken(accessToken);
    if (verified.success && verified.payload) {
      userId = verified.payload.id;
    }
  }

  let product: Awaited<ReturnType<typeof getDroneById>> | null = null;
  try {
    product = await getDroneById(id, userId);
  } catch (error) {
    console.error("Failed to fetch product:", error);
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-destructive">
              Failed to Load Product
            </CardTitle>
            <CardDescription>
              We encountered an error while loading the product details. Please
              try again.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col gap-2">
              <Button asChild className="w-full">
                <Link href={`/drones/${id}`}>Try Again</Link>
              </Button>
              <Button variant="outline" asChild className="w-full">
                <Link href="/drones">Browse All Drones</Link>
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

  if (!product) {
    return notFound();
  }

  const { img, name, description, price, brand, reviews } = product;

  // Since reviews are string[] | IReview[] in the new type, we'll show a simple review count
  const reviewCount = reviews?.length || 0;

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Product Details Section */}
          <Card className="mb-8">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Product Image */}
                <div className="flex justify-center">
                  <div className="relative w-full max-w-md h-96 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg overflow-hidden">
                    <Image
                      src={img}
                      alt={`Image of ${name}`}
                      fill
                      className="object-contain p-4"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </div>

                {/* Product Information */}
                <div className="space-y-6">
                  {/* Name and Brand */}
                  <div>
                    <h1 className="text-3xl font-bold text-primary mb-2">
                      {name}
                    </h1>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>Brand:</span>
                      <Badge variant="secondary">
                        {typeof brand === "string" ? brand : brand.name}
                      </Badge>
                    </div>
                  </div>

                  {/* Rating (placeholder since reviews are string[]) */}
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      {/* Placeholder stars - could be enhanced later */}
                      <span className="text-yellow-400">★★★★☆</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      ({reviewCount} reviews)
                    </span>
                  </div>

                  {/* Price */}
                  <div className="text-3xl font-bold text-primary">
                    ${price.toFixed(2)}
                  </div>

                  {/* Description */}
                  <div>
                    <h3 className="font-semibold mb-2">Description</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {description}
                    </p>
                  </div>

                  {/* Actions */}
                  <ProductActions droneId={product._id} />

                  <div className="text-sm text-muted-foreground">
                    Free shipping on orders over $50
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Reviews Section */}
          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6">
                Reviews & Ratings of {name}
              </h2>

              {reviewCount > 0 ? (
                <div className="space-y-4">
                  {/* Rating Summary */}
                  <div className="flex items-center gap-6 p-6 bg-muted/50 rounded-lg">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-primary">4.5</div>
                      <div className="text-yellow-400 text-lg">★★★★☆</div>
                      <div className="text-sm text-muted-foreground">
                        {reviewCount} Ratings
                      </div>
                    </div>

                    {/* Rating Breakdown - Placeholder */}
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm w-8">5★</span>
                        <div className="flex-1 bg-muted rounded-full h-2">
                          <div className="bg-yellow-400 h-2 rounded-full w-3/4"></div>
                        </div>
                        <span className="text-sm w-8">75%</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm w-8">4★</span>
                        <div className="flex-1 bg-muted rounded-full h-2">
                          <div className="bg-yellow-400 h-2 rounded-full w-1/2"></div>
                        </div>
                        <span className="text-sm w-8">50%</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm w-8">3★</span>
                        <div className="flex-1 bg-muted rounded-full h-2">
                          <div className="bg-yellow-400 h-2 rounded-full w-1/4"></div>
                        </div>
                        <span className="text-sm w-8">25%</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm w-8">2★</span>
                        <div className="flex-1 bg-muted rounded-full h-2">
                          <div className="bg-muted h-2 rounded-full w-0"></div>
                        </div>
                        <span className="text-sm w-8">0%</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm w-8">1★</span>
                        <div className="flex-1 bg-muted rounded-full h-2">
                          <div className="bg-muted h-2 rounded-full w-0"></div>
                        </div>
                        <span className="text-sm w-8">0%</span>
                      </div>
                    </div>
                  </div>

                  {/* Individual Reviews - Placeholder */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Customer Reviews</h3>
                    <div className="text-muted-foreground">
                      Individual review display will be implemented when review
                      data structure is available.
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No reviews yet.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
