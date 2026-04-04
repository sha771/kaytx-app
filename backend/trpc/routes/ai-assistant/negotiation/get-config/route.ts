import { protectedProcedure } from '../../../../create-context';

export const getNegotiationConfigProcedure = protectedProcedure.query(async () => {
  return {
    config: {
      enabled: true,
      autoLearn: true,
      aggressiveness: 50,
      customerSatisfactionPriority: 70,
      profitMarginPriority: 60,
      responseDelay: 2,
      useEmotionalIntelligence: true,
      escalateToHuman: true,
      escalationThreshold: 3,
    },
    trainingData: [
      {
        id: '1',
        scenario: 'Customer requests 20% discount on enterprise plan',
        expectedResponse: 'Offer 10% discount with annual commitment, counter with added features',
        category: 'pricing',
      },
      {
        id: '2',
        scenario: 'Customer compares with competitor pricing',
        expectedResponse: 'Highlight unique value propositions, offer price match with conditions',
        category: 'competition',
      },
    ],
    limits: [
      {
        id: '1',
        productCategory: 'Enterprise Plans',
        minPrice: 5000,
        maxDiscount: 20,
        autoApproveThreshold: 10,
        requiresManagerApproval: true,
      },
    ],
  };
});
