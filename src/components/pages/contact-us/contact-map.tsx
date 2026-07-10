export default function ContactMap() {
  return (
    <section className="mx-auto max-w-[1180px] px-10">
      <div className="mb-8">
        <h2 className="inline-block font-chakra text-[32px] font-bold text-dr-text">
          Find Us
          <span className="mt-2 block h-[3px] w-[110px] rounded-sm bg-gradient-to-r from-dr-red to-transparent" />
        </h2>
        <p className="mt-3 max-w-[560px] text-[15px] leading-[1.7] text-dr-text-2">
          Visit our office or contact us for personalized assistance
        </p>
      </div>

      <div className="relative overflow-hidden rounded-[18px] border border-dr-bd-2 bg-dr-surface">
        {/* Radar overlay */}
        <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
          <div className="relative">
            <div className="absolute inset-0 animate-ping rounded-full border-2 border-dr-red/30" />
            <div className="absolute inset-0 scale-75 animate-pulse rounded-full border border-dr-red/20" />
            <div className="relative h-6 w-6 animate-pulse rounded-full bg-dr-red shadow-[0_0_20px_rgba(239,43,69,0.6)]">
              <div className="absolute inset-0 animate-ping rounded-full bg-dr-red opacity-75" />
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
          />
        </div>
      </div>
    </section>
  );
}
