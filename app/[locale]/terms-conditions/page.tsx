import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getFormatter, getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/shared/Container";
import { LegalToc } from "@/components/legal/LegalToc";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { TERMS, TERMS_LAST_UPDATED, type Inline, type TermsBlock } from "@/lib/legal/terms";
import { pageSeo } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return pageSeo({
    title: "Terms & Conditions",
    description:
      "CK Capital Terms and Conditions — Please review our rules and terms before purchasing or using our services.",
    path: "/terms-conditions",
    locale: hasLocale(routing.locales, locale) ? locale : routing.defaultLocale,
  });
}

const LINK =
  "font-semibold text-[#A98BFF] underline decoration-[#A98BFF]/40 underline-offset-4 transition-colors hover:decoration-[#A98BFF]";

function Text({ parts }: { parts: Inline[] }) {
  return (
    <>
      {parts.map((part, i) =>
        typeof part === "string" ? (
          part
        ) : (
          <Link key={i} href={part.href as never} className={LINK}>
            {part.text}
          </Link>
        )
      )}
    </>
  );
}

function Block({ block }: { block: TermsBlock }) {
  if ("p" in block) return <p><Text parts={block.p} /></p>;
  if ("notice" in block) {
    return (
      <p className="rounded-xl border border-primary/30 bg-primary/[0.07] p-5 text-[13.5px] leading-relaxed font-medium tracking-[0.01em] text-foreground/85">
        {block.notice}
      </p>
    );
  }
  if ("ol" in block) {
    // Long enumerations (the country list) read better in columns.
    return (
      <ol className="ml-5 list-decimal gap-x-10 space-y-1.5 marker:text-foreground/40 sm:columns-2">
        {block.ol.map((item) => (
          <li key={item} className="break-inside-avoid pl-1">{item}</li>
        ))}
      </ol>
    );
  }
  return (
    <ul className="ml-5 list-disc space-y-2 marker:text-[#A98BFF]/70">
      {block.ul.map((item) => (
        <li key={item} className="pl-1">{item}</li>
      ))}
    </ul>
  );
}

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("legal");
  const format = await getFormatter();

  // The overview introduces the document; the clauses after it are numbered.
  const label = (i: number) => (i === 0 ? TERMS[0].title : `${i}. ${TERMS[i].title}`);
  const updated = format.dateTime(new Date(TERMS_LAST_UPDATED), { dateStyle: "long", timeZone: "UTC" });

  return (
    <div className="min-h-screen bg-background" data-od-id="terms-page">
      {/* ─────────────── Title ─────────────── */}
      <section className="relative isolate overflow-hidden border-b border-foreground/10" data-od-id="terms-hero">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
          style={{ background: "radial-gradient(60% 90% at 50% 0%, rgba(121,67,224,0.22), transparent 70%)" }}
        />
        <Container className="py-16 text-center md:py-24">
          <h1
            className="font-[family-name:var(--font-jakarta)] text-4xl leading-[1.05] font-extrabold tracking-[-0.02em] text-balance text-foreground md:text-6xl"
            data-od-id="terms-hero-title"
          >
            {t("termsTitle")}
          </h1>
          <p className="mt-4 text-sm text-foreground/55">{t("lastUpdated", { date: updated })}</p>
        </Container>
      </section>

      {/* ─────────────── Document ─────────────── */}
      <Container className="py-10 md:py-16" data-od-id="terms-document">
        <div className="grid gap-8 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-14">
          <aside>
            <LegalToc heading={t("onThisPage")} entries={TERMS.map((s, i) => ({ id: s.id, label: label(i) }))} />
          </aside>

          <div dir="ltr" lang="en" className="max-w-3xl">
            {TERMS.map((section, i) => (
              <section
                key={section.id}
                id={section.id}
                className="scroll-mt-28 border-t border-foreground/10 pt-8 pb-2 first:border-t-0 first:pt-0"
              >
                <h2 className="font-[family-name:var(--font-jakarta)] text-xl font-bold text-foreground md:text-2xl">
                  {label(i)}
                </h2>
                <div className="mt-4 space-y-4 pb-6 text-[15px] leading-relaxed text-foreground/70">
                  {section.blocks.map((block, j) => (
                    <Block key={j} block={block} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
