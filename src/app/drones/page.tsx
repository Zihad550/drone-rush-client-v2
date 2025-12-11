import Drones from "@/components/drones";
import FAQ from "@/components/faq";
import Features from "@/components/features";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ScrollAnimation from "@/components/ui/scroll-animation";
import { getBrands } from "@/services/brand/brand.service";
import { getCategories } from "@/services/category/category.service";

export default async function DronesPage() {
  let categoriesData: Awaited<ReturnType<typeof getCategories>> | null = null;
  let brandsData: Awaited<ReturnType<typeof getBrands>> | null = null;
  let hasError = false;

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
        <div className="bg-background min-h-screen py-4 md:py-8">
          <div className="container mx-auto px-4">
            <div className="space-y-12">
              <Card className="border-destructive/50 bg-destructive/5">
                <CardHeader>
                  <CardTitle className="text-destructive">
                    Unable to Load Drones
                  </CardTitle>
                  <CardDescription>
                    We're having trouble loading the drone catalog. Some
                    features may not be available.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Please try refreshing the page or contact support if the
                    problem persists.
                  </p>
                </CardContent>
              </Card>

              {/* Still show features and FAQ even if data loading fails */}
              <ScrollAnimation>
                <Features />
              </ScrollAnimation>
              <ScrollAnimation className="delay-100">
                <FAQ />
              </ScrollAnimation>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-700">
      <div className="bg-background min-h-screen py-4 md:py-8">
        <div className="container mx-auto px-4">
          <div className="space-y-12">
            <Drones
              categories={categoriesData?.data || []}
              brands={brandsData?.data || []}
            />
            {/* Features Section */}
            <ScrollAnimation>
              <Features />
            </ScrollAnimation>
            {/* FAQ Section */}
            <ScrollAnimation className="delay-100">
              <FAQ />
            </ScrollAnimation>
          </div>
        </div>
      </div>
    </div>
  );
}
