let db: any = null;
let pool: any = null;

try {
  if (!process.env.DATABASE_URL) {
    console.warn('[DATABASE] DATABASE_URL not set. Database functionality will be unavailable.');
  } else {
    const pg = await import('pg');
    const { drizzle } = await import('drizzle-orm/node-postgres');
    const schema = await import("@shared/schema");

    const Pool = pg.default.Pool;
    pool = new Pool({ connectionString: process.env.DATABASE_URL });
    
    // Test the connection
    await pool.query('SELECT 1');
    
    db = drizzle(pool, { schema });
    
    console.log('[DATABASE] PostgreSQL connection established');
  }
} catch (error) {
  console.warn('[DATABASE] Failed to initialize database:', error instanceof Error ? error.message : String(error));
  console.warn('[DATABASE] Application will use in-memory storage');
}

export { db, pool };
