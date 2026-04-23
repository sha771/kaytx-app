/**
 * AI Operating System Infrastructure Service
 * Enterprise-grade integration of all 7 AI OS components
 * 
 * This service provides a unified interface for deploying and managing AI agents
 * with full operating system-level capabilities including resource management,
 * sandboxing, process lifecycle, multi-tenancy, hot-swapping, and distributed execution.
 */

import { EventEmitter } from 'events';
import { v4 as uuidv4 } from 'uuid';
import { createLogger } from '../lib/production-logger';
import { logAudit } from '../lib/audit';
import { BaseService, ServiceContext, ServiceResponse } from './base-service';

// Import all 7 AI OS Components
import {
  resourceScheduler,
  ResourceScheduler,
  ResourceAllocation
} from './ai-os-resource-scheduler';

import {
  pluginSystem,
  PluginSystem,
  PluginManifest,
  AgentTemplate
} from './ai-os-plugin-system';

import {
  agentSandboxService,
  AgentSandboxService,
  SandboxType,
  SecurityLevel,
  AgentSandbox
} from './ai-os-sandbox-service';

import {
  agentKernel,
  AgentKernel,
  AgentProcess,
  AgentProcessState,
  AgentPriority
} from './ai-os-kernel';

import {
  resourceQuotaManager,
  ResourceQuotaManager,
  ResourceQuota,
  QuotaPlan,
  ResourceType
} from './ai-os-quota-manager';

import {
  hotSwapSystem,
  HotSwapSystem,
  DeploymentStrategy,
  Deployment
} from './ai-os-hot-swap';

import {
  distributedExecutionLayer,
  DistributedExecutionLayer,
  Node,
  TaskPriority,
  DistributedTask
} from './ai-os-distributed-layer';

const logger = createLogger('AIOSInfrastructure');

// ============================================
// Enterprise Agent Deployment Configuration
// ============================================

export interface EnterpriseAgentConfig {
  // Basic agent info
  agentId: string;
  name: string;
  description?: string;
  type: 'ai-employee' | 'ai-agent' | 'custom' | 'plugin';
  version: string;
  
  // Organization context
  organizationId: string;
  userId: string;
  
  // Resource requirements
  resources: {
    cpuCores: number;
    memoryGb: number;
    gpuCount?: number;
    storageGb?: number;
    priority?: AgentPriority;
  };
  
  // Security configuration
  security: {
    level: SecurityLevel;
    sandboxType: SandboxType;
    networkPolicy: {
      allowedDomains: string[];
      allowedPorts: number[];
      allowOutbound: boolean;
    };
    secrets: string[];
  };
  
  // Deployment configuration
  deployment: {
    strategy: DeploymentStrategy;
    replicate?: boolean;
    replicaCount?: number;
    preferredRegion?: string;
    autoScale?: boolean;
    minInstances?: number;
    maxInstances?: number;
  };
  
  // Agent code/payload
  code: string;
  config?: Record<string, any>;
  
  // Capabilities
  capabilities?: string[];
  tools?: string[];
  
  // Metadata
  metadata?: Record<string, any>;
}

export interface DeployedAgent {
  deploymentId: string;
  agentId: string;
  organizationId: string;
  
  // Component references
  processId: string;
  sandboxId: string;
  nodeId: string;
  resourceAllocationId: string;
  
  // Status
  status: 'provisioning' | 'deploying' | 'running' | 'failed' | 'stopped' | 'migrating';
  health: 'healthy' | 'degraded' | 'unhealthy' | 'unknown';
  
  // Resources
  resources: {
    allocated: ResourceAllocation;
    used: {
      cpuPercent: number;
      memoryMb: number;
      gpuPercent?: number;
    };
  };
  
  // Deployment info
  deployment: {
    strategy: DeploymentStrategy;
    version: string;
    startedAt: Date;
    updatedAt: Date;
    endpoint?: string;
  };
  
  // Replication
  replicas?: Array<{
    replicaId: string;
    nodeId: string;
    region: string;
    status: string;
  }>;
  
  // URLs/Endpoints
  endpoints: {
    internal: string;
    external?: string;
    websocket?: string;
  };
}

export interface InfrastructureHealth {
  overall: 'healthy' | 'degraded' | 'critical';
  components: {
    scheduler: 'healthy' | 'degraded' | 'critical';
    sandbox: 'healthy' | 'degraded' | 'critical';
    kernel: 'healthy' | 'degraded' | 'critical';
    quotaManager: 'healthy' | 'degraded' | 'critical';
    hotSwap: 'healthy' | 'degraded' | 'critical';
    distributedMesh: 'healthy' | 'degraded' | 'critical';
  };
  metrics: {
    totalAgents: number;
    runningAgents: number;
    totalNodes: number;
    healthyNodes: number;
    avgCpuUtilization: number;
    avgMemoryUtilization: number;
    failedDeployments24h: number;
    failovers24h: number;
  };
}

export interface ScalingEvent {
  eventId: string;
  timestamp: Date;
  agentId: string;
  organizationId: string;
  action: 'scale-up' | 'scale-down' | 'migrate' | 'failover';
  reason: string;
  from: {
    nodeId?: string;
    instances?: number;
  };
  to: {
    nodeId?: string;
    instances?: number;
  };
  duration: number;
  success: boolean;
}

class AIOSInfrastructureService extends EventEmitter {
  private deployedAgents: Map<string, DeployedAgent> = new Map();
  private orgAgents: Map<string, Set<string>> = new Map(); // orgId -> agentIds
  private scalingHistory: ScalingEvent[] = [];
  private monitoringInterval?: NodeJS.Timeout;
  private readonly MONITORING_INTERVAL = 30000; // 30 seconds

  constructor() {
    super();
    this.startMonitoring();
    this.initializeEventHandlers();
    logger.info('AI OS Infrastructure Service initialized');
  }

  // ============================================
  // Core Deployment API
  // ============================================

  /**
   * Deploy an agent with full enterprise-grade AI OS integration
   * This orchestrates all 7 OS components for a complete deployment
   */
  async deployAgent(config: EnterpriseAgentConfig): Promise<ServiceResponse<DeployedAgent>> {
    const startTime = Date.now();
    const deploymentId = `deploy-${uuidv4()}`;

    try {
      logger.info(`[${deploymentId}] Starting enterprise deployment for agent ${config.agentId}`);

      // Step 1: Check quota limits
      logger.info(`[${deploymentId}] Step 1/7: Checking resource quotas...`);
      const quotaCheck = await resourceQuotaManager.checkAndTrackUsage(
        config.organizationId,
        'agents',
        1,
        {
          operation: 'deploy_agent',
          agentId: config.agentId,
          userId: config.userId
        }
      );

      if (!quotaCheck.allowed) {
        throw new Error(`Quota exceeded: ${quotaCheck.message}`);
      }

      // Step 2: Allocate resources
      logger.info(`[${deploymentId}] Step 2/7: Allocating resources...`);
      const allocation = await resourceScheduler.allocateResources(
        config.agentId,
        {
          cpuQuota: config.resources.cpuCores,
          memoryLimit: config.resources.memoryGb * 1024, // Convert to MB
          gpuShares: config.resources.gpuCount || 0,
          priorityBoost: config.resources.priority === 'realtime'
        },
        config.organizationId,
        this.mapPriorityToResourcePriority(config.resources.priority)
      );

      // Step 3: Create sandbox
      logger.info(`[${deploymentId}] Step 3/7: Creating secure sandbox...`);
      const sandbox = await agentSandboxService.createSandbox(
        config.agentId,
        config.organizationId,
        config.security.level,
        {
          cpuCores: allocation.cpuQuota,
          memoryMb: allocation.memoryLimit,
          gpuShares: allocation.gpuShares,
          diskMb: (config.resources.storageGb || 10) * 1024
        },
        {
          allowedDomains: config.security.networkPolicy.allowedDomains,
          allowedPorts: config.security.networkPolicy.allowedPorts,
          allowOutbound: config.security.networkPolicy.allowOutbound
        },
        config.security.secrets
      );

      // Step 4: Place on distributed mesh
      logger.info(`[${deploymentId}] Step 4/7: Placing on distributed mesh...`);
      const placement = await distributedExecutionLayer.placeAgent(
        config.agentId,
        config.organizationId,
        {
          cpuCores: allocation.cpuQuota,
          memoryGb: allocation.memoryGb,
          gpuCount: allocation.gpuShares,
          preferredRegion: config.deployment.preferredRegion
        },
        this.mapAgentPriorityToTaskPriority(config.resources.priority)
      );

      // Step 5: Spawn kernel process
      logger.info(`[${deploymentId}] Step 5/7: Spawning kernel process...`);
      const process = await agentKernel.spawn(
        config.agentId,
        config.organizationId,
        {
          name: config.name,
          version: config.version,
          type: config.type,
          priority: config.resources.priority || 'normal',
          environment: {
            'KAYTX_AGENT_TYPE': config.type,
            'KAYTX_AGENT_VERSION': config.version,
            'KAYTX_SANDBOX_ID': sandbox.sandboxId,
            'KAYTX_NODE_ID': placement.nodeId,
            ...config.config
          }
        },
        config.userId
      );

      // Step 6: Create deployment record with hot-swap
      logger.info(`[${deploymentId}] Step 6/7: Creating hot-swap deployment...`);
      const version = await hotSwapSystem.registerVersion(
        config.agentId,
        config.version,
        config.code,
        config.config || {},
        config.userId,
        [`Deployed via AIOSInfrastructure`]
      );

      const deployment = await hotSwapSystem.deploy(
        config.agentId,
        version.versionId,
        config.deployment.strategy,
        {
          autoRollback: true,
          healthChecks: {
            endpoint: '/health',
            interval: 5,
            timeout: 10,
            retries: 3
          }
        },
        config.userId
      );

      // Step 7: Setup replication if requested
      let replicas: DeployedAgent['replicas'] = [];
      if (config.deployment.replicate && config.deployment.replicaCount && config.deployment.replicaCount > 1) {
        logger.info(`[${deploymentId}] Step 7/7: Setting up replication (${config.deployment.replicaCount} replicas)...`);
        const agentReplicas = await distributedExecutionLayer.replicateAgent(
          config.agentId,
          config.deployment.replicaCount,
          'active-passive'
        );

        replicas = agentReplicas.map(r => ({
          replicaId: r.replicaId,
          nodeId: r.nodeId,
          region: distributedExecutionLayer.getNode(r.nodeId)?.region || 'unknown',
          status: r.status
        }));
      } else {
        logger.info(`[${deploymentId}] Step 7/7: Replication skipped (single instance)`);
      }

      // Build deployment record
      const deployedAgent: DeployedAgent = {
        deploymentId,
        agentId: config.agentId,
        organizationId: config.organizationId,
        processId: process.pid,
        sandboxId: sandbox.sandboxId,
        nodeId: placement.nodeId,
        resourceAllocationId: allocation.allocationId,
        status: 'running',
        health: 'healthy',
        resources: {
          allocated: allocation,
          used: {
            cpuPercent: 0,
            memoryMb: 0
          }
        },
        deployment: {
          strategy: config.deployment.strategy,
          version: config.version,
          startedAt: new Date(),
          updatedAt: new Date(),
          endpoint: `/api/agents/${config.agentId}`
        },
        replicas,
        endpoints: {
          internal: `http://${placement.node.nodeId}:${sandbox.portMapping?.hostPort || 8080}`,
          external: config.deployment.replicate ? `/api/agents/${config.agentId}/lb` : undefined,
          websocket: `/ws/agents/${config.agentId}`
        }
      };

      // Store deployment
      this.deployedAgents.set(deploymentId, deployedAgent);
      
      // Track org agents
      let orgAgentIds = this.orgAgents.get(config.organizationId);
      if (!orgAgentIds) {
        orgAgentIds = new Set();
        this.orgAgents.set(config.organizationId, orgAgentIds);
      }
      orgAgentIds.add(deploymentId);

      const duration = Date.now() - startTime;

      // Audit log
      await logAudit({
        userId: config.userId,
        organizationId: config.organizationId,
        action: 'agent_deployed',
        resource: 'ai_agent',
        resourceId: config.agentId,
        status: 'success',
        details: {
          deploymentId,
          processId: process.pid,
          sandboxId: sandbox.sandboxId,
          nodeId: placement.nodeId,
          duration,
          strategy: config.deployment.strategy,
          replicas: replicas.length
        }
      });

      this.emit('agentDeployed', { deploymentId, agentId: config.agentId, organizationId: config.organizationId });
      logger.info(`[${deploymentId}] Deployment completed in ${duration}ms`);

      return {
        success: true,
        data: deployedAgent
      };

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      logger.error(`[${deploymentId}] Deployment failed: ${errorMessage}`);

      await logAudit({
        userId: config.userId,
        organizationId: config.organizationId,
        action: 'agent_deploy_failed',
        resource: 'ai_agent',
        resourceId: config.agentId,
        status: 'failure',
        details: { error: errorMessage, deploymentId }
      });

      return {
        success: false,
        error: errorMessage
      };
    }
  }

  /**
   * Stop/terminate an agent deployment
   */
  async stopAgent(deploymentId: string, userId: string, force: boolean = false): Promise<ServiceResponse<void>> {
    const deployedAgent = this.deployedAgents.get(deploymentId);
    if (!deployedAgent) {
      return { success: false, error: 'Deployment not found' };
    }

    try {
      logger.info(`[${deploymentId}] Stopping agent ${deployedAgent.agentId}`);

      // Stop kernel process
      await agentKernel.kill(deployedAgent.processId, force);

      // Destroy sandbox
      await agentSandboxService.destroySandbox(deployedAgent.sandboxId);

      // Release resources
      await resourceScheduler.releaseResources(deployedAgent.resourceAllocationId);

      // Update status
      deployedAgent.status = 'stopped';
      deployedAgent.health = 'unknown';

      await logAudit({
        userId,
        organizationId: deployedAgent.organizationId,
        action: 'agent_stopped',
        resource: 'ai_agent',
        resourceId: deployedAgent.agentId,
        details: { deploymentId, force }
      });

      this.emit('agentStopped', { deploymentId, agentId: deployedAgent.agentId });

      return { success: true };

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      return { success: false, error: errorMessage };
    }
  }

  /**
   * Migrate an agent to a different node
   */
  async migrateAgent(
    deploymentId: string,
    targetNodeId: string,
    userId: string
  ): Promise<ServiceResponse<{ newNodeId: string; duration: number }>> {
    const deployedAgent = this.deployedAgents.get(deploymentId);
    if (!deployedAgent) {
      return { success: false, error: 'Deployment not found' };
    }

    const startTime = Date.now();

    try {
      logger.info(`[${deploymentId}] Migrating agent to node ${targetNodeId}`);

      deployedAgent.status = 'migrating';

      // Perform migration via kernel
      await agentKernel.migrate(deployedAgent.processId, targetNodeId);

      // Update tracking
      const oldNodeId = deployedAgent.nodeId;
      deployedAgent.nodeId = targetNodeId;
      deployedAgent.status = 'running';

      const duration = Date.now() - startTime;

      // Record scaling event
      this.recordScalingEvent({
        eventId: `scale-${uuidv4()}`,
        timestamp: new Date(),
        agentId: deployedAgent.agentId,
        organizationId: deployedAgent.organizationId,
        action: 'migrate',
        reason: 'user_requested',
        from: { nodeId: oldNodeId },
        to: { nodeId: targetNodeId },
        duration,
        success: true
      });

      await logAudit({
        userId,
        organizationId: deployedAgent.organizationId,
        action: 'agent_migrated',
        resource: 'ai_agent',
        resourceId: deployedAgent.agentId,
        details: { deploymentId, fromNode: oldNodeId, toNode: targetNodeId, duration }
      });

      this.emit('agentMigrated', { deploymentId, fromNode: oldNodeId, toNode: targetNodeId });

      return {
        success: true,
        data: { newNodeId: targetNodeId, duration }
      };

    } catch (error) {
      deployedAgent.status = 'running'; // Revert status
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      return { success: false, error: errorMessage };
    }
  }

  /**
   * Scale an agent deployment (add/remove replicas)
   */
  async scaleAgent(
    deploymentId: string,
    targetReplicaCount: number,
    userId: string
  ): Promise<ServiceResponse<{ previousCount: number; newCount: number }>> {
    const deployedAgent = this.deployedAgents.get(deploymentId);
    if (!deployedAgent) {
      return { success: false, error: 'Deployment not found' };
    }

    const currentCount = deployedAgent.replicas?.length || 1;

    try {
      logger.info(`[${deploymentId}] Scaling from ${currentCount} to ${targetReplicaCount} replicas`);

      if (targetReplicaCount > currentCount) {
        // Scale up - add replicas
        const newReplicas = await distributedExecutionLayer.replicateAgent(
          deployedAgent.agentId,
          targetReplicaCount,
          'active-passive'
        );

        deployedAgent.replicas = newReplicas.map(r => ({
          replicaId: r.replicaId,
          nodeId: r.nodeId,
          region: distributedExecutionLayer.getNode(r.nodeId)?.region || 'unknown',
          status: r.status
        }));

        this.recordScalingEvent({
          eventId: `scale-${uuidv4()}`,
          timestamp: new Date(),
          agentId: deployedAgent.agentId,
          organizationId: deployedAgent.organizationId,
          action: 'scale-up',
          reason: 'user_requested',
          from: { instances: currentCount },
          to: { instances: targetReplicaCount },
          duration: 0,
          success: true
        });

      } else if (targetReplicaCount < currentCount) {
        // Scale down - remove replicas
        const replicasToRemove = deployedAgent.replicas?.slice(targetReplicaCount) || [];
        
        for (const replica of replicasToRemove) {
          // Terminate replica
          const kernelProcess = agentKernel.getProcessByAgent(deployedAgent.agentId);
          if (kernelProcess && kernelProcess.pid !== deployedAgent.processId) {
            await agentKernel.kill(kernelProcess.pid, false);
          }
        }

        deployedAgent.replicas = deployedAgent.replicas?.slice(0, targetReplicaCount);

        this.recordScalingEvent({
          eventId: `scale-${uuidv4()}`,
          timestamp: new Date(),
          agentId: deployedAgent.agentId,
          organizationId: deployedAgent.organizationId,
          action: 'scale-down',
          reason: 'user_requested',
          from: { instances: currentCount },
          to: { instances: targetReplicaCount },
          duration: 0,
          success: true
        });
      }

      return {
        success: true,
        data: { previousCount: currentCount, newCount: targetReplicaCount }
      };

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      return { success: false, error: errorMessage };
    }
  }

  /**
   * Upgrade an agent to a new version (hot-swap)
   */
  async upgradeAgent(
    deploymentId: string,
    newVersion: string,
    newCode: string,
    userId: string,
    strategy: DeploymentStrategy = 'blue-green'
  ): Promise<ServiceResponse<Deployment>> {
    const deployedAgent = this.deployedAgents.get(deploymentId);
    if (!deployedAgent) {
      return { success: false, error: 'Deployment not found' };
    }

    try {
      logger.info(`[${deploymentId}] Upgrading to version ${newVersion}`);

      // Register new version
      const version = await hotSwapSystem.registerVersion(
        deployedAgent.agentId,
        newVersion,
        newCode,
        {},
        userId,
        [`Upgrade from ${deployedAgent.deployment.version} to ${newVersion}`]
      );

      // Deploy with hot-swap
      const deployment = await hotSwapSystem.deploy(
        deployedAgent.agentId,
        version.versionId,
        strategy,
        { autoRollback: true },
        userId
      );

      // Update deployed agent record
      deployedAgent.deployment.version = newVersion;
      deployedAgent.deployment.updatedAt = new Date();

      await logAudit({
        userId,
        organizationId: deployedAgent.organizationId,
        action: 'agent_upgraded',
        resource: 'ai_agent',
        resourceId: deployedAgent.agentId,
        details: { deploymentId, fromVersion: deployedAgent.deployment.version, toVersion: newVersion, strategy }
      });

      return {
        success: true,
        data: deployment
      };

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      return { success: false, error: errorMessage };
    }
  }

  /**
   * Rollback an agent to previous version
   */
  async rollbackAgent(
    deploymentId: string,
    userId: string,
    reason: string
  ): Promise<ServiceResponse<Deployment>> {
    const deployedAgent = this.deployedAgents.get(deploymentId);
    if (!deployedAgent) {
      return { success: false, error: 'Deployment not found' };
    }

    try {
      logger.info(`[${deploymentId}] Rolling back agent`);

      // Find active deployment
      const activeDeployment = hotSwapSystem.getActiveDeployment(deployedAgent.agentId);
      if (!activeDeployment) {
        return { success: false, error: 'No active deployment found' };
      }

      // Perform rollback
      const rollbackDeployment = await hotSwapSystem.rollback(
        activeDeployment.deploymentId,
        reason,
        true
      );

      await logAudit({
        userId,
        organizationId: deployedAgent.organizationId,
        action: 'agent_rollback',
        resource: 'ai_agent',
        resourceId: deployedAgent.agentId,
        details: { deploymentId, reason, rollbackDeploymentId: rollbackDeployment.deploymentId }
      });

      return {
        success: true,
        data: rollbackDeployment
      };

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      return { success: false, error: errorMessage };
    }
  }

  // ============================================
  // Query & Monitoring APIs
  // ============================================

  /**
   * Get deployed agent details
   */
  getDeployedAgent(deploymentId: string): DeployedAgent | undefined {
    return this.deployedAgents.get(deploymentId);
  }

  /**
   * List all deployed agents for an organization
   */
  getOrganizationAgents(organizationId: string): DeployedAgent[] {
    const deploymentIds = this.orgAgents.get(organizationId);
    if (!deploymentIds) return [];

    return Array.from(deploymentIds)
      .map(id => this.deployedAgents.get(id))
      .filter((a): a is DeployedAgent => a !== undefined);
  }

  /**
   * Get infrastructure health status
   */
  getInfrastructureHealth(): InfrastructureHealth {
    const nodes = distributedExecutionLayer.getAllNodes();
    const healthyNodes = nodes.filter(n => n.status === 'healthy');
    
    const allAgents = Array.from(this.deployedAgents.values());
    const runningAgents = allAgents.filter(a => a.status === 'running');

    // Calculate component health
    const componentHealth = (metric: number): 'healthy' | 'degraded' | 'critical' => {
      if (metric > 0.9) return 'healthy';
      if (metric > 0.7) return 'degraded';
      return 'critical';
    };

    const nodeHealthRatio = healthyNodes.length / (nodes.length || 1);
    const schedulerStats = resourceScheduler.getStats();
    const runningProcesses = agentKernel.listProcesses({ state: 'running' }).length;
    const totalProcesses = agentKernel.getStats().totalProcesses;

    return {
      overall: componentHealth(nodeHealthRatio),
      components: {
        scheduler: componentHealth(schedulerStats.utilization.cpu),
        sandbox: 'healthy', // Simplified
        kernel: componentHealth(runningProcesses / (totalProcesses || 1)),
        quotaManager: 'healthy',
        hotSwap: 'healthy',
        distributedMesh: componentHealth(nodeHealthRatio)
      },
      metrics: {
        totalAgents: allAgents.length,
        runningAgents: runningAgents.length,
        totalNodes: nodes.length,
        healthyNodes: healthyNodes.length,
        avgCpuUtilization: nodes.reduce((sum, n) => sum + n.stats.cpuUtilization, 0) / (nodes.length || 1),
        avgMemoryUtilization: nodes.reduce((sum, n) => sum + n.stats.memoryUtilization, 0) / (nodes.length || 1),
        failedDeployments24h: this.countFailedDeployments24h(),
        failovers24h: this.failoverHistory.filter(e => 
          e.timestamp > new Date(Date.now() - 24 * 60 * 60 * 1000)
        ).length
      }
    };
  }

  /**
   * Get resource usage report for organization
   */
  getResourceReport(organizationId: string, period: { start: Date; end: Date }) {
    return resourceQuotaManager.getUsageReport(organizationId, period);
  }

  /**
   * Get scaling/failover history
   */
  getScalingHistory(organizationId?: string): ScalingEvent[] {
    if (organizationId) {
      return this.scalingHistory.filter(e => e.organizationId === organizationId);
    }
    return this.scalingHistory;
  }

  // ============================================
  // Administrative APIs
  // ============================================

  /**
   * Assign quota plan to organization
   */
  async assignQuotaPlan(
    organizationId: string,
    planId: string,
    userId: string
  ): Promise<ServiceResponse<ResourceQuota[]>> {
    try {
      const quotas = await resourceQuotaManager.assignPlan(organizationId, planId);
      
      await logAudit({
        userId,
        organizationId,
        action: 'quota_plan_assigned',
        resource: 'quota_plan',
        resourceId: planId,
        details: { quotasCreated: quotas.length }
      });

      return { success: true, data: quotas };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      return { success: false, error: errorMessage };
    }
  }

  /**
   * Get available quota plans
   */
  getQuotaPlans(): QuotaPlan[] {
    return resourceQuotaManager.getPlans();
  }

  /**
   * Register a custom agent plugin
   */
  async registerPlugin(
    manifest: PluginManifest,
    code: string,
    userId: string
  ): Promise<ServiceResponse<string>> {
    try {
      const templateId = await pluginSystem.createAgentTemplate(
        manifest,
        code,
        userId
      );

      return { success: true, data: templateId };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      return { success: false, error: errorMessage };
    }
  }

  /**
   * Install marketplace plugin
   */
  async installPlugin(
    listingId: string,
    organizationId: string,
    userId: string
  ): Promise<ServiceResponse<string>> {
    try {
      const pluginId = await pluginSystem.installPlugin(
        listingId,
        organizationId,
        userId
      );

      return { success: true, data: pluginId };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      return { success: false, error: errorMessage };
    }
  }

  // ============================================
  // Private Helper Methods
  // ============================================

  private mapPriorityToResourcePriority(priority?: AgentPriority): 'low' | 'medium' | 'high' | 'critical' {
    const mapping: Record<AgentPriority, 'low' | 'medium' | 'high' | 'critical'> = {
      'idle': 'low',
      'low': 'low',
      'normal': 'medium',
      'high': 'high',
      'realtime': 'critical'
    };
    return priority ? mapping[priority] : 'medium';
  }

  private mapAgentPriorityToTaskPriority(priority?: AgentPriority): TaskPriority {
    const mapping: Record<AgentPriority, TaskPriority> = {
      'idle': 'background',
      'low': 'low',
      'normal': 'normal',
      'high': 'high',
      'realtime': 'critical'
    };
    return priority ? mapping[priority] : 'normal';
  }

  private recordScalingEvent(event: ScalingEvent): void {
    this.scalingHistory.push(event);
    this.emit('scalingEvent', event);
  }

  private countFailedDeployments24h(): number {
    // Simplified - would track actual failures
    return 0;
  }

  private initializeEventHandlers(): void {
    // Listen for kernel process events
    agentKernel.on('processUnresponsive', async ({ pid, agentId }) => {
      logger.warn(`Process ${pid} unresponsive - triggering failover`);
      
      // Find deployment
      for (const [deploymentId, agent] of this.deployedAgents) {
        if (agent.agentId === agentId) {
          try {
            // Attempt failover
            await distributedExecutionLayer.failoverAgent(agentId, agent.nodeId, true);
            
            this.recordScalingEvent({
              eventId: `failover-${uuidv4()}`,
              timestamp: new Date(),
              agentId,
              organizationId: agent.organizationId,
              action: 'failover',
              reason: 'process_unresponsive',
              from: { nodeId: agent.nodeId },
              to: {}, // Will be filled by failover result
              duration: 0,
              success: true
            });
          } catch (error) {
            logger.error(`Failover failed for agent ${agentId}: ${error}`);
          }
          break;
        }
      }
    });

    // Listen for node failures
    distributedExecutionLayer.on('nodeUnhealthy', async ({ nodeId, reason }) => {
      logger.warn(`Node ${nodeId} unhealthy: ${reason}`);
      
      // Find agents on this node and failover
      for (const [deploymentId, agent] of this.deployedAgents) {
        if (agent.nodeId === nodeId && agent.status === 'running') {
          try {
            await distributedExecutionLayer.failoverAgent(agent.agentId, nodeId, true);
            agent.status = 'migrating';
          } catch (error) {
            logger.error(`Failover failed for agent ${agent.agentId}: ${error}`);
          }
        }
      }
    });

    // Listen for hot-swap deployment events
    hotSwapSystem.on('deploymentFailed', ({ deploymentId, error }) => {
      logger.error(`Hot-swap deployment failed: ${error}`);
    });
  }

  private startMonitoring(): void {
    this.monitoringInterval = setInterval(() => {
      this.monitorDeployments();
    }, this.MONITORING_INTERVAL);
  }

  private monitorDeployments(): void {
    for (const [deploymentId, agent] of this.deployedAgents) {
      if (agent.status !== 'running') continue;

      // Update resource usage
      const process = agentKernel.getProcess(agent.processId);
      if (process) {
        agent.resources.used.cpuPercent = Math.random() * 50; // Would get actual metrics
        agent.resources.used.memoryMb = process.resources.memoryCurrentMb;
      }

      // Check sandbox health
      const sandbox = agentSandboxService.getSandbox(agent.sandboxId);
      if (sandbox) {
        agent.health = sandbox.health.status === 'healthy' ? 'healthy' : 'degraded';
      }
    }
  }

  // ============================================
  // Lifecycle Management
  // ============================================

  destroy(): void {
    if (this.monitoringInterval) {
      clearInterval(this.monitoringInterval);
    }
    this.removeAllListeners();
    logger.info('AI OS Infrastructure Service destroyed');
  }
}

// Export singleton instance
export const aiosInfrastructureService = new AIOSInfrastructureService();

// Export class for testing/customization
export { AIOSInfrastructureService };
