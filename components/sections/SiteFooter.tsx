"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Check, Globe } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { GoldButton } from "@/components/shared/GoldButton";
import { Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "@/components/shared/LanguageSwitcher";

export function SiteFooter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "error" | "success">("idle");
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error");
      return;
    }
    setStatus("success");
    setEmail("");
  }

  const year = new Date().getFullYear();

  const directoryColumns = [
    {
      title: tNav("evaluation"),
      links: [
        { label: t("evaluation"), href: "/evaluation" },
        { label: t("instantFunding"), href: "/instant" },
        { label: t("tradingObjectives"), href: "/trading-objectives" },
        { label: tNav("faq"), href: "https://intercom.help/ck-capital/en/" },
      ],
    },
    {
      title: t("platforms"),
      links: [
        { label: "MetaTrader 5 (MT5)", href: "/#platforms" },
        { label: "TradeLocker", href: "/#platforms" },
        { label: t("payouts"), href: "/payouts" },
        { label: t("affiliates"), href: "/affiliates" },
      ],
    },
    {
      title: t("company"),
      links: [
        { label: t("aboutUs"), href: "/about-us" },
        { label: tNav("blog"), href: "/blog" },
        { label: t("contact"), href: "/contact" },
        { label: t("affiliates"), href: "/affiliates" },
      ],
    },
    {
      title: t("legal"),
      links: [
        { label: t("terms"), href: "/terms-conditions" },
        { label: t("privacy"), href: "/privacy-policy" },
        { label: t("cookies"), href: "/cookie-policy" },
        { label: t("riskDisclosure"), href: "/risk-disclosure" },
        { label: t("returnPolicy"), href: "/return-policy" },
      ],
    },
  ];

  const legalLinks = [
    { label: t("cookies"), href: "/cookie-policy" },
    { label: t("terms"), href: "/terms-conditions" },
    { label: t("privacy"), href: "/privacy-policy" },
    { label: t("riskDisclosure"), href: "/risk-disclosure" },
    { label: t("returnPolicy"), href: "/return-policy" },
  ];

  const paymentMethods = [
    { name: "Stripe", src: "/icons/payments/stripe.svg" },
    { name: "PayPal", src: "/icons/payments/paypal.svg" },
    { name: "USDT", src: "/icons/payments/tether.svg" },
  ];

  return (
    <footer
      className="bg-[color:var(--background-secondary)] border-t border-foreground/[0.06]"
      data-od-id="site-footer"
    >
      {/* Newsletter / insight capture */}
      <div className="border-b border-foreground/[0.06]" data-od-id="footer-newsletter">
        <Container>
          <div className="grid gap-8 py-10 md:py-12 lg:grid-cols-2 lg:gap-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                {t("newsletterTitle")}
              </h2>
              <p className="mt-2 max-w-md text-[15px] leading-relaxed text-foreground/55">
                {t("newsletterSubtitle")}
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              noValidate
              className="self-start lg:pt-1"
              data-od-id="footer-newsletter-form"
            >
              <div className="flex flex-col gap-2 sm:flex-row">
                <input
                  id="footer-email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status !== "idle") setStatus("idle");
                  }}
                  placeholder={t("emailPlaceholder")}
                  className="h-11 w-full rounded-xl border border-foreground/[0.12] bg-background px-4 text-sm text-foreground outline-none placeholder:text-foreground/35 focus:border-[#d4af37] focus:ring-2 focus:ring-[#d4af37]/30"
                  aria-invalid={status === "error"}
                />
                <GoldButton
                  type="submit"
                  size="md"
                  className="h-11 shrink-0 px-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37]"
                  data-od-id="footer-subscribe"
                >
                  {t("subscribe")}
                </GoldButton>
              </div>
              {status === "error" && (
                <p className="mt-2 text-sm text-red-400">{t("errorEmail")}</p>
              )}
              {status === "success" && (
                <p className="mt-2 text-sm text-primary">{t("successEmail")}</p>
              )}
            </form>
          </div>
        </Container>
      </div>

      {/* Directory */}
      <div className="border-b border-foreground/[0.06]" data-od-id="footer-directory">
        <Container>
          <nav
            aria-label="Footer directory"
            className="grid gap-8 py-10 sm:grid-cols-2 md:gap-10 md:py-12 lg:grid-cols-4"
          >
            {directoryColumns.map((column) => (
              <div key={column.title}>
                <h2 className="text-sm font-bold text-foreground">
                  {column.title}
                </h2>
                <ul className="mt-4 space-y-2.5">
                  {column.links.map((link) => {
                    const linkClassName =
                      "text-sm text-foreground/50 transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary";
                    if (link.href.startsWith("http")) {
                      return (
                        <li key={link.label}>
                          <a
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={linkClassName}
                          >
                            {link.label}
                          </a>
                        </li>
                      );
                    }
                    return (
                      <li key={link.label}>
                        <Link href={link.href as never} className={linkClassName}>
                          {link.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </nav>
        </Container>
      </div>

      {/* Compliance statement */}
      <div className="border-b border-foreground/[0.06]" data-od-id="footer-compliance">
        <Container>
          <p className="max-w-none py-8 text-sm leading-relaxed text-foreground/45 md:py-10">
            {t("disclaimer")}
          </p>
        </Container>
      </div>

      {/* Payments */}
      <div className="border-b border-foreground/[0.06]" data-od-id="footer-payments">
        <Container>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 py-8 md:py-10">
            <p className="text-xs font-bold uppercase tracking-widest text-foreground/35">
              {t("acceptedMethods")}
            </p>
            <div className="flex flex-wrap items-center gap-3">
              {paymentMethods.map((m) => (
                <span
                  key={m.name}
                  className="grid h-9 w-12 shrink-0 place-items-center overflow-hidden rounded-md border border-foreground/[0.08] bg-white/[0.04] p-2"
                  title={m.name}
                >
                  <img src={m.src} alt={m.name} className="block h-5 w-5 max-h-full max-w-full object-contain" />
                </span>
              ))}
            </div>
          </div>
        </Container>
      </div>

      {/* Utility / legal */}
      <Container>
        <div
          className="flex flex-col gap-5 py-7 md:flex-row md:items-center md:justify-between md:py-8"
          data-od-id="footer-utility"
        >
          <div className="space-y-3">
            <p className="text-xs text-foreground/35">{t("copyright", { year })}</p>
            <nav aria-label="Footer legal and product links" className="flex flex-wrap gap-x-4 gap-y-1.5">
              {legalLinks.map((link) => (
                <span key={link.label}>
                  <Link
                    href={link.href as never}
                    className="text-xs text-foreground/40 transition-colors hover:text-foreground/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37]"
                  >
                    {link.label}
                  </Link>
                </span>
              ))}
            </nav>
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <LanguageSwitcher compact dropUp />
          </div>
        </div>
      </Container>
    </footer>
  );
}
