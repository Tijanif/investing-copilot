import { Router, Request, Response } from 'express';
import { config } from '@/config';

export const healthRouter = Router();

interface HealthResponse {
    status: 'ok' | 'degraded' | 'error';
    timestamp: string;
    uptime: number;
    version: string;
    checks: Record<string, 'ok' | 'error'>;
}

healthRouter.get('/', (_req: Request, res: Response<HealthResponse>) => {
    res.status(200).json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        uptime: Math.round(process.uptime() * 10) / 10,
        version: config.VERSION,
        checks: {
            database: 'ok', // Placeholder for Topic 1.8/DB
        },
    });
});