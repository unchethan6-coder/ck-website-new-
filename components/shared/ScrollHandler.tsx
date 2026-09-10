"use client";

import { useEffect } from "react";
import { usePathname } from "@/i18n/navigation";

export function ScrollHandler() {
  const pathname = usePathname();

  useEffect(() => {
    // Disable automatic browser scroll restoration so our explicit scroll logic is deterministic
    if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const hash = window.location.hash.replace("#", "");

    if (hash) {
      // If a specific ID is in the URL, attempt to scroll to that element
      let attempts = 0;
      const maxAttempts = 15;
      const interval = setInterval(() => {
        attempts++;
        const el = document.getElementById(hash);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
          clearInterval(interval);
        } else if (attempts >= maxAttempts) {
          clearInterval(interval);
          // If the element ID is not found after polling, fallback to top 0
          window.scrollTo({ top: 0, left: 0, behavior: "instant" });
        }
      }, 40);

      return () => clearInterval(interval);
    } else {
      // No specific ID -> always scroll to 0
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      const raf = requestAnimationFrame(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      });
      const timeout = setTimeout(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      }, 50);

      return () => {
        cancelAnimationFrame(raf);
        clearTimeout(timeout);
      };
    }
  }, [pathname]);

  return null;
}
