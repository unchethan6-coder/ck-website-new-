"use client";

import { useTranslations } from "next-intl";
import {
  RefreshCw,
  Clock,
  Calendar,
  Monitor,
  GraduationCap,
} from "lucide-react";

export function FeatureStrip() {
  const t = useTranslations("featureStrip");

  const features = [
    {
      icon: RefreshCw,
      title: t("fastPayouts"),
      description: t("fastPayoutsDesc"),
    },
    {
      icon: Clock,
      title: t("noTimeLimits"),
      description: t("noTimeLimitsDesc"),
    },
    {
      icon: Calendar,
      title: t("economicCalendar"),
      description: t("economicCalendarDesc"),
    },
    {
      icon: Monitor,
      title: t("advancedPlatform"),
      description: t("advancedPlatformDesc"),
    },
    {
      icon: GraduationCap,
      title: t("education"),
      description: t("educationDesc"),
    },
  ];

  return (
    <section
      className="relative z-20 border-y border-gray-200 bg-white py-10 sm:py-12"
      data-od-id="feature-strip"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5 lg:gap-8 lg:divide-x lg:divide-gray-200">
          {features.map((item, idx) => (
            <div
              key={item.title}
              className={`group flex items-start gap-3.5 px-2 sm:px-4 cursor-default transition-transform duration-200 hover:-translate-y-0.5 ${
                idx === 4 ? "sm:col-span-1" : ""
              }`}
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#FFC107]/25 bg-[#FFC107]/10 text-[#FFC107] group-hover:border-[#FFC107]/60 group-hover:bg-[#FFC107]/20 group-hover:shadow-[0_0_15px_rgba(255,193,7,0.2)] transition-all duration-200">
                <item.icon size={22} strokeWidth={1.75} />
              </div>
              <div className="text-left">
                <h4 className="font-[family-name:var(--font-inter-tight)] text-[14px] font-black text-[#0A0A0C] group-hover:text-[#FFC107] transition-colors duration-150">
                  {item.title}
                </h4>
                <p className="mt-1 text-[11.5px] leading-relaxed text-gray-500">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
