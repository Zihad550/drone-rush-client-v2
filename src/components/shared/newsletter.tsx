"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PublicSectionTitle from "./public-section-title";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement newsletter subscription
    setEmail("");
  };

  return (
    <section className="mt-12 mb-8">
      <div className="rounded-3xl bg-gradient-to-br from-blue-50 to-cyan-50 p-8 text-center shadow-lg dark:from-red-950/30 dark:to-black/30 md:p-12">
        <PublicSectionTitle className="mb-3 text-3xl">
          Subscribe to our Newsletter
        </PublicSectionTitle>
        <p className="mb-6 text-muted-foreground dark:text-gray-300">
          Get the latest drone news, deals, and updates straight to your inbox.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row"
        >
          <Input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1 bg-white dark:bg-gray-800"
          />
          <Button
            type="submit"
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-red-500 dark:to-red-600 px-8 font-semibold shadow-lg hover:shadow-xl"
          >
            Subscribe
          </Button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
