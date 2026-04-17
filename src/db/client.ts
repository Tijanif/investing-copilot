import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { config } from '@/config';
import { logger } from '@/shared/logger';
import * as schema from './schema';

const queryClient = postgres(config.DATABASE_URL, {
    max: config.DB_POOL_MAX,
    idle_timeout: 20,
    connect_timeout: 10,
    onnotice: () => {},         // silence NOTICE spam in logs
});

export const db = drizzle(queryClient, { schema });
export { queryClient as sql };

export async function closeDb(): Promise<void> {
    logger.info('Closing DB connection pool...');
    await queryClient.end({ timeout: 5 });
    logger.info('DB pool closed.');
}