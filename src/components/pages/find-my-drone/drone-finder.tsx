"use client";

import { ArrowLeft, Check, RotateCcw } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { useCart } from "@/lib/cart-context";
import type IDrone from "@/types/drone.type";

interface DroneFinderProps {
  products: IDrone[];
  isLoggedIn?: boolean;
}

type QuizKey = "use" | "level" | "budget" | "priority";

interface QuizOption {
  label: string;
  value: string;
  /** Category-name keywords this use-case favours (case-insensitive). */
  keywords?: string[];
  /** Budget ceiling in dollars. */
  max?: number;
}

interface QuizQuestion {
  key: QuizKey;
  q: string;
  sub: string;
  options: QuizOption[];
}

const quizQuestions: QuizQuestion[] = [
  {
    key: "use",
    q: "What will you mostly do with your drone?",
    sub: "Pick the closest match.",
    options: [
      {
        label: "Cinematic film & photo",
        value: "film",
        keywords: ["film", "cinema", "custom", "camera", "photo"],
      },
      {
        label: "Just for fun & learning",
        value: "fun",
        keywords: ["toy", "fun", "mini", "beginner"],
      },
      {
        label: "Long-range exploring",
        value: "range",
        keywords: ["long range", "range", "gps", "explor"],
      },
      {
        label: "Autonomous / follow-me",
        value: "auto",
        keywords: ["autonomous", "follow", "ai"],
      },
      {
        label: "Work: mapping, spraying, marine",
        value: "work",
        keywords: [
          "agric",
          "waterproof",
          "marine",
          "military",
          "industrial",
          "mapping",
          "survey",
        ],
      },
    ],
  },
  {
    key: "level",
    q: "How much have you flown before?",
    sub: "Be honest — it changes the pick.",
    options: [
      { label: "Total beginner", value: "beginner" },
      { label: "Flown a few times", value: "some" },
      { label: "Experienced pilot", value: "pro" },
    ],
  },
  {
    key: "budget",
    q: "What's your budget?",
    sub: "We'll stay inside it.",
    options: [
      { label: "Under $2,000", value: "low", max: 2000 },
      { label: "$2,000 – $5,000", value: "mid", max: 5000 },
      { label: "$5,000 – $9,000", value: "high", max: 9000 },
      { label: "Sky's the limit", value: "any", max: 100000 },
    ],
  },
  {
    key: "priority",
    q: "What matters most to you?",
    sub: "Your top priority.",
    options: [
      { label: "Camera quality", value: "camera" },
      { label: "Flight time", value: "flight" },
      { label: "Portability", value: "portable" },
      { label: "Value for money", value: "value" },
    ],
  },
];

const getCategoryName = (category: IDrone["category"]): string =>
  typeof category === "string" ? category : category?.name || "";

const getBrandName = (brand: IDrone["brand"]): string =>
  typeof brand === "string" ? brand : brand?.name || "Unknown";

const averageRating = (reviews: IDrone["reviews"]): number => {
  if (!reviews || reviews.length === 0) return 0;
  const ratings = reviews
    .map((r) => (typeof r === "object" && r && "rating" in r ? r.rating : 0))
    .filter((r) => r > 0);
  if (ratings.length === 0) return 0;
  return ratings.reduce((sum, r) => sum + r, 0) / ratings.length;
};

const matchesKeywords = (
  category: string,
  keywords: string[] = [],
): boolean => {
  const cat = category.toLowerCase();
  return keywords.some((kw) => cat.includes(kw));
};

const formatPrice = (price: number): string =>
  `$${price.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;

/** Placeholder drone silhouette used when a product has no image. */
function DroneGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 160 120"
      className={className}
      fill="none"
      role="img"
      aria-label="Drone"
    >
      <title>Drone</title>
      <line
        x1="80"
        y1="62"
        x2="30"
        y2="34"
        stroke="#514d58"
        strokeWidth={6}
        strokeLinecap="round"
      />
      <line
        x1="80"
        y1="62"
        x2="130"
        y2="34"
        stroke="#514d58"
        strokeWidth={6}
        strokeLinecap="round"
      />
      <line
        x1="80"
        y1="62"
        x2="30"
        y2="90"
        stroke="#514d58"
        strokeWidth={6}
        strokeLinecap="round"
      />
      <line
        x1="80"
        y1="62"
        x2="130"
        y2="90"
        stroke="#514d58"
        strokeWidth={6}
        strokeLinecap="round"
      />
      <rect
        x="60"
        y="46"
        width="40"
        height="34"
        rx="13"
        fill="#2a262f"
        stroke="#403c47"
        strokeWidth={2}
      />
      <circle cx="70" cy="63" r="3" fill="#ff6377" />
      <circle cx="90" cy="63" r="3" fill="#ef2b45" />
      <circle cx="30" cy="34" r="4" fill="#75727c" />
      <circle cx="130" cy="34" r="4" fill="#75727c" />
      <circle cx="30" cy="90" r="4" fill="#75727c" />
      <circle cx="130" cy="90" r="4" fill="#75727c" />
    </svg>
  );
}

export default function DroneFinder({
  products,
  isLoggedIn: serverIsLoggedIn,
}: DroneFinderProps) {
  const router = useRouter();
  const { addToCart, isInCart } = useCart();
  const {
    isLoggedIn: clientIsLoggedIn,
    isLoading: authLoading,
    user,
  } = useAuth();
  const isLoggedIn =
    serverIsLoggedIn !== undefined ? serverIsLoggedIn : clientIsLoggedIn;
  const isCustomer =
    isLoggedIn &&
    !authLoading &&
    user?.role !== "admin" &&
    user?.role !== "superAdmin";

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<Record<QuizKey, string>>>({});
  const [cartLoadingId, setCartLoadingId] = useState<string | null>(null);

  const total = quizQuestions.length;
  const allAnswered = quizQuestions.every((q) => answers[q.key] != null);
  const done = step >= total && allAnswered;
  const stepIdx = Math.min(step, total - 1);
  const current = quizQuestions[stepIdx];

  const pick = (key: QuizKey, value: string) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
    setStep((s) => s + 1);
  };
  const back = () => setStep((s) => Math.max(0, s - 1));
  const restart = () => {
    setStep(0);
    setAnswers({});
  };

  // Rank the whole fleet against the answers. Mirrors the storefront scoring,
  // adapted to the real data model (category name + price + rating + stock).
  const ranked = useMemo(() => {
    if (!done) return [] as IDrone[];
    const a = answers;
    const useOpt = quizQuestions[0].options.find((o) => o.value === a.use);
    const budgetOpt = quizQuestions[2].options.find(
      (o) => o.value === a.budget,
    );
    const maxBudget = budgetOpt?.max ?? 100000;
    const keywords = useOpt?.keywords ?? [];

    return [...products]
      .map((p) => {
        const cat = getCategoryName(p.category);
        let score = 0;
        if (matchesKeywords(cat, keywords)) score += 50;
        if (p.price <= maxBudget) score += 30;
        else score -= Math.min(45, (p.price - maxBudget) / 300);
        score += averageRating(p.reviews) * 4;

        const lc = cat.toLowerCase();
        if (
          a.priority === "camera" &&
          (lc.includes("film") ||
            lc.includes("custom") ||
            lc.includes("camera"))
        )
          score += 18;
        if (
          a.priority === "portable" &&
          (lc.includes("toy") || lc.includes("mini"))
        )
          score += 16;
        if (
          a.priority === "flight" &&
          (lc.includes("range") || lc.includes("gps"))
        )
          score += 12;
        if (a.priority === "value") score += Math.max(0, 20 - p.price / 500);
        if (
          a.level === "beginner" &&
          (lc.includes("toy") || lc.includes("mini"))
        )
          score += 12;
        if (a.level === "pro" && p.price > 5000) score += 8;
        if (!p.quantity || p.quantity === 0) score -= 25;

        return { p, score };
      })
      .sort((x, y) => y.score - x.score)
      .map((x) => x.p);
  }, [done, answers, products]);

  const top = ranked[0];
  const alts = ranked.slice(1, 3);

  const progress = quizQuestions.map(
    (q, i) => answers[q.key] != null || i < stepIdx,
  );

  const handleAddToCart = async (id: string) => {
    if (cartLoadingId) return;
    setCartLoadingId(id);
    try {
      await addToCart(id);
    } catch {
      // Errors surfaced via the cart context toasts.
    } finally {
      setCartLoadingId(null);
    }
  };

  const getCat = (p: IDrone) => getCategoryName(p.category) || "Uncategorized";

  return (
    <div>
      {/* Hero */}
      <section
        className="relative overflow-hidden border-b border-dr-bd-1 pt-[54px] pb-[30px]"
        style={{
          background:
            "radial-gradient(circle at 78% 12%,rgba(239,43,69,.16),transparent 55%),radial-gradient(circle at 15% 95%,rgba(47,107,255,.1),transparent 50%),var(--dr-bg,transparent)",
        }}
      >
        <div className="mx-auto max-w-[820px] px-10 text-center">
          <span className="inline-flex items-center gap-[7px] rounded-full border border-dr-red/25 bg-dr-red/[0.14] px-[13px] py-1.5 font-dm-mono text-[11px] font-bold uppercase tracking-[1.5px] text-dr-red">
            <span className="h-1.5 w-1.5 rounded-full bg-dr-red shadow-[0_0_8px_#ef2b45]" />
            Drone Finder
          </span>
          <h1 className="mt-[18px] mb-3 font-chakra text-[42px] font-bold leading-[1.08] tracking-[-0.5px] text-dr-text">
            Which drone is right for you?
          </h1>
          <p className="mx-auto max-w-[520px] text-[15px] leading-[1.6] text-dr-text-2">
            Answer four quick questions and we&rsquo;ll match you with the best
            drone from our fleet.
          </p>
        </div>
      </section>

      {/* Body */}
      <section className="mx-auto max-w-[720px] px-10 pt-[34px] pb-20">
        {!done ? (
          <div className="animate-fade-in">
            {/* Progress bars */}
            <div className="mb-[26px] flex items-center gap-2.5">
              {progress.map((filled, i) => (
                <span
                  key={quizQuestions[i].key}
                  className={`h-[5px] flex-1 rounded-full transition-colors duration-300 ${
                    filled
                      ? "bg-dr-red"
                      : i === stepIdx
                        ? "bg-dr-red/45"
                        : "bg-dr-bd-2"
                  }`}
                />
              ))}
            </div>

            <div className="mb-3 font-dm-mono text-xs uppercase tracking-[0.14em] text-dr-red">
              Question {stepIdx + 1} of {total}
            </div>
            <h2 className="mb-1.5 font-chakra text-[28px] font-bold tracking-[-0.3px] text-dr-text">
              {current.q}
            </h2>
            <p className="mb-[26px] text-sm text-dr-text-3">{current.sub}</p>

            <div className="flex flex-col gap-3">
              {current.options.map((o) => {
                const active = answers[current.key] === o.value;
                return (
                  <button
                    key={o.value}
                    type="button"
                    onClick={() => pick(current.key, o.value)}
                    className={`flex items-center justify-between gap-3.5 rounded-[13px] border px-5 py-[18px] text-left font-poppins text-[15px] font-medium text-dr-text transition-all duration-150 hover:-translate-y-0.5 hover:border-dr-red/55 ${
                      active
                        ? "border-dr-red/55 bg-dr-red/[0.09]"
                        : "border-dr-bd-2 bg-dr-surface"
                    }`}
                  >
                    {o.label}
                    <span
                      className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                        active
                          ? "border-dr-red bg-dr-red"
                          : "border-dr-bd-4 bg-transparent"
                      }`}
                    >
                      <Check
                        className={`h-3 w-3 text-white transition-opacity ${
                          active ? "opacity-100" : "opacity-0"
                        }`}
                        strokeWidth={3.5}
                      />
                    </span>
                  </button>
                );
              })}
            </div>

            {step > 0 && (
              <button
                type="button"
                onClick={back}
                className="mt-6 inline-flex items-center gap-2 text-[13.5px] text-dr-text-3 transition-colors hover:text-dr-text"
              >
                <ArrowLeft className="h-[15px] w-[15px]" strokeWidth={2.5} />
                Back
              </button>
            )}
          </div>
        ) : (
          <div className="animate-fade-in">
            {/* Best match banner */}
            <div className="mb-2 text-center">
              <span className="inline-flex items-center gap-2 rounded-full bg-[rgba(31,157,92,0.13)] px-[15px] py-[7px] font-poppins text-[13px] font-semibold text-[#3fd39a]">
                <Check className="h-[15px] w-[15px]" strokeWidth={2.5} />
                Your best match
              </span>
            </div>

            {/* Top pick */}
            {top ? (
              // biome-ignore lint/a11y/useSemanticElements: a <button> can't wrap the nested "Add to cart" button, so this uses role="button" with keyboard handlers.
              <div
                role="button"
                tabIndex={0}
                onClick={() => router.push(`/drones/${top._id}`)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    router.push(`/drones/${top._id}`);
                  }
                }}
                className="mx-0 mt-4 mb-[30px] grid w-full cursor-pointer grid-cols-1 items-center gap-7 overflow-hidden rounded-[18px] border border-dr-red/40 p-[30px] text-left transition-transform hover:-translate-y-0.5 sm:grid-cols-[200px_1fr]"
                style={{
                  background:
                    "radial-gradient(circle at 80% 0%,rgba(239,43,69,.14),transparent 60%),var(--dr-surface,transparent)",
                }}
              >
                <div className="relative flex h-[170px] items-center justify-center overflow-hidden rounded-[14px] bg-[radial-gradient(circle_at_50%_60%,rgba(239,43,69,0.24),rgba(0,0,0,0.2))]">
                  {top.img ? (
                    <Image
                      src={top.img}
                      alt={top.name}
                      fill
                      sizes="200px"
                      className="object-contain p-4"
                    />
                  ) : (
                    <DroneGlyph className="h-28 w-[150px] drop-shadow-[0_10px_22px_rgba(0,0,0,0.55)]" />
                  )}
                </div>

                <div>
                  <div className="mb-[7px] font-dm-mono text-[11px] uppercase tracking-[0.3px] text-dr-text-3">
                    {getBrandName(top.brand)} &middot; {getCat(top)}
                  </div>
                  <h3 className="mb-2.5 font-chakra text-[28px] font-bold text-dr-red">
                    {top.name}
                  </h3>
                  <p className="mb-3.5 line-clamp-2 max-w-[440px] text-[13.5px] leading-[1.6] text-dr-text-2">
                    {top.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-4">
                    <span className="font-poppins text-[26px] font-bold text-dr-red">
                      {formatPrice(top.price)}
                    </span>
                    {isCustomer && top.quantity > 0 && (
                      <button
                        type="button"
                        disabled={cartLoadingId === top._id}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToCart(top._id);
                        }}
                        className="dr-red-grad inline-flex cursor-pointer items-center rounded-[10px] px-[22px] py-3 font-poppins text-sm font-semibold text-white shadow-[0_10px_24px_rgba(239,43,69,0.3)]"
                      >
                        {isInCart(top._id)
                          ? "In cart"
                          : cartLoadingId === top._id
                            ? "Adding…"
                            : "Add to cart"}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <p className="mb-[30px] text-center text-sm text-dr-text-2">
                No drones matched your answers — try widening your budget.
              </p>
            )}

            {/* Alternatives */}
            {alts.length > 0 && (
              <>
                <h3 className="mb-4 font-poppins text-base font-semibold text-dr-text">
                  Also worth considering
                </h3>
                <div className="mb-[30px] grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {alts.map((p) => (
                    <Link
                      key={p._id}
                      href={`/drones/${p._id}`}
                      className="flex items-center gap-3.5 rounded-[13px] border border-dr-bd-2 bg-dr-surface p-4 transition-colors hover:border-dr-red/45"
                    >
                      <div className="relative flex h-[60px] w-[74px] flex-shrink-0 items-center justify-center overflow-hidden rounded-[10px] bg-[radial-gradient(circle_at_50%_60%,rgba(239,43,69,0.2),rgba(0,0,0,0.2))]">
                        {p.img ? (
                          <Image
                            src={p.img}
                            alt={p.name}
                            fill
                            sizes="74px"
                            className="object-contain p-1.5"
                          />
                        ) : (
                          <DroneGlyph className="h-[45px] w-[60px]" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <div className="truncate font-poppins text-[14.5px] font-semibold text-dr-text">
                          {p.name}
                        </div>
                        <div className="mt-[3px] mb-1.5 text-xs text-dr-text-3">
                          {getBrandName(p.brand)}
                        </div>
                        <span className="font-poppins text-base font-bold text-dr-red">
                          {formatPrice(p.price)}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </>
            )}

            {/* Actions */}
            <div className="flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={restart}
                className="inline-flex items-center gap-2 rounded-[10px] border border-dr-bd-4 bg-transparent px-6 py-3 font-poppins text-sm font-semibold text-dr-text transition-colors hover:border-dr-red/55"
              >
                <RotateCcw className="h-[15px] w-[15px]" strokeWidth={2.2} />
                Retake quiz
              </button>
              <Link
                href="/drones"
                className="dr-red-grad inline-flex items-center rounded-[10px] px-6 py-3 font-poppins text-sm font-semibold text-white"
              >
                Browse all drones
              </Link>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
