"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "@/lib/content";
import { cn } from "@/lib/utils";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "@/components/shared/ThemeProvider";

function ThemeToggle({ compact = false }: { compact?: boolean }) {
  const { theme, toggle } = useTheme();
  const isLight = theme === "light";
  return (
    <button
      type="button"
      role="switch"
      aria-checked={isLight}
      aria-label={`Switch to ${isLight ? "dark" : "light"} mode`}
      onClick={toggle}
      className={cn(
        "relative inline-flex items-center rounded-full cursor-pointer",
        "transition-colors p-2 hover:bg-foreground/[0.08]",
        compact && "shrink-0"
      )}
    >
      {/* Visual switch — 44px+ hit area via the p-2 padding on the button */}
      <span
        aria-hidden="true"
        className={cn(
          "relative block h-7 w-[54px] rounded-full border border-border transition-colors",
          "bg-foreground/[0.08]"
        )}
      >
        {/* Sliding thumb — carries the active-mode icon */}
        <span
          className={cn(
            "absolute top-1/2 -translate-y-1/2 h-5 w-5 rounded-full flex items-center justify-center transition-all duration-300 ease-out shadow-[0_2px_8px_rgba(0,0,0,0.35)]",
            isLight
              ? "left-[calc(100%-22px)] bg-primary"
              : "left-[2px] bg-[#2a2418]"
          )}
        >
          {isLight ? (
            <Sun size={12} strokeWidth={2.5} className="text-[#1a1000]" />
          ) : (
            <Moon size={12} strokeWidth={2} className="text-foreground/90" />
          )}
        </span>
      </span>
    </button>
  );
}

export function TopNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Track whether the nav should get its opaque glass background.
    // Evaluate immediately on mount (a page can load already scrolled via an
    // anchor/hash or browser scroll restoration) — otherwise the nav stays
    // transparent until the user scrolls manually.
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

  // Re-check after client-side route changes: Next scrolls to the target
  // anchor shortly after the route commits, which can miss the scroll listener
  // if it happens during/just after hydration.
  useEffect(() => {
    const t = setTimeout(() => setScrolled(window.scrollY > 20), 120);
    return () => clearTimeout(t);
  }, [pathname]);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => window.innerWidth >= 1024 && setOpen(false);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <div
      className="sticky top-3 z-50 w-full px-3 sm:px-4 lg:px-6 mt-4 md:mt-5"
      data-od-id="top-nav"
    >
      <nav
        className={cn(
          "mx-auto max-w-7xl transition-all duration-300",
          open ? "rounded-3xl" : "rounded-full",
          scrolled
            ? "bg-[var(--nav-bg-scrolled)]/95 shadow-[0_10px_40px_rgba(0,0,0,0.35)] backdrop-blur-md border border-white/[0.06]"
            : "bg-transparent"
        )}
      >
        <div className="flex items-center justify-between gap-3 pl-4 pr-3 sm:pl-5 sm:pr-4 lg:pl-6 lg:pr-5 h-14">
          {/* Logo */}
          <a href="/" className="shrink-0 pr-2" data-od-id="nav-logo">
            <span className="text-[15px] font-extrabold tracking-[0.08em] text-foreground">
              CK CAPITAL
            </span>
          </a>

          {/* Desktop nav links — show at lg+ so md doesn't cram */}
          <div className="hidden lg:flex items-center gap-0" data-od-id="nav-links">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-3.5 py-2 text-[13.5px] font-medium text-foreground/75 hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop right-side controls */}
          <div className="hidden lg:flex items-center gap-2">
            <ThemeToggle />
            <a
              href="https://app.ckcapital.co.uk/signin"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-lg border border-primary/70 text-[13px] font-semibold text-primary hover:bg-primary/10 transition-all"
            >
              Sign In
            </a>
            <a
              href="/#start-challenge"
              data-od-id="nav-cta"
              className="px-3.5 py-1.5 rounded-lg bg-primary text-[13px] font-bold text-primary-foreground hover:brightness-110 transition-all"
            >
              Start Challenge
            </a>
          </div>

          {/* Mobile / tablet compact controls */}
          <div className="lg:hidden flex items-center gap-1.5">
            <a
              href="/#start-challenge"
              className="hidden sm:inline-flex items-center min-h-11 px-3.5 rounded-lg bg-primary text-[12px] font-bold text-primary-foreground hover:brightness-110 transition-all"
            >
              Start Challenge
            </a>
            <button
              className="inline-flex h-11 w-11 items-center justify-center text-foreground/80 hover:text-foreground rounded-lg"
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile / tablet menu */}
        {open && (
          <div className="lg:hidden border-t border-border pb-4 px-4">
            <div className="flex flex-col gap-1 pt-3">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center min-h-11 px-3 py-2.5 text-sm font-medium text-foreground/80 hover:text-foreground rounded-lg hover:bg-foreground/[0.05] transition-colors"
                >
                  {link.label}
                </a>
              ))}
                <div className="pt-3 flex flex-col gap-2">
                  <a
                    href="https://app.ckcapital.co.uk/signin"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 rounded-lg border border-primary text-sm font-semibold text-primary text-center"
                  >
                    Sign In
                  </a>
                  <a
                    href="/#start-challenge"
                    onClick={() => setOpen(false)}
                    className="px-4 py-2.5 rounded-lg bg-primary text-sm font-bold text-primary-foreground text-center"
                  >
                    Start Challenge
                  </a>
                  <div className="flex items-center justify-end pt-2">
                    <ThemeToggle compact />
                  </div>
                </div>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}
