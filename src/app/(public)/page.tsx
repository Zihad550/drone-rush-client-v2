import Banner from "@/components/shared/banner";
import Brands from "@/components/shared/brands";
import Categories from "@/components/shared/categories";

import FAQ from "@/components/shared/faq";
import Features from "@/components/shared/features";
import Newsletter from "@/components/shared/newsletter";
import Products from "@/components/shared/products";
import PublicSectionTitle from "@/components/shared/public-section-title";
import ReviewsCarousel from "@/components/shared/reviews-carousel";
import SectionContainer from "@/components/shared/SectionContainer";
import { getCookie } from "@/services/auth/cookie.service";
import { verifyAccessToken } from "@/services/auth/token.service";
import { getBrands } from "@/services/brand/brand.service";
import { getCategories } from "@/services/category/category.service";
import { getDrones } from "@/services/drone/drone.service";

export default async function Home() {
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
    <div className="min-h-screen bg-background">
      {/* Banner Section */}
      <Banner />

      {/* Main Content */}
      <SectionContainer className="py-12 md:py-16 lg:py-20">
        <div className="space-y-12 md:space-y-16 lg:space-y-20">
          {/* Products Section */}
          <section className="pt-8 md:pt-12">
            <PublicSectionTitle>Best Products</PublicSectionTitle>
            <Products products={products.data} isLoggedIn={isLoggedIn} />
          </section>

          {/* Brands Section */}
          <section className="pt-8 md:pt-12">
            <Brands brands={brands.data} />
          </section>

          {/* Categories Section */}
          {categories.data && categories.data.length > 0 && (
            <section className="pt-8 md:pt-12">
              <Categories categories={categories.data} />
            </section>
          )}

          {/* Reviews Section */}
          <section className="pt-8 md:pt-12">
            <ReviewsCarousel />
          </section>

          {/* Features Section */}
          <section className="pt-8 md:pt-12">
            <Features />
          </section>

          {/* FAQ Section */}
          <section className="pt-8 md:pt-12">
            <FAQ />
          </section>

          {/* Newsletter Section */}
          <section className="pt-8 md:pt-12">
            <Newsletter />
          </section>
        </div>
      </SectionContainer>
    </div>
  );
}
