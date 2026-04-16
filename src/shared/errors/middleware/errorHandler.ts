import { Request, Response, NextFunction } from 'express';
import { AppError } from '@/shared/errors';
import { ApiResponse } from '@/shared/types';
import { logger } from '@/shared/logger';

export function errorHandler(
    err: unknown,
    _req: Request,
    res: Response<ApiResponse<undefined>>,
    _next: NextFunction,
): void {

    // 1. Handle Expected, Operational Errors
    if (err instanceof AppError && err.isOperational) {
        res.status(err.statusCode).json({
            success: false,
            error: err.message,
        });
        return;
    }

    // 2. Handle Unexpected, Programmer Errors (Bugs)
    // We log the full stack trace for our own debugging
    logger.error('❌ Unhandled Server Error:');

    // But we hide the details from the user
        res.status(500).json({
            success: false,
            error: 'Internal server error',
        });
}