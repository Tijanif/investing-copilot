// entry point — wired properly in Topic 1.6 (app factory)
// this stub exists, so the toolchain has something to compile

import { config } from './config';


async function main(): Promise<void> {
    console.log(`Investment copilot booting on port ${config.PORT} (${config.NODE_ENV})`);
}


main().catch((err: unknown) => {
    console.error('Fatal startup error:', err);
    process.exit(1);
});