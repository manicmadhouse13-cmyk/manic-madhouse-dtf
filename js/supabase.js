/*==================================================
MANIC MADHOUSE DTF DESIGNS
SUPABASE CONNECTION
VERSION 2.0
==================================================*/

const SUPABASE_URL =
"https://ymkmpsgossabyznwhluk.supabase.co";

const SUPABASE_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlta21wc2dvc3NhYnl6bndobHVrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ1NDE0MTEsImV4cCI6MjEwMDExNzQxMX0.5YLtkFTon-5Qkm_hIBwcQb-0JZFCTyNw1QnlAzerxAg";

const db = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

window.db = db;

console.log("✅ Supabase Connected");
