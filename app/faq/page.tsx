import { FaqContent } from './faq-content'
import { pageSeo } from "@/lib/seo";
import { FAQ_ITEMS } from "@/lib/content";

export const metadata = pageSeo({
  title: "FAQ - Prop Trading Questions Answered",
  description:
    "Frequently asked questions about CK Capital prop trading accounts, funded accounts, profit splits, trading rules, and how to get started with instant funding.",
  path: "/faq",
});

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.a,
    },
  })),
};

export default function FAQPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <FaqContent />
    </>
  );
}
