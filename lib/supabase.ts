import { createClient } from "https://esm.sh/@supabase/supabase-js@2.31.0";

const SUPABASE_PROJECT_URL = Deno.env.get("SUPABASE_PROJECT_URL") ||
  "https://please.define.url.com";
const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY") ||
  "https://please.define.key.com";

const supabase = createClient(SUPABASE_PROJECT_URL, SUPABASE_ANON_KEY, {
  auth: { persistSession: false },
});

export default supabase;
