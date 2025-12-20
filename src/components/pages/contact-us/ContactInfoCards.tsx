"use client";

import { Clock, Mail, Phone } from "lucide-react";
import { useState } from "react";

export default function ContactInfoCards() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const copyToClipboard = async (
    text: string,
    setCopied: (value: boolean) => void,
  ) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
      <div className="group relative overflow-hidden rounded-2xl border border-primary/20 bg-background/50 p-4 backdrop-blur-sm shadow-[0_0_20px_rgba(var(--primary),0.1)] transition-all duration-300 hover:border-primary/40 hover:shadow-[0_0_30px_rgba(var(--primary),0.3)]">
        {/* Hexagonal overlay */}
        <div className="absolute inset-0 opacity-5">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
          >
            <polygon
              points="50,0 100,25 100,75 50,100 0,75 0,25"
              fill="currentColor"
              className="text-primary"
            />
            <title>Hexagonal overlay</title>
          </svg>
        </div>
        <div className="relative z-10 flex items-center gap-3">
          <div className="rounded-full bg-primary/10 p-2 group-hover:bg-primary/20 transition-colors">
            <Mail className="h-5 w-5 text-primary" />
          </div>
          <div className="text-left">
            <p className="text-sm font-medium text-muted-foreground">Email</p>
            <button
              type="button"
              onClick={() =>
                copyToClipboard("jehadhossain008@gmail.com", setCopiedEmail)
              }
              className="text-base font-semibold text-foreground hover:text-primary transition-colors"
            >
              {copiedEmail ? "Copied!" : "jehadhossain008@gmail.com"}
            </button>
          </div>
        </div>
      </div>

      <div className="group relative overflow-hidden rounded-2xl border border-primary/20 bg-background/50 p-4 backdrop-blur-sm shadow-[0_0_20px_rgba(var(--primary),0.1)] transition-all duration-300 hover:border-primary/40 hover:shadow-[0_0_30px_rgba(var(--primary),0.3)]">
        {/* Hexagonal overlay */}
        <div className="absolute inset-0 opacity-5">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
          >
            <polygon
              points="50,0 100,25 100,75 50,100 0,75 0,25"
              fill="currentColor"
              className="text-primary"
            />
            <title>Hexagonal overlay</title>
          </svg>
        </div>
        <div className="relative z-10 flex items-center gap-3">
          <div className="rounded-full bg-primary/10 p-2 group-hover:bg-primary/20 transition-colors">
            <Phone className="h-5 w-5 text-primary" />
          </div>
          <div className="text-left">
            <p className="text-sm font-medium text-muted-foreground">Phone</p>
            <button
              type="button"
              onClick={() => copyToClipboard("+8801855629170", setCopiedPhone)}
              className="text-base font-semibold text-foreground hover:text-primary transition-colors"
            >
              {copiedPhone ? "Copied!" : "+88 01855629170"}
            </button>
          </div>
        </div>
      </div>

      <div className="group relative overflow-hidden rounded-2xl border border-primary/20 bg-background/50 p-4 backdrop-blur-sm shadow-[0_0_20px_rgba(var(--primary),0.1)] transition-all duration-300 hover:border-primary/40 hover:shadow-[0_0_30px_rgba(var(--primary),0.3)]">
        {/* Hexagonal overlay */}
        <div className="absolute inset-0 opacity-5">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
          >
            <polygon
              points="50,0 100,25 100,75 50,100 0,75 0,25"
              fill="currentColor"
              className="text-primary"
            />
            <title>Hexagonal overlay</title>
          </svg>
        </div>
        <div className="relative z-10 flex items-center gap-3">
          <div className="rounded-full bg-primary/10 p-2 group-hover:bg-primary/20 transition-colors">
            <Clock className="h-5 w-5 text-primary" />
          </div>
          <div className="text-left">
            <p className="text-sm font-medium text-muted-foreground">
              Business Hours
            </p>
            <p className="text-base font-semibold text-foreground">
              10:00–18:00 GMT+6 (Mon–Fri)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
