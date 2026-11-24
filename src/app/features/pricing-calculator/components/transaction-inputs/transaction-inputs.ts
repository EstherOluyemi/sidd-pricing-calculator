import { Component, input, output } from '@angular/core';
import {
  convertNairaToKobo,
  isValidTransactionCount,
} from '../../../../core/utils/pricing-calculation';

@Component({
  imports: [],
  selector: 'app-transaction-inputs',
  styleUrl: './transaction-inputs.css',
  templateUrl: './transaction-inputs.html',
})
export class TransactionInputs {
  amount = input<number | null>(null);
  count = input<number | null>(null);

  amountChanged = output<number | null>();
  countChanged = output<number | null>();

  onAmountInput(value: string): void {
    this.amountChanged.emit(
      value === '' ? null : convertNairaToKobo(value)
    );
  }

  onCountInput(value: string): void {
    if (value === '') {
      this.countChanged.emit(null);
      return;
    }

    const count = Number(value);

    this.countChanged.emit(
      isValidTransactionCount(count) ? count : null
    );
  }

  get amountInNaira(): string {
    const amount = this.amount();

    return amount === null ? '' : (amount / 100).toString();
  }
}