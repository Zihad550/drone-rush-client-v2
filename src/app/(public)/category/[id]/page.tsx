import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Products from "@/components/shared/products";
import SectionContainer from "@/components/shared/SectionContainer";
import { Button } from "@/components/ui/button";
import { getCookie } from "@/services/auth/cookie.service";
import { verifyAccessToken } from "@/services/auth/token.service";
import { getCategories } from "@/services/category/category.service";
import { getDrones } from "@/services/drone/drone.service";

interface CategoryPageProps {
  params: {
    id: string;
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const resolvedParams = await params;
  const { id } = resolvedParams;

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

  // Fetch categories to get category name
  const categories = await getCategories();
  console.log("Fetched categories:", categories.data);
  console.log("Requested ID:", id);
  const category = categories.data.find((cat) => cat._id === id);

  if (!category) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Category Not Found
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            The category you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  // Fetch drones for this category
  const drones = await getDrones({
    category: [id],
    sort: "-quantity",
    ...(userId && { userId }),
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <SectionContainer className="py-8 md:py-12">
        <div className="space-y-16">
          {/* Go Back Button */}
          <div className="mb-6">
            <Button variant="outline" asChild className="gap-2">
              <Link href="/">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Link>
            </Button>
          </div>

          {/* Category Header */}
          <section>
            <h1 className="text-center text-4xl font-bold text-gray-900 dark:text-white">
              {category.name} Drones
            </h1>
            <p className="text-center text-lg text-gray-600 dark:text-gray-400 mt-4">
              Explore all drones in the {category.name} category
            </p>
          </section>

          {/* Products Section */}
          <section>
            <Products products={drones.data} isLoggedIn={isLoggedIn} />
          </section>
        </div>
      </SectionContainer>
    </div>
  );
}
