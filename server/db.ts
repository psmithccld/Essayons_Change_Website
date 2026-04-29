let db: any = null;
let pool: any = null;

const createTablesSQL = `
-- Create admin_users table
CREATE TABLE IF NOT EXISTS admin_users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL
);

-- Create content table
CREATE TABLE IF NOT EXISTS content (
  id SERIAL PRIMARY KEY,
  type VARCHAR(50) NOT NULL,
  title VARCHAR(500) NOT NULL,
  slug VARCHAR(500) NOT NULL UNIQUE,
  summary TEXT,
  body TEXT NOT NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'draft',
  published_at TIMESTAMP,
  scheduled_publish_at TIMESTAMP,
  hero_image_url VARCHAR(1000),
  author_id INTEGER REFERENCES admin_users(id),
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW() NOT NULL
);

-- Add scheduled_publish_at column if it doesn't exist (for existing tables)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'content' AND column_name = 'scheduled_publish_at') THEN
    ALTER TABLE content ADD COLUMN scheduled_publish_at TIMESTAMP;
  END IF;
END $$;

-- Create attachments table
CREATE TABLE IF NOT EXISTS attachments (
  id SERIAL PRIMARY KEY,
  content_id INTEGER NOT NULL REFERENCES content(id),
  kind VARCHAR(50) NOT NULL,
  url VARCHAR(1000) NOT NULL,
  title VARCHAR(500),
  description TEXT,
  file_size INTEGER,
  "order" INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL
);

-- Create contact_messages table
CREATE TABLE IF NOT EXISTS contact_messages (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  subject VARCHAR(500) NOT NULL,
  message TEXT NOT NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'new',
  created_at TIMESTAMP DEFAULT NOW() NOT NULL
);

-- Create website_cards table
CREATE TABLE IF NOT EXISTS website_cards (
  id SERIAL PRIMARY KEY,
  slug VARCHAR(255) NOT NULL UNIQUE,
  section VARCHAR(255) NOT NULL,
  title VARCHAR(500) NOT NULL,
  subtitle VARCHAR(500),
  body TEXT,
  image_url VARCHAR(1000),
  cta_text VARCHAR(255),
  cta_url VARCHAR(1000),
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW() NOT NULL
);

-- Create products_cache table
CREATE TABLE IF NOT EXISTS products_cache (
  id SERIAL PRIMARY KEY,
  product_name VARCHAR(255) NOT NULL UNIQUE,
  product_data JSONB NOT NULL,
  last_synced_at TIMESTAMP DEFAULT NOW() NOT NULL,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL
);
`;

try {
  if (!process.env.DATABASE_URL) {
    console.warn('[DATABASE] DATABASE_URL not set. Database functionality will be unavailable.');
  } else {
    const pg = await import('pg');
    const { drizzle } = await import('drizzle-orm/node-postgres');
    const schema = await import("@shared/schema");

    const Pool = pg.default.Pool;
    
    // Configure SSL for production (Render requires SSL even for internal connections)
    const sslConfig = process.env.NODE_ENV === 'production' 
      ? { ssl: { rejectUnauthorized: false } }
      : {};
    
    pool = new Pool({ 
      connectionString: process.env.DATABASE_URL,
      ...sslConfig
    });
    
    // Test the connection
    await pool.query('SELECT 1');
    
    // Create tables if they don't exist
    console.log('[DATABASE] Ensuring tables exist...');
    await pool.query(createTablesSQL);
    console.log('[DATABASE] Tables ready');
    
    db = drizzle(pool, { schema });
    
    console.log('[DATABASE] PostgreSQL connection established');
  }
} catch (error) {
  console.warn('[DATABASE] Failed to initialize database:', error instanceof Error ? error.message : String(error));
  console.warn('[DATABASE] Application will use in-memory storage');
}

export { db, pool };
