import DroneFinder from "@/components/pages/find-my-drone/drone-finder";
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
import { getDrones } from "@/services/drone/drone.service";

export default async function FindMyDronePage() {
  // Resolve auth server-side so cart/wishlist actions gate to customers only.
  const accessToken = await getCookie("accessToken");
  let userId: string | undefined;
  if (accessToken) {
    const verified = await verifyAccessToken(accessToken);
    if (verified.success && verified.payload) {
      userId = verified.payload.id;
    }
  }
  const isLoggedIn = !!userId;

  let products: Awaited<ReturnType<typeof getDrones>> | null = null;
  try {
    // Pull the whole fleet so the quiz can score across every category.
    products = await getDrones({
      limit: 100,
      page: 1,
      ...(userId && { userId }),
    });
  } catch (error) {
    console.error("Failed to fetch drones:", error);
  }

  if (!products) {
    return (
      <div className="animate-fade-in">
        <div className="dr-ambient-glow relative min-h-screen overflow-hidden py-10 md:py-14">
          <SectionContainer>
            <Card className="rounded-[18px] border-dr-red/40 bg-dr-red/5">
              <CardHeader>
                <Eyebrow className="mb-3">Finder offline</Eyebrow>
                <CardTitle className="font-chakra tracking-[0.02em] text-dr-red">
                  Unable to load the fleet
                </CardTitle>
                <CardDescription className="text-dr-text-2">
                  We're having trouble loading drones right now, so the finder
                  can't run.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-dr-text-2">
                  Please try refreshing the page or browse the full catalog
                  instead.
                </p>
              </CardContent>
            </Card>
          </SectionContainer>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <DroneFinder products={products.data} isLoggedIn={isLoggedIn} />
    </div>
  );
}
