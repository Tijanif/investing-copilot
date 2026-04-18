import type { Ticker } from './ticker';

export type DocumentSource = 'sec_10k' | 'sec_10q' | 'sec_8k' | 'news' | 'earnings_call' | 'analyst_report';

export interface Document {
    readonly id: string;
    readonly ticker: Ticker[];
    readonly source: DocumentSource;
    readonly title: string;
    readonly content: string;
    readonly publishedAt: Date;
    readonly asOf: Date;
}

export interface RetrievedChunk {
    readonly documentId: string;
    readonly ticker: Ticker[];
    readonly source: DocumentSource;
    readonly content: string;
    readonly publishedAt: Date;
    readonly asOf: Date;
    readonly score: number;
}