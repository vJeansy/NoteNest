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
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
  ssl: { rejectUnauthorized: false }, //  Required for remote connections
  max: 5, //  Connection pool size (prevents overload)
  idleTimeoutMillis: 30000, //  Timeout for inactive connections
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