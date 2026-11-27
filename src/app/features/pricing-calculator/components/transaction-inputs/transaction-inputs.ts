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
  amountError = '';
  amountInputValue = '';
  countError = '';
  countInputValue = '';

  onAmountInput(value: string): void {
    this.amountInputValue = value;

    if (value === '') {
      this.amountError = '';
      this.amountChanged.emit(null);
      return;
    }

    const amountInKobo = convertNairaToKobo(value);

    if (amountInKobo === null) {
      this.amountError = 'Enter a valid amount';
      this.amountChanged.emit(null);
      return;
    }

    this.amountError = '';
    this.amountChanged.emit(amountInKobo);
  }

  onCountInput(value: string): void {
    this.countInputValue = value;

    if (value === '') {
      this.countError = '';
      this.countChanged.emit(null);
      return;
    }

    const count = Number(value);

    if (!isValidTransactionCount(count)) {
      this.countError = 'Enter a valid whole number of transaction.';
      this.countChanged.emit(null);
      return;
    }

    this.countError = '';
    this.countChanged.emit(count);
  }

  get amountInNaira(): string {
    const amount = this.amount();

    return amount === null ? '' : (amount / 100).toString();
  }
}