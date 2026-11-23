import { Component, input, output } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-transaction-inputs',
  styleUrl: './transaction-inputs.css',
  templateUrl: './transaction-inputs.html',
})
export class TransactionInputs {

  amount = input<number>(0);
  count = input<number>(0);

  amountChanged = output<number>();
  countChanged = output<number>();
}
