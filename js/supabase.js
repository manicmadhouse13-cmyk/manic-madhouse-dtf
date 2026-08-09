/*==================================================
MANIC MADHOUSE DTF DESIGNS
SUPABASE CONNECTION
VERSION 2.0
==================================================*/

const SUPABASE_URL =
"https://sbrixpwtvhaundmtilpa.supabase.co";


const SUPABASE_KEY =
const SUPABASE_KEY =
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.your_full_key_here";


const db = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

window.db = db;

alert("DB CREATED: " + (window.db !== undefined));

console.log("✅ Supabase Connected");
