import { protectedProcedure } from '../../../create-context';

const mockUsageMetrics = {
  activeUsers: 2847,
  apiCalls: 847234,
  storageUsed: 1258291200,
  dataTransfer: 5482910720,
  period: 'current_month',
};

export const getUsageMetricsProcedure = protectedProcedure.query(async ({ ctx }) => {
  console.log('[Enterprise] Getting usage metrics for user:', ctx.user.id);

  return mockUsageMetrics;
});
