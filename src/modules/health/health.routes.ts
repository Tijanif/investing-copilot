import { Router, Request, Response } from 'express';
import { config } from '@/config';
import { sql as pg } from '@/db/client';
import { logger } from '@/shared/logger';

export const healthRouter = Router();

const READINESS_TIMEOUT_MS = 2000;

interface HealthResponse {
    status: 'ok' | 'degraded' | 'error';
    timestamp: string;
    uptime: number;
    version: string;
}

// 1. Liveness Probe (Are you awake?)
healthRouter.get('/', (_req: Request, res: Response<HealthResponse>) => {
    res.status(200).json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        uptime: Math.round(process.uptime() * 10) / 10,
        version: config.VERSION,
    });
});

// 2. Readiness Probe (Do you have your tools?)
healthRouter.get('/ready', async (_req: Request, res: Response) => {
    try {
        // Race the DB check against a 2-second timeout
        await Promise.race([
            pg`SELECT 1`,
            new Promise((_, reject) =>
                setTimeout(() => reject(new Error('db_check_timeout')), READINESS_TIMEOUT_MS),
            ),
        ]);
        res.status(200).json({ status: 'ready', db: 'ok' });
    } catch (err) {
        logger.warn(err, 'Readiness check failed');
        res.status(503).json({ status: 'not_ready', db: 'unreachable' });
    }
});