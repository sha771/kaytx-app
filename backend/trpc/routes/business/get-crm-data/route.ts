import { z } from "zod";
import { permissionProcedure } from "../../../create-context";
import { Permission } from "../../../../lib/rbac";
import { leadManagementService } from "../../../../services/lead-management-service";
import { logAudit, AuditActions } from "../../../../lib/audit";

export default permissionProcedure(Permission.BUSINESS_CRM_READ)
  .input(z.object({ 
    type: z.enum(['customers', 'leads', 'deals', 'all']).optional(),
    dateRange: z.object({
      start: z.string().datetime().optional(),
      end: z.string().datetime().optional(),
    }).optional(),
  }))
  .query(async ({ input, ctx }) => {
    console.log('[CRM] Fetching data', input);
    
    const organizationId = ctx.user.organizationId;
    
    try {
      // Get comprehensive CRM data from lead management service
      const crmData = await leadManagementService.getCRMData({
        organizationId,
        type: input.type || 'all',
        dateRange: input.dateRange,
      });

      logAudit({
        userId: ctx.user.id,
        organizationId,
        action: AuditActions.DATA_ACCESS,
        resource: 'crm_data',
        status: 'success',
        metadata: { 
          type: input.type,
          dateRange: input.dateRange,
        },
      });

      return crmData;
    } catch (error) {
      console.error('[CRM] Failed to fetch CRM data:', error);

      const message = error instanceof Error ? error.message : String(error);
      
      logAudit({
        userId: ctx.user.id,
        organizationId,
        action: AuditActions.DATA_ACCESS,
        resource: 'crm_data',
        status: 'failure',
        severity: 'error',
        metadata: { 
          type: input.type,
          error: message,
        },
      });

      throw new Error('Failed to retrieve CRM data');
    }
  });
