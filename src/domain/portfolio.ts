import type { Ticker } from './ticker';
import type { Money } from './money';

export interface Position {
    readonly ticker: Ticker;
    readonly shares: Money;
    readonly costBasis: Money;
    readonly purchasedAt: Date;
}

export interface Portfolio {
    readonly id: string;
    readonly userId: string;
    readonly name: string;
    readonly description: string | null;
    readonly positions: readonly Position[];
}