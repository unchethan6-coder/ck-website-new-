"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { ArrowUpRight, Mail, MessageCircle } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { SectionReveal } from "@/components/shared/SectionReveal";

export function CustomerSupportSection() {
  const t = useTranslations("support");

  return (
    <section className="py-14 md:py-24" data-od-id="customer-support">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <SectionReveal>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-secondary">
              <span className="h-2 w-2 rounded-full bg-secondary" />
              {t("available247")}
            </div>
            <h2
              className="mt-4 max-w-[15ch] font-[family-name:var(--font-inter-tight)] text-3xl font-extrabold leading-[1.02] tracking-[-0.03em] text-foreground sm:text-4xl"
              data-od-id="customer-support-title"
            >
              {t("customerTitle")}
            </h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-foreground/55">
              {t("customerDesc")}
            </p>

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              <a
                href="https://discord.gg/ckcapital"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-between gap-3 rounded-xl border border-primary/45 bg-primary/[0.06] px-4 text-sm font-bold text-primary transition-colors hover:border-primary hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70"
                data-od-id="customer-support-discord"
              >
                <span className="flex items-center gap-2">
                  <MessageCircle size={17} />
                  {t("discordBtn")}
                </span>
                <ArrowUpRight size={16} />
              </a>
              <a
                href="mailto:support@ckcapital.co.uk"
                className="inline-flex min-h-12 items-center justify-between gap-3 rounded-xl border border-foreground/15 px-4 text-sm font-bold text-foreground transition-colors hover:border-primary/60 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70"
                data-od-id="customer-support-email"
              >
                <span className="flex items-center gap-2">
                  <Mail size={17} />
                  {t("emailBtn")}
                </span>
                <ArrowUpRight size={16} />
              </a>
            </div>

            <a
              href="/contact"
              className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70"
              data-od-id="customer-support-contacts"
            >
              {t("showAll")} <ArrowUpRight size={15} />
            </a>
          </SectionReveal>

          <div className="relative h-[320px] overflow-hidden rounded-[28px] border border-foreground/10 bg-surface sm:h-[400px] lg:h-full lg:min-h-[400px]" data-od-id="customer-support-image">
            <Image
              src="/images/support/image-placeholder.svg"
              alt="Customer support image placeholder"
              fill
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/75 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4 sm:bottom-7 sm:left-7 sm:right-7">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-secondary">{t("supportBrand")}</p>
                <p className="mt-1 text-sm text-foreground/75">{t("imagePlaceholder")}</p>
              </div>
              <span className="rounded-full border border-secondary/35 bg-background/70 px-3 py-1.5 text-xs font-semibold text-secondary">
                24/7
              </span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
