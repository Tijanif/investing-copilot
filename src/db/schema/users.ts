import { pgTable, uuid, text, timestamp, jsonb } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
    id: uuid('id').primaryKey().defaultRandom(),
    email: text('email').notNull().unique(),
    name: text('name').notNull(),
    riskProfile: jsonb('risk_profile').$type<RiskProfile>(),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});

export interface RiskProfile {
    tolerance: 'conservative' | 'moderate' | 'aggressive';
    horizon: 'short' | 'medium' | 'long';
    notes?: string;
}

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;