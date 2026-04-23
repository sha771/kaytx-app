/**
 * Kaytx AI Operating System - Service Exports
 * 
 * Complete AI OS with all 7 core components:
 * 1. Resource Allocation / Compute Scheduler
 * 2. Plugin / Extension System
 * 3. Process Isolation / Sandboxing
 * 4. Agent Lifecycle Management (The Kernel)
 * 5. Multi-Tenant Resource Quotas
 * 6. Hot-Swappable Components
 * 7. Distributed Execution Layer
 */

// ============================================
// 1. Resource Allocation / Compute Scheduler
// ============================================
// ============================================
// AI Operating System Integration Helper
// ============================================

import { resourceScheduler } from './ai-os-resource-scheduler';
import { pluginSystem } from './ai-os-plugin-system';
import { agentSandboxService } from './ai-os-sandbox-service';
import { agentKernel } from './ai-os-kernel';
import { resourceQuotaManager } from './ai-os-quota-manager';
import { hotSwapSystem } from './ai-os-hot-swap';
import { distributedExecutionLayer } from './ai-os-distributed-layer';

// Import logger for AIOS class
import { createLogger } from '../lib/production-logger';

export {
  resourceScheduler,
  ResourceScheduler,
  ResourceAllocation,
  ResourceUsage,
  ScalingPolicy,
  ResourcePool,
  ResourceReservation,
  CostTracking,
} from './ai-os-resource-scheduler';

// ============================================
// 2. Plugin / Extension System
// ============================================
export {
  pluginSystem,
  PluginSystem,
  PluginType,
  PluginStatus,
  PluginPermission,
  PluginManifest,
  PluginPackage,
  InstalledPlugin,
  SandboxConfig,
  MarketplaceListing,
  PluginReview,
  SecurityScanResult,
  SecurityFinding,
  Vulnerability,
  AgentTemplate,
} from './ai-os-plugin-system';

// ============================================
// 3. Process Isolation / Sandboxing
// ============================================
export {
  agentSandboxService,
  AgentSandboxService,
  SandboxType,
  SandboxStatus,
  SecurityLevel,
  SandboxConfig as AgentSandboxConfig,
  FirewallRule,
  AgentSandbox,
  SecurityViolation,
  FileSystemAccess,
  NetworkActivity,
  SyscallEvent,
  QuarantineResult,
  CheckpointData as SandboxCheckpointData,
} from './ai-os-sandbox-service';

// ============================================
// 4. Agent Lifecycle Management (The Kernel)
// ============================================
export {
  agentKernel,
  AgentKernel,
  AgentProcessState,
  AgentPriority,
  AgentProcess,
  HealthCheckResult,
  ProcessStats,
  Signal,
  Checkpoint as AgentCheckpoint,
  ProcessQueue,
} from './ai-os-kernel';

// ============================================
// 5. Multi-Tenant Resource Quotas
// ============================================
export {
  resourceQuotaManager,
  ResourceQuotaManager,
  ResourceType,
  QuotaPeriod,
  EnforcementAction,
  ResourceQuota,
  QuotaPlan,
  UsageEvent,
  QuotaViolation,
  UsageReport,
  BillingRecord,
} from './ai-os-quota-manager';

// ============================================
// 6. Hot-Swappable Components
// ============================================
export {
  hotSwapSystem,
  HotSwapSystem,
  DeploymentStrategy,
  DeploymentStatus,
  ComponentVersion,
  Deployment,
  DeploymentInstance,
  TrafficSplit,
  // HealthCheckResult - removed, already exported from ai-os-kernel
  VerificationResult,
  DeploymentEvent,
  RollbackRequest,
} from './ai-os-hot-swap';

// ============================================
// 7. Distributed Execution Layer
// ============================================
export {
  distributedExecutionLayer,
  DistributedExecutionLayer,
  NodeStatus,
  NodeRole,
  TaskPriority,
  Node,
  NodeResources,
  NodeStats,
  DistributedTask,
  AgentReplica,
  LoadBalancerConfig,
  RoutingDecision,
  FailoverEvent,
  MeshTopology,
} from './ai-os-distributed-layer';

/**
 * AIOS - AI Operating System Facade
 * 
 * Provides a unified interface to all 7 OS components
 */
export class AIOS {
  // Core OS components
  static scheduler = resourceScheduler;
  static plugins = pluginSystem;
  static sandbox = agentSandboxService;
  static kernel = agentKernel;
  static quotas = resourceQuotaManager;
  static hotSwap = hotSwapSystem;
  static mesh = distributedExecutionLayer;

  /**
   * Initialize the complete AI Operating System
   */
  static initialize(): void {
    logger.info('============================================');
    logger.info('  KAYTX AI OPERATING SYSTEM v1.0');
    logger.info('============================================');
    logger.info('Initializing 7 core OS components...');
    logger.info('');
    logger.info('✓ Resource Scheduler - CPU/GPU/Memory allocation');
    logger.info('✓ Plugin System - Extension marketplace');
    logger.info('✓ Sandbox Service - Process isolation');
    logger.info('✓ Agent Kernel - Lifecycle management');
    logger.info('✓ Quota Manager - Multi-tenant limits');
    logger.info('✓ Hot-Swap System - Zero-downtime updates');
    logger.info('✓ Distributed Mesh - Multi-node execution');
    logger.info('');
    logger.info('AI OS Initialized and Ready');
    logger.info('============================================');
  }

  /**
   * Deploy an agent with full OS integration
   */
  static async deployAgent(config: {
    agentId: string;
    organizationId: string;
    code: string;
    resources: {
      cpu: number;
      memory: number;
      gpu?: number;
    };
    securityLevel: 'low' | 'medium' | 'high' | 'maximum';
    priority: 'idle' | 'low' | 'normal' | 'high' | 'realtime';
    networkPolicy?: {
      allowedDomains: string[];
      allowedPorts: number[];
    };
    replicate?: boolean;
    nodeCount?: number;
  }): Promise<{
    processId: string;
    sandboxId: string;
    nodeId: string;
    success: boolean;
  }> {
    const startTime = Date.now();

    try {
      // 1. Check quotas
      const quotaCheck = await resourceQuotaManager.checkAndTrackUsage(
        config.organizationId,
        'agents',
        1,
        { operation: 'deploy_agent', agentId: config.agentId }
      );

      if (!quotaCheck.allowed) {
        throw new Error(`Quota exceeded: ${quotaCheck.message}`);
      }

      // 2. Allocate resources
      const allocation = await resourceScheduler.allocateResources(
        config.agentId,
        {
          cpuQuota: config.resources.cpu,
          memoryLimit: config.resources.memory,
          gpuShares: config.resources.gpu || 0,
        },
        config.organizationId,
        config.priority === 'realtime' ? 'critical' : config.priority === 'high' ? 'high' : 'medium'
      );

      // 3. Create sandbox
      const sandbox = await agentSandboxService.createSandbox(
        config.agentId,
        config.organizationId,
        config.securityLevel,
        {
          cpuCores: allocation.cpuQuota,
          memoryMb: allocation.memoryLimit,
          gpuShares: allocation.gpuShares,
          diskMb: allocation.diskQuota,
        },
        config.networkPolicy || { allowedDomains: [], allowedPorts: [443] },
        ['API_KEY', 'DB_CREDENTIALS']
      );

      // 4. Spawn process via kernel
      const process = await agentKernel.spawn(
        config.agentId,
        config.organizationId,
        {
          name: config.agentId,
          version: '1.0.0',
          type: 'ai-agent',
          priority: config.priority,
        },
        'system'
      );

      // 5. Place on distributed mesh
      const placement = await distributedExecutionLayer.placeAgent(
        config.agentId,
        config.organizationId,
        {
          cpuCores: allocation.cpuQuota,
          memoryGb: allocation.memoryLimit / 1024,
          gpuCount: allocation.gpuShares,
        },
        config.priority
      );

      // 6. Replicate if requested
      if (config.replicate && config.nodeCount && config.nodeCount > 1) {
        await distributedExecutionLayer.replicateAgent(
          config.agentId,
          config.nodeCount,
          'active-passive'
        );
      }

      const duration = Date.now() - startTime;

      logger.info(`Agent ${config.agentId} deployed in ${duration}ms`);
      logger.info(`  - Process: ${process.pid}`);
      logger.info(`  - Sandbox: ${sandbox.sandboxId}`);
      logger.info(`  - Node: ${placement.nodeId}`);

      return {
        processId: process.pid,
        sandboxId: sandbox.sandboxId,
        nodeId: placement.nodeId,
        success: true,
      };
    } catch (error) {
      logger.error(`Failed to deploy agent ${config.agentId}: ${error}`);
      throw error;
    }
  }

  /**
   * Gracefully shutdown the AI OS
   */
  static async shutdown(): Promise<void> {
    logger.info('Shutting down AI Operating System...');

    // Stop all kernel processes
    agentKernel.destroy();

    // Cleanup sandboxes
    agentSandboxService.destroy();

    // Stop monitoring
    resourceScheduler.destroy();
    distributedExecutionLayer.destroy();
    hotSwapSystem.destroy();
    resourceQuotaManager.destroy();

    logger.info('AI OS shutdown complete');
  }

  /**
   * Get complete system status
   */
  static getSystemStatus(): {
    processes: number;
    sandboxes: number;
    nodes: number;
    activeDeployments: number;
    resourceUtilization: {
      cpu: number;
      memory: number;
      gpu: number;
    };
  } {
    const kernelStats = agentKernel.getStats();
    const meshNodes = distributedExecutionLayer.getAllNodes();
    
    return {
      processes: kernelStats.totalProcesses,
      sandboxes: agentSandboxService.getOrganizationSandboxes('system').length,
      nodes: meshNodes.length,
      activeDeployments: Object.keys(distributedExecutionLayer.getAllNodes()).length,
      resourceUtilization: {
        cpu: meshNodes.reduce((sum, n) => sum + n.stats.cpuUtilization, 0) / (meshNodes.length || 1),
        memory: meshNodes.reduce((sum, n) => sum + n.stats.memoryUtilization, 0) / (meshNodes.length || 1),
        gpu: meshNodes.reduce((sum, n) => sum + n.stats.gpuUtilization, 0) / (meshNodes.length || 1),
      },
    };
  }
}
const logger = createLogger('AIOS');

// Export AIOS as default
export default AIOS;

// ============================================
// Version Information
// ============================================
export const AIOS_VERSION = '1.0.0';
export const AIOS_COMPONENTS = [
  'resource-scheduler',
  'plugin-system',
  'sandbox-service',
  'agent-kernel',
  'quota-manager',
  'hot-swap-system',
  'distributed-mesh',
];
