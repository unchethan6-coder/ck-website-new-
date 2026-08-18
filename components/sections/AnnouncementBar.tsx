"use client";
import { useTranslations } from "next-intl";

export function AnnouncementBar({ banners }: { banners?: string[] }) {
  const t = useTranslations("announcement");
  const defaultMsg = `🔥 ${t("badge")} — ${t("discount")} ${t("allEvaluations")} — ${t("codeLabel")} SUMMER70`;
  const messages = banners && banners.length ? banners : [defaultMsg];
  // Repeat so the ticker always fills even wide screens
  const items = Array.from({ length: 12 }, (_, i) => i);

  return (
    <div
      className="relative overflow-hidden py-2.5"
      style={{ background: "linear-gradient(90deg, #c9a227, #e8c547, #d4af37, #e8c547, #c9a227)" }}
    >
      <div className="flex animate-ticker whitespace-nowrap">
        {items.map((i) => (
          <span
            key={i}
            className="inline-flex items-center shrink-0 text-[13px] font-bold text-[#1a1000] px-10"
          >
            {messages[i % messages.length]}
          </span>
        ))}
      </div>
    </div>
  );
}
