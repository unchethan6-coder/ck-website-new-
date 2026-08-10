import Link from "next/link";
import { Container } from "@/components/shared/Container";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-background">
      {/* Gold radial glows */}
      <div className="pointer-events-none absolute left-1/4 top-1/3 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/[0.07] blur-[120px]" />
      <div className="pointer-events-none absolute right-1/4 top-2/3 h-[400px] w-[400px] translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/[0.05] blur-[100px]" />

      <Container className="relative z-10 text-center">
        {/* 404 number */}
        <div className="mb-8">
          <span className="gradient-text-gold font-[family-name:var(--font-inter-tight)] text-[10rem] font-extrabold leading-none tracking-tighter sm:text-[12rem]">
            404
          </span>
        </div>

        {/* Message */}
        <h1 className="hero-title text-foreground mb-4 text-balance">
          Page Not Found
        </h1>
        <p className="mx-auto mb-10 max-w-md text-lg text-foreground/60">
          The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get you back on track.
        </p>

        {/* CTA */}
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 rounded-xl px-7 py-3.5 text-base font-semibold text-black transition-all duration-200 hover:brightness-110"
          style={{
            background: "var(--ck-gold-gradient)",
            boxShadow: "0 0 20px rgba(212,175,55,0.3)",
          }}
        >
          Back to Home
        </Link>

        {/* Quick links */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-4 text-sm text-foreground/50">
          <Link href="/evaluation" className="transition-colors hover:text-primary">
            Evaluations
          </Link>
          <span className="text-foreground/20">·</span>
          <Link href="/instant" className="transition-colors hover:text-primary">
            Instant Funding
          </Link>
          <span className="text-foreground/20">·</span>
          <Link href="/faq" className="transition-colors hover:text-primary">
            FAQ
          </Link>
          <span className="text-foreground/20">·</span>
          <Link href="/contact" className="transition-colors hover:text-primary">
            Contact
          </Link>
        </div>
      </Container>
    </section>
  );
}
