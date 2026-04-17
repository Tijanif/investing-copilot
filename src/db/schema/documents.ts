import { pgTable, uuid, text, timestamp, jsonb, vector, index } from 'drizzle-orm/pg-core';

export const documents = pgTable('documents', {
    id: uuid('id').primaryKey().defaultRandom(),
    ticker: text('ticker'),
    source: text('source').notNull(),
    title: text('title').notNull(),
    content: text('content').notNull(),
    embedding: vector('embedding', { dimensions: 1024 }),
    publishedAt: timestamp('published_at', { withTimezone: true }).notNull(),
    asOf: timestamp('as_of', { withTimezone: true }).notNull(),
    metadata: jsonb('metadata'),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
}, (table) => [
    index('documents_embedding_idx').using('hnsw', table.embedding.op('vector_cosine_ops')),
    index('documents_ticker_idx').on(table.ticker),
]);

export type Document = typeof documents.$inferSelect;
export type NewDocument = typeof documents.$inferInsert;