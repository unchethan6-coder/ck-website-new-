"use client";

import { useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import { AlertCircle, ArrowRight, Check, Clock, Copy, Loader2, Lock, ShieldCheck, Sparkles } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { CHALLENGE_SIZES, OFFER, TIMELINES, UTM_KEYS, type ChallengeSize, type Timeline } from "@/lib/leads/offer";
import { validateLead, type LeadErrors } from "@/lib/leads/schema";
import { metaCookies, startLandingTracking, trackingAllowed, trackLeadSaved } from "./tracking";

/**
 * The 80% OFF lead page: offer, form, and the coupon it unlocks.
 *
 * The coupon arrives in the API's response to a saved lead and is never part
 * of this bundle, so it cannot be read from the page before submitting.
 */

const UNLOCK_KEY = "ck-80-unlocked";
const UTM_KEY = "ck-80-utm";

type Status = "idle" | "submitting" | "error";

export interface CountryOption {
  code: string;
  name: string;
}

/** Country names come from the server, so the list renders identically on both sides. */
export function LeadLanding({ defaultCountry, countries }: { defaultCountry: string | null; countries: CountryOption[] }) {
  const formRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const ids = useId();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState(defaultCountry ?? "");
  const [challengeSize, setChallengeSize] = useState<ChallengeSize | "">("");
  const [timeline, setTimeline] = useState<Timeline | "">("");
  const [marketing, setMarketing] = useState(false);
  const [honeypot, setHoneypot] = useState("");

  const [errors, setErrors] = useState<LeadErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [coupon, setCoupon] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const eventId = useRef<string>("");

  useEffect(() => startLandingTracking(), []);

  // UTM tags survive a reload, and an unlocked code survives one too.
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const fromUrl: Record<string, string> = {};
      for (const k of UTM_KEYS) {
        const v = params.get(k);
        if (v) fromUrl[k] = v;
      }
      if (Object.keys(fromUrl).length) sessionStorage.setItem(UTM_KEY, JSON.stringify(fromUrl));
      const saved = sessionStorage.getItem(UNLOCK_KEY);
      if (saved) setCoupon(saved);
    } catch {
      /* storage blocked: UTMs are read from the URL at submit time instead */
    }
  }, []);

  const utm = (): Record<string, string> => {
    try {
      const stored = sessionStorage.getItem(UTM_KEY);
      if (stored) return JSON.parse(stored);
    } catch {
      /* fall through */
    }
    const params = new URLSearchParams(window.location.search);
    return Object.fromEntries(UTM_KEYS.flatMap((k) => (params.get(k) ? [[k, params.get(k)!]] : [])));
  };

  const goToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    window.setTimeout(() => nameRef.current?.focus({ preventScroll: true }), 450);
  };

  const submit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (status === "submitting") return; // one request at a time

    const payload = {
      fullName,
      email,
      country,
      challengeSize,
      timeline,
      marketingConsent: marketing,
      utm: utm(),
      eventId: (eventId.current ||= crypto.randomUUID()),
    };
    const check = validateLead(payload);
    if (check.errors) {
      setErrors(check.errors);
      setStatus("idle");
      const first = Object.keys(check.errors)[0];
      document.getElementById(`${ids}-${first}`)?.focus();
      return;
    }
    setErrors({});
    setStatus("submitting");
    setMessage("");

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...payload,
          website: honeypot,
          landingUrl: window.location.href,
          trackingConsent: trackingAllowed(),
          ...metaCookies(),
        }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.ok || !data.coupon) {
        if (data?.fields) setErrors(data.fields);
        setStatus("error");
        setMessage(data?.error || "We couldn't save your details. Please try again.");
        return;
      }
      // Saved. Only now is the code shown, and only now is a Lead counted.
      if (!data.duplicate) trackLeadSaved(data.eventId, payload.challengeSize);
      try {
        sessionStorage.setItem(UNLOCK_KEY, data.coupon);
      } catch {
        /* the code just won't survive a reload */
      }
      setCoupon(data.coupon);
      setStatus("idle");
      requestAnimationFrame(() => formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
    } catch {
      setStatus("error");
      setMessage("Connection problem — your details weren't sent. Please check your connection and try again.");
    }
  };

  const copy = async () => {
    if (!coupon) return;
    try {
      await navigator.clipboard.writeText(coupon);
    } catch {
      // Older browsers: select the code so the visitor can copy it themselves.
      const el = document.getElementById(`${ids}-code`);
      if (el) window.getSelection()?.selectAllChildren(el);
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2200);
  };

  return (
    <div className="relative isolate min-h-dvh overflow-x-clip bg-[#050816] text-white" data-od-id="lead-landing">
      {/* Backdrop. Clipped in its own box: a scrollable ancestor would let focus() shift the page sideways. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-[42rem] w-[60rem] -translate-x-1/2 rounded-full bg-[#703AD7]/30 blur-[140px]" />
        <div className="absolute top-[38%] -right-40 h-[28rem] w-[28rem] rounded-full bg-[#F5C451]/10 blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: "radial-gradient(rgba(255,255,255,0.9) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
            maskImage: "linear-gradient(to bottom, black, transparent 75%)",
          }}
        />
      </div>

      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 pt-5 sm:px-6 sm:pt-7">
        <Image src="/images/brand/ckpropfirm-logo.svg" alt="CK PropFirm" width={148} height={32} priority className="h-7 w-auto sm:h-8" />
        <span className="hidden items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-semibold text-white/70 sm:inline-flex">
          <ShieldCheck size={14} aria-hidden className="text-[#A98BFF]" /> Secure &amp; private
        </span>
      </header>

      <main className="mx-auto grid w-full max-w-6xl gap-10 px-4 pt-10 pb-16 sm:px-6 sm:pt-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,30rem)] lg:items-center lg:gap-14 lg:pt-16 lg:pb-24">
        {/* ─────────── Offer ─────────── */}
        <section className="text-center lg:text-left" aria-labelledby={`${ids}-headline`}>
          <p className="inline-flex items-center gap-2 rounded-full border border-[#A98BFF]/30 bg-[#703AD7]/15 px-3.5 py-1.5 text-[11px] font-bold tracking-[0.2em] text-[#C9B5FF] uppercase">
            <Sparkles size={13} aria-hidden /> CK PropFirm Exclusive Offer
          </p>

          <div className="relative mt-6">
            <h1
              id={`${ids}-headline`}
              className="font-[family-name:var(--font-jakarta)] text-[3.25rem] leading-[0.92] font-black tracking-[-0.035em] uppercase sm:text-7xl lg:text-[4.5rem] lg:leading-[0.9] xl:text-[6rem]"
            >
              {/* Desktop stacks GET / 80% OFF / ALL CHALLENGES so the offer line is the biggest and nothing overflows. */}
              <span className="block">
                <span className="lg:block lg:text-[0.58em] lg:leading-none">Get</span>{" "}
                <span className="bg-gradient-to-b from-[#FFE7A3] via-[#F5C451] to-[#C98E1E] bg-clip-text text-transparent drop-shadow-[0_6px_30px_rgba(245,196,81,0.35)]">
                  80%
                </span>{" "}
                Off
              </span>
              <span className="mt-2 block text-[0.62em] tracking-[-0.02em] text-white/95 lg:mt-3 lg:text-[0.58em]">All Challenges</span>
            </h1>

            {/* Offer badge */}
            <div
              aria-hidden
              className="absolute top-0 right-0 hidden h-24 w-24 rotate-12 flex-col items-center justify-center rounded-full border-2 border-[#F5C451]/70 bg-[#0B0F24] text-center shadow-[0_0_50px_rgba(245,196,81,0.35)] xl:flex"
            >
              <span className="font-[family-name:var(--font-jakarta)] text-[1.7rem] leading-none font-black text-[#F5C451]">80%</span>
              <span className="mt-1 text-[11px] font-bold tracking-[0.2em] text-white/80">OFF</span>
            </div>
          </div>

          <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-white/70 sm:text-lg lg:mx-0">
            Answer a few quick questions to unlock your exclusive 80% discount.
          </p>

          {!coupon && (
            <div className="mt-8 flex flex-col items-center gap-3 lg:items-start">
              <button
                type="button"
                onClick={goToForm}
                className="brand-gradient-btn inline-flex min-h-14 w-full max-w-sm items-center justify-center gap-2 rounded-2xl px-7 text-base font-extrabold text-[#1A1030] shadow-[0_12px_40px_-10px_rgba(245,196,81,0.6)] transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F5C451] sm:w-auto"
              >
                Unlock My 80% Discount <ArrowRight size={18} aria-hidden />
              </button>
              <p className="inline-flex items-center gap-1.5 text-sm text-white/55">
                <Clock size={14} aria-hidden /> Takes less than 30 seconds.
              </p>
            </div>
          )}
        </section>

        {/* ─────────── Form / unlocked code ─────────── */}
        <div ref={formRef} className="scroll-mt-6" id="unlock">
          <div className="relative rounded-3xl bg-gradient-to-b from-[#A98BFF]/50 via-white/10 to-white/5 p-px shadow-[0_40px_120px_-30px_rgba(112,58,215,0.7)]">
            <div className="rounded-[calc(1.5rem-1px)] bg-[#0A0E22]/95 p-5 backdrop-blur-xl sm:p-8">
              {coupon ? (
                <Unlocked coupon={coupon} copied={copied} onCopy={copy} codeId={`${ids}-code`} />
              ) : (
                <form noValidate onSubmit={submit} aria-describedby={`${ids}-form-desc`} data-od-id="lead-form">
                  <h2 className="font-[family-name:var(--font-jakarta)] text-2xl font-extrabold tracking-tight sm:text-[1.7rem]">
                    Unlock Your 80% Discount
                  </h2>
                  <p id={`${ids}-form-desc`} className="mt-1.5 text-sm leading-relaxed text-white/60">
                    Complete this quick form to get your CK PropFirm discount code.
                  </p>

                  <div className="mt-6 space-y-5">
                    <Field id={`${ids}-fullName`} label="What's your name?" error={errors.fullName}>
                      <input
                        ref={nameRef}
                        id={`${ids}-fullName`}
                        type="text"
                        autoComplete="name"
                        placeholder="Full name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        aria-invalid={!!errors.fullName}
                        aria-describedby={errors.fullName ? `${ids}-fullName-err` : undefined}
                        required
                        className={inputClass(!!errors.fullName)}
                      />
                    </Field>

                    <Field id={`${ids}-email`} label="What's your email address?" error={errors.email}>
                      <input
                        id={`${ids}-email`}
                        type="email"
                        inputMode="email"
                        autoComplete="email"
                        autoCapitalize="none"
                        spellCheck={false}
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? `${ids}-email-err` : undefined}
                        required
                        className={inputClass(!!errors.email)}
                      />
                    </Field>

                    <Field id={`${ids}-country`} label="Which country are you from?" error={errors.country}>
                      <select
                        id={`${ids}-country`}
                        autoComplete="country"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        aria-invalid={!!errors.country}
                        aria-describedby={errors.country ? `${ids}-country-err` : undefined}
                        required
                        className={cn(inputClass(!!errors.country), "appearance-none bg-[url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2216%22%20height%3D%2216%22%20fill%3D%22none%22%20stroke%3D%22%23A98BFF%22%20stroke-width%3D%222%22%3E%3Cpath%20d%3D%22m4%206%204%204%204-4%22/%3E%3C/svg%3E')] bg-[position:right_1rem_center] bg-no-repeat pr-10", !country && "text-white/40")}
                      >
                        <option value="" disabled>
                          Select your country
                        </option>
                        {countries.map((c) => (
                          <option key={c.code} value={c.code} className="bg-[#0A0E22] text-white">
                            {c.name}
                          </option>
                        ))}
                      </select>
                    </Field>

                    <Choice
                      id={`${ids}-challengeSize`}
                      legend="Which challenge size interests you?"
                      options={CHALLENGE_SIZES}
                      value={challengeSize}
                      onChange={(v) => setChallengeSize(v as ChallengeSize)}
                      error={errors.challengeSize}
                      columns="grid-cols-3 sm:grid-cols-4"
                      wide="Not Sure Yet"
                    />

                    <Choice
                      id={`${ids}-timeline`}
                      legend="When are you planning to start?"
                      options={TIMELINES}
                      value={timeline}
                      onChange={(v) => setTimeline(v as Timeline)}
                      error={errors.timeline}
                      columns="grid-cols-2"
                    />

                    {/* Hidden from people; only form-filling bots see it. */}
                    <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
                      <label>
                        Website
                        <input tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} name="website" />
                      </label>
                    </div>

                    <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3.5 text-sm leading-snug text-white/75 transition-colors hover:border-white/20">
                      <input
                        type="checkbox"
                        checked={marketing}
                        onChange={(e) => setMarketing(e.target.checked)}
                        className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer accent-[#894CEF]"
                      />
                      <span>
                        Send me trading tips and future offers from CK PropFirm by email. <span className="text-white/45">(Optional)</span>
                      </span>
                    </label>
                  </div>

                  {status === "error" && (
                    <div role="alert" className="mt-5 flex items-start gap-3 rounded-xl border border-red-400/30 bg-red-500/10 p-3.5 text-sm text-red-100">
                      <AlertCircle size={18} aria-hidden className="mt-0.5 shrink-0 text-red-300" />
                      <div className="min-w-0 flex-1">
                        <p>{message}</p>
                        <button
                          type="button"
                          onClick={() => submit()}
                          className="mt-1.5 font-bold text-white underline underline-offset-4 hover:no-underline"
                        >
                          Try again
                        </button>
                      </div>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    data-od-id="lead-submit"
                    className="brand-gradient-btn mt-6 inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-2xl px-6 text-base font-black tracking-wide text-[#1A1030] uppercase shadow-[0_14px_40px_-12px_rgba(245,196,81,0.65)] transition-[transform,opacity] hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F5C451] disabled:translate-y-0 disabled:cursor-wait disabled:opacity-80"
                  >
                    {status === "submitting" ? (
                      <>
                        <Loader2 size={18} aria-hidden className="animate-spin" /> Saving…
                      </>
                    ) : (
                      <>
                        <Lock size={17} aria-hidden /> Get My 80% Off Code
                      </>
                    )}
                  </button>

                  <p className="mt-4 text-center text-xs leading-relaxed text-white/50">
                    By submitting, you agree to our{" "}
                    <Link href="/privacy-policy" className="underline underline-offset-2 hover:text-white">
                      Privacy Policy
                    </Link>{" "}
                    and to receive information about your requested offer.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-white/[0.07] px-4 py-8 text-center sm:px-6">
        <p className="font-[family-name:var(--font-jakarta)] text-sm font-bold text-white/80">CK PropFirm</p>
        <p className="mx-auto mt-2 max-w-xl text-xs leading-relaxed text-white/45">
          Trading evaluations are conducted in a simulated environment. No real funds are traded. Trading involves risk. Terms and
          conditions apply.
        </p>
        <p className="mt-3 text-xs text-white/55">
          <Link href="/privacy-policy" className="underline-offset-2 hover:text-white hover:underline">
            Privacy Policy
          </Link>
          <span aria-hidden className="mx-2 text-white/25">
            |
          </span>
          <Link href="/terms-conditions" className="underline-offset-2 hover:text-white hover:underline">
            Terms &amp; Conditions
          </Link>
        </p>
      </footer>
    </div>
  );
}

function inputClass(invalid: boolean) {
  return cn(
    "h-13 min-h-[3.25rem] w-full rounded-xl border bg-white/[0.04] px-4 text-base text-white placeholder:text-white/35 transition-colors",
    "focus-visible:border-[#A98BFF] focus-visible:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#894CEF]/25",
    invalid ? "border-red-400/70" : "border-white/12 hover:border-white/25"
  );
}

function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-semibold text-white/90">
        {label} <span className="text-[#A98BFF]" aria-hidden>*</span>
      </label>
      {children}
      {error && (
        <p id={`${id}-err`} className="mt-1.5 text-[13px] text-red-300">
          {error}
        </p>
      )}
    </div>
  );
}

function Choice({
  id, legend, options, value, onChange, error, columns, wide,
}: {
  id: string;
  legend: string;
  options: readonly string[];
  value: string;
  onChange: (v: string) => void;
  error?: string;
  columns: string;
  /** An option that spans the rest of its row. */
  wide?: string;
}) {
  return (
    <fieldset aria-describedby={error ? `${id}-err` : undefined} aria-invalid={!!error}>
      <legend className="mb-2 text-sm font-semibold text-white/90">
        {legend} <span className="text-[#A98BFF]" aria-hidden>*</span>
      </legend>
      <div className={cn("grid gap-2", columns)}>
        {options.map((option, i) => {
          const checked = value === option;
          return (
            <label
              key={option}
              className={cn(
                "relative flex min-h-12 cursor-pointer items-center justify-center rounded-xl border px-2 text-center text-[15px] font-bold transition-all",
                "has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-[#894CEF]/30",
                option === wide && "col-span-3 sm:col-span-2",
                checked
                  ? "border-[#A98BFF] bg-[#703AD7]/30 text-white shadow-[inset_0_0_0_1px_rgba(169,139,255,0.6)]"
                  : error
                    ? "border-red-400/50 bg-white/[0.03] text-white/80 hover:border-white/30"
                    : "border-white/12 bg-white/[0.03] text-white/80 hover:border-white/30 hover:text-white"
              )}
            >
              <input
                id={i === 0 ? id : undefined}
                type="radio"
                name={id}
                value={option}
                checked={checked}
                onChange={() => onChange(option)}
                className="sr-only"
              />
              {checked && <Check size={14} aria-hidden className="absolute top-1.5 right-1.5 text-[#C9B5FF]" />}
              {option}
            </label>
          );
        })}
      </div>
      {error && (
        <p id={`${id}-err`} className="mt-1.5 text-[13px] text-red-300">
          {error}
        </p>
      )}
    </fieldset>
  );
}

function Unlocked({ coupon, copied, onCopy, codeId }: { coupon: string; copied: boolean; onCopy: () => void; codeId: string }) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => headingRef.current?.focus(), []);

  return (
    <div className="text-center" data-od-id="lead-success">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-[#F5C451]/50 bg-[#F5C451]/10 shadow-[0_0_40px_rgba(245,196,81,0.35)]">
        <Sparkles size={30} aria-hidden className="text-[#F5C451]" />
      </div>
      <h2
        ref={headingRef}
        tabIndex={-1}
        className="mt-5 font-[family-name:var(--font-jakarta)] text-[1.9rem] leading-tight font-black tracking-tight uppercase outline-none sm:text-4xl"
      >
        Your 80% Off <br className="sm:hidden" />
        Is Unlocked!
      </h2>
      <p className="mt-2 text-white/65">Your exclusive CK PropFirm discount code is ready.</p>

      <div className="mt-7 rounded-2xl border-2 border-dashed border-[#F5C451]/60 bg-[#F5C451]/[0.06] px-4 py-6">
        <p className="text-[11px] font-bold tracking-[0.22em] text-white/50 uppercase">Your code</p>
        <p
          id={codeId}
          className="mt-2 font-mono text-5xl font-black tracking-[0.12em] text-[#F5C451] select-all sm:text-6xl"
          aria-live="polite"
        >
          {coupon}
        </p>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={onCopy}
          className="inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/[0.05] px-5 text-sm font-black tracking-wide uppercase transition-colors hover:border-white/40 hover:bg-white/[0.09] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A98BFF]"
        >
          {copied ? <Check size={17} aria-hidden className="text-emerald-300" /> : <Copy size={17} aria-hidden />}
          <span aria-live="polite">{copied ? "Copied!" : "Copy Code"}</span>
        </button>
        <a
          href={OFFER.claimUrl}
          data-od-id="lead-claim"
          className="brand-gradient-btn inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl px-5 text-sm font-black tracking-wide text-[#1A1030] uppercase shadow-[0_14px_40px_-12px_rgba(245,196,81,0.65)] transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F5C451]"
        >
          Claim My 80% Off <ArrowRight size={17} aria-hidden />
        </a>
      </div>

      <p className="mt-5 text-sm leading-relaxed text-white/60">
        Apply code <strong className="font-bold text-white">{coupon}</strong> at checkout to receive 80% OFF eligible challenges.
      </p>
    </div>
  );
}
