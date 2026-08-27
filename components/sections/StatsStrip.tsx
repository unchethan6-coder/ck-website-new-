"use client";

import { useTranslations } from "next-intl";
import { Users, Globe, DollarSign, ShieldCheck, Headphones } from "lucide-react";
import { CountUp } from "@/components/fx/CountUp";

export function StatsStrip() {
  const t = useTranslations("trustStats");

  const stats = [
    {
      icon: Users,
      value: "20,000+",
      label: t("activeTraders"),
    },
    {
      icon: Globe,
      value: t("worldwide"),
      label: t("globalReach"),
    },
    {
      icon: DollarSign,
      value: "$1.2M+",
      label: t("payoutsTotal"),
    },
    {
      icon: ShieldCheck,
      value: "100%",
      label: t("secureTransparent"),
    },
    {
      icon: Headphones,
      value: "24/7",
      label: t("traderSupport"),
    },
  ];

  return (
    <section
      className="relative z-20 border-y border-gray-200 bg-white py-8 sm:py-10"
      data-od-id="stats-strip"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-y-6 sm:grid-cols-3 lg:grid-cols-5 lg:divide-x lg:divide-gray-200">
          {stats.map((stat, i) => (
            <div
              key={i}
              className={`group flex items-center gap-3.5 px-3 sm:px-5 lg:justify-center cursor-default transition-transform duration-200 hover:-translate-y-0.5 ${
                i === 4 ? "col-span-2 sm:col-span-1 justify-center sm:justify-start" : ""
              }`}
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#FFC107]/25 bg-[#FFC107]/10 text-[#FFC107] group-hover:border-[#FFC107]/60 group-hover:bg-[#FFC107]/20 group-hover:shadow-[0_0_15px_rgba(255,193,7,0.2)] transition-all duration-200">
                <stat.icon size={22} strokeWidth={1.75} />
              </div>
              <div className="text-left">
                <div className="font-[family-name:var(--font-inter-tight)] text-xl sm:text-2xl font-black tracking-tight text-[#0A0A0C] group-hover:text-[#FFC107] transition-colors duration-150">
                  <CountUp value={stat.value} />
                </div>
                <div className="text-[11.5px] sm:text-xs font-medium text-gray-500 leading-tight">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
