/*==================================================
MANIC MADHOUSE DTF DESIGNS
SUPABASE CONNECTION
VERSION 2.0
==================================================*/

const SUPABASE_URL =
"https://sbrixpwtvhaundmtilpa.supabase.co";


const SUPABASE_KEY =
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9....your full key here";


const db = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

window.db = db;

console.log("✅ Supabase Connected");
