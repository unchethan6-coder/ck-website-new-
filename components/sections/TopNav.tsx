"use client";
import { useState, useEffect, useLayoutEffect } from "react";
import { useTranslations } from "next-intl";
import { Menu, X, ArrowRight, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, usePathname } from "@/i18n/navigation";
import { LanguageSwitcher } from "@/components/shared/LanguageSwitcher";
import { GlobalSearchDialog } from "@/components/search/GlobalSearchDialog";

export function TopNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const t = useTranslations("nav");
  const tSearch = useTranslations("search");
  const pathname = usePathname();

  // Active, verified routes across the site
  const links: Array<{
    key: "tradingObjectives" | "payouts" | "aboutUs" | "affiliates" | "faq";
    href: string;
    external?: boolean;
  }> = [
    { key: "tradingObjectives", href: "/trading-objectives" },
    { key: "payouts", href: "/payouts" },
    { key: "aboutUs", href: "/about-us" },
    { key: "affiliates", href: "/affiliates" },
    { key: "faq", href: "https://intercom.help/ck-capital/en/", external: true },
  ];

  const extraMobileLinks: Array<{ key: "blog" | "contact"; href: string; external?: boolean }> = [
    { key: "blog", href: "/blog" },
    { key: "contact", href: "/contact" },
  ];

  useLayoutEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    window.addEventListener("hashchange", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      window.removeEventListener("hashchange", handleScroll);
    };
  }, []);

  useLayoutEffect(() => {
    setScrolled(window.scrollY > 20);
  }, []);

  useEffect(() => {
    const onResize = () => window.innerWidth >= 1024 && setOpen(false);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Global keyboard shortcut: Cmd+K / Ctrl+K
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      <div
        className="sticky top-3 z-40 w-full px-3 sm:px-4 lg:px-6 mt-4 md:mt-5"
        data-od-id="top-nav"
      >
        <nav
          className={cn(
            "mx-auto max-w-7xl transition-all duration-300",
            open
              ? "rounded-3xl bg-[#0B0A07]/98 shadow-[0_14px_50px_rgba(0,0,0,0.65)] backdrop-blur-2xl border border-white/[0.12]"
              : "rounded-full",
            !open &&
              (scrolled
                ? "bg-[var(--nav-bg-scrolled)]/95 shadow-[0_10px_40px_rgba(0,0,0,0.35)] backdrop-blur-md border border-white/[0.06]"
                : "bg-transparent")
          )}
        >
          <div className="flex items-center justify-between flex-nowrap gap-1.5 lg:gap-2 xl:gap-4 pl-3.5 pr-2.5 sm:pl-5 sm:pr-3.5 lg:pl-5 lg:pr-4 h-14 w-full">
            <Link href="/" className="shrink-0 pr-1 lg:pr-2 whitespace-nowrap" data-od-id="nav-logo">
              <span className="text-[14.5px] lg:text-[15px] font-extrabold tracking-[0.08em] text-foreground">
                CK CAPITAL
              </span>
            </Link>

            <div className="hidden lg:flex items-center flex-nowrap gap-0.5 xl:gap-1 shrink-0" data-od-id="nav-links">
              {links.map((link) => {
                const isActive = pathname === link.href;
                const linkClasses = cn(
                  "whitespace-nowrap px-2.5 xl:px-3 py-1.5 rounded-lg text-[12.5px] xl:text-[13.5px] font-medium transition-colors",
                  isActive
                    ? "bg-primary/10 text-primary font-semibold"
                    : "text-foreground/75 hover:text-foreground hover:bg-foreground/[0.04]"
                );

                if (link.external || link.href.startsWith("http")) {
                  return (
                    <a
                      key={link.key}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={linkClasses}
                    >
                      {t(link.key)}
                    </a>
                  );
                }

                return (
                  <Link
                    key={link.key}
                    href={link.href}
                    className={linkClasses}
                  >
                    {t(link.key)}
                  </Link>
                );
              })}
            </div>

            <div className="hidden lg:flex items-center flex-nowrap gap-1.5 xl:gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className="flex items-center gap-2 h-[34px] px-2.5 xl:px-3 rounded-lg border border-foreground/10 bg-foreground/[0.03] text-foreground/60 hover:text-foreground hover:border-foreground/20 hover:bg-foreground/[0.06] transition-all text-xs shrink-0"
                aria-label={tSearch("searchAria")}
                data-od-id="nav-search-trigger"
              >
                <Search size={14} className="text-primary opacity-90" />
                <span className="hidden xl:inline text-[12px]">{tSearch("buttonLabel")}</span>
                <kbd className="hidden sm:inline-flex items-center rounded border border-foreground/15 bg-foreground/[0.06] px-1.5 py-0.5 font-mono text-[9.5px] text-foreground/45">
                  ⌘K
                </kbd>
              </button>
              <LanguageSwitcher compact />
              <a
                href="https://app.ckcapital.co.uk/signin"
                target="_blank"
                rel="noopener noreferrer"
                className="whitespace-nowrap inline-flex items-center h-[34px] px-2.5 xl:px-3.5 rounded-lg border border-primary/70 text-[12px] xl:text-[12.5px] font-semibold text-primary hover:bg-primary/10 transition-all shrink-0"
              >
                {t("signIn")}
              </a>
              <Link
                href="/#start-challenge"
                data-od-id="nav-cta"
                className="whitespace-nowrap inline-flex items-center h-[34px] px-2.5 xl:px-3.5 rounded-lg bg-primary text-[12px] xl:text-[12.5px] font-bold text-primary-foreground hover:brightness-110 transition-all shrink-0"
              >
                {t("startChallenge")}
              </Link>
            </div>

            <div className="lg:hidden flex items-center flex-nowrap gap-1.5 shrink-0">
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                data-od-id="mobile-search-trigger"
                className="inline-flex h-[34px] w-[34px] items-center justify-center text-foreground/80 hover:text-foreground rounded-lg border border-foreground/10 shrink-0"
                aria-label={tSearch("searchAria")}
              >
                <Search size={16} className="text-primary" />
              </button>
              <Link
                href="/#start-challenge"
                className="hidden sm:inline-flex whitespace-nowrap items-center h-[34px] px-3 rounded-lg bg-primary text-[12px] font-bold text-primary-foreground hover:brightness-110 transition-all shrink-0"
              >
                {t("startChallenge")}
              </Link>
              <LanguageSwitcher compact />
              <button
                className="inline-flex h-[34px] w-[34px] items-center justify-center text-foreground/80 hover:text-foreground rounded-lg border border-foreground/10 shrink-0"
                onClick={() => setOpen(!open)}
                aria-label={t("menu")}
                aria-expanded={open}
              >
                {open ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>

          {open && (
            <div className="lg:hidden border-t border-border pb-4 px-4">
              <div className="flex flex-col gap-1 pt-3">
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    setSearchOpen(true);
                  }}
                  className="flex items-center justify-between w-full h-11 px-3.5 rounded-lg border border-foreground/10 bg-foreground/[0.03] text-sm text-foreground/60 mb-2"
                >
                  <span className="flex items-center gap-2">
                    <Search size={16} className="text-primary" />
                    <span>{tSearch("placeholder")}</span>
                  </span>
                  <kbd className="rounded border border-foreground/15 bg-foreground/[0.06] px-1.5 py-0.5 font-mono text-[10px] text-foreground/40">
                    ⌘K
                  </kbd>
                </button>
                {[...links, ...extraMobileLinks].map((link) => {
                  const isActive = pathname === link.href;
                  const linkClasses = cn(
                    "flex items-center justify-between min-h-11 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors",
                    isActive
                      ? "bg-primary/10 text-primary font-semibold"
                      : "text-foreground/80 hover:text-foreground hover:bg-foreground/[0.05]"
                  );

                  if (link.external || link.href.startsWith("http")) {
                    return (
                      <a
                        key={link.key}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setOpen(false)}
                        className={linkClasses}
                      >
                        <span>{t(link.key)}</span>
                        <ArrowRight size={14} className="opacity-40" />
                      </a>
                    );
                  }

                  return (
                    <Link
                      key={link.key}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={linkClasses}
                    >
                      <span>{t(link.key)}</span>
                      <ArrowRight size={14} className="opacity-40" />
                    </Link>
                  );
                })}
                <div className="pt-3 flex flex-col gap-2">
                  <a
                    href="https://app.ckcapital.co.uk/signin"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 rounded-lg border border-primary text-sm font-semibold text-primary text-center"
                  >
                    {t("signIn")}
                  </a>
                  <Link
                    href="/#start-challenge"
                    onClick={() => setOpen(false)}
                    className="px-4 py-2.5 rounded-lg bg-primary text-sm font-bold text-primary-foreground text-center"
                  >
                    {t("startChallenge")}
                  </Link>
                </div>
              </div>
            </div>
          )}
        </nav>
      </div>
      <GlobalSearchDialog isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}

