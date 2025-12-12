import Banner from "@/components/shared/banner";
import ContactUs from "@/components/shared/contact-us";
import FAQ from "@/components/shared/faq";
import Features from "@/components/shared/features";
import Newsletter from "@/components/shared/newsletter";
import Products from "@/components/shared/products";
import { getCookie } from "@/services/auth/cookie.service";
import { verifyAccessToken } from "@/services/auth/token.service";
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
