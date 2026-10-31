"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { FUNDING_CHALLENGE_TYPES, FUNDING_PLAN_RAW_DATA, type PlanDetails } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * "Choose your challenge": one card per funding model, each with its ship,
 * ahead of the pricing table. Every figure is read from the same plans the
 * table prices, so the cards cannot disagree with it (and the VIP copy's
 * cards show its 90% prices). Choosing a card selects that model in the
 * table and scrolls to it.
 */

/** Which ship flies which model. */
const SHIPS: Record<string, { src: string; w: number; h: number; alt: string }> = {
  // Twin engines for two phases.
  standard: { src: "/images/challenges/two-step-standard.webp", w: 1536, h: 1024, alt: "Twin-engine ckpropfirm fighter" },
  // One engine, one phase: the straight-line rocket.
  "1step": { src: "/images/challenges/one-step-standard.webp", w: 1254, h: 1254, alt: "Single-engine ckpropfirm rocket" },
  // The heaviest ship, for the model without a consistency rule.
  pro: { src: "/images/challenges/two-step-pro.webp", w: 1536, h: 1024, alt: "Heavy twin-hull ckpropfirm gunship" },
  // A jump drive at its core: straight to funded.
  instant: { src: "/images/challenges/instant-funding.webp", w: 1254, h: 1254, alt: "Jump-drive ckpropfirm pod" },
};

/** Fired at the pricing table, which selects the model (see ChallengeComparison). */
export const SELECT_CHALLENGE_EVENT = "ck:select-challenge";

const SIZES = ["10K", "25K", "50K", "100K", "200K", "300K"];
const num = (v?: string) => Number((v ?? "").replace(/[$,]/g, ""));
const pct = (amount: string | undefined, size: string) => {
  const n = num(amount);
  if (!n) return null;
  return `${+((n / (parseInt(size, 10) * 1000)) * 100).toFixed(1)}%`;
};

export function ChallengeTypeCards({
  plans = FUNDING_PLAN_RAW_DATA,
}: {
  plans?: Record<string, Record<string, PlanDetails | null>>;
}) {
  const t = useTranslations("challengeTypes");

  const cards = FUNDING_CHALLENGE_TYPES.map((type) => {
    const available = SIZES.map((size) => ({ size, plan: plans[size]?.[type.id] ?? null })).filter(
      (x): x is { size: string; plan: PlanDetails } => x.plan !== null
    );
    // Rules are proportional to account size, so the smallest account speaks for all.
    const ref = available[0];
    const cheapest = available.reduce((a, b) => (num(b.plan.disc) < num(a.plan.disc) ? b : a), ref);
    const phases = [ref.plan.p1, ref.plan.p2].filter((p) => num(p) > 0).length;
    return { type, ref, cheapest, phases };
  });

  const choose = (typeId: string) => {
    window.dispatchEvent(new CustomEvent(SELECT_CHALLENGE_EVENT, { detail: typeId }));
  };

  return (
    <section className="relative overflow-hidden bg-[#030A1C] py-16 sm:py-20" data-od-id="challenge-types">
      <div aria-hidden className="pointer-events-none absolute top-0 left-1/2 h-[28rem] w-[60rem] -translate-x-1/2 rounded-full bg-[#703AD7]/15 blur-[120px]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[11px] font-black tracking-[0.2em] text-[#A98BFF] uppercase">{t("eyebrow")}</p>
          <h2 className="mt-3 font-[family-name:var(--font-jakarta)] text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-white/65 sm:text-base">{t("subtitle")}</p>
        </div>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {cards.map(({ type, ref, cheapest, phases }) => {
            const ship = SHIPS[type.id];
            const facts: [string, string][] = [
              [t("phases"), phases ? String(phases) : t("noEvaluation")],
              [t("profitTarget"), phases ? [pct(ref.plan.p1, ref.size), pct(ref.plan.p2, ref.size)].filter(Boolean).join(" / ") : "—"],
              [t("dailyLoss"), pct(ref.plan.dailyLoss, ref.size) ?? "—"],
              [t("maxLoss"), pct(ref.plan.maxLoss, ref.size) ?? "—"],
              [t("profitSplit"), ref.plan.split1],
            ];
            const saving = num(cheapest.plan.orig) > num(cheapest.plan.disc);
            return (
              <li key={type.id}>
                <article
                  className={cn(
                    "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-[#0E1230] to-[#070A1C] p-5",
                    "transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-[#894CEF]/60 hover:shadow-[0_24px_60px_-24px_rgba(137,76,239,0.75)]",
                    "motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                  )}
                  data-od-id={`challenge-type-${type.id}`}
                >
                  {/* Ship */}
                  <div className="relative -mx-2 flex h-40 items-center justify-center">
                    <div aria-hidden className="absolute inset-x-6 bottom-3 h-10 rounded-full bg-[#8B3DFF]/35 blur-2xl transition-opacity duration-300 group-hover:opacity-100 sm:opacity-70" />
                    <Image
                      src={ship.src}
                      alt={ship.alt}
                      width={ship.w}
                      height={ship.h}
                      sizes="(max-width: 640px) 80vw, (max-width: 1280px) 40vw, 300px"
                      className="relative h-full w-auto max-w-full object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.6)] transition-transform duration-500 group-hover:-translate-y-1.5 group-hover:scale-[1.04] motion-reduce:transition-none"
                    />
                  </div>

                  <h3 className="mt-3 font-[family-name:var(--font-jakarta)] text-lg font-extrabold text-white">{type.name}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-white/60">{type.desc}</p>

                  <dl className="mt-4 space-y-1.5 border-t border-white/10 pt-4 text-[13px]">
                    {facts.map(([label, value]) => (
                      <div key={label} className="flex items-center justify-between gap-3">
                        <dt className="text-white/55">{label}</dt>
                        <dd className="font-semibold text-white tabular-nums">{value}</dd>
                      </div>
                    ))}
                  </dl>

                  <div className="mt-auto pt-5">
                    <p className="text-xs text-white/55">
                      {t("from")}{" "}
                      <span className="font-[family-name:var(--font-jakarta)] text-2xl font-black text-emerald-400">{cheapest.plan.disc}</span>
                      {saving && <span className="ml-1.5 text-white/40 line-through">{cheapest.plan.orig}</span>}
                    </p>
                    <a
                      href="#start-challenge"
                      onClick={() => choose(type.id)}
                      className="mt-3 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.05] text-sm font-bold text-white transition-colors group-hover:border-transparent group-hover:bg-[#703AD7] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ring)]"
                    >
                      {t("choose")} <ArrowRight size={15} aria-hidden className="rtl:rotate-180" />
                    </a>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
