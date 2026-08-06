"use client";
import { Container } from "@/components/shared/Container";
import { SectionReveal } from "@/components/shared/SectionReveal";
import { Star } from "lucide-react";

export interface ReviewCard {
  text: string;
  name: string;
  location: string;
  source: string;
  rating: number;
}

const DEFAULT_REVIEWS: ReviewCard[] = [
  {
    text: "The objectives are clear, support is responsive, and the dashboard makes the evaluation process easy to follow.",
    name: "CK Trader",
    location: "United Kingdom",
    source: "Trustpilot",
    rating: 5,
  },
  {
    text: "Fast support and a smooth simulated trading experience. The rules are simple to understand before starting.",
    name: "Community Trader",
    location: "UAE",
    source: "Trustpilot",
    rating: 5,
  },
  {
    text: "The community is active, friendly, and helpful. CK Capital feels more personal than other evaluation brands.",
    name: "Discord Member",
    location: "India",
    source: "Community",
    rating: 5,
  },
  {
    text: "The price options are flexible and the account-size choices make it easier to pick the right starting point.",
    name: "Evaluation User",
    location: "United States",
    source: "Review",
    rating: 5,
  },
  {
    text: "Reward requests were handled quickly and the rules stayed exactly as advertised throughout my evaluation.",
    name: "Funded Trader",
    location: "Germany",
    source: "Trustpilot",
    rating: 5,
  },
  {
    text: "Started with the $5K plan to learn the process. The mobile dashboard works well and support answered within minutes.",
    name: "New Trader",
    location: "South Africa",
    source: "Review",
    rating: 5,
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={14}
          fill={i < rating ? "#00B67A" : "none"}
          stroke={i < rating ? "#00B67A" : "currentColor"}
        />
      ))}
    </div>
  );
}

export function TraderReviews({ reviews = DEFAULT_REVIEWS }: { reviews?: ReviewCard[] }) {
  const items = reviews.length ? reviews : DEFAULT_REVIEWS;

  return (
    <section className="py-14 md:py-24 bg-background" data-od-id="trader-reviews">
      <Container>
        <SectionReveal className="text-center mb-10 md:mb-14">
          <p className="text-xs text-primary uppercase tracking-widest font-semibold mb-3">
            Trader Reviews
          </p>
          <h2 className="font-[family-name:var(--font-inter-tight)] text-3xl font-extrabold text-foreground md:text-4xl">
            The trusted choice for CK traders
          </h2>
          <div className="mt-4 flex items-center justify-center gap-2 text-sm text-foreground/60">
            <span>4.9 based on Trustpilot reviews</span>
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={16} fill="#00B67A" stroke="none" />
              ))}
            </div>
          </div>
          <a
            href="https://www.trustpilot.com/review/ckcapital.co.uk"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex h-12 items-center justify-center rounded-xl border border-primary/40 bg-primary/10 px-8 text-[15px] font-bold text-primary transition-colors hover:bg-primary/20"
          >
            Read All Reviews on Trustpilot ↗
          </a>
        </SectionReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((r, i) => (
            <div
              key={i}
              className="rounded-2xl border border-foreground/10 bg-foreground/[0.03] p-6 flex flex-col justify-between gap-6"
            >
              <div>
                <StarRating rating={r.rating} />
                <blockquote className="mt-4 text-sm text-foreground/70 leading-relaxed">
                  &ldquo;{r.text}&rdquo;
                </blockquote>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center text-sm font-bold text-primary">
                    {(r.name ?? "T").charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{r.name}</p>
                    {r.location ? (
                      <p className="text-xs text-foreground/40">{r.location}</p>
                    ) : null}
                  </div>
                </div>
                {r.source ? (
                  <span className="text-xs text-foreground/30 border border-foreground/10 rounded-lg px-2.5 py-1">
                    {r.source}
                  </span>
                ) : null}
              </div>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-foreground/30 max-w-lg mx-auto">
          Reviews reflect individual experiences and do not guarantee future results. CK Capital provides simulated trading evaluations only.
        </p>
      </Container>
    </section>
  );
}
