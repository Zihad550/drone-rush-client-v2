"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement newsletter subscription
    console.log("Subscribe email:", email);
    setEmail("");
  };

  return (
    <section className="mt-12 mb-8">
      <div className="rounded-3xl bg-gradient-to-br from-blue-50 to-cyan-50 p-8 text-center shadow-lg dark:from-blue-950/30 dark:to-cyan-950/30 md:p-12">
        <h2 className="mb-3 text-3xl font-bold text-gray-900 dark:text-white">
          Subscribe to our Newsletter
        </h2>
        <p className="mb-6 text-gray-600 dark:text-gray-400">
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
            className="bg-gradient-to-r from-blue-600 to-cyan-600 px-8 font-semibold shadow-lg hover:shadow-xl"
          >
            Subscribe
          </Button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
