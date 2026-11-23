import { PricingPlan } from "../models/pricing-plan.model";

export const PRICING_PLANS: PricingPlan[] = [
    {
        id: 'starter',
        name: 'Starter',
        description: 'For businesses getting started',
        rateInBasisPoints: 1.5,
    },
    {
        id: 'growth',
        name: 'Growth',
        description: 'For growing businesses',
        rateInBasisPoints: 1.2,
    },
    {
        id: 'enterprise',
        name: 'Enterprise',
        description: 'For established businesses',
        rateInBasisPoints: 1.0,
    },
]