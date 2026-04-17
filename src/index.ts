import { createApp } from '@/app';
import { config } from '@/config';
import { logger } from '@/shared/logger';
import { closeDb } from '@/db/client';

async function main(): Promise<void> {
    const app = createApp();
    const server = app.listen(config.PORT, () => {
        logger.info(`Investment copilot booting on port ${config.PORT} (${config.NODE_ENV})`);
    });

    const shutdown = async (signal: string) => {
        logger.info(`Received ${signal}. Initiating graceful shutdown...`);

        const forceTimeout = setTimeout(() => {
            logger.error('Shutdown taking too long, forcing exit.');
            process.exit(1);
        }, 10000);

        server.close(async () => {
            clearTimeout(forceTimeout);
            logger.info('HTTP server closed');

            try {
                await closeDb();
                logger.info('Exiting cleanly.');
                process.exit(0);
            } catch (err) {
                logger.error(err, 'Error closing DB during shutdown');
                process.exit(1);
            }
        });
    };

    process.on('SIGTERM', () => void shutdown('SIGTERM'));
    process.on('SIGINT', () => void shutdown('SIGINT'));
}

main().catch((err: unknown) => {
    logger.fatal(err, 'Fatal startup error');
    process.exit(1);
});