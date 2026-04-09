import { z } from "zod";
import { publicProcedure } from "../../../create-context";

export const toggleAgentProcedure = publicProcedure
  .input(z.object({
    agentId: z.string(),
    enabled: z.boolean(),
    agentType: z.enum(['main', 'sub']),
  }))
  .mutation(({ input }) => {
    console.log(`Toggling agent ${input.agentId} to ${input.enabled ? 'enabled' : 'disabled'}`);
    
    return {
      success: true,
      agentId: input.agentId,
      enabled: input.enabled,
      status: input.enabled ? 'active' : 'inactive',
      message: `Agent ${input.agentId} has been ${input.enabled ? 'activated' : 'deactivated'}`,
      timestamp: new Date().toISOString(),
    };
  });

export const toggleAllAgentsProcedure = publicProcedure
  .input(z.object({
    category: z.enum(['customer-experience', 'sales-revenue', 'marketing-growth', 'operations-management', 'data-intelligence', 'analysis-performance', 'core-intelligence', 'all']),
    enabled: z.boolean(),
  }))
  .mutation(({ input }) => {
    console.log(`Toggling all agents in category ${input.category} to ${input.enabled ? 'enabled' : 'disabled'}`);
    
    return {
      success: true,
      category: input.category,
      enabled: input.enabled,
      message: `All agents in ${input.category} have been ${input.enabled ? 'activated' : 'deactivated'}`,
      timestamp: new Date().toISOString(),
    };
  });
