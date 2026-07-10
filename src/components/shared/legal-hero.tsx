import Eyebrow from "./eyebrow";

interface LegalHeroProps {
  title: string;
  description: string;
  lastUpdated: string;
}

/**
 * Compact centered hero for legal / policy pages — v2 design system.
 * Ambient red radial wash, mono eyebrow, Chakra Petch title + accent bar.
 */
export default function LegalHero({
  title,
  description,
  lastUpdated,
}: LegalHeroProps) {
  return (
    <section
      className="relative overflow-hidden py-[76px]"
      style={{
        background:
          "radial-gradient(circle at 75% 25%,rgba(239,43,69,.13),transparent 55%),var(--dr-bg,transparent)",
      }}
    >
      <div className="mx-auto max-w-[760px] px-10 text-center">
        <Eyebrow align="center" className="mb-4">
          Legal
        </Eyebrow>
        <h1 className="font-chakra text-[38px] font-bold leading-[1.08] tracking-[-0.5px] text-dr-text md:text-[46px]">
          {title}
        </h1>
        <span className="mx-auto mt-4 block h-[3px] w-[120px] rounded-sm bg-gradient-to-r from-white to-dr-red" />
        <p className="mx-auto mt-5 max-w-[560px] text-[15px] leading-[1.7] text-dr-text-2">
          {description}
        </p>
        <p className="mt-5 font-dm-mono text-[11px] uppercase tracking-[0.22em] text-dr-text-3">
          Last updated {lastUpdated}
        </p>
      </div>
    </section>
  );
}
