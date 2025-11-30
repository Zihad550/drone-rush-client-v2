import Banner from "@/components/shared/banner";
import ContactUs from "@/components/shared/contact-us";
import FAQ from "@/components/shared/faq";
import Features from "@/components/shared/features";
import Newsletter from "@/components/shared/newsletter";
import Products from "@/components/shared/products";
import { getProducts } from "@/services/product/product.service";

export default async function Home() {
  const date = new Date();
  const title = `The Best Drones for ${date.getFullYear()}`;

  // Fetch products server-side
  const products = await getProducts({ sort: "-quantity" });

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
            <Products products={products.data} />
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
