import Banner from "@/components/shared/banner";
import Brands from "@/components/shared/brands";
import Categories from "@/components/shared/categories";
import ContactUs from "@/components/shared/contact-us";
import FAQ from "@/components/shared/faq";
import Features from "@/components/shared/features";
import Newsletter from "@/components/shared/newsletter";
import Products from "@/components/shared/products";
import ReviewsCarousel from "@/components/shared/reviews-carousel";
import { getCookie } from "@/services/auth/cookie.service";
import { verifyAccessToken } from "@/services/auth/token.service";
import { getBrands } from "@/services/brand/brand.service";
import { getCategories } from "@/services/category/category.service";
import { getDrones } from "@/services/drone/drone.service";

export default async function Home() {
  const date = new Date();
  const title = `The Best Drones for ${date.getFullYear()}`;

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

  // Fetch drones server-side
  const products = await getDrones({
    sort: "-quantity",
    ...(userId && { userId }),
  });
  console.log(products);

  // Fetch brands server-side
  const brands = await getBrands();

  // Fetch categories server-side
  const categories = await getCategories();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Banner Section */}
      <Banner />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="space-y-16">
          {/* Products Section */}
          <section>
            <h2 className="mb-6 text-center text-4xl font-bold text-gray-900 dark:text-white">
              {title}
            </h2>
            <Products products={products.data} isLoggedIn={isLoggedIn} />
          </section>

          {/* Brands Section */}
          <section>
            <h2 className="mb-6 text-center text-4xl font-bold text-gray-900 dark:text-white">
              Explore Brands
            </h2>
            <Brands brands={brands.data} />
          </section>

          {/* Categories Section */}
          {categories.data && categories.data.length > 0 && (
            <section>
              <h2 className="mb-6 text-center text-4xl font-bold text-gray-900 dark:text-white">
                Explore Categories
              </h2>
              <Categories categories={categories.data} />
            </section>
          )}

          {/* Reviews Section */}
          <section>
            <h2 className="mb-6 text-center text-4xl font-bold text-gray-900 dark:text-white">
              Customer Reviews
            </h2>
            <ReviewsCarousel />
          </section>

          {/* Features Section */}
          <Features />

          {/* FAQ Section */}
          <FAQ />

          {/* Newsletter Section */}
          <Newsletter />

          {/* Contact Us Section */}
          <ContactUs />
        </div>
      </div>
    </div>
  );
}
