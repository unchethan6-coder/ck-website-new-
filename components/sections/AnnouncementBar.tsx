"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { X } from "lucide-react";

export function AnnouncementBar({ banners }: { banners?: string[] } = {}) {
  const [visible, setVisible] = useState(true);
  const t = useTranslations("announcement");

  if (!visible) return null;

  return (
    <div
      className="relative z-30 flex items-center justify-center bg-[#070709] px-4 py-2.5 text-center text-xs sm:text-[13px] border-b border-white/[0.08]"
      data-od-id="announcement-bar"
    >
      <div className="flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1">
        <span className="text-sm">🎁</span>
        <span className="font-semibold text-white/95 tracking-wide">
          <span className="text-[#FFC107]">{t("badge")}:</span> {t("discount")} {t("allEvaluations")}!
        </span>
        <span className="inline-flex items-center rounded border border-[#FFC107]/40 bg-[#FFC107]/10 px-2 py-0.5 font-mono text-[11px] sm:text-xs font-bold text-[#FFC107]">
          {t("codeLabel")}: 10KFOR39
        </span>
        <a
          href="/#evaluation-programs"
          className="inline-flex items-center gap-1 font-bold text-[#FFC107] hover:underline"
        >
          {t("claimOffer")} <span>→</span>
        </a>
      </div>

      <button
        onClick={() => setVisible(false)}
        aria-label="Dismiss announcement"
        className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 p-1 text-white/50 transition-colors hover:text-white"
      >
        <X size={15} />
      </button>
    </div>
  );
}

