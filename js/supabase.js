alert("SUPABASE FILE LOADED");
/*==================================================
MANIC MADHOUSE DTF DESIGNS
SUPABASE CONNECTION
VERSION 2.0
==================================================*/

<script src="js/supabase.js?v=2"></script>alert("SUPABASE FILE LOADED");

alert("SUPABASE LIBRARY: " + (window.supabase !== undefined));

const SUPABASE_URL =
"https://sbrixpwtvhaundmtilpa.supabase.co";


const SUPABASE_KEY =
"PASTE YOUR FULL ANON KEY HERE";


const db = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

window.db = db;

alert("DB CREATED: " + (window.db !== undefined));

console.log("✅ Supabase Connected");
