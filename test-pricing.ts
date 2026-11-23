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
const rate = 150;

// Perform calculations
const volume = calculateMonthlyVolume(amountInKobo, transactionCount);

const feePerTransaction = calculateTransactionFee(amountInKobo, rate);

const monthlyFees = calculateMonthlyFees(
    feePerTransaction,
    transactionCount,
);

const vat = calculateVat(monthlyFees);

const totalCost = calculateTotalCost(monthlyFees, vat);

// Display results
console.log('Monthly Volume:', formatKoboAsNaira(volume));
console.log('Fee Per Transaction:', formatKoboAsNaira(feePerTransaction));
console.log('Monthly Fees:', formatKoboAsNaira(monthlyFees));
console.log('VAT:', formatKoboAsNaira(vat));
console.log('Total Monthly Cost:', formatKoboAsNaira(totalCost));