import { describe, it, expect } from 'vitest';
import { Money, tryMoney, InvalidMoneyError } from './money';

describe('Money', () => {
    it.each([
        ['100.50', '100.5'],
        ['0', '0'],
        ['1.234567890123456789', '1.234567890123456789'],
        [500, '500'],
        [0, '0'],
    ])('accepts valid money: %s', (input, expected) => {
        const result = Money(input);
        expect(result.toString()).toBe(expected);
    });

    it.each([
        '-100.50',
        -50,
        'NaN',
        NaN,
        'Infinity',
        Infinity,
        '-Infinity',
        'abc',
        '',
        '   ',
    ])('rejects invalid money: %s', (input) => {
        expect(() => Money(input as any)).toThrow(InvalidMoneyError);
    });

    it('tryMoney returns null on invalid instead of throwing', () => {
        expect(tryMoney(-50)).toBeNull();
    });
});