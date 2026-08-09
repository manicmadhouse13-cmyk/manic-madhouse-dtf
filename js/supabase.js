/*==================================================
MANIC MADHOUSE DTF DESIGNS
SUPABASE CONNECTION
==================================================*/

const SUPABASE_URL =
"https://sbrixpwtvhaundmtilpa.supabase.co";

const SUPABASE_KEY =
"PASTE YOUR COMPLETE ANON KEY HERE";

const db = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

window.db = db;

console.log("✅ Supabase Connected");
