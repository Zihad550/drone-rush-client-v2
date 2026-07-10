import Drones from "@/components/drones";
import Eyebrow from "@/components/shared/eyebrow";
import SectionContainer from "@/components/shared/SectionContainer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getCookie } from "@/services/auth/cookie.service";
import { verifyAccessToken } from "@/services/auth/token.service";
import { getBrands } from "@/services/brand/brand.service";
import { getCategories } from "@/services/category/category.service";
import { getDrones } from "@/services/drone/drone.service";

export default async function DronesPage({
  searchParams,
}: {
  searchParams: Promise<{ searchTerm?: string }>;
}) {
  const { searchTerm } = await searchParams;
  let categoriesData: Awaited<ReturnType<typeof getCategories>> | null = null;
  let brandsData: Awaited<ReturnType<typeof getBrands>> | null = null;
  let hasError = false;

  // Check authentication status server-side
  const accessToken = await getCookie("accessToken");
  let userId: string | undefined;
  if (accessToken) {
    const verified = await verifyAccessToken(accessToken);
    if (verified.success && verified.payload) {
      userId = verified.payload.id;
    }
  }

  const isLoggedIn = !!userId;

  // Fetch drones server-side
  const products = await getDrones({
    sort: "-quantity",
    page: 1,
    limit: 8,
    ...(userId && { userId }),
  });

  try {
    categoriesData = await getCategories();
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    hasError = true;
  }

  try {
    brandsData = await getBrands();
  } catch (error) {
    console.error("Failed to fetch brands:", error);
    hasError = true;
  }

  if (hasError) {
    return (
      <div className="animate-in fade-in duration-700">
        <div className="dr-ambient-glow relative min-h-screen overflow-hidden py-10 md:py-14">
          <SectionContainer>
            <Card className="rounded-[18px] border-dr-red/40 bg-dr-red/5">
              <CardHeader>
                <Eyebrow className="mb-3">Catalog offline</Eyebrow>
                <CardTitle className="font-chakra tracking-[0.02em] text-dr-red">
                  Unable to load drones
                </CardTitle>
                <CardDescription className="text-dr-text-2">
                  We're having trouble loading the drone catalog. Some features
                  may not be available.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-dr-text-2">
                  Please try refreshing the page or contact support if the
                  problem persists.
                </p>
              </CardContent>
            </Card>
          </SectionContainer>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-700">
      <div className="dr-ambient-glow relative min-h-screen overflow-hidden py-10 md:py-14">
        <SectionContainer>
          {/* Page hero — mirrors the storefront "All Drones" catalog header */}
          <header className="mb-8 max-w-[460px] animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="mb-3 flex items-center gap-2.5">
              <span className="h-0.5 w-6 flex-none bg-dr-red" />
              <span className="font-dm-mono text-[11px] uppercase tracking-[0.22em] text-dr-red">
                The Fleet
              </span>
            </div>
            <h1 className="font-chakra text-4xl font-bold leading-[1.02] tracking-[-0.01em] text-dr-text md:text-5xl">
              All Drones
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-dr-text-2">
              Authorized-dealer pricing across every category — from
              featherweight toys to heavy-lift cinema rigs.
            </p>
          </header>

          <div className="space-y-10">
            <Drones
              categories={categoriesData?.data || []}
              brands={brandsData?.data || []}
              userId={userId}
              isLoggedIn={isLoggedIn}
              products={products.data}
              initialMeta={products.meta}
              initialSearchTerm={searchTerm}
            />
          </div>
        </SectionContainer>
      </div>
    </div>
  );
}
