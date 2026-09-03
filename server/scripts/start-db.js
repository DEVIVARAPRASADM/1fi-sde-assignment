import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function ensureDatabaseRunning() {
  const EmbeddedPostgres = (await import('embedded-postgres')).default;
  const dbDir = path.resolve(__dirname, '../.embedded-postgres');
  
  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
  }

  const pg = new EmbeddedPostgres({
    port: 5432,
    databaseDir: dbDir,
    user: 'postgres',
    password: 'password',
    persistent: true
  });

  const isInitialized = fs.existsSync(path.join(dbDir, 'PG_VERSION'));
  if (!isInitialized) {
    console.log('🐘 Initialising new local PostgreSQL database cluster...');
    await pg.initialise();
  }

  console.log('🐘 Starting PostgreSQL server...');
  await pg.start();
  console.log('✅ PostgreSQL engine active on localhost:5432');

  try {
    await pg.createDatabase('onefi_db');
    console.log('✅ Database "onefi_db" created successfully');
  } catch (err) {
    // Database already exists
  }

  return pg;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  ensureDatabaseRunning().then((pg) => {
    console.log('🚀 Local PostgreSQL is ready.');
    console.log('DATABASE_URL="postgresql://postgres:password@localhost:5432/onefi_db?schema=public"');

    const shutdown = async () => {
      console.log('\n🛑 Stopping PostgreSQL engine...');
      await pg.stop();
      process.exit(0);
    };

    process.on('SIGINT', shutdown);
    process.on('SIGTERM', shutdown);
  }).catch((err) => {
    console.error('Failed to start PostgreSQL:', err);
    process.exit(1);
  });
}
