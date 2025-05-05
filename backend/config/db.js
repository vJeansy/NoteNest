import express from 'express';
import pg from 'pg';
import env from 'dotenv';
import { createClient } from "@supabase/supabase-js";

const app = express();
env.config();

const db = new pg.Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
    max: 5, // max number of clients in the pool
    idleTimeoutMillis: 30000, // Close idle clients after 30 secs
});

db.connect()
  .then(() => console.log("Connected to PostgreSQL"))
  .catch((err) => console.error("Database connection failed:", err));

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

  export default db;
  export const supabase = createClient(supabaseUrl, supabaseKey);