import { Component, input, output } from '@angular/core';
import { PricingPlan } from '../../../../core/models/pricing-plan.model';

@Component({
  imports: [],
  selector: 'app-plan-selector',
  styleUrl: './plan-selector.css',
  templateUrl: './plan-selector.html',
})
export class PlanSelector {

  plans = input<PricingPlan[]>([]);

  planSelected = output<string>();
}
