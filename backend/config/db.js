import pg from "pg";
import dotenv from "dotenv";

dotenv.config();
//console.log("🔍 Loaded ENV:", process.env.LOCAL_DB);

//  PostgreSQL connection using pg.Pool
const db = new pg.Pool({
  connectionString: process.env.LOCAL_DB || process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false,
});

//For local development, set ssl to false
/* const db = new pg.Pool({
  connectionString: process.env.LOCAL_DB || process.env.DATABASE_URL,
  ssl: false,
});*/

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