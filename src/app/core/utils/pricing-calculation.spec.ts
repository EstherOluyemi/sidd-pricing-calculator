import { describe, it, expect } from "vitest";
import {
    convertNairaToKobo,
    calculateMonthlyVolume,
    calculateTransactionFee,
    calculateMonthlyFees,
    calculateVat,
    calculateTotalCost,
    formatKoboAsNaira,
    isValidTransactionAmount,
    isValidTransactionCount
} from "./pricing-calculation";

describe('convertNairaToKobo', () => {
    it('should convert naira to kobo', () => {
        expect(convertNairaToKobo('100')).toBe(10000);
    });
    it('should convert decimal naira to kobo', () => {
        expect(convertNairaToKobo('100.50')).toBe(10050);
    });

    it('should convert zero correctly', () => {
        expect(convertNairaToKobo('0')).toBe(0);
    });

    it('should return null for empty input', () => {
        expect(convertNairaToKobo('')).toBeNull();
    });

    it('should return null for negative amounts', () => {
        expect(convertNairaToKobo('-100')).toBeNull();
    });

    it('should return null for more than two decimal places', () => {
        expect(convertNairaToKobo('100.555')).toBeNull();
    });

    it('should return null for invalid text', () => {
        expect(convertNairaToKobo('abc')).toBeNull();
    });

    it('should return null for amounts exceeding the safe integer limit', () => {
        expect(convertNairaToKobo('90071992547409.92')).toBeNull();
    });
});

describe('calculateMonthlyVolume', () => {
    it('should calculate the monthly transaction volume', () => {
        expect(calculateMonthlyVolume(1000000, 20)).toBe(20000000);
    });

    it('should return zero when transaction amount is zero', () => {
        expect(calculateMonthlyVolume(0, 20)).toBe(0);
    });

    it('should return zero when transaction count is zero', () => {
        expect(calculateMonthlyVolume(1000000, 0)).toBe(0);
    });

    it('should return null for negative transaction amounts', () => {
        expect(calculateMonthlyVolume(-1000000, 20)).toBeNull();
    });

    it('should return null for negative transaction counts', () => {
        expect(calculateMonthlyVolume(1000000, -20)).toBeNull();
    });

    it('should return null when the result exceeds the safe integer limit', () => {
        expect(calculateMonthlyVolume(Number.MAX_SAFE_INTEGER, 2)).toBeNull();
    });
});

describe('calculateTransactionFee', () => {
    it('should calculate the Starter plan fee at 1.5%', () => {
        expect(calculateTransactionFee(100000, 150, 50000)).toBe(1500);
    });

    it('should calculate the Growth plan fee at 1.2%', () => {
        expect(calculateTransactionFee(100000, 120, 100000)).toBe(1200);
    });

    it('should calculate the Enterprise plan fee at 1.0%', () => {
        expect(calculateTransactionFee(100000, 100, 200000)).toBe(1000);
    });

    it('should return zero when the transaction amount is zero', () => {
        expect(calculateTransactionFee(0, 150, 50000)).toBe(0);
    });

    it('should round the fee to the nearest kobo', () => {
        expect(calculateTransactionFee(101, 150, 50000)).toBe(2);
    });

    it('should return the fee cap when the calculated fee reaches the cap', () => {
        expect(calculateTransactionFee(3333333, 150, 50000)).toBe(50000);
    });

    it('should not allow the fee to exceed the cap', () => {
        expect(calculateTransactionFee(10000000, 150, 50000)).toBe(50000);
    });
});

describe('calculateMonthlyFees', () => {
    it('should calculate the total monthly processing fees', () => {
        expect(calculateMonthlyFees(1500, 100)).toBe(150000);
    });

    it('should return zero when the fee per transaction is zero', () => {
        expect(calculateMonthlyFees(0, 100)).toBe(0);
    });

    it('should return zero when transaction count is zero', () => {
        expect(calculateMonthlyFees(1500, 0)).toBe(0);
    });

    it('should return null for negative fees', () => {
        expect(calculateMonthlyFees(-1500, 100)).toBeNull();
    });

    it('should return null for negative transaction counts', () => {
        expect(calculateMonthlyFees(1500, -100)).toBeNull();
    });

    it('should return null when the result exceeds the safe integer limit', () => {
        expect(calculateMonthlyFees(Number.MAX_SAFE_INTEGER, 2)).toBeNull();
    });
});

describe('calculateVat', () => {
    it('should calculate VAT at 7.5%', () => {
        expect(calculateVat(10000)).toBe(750);
    });

    it('should return zero when monthly fees are zero', () => {
        expect(calculateVat(0)).toBe(0);
    });

    it('should round VAT to the nearest kobo', () => {
        expect(calculateVat(101)).toBe(8);
    });

    it('should return null for negative monthly fees', () => {
        expect(calculateVat(-10000)).toBeNull();
    });
});

describe('calculateTotalCost', () => {
    it('should add monthly fees and VAT correctly', () => {
        expect(calculateTotalCost(10000, 750)).toBe(10750);
    });

    it('should return zero when both amounts are zero', () => {
        expect(calculateTotalCost(0, 0)).toBe(0);
    });

    it('should return null for negative monthly fees', () => {
        expect(calculateTotalCost(-10000, 750)).toBeNull();
    });

    it('should return null for negative VAT', () => {
        expect(calculateTotalCost(10000, -750)).toBeNull();
    });

    it('should return null when the total exceeds the safe integer limit', () => {
        expect(calculateTotalCost(Number.MAX_SAFE_INTEGER, 1)).toBeNull();
    });
});

describe('formatKoboAsNaira', () => {
    it('should format kobo as naira currency', () => {
        expect(formatKoboAsNaira(123456)).toBe('₦1,234.56');
    });

    it('should format zero correctly', () => {
        expect(formatKoboAsNaira(0)).toBe('₦0.00');
    });

    it('should format whole naira amounts with two decimal places', () => {
        expect(formatKoboAsNaira(100000)).toBe('₦1,000.00');
    });
});

describe('isValidTransactionAmount', () => {
    it('should accept a valid whole-number amount', () => {
        expect(isValidTransactionAmount(10000)).toBe(true);
    });

    it('should accept zero', () => {
        expect(isValidTransactionAmount(0)).toBe(true);
    });

    it('should reject negative amounts', () => {
        expect(isValidTransactionAmount(-100)).toBe(false);
    });

    it('should reject decimal amounts', () => {
        expect(isValidTransactionAmount(10.5)).toBe(false);
    });

    it('should reject NaN and Infinity', () => {
        expect(isValidTransactionAmount(NaN)).toBe(false);
        expect(isValidTransactionAmount(Infinity)).toBe(false);
    });

    it('should reject unsafe integers', () => {
        expect(isValidTransactionAmount(Number.MAX_SAFE_INTEGER + 1)).toBe(false);
    });
});

describe('isValidTransactionCount', () => {
    it('should accept a valid whole-number count', () => {
        expect(isValidTransactionCount(100)).toBe(true);
    });

    it('should accept zero', () => {
        expect(isValidTransactionCount(0)).toBe(true);
    });

    it('should reject negative counts', () => {
        expect(isValidTransactionCount(-10)).toBe(false);
    });

    it('should reject decimal counts', () => {
        expect(isValidTransactionCount(10.5)).toBe(false);
    });

    it('should reject NaN and Infinity', () => {
        expect(isValidTransactionCount(NaN)).toBe(false);
        expect(isValidTransactionCount(Infinity)).toBe(false);
    });

    it('should reject unsafe integers', () => {
        expect(isValidTransactionCount(Number.MAX_SAFE_INTEGER + 1)).toBe(false);
    });
});