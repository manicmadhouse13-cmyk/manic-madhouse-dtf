/*==================================================
MANIC MADHOUSE DTF DESIGNS
SUPABASE CONNECTION
PRODUCTION VERSION
==================================================*/


const SUPABASE_URL =
"https://ymkmpsgossabyznwhluk.supabase.co";


const SUPABASE_KEY =
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNicml4cHd0dmhhdW5kbXRpbHBhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYxNzI5NDcsImV4cCI6MjEwMTc"


window.db = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);


console.log("✅ Supabase Connected");
