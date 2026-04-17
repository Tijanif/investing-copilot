import { pgTable, uuid, text, numeric, timestamp, index } from 'drizzle-orm/pg-core';
import { portfolios } from './portfolios';

export const positions = pgTable('positions', {
    id: uuid('id').primaryKey().defaultRandom(),
    portfolioId: uuid('portfolio_id').references(() => portfolios.id, { onDelete: 'cascade' }).notNull(),
    ticker: text('ticker').notNull(),
    shares: numeric('shares', { precision: 18, scale: 8 }).notNull(),
    costBasis: numeric('cost_basis', { precision: 18, scale: 8 }).notNull(),
    purchasedAt: timestamp('purchased_at', { withTimezone: true }).notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
}, (table) => [
    index('positions_portfolio_id_idx').on(table.portfolioId),
]);

export type Position = typeof positions.$inferSelect;
export type NewPosition = typeof positions.$inferInsert;