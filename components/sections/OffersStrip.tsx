"use client";
import { Container } from "@/components/shared/Container";
import { SectionReveal } from "@/components/shared/SectionReveal";
import { ArrowRight } from "lucide-react";
import { SITE_META } from "@/lib/content";

export interface PromoData {
  code: string;
  title?: string | null;
  subtitle?: string | null;
  ctaLabel?: string | null;
  discountLabel?: string | null;
}

export function OffersStrip({ promo }: { promo?: PromoData | null }) {
  const code = promo?.code ?? SITE_META.promoCode;
  const discount = promo?.discountLabel ?? SITE_META.promoDiscount;
  const headline = promo?.title ?? "Your First Challenge, 70% Off";
  const subcopy =
    promo?.subtitle ??
    "Enjoy 70% off selected evaluation models up to $100K account sizes. New users only. Terms apply.";

  return (
    <section className="py-12 md:py-16 bg-background" data-od-id="offers">
      <Container>
        <SectionReveal>
          <h2 className="font-[family-name:var(--font-inter-tight)] text-3xl md:text-4xl font-extrabold text-foreground mb-3">
            Available Offers
          </h2>
        </SectionReveal>

        {/* Subtitle chip — sits below the H2, outside the card */}
        <SectionReveal delay={0.05}>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/15 border border-primary/30 px-3 py-1 text-[11px] font-semibold text-primary mb-6">
            <span className="w-1 h-1 rounded-full bg-primary" />
            start challenge · From $9
          </span>
        </SectionReveal>

        {/* Offer card — always dark, gold-tinted premium panel */}
        <SectionReveal delay={0.1}>
          <div
            data-od-id="offers-card"
            className="relative overflow-hidden rounded-2xl border border-primary/25 dark-panel bg-gradient-to-r from-[#1a1508] via-[#0d0b06] to-[#1a1508] p-6 sm:p-8 md:p-10"
          >
            {/* Ambient gold glow */}
            <div className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full bg-primary/12 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-primary/6 blur-3xl" />

            <div className="relative flex flex-col md:flex-row md:items-center gap-8 md:gap-6">
              {/* Content column */}
              <div className="flex-1 min-w-0">
                {/* "hot offer" pill */}
                <span className="inline-flex items-center rounded-full bg-primary/20 border border-primary/40 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-primary">
                  hot offer
                </span>

                {/* Headline — white + gold split */}
                <h3 className="mt-4 font-[family-name:var(--font-inter-tight)] text-2xl sm:text-3xl md:text-[34px] font-extrabold leading-tight tracking-tight text-foreground">
                  {promo?.title ? (
                    headline
                  ) : (
                    <>
                      Your First Challenge,{" "}
                      <span className="text-primary">{discount} Off</span>
                    </>
                  )}
                </h3>

                {/* Thin divider under headline */}
                <div className="mt-4 h-px w-full bg-gradient-to-r from-primary/40 via-primary/15 to-transparent" />

                {/* Subcopy */}
                <p className="mt-4 max-w-xl text-sm sm:text-[15px] text-foreground/55 leading-relaxed">
                  {subcopy}
                </p>
              </div>

              {/* CTA — vertically centered on md+ */}
              <a
                href="#start-challenge"
                data-od-id="offers-cta"
                className="group shrink-0 self-start md:self-center inline-flex items-center justify-center gap-2 rounded-full bg-[image:var(--ck-gold-gradient)] text-black font-bold text-[13px] tracking-[0.12em] uppercase px-5 py-3 shadow-[0_6px_24px_rgba(212,175,55,0.35)] hover:brightness-110 transition-all"
              >
                {promo?.ctaLabel ?? `Use Code: ${code}`}
                <ArrowRight
                  size={15}
                  strokeWidth={2.5}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </a>
            </div>
          </div>
        </SectionReveal>
      </Container>
    </section>
  );
}
