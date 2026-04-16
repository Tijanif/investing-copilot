// entry point — wired properly in Topic 1.6 (app factory)
// this stub exists, so the toolchain has something to compile

import { config } from './config';
import { logger } from './shared/logger';


async function main(): Promise<void> {
    logger.info(`Investment copilot booting on port ${config.PORT} (${config.NODE_ENV})`);
}


main().catch(() => {
    logger.fatal('Fatal startup error:');
    process.exit(1);
});