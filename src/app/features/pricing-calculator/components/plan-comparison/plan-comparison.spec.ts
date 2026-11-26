import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlanComparison } from './plan-comparison';

describe('PlanComparison', () => {
  let component: PlanComparison;
  let fixture: ComponentFixture<PlanComparison>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanComparison],
    }).compileComponents();

    fixture = TestBed.createComponent(PlanComparison);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
