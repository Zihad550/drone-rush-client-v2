import { Mail, Phone } from "lucide-react";

export default function ContactUs() {
  return (
    <section className="mb-16 mt-8">
      <div className="rounded-3xl bg-white p-8 text-center shadow-md dark:bg-gray-800 md:p-12">
        <h2 className="mb-3 text-3xl font-bold text-gray-900 dark:text-white">
          Contact Us
        </h2>
        <p className="mb-6 text-gray-600 dark:text-gray-400">
          Have questions or need help? Reach out to our team and we'll get back
          to you as soon as possible.
        </p>

        <div className="mx-auto flex max-w-md flex-col items-center justify-center gap-4 sm:flex-row sm:gap-8">
          <a
            href="mailto:jehadhossain008@gmail.com"
            className="flex items-center gap-2 font-medium text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            <Mail className="h-5 w-5" />
            <span>jehadhossain008@gmail.com</span>
          </a>

          <a
            href="tel:+8801855629170"
            className="flex items-center gap-2 font-medium text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            <Phone className="h-5 w-5" />
            <span>+88 01855629170</span>
          </a>
        </div>
      </div>
    </section>
  );
}
