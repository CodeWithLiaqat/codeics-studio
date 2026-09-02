import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(url && anonKey);

if (!isSupabaseConfigured && import.meta.env.DEV) {
  console.warn(
    "[Codeics] Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env.local. Lead submissions will fail until then."
  );
}

export const supabase = isSupabaseConfigured
  ? createClient(url, anonKey, {
      auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
      global: { headers: { "x-client-info": "codeics-web" } },
    })
  : null;

export async function insertLead(lead) {
  if (!supabase) {
    return { data: null, error: new Error("Supabase is not configured.") };
  }
  const payload = {
    name: lead.name.trim(),
    email: lead.email.trim().toLowerCase(),
    service_category: lead.serviceCategory,
    budget_range: lead.budgetRange,
    timeline: lead.timeline,
    message: lead.message.trim(),
    source: lead.source ?? "website",
  };
  return supabase.from("leads").insert(payload);
}
