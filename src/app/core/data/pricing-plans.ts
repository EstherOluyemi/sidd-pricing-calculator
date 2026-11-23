import { PricingPlan } from "../models/pricing-plan.model";

export const PRICING_PLANS: PricingPlan[] = [
    {
        id: 'starter',
        name: 'Starter',
        description: 'For businesses getting started',
        rateInBasisPoints: 150,
    },
    {
        id: 'growth',
        name: 'Growth',
        description: 'For growing businesses',
        rateInBasisPoints: 120,
    },
    {
        id: 'enterprise',
        name: 'Enterprise',
        description: 'For established businesses',
        rateInBasisPoints: 100,
    },
]