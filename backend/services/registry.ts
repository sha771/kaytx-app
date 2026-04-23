/**
 * Centralized Service Registry
 * 
 * This registry provides singleton instances of all consolidated services.
 * All service consumers should import from this registry to ensure
 * consistent service usage across the platform.
 * 
 * @module services/registry
 */

import { ConsolidatedMemoryService } from './consolidated-memory-service';
import { ConsolidatedAuditService } from './consolidated-audit-service';
import { ConsolidatedPlatformSyncService } from './consolidated-platform-sync-service';
import { ConsolidatedDecisionLoggingService, decisionLogger } from './consolidated-decision-logging-service';
import { ConsolidatedErrorRecoveryService, errorRecoveryService } from './consolidated-error-recovery-service';
import { analyticsService } from './consolidated-analytics-service';
import { WhatsAppService } from './whatsapp-service';
import { syncConflictResolutionService } from './sync-conflict-resolution-service';
import { unifiedWorkflowService } from './unified-workflow-service';
import { AIAgentService, aiAgentService } from './ai-agent-service';
import { AIAgentServiceEnterprise, aiAgentServiceEnterprise } from './ai-agent-service-enterprise';
import { AIOSInfrastructureService, aiosInfrastructureService } from './ai-os-infrastructure';
import { EmailVerificationService } from './email-verification-service';
import { AccountLockoutService } from './account-lockout-service';
import { EmailCampaignService } from './email-campaign-service';
import { createLogger } from '../lib/production-logger';

const logger = createLogger('ServiceRegistry');

/**
 * Service Registry Interface
 * Defines all available services in the platform
 */
export interface ServiceRegistry {
  memory: ConsolidatedMemoryService;
  audit: ConsolidatedAuditService;
  platformSync: ConsolidatedPlatformSyncService;
  decisionLogging: ConsolidatedDecisionLoggingService;
  decisionLogger: typeof decisionLogger;
  errorRecovery: ConsolidatedErrorRecoveryService;
  errorRecoveryService: typeof errorRecoveryService;
  analytics: typeof analyticsService;
  whatsapp: WhatsAppService;
  conflictResolution: typeof syncConflictResolutionService;
  workflow: typeof unifiedWorkflowService;
  aiAgent: AIAgentService;
  aiAgentEnterprise: AIAgentServiceEnterprise;
  aiosInfrastructure: AIOSInfrastructureService;
  emailVerification: EmailVerificationService;
  accountLockout: AccountLockoutService;
  emailCampaign: EmailCampaignService;
}

/**
 * Singleton service instances
 */
export const services: ServiceRegistry = {
  memory: new ConsolidatedMemoryService(),
  audit: new ConsolidatedAuditService(),
  platformSync: new ConsolidatedPlatformSyncService(),
  decisionLogging: new ConsolidatedDecisionLoggingService(),
  decisionLogger,
  errorRecovery: new ConsolidatedErrorRecoveryService(),
  errorRecoveryService,
  analytics: analyticsService,
  whatsapp: new WhatsAppService(),
  conflictResolution: syncConflictResolutionService,
  workflow: unifiedWorkflowService,
  aiAgent: aiAgentService,
  aiAgentEnterprise: aiAgentServiceEnterprise,
  aiosInfrastructure: aiosInfrastructureService,
  emailVerification: new EmailVerificationService(),
  accountLockout: AccountLockoutService.getInstance(),
  emailCampaign: new EmailCampaignService(),
};

/**
 * Export individual services for type checking and testing
 */
export {
  ConsolidatedMemoryService,
  ConsolidatedAuditService,
  ConsolidatedPlatformSyncService,
  ConsolidatedDecisionLoggingService,
  decisionLogger,
  ConsolidatedErrorRecoveryService,
  errorRecoveryService,
  analyticsService,
  AIAgentServiceEnterprise,
  aiAgentServiceEnterprise,
  AIOSInfrastructureService,
  aiosInfrastructureService,
};

/**
 * Service initialization
 * Call this function during application startup to initialize all services
 */
export async function initializeServices(): Promise<void> {
  logger.info('Initializing services...');
  // Initialize services that require async setup
  // Add initialization logic here as needed
  logger.info('Services initialized successfully');
}

/**
 * Service cleanup
 * Call this function during application shutdown to cleanup resources
 */
export async function cleanupServices(): Promise<void> {
  logger.info('Cleaning up services...');
  // Cleanup services that require resource cleanup
  services.errorRecovery.destroy?.();
  services.aiosInfrastructure.destroy?.();
  services.aiAgentEnterprise.destroy?.();
  logger.info('Services cleaned up successfully');
}
