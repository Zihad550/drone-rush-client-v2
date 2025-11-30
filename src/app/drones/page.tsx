import Drones from "@/components/drones";
import FAQ from "@/components/faq";
import Features from "@/components/features";
import ScrollAnimation from "@/components/ui/scroll-animation";
import { getBrands } from "@/services/brand/brand.service";
import { getCategories } from "@/services/category/category.service";

export default async function DronesPage() {
  const categoriesData = await getCategories();
  const brandsData = await getBrands();

  return (
    <div className="animate-in fade-in duration-700">
      <div className="bg-background min-h-screen py-4 md:py-8">
        <div className="container mx-auto px-4">
          <div className="space-y-12">
            <Drones categories={categoriesData.data} brands={brandsData.data} />
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
