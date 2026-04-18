import type { Ticker } from './ticker';
import type { RiskProfile } from './risk';

export type AnalysisType = 'micro' | 'macro';
export type AnalysisStatus = 'pending' | 'running' | 'succeeded' | 'failed';

export interface MicroAnalysisInput { readonly ticker: Ticker; }
export interface MacroAnalysisInput {
    readonly portfolioId: string;
    readonly riskProfile: RiskProfile;
}

export type AnalysisInput = MicroAnalysisInput | MacroAnalysisInput;

export interface AnalysisRun {
    readonly id: string;
    readonly userId: string;
    readonly type: AnalysisType;
    readonly input: AnalysisInput;
    readonly status: AnalysisStatus;
    readonly output?: unknown;
    readonly durationMs?: number;
    readonly createdAt: Date;
}

export type ToolResult =
    | { readonly kind: 'live_price'; readonly ticker: Ticker; readonly price: number; readonly fetchedAt: Date }
    | { readonly kind: 'portfolio_weights'; readonly weights: ReadonlyMap<Ticker, number> }
    | { readonly kind: 'risk_metrics'; readonly concentration: number; readonly volatility: number };