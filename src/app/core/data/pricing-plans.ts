import { PricingPlan } from "../models/pricing-plan.model";

export const PRICING_PLANS: PricingPlan[] = [
    {
        id: 'starter',
        name: 'Starter',
        description: 'For businesses getting started',
        rateInBasisPoints: 150,
        feeCapInKobo: 50000,
    },
    {
        id: 'growth',
        name: 'Growth',
        description: 'For growing businesses',
        rateInBasisPoints: 120,
        feeCapInKobo: 100000,
    },
    {
        id: 'enterprise',
        name: 'Enterprise',
        description: 'For established businesses',
        rateInBasisPoints: 100,
        feeCapInKobo: 200000,
    },
]