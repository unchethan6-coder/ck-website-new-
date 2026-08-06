"use client";
import Image from "next/image";
import { Container } from "@/components/shared/Container";
import { SectionReveal } from "@/components/shared/SectionReveal";

// Real harvested SVG logos — icons only, inverted per theme
const LOGO_ROW: { name: string; src: string }[] = [
  { name: "Visa",       src: "/icons/payments/visa.svg" },
  { name: "Mastercard", src: "/icons/payments/mastercard.svg" },
  { name: "PayPal",     src: "/icons/payments/paypal.svg" },
  { name: "Stripe",     src: "/icons/payments/stripe.svg" },
  { name: "Apple Pay",  src: "/icons/payments/applepay.svg" },
  { name: "Google Pay", src: "/icons/payments/googlepay.svg" },
  { name: "USDT",       src: "/icons/payments/tether.svg" },
];

function PayLogo({ name, src }: { name: string; src: string }) {
  return (
    <div className="inline-flex shrink-0 items-center justify-center rounded-xl bg-foreground/[0.06] border border-foreground/[0.14] px-6 sm:px-8 py-3 sm:py-3.5 min-w-[88px] sm:min-w-[104px]">
      <Image
        src={src}
        alt={name}
        width={48}
        height={28}
        className="pay-logo object-contain h-5 sm:h-6 w-auto"
        unoptimized
      />
    </div>
  );
}

/**
 * Seamless marquee row.
 *
 * The technique: two IDENTICAL inline groups sit side by side inside a
 * `w-max` flex container. Each group has consistent internal `gap` AND a
 * matching `pr-gap` at the end, so the spacing at the boundary between the
 * two duplicates equals the spacing inside each duplicate. Translating the
 * outer container by −50% therefore lands the second duplicate exactly
 * where the first started — no jump, truly seamless.
 *
 * `startDelay` is passed as a negative animation-delay so the first paint
 * shows the row already mid-flow, giving the marquee a "has been running"
 * feel from the moment the page loads.
 */
function MarqueeRow({
  logos,
  reverse = false,
  startOffsetSec = 0,
}: {
  logos: typeof LOGO_ROW;
  reverse?: boolean;
  startOffsetSec?: number;
}) {
  return (
    <div className="relative overflow-hidden">
      {/* Theme-aware fade edges */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-24 sm:w-32 z-10 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-24 sm:w-32 z-10 bg-gradient-to-l from-background to-transparent" />

      <div
        className={`flex w-max ${reverse ? "animate-marquee-reverse" : "animate-marquee"} no-pause will-change-transform`}
        style={{ animationDelay: `-${startOffsetSec}s` }}
      >
        {/*
          Each <ul> unit contains TWO copies of the base row so the doubled
          marquee (two units) is 4× the base row wide — guaranteed to exceed
          any realistic viewport, so there's no empty gap at the right edge.
          Seamless loop still holds because both units are byte-identical.
        */}
        {[0, 1].map((groupIdx) => (
          <ul
            key={groupIdx}
            className="flex shrink-0 gap-3 sm:gap-4 pr-3 sm:pr-4"
            aria-hidden={groupIdx === 1 || undefined}
          >
            {[...logos, ...logos].map((p, i) => (
              <li key={`${groupIdx}-${i}`}>
                <PayLogo name={p.name} src={p.src} />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

export function PaymentsMarquee() {
  const row2 = [...LOGO_ROW.slice().reverse()];

  return (
    <section className="py-12 md:py-16" data-od-id="payments">
      <Container>
        <SectionReveal className="text-center mb-6 md:mb-10">
          <h2 className="font-[family-name:var(--font-inter-tight)] text-2xl font-extrabold text-foreground md:text-3xl">
            Trusted Payment Partners
          </h2>
          <p className="mt-2 text-sm text-foreground/40">
            Fast, secure deposits and withdrawals
          </p>
        </SectionReveal>
      </Container>

      <div className="space-y-3 sm:space-y-4">
        {/* Row 1 → moves right-to-left, starts mid-flow */}
        <MarqueeRow logos={LOGO_ROW} startOffsetSec={8} />
        {/* Row 2 → moves left-to-right, different start offset so they don't
            mirror each other at every instant */}
        <MarqueeRow logos={row2} reverse startOffsetSec={15} />
      </div>
    </section>
  );
}
