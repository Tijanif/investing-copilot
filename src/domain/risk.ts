export type RiskTolerance = 'conservative' | 'moderate' | 'aggressive';
export type TimeHorizon = 'short' | 'medium' | 'long';
export interface RiskProfile {
    readonly tolerance: RiskTolerance;
    readonly horizon: TimeHorizon;
    readonly notes?: string;
}