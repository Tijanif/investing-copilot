import { createApp } from './app';
import { config } from './config';
import { logger } from './shared/logger';


async function main(): Promise<void> {
    const app = createApp();
    const server = app.listen(config.PORT, () => {
        logger.info(`Investment copilot booting on port ${config.PORT} (${config.NODE_ENV})`);
    });

    // Greceful shutdown
    const shutdown = (signal: string) => {
        logger.info(`Received ${signal}, Initiating graceful shutdown...`);

    // Guard: Force exit if draining connections takes longer than 10 seconds
    const forceTimeout = setTimeout(() => {
        logger.error('Shutdown taking too long, forcing exit.');
        process.exit(1);
    }, 10000);

    // Stop accepting new connections and finish existing ones
    server.close(() => {
        clearTimeout(forceTimeout);
        logger.info('Closed all remaining connections. Exiting cleanly.');
        process.exit(0);
    });
    };

    // Listen for shutdown signals
    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGINT', () => shutdown('SIGINT'));
}


main().catch((_err: unknown) => {
    logger.fatal('Fatal startup error:');
    process.exit(1);
});