import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PricingCalculator } from './pricing-calculator';

describe('PricingCalculator', () => {
  let component: PricingCalculator;
  let fixture: ComponentFixture<PricingCalculator>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PricingCalculator],
    }).compileComponents();

    fixture = TestBed.createComponent(PricingCalculator);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
