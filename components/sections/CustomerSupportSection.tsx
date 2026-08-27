"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { ArrowUpRight, Mail, MessageCircle } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { SectionReveal } from "@/components/shared/SectionReveal";

export function CustomerSupportSection() {
  const t = useTranslations("support");

  return (
    <section className="bg-white text-[#111827] py-16 md:py-24" data-od-id="customer-support">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <SectionReveal>
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-[#D99B00]">
              <span className="h-2 w-2 rounded-full bg-[#FFC107]" />
              {t("available247")}
            </div>
            <h2
              className="mt-4 max-w-[15ch] font-[family-name:var(--font-inter-tight)] text-3xl font-black leading-[1.02] tracking-tight text-[#0A0A0C] sm:text-4xl"
              data-od-id="customer-support-title"
            >
              {t("customerTitle")}
            </h2>
            <p className="mt-5 max-w-xl text-base font-medium leading-7 text-[#4B5563]">
              {t("customerDesc")}
            </p>

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              <a
                href="https://discord.gg/ckcapital"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-between gap-3 rounded-xl border border-gray-200 bg-white px-4 text-sm font-bold text-[#0A0A0C] shadow-sm transition-colors hover:border-[#FFC107] hover:bg-[#FFF8E1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                data-od-id="customer-support-discord"
              >
                <span className="flex items-center gap-2">
                  <MessageCircle size={17} className="text-[#FFC107]" />
                  {t("discordBtn")}
                </span>
                <ArrowUpRight size={16} />
              </a>
              <a
                href="mailto:support@ckcapital.co.uk"
                className="inline-flex min-h-12 items-center justify-between gap-3 rounded-xl border border-gray-200 bg-white px-4 text-sm font-bold text-[#0A0A0C] shadow-sm transition-colors hover:border-[#FFC107] hover:bg-[#FFF8E1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                data-od-id="customer-support-email"
              >
                <span className="flex items-center gap-2">
                  <Mail size={17} className="text-[#FFC107]" />
                  {t("emailBtn")}
                </span>
                <ArrowUpRight size={16} />
              </a>
            </div>

            <a
              href="/contact"
              className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#0A0A0C] transition-colors hover:text-[#D99B00]"
              data-od-id="customer-support-contacts"
            >
              {t("showAll")} <ArrowUpRight size={15} />
            </a>
          </SectionReveal>

          <div className="relative h-[320px] overflow-hidden rounded-[28px] border border-foreground/10 bg-[#07070B] sm:h-[400px] lg:h-full lg:min-h-[400px]" data-od-id="customer-support-image">
            <Image
              src="/images/support/discord-community.jpg"
              alt="CK Capital Discord community"
              fill
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-cover object-left-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4 sm:bottom-7 sm:left-7 sm:right-7">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-secondary">{t("supportBrand")}</p>
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
