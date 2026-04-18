import { DomainError } from './errors';

export type Ticker = string & { readonly __brand: 'Ticker' };
const TICKER_PATTERN = /^[A-Z]{1,5}([.-][A-Z]{1,2})?$/;

export class InvalidTickerError extends DomainError {
    constructor(value: string) {
        super(`Invalid ticker: ${JSON.stringify(value)}`);
    }
}

export function Ticker(value: string): Ticker {
    const normalized = value.trim().toUpperCase();
    if (!TICKER_PATTERN.test(normalized)) {
        throw new InvalidTickerError(value);
    }
    return normalized as Ticker;
}

export function tryTicker(value: string): Ticker | null {
    try { return Ticker(value); } catch { return null; }
}