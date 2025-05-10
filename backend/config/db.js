import pg from "pg";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config();

//  Load Supabase credentials from environment variables.
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

//  Initialize Supabase client only if credentials exist
let supabase = null;
if (supabaseUrl && supabaseKey) {
  supabase = createClient(supabaseUrl, supabaseKey);
} else {
  console.warn("⚠ Supabase credentials missing, API client disabled.");
}

//  PostgreSQL connection using pg.Pool
const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});


//  Handle database connection errors gracefully
db.on("error", (err) => {
  console.error("❌ Database connection error:", err);
});

//  Verify PostgreSQL connection at startup
db.query("SELECT 1")
  .then(() => console.log("✅ PostgreSQL database connected successfully"))
  .catch((err) => {
    console.error("❌ PostgreSQL connection failed:", err);
    process.exit(1); // Exit process if the database is unreachable
  });

//  Export both database and Supabase instances
export default db;
export { supabase };