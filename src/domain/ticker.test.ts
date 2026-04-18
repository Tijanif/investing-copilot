import { describe, it, expect } from 'vitest';
import { Ticker, tryTicker, InvalidTickerError } from './ticker';

describe('Ticker', () => {
    it.each(['AAPL', 'MSFT', 'BRK.B', 'RDS-A', 'A', 'googl'])(
        'accepts valid ticker: %s',
        (input) => {
            expect(() => Ticker(input)).not.toThrow();
        },
    );
    it('normalizes to uppercase and trims', () => {
        expect(Ticker('  aapl  ')).toBe('AAPL');
    });
    it.each(['', '  ', 'TOOLONGGG', '123', 'A A', '$$$', 'BRK..B'])(
        'rejects invalid ticker: %s',
        (input) => {
            expect(() => Ticker(input)).toThrow(InvalidTickerError);
        },
    );
    it('tryTicker returns null on invalid instead of throwing', () => {
        expect(tryTicker('nope nope')).toBeNull();
    });
});