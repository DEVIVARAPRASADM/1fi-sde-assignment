import dotenv from 'dotenv';
dotenv.config();

import app from './app.js';
import prisma from './db.js';
import { ensureDatabaseRunning } from '../scripts/start-db.js';

const PORT = process.env.PORT || 5000;
let pgInstance = null;

async function startServer() {
  try {
    // If DATABASE_URL points to localhost and we are in local development, ensure local postgres is running
    const dbUrl = process.env.DATABASE_URL || '';
    if (dbUrl.includes('localhost') || dbUrl.includes('127.0.0.1')) {
      try {
        pgInstance = await ensureDatabaseRunning();
      } catch (err) {
        console.warn('⚠️ Local Postgres starter note:', err.message);
      }
    }

    // Verify DB connectivity via Prisma
    await prisma.$connect();
    console.log('✅ Connected to PostgreSQL database via Prisma');

    const server = app.listen(PORT, () => {
      console.log(`🚀 1Fi API server running on http://localhost:${PORT}`);
      console.log(`📡 Endpoints:`);
      console.log(`   - GET http://localhost:${PORT}/api/health`);
      console.log(`   - GET http://localhost:${PORT}/api/products`);
      console.log(`   - GET http://localhost:${PORT}/api/products/:slug`);
    });

    // Graceful shutdown handling
    const gracefulShutdown = async (signal) => {
      console.log(`\n🛑 Received ${signal}. Shutting down gracefully...`);
      server.close(async () => {
        console.log('🔒 HTTP server closed');
        await prisma.$disconnect();
        console.log('🔒 Database connection disconnected');
        if (pgInstance) {
          try {
            await pgInstance.stop();
            console.log('🔒 Embedded PostgreSQL engine stopped');
          } catch (e) {}
        }
        process.exit(0);
      });
    };

    process.on('SIGINT', () => gracefulShutdown('SIGINT'));
    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
