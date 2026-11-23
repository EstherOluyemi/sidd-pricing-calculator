import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransactionInputs } from './transaction-inputs';

describe('TransactionInputs', () => {
  let component: TransactionInputs;
  let fixture: ComponentFixture<TransactionInputs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionInputs],
    }).compileComponents();

    fixture = TestBed.createComponent(TransactionInputs);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
