import { z } from "zod";
import { publicProcedure } from "../../../create-context";

export default publicProcedure
  .input(z.object({ 
    type: z.enum(['customers', 'leads', 'deals', 'all']).optional()
  }))
  .query(({ input }) => {
    console.log('[CRM] Fetching data', input);
    
    return {
      customers: {
        total: 2450,
        active: 2180,
        new: 234,
        churn: 78,
        ltv: 1247
      },
      leads: {
        total: 1850,
        qualified: 980,
        contacted: 1200,
        converted: 450,
        conversionRate: 24.3
      },
      deals: {
        total: 156,
        won: 89,
        lost: 34,
        pending: 33,
        totalValue: 1245678,
        avgDealSize: 7985
      },
      pipeline: [
        { stage: 'Prospecting', count: 45, value: 125000 },
        { stage: 'Qualification', count: 32, value: 98000 },
        { stage: 'Proposal', count: 28, value: 156000 },
        { stage: 'Negotiation', count: 18, value: 234000 },
        { stage: 'Closed Won', count: 89, value: 1245678 }
      ],
      recentActivity: [
        {
          id: '1',
          type: 'deal_won',
          customer: 'Acme Corp',
          value: 45000,
          timestamp: new Date().toISOString()
        },
        {
          id: '2',
          type: 'lead_qualified',
          customer: 'TechStart Inc',
          value: 0,
          timestamp: new Date(Date.now() - 3600000).toISOString()
        }
      ]
    };
  });
