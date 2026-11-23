
import {
    calculateMonthlyVolume,
    calculateTransactionFee,
    calculateMonthlyFees,
    calculateVat,
    calculateTotalCost,
    formatKoboAsNaira,
} from './src/app/core/utils/pricing-calculation';

const amountInKobo = 1_000_000; // ₦10,000
const transactionCount = 20;
const rateInBasisPoints = 150;

// Perform calculations
const volume = calculateMonthlyVolume(amountInKobo, transactionCount);

const feePerTransaction = calculateTransactionFee(
    amountInKobo,
    rateInBasisPoints,
);

if (volume === null || feePerTransaction === null) {
    throw new Error('Invalid transaction calculation');
}

const monthlyFees = calculateMonthlyFees(
    feePerTransaction,
    transactionCount,
);

if (monthlyFees === null) {
    throw new Error('Could not calculate monthly fees');
}

const vat = calculateVat(monthlyFees);

if (vat === null) {
    throw new Error('Could not calculate VAT');
}

const totalCost = calculateTotalCost(monthlyFees, vat);

if (totalCost === null) {
    throw new Error('Could not calculate total cost');
}

// Display results
console.log('Monthly Volume:', formatKoboAsNaira(volume));
console.log('Fee Per Transaction:', formatKoboAsNaira(feePerTransaction));
console.log('Monthly Fees:', formatKoboAsNaira(monthlyFees));
console.log('VAT:', formatKoboAsNaira(vat));
console.log('Total Monthly Cost:', formatKoboAsNaira(totalCost));
