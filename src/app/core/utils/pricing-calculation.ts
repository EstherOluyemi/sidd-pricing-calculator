export function calculateMonthlyVolume(
    amountInKobo: number,
    transactionCount: number,
): number | null {
    if (
        !isValidTransactionAmount(amountInKobo) ||
        !isValidTransactionCount(transactionCount)
    ) {
        return null;
    }

    const volume = BigInt(amountInKobo) * BigInt(transactionCount);
    return volume <= BigInt(Number.MAX_SAFE_INTEGER)
        ? Number(volume)
        : null;
}

export function calculateTransactionFee(
    amountInKobo: number,
    rateInBasisPoints: number,
    feeCapInKobo: number,
): number | null {
    if (
        !isValidTransactionAmount(amountInKobo) ||
        !Number.isSafeInteger(rateInBasisPoints) ||
        rateInBasisPoints < 0 ||!isValidTransactionAmount(feeCapInKobo)
    ) {
        return null;
    }

    const calculatedFee =
        (BigInt(amountInKobo) * BigInt(rateInBasisPoints) + 5000n) / 10000n;

    const cappedFee = calculatedFee > BigInt(feeCapInKobo)
        ? BigInt(feeCapInKobo)
        : calculatedFee;

    const fee = Number(cappedFee);

    return Number.isSafeInteger(fee) ? fee : null;
}

export function calculateMonthlyFees(
    feePerTransactionInKobo: number,
    transactionCount: number,
): number | null {
    if (
        !isValidTransactionAmount(feePerTransactionInKobo) ||
        !isValidTransactionCount(transactionCount)
    ) {
        return null;
    }

    const monthlyFees =
        BigInt(feePerTransactionInKobo) * BigInt(transactionCount);

    return monthlyFees <= BigInt(Number.MAX_SAFE_INTEGER)
        ? Number(monthlyFees)
        : null;
}

export function calculateVat(monthlyFeesInKobo: number): number | null {
    if (!isValidTransactionAmount(monthlyFeesInKobo)) {
        return null;
    }

    const vatRateInBasisPoints = 750;

    const vat = Number(
        (BigInt(monthlyFeesInKobo) * BigInt(vatRateInBasisPoints) + 5000n) / 10000n
    );

    return Number.isSafeInteger(vat) ? vat : null;
}


export function calculateTotalCost(
    monthlyFeesInKobo: number,
    vatInKobo: number,
): number | null {
    if (
        !isValidTransactionAmount(monthlyFeesInKobo) ||
        !isValidTransactionAmount(vatInKobo)
    ) {
        return null;
    }

    const totalCost = BigInt(monthlyFeesInKobo) + BigInt(vatInKobo);

    return totalCost <= BigInt(Number.MAX_SAFE_INTEGER)
        ? Number(totalCost)
        : null;
}

export function isValidTransactionCount(count: number): boolean {
    return Number.isSafeInteger(count) && count >= 0;
}

export function isValidTransactionAmount(amountInKobo: number): boolean {
    return Number.isSafeInteger(amountInKobo) && amountInKobo >= 0;
}

export function convertNairaToKobo(amount: string): number | null {
    if (!/^\d+(\.\d{1,2})?$/.test(amount)) {
        return null;
    }

    const [naira, kobo = ''] = amount.split('.');

    const amountInKobo =
        BigInt(naira) * 100n + BigInt(kobo.padEnd(2, '0'));

    return amountInKobo <= BigInt(Number.MAX_SAFE_INTEGER)
        ? Number(amountInKobo)
        : null;
}

export function formatKoboAsNaira(amountInKobo: number): string {
    return new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'NGN',
    }).format(amountInKobo / 100);
}