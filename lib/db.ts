import { Pool } from "pg";

let pool: Pool | null = null;

export function getPool(): Pool {
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });
  }
  return pool;
}

export async function query(
  text: string,
  params?: (string | number | number[] | boolean | null)[]
) {
  const pool = getPool();
  return pool.query(text, params);
}
