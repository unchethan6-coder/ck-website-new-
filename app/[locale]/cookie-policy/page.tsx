import { getTranslations } from "next-intl/server";
import { Container } from "@/components/shared/Container";
import { pageSeo } from "@/lib/seo";

export const metadata = pageSeo({
  title: "Cookie Policy",
  description:
    "CK Capital Cookie Policy - Information about cookies and tracking technologies.",
  path: "/cookie-policy",
});

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10 border-t border-foreground/[0.06] pt-8">
      <h2 className="font-[family-name:var(--font-inter-tight)] text-xl font-bold text-foreground md:text-2xl">
        {title}
      </h2>
      <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-foreground/60">
        {children}
      </div>
    </section>
  );
}

function Subsection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="pt-2">
      <h3 className="font-[family-name:var(--font-inter-tight)] text-base font-bold text-foreground md:text-lg">
        {title}
      </h3>
      <div className="mt-3">{children}</div>
    </div>
  );
}

export default async function CookiePolicyPage() {
  const t = await getTranslations("legal");

  return (
    <div className="min-h-screen bg-background" data-od-id="cookie-page">

      {/* ─────────────── Hero ─────────────── */}
      <section className="relative bg-background" data-od-id="cookie-hero">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at 70% 0%, rgba(212,175,55,0.18), transparent 45%), radial-gradient(circle at 5% 100%, rgba(212,175,55,0.07), transparent 40%)',
          }}
        />
        <Container className="relative py-16 md:py-20">
          <div className="max-w-3xl">
            <span className="inline-flex flex-wrap items-center gap-x-2 gap-y-1 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-[10.5px] font-bold uppercase tracking-[0.16em] text-primary">
              {t("badgeLegal")}
              <span className="text-primary/40">·</span>
              {t("cookieBadge")}
            </span>
            <h1
              className="mt-5 font-[family-name:var(--font-inter-tight)] text-4xl font-extrabold leading-[1.05] tracking-[-0.02em] text-foreground md:text-5xl"
              data-od-id="cookie-hero-title"
            >
              {t("cookieTitle")}
            </h1>
          </div>
        </Container>
      </section>

      {/* ─────────────── Document ─────────────── */}
      <section className="bg-background pb-16 md:pb-24" data-od-id="cookie-document">
        <Container>
          <div className="mx-auto max-w-3xl text-[15px] leading-relaxed text-foreground/60">
            <Section title="Information Automatically Collected">
              <p>
                During your visit, usage, or navigation of the Services, certain
                information is automatically collected by us. This information, while not
                revealing your specific identity (e.g. name or contact details), may
                include device and usage data such as IP address, browser and device
                specifications, operating system, language preferences, source URLs,
                device name, country, location, usage information of our Services, and
                other technical details.
              </p>
              <p>
                This information is mainly utilized for ensuring the security and
                functioning of our Services, as well as for internal analysis and
                reporting purposes. Similar to other businesses, we also gather
                information through the use of cookies and similar technologies.
              </p>
            </Section>

            <Section title="Information We Collect">
              <Subsection title="Log and Usage Data">
                <p>
                  This refers to information related to service, diagnostics, usage, and
                  performance, which our servers automatically gather when you access or
                  utilize our Services. This data is stored in log files and may include
                  details like your IP address, device information, browser type and
                  settings, and information about your activities within the Services
                  (such as timestamps of usage, pages/files viewed, searches performed,
                  and other actions like feature usage), and device event information
                  (such as system activity, error reports, and hardware configurations),
                  depending on your interaction with us.
                </p>
              </Subsection>
            </Section>

            <Section title="How Do We Process Your Information?">
              <p>
                Your personal information is processed by us for several purposes, based
                on your interaction with our Services. These may include:
              </p>
              <ul className="ml-5 list-disc space-y-2">
                <li>Easing account creation and authentication and identifying fraudulent activity</li>
                <li>Seeking feedback and communicating with you regarding your usage of our Services</li>
                <li>Processing information when necessary to protect someone's vital interests, for instance, to prevent harm</li>
              </ul>
            </Section>

            <Section title="Do We Use Cookies and Other Tracking Technologies?">
              <p>
                The use of cookies and other tracking technologies (e.g. web beacons,
                pixels) may allow access or storage of information. Our Cookie Notice
                provides detailed information on our usage of these technologies and
                offers options to decline certain cookies.
              </p>
              <p>
                We also utilize various tracking methods such as Google AdWords, Meta
                Advertising, and Google Analytics to gather and store data on user
                interactions with our websites.
              </p>
            </Section>

            <Section title="Web Browser Cookie Settings">
              <p>
                Web browsers are typically configured to accept cookies by default. You
                can choose to remove or reject cookies, but this may impact certain
                features or services of our Services. To opt out of interest-based ads by
                advertisers on our Services, go to{' '}
                <a
                  href="https://youradchoices.com/control"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-[#F7D774] underline decoration-primary/40 underline-offset-4 transition-colors hover:text-[#D4AF37] hover:decoration-primary"
                >
                  https://youradchoices.com/control
                </a>
                .
              </p>
            </Section>

            <Section title="Controls For Do-Not-Track Features">
              <p>
                Many web browsers, mobile OS and apps have a Do-Not-Track
                (&quot;DNT&quot;) feature to signal your preference for not having your
                online browsing activities monitored and collected. However, as there is
                no agreed technology standard for DNT, we do not currently respond to DNT
                browser signals or any other mechanism that communicates your preference
                not to be tracked. If a future standard for online tracking is adopted,
                we will update this policy and inform you.
              </p>
            </Section>

            <Section title="Contact Us">
              <p>
                For privacy-related questions or comments, email us at{' '}
                <a
                  href="mailto:support@ckcapital.co.uk"
                  className="font-semibold text-[#F7D774] underline decoration-primary/40 underline-offset-4 transition-colors hover:text-[#D4AF37] hover:decoration-primary"
                >
                  support@ckcapital.co.uk
                </a>
                .
              </p>
            </Section>
          </div>
        </Container>
      </section>
    </div>
  )
}
