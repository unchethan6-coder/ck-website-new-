"use client";
import { useState, useEffect, useLayoutEffect } from "react";
import { useTranslations } from "next-intl";
import {
  Menu,
  X,
  ArrowRight,
  Search,
  ChevronDown,
  ArrowUpRight,
  Users,
  Trophy,
  Handshake,
  Headphones,
  BookOpen,
  HelpCircle,
  ShieldCheck,
  Zap,
  Layers,
  Coins,
  Scale,
  Target,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, usePathname } from "@/i18n/navigation";
import { LanguageSwitcher } from "@/components/shared/LanguageSwitcher";
import { GlobalSearchDialog } from "@/components/search/GlobalSearchDialog";

interface NavColumnItem {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  titleKey: string;
  descKey: string;
  href: string;
  priceKey?: string;
  external?: boolean;
}

interface NavColumn {
  titleKey: string;
  items: NavColumnItem[];
}

export function TopNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const t = useTranslations("nav");
  const tSearch = useTranslations("search");
  const pathname = usePathname();

  // Programs / Objectives Menu Data (Matching Company 2-column icon grid format)
  const programColumns: NavColumn[] = [
    {
      titleKey: "fundingModelsHeader",
      items: [
        {
          icon: Zap,
          titleKey: "oneStepTitle",
          descKey: "oneStepDesc",
          href: "/evaluation",
          priceKey: "oneStepPrice",
        },
        {
          icon: Layers,
          titleKey: "twoStepTitle",
          descKey: "twoStepDesc",
          href: "/evaluation",
          priceKey: "twoStepPrice",
        },
        {
          icon: Coins,
          titleKey: "instantTitle",
          descKey: "instantDesc",
          href: "/instant",
          priceKey: "instantPrice",
        },
      ],
    },
    {
      titleKey: "rulesToolsHeader",
      items: [
        {
          icon: Scale,
          titleKey: "compareAllTitle",
          descKey: "compareAllDesc",
          href: "/trading-objectives#compare-models",
        },
        {
          icon: Target,
          titleKey: "tradingObjectivesTitle",
          descKey: "tradingObjectivesDesc",
          href: "/trading-objectives#evaluation-selector",
        },
        {
          icon: HelpCircle,
          titleKey: "rulesFaqTitle",
          descKey: "rulesFaqDesc",
          href: "/trading-objectives#objectives-faq",
        },
      ],
    },
  ];

  // Company Menu Data (Matching 2-column icon grid format)
  const companyColumns: NavColumn[] = [
    {
      titleKey: "companyHeader",
      items: [
        {
          icon: ShieldCheck,
          titleKey: "aboutUs",
          descKey: "aboutUsDesc",
          href: "/about-us",
        },
        {
          icon: Trophy,
          titleKey: "payoutsProof",
          descKey: "payoutsProofDesc",
          href: "/payouts",
        },
        {
          icon: Handshake,
          titleKey: "affiliateProgram",
          descKey: "affiliateProgramDesc",
          href: "/affiliates",
        },
      ],
    },
    {
      titleKey: "connectHeader",
      items: [
        {
          icon: Headphones,
          titleKey: "support247",
          descKey: "support247Desc",
          href: "/contact",
        },
        {
          icon: BookOpen,
          titleKey: "blogTitle",
          descKey: "blogDesc",
          href: "/blog",
        },
        {
          icon: HelpCircle,
          titleKey: "helpCenter",
          descKey: "helpCenterDesc",
          href: "https://intercom.help/ck-capital/en/",
          external: true,
        },
      ],
    },
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

  const isProgramsActive =
    pathname.startsWith("/evaluation") ||
    pathname.startsWith("/instant") ||
    pathname.startsWith("/trading-objectives");

  const isCompanyActive =
    pathname.startsWith("/about-us") ||
    pathname.startsWith("/contact") ||
    pathname.startsWith("/blog");

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href.includes("#")) {
      const [targetPath, hash] = href.split("#");
      const isTargetPage =
        pathname === targetPath ||
        (targetPath === "/trading-objectives" &&
          pathname.includes("/trading-objectives")) ||
        (targetPath === "" && (pathname === "/" || pathname === ""));

      if (isTargetPage) {
        e.preventDefault();
        const el = document.getElementById(hash);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
          window.history.replaceState(
            null,
            "",
            `${window.location.pathname}#${hash}`
          );
        }
      }
    } else if (
      href === "/trading-objectives" &&
      pathname.includes("/trading-objectives")
    ) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    setOpen(false);
  };

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300",
          scrolled
            ? "pt-2.5 sm:pt-3 px-3 sm:px-4 lg:px-6 pointer-events-none"
            : "bg-[#070709] border-b border-white/[0.08]"
        )}
        data-od-id="top-nav"
      >
        <nav
          className={cn(
            "relative mx-auto max-w-7xl transition-all duration-300",
            scrolled
              ? "pointer-events-auto rounded-2xl sm:rounded-[22px] border border-white/[0.12] bg-[#070709]/95 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] px-4 sm:px-6 lg:px-8"
              : "px-4 sm:px-6 lg:px-8"
          )}
        >
          <div className="flex items-center justify-between flex-nowrap gap-1 lg:gap-1.5 xl:gap-3 h-16 w-full">
            <Link href="/" className="shrink-0 pr-1 lg:pr-2 whitespace-nowrap flex items-center gap-2" data-od-id="nav-logo">
              <div className="flex items-center text-[#FFC107]">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FFC107" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="11 18 5 12 11 6" />
                  <polyline points="19 18 13 12 19 6" />
                </svg>
              </div>
              <span className="text-[14.5px] lg:text-[15.5px] xl:text-[16px] font-black tracking-[0.08em] text-white">
                CK CAPITAL
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center h-full flex-nowrap gap-0.5 xl:gap-1 shrink min-w-0" data-od-id="nav-links">
              
              {/* 1. PROGRAMS MEGA MENU (Full-Width Maximized Spacing) */}
              <div className="group h-full flex items-center">
                <Link
                  href="/trading-objectives"
                  onClick={(e) => handleNavClick(e, "/trading-objectives")}
                  data-od-id="desktop-nav-tradingObjectives"
                  className={cn(
                    "whitespace-nowrap px-2 xl:px-3 py-1.5 rounded-lg text-[12px] xl:text-[13px] font-semibold transition-colors flex items-center gap-1",
                    isProgramsActive
                      ? "bg-primary/10 text-primary font-bold"
                      : "text-white/75 hover:text-[#FFC107] hover:bg-white/[0.04]"
                  )}
                >
                  <span>{t("tradingObjectives" as any)}</span>
                  <ChevronDown
                    size={14}
                    className="opacity-50 transition-transform duration-200 group-hover:rotate-180 group-hover:text-[#FFC107]"
                  />
                </Link>

                {/* Dropdown Popover Spanning Full Nav Width */}
                <div
                  data-od-id="desktop-dropdown-tradingObjectives"
                  className="absolute top-full left-0 right-0 w-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none group-hover:pointer-events-auto z-50 before:absolute before:-top-3 before:left-0 before:right-0 before:h-3 before:content-['']"
                >
                  {/* Pointer Caret aligned above trigger */}
                  <div className="absolute top-1 left-[300px] w-0 h-0 border-x-8 border-x-transparent border-b-8 border-b-white/[0.12] before:content-[''] before:absolute before:top-[1px] before:-left-[7px] before:w-0 before:h-0 before:border-x-[7px] before:border-x-transparent before:border-b-[7px] before:border-b-[#0D0C08]" />

                  <div className="w-full bg-[#0D0C08]/98 backdrop-blur-2xl border border-white/[0.12] rounded-3xl shadow-[0_30px_90px_rgba(0,0,0,0.9)] flex overflow-hidden">
                    {/* Left 2 Columns: Funding Models & Rules (Matching Company Format) */}
                    <div className="flex-1 pt-9 pb-7 px-7 xl:pt-10 xl:pb-8 xl:px-9 grid grid-cols-2 gap-6 xl:gap-8">
                      {programColumns.map((col, cIdx) => (
                        <div key={col.titleKey} className="flex flex-col">
                          <span className="block text-[11px] font-extrabold uppercase tracking-wider text-white/45 px-1 pt-1 pb-3 mb-2.5 border-b border-white/[0.08]">
                            {t(col.titleKey as any)}
                          </span>
                          <div className="flex flex-col gap-1.5">
                            {col.items.map((item) => {
                              const IconComponent = item.icon;

                              return (
                                <Link
                                  key={item.titleKey}
                                  href={item.href}
                                  onClick={(e) => handleNavClick(e, item.href)}
                                  data-od-id={`desktop-subitem-${item.titleKey === "oneStepTitle" ? "evaluation" : item.titleKey === "twoStepTitle" ? "evaluation-2step" : item.titleKey === "instantTitle" ? "instantFunding" : item.titleKey === "compareAllTitle" ? "compare" : "tradingObjectives"}`}
                                  className="group/citem flex items-center justify-between p-2.5 xl:p-3 rounded-xl hover:bg-white/[0.04] transition-colors"
                                >
                                  <div className="flex items-center gap-3.5 min-w-0">
                                    <div className="w-9 h-9 xl:w-10 xl:h-10 rounded-lg bg-primary/10 border border-primary/20 text-primary flex items-center justify-center shrink-0 group-hover/citem:bg-primary group-hover/citem:text-primary-foreground transition-all duration-200">
                                      <IconComponent size={17} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <div className="text-[13px] xl:text-[13.5px] font-bold text-foreground group-hover/citem:text-primary transition-colors flex items-center gap-1">
                                        <span>{t(item.titleKey as any)}</span>
                                      </div>
                                      <div className="text-[11px] xl:text-[11.5px] text-foreground/55 line-clamp-1 mt-0.5">
                                        {t(item.descKey as any)}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-1.5 pl-2 shrink-0">
                                    {item.priceKey && (
                                      <span className="text-[11px] xl:text-[11.5px] font-bold text-foreground/75 group-hover/citem:text-primary">
                                        {t(item.priceKey as any)}
                                      </span>
                                    )}
                                    <ArrowUpRight size={13} className="text-foreground/40 group-hover/citem:text-primary transition-colors" />
                                  </div>
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Right Column: Compact Promotional Image Banner Card */}
                    <div className="w-[320px] xl:w-[360px] bg-gradient-to-br from-primary/10 via-foreground/[0.02] to-transparent relative pt-9 pb-7 px-7 xl:pt-10 xl:pb-8 xl:px-8 flex flex-col justify-between border-l border-white/[0.08] group/featured">
                      <div>
                        {/* Thumbnail Artwork with Controlled Height */}
                        <div className="w-full h-[125px] xl:h-[135px] rounded-xl overflow-hidden mb-3.5 border border-white/10 relative group-hover/featured:border-primary/40 transition-colors shadow-lg">
                          <img
                            src="/images/placeholders/eval-banner-placeholder.svg"
                            alt={t("featuredEvalTitle" as any)}
                            className="w-full h-full object-cover group-hover/featured:scale-105 transition-transform duration-500"
                          />
                        </div>

                        {/* Text Details */}
                        <span className="inline-block px-2.5 py-0.5 rounded-full text-[9.5px] font-extrabold uppercase tracking-wider bg-primary/20 text-primary border border-primary/30 backdrop-blur-sm mb-1.5">
                          {t("featuredEvalBadge" as any)}
                        </span>
                        <div className="font-bold text-white text-[14.5px] leading-tight mt-0.5">
                          {t("featuredEvalTitle" as any)}
                        </div>
                        <p className="text-[11.5px] text-white/65 mt-1.5 leading-relaxed line-clamp-2">
                          {t("featuredEvalDesc" as any)}
                        </p>
                      </div>

                      <Link
                        href="/trading-objectives"
                        className="inline-flex items-center gap-1.5 text-[12px] font-bold text-primary group-hover/featured:underline mt-4 pt-3 border-t border-white/[0.08]"
                      >
                        <span>{t("viewAllPrograms" as any)}</span>
                        <ArrowRight size={13} className="group-hover/featured:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. PAYOUTS DIRECT LINK */}
              <Link
                href="/payouts"
                data-od-id="desktop-nav-payouts"
                className={cn(
                  "whitespace-nowrap px-2 xl:px-3 py-1.5 rounded-lg text-[12px] xl:text-[13px] font-semibold transition-colors",
                  pathname === "/payouts"
                    ? "bg-primary/10 text-primary font-bold"
                    : "text-white/75 hover:text-[#FFC107] hover:bg-white/[0.04]"
                )}
              >
                {t("payouts" as any)}
              </Link>

              {/* 3. COMPANY MEGA MENU (Full-Width Maximized Spacing) */}
              <div className="group h-full flex items-center">
                <button
                  type="button"
                  data-od-id="desktop-nav-company"
                  className={cn(
                    "whitespace-nowrap px-2 xl:px-3 py-1.5 rounded-lg text-[12px] xl:text-[13px] font-semibold transition-colors flex items-center gap-1",
                    isCompanyActive
                      ? "bg-primary/10 text-primary font-bold"
                      : "text-white/75 hover:text-[#FFC107] hover:bg-white/[0.04] group-hover:text-[#FFC107]"
                  )}
                >
                  <span>{t("company" as any)}</span>
                  <ChevronDown
                    size={14}
                    className="opacity-50 transition-transform duration-200 group-hover:rotate-180 group-hover:text-[#FFC107]"
                  />
                </button>

                {/* Dropdown Popover Spanning Full Nav Width */}
                <div
                  data-od-id="desktop-dropdown-company"
                  className="absolute top-full left-0 right-0 w-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none group-hover:pointer-events-auto z-50 before:absolute before:-top-3 before:left-0 before:right-0 before:h-3 before:content-['']"
                >
                  {/* Pointer Caret aligned above trigger */}
                  <div className="absolute top-1 left-[495px] w-0 h-0 border-x-8 border-x-transparent border-b-8 border-b-white/[0.12] before:content-[''] before:absolute before:top-[1px] before:-left-[7px] before:w-0 before:h-0 before:border-x-[7px] before:border-x-transparent before:border-b-[7px] before:border-b-[#0D0C08]" />

                  <div className="w-full bg-[#0D0C08]/98 backdrop-blur-2xl border border-white/[0.12] rounded-3xl shadow-[0_30px_90px_rgba(0,0,0,0.9)] flex overflow-hidden">
                    {/* Left 2 Columns: Company & Connect (Spacious Grid) */}
                    <div className="flex-1 pt-9 pb-7 px-7 xl:pt-10 xl:pb-8 xl:px-9 grid grid-cols-2 gap-6 xl:gap-8">
                      {companyColumns.map((col, cIdx) => (
                        <div key={col.titleKey} className="flex flex-col">
                          <span className="block text-[11px] font-extrabold uppercase tracking-wider text-white/45 px-1 pt-1 pb-3 mb-2.5 border-b border-white/[0.08]">
                            {t(col.titleKey as any)}
                          </span>
                          <div className="flex flex-col gap-1.5">
                            {col.items.map((item) => {
                              const IconComponent = item.icon;
                              const isExt = item.external || item.href.startsWith("http");

                              const content = (
                                <>
                                  <div className="w-9 h-9 xl:w-10 xl:h-10 rounded-lg bg-primary/10 border border-primary/20 text-primary flex items-center justify-center shrink-0 group-hover/citem:bg-primary group-hover/citem:text-primary-foreground transition-all duration-200">
                                    <IconComponent size={17} />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="text-[13px] xl:text-[13.5px] font-bold text-foreground group-hover/citem:text-primary transition-colors flex items-center gap-1">
                                      <span>{t(item.titleKey as any)}</span>
                                      {isExt && <ArrowUpRight size={13} className="opacity-50" />}
                                    </div>
                                    <div className="text-[11px] xl:text-[11.5px] text-foreground/55 line-clamp-1 mt-0.5">
                                      {t(item.descKey as any)}
                                    </div>
                                  </div>
                                </>
                              );

                              if (isExt) {
                                return (
                                  <a
                                    key={item.titleKey}
                                    href={item.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    data-od-id={`desktop-subitem-${item.titleKey}`}
                                    className="group/citem flex items-center gap-3 p-2.5 xl:p-3 rounded-xl hover:bg-white/[0.04] transition-colors"
                                  >
                                    {content}
                                  </a>
                                );
                              }

                              return (
                                <Link
                                  key={item.titleKey}
                                  href={item.href}
                                  data-od-id={`desktop-subitem-${item.titleKey === "aboutUs" ? "aboutUs" : item.titleKey === "payoutsProof" ? "payouts" : item.titleKey === "affiliateProgram" ? "affiliates" : item.titleKey === "support247" ? "contact" : "blog"}`}
                                  className="group/citem flex items-center gap-3 p-2.5 xl:p-3 rounded-xl hover:bg-white/[0.04] transition-colors"
                                >
                                  {content}
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Right Featured Card: Community & Support (Compact Card) */}
                    <div className="w-[320px] xl:w-[360px] bg-gradient-to-br from-primary/10 via-foreground/[0.02] to-transparent relative pt-9 pb-7 px-7 xl:pt-10 xl:pb-8 xl:px-8 flex flex-col justify-between border-l border-white/[0.08] group/comm">
                      <div>
                        {/* Thumbnail Artwork with Controlled Height */}
                        <div className="w-full h-[125px] xl:h-[135px] rounded-xl overflow-hidden mb-3.5 border border-white/10 relative group-hover/comm:border-primary/40 transition-colors shadow-lg">
                          <img
                            src="/images/placeholders/community-banner-placeholder.svg"
                            alt={t("featuredCommunityTitle" as any)}
                            className="w-full h-full object-cover group-hover/comm:scale-105 transition-transform duration-500"
                          />
                        </div>

                        {/* Text Details */}
                        <span className="inline-block px-2.5 py-0.5 rounded-full text-[9.5px] font-extrabold uppercase tracking-wider bg-primary/20 text-primary border border-primary/30 backdrop-blur-sm mb-1.5">
                          {t("featuredCommunityBadge" as any)}
                        </span>
                        <div className="font-bold text-white text-[14.5px] leading-tight mt-0.5">
                          {t("featuredCommunityTitle" as any)}
                        </div>
                        <p className="text-[11.5px] text-white/65 mt-1.5 leading-relaxed line-clamp-2">
                          {t("featuredCommunityDesc" as any)}
                        </p>
                      </div>

                      <a
                        href="https://discord.gg/ckcapital"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-[12px] font-bold text-primary group-hover/comm:underline mt-4 pt-3 border-t border-white/[0.08]"
                      >
                        <span>{t("joinDiscord" as any)}</span>
                        <ArrowRight size={13} className="group-hover/comm:translate-x-1 transition-transform" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* 4. AFFILIATES DIRECT LINK */}
              <Link
                href="/affiliates"
                data-od-id="desktop-nav-affiliates"
                className={cn(
                  "whitespace-nowrap px-2 xl:px-3 py-1.5 rounded-lg text-[12px] xl:text-[13px] font-semibold transition-colors",
                  pathname === "/affiliates"
                    ? "bg-primary/10 text-primary font-bold"
                    : "text-white/75 hover:text-[#FFC107] hover:bg-white/[0.04]"
                )}
              >
                {t("affiliates" as any)}
              </Link>

              {/* 5. FAQ DIRECT LINK */}
              <a
                href="https://intercom.help/ck-capital/en/"
                target="_blank"
                rel="noopener noreferrer"
                data-od-id="desktop-nav-faq"
                className="whitespace-nowrap px-2 xl:px-3 py-1.5 rounded-lg text-[12px] xl:text-[13px] font-semibold transition-colors text-white/75 hover:text-[#FFC107] hover:bg-white/[0.04]"
              >
                {t("faq" as any)}
              </a>
            </div>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center flex-nowrap gap-1.5 xl:gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className="flex items-center justify-center gap-1.5 h-[34px] w-8 xl:w-auto px-0 xl:px-2.5 rounded-lg border border-white/15 bg-white/[0.03] text-white/60 hover:text-white hover:border-[#FFC107]/40 hover:bg-white/[0.06] transition-all text-xs shrink-0"
                aria-label={tSearch("searchAria")}
                data-od-id="nav-search-trigger"
              >
                <Search size={14} className="text-[#FFC107] opacity-90 shrink-0" />
                <span className="hidden xl:inline text-[11.5px]">{tSearch("buttonLabel")}</span>
                <kbd className="hidden 2xl:inline-flex items-center rounded border border-white/20 bg-white/[0.08] px-1.5 py-0.5 font-mono text-[9px] text-white/50">
                  ⌘K
                </kbd>
              </button>
              <LanguageSwitcher compact />
              <a
                href="https://app.ckcapital.co.uk/signin"
                target="_blank"
                rel="noopener noreferrer"
                className="whitespace-nowrap inline-flex items-center h-[34px] px-2.5 xl:px-3.5 rounded-lg border border-white/20 text-[11.5px] xl:text-[12.5px] font-bold text-white hover:border-[#FFC107] hover:text-[#FFC107] hover:bg-[#FFC107]/10 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 shrink-0"
              >
                {t("signIn" as any)}
              </a>
              <Link
                href="/#evaluation-programs"
                data-od-id="nav-cta"
                className="whitespace-nowrap inline-flex items-center h-[34px] px-3 xl:px-4 rounded-lg bg-[#FFC107] text-[11.5px] xl:text-[12.5px] font-black text-black hover:bg-[#E6AE06] hover:shadow-[0_0_20px_rgba(255,193,7,0.28)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-200 shrink-0 shadow-sm"
              >
                {t("startChallenge" as any)}
              </Link>
            </div>

            {/* Mobile Header Actions */}
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
                {t("startChallenge" as any)}
              </Link>
              <LanguageSwitcher compact />
              <button
                className="inline-flex h-[34px] w-[34px] items-center justify-center text-foreground/80 hover:text-foreground rounded-lg border border-foreground/10 shrink-0"
                onClick={() => setOpen(!open)}
                aria-label={t("menu" as any)}
                aria-expanded={open}
              >
                {open ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>

          {/* Mobile Drawer (Accordion) */}
          {open && (
            <div className="lg:hidden border-t border-border pb-4 px-4" data-od-id="mobile-drawer">
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

                {/* Programs Accordion */}
                <div className="flex flex-col gap-1">
                  <button
                    type="button"
                    data-od-id="mobile-accordion-tradingObjectives"
                    onClick={() => setMobileExpanded(mobileExpanded === "programs" ? null : "programs")}
                    className={cn(
                      "flex items-center justify-between min-h-11 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors w-full",
                      isProgramsActive
                        ? "bg-primary/10 text-primary font-semibold"
                        : "text-foreground/80 hover:text-foreground hover:bg-foreground/[0.05]"
                    )}
                  >
                    <span>{t("tradingObjectives" as any)}</span>
                    <ChevronDown
                      size={16}
                      className={cn("opacity-60 transition-transform", mobileExpanded === "programs" ? "rotate-180" : "")}
                    />
                  </button>
                  {mobileExpanded === "programs" && (
                    <div className="flex flex-col pl-3 border-l-2 border-primary/20 ml-3 gap-1 py-1" data-od-id="mobile-dropdown-tradingObjectives">
                      {programColumns.flatMap((col) => col.items).map((item) => {
                        const IconComponent = item.icon;
                        const itemKey =
                          item.titleKey === "oneStepTitle"
                            ? "evaluation"
                            : item.titleKey === "twoStepTitle"
                            ? "evaluation-2step"
                            : item.titleKey === "instantTitle"
                            ? "instantFunding"
                            : item.titleKey === "compareAllTitle"
                            ? "compare"
                            : item.titleKey === "tradingObjectivesTitle"
                            ? "tradingObjectives"
                            : "rulesFaq";

                        return (
                          <Link
                            key={item.titleKey}
                            href={item.href}
                            data-od-id={`mobile-subitem-${itemKey}`}
                            onClick={(e) => handleNavClick(e, item.href)}
                            className={cn(
                              "flex items-center justify-between py-2 px-3 text-sm rounded-lg transition-colors",
                              pathname === item.href
                                ? "text-primary font-semibold bg-primary/5"
                                : "text-foreground/75 hover:text-foreground hover:bg-white/5"
                            )}
                          >
                            <div className="flex items-center gap-2.5">
                              <div className="w-6 h-6 rounded-md bg-primary/10 text-primary flex items-center justify-center shrink-0">
                                <IconComponent size={13} />
                              </div>
                              <span>{t(item.titleKey as any)}</span>
                            </div>
                            {item.priceKey ? (
                              <span className="text-xs font-semibold text-foreground/50">{t(item.priceKey as any)}</span>
                            ) : (
                              <ArrowRight size={13} className="opacity-40" />
                            )}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Direct Link: Payouts */}
                <Link
                  href="/payouts"
                  data-od-id="mobile-nav-payouts"
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center justify-between min-h-11 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors",
                    pathname === "/payouts"
                      ? "bg-primary/10 text-primary font-semibold"
                      : "text-foreground/80 hover:text-foreground hover:bg-foreground/[0.05]"
                  )}
                >
                  <span>{t("payouts" as any)}</span>
                  <ArrowRight size={14} className="opacity-40" />
                </Link>

                {/* Company Accordion */}
                <div className="flex flex-col gap-1">
                  <button
                    type="button"
                    data-od-id="mobile-accordion-company"
                    onClick={() => setMobileExpanded(mobileExpanded === "company" ? null : "company")}
                    className={cn(
                      "flex items-center justify-between min-h-11 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors w-full",
                      isCompanyActive
                        ? "bg-primary/10 text-primary font-semibold"
                        : "text-foreground/80 hover:text-foreground hover:bg-foreground/[0.05]"
                    )}
                  >
                    <span>{t("company" as any)}</span>
                    <ChevronDown
                      size={16}
                      className={cn("opacity-60 transition-transform", mobileExpanded === "company" ? "rotate-180" : "")}
                    />
                  </button>
                  {mobileExpanded === "company" && (
                    <div className="flex flex-col pl-3 border-l-2 border-primary/20 ml-3 gap-1 py-1" data-od-id="mobile-dropdown-company">
                      {companyColumns.flatMap((col) => col.items).map((item) => {
                        const isExt = item.external || item.href.startsWith("http");
                        const itemKey = item.titleKey === "aboutUs" ? "aboutUs" : item.titleKey === "payoutsProof" ? "payouts" : item.titleKey === "affiliateProgram" ? "affiliates" : item.titleKey === "support247" ? "contact" : item.titleKey === "blogTitle" ? "blog" : "faq";

                        if (isExt) {
                          return (
                            <a
                              key={item.titleKey}
                              href={item.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              data-od-id={`mobile-subitem-${itemKey}`}
                              onClick={() => setOpen(false)}
                              className="flex items-center justify-between py-2 px-3 text-sm text-foreground/75 hover:text-foreground hover:bg-white/5 rounded-lg"
                            >
                              <span>{t(item.titleKey as any)}</span>
                              <ArrowUpRight size={13} className="opacity-40" />
                            </a>
                          );
                        }

                        return (
                          <Link
                            key={item.titleKey}
                            href={item.href}
                            data-od-id={`mobile-subitem-${itemKey}`}
                            onClick={() => setOpen(false)}
                            className={cn(
                              "flex items-center justify-between py-2 px-3 text-sm rounded-lg transition-colors",
                              pathname === item.href
                                ? "text-primary font-semibold bg-primary/5"
                                : "text-foreground/75 hover:text-foreground hover:bg-white/5"
                            )}
                          >
                            <span>{t(item.titleKey as any)}</span>
                            <ArrowRight size={13} className="opacity-40" />
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Direct Link: Affiliates */}
                <Link
                  href="/affiliates"
                  data-od-id="mobile-nav-affiliates"
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center justify-between min-h-11 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors",
                    pathname === "/affiliates"
                      ? "bg-primary/10 text-primary font-semibold"
                      : "text-foreground/80 hover:text-foreground hover:bg-foreground/[0.05]"
                  )}
                >
                  <span>{t("affiliates" as any)}</span>
                  <ArrowRight size={14} className="opacity-40" />
                </Link>

                {/* Direct Link: FAQ */}
                <a
                  href="https://intercom.help/ck-capital/en/"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-od-id="mobile-nav-faq"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between min-h-11 px-3 py-2.5 text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-foreground/[0.05] rounded-lg transition-colors"
                >
                  <span>{t("faq" as any)}</span>
                  <ArrowUpRight size={14} className="opacity-40" />
                </a>

                {/* Action Buttons in Mobile Drawer */}
                <div className="pt-3 flex flex-col gap-2">
                  <a
                    href="https://app.ckcapital.co.uk/signin"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 rounded-lg border border-primary text-sm font-semibold text-primary text-center hover:bg-primary/10 transition-colors"
                  >
                    {t("signIn" as any)}
                  </a>
                  <Link
                    href="/#start-challenge"
                    onClick={() => setOpen(false)}
                    className="px-4 py-2.5 rounded-lg bg-primary text-sm font-bold text-primary-foreground text-center hover:brightness-110 transition-all shadow-md shadow-primary/20"
                  >
                    {t("startChallenge" as any)}
                  </Link>
                </div>
              </div>
            </div>
          )}
        </nav>
      </header>
      <GlobalSearchDialog isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
