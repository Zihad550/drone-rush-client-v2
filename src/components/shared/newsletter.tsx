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
      <div className="relative overflow-hidden rounded-3xl border border-dr-bd-2 bg-dr-surface p-8 text-center shadow-[0_8px_30px_rgba(0,0,0,0.15)] md:p-12">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(239,43,69,0.12),transparent_60%)]" />
        <div className="relative flex flex-col items-center">
          <PublicSectionTitle
            eyebrow="Stay in the loop"
            align="center"
            className="text-3xl"
          >
            Subscribe to our Newsletter
          </PublicSectionTitle>
          <p className="mb-6 text-dr-text-2">
            Get the latest drone news, deals, and updates straight to your
            inbox.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mx-auto flex w-full max-w-md flex-col gap-3 sm:flex-row"
          >
            <Input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 bg-dr-field"
            />
            <Button
              type="submit"
              size="lg"
              className="dr-red-grad px-8 font-poppins font-semibold text-white shadow-[0_8px_26px_rgba(239,43,69,0.32)] transition-transform hover:scale-[1.03]"
            >
              Subscribe
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
