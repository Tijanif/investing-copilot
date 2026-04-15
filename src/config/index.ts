import { z } from 'zod';
import dotenv from 'dotenv';

if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
}

const envSchema = z.object({
    // Server
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
    PORT: z.string().transform((val) => parseInt(val, 10)).pipe(z.number().min(1).max(
        65535
    )),

    // Database
    DATABASE_URL: z.string().url(),

    // Anthropic
    ANTHROPIC_API_KEY: z.string().min(1),

    // Add keys her as new services are wired in

});

// The type of our validated config - derived from the schema - not handwritten
export type AppConfig = z.infer<typeof envSchema>;

function validateEnv(): AppConfig {
    const parsed = envSchema.safeParse(process.env);

    if (!parsed.success) {
        console.error('❌ Invalid environment variables:', parsed.error.flatten().fieldErrors);
        process.exit(1);
    }
    return parsed.data;
}

export const config = validateEnv();