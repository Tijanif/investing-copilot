import Decimal from 'decimal.js';
import { DomainError } from './errors';

export type Money = Decimal & { readonly __brand: 'Money' };

export class InvalidMoneyError extends DomainError {
    constructor(value: unknown) {
        super(`Invalid money value: ${JSON.stringify(value)}`);
    }
}

export function Money(value: string | number): Money {
    // Reject empty or whitespace-only strings
    if (typeof value === 'string' && value.trim() === '') {
        throw new InvalidMoneyError(value);
    }

    let dec: Decimal;
    try {
        dec = new Decimal(value);
    } catch {
        throw new InvalidMoneyError(value);
    }

    if (dec.isNaN() || !dec.isFinite() || dec.isNegative()) {
        throw new InvalidMoneyError(value);
    }

    return dec as unknown as Money;
}

export function tryMoney(value: string | number): Money | null {
    try { return Money(value); } catch { return null; }
}

export const ZERO_MONEY = Money(0);