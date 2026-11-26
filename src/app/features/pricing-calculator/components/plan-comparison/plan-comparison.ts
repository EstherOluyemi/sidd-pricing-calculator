import { Component, input, output } from '@angular/core';
import { PricingPlan } from '../../../../core/models/pricing-plan.model';
import { formatKoboAsNaira } from '../../../../core/utils/pricing-calculation';

@Component({
  imports: [],
  selector: 'app-plan-comparison',
  styleUrl: './plan-comparison.css',
  templateUrl: './plan-comparison.html',
})
export class PlanComparison {
  plans = input<PricingPlan[]>([]);

  amount = input<number | null>(null);

  count = input<number | null>(null);

  selectedPlans = input<[string, string]>(['starter', 'growth']);

  plansSelected = output<[string, string]>();

  onPlanChange(index: number, planId: string): void {
    const currentSelection = this.selectedPlans();

    const updatedSelection: [string, string] = [
      currentSelection[0],
      currentSelection[1],
    ];

    updatedSelection[index] = planId;

    this.plansSelected.emit(updatedSelection);
  }
  formatCurrency(amount: number): string {
    return formatKoboAsNaira(amount);
  }
  comparisonResults = input<{
    plan: PricingPlan;
    feePerTransaction: number;
    monthlyFees: number;
    vat: number;
    totalMonthlyCost: number;
  }[]>([]);

  cheaperPlan = input<string | null>(null);
}