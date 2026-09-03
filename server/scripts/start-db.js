import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startDatabase() {
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

  console.log('🐘 Initialising and starting PostgreSQL engine...');
  await pg.initialise();
  await pg.start();
  console.log('✅ PostgreSQL engine active on localhost:5432');

  try {
    await pg.createDatabase('onefi_db');
    console.log('✅ Database "onefi_db" created successfully');
  } catch (err) {
    if (err.message && err.message.includes('already exists')) {
      console.log('ℹ️ Database "onefi_db" already exists');
    } else {
      console.log('ℹ️ Note on database creation:', err.message);
    }
  }

  const shutdown = async () => {
    console.log('\n🛑 Stopping PostgreSQL engine...');
    await pg.stop();
    process.exit(0);
  };

  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);

  console.log('🚀 Local PostgreSQL is ready for Prisma migrations and Express queries.');
  console.log('DATABASE_URL="postgresql://postgres:password@localhost:5432/onefi_db?schema=public"');
}

startDatabase().catch(err => {
  console.error('Failed to start PostgreSQL:', err);
  process.exit(1);
});
