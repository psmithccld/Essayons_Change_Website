let db: any = null;
let pool: any = null;

try {
  if (!process.env.DATABASE_URL) {
    console.warn('[DATABASE] DATABASE_URL not set. Database functionality will be unavailable.');
  } else {
    const { Pool, neonConfig } = await import('@neondatabase/serverless');
    const { drizzle } = await import('drizzle-orm/neon-serverless');
    const ws = await import("ws");
    const schema = await import("@shared/schema");

    neonConfig.webSocketConstructor = ws.default;

    pool = new Pool({ connectionString: process.env.DATABASE_URL });
    db = drizzle({ client: pool, schema });
    
    console.log('[DATABASE] PostgreSQL connection established');
  }
} catch (error) {
  console.warn('[DATABASE] Failed to initialize database:', error instanceof Error ? error.message : String(error));
  console.warn('[DATABASE] Application will use in-memory storage');
}

export { db, pool };
