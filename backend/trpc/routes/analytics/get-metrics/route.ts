import { z } from "zod";
import { publicProcedure } from "../../../create-context";

export default publicProcedure
  .input(z.object({ 
    period: z.enum(['today', 'week', 'month', 'year']).optional(),
    category: z.string().optional()
  }))
  .query(({ input }) => {
    console.log('[Analytics] Fetching metrics', input);
    
    return {
      metrics: [
        {
          id: '1',
          name: 'Total Users',
          value: '125,430',
          change: '+12.5%',
          trend: 'up',
          category: 'users'
        },
        {
          id: '2',
          name: 'Revenue',
          value: '$1,245,678',
          change: '+18.3%',
          trend: 'up',
          category: 'revenue'
        },
        {
          id: '3',
          name: 'Conversion Rate',
          value: '4.2%',
          change: '+0.8%',
          trend: 'up',
          category: 'conversion'
        },
        {
          id: '4',
          name: 'Bounce Rate',
          value: '32.1%',
          change: '-2.3%',
          trend: 'down',
          category: 'engagement'
        }
      ],
      period: input.period || 'month',
      lastUpdated: new Date().toISOString()
    };
  });
