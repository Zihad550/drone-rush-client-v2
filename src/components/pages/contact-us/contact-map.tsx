import PublicSectionTitle from "@/components/shared/public-section-title";

export default function ContactMap() {
  return (
    <div className="mx-auto">
      <div className="mb-12 text-left">
        <PublicSectionTitle className="mb-4">Find Us</PublicSectionTitle>
        <p className="text-muted-foreground">
          Visit our office or contact us for personalized assistance
        </p>
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-background/50 backdrop-blur-sm">
        {/* Radar overlay */}
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <div className="relative">
            {/* Outer rings */}
            <div className="absolute inset-0 rounded-full border-2 border-primary/30 animate-ping" />
            <div className="absolute inset-0 rounded-full border border-primary/20 scale-75 animate-pulse" />
            <div className="absolute inset-0 rounded-full border border-primary/10 scale-50 animate-pulse" />

            {/* Pulsing dot */}
            <div className="relative h-6 w-6 rounded-full bg-primary shadow-lg shadow-primary/50 animate-pulse">
              <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-75" />
            </div>
          </div>
        </div>

        {/* Map iframe */}
        <div className="aspect-video">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.902!2d90.4125!3d23.8103!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c64c6e3b5c5%3A0x3b7b8b7b8b7b8b7b!2sDhaka%2C%20Bangladesh!5e0!3m2!1sen!2s!4v1703123456789!5m2!1sen!2s"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Drone Rush Office Location"
            className="rounded-2xl"
          />
        </div>
      </div>
    </div>
  );
}
