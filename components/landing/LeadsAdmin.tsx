"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ChevronDown, Download, Mail, RefreshCw, Search, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { CHALLENGE_SIZES, TIMELINES } from "@/lib/leads/offer";
import type { StoredLead } from "@/lib/leads/server";

/** Leads dashboard: totals, filters, a table (cards on phones) and CSV export. */

type Lead = StoredLead & { countryName: string };

const PERIODS = [
  { id: "all", label: "All time", days: Infinity },
  { id: "1", label: "Today", days: 1 },
  { id: "7", label: "Last 7 days", days: 7 },
  { id: "30", label: "Last 30 days", days: 30 },
] as const;

const DAY = 86_400_000;

function startOfToday() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d.getTime();
}

function since(days: number) {
  return days === Infinity ? 0 : startOfToday() - (days - 1) * DAY;
}

const fmt = new Intl.DateTimeFormat(undefined, { dateStyle: "medium", timeStyle: "short" });

const CSV_COLUMNS: [keyof Lead, string][] = [
  ["submittedAt", "Submitted (UTC)"],
  ["fullName", "Full name"],
  ["email", "Email"],
  ["countryName", "Country"],
  ["country", "Country code"],
  ["challengeSize", "Challenge size"],
  ["timeline", "Timeline"],
  ["marketingConsent", "Marketing consent"],
  ["couponCode", "Coupon"],
  ["source", "Source"],
  ["utmSource", "UTM source"],
  ["utmMedium", "UTM medium"],
  ["utmCampaign", "UTM campaign"],
  ["utmContent", "UTM content"],
  ["utmTerm", "UTM term"],
  ["eventId", "Event ID"],
  ["landingUrl", "Landing URL"],
];

function toCsv(rows: Lead[]) {
  const cell = (v: unknown) => {
    let s = v === null || v === undefined ? "" : typeof v === "boolean" ? (v ? "Yes" : "No") : String(v);
    // Stop spreadsheet apps treating a value as a formula.
    if (/^[=+\-@\t\r]/.test(s)) s = `'${s}`;
    return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  return [CSV_COLUMNS.map(([, h]) => h).join(","), ...rows.map((r) => CSV_COLUMNS.map(([k]) => cell(r[k])).join(","))].join("\r\n");
}

export function LeadsAdmin({ leads, error }: { leads: Lead[]; error: string | null }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [period, setPeriod] = useState<(typeof PERIODS)[number]["id"]>("all");
  const [size, setSize] = useState("");
  const [timeline, setTimeline] = useState("");
  const [country, setCountry] = useState("");
  const [marketingOnly, setMarketingOnly] = useState(false);
  const [open, setOpen] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const countries = useMemo(
    () => [...new Map(leads.map((l) => [l.country, l.countryName])).entries()].sort((a, b) => a[1].localeCompare(b[1])),
    [leads]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const from = since(PERIODS.find((p) => p.id === period)!.days);
    return leads.filter(
      (l) =>
        Date.parse(l.submittedAt) >= from &&
        (!size || l.challengeSize === size) &&
        (!timeline || l.timeline === timeline) &&
        (!country || l.country === country) &&
        (!marketingOnly || l.marketingConsent) &&
        (!q || l.fullName.toLowerCase().includes(q) || l.email.includes(q) || (l.utmCampaign ?? "").toLowerCase().includes(q))
    );
  }, [leads, query, period, size, timeline, country, marketingOnly]);

  const stats = useMemo(() => {
    const today = startOfToday();
    const week = since(7);
    return {
      total: leads.length,
      today: leads.filter((l) => Date.parse(l.submittedAt) >= today).length,
      week: leads.filter((l) => Date.parse(l.submittedAt) >= week).length,
      hot: leads.filter((l) => l.timeline === "Today" || l.timeline === "This Week").length,
      optIn: leads.length ? Math.round((leads.filter((l) => l.marketingConsent).length / leads.length) * 100) : 0,
    };
  }, [leads]);

  const exportCsv = () => {
    // Leading BOM so Excel reads names with accents correctly.
    const blob = new Blob(["﻿" + toCsv(filtered)], { type: "text/csv;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `ck-80-leads-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const refresh = () => {
    setRefreshing(true);
    router.refresh();
    window.setTimeout(() => setRefreshing(false), 1200);
  };

  const filtersOn = query || period !== "all" || size || timeline || country || marketingOnly;

  return (
    <div className="min-h-dvh bg-[#050816] text-white" data-od-id="leads-admin">
      <header className="sticky top-0 z-20 border-b border-white/[0.08] bg-[#050816]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3.5 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <Image src="/images/brand/ckpropfirm-logo.svg" alt="CK PropFirm" width={120} height={26} className="h-6 w-auto" />
            <span className="hidden h-5 w-px bg-white/15 sm:block" />
            <h1 className="truncate text-sm font-bold text-white/85 sm:text-base">80% OFF leads</h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={refresh}
              aria-label="Refresh"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/12 text-white/75 transition-colors hover:border-white/30 hover:text-white"
            >
              <RefreshCw size={16} aria-hidden className={cn(refreshing && "animate-spin")} />
            </button>
            <button
              type="button"
              onClick={exportCsv}
              disabled={!filtered.length}
              className="inline-flex h-10 items-center gap-2 rounded-xl bg-[#703AD7] px-3.5 text-sm font-bold transition-colors hover:bg-[#894CEF] disabled:opacity-40"
            >
              <Download size={16} aria-hidden /> <span className="hidden sm:inline">Export</span> CSV
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
        {error && <p role="alert" className="mb-6 rounded-xl border border-red-400/30 bg-red-500/10 p-4 text-sm text-red-100">{error}</p>}

        <dl className="grid grid-cols-2 gap-3 lg:grid-cols-5">
          <Stat label="Total leads" value={stats.total} accent />
          <Stat label="Today" value={stats.today} />
          <Stat label="Last 7 days" value={stats.week} />
          <Stat label="Starting this week" value={stats.hot} hint="Today or This Week" />
          <Stat label="Email opt-in" value={`${stats.optIn}%`} className="col-span-2 lg:col-span-1" />
        </dl>

        {/* Filters */}
        <section aria-label="Filters" className="mt-6 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-3 sm:p-4">
          <div className="relative">
            <Search size={16} aria-hidden className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-white/40" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search name, email or campaign"
              aria-label="Search leads"
              className="h-11 w-full rounded-xl border border-white/12 bg-white/[0.04] pr-3 pl-10 text-sm text-white placeholder:text-white/40 focus-visible:border-[#A98BFF] focus-visible:outline-none"
            />
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
            <Select label="Period" value={period} onChange={(v) => setPeriod(v as typeof period)} options={PERIODS.map((p) => [p.id, p.label])} />
            <Select label="Challenge size" value={size} onChange={setSize} options={[["", "All sizes"], ...CHALLENGE_SIZES.map((s) => [s, s] as [string, string])]} />
            <Select label="Timeline" value={timeline} onChange={setTimeline} options={[["", "Any timeline"], ...TIMELINES.map((t) => [t, t] as [string, string])]} />
            <Select label="Country" value={country} onChange={setCountry} options={[["", "All countries"], ...countries]} />
          </div>
          <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-sm">
            <label className="inline-flex cursor-pointer items-center gap-2 text-white/75">
              <input type="checkbox" checked={marketingOnly} onChange={(e) => setMarketingOnly(e.target.checked)} className="h-4 w-4 accent-[#894CEF]" />
              Email opt-in only
            </label>
            <p className="text-white/55" aria-live="polite">
              {filtered.length} of {leads.length} leads
              {filtersOn && (
                <button
                  type="button"
                  onClick={() => {
                    setQuery("");
                    setPeriod("all");
                    setSize("");
                    setTimeline("");
                    setCountry("");
                    setMarketingOnly(false);
                  }}
                  className="ml-3 font-semibold text-[#A98BFF] hover:underline"
                >
                  Clear filters
                </button>
              )}
            </p>
          </div>
        </section>

        {filtered.length === 0 ? (
          <div className="mt-6 flex flex-col items-center rounded-2xl border border-dashed border-white/12 px-6 py-16 text-center">
            <Users size={28} aria-hidden className="text-white/30" />
            <p className="mt-3 font-semibold text-white/80">{leads.length ? "No leads match these filters." : "No leads yet."}</p>
            {!leads.length && <p className="mt-1 text-sm text-white/50">They appear here as soon as someone unlocks the code.</p>}
          </div>
        ) : (
          <>
            {/* Desktop table */}
            <div className="mt-6 hidden overflow-hidden rounded-2xl border border-white/[0.08] lg:block">
              <table className="w-full text-left text-sm">
                <thead className="bg-white/[0.04] text-xs tracking-wide text-white/55 uppercase">
                  <tr>
                    <th scope="col" className="px-4 py-3 font-semibold">Submitted</th>
                    <th scope="col" className="px-4 py-3 font-semibold">Name</th>
                    <th scope="col" className="px-4 py-3 font-semibold">Email</th>
                    <th scope="col" className="px-4 py-3 font-semibold">Country</th>
                    <th scope="col" className="px-4 py-3 font-semibold">Size</th>
                    <th scope="col" className="px-4 py-3 font-semibold">Timeline</th>
                    <th scope="col" className="px-4 py-3 font-semibold">Campaign</th>
                    <th scope="col" className="px-4 py-3 font-semibold">Opt-in</th>
                    <th scope="col" className="w-10 px-2 py-3"><span className="sr-only">Details</span></th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((l) => (
                    <LeadRow key={l.id} lead={l} open={open === l.id} onToggle={() => setOpen(open === l.id ? null : l.id)} />
                  ))}
                </tbody>
              </table>
            </div>

            {/* Phone cards */}
            <ul className="mt-6 space-y-3 lg:hidden">
              {filtered.map((l) => (
                <li key={l.id} className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate font-bold text-white">{l.fullName}</p>
                      <a href={`mailto:${l.email}`} className="block truncate text-sm text-[#C9B5FF]">{l.email}</a>
                    </div>
                    <TimelineBadge timeline={l.timeline} />
                  </div>
                  <dl className="mt-3 grid grid-cols-2 gap-x-3 gap-y-2 text-sm">
                    <Detail label="Size" value={l.challengeSize} />
                    <Detail label="Country" value={l.countryName} />
                    <Detail label="Campaign" value={l.utmCampaign ?? "—"} />
                    <Detail label="Opt-in" value={l.marketingConsent ? "Yes" : "No"} />
                  </dl>
                  <p className="mt-3 text-xs text-white/45">{fmt.format(new Date(l.submittedAt))}</p>
                </li>
              ))}
            </ul>
          </>
        )}

        <p className="mt-8 text-center text-xs text-white/35">Private — visible only with the admin password. Do not share exports.</p>
      </main>
    </div>
  );
}

function Stat({ label, value, hint, accent, className }: { label: string; value: number | string; hint?: string; accent?: boolean; className?: string }) {
  return (
    <div className={cn("rounded-2xl border p-4", accent ? "border-[#A98BFF]/40 bg-[#703AD7]/15" : "border-white/[0.08] bg-white/[0.02]", className)}>
      <dt className="text-xs font-semibold text-white/55" title={hint}>{label}</dt>
      <dd className="mt-1 font-[family-name:var(--font-jakarta)] text-2xl font-extrabold tabular-nums sm:text-3xl">{value}</dd>
    </div>
  );
}

function Select({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: (readonly [string, string])[] }) {
  return (
    <label className="block">
      <span className="sr-only">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-11 w-full rounded-xl border border-white/12 bg-white/[0.04] px-3 text-sm text-white focus-visible:border-[#A98BFF] focus-visible:outline-none"
      >
        {options.map(([v, l]) => (
          <option key={v} value={v} className="bg-[#0A0E22]">{l}</option>
        ))}
      </select>
    </label>
  );
}

function TimelineBadge({ timeline }: { timeline: string }) {
  const hot = timeline === "Today" || timeline === "This Week";
  return (
    <span className={cn("shrink-0 rounded-full px-2.5 py-1 text-xs font-bold", hot ? "bg-[#F5C451]/15 text-[#F5C451]" : "bg-white/[0.06] text-white/65")}>
      {timeline}
    </span>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0">
      <dt className="text-xs text-white/45">{label}</dt>
      <dd className="truncate text-white/85">{value}</dd>
    </div>
  );
}

function LeadRow({ lead: l, open, onToggle }: { lead: Lead; open: boolean; onToggle: () => void }) {
  return (
    <>
      <tr className="border-t border-white/[0.06] transition-colors hover:bg-white/[0.03]">
        <td className="px-4 py-3 whitespace-nowrap text-white/60">{fmt.format(new Date(l.submittedAt))}</td>
        <td className="px-4 py-3 font-semibold text-white">{l.fullName}</td>
        <td className="px-4 py-3">
          <a href={`mailto:${l.email}`} className="inline-flex items-center gap-1.5 text-[#C9B5FF] hover:underline">
            <Mail size={13} aria-hidden /> {l.email}
          </a>
        </td>
        <td className="px-4 py-3 text-white/80">{l.countryName}</td>
        <td className="px-4 py-3 font-semibold text-white/90">{l.challengeSize}</td>
        <td className="px-4 py-3"><TimelineBadge timeline={l.timeline} /></td>
        <td className="max-w-[12rem] truncate px-4 py-3 text-white/65">{l.utmCampaign ?? "—"}</td>
        <td className="px-4 py-3 text-white/75">{l.marketingConsent ? "Yes" : "No"}</td>
        <td className="px-2 py-3">
          <button
            type="button"
            onClick={onToggle}
            aria-expanded={open}
            aria-label={`Details for ${l.fullName}`}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-white/55 hover:bg-white/[0.06] hover:text-white"
          >
            <ChevronDown size={16} aria-hidden className={cn("transition-transform", open && "rotate-180")} />
          </button>
        </td>
      </tr>
      {open && (
        <tr className="bg-white/[0.02]">
          <td colSpan={9} className="px-4 py-4">
            <dl className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm md:grid-cols-4">
              <Detail label="UTM source" value={l.utmSource ?? "—"} />
              <Detail label="UTM medium" value={l.utmMedium ?? "—"} />
              <Detail label="UTM content" value={l.utmContent ?? "—"} />
              <Detail label="UTM term" value={l.utmTerm ?? "—"} />
              <Detail label="Coupon" value={l.couponCode} />
              <Detail label="Source" value={l.source} />
              <Detail label="Event ID" value={l.eventId} />
              <Detail label="Landing URL" value={l.landingUrl ?? "—"} />
            </dl>
          </td>
        </tr>
      )}
    </>
  );
}
