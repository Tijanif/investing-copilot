import { pgTable, uuid, text, timestamp, jsonb } from 'drizzle-orm/pg-core';
import { vector } from 'drizzle-orm/pg-core';

export const documents = pgTable('documents', {
    id: uuid('id').primaryKey().defaultRandom(),
    ticker: text('ticker'),
    source: text('source').notNull(),
    title: text('title').notNull(),
    content: text('content').notNull(),
    embedding: vector('embedding', { dimensions: 1024 }).notNull(),
    publishedAt: timestamp('published_at', { withTimezone: true }).notNull(),
    asOf: timestamp('as_of', { withTimezone: true }).notNull(),
    metadata: jsonb('metadata'),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
});

export type Document = typeof documents.$inferSelect;
export type NewDocument = typeof documents.$inferInsert;