import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { LeadsAdmin } from "@/components/landing/LeadsAdmin";
import { isLeadStoreConfigured, listLeads } from "@/lib/leads/server";
import { countryName } from "@/lib/leads/countries";

/**
 * Leads from the 80% OFF page. Reachable only through the private link (see middleware.ts):
 * the leads are read here on the server and never served by a public API.
 */

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: { absolute: "Leads | CK PropFirm" },
  robots: { index: false, follow: false },
};

export default async function LeadsAdminPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  if (!isLeadStoreConfigured()) {
    return <p className="p-8 text-white/70">Lead storage is not configured (BLOB_READ_WRITE_TOKEN is missing).</p>;
  }

  let error: string | null = null;
  let leads: Awaited<ReturnType<typeof listLeads>> = [];
  try {
    leads = await listLeads();
  } catch (e) {
    console.error("[leads] list failed", e);
    error = "Couldn't load leads from storage. Refresh to try again.";
  }

  return (
    <LeadsAdmin
      error={error}
      leads={leads.map((l) => ({ ...l, countryName: countryName(l.country) }))}
    />
  );
}
