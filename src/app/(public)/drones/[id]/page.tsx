import { Package, RotateCcw, ShieldCheck, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Eyebrow from "@/components/shared/eyebrow";
import ReviewCard from "@/components/shared/review-card";
import SectionContainer from "@/components/shared/SectionContainer";
import StarRating from "@/components/shared/star-rating";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { calculateAverageRating, calculateRatingBreakdown } from "@/lib/utils";
import { getCookie } from "@/services/auth/cookie.service";
import { verifyAccessToken } from "@/services/auth/token.service";
import { getDroneById } from "@/services/drone/drone.service";
import { ProductActions } from "./product-actions";

interface PageProps {
  params: Promise<{ id: string }>;
}

// Static trust rail — the storefront pairs every product with these assurances.
const trustSignals = [
  { icon: Truck, label: "Free shipping", detail: "On orders over $50" },
  { icon: ShieldCheck, label: "2-year warranty", detail: "Rigorously tested" },
  { icon: RotateCcw, label: "30-day returns", detail: "No-questions refund" },
];

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
      <div className="dr-ambient-glow relative flex min-h-screen items-center justify-center overflow-hidden px-4">
        <Card className="w-full max-w-md rounded-[18px] border-dr-red/40 bg-dr-surface">
          <CardContent className="p-8 text-center">
            <Eyebrow align="center" className="mb-3">
              Signal lost
            </Eyebrow>
            <h1 className="font-chakra text-2xl font-bold tracking-[0.01em] text-dr-red">
              Failed to load product
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-dr-text-2">
              We hit turbulence loading this drone. Try again, or head back to
              the fleet.
            </p>
            <div className="mt-6 flex flex-col gap-2">
              <Button
                asChild
                className="w-full bg-dr-red text-white hover:bg-dr-red-strong"
              >
                <Link href={`/drones/${id}`}>Try again</Link>
              </Button>
              <Button variant="outline" asChild className="w-full">
                <Link href="/drones">Browse all drones</Link>
              </Button>
              <Button variant="outline" asChild className="w-full">
                <Link href="/">Go home</Link>
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

  const { img, name, description, price, brand, category, quantity, reviews } =
    product;

  const brandName = typeof brand === "string" ? brand : brand.name;
  const categoryName =
    category && (typeof category === "string" ? category : category.name);
  const isOutOfStock = !quantity || quantity <= 0;

  // Calculate review metrics
  const reviewCount = reviews?.length || 0;
  const averageRating = calculateAverageRating(reviews);
  const ratingBreakdown = calculateRatingBreakdown(reviews);

  return (
    <div className="animate-in fade-in duration-700">
      <div className="dr-ambient-glow relative min-h-screen overflow-hidden py-10 md:py-14">
        <SectionContainer maxWidth="none">
          <div className="mx-auto max-w-6xl">
            {/* Breadcrumb */}
            <nav className="mb-6 flex items-center gap-2 font-dm-mono text-[11px] uppercase tracking-[0.18em] text-dr-text-3">
              <Link href="/" className="transition-colors hover:text-dr-red">
                Home
              </Link>
              <span>/</span>
              <Link
                href="/drones"
                className="transition-colors hover:text-dr-red"
              >
                Fleet
              </Link>
              <span>/</span>
              <span className="text-dr-text-2">{name}</span>
            </nav>

            {/* Product Details Section */}
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              {/* Product Image */}
              <div className="relative overflow-hidden rounded-[22px] border border-dr-bd-2 bg-dr-surface">
                <div className="relative aspect-square w-full bg-[radial-gradient(circle_at_50%_55%,rgba(239,43,69,0.16),transparent_65%)]">
                  <Image
                    src={img}
                    alt={`Image of ${name}`}
                    fill
                    className="object-contain p-8"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                </div>
              </div>

              {/* Product Information */}
              <div className="flex flex-col">
                <Eyebrow className="mb-3">{categoryName || "Drone"}</Eyebrow>

                <h1 className="font-chakra text-3xl font-bold leading-[1.05] tracking-[-0.01em] text-dr-text md:text-4xl">
                  {name}
                </h1>

                {/* Brand + Category chips */}
                <div className="mt-4 flex flex-wrap gap-2">
                  <Badge
                    variant="secondary"
                    className="bg-dr-red text-white hover:bg-dr-red-strong"
                  >
                    {brandName}
                  </Badge>
                  {categoryName && (
                    <Badge
                      variant="outline"
                      className="border-dr-bd-4 text-dr-text-2"
                    >
                      {categoryName}
                    </Badge>
                  )}
                </div>

                {/* Rating */}
                {averageRating > 0 && (
                  <div className="mt-4 flex items-center gap-2">
                    <StarRating rating={averageRating} size="sm" />
                    <span className="text-sm font-medium text-dr-text">
                      {averageRating.toFixed(1)}
                    </span>
                    <span className="text-sm text-dr-text-2">
                      ({reviewCount} reviews)
                    </span>
                  </div>
                )}

                {/* Price + stock */}
                <div className="mt-5 flex items-end gap-4">
                  <span className="font-chakra text-4xl font-bold text-dr-red">
                    ${price.toFixed(2)}
                  </span>
                  {isOutOfStock ? (
                    <span className="pb-1 font-dm-mono text-[11px] uppercase tracking-[0.18em] text-destructive">
                      Out of stock
                    </span>
                  ) : (
                    <span className="pb-1 font-dm-mono text-[11px] uppercase tracking-[0.18em] text-green-600 dark:text-green-400">
                      In stock · {quantity} ready to ship
                    </span>
                  )}
                </div>

                {/* Description */}
                <div className="mt-6">
                  <h3 className="font-poppins text-sm font-semibold text-dr-text">
                    Overview
                  </h3>
                  <p className="mt-2 leading-relaxed text-dr-text-2">
                    {description}
                  </p>
                </div>

                {/* Actions */}
                <ProductActions droneId={product._id} />

                {/* Trust rail */}
                <div className="mt-8 grid grid-cols-1 gap-3 border-t border-dr-bd-2 pt-6 sm:grid-cols-3">
                  {trustSignals.map(({ icon: Icon, label, detail }) => (
                    <div key={label} className="flex items-start gap-2.5">
                      <Icon className="mt-0.5 h-5 w-5 flex-none text-dr-red" />
                      <div>
                        <div className="font-poppins text-sm font-semibold text-dr-text">
                          {label}
                        </div>
                        <div className="text-xs text-dr-text-2">{detail}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Reviews Section */}
            <div className="mt-14">
              <Eyebrow className="mb-3">Pilot reviews</Eyebrow>
              <h2 className="font-chakra text-2xl font-bold tracking-[-0.01em] text-dr-text md:text-3xl">
                Reviews &amp; ratings
              </h2>

              {reviewCount > 0 ? (
                <div className="mt-6 space-y-8">
                  {/* Rating Summary */}
                  <div className="flex flex-col items-center gap-8 rounded-[18px] border border-dr-bd-2 bg-dr-surface p-6 sm:flex-row">
                    <div className="text-center">
                      <div className="font-chakra text-5xl font-bold text-dr-red">
                        {averageRating.toFixed(1)}
                      </div>
                      <div className="mt-2 flex justify-center">
                        <StarRating rating={averageRating} size="md" />
                      </div>
                      <div className="mt-1 font-dm-mono text-[11px] uppercase tracking-[0.18em] text-dr-text-3">
                        {reviewCount} Ratings
                      </div>
                    </div>

                    {/* Rating Breakdown */}
                    <div className="w-full flex-1 space-y-2">
                      {[5, 4, 3, 2, 1].map((stars) => (
                        <div key={stars} className="flex items-center gap-3">
                          <span className="w-8 text-sm text-dr-text-2">
                            {stars}★
                          </span>
                          <div className="h-2 flex-1 overflow-hidden rounded-full bg-dr-bd-2">
                            <div
                              className="h-2 rounded-full bg-dr-red transition-all duration-500"
                              style={{
                                width: `${ratingBreakdown[stars as keyof typeof ratingBreakdown]}%`,
                              }}
                            />
                          </div>
                          <span className="w-10 text-right text-sm text-dr-text-2">
                            {
                              ratingBreakdown[
                                stars as keyof typeof ratingBreakdown
                              ]
                            }
                            %
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Individual Reviews */}
                  <div>
                    <h3 className="font-poppins text-lg font-semibold text-dr-text">
                      Customer reviews
                    </h3>
                    <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {reviews
                        .filter(
                          (review) =>
                            typeof review === "object" &&
                            review &&
                            "rating" in review,
                        )
                        .map((review) => (
                          <ReviewCard key={review._id} review={review} />
                        ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mt-6 rounded-[18px] border border-dashed border-dr-bd-3 bg-dr-surface/50 py-12 text-center">
                  <Package className="mx-auto h-8 w-8 text-dr-text-3" />
                  <p className="mt-3 text-dr-text-2">
                    No reviews yet — be the first pilot to weigh in.
                  </p>
                </div>
              )}
            </div>
          </div>
        </SectionContainer>
      </div>
    </div>
  );
}
