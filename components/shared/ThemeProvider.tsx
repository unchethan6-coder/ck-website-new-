"use client";
import { createContext, useCallback, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light";

interface ThemeContextValue {
  theme: Theme;
  setTheme: (t: Theme) => void;
  toggle: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Null during SSR AND during the first client render (hydration), so the
  // server DOM and the hydrated tree always match — no hydration mismatch.
  // The real theme is resolved in an effect below, mirroring the class the
  // pre-hydration boot script applied to <html>.
  const [theme, setThemeState] = useState<Theme | null>(null);
  const resolved = theme ?? "dark";

  const applyTheme = useCallback((t: Theme) => {
    const root = document.documentElement;
    root.classList.toggle("light", t === "light");
    root.classList.toggle("dark", t === "dark");
    try {
      localStorage.setItem("ck-theme", t);
      // Cookie lets the server read the preference on page navigation,
      // so the HTML is rendered with the right class from the start (no flash).
      document.cookie = `ck-theme=${t};path=/;max-age=${365 * 24 * 60 * 60};SameSite=Lax`;
    } catch {}
    setThemeState(t);
  }, []);

  const toggle = useCallback(() => {
    applyTheme(resolved === "dark" ? "light" : "dark");
  }, [resolved, applyTheme]);

  useEffect(() => {
    // Resolve the theme the boot script already applied to <html>.
    setThemeState(document.documentElement.classList.contains("light") ? "light" : "dark");
  }, []);

  // Sync across tabs
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === "ck-theme" && (e.newValue === "dark" || e.newValue === "light")) {
        applyTheme(e.newValue);
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [applyTheme]);

  return (
    <ThemeContext.Provider value={{ theme: resolved, setTheme: applyTheme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside <ThemeProvider>");
  return ctx;
}
