"use client";

import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * "On this page" contents for a long legal document.
 *
 * Sticky beside the text on large screens, a collapsible list above it on
 * small ones. The entry for the section being read is highlighted.
 */

export interface TocEntry {
  id: string;
  label: string;
}

export function LegalToc({ entries, heading }: { entries: TocEntry[]; heading: string }) {
  const [active, setActive] = useState(entries[0]?.id ?? "");

  useEffect(() => {
    const sections = entries
      .map((e) => document.getElementById(e.id))
      .filter((el): el is HTMLElement => el !== null);
    // The section being read is the last one whose heading has scrolled under the header.
    const READ_LINE = 140;
    // Twenty-odd rect reads per scroll event is cheap enough to do directly.
    const update = () => {
      let current = sections[0]?.id ?? "";
      for (const s of sections) {
        if (s.getBoundingClientRect().top <= READ_LINE) current = s.id;
        else break;
      }
      // At the very bottom, the last sections can never reach the line: settle on the final one.
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
        current = sections.at(-1)?.id ?? current;
      }
      setActive(current);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [entries]);

  const list = (
    <ol className="space-y-0.5">
      {entries.map((e) => (
        <li key={e.id}>
          <a
            href={`#${e.id}`}
            aria-current={active === e.id ? "location" : undefined}
            className={cn(
              "block rounded-lg border-l-2 py-1.5 pr-2 pl-3 text-[13px] leading-snug transition-colors",
              "focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[var(--ring)]",
              active === e.id
                ? "border-[#894CEF] bg-primary/10 font-semibold text-foreground"
                : "border-transparent text-foreground/55 hover:text-foreground"
            )}
          >
            {e.label}
          </a>
        </li>
      ))}
    </ol>
  );

  return (
    <>
      <details className="group rounded-xl border border-foreground/10 bg-foreground/[0.03] lg:hidden" data-od-id="legal-toc-mobile">
        <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between px-4 text-xs font-bold tracking-[0.14em] text-foreground/70 uppercase [&::-webkit-details-marker]:hidden">
          {heading}
          <ChevronDown size={16} aria-hidden className="transition-transform group-open:rotate-180" />
        </summary>
        <nav aria-label={heading} className="max-h-[60vh] overflow-y-auto px-2 pb-3">
          {list}
        </nav>
      </details>

      <nav
        aria-label={heading}
        className="sticky top-28 hidden max-h-[calc(100dvh-8rem)] overflow-y-auto pr-2 lg:block"
        data-od-id="legal-toc"
      >
        <p className="mb-3 pl-3 text-[11px] font-bold tracking-[0.16em] text-foreground/50 uppercase">{heading}</p>
        {list}
      </nav>
    </>
  );
}
