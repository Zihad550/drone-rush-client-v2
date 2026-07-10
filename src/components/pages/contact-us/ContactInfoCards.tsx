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
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      {/* Email */}
      <div className="group rounded-[13px] border border-dr-bd-1 bg-dr-surface p-4 transition-colors hover:border-dr-red/30">
        <div
          className="mb-3 flex h-10 w-[38px] items-center justify-center border border-dr-red/30 bg-gradient-to-b from-dr-red/[0.16] to-transparent text-dr-red"
          style={{
            clipPath: "polygon(50% 0,100% 25%,100% 75%,50% 100%,0 75%,0 25%)",
          }}
        >
          <Mail className="h-[18px] w-[18px]" strokeWidth={2} />
        </div>
        <p className="font-dm-mono text-[10px] uppercase tracking-[0.16em] text-dr-text-3">
          Email
        </p>
        <button
          type="button"
          onClick={() =>
            copyToClipboard("jehadhossain008@gmail.com", setCopiedEmail)
          }
          className="mt-0.5 block break-all text-left font-poppins text-[13px] font-semibold text-dr-text transition-colors hover:text-dr-red"
        >
          {copiedEmail ? "Copied!" : "jehadhossain008@gmail.com"}
        </button>
      </div>

      {/* Phone */}
      <div className="group rounded-[13px] border border-dr-bd-1 bg-dr-surface p-4 transition-colors hover:border-dr-red/30">
        <div
          className="mb-3 flex h-10 w-[38px] items-center justify-center border border-dr-red/30 bg-gradient-to-b from-dr-red/[0.16] to-transparent text-dr-red"
          style={{
            clipPath: "polygon(50% 0,100% 25%,100% 75%,50% 100%,0 75%,0 25%)",
          }}
        >
          <Phone className="h-[18px] w-[18px]" strokeWidth={2} />
        </div>
        <p className="font-dm-mono text-[10px] uppercase tracking-[0.16em] text-dr-text-3">
          Phone
        </p>
        <button
          type="button"
          onClick={() => copyToClipboard("+8801855629170", setCopiedPhone)}
          className="mt-0.5 block text-left font-poppins text-[13px] font-semibold text-dr-text transition-colors hover:text-dr-red"
        >
          {copiedPhone ? "Copied!" : "+88 01855629170"}
        </button>
      </div>

      {/* Business hours */}
      <div className="group rounded-[13px] border border-dr-bd-1 bg-dr-surface p-4 transition-colors hover:border-dr-red/30">
        <div
          className="mb-3 flex h-10 w-[38px] items-center justify-center border border-dr-red/30 bg-gradient-to-b from-dr-red/[0.16] to-transparent text-dr-red"
          style={{
            clipPath: "polygon(50% 0,100% 25%,100% 75%,50% 100%,0 75%,0 25%)",
          }}
        >
          <Clock className="h-[18px] w-[18px]" strokeWidth={2} />
        </div>
        <p className="font-dm-mono text-[10px] uppercase tracking-[0.16em] text-dr-text-3">
          Business Hours
        </p>
        <p className="mt-0.5 font-poppins text-[13px] font-semibold text-dr-text">
          10:00&ndash;18:00 GMT+6 (Mon&ndash;Fri)
        </p>
      </div>
    </div>
  );
}
