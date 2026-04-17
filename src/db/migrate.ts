import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';
import { config } from '@/config';
import { logger } from '@/shared/logger';

async function runMigrations(): Promise<void> {
    // max: 1 is critical so the migrator doesn't leave ghost connections open
    const client = postgres(config.DATABASE_URL, { max: 1 });
    const db = drizzle(client);

    try {
        logger.info('Running migrations...');
        await migrate(db, { migrationsFolder: './src/db/migrations' });
        logger.info('Migrations complete.');
    } finally {
        await client.end();
    }
}

runMigrations().catch((err) => {
    logger.error(err, 'Migration failed');
    process.exit(1);
});