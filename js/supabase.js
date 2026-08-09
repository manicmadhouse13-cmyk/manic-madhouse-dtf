/*==================================================
MANIC MADHOUSE DTF DESIGNS
SUPABASE CONNECTION
VERSION 2.0
==================================================*/

const SUPABASE_URL =
"https://sbrixpwtvhaundmtilpa.supabase.co";


const SUPABASE_KEY =
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNicml4cHd0dmhhdW5kbXRpbHBhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYxNzI5NDcsImV4cCI6MjEwMTc


const db = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

window.db = db;

console.log("✅ Supabase Connected");
