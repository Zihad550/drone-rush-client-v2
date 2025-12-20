"use client";

function scrollToContactForm() {
  const element = document.getElementById("contact-form");
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
}

export default function ContactCtaButton() {
  return (
    <div className="mt-8">
      <button
        type="button"
        onClick={scrollToContactForm}
        className="group relative overflow-hidden rounded-full bg-primary px-8 py-3 font-semibold text-primary-foreground shadow-[0_0_20px_rgba(var(--primary),0.5)] transition-all duration-300 hover:shadow-[0_0_30px_rgba(var(--primary),0.8)] hover:scale-105"
      >
        <span className="relative z-10">Initiate Contact</span>
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        {/* Animated border */}
        <div className="absolute inset-0 rounded-full border-2 border-primary/50 animate-ping" />
      </button>
    </div>
  );
}
