import { Component, input, output } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-cost-summary',
  styleUrl: './cost-summary.css',
  templateUrl: './cost-summary.html',
})
export class CostSummary {
  monthlyVolume = input<number | null>(null);
  feePerTransaction = input<number | null>(null);
  monthlyFees = input<number | null>(null);
  vat = input<number | null>(null);
  totalMonthlyCost = input<number | null>(null);
}
