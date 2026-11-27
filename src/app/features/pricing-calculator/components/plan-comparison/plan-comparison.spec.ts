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

  it('should emit updated plan selections when a plan changes', () => {
    let emittedSelection: [string, string] | undefined;

    component.plansSelected.subscribe((selection) => {
      emittedSelection = selection;
    });

    component.onPlanChange(1, 'enterprise');

    expect(emittedSelection).toEqual(['starter', 'enterprise']);
  });

  it('should render exactly two plan selectors', () => {
    fixture.componentRef.setInput('plans', [
      { id: 'starter', name: 'Starter', description: 'For startups', rateInBasisPoints: 150, feeCapInKobo: 50000 },
      { id: 'growth', name: 'Growth', description: 'For growing businesses', rateInBasisPoints: 120, feeCapInKobo: 100000 },
      { id: 'enterprise', name: 'Enterprise', description: 'For established businesses', rateInBasisPoints: 100, feeCapInKobo: 200000 },
    ]);

    fixture.detectChanges();

    const selectors = fixture.nativeElement.querySelectorAll('select');

    expect(selectors.length).toBe(2);
  });
});
