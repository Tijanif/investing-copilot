// entry point — wired properly in Topic 1.6 (app factory)
// this stub exists, so the toolchain has something to compile

async function main(): Promise<void> {
    console.log('Investment copilot booting…');
}

main().catch((err: unknown) => {
    console.error('Fatal startup error:', err);
    process.exit(1);
});