import { z } from "zod";
import { permissionProcedure } from "../../../create-context";
import { Permission } from "../../../../lib/rbac";
import { db as pgDb } from "../../../../db/connection";
import { campaigns } from "../../../../db/drizzle-schema";
import { eq, and, desc } from "drizzle-orm";
import { campaignAnalyticsService } from "../../../../services/consolidated-analytics-service";

export default permissionProcedure(Permission.MARKETING_CAMPAIGNS_READ)
  .input(z.object({ 
    status: z.enum(['active', 'paused', 'completed', 'all']).optional(),
    limit: z.number().optional()
  }))
  .query(async ({ input, ctx }) => {
    console.log('[Marketing] Fetching campaigns with analytics', input);
    
    const whereConditions = [eq(campaigns.organizationId, ctx.user.organizationId)];
    if (input.status && input.status !== 'all') {
      whereConditions.push(eq(campaigns.status, input.status));
    }
    
    const rows = await pgDb
      .select()
      .from(campaigns)
      .where(and(...whereConditions))
      .orderBy(desc(campaigns.createdAt))
      .limit(input.limit || 50);
    
    // Get detailed analytics for each campaign
    const campaignsWithAnalytics = await Promise.all(
      rows.map(async (campaign) => {
        try {
          const analytics = await campaignAnalyticsService.getCampaignAnalytics(
            campaign.id, 
            ctx.user.organizationId
          );
          
          return {
            ...campaign,
            analytics
          };
        } catch (error) {
          console.error(`[Marketing] Failed to get analytics for campaign ${campaign.id}:`, error);
          return {
            ...campaign,
            analytics: null
          };
        }
      })
    );
    
    // Calculate organization-level metrics
    const orgAnalytics = await campaignAnalyticsService.getOrganizationAnalytics(
      ctx.user.organizationId
    );
    
    return {
      campaigns: campaignsWithAnalytics,
      total: rows.length,
      totalBudget: rows.reduce((sum, c) => sum + (parseFloat(c.budget?.toString() || '0')), 0),
      totalSpent: rows.reduce((sum, c) => sum + (parseFloat(c.spent?.toString() || '0')), 0),
      totalConversions: rows.reduce((sum, c) => {
        const metrics = c.metrics as any;
        return sum + (metrics?.conversions || 0);
      }, 0),
      totalRevenue: rows.reduce((sum, c) => {
        const metrics = c.metrics as any;
        return sum + (metrics?.totalRevenue || 0);
      }, 0),
      organizationAnalytics: orgAnalytics
    };
  });
