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

@Component({
  imports: [PlanSelector, TransactionInputs, CostSummary],
  selector: 'app-pricing-calculator',
  styleUrl: './pricing-calculator.css',
  templateUrl: './pricing-calculator.html',
})
export class PricingCalculator {

  transactionAmount = signal(0);
  transactionCount = signal(0);
  selectedPlan = signal('starter');

  pricingPlans = PRICING_PLANS;

  monthlyVolume = computed(() =>
    calculateMonthlyVolume(
      this.transactionAmount(),
      this.transactionCount()
    )
  );

  feePerTransaction = computed(() => {
    const plan = PRICING_PLANS.find(
      (plan) => plan.id === this.selectedPlan()
    );

    if (!plan) return null;

    return calculateTransactionFee(
      this.transactionAmount(),
      plan.rateInBasisPoints
    );
  });

  monthlyFees = computed(() => {
    const fee = this.feePerTransaction();

    if (fee === null) return null;

    return calculateMonthlyFees(fee, this.transactionCount());
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
}
