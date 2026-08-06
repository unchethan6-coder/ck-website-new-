import type { Metadata } from "next";
import { pageSeo } from "@/lib/seo";

export const metadata: Metadata = pageSeo({
  title: "Contact Us – 24/7 Trader Support",
  description:
    "Get in touch with the CK Capital team. 24/7 support via live chat and Discord, with an average response time under 60 seconds.",
  path: "/contact",
});

export default function ContactLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
