import { z } from "zod";
import { publicProcedure } from "../../../create-context";

export default publicProcedure
  .input(z.object({ 
    status: z.enum(['active', 'paused', 'completed', 'all']).optional(),
    limit: z.number().optional()
  }))
  .query(({ input }) => {
    console.log('[Marketing] Fetching campaigns', input);
    
    const campaigns = [
      {
        id: '1',
        name: 'Summer Sale 2025',
        type: 'email',
        status: 'active',
        budget: 50000,
        spent: 32500,
        impressions: 125000,
        clicks: 8500,
        conversions: 450,
        roi: 3.2,
        startDate: '2025-06-01',
        endDate: '2025-08-31'
      },
      {
        id: '2',
        name: 'Social Media Boost',
        type: 'social',
        status: 'active',
        budget: 25000,
        spent: 18750,
        impressions: 450000,
        clicks: 12000,
        conversions: 680,
        roi: 4.1,
        startDate: '2025-05-15',
        endDate: '2025-07-15'
      },
      {
        id: '3',
        name: 'Product Launch',
        type: 'multi-channel',
        status: 'completed',
        budget: 100000,
        spent: 98500,
        impressions: 850000,
        clicks: 45000,
        conversions: 2300,
        roi: 5.8,
        startDate: '2025-03-01',
        endDate: '2025-05-31'
      }
    ];

    const filtered = input.status && input.status !== 'all' 
      ? campaigns.filter(c => c.status === input.status)
      : campaigns;

    return {
      campaigns: input.limit ? filtered.slice(0, input.limit) : filtered,
      total: filtered.length,
      totalBudget: filtered.reduce((sum, c) => sum + c.budget, 0),
      totalSpent: filtered.reduce((sum, c) => sum + c.spent, 0),
      totalConversions: filtered.reduce((sum, c) => sum + c.conversions, 0)
    };
  });
