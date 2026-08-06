import { NextResponse } from "next/server";

/**
 * Live ticker proxy — fetches real crypto spot prices from CoinGecko's free tier
 * (no API key required, ~10–30 req/min limit).
 *
 * Cached at the edge for 30 seconds so any number of client polls only cost one
 * upstream call per instance per 30s window.
 */

export const revalidate = 30;

const COINGECKO_IDS = ["bitcoin", "ethereum", "dogecoin", "tether", "solana"] as const;
type CGId = (typeof COINGECKO_IDS)[number];

// Map CoinGecko id → our internal symbol
const SYMBOL_MAP: Record<CGId, string> = {
  bitcoin: "BTC",
  ethereum: "ETH",
  dogecoin: "DOGE",
  tether: "USDT",
  solana: "SOL",
};

interface LivePrice {
  symbol: string;
  price: number;
  changePct24h: number;
}

interface CoinGeckoResponse {
  [id: string]: { usd: number; usd_24h_change?: number };
}

export async function GET() {
  try {
    const url = new URL("https://api.coingecko.com/api/v3/simple/price");
    url.searchParams.set("ids", COINGECKO_IDS.join(","));
    url.searchParams.set("vs_currencies", "usd");
    url.searchParams.set("include_24hr_change", "true");

    const res = await fetch(url.toString(), {
      // Next.js will cache this for `revalidate` seconds
      next: { revalidate: 30 },
      headers: { Accept: "application/json" },
    });

    if (!res.ok) {
      return NextResponse.json(
        { ok: false, error: `Upstream ${res.status}`, prices: [] as LivePrice[] },
        { status: 200 } // Return 200 so the client falls back to simulated silently
      );
    }

    const data = (await res.json()) as CoinGeckoResponse;
    const prices: LivePrice[] = COINGECKO_IDS.flatMap((id) => {
      const row = data[id];
      if (!row || typeof row.usd !== "number") return [];
      return [
        {
          symbol: SYMBOL_MAP[id],
          price: row.usd,
          changePct24h:
            typeof row.usd_24h_change === "number" ? row.usd_24h_change : 0,
        },
      ];
    });

    return NextResponse.json({ ok: true, prices, fetchedAt: Date.now() });
  } catch (err) {
    return NextResponse.json(
      {
        ok: false,
        error: err instanceof Error ? err.message : "unknown",
        prices: [] as LivePrice[],
      },
      { status: 200 }
    );
  }
}
