/*==================================================
MANIC MADHOUSE DTF DESIGNS
SUPABASE CONNECTION
VERSION 1.0
==================================================*/

const SUPABASE_URL =
"https://ymkmpsgossabyznwhluk.supabase.co";

const SUPABASE_KEY =
"YOUR_SUPABASE_ANON_KEY";

const supabase =
window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

console.log("Supabase Connected");
