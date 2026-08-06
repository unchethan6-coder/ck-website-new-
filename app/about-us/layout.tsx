import type { Metadata } from "next";
import { pageSeo } from "@/lib/seo";

export const metadata: Metadata = pageSeo({
  title: "About Us – Meet the CK Capital Team",
  description:
    "CK Capital is a premium prop trading firm. Learn our story, mission and vision, leadership, and the values behind funded accounts up to $1.2M with 100% profit splits.",
  path: "/about-us",
});

export default function AboutLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
