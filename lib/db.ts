import { Pool } from "pg";

let pool: Pool | null = null;

export function getPool(): Pool {
  if (!pool) {
    const databaseUrl = process.env.DATABASE_URL;

    if (
      !databaseUrl ||
      typeof databaseUrl !== "string" ||
      databaseUrl.trim() === ""
    ) {
      throw new Error(
        "Environment variable DATABASE_URL is missing or invalid. Please set it to a valid PostgreSQL connection string."
      );
    }
    pool = new Pool({
      connectionString: databaseUrl,
    });
  }
  return pool;
}

export async function query(
  text: string,
  params?: (string | number | boolean | null)[]
) {
  const pool = getPool();
  return pool.query(text, params);
}
