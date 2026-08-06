"use client";

const FALLBACK_MESSAGES = ["🏆 Join Now & Get JUN70 Code for 70% Off"];

export function AnnouncementBar({ banners = FALLBACK_MESSAGES }: { banners?: string[] }) {
  const messages = banners.length ? banners : FALLBACK_MESSAGES;
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
