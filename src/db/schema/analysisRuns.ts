import { pgTable, uuid, text, timestamp, jsonb, integer, pgEnum, index } from 'drizzle-orm/pg-core';
import { users } from './users';

export const runTypeEnum = pgEnum('run_type', ['micro', 'macro']);

export const analysisRuns = pgTable('analysis_runs', {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id').references(() => users.id).notNull(),
    type: runTypeEnum('type').notNull(),
    input: jsonb('input').notNull(),
    output: jsonb('output'),
    status: text('status').$type<'pending' | 'complete' | 'failed'>().default('pending').notNull(),
    durationMs: integer('duration_ms'),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
}, (table) => [
    index('analysis_runs_user_id_idx').on(table.userId),
]);

export type AnalysisRun = typeof analysisRuns.$inferSelect;
export type NewAnalysisRun = typeof analysisRuns.$inferInsert;