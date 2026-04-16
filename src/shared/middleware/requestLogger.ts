import pinoHttp from 'pino-http';
import { logger } from '@/shared/logger';

export const requestLogger = pinoHttp({
    logger,
    customLogLevel: (_req, res, err) => {
        if (res.statusCode >= 500 || err) return 'error';
        if (res.statusCode >= 400 && res.statusCode < 500) return 'warn';
        return 'info';
    },
    redact: ['req.headers.authorization'], // redact sensitive info
});