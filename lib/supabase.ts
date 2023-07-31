import { createClient } from "https://esm.sh/@supabase/supabase-js@2.31.0";

const SUPABASE_PROJECT_URL = Deno.env.get("SUPABASE_PROJECT_URL") || "please-define-url";
const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY") || "please-define-key";

const supabase = createClient(SUPABASE_PROJECT_URL, SUPABASE_ANON_KEY);

export default supabase;
