import { Component, signal, computed } from '@angular/core';
import {
  calculateTransactionFee,
  calculateMonthlyFees,
  calculateVat,
  calculateTotalCost,
  calculateMonthlyVolume
}
  from '../../../../core/utils/pricing-calculation';
import { PRICING_PLANS } from '../../../../core/data/pricing-plans';
import { PlanSelector } from '../../components/plan-selector/plan-selector';
import { TransactionInputs } from '../../components/transaction-inputs/transaction-inputs';
import { CostSummary } from '../../components/cost-summary/cost-summary';
import { LucideSun, LucideMoon } from '@lucide/angular';

@Component({
  imports: [PlanSelector, TransactionInputs, CostSummary, LucideMoon, LucideSun],
  selector: 'app-pricing-calculator',
  styleUrl: './pricing-calculator.css',
  templateUrl: './pricing-calculator.html',
})
export class PricingCalculator {

  transactionAmount = signal<number | null>(null);
  transactionCount = signal<number | null>(null);
  selectedPlan = signal('starter');

  isDarkMode = signal(localStorage.getItem('theme') === 'dark');

  pricingPlans = PRICING_PLANS;

  monthlyVolume = computed(() => {
    const amount = this.transactionAmount();
    const count = this.transactionCount();

    if (amount === null || count === null) return null;

    return calculateMonthlyVolume(amount, count);
  });

  feePerTransaction = computed(() => {
    const amount = this.transactionAmount();

    if (amount === null) return null;

    const plan = PRICING_PLANS.find(
      (plan) => plan.id === this.selectedPlan()
    );

    if (!plan) return null;

    return calculateTransactionFee(
      amount,
      plan.rateInBasisPoints
    );
  });

  monthlyFees = computed(() => {
    const fee = this.feePerTransaction();
    const count = this.transactionCount();

    if (fee === null || count === null) return null;

    return calculateMonthlyFees(fee, count);
  });

  vat = computed(() => {
    const fees = this.monthlyFees();

    if (fees === null) return null;

    return calculateVat(fees);
  });

  totalMonthlyCost = computed(() => {
    const fees = this.monthlyFees();
    const vatAmount = this.vat();

    if (fees === null || vatAmount === null) return null;

    return calculateTotalCost(fees, vatAmount);
  });

  toggleTheme(): void {
    this.isDarkMode.update((currentTheme) => !currentTheme);

    localStorage.setItem(
      'theme',
      this.isDarkMode() ? 'dark' : 'light'
    );
  }
}
