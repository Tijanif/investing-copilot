import express, { Application } from 'express';
import { requestLogger } from '@/shared/middleware/requestLogger';
import { errorHandler } from '@/shared/errors/middleware/errorHandler';
import { microRouter } from '@/modules/micro/micro.routes';
import { macroRouter } from '@/modules/macro/macro.routes';
import {NotFoundError} from "@/shared/errors";
import {healthRouter} from "@/modules/health/health.routes";

export function createApp(): Application {
    const app = express();

    // 1. Request Logger (Fires immediately for every inbound request)
    app.use(requestLogger);

    // 2. Body Parser (Parses JSON bodies up to 10mb)
    app.use(express.json({ limit: '10mb' }));

    app.use('/health', healthRouter);

    // 3. Mount Module Routers
    app.use('/api/micro', microRouter);
    app.use('/api/macro', macroRouter);

    // 4. Catch-all for undefined routes (Fires if no router matched the URL)
    app.use((_req, _res, next) => {
        next(new NotFoundError('Route'));
    });

    // 5. Global Error Handler (Always last, catches everything thrown above)
    app.use(errorHandler);

    return app;
}