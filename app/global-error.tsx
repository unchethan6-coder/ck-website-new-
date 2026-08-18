"use client";

// Next.js renders this boundary when an error escapes the app layout. It must
// be a Client Component and cannot rely on app-level providers (they may be
// the thing that crashed). Keep it dependency-free so the error page always
// renders, including during the synthetic /_global-error prerender.
export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en" dir="ltr">
      <body style={{ margin: 0, background: "#0b0a07", color: "#f4f6f8", fontFamily: "system-ui, sans-serif" }}>
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 16,
            textAlign: "center",
            padding: 24,
          }}
        >
          <div style={{ fontSize: 48, fontWeight: 800 }}>Something went wrong</div>
          <p style={{ maxWidth: 480, color: "#9aa2ad" }}>
            An unexpected error occurred. You can reload the page to try again.
          </p>
          <button
            onClick={() => reset()}
            style={{
              background: "#d4af37",
              color: "#0b0a07",
              border: "none",
              borderRadius: 12,
              padding: "12px 28px",
              fontSize: 15,
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
