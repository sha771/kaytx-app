/**
 * Resource Allocation / Compute Scheduler
 * AI Operating System - Core Component #1
 * 
 * Manages compute resources (CPU, RAM, GPU) across all AI agents
 * Provides dynamic scaling, priority boosting, and cost optimization
 */

import { EventEmitter } from 'events';
import { v4 as uuidv4 } from 'uuid';
import { createLogger } from '../lib/production-logger';
import { logAudit } from '../lib/audit';

const logger = createLogger('ResourceScheduler');

// Resource Types
export interface ResourceAllocation {
  agentId: string;
  cpuQuota: number;           // CPU cores (can be fractional, e.g., 0.5)
  memoryLimit: number;        // RAM in MB
  gpuShares: number;          // GPU time slices (0-1)
  diskQuota: number;          // Disk space in MB
  networkBandwidth: number;   // Mbps
  priorityBoost: boolean;     // Real-time priority
  burstCapacity: boolean;     // Allow temporary over-allocation
}

export interface ResourceUsage {
  agentId: string;
  timestamp: Date;
  cpuPercent: number;         // Current CPU usage %
  memoryUsed: number;          // MB used
  gpuUtilization: number;      // GPU %
  diskIO: number;             // IOPS
  networkIO: number;          // MB/s
  activeTasks: number;
  queueDepth: number;
}

export interface ScalingPolicy {
  agentId: string;
  scaleUpThreshold: number;   // CPU % to trigger scale up
  scaleDownThreshold: number; // CPU % to trigger scale down
  minCpu: number;
  maxCpu: number;
  minMemory: number;
  maxMemory: number;
  cooldownPeriod: number;     // Seconds between scaling events
  lastScaleTime?: Date;
}

export interface ResourcePool {
  poolId: string;
  totalCpu: number;
  totalMemory: number;
  totalGpu: number;
  allocatedCpu: number;
  allocatedMemory: number;
  allocatedGpu: number;
  region: string;
  nodeType: 'cpu-optimized' | 'memory-optimized' | 'gpu-optimized' | 'balanced';
  agents: string[];
}

export interface ResourceReservation {
  reservationId: string;
  agentId: string;
  resources: ResourceAllocation;
  startTime: Date;
  endTime?: Date;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'pending' | 'active' | 'expired' | 'cancelled';
}

export interface CostTracking {
  agentId: string;
  organizationId: string;
  computeCost: number;          // Per hour
  storageCost: number;
  networkCost: number;
  totalCost: number;
  billingPeriod: string;
}

class ResourceScheduler extends EventEmitter {
  private allocations: Map<string, ResourceAllocation> = new Map();
  private usageHistory: Map<string, ResourceUsage[]> = new Map();
  private scalingPolicies: Map<string, ScalingPolicy> = new Map();
  private resourcePools: Map<string, ResourcePool> = new Map();
  private reservations: Map<string, ResourceReservation> = new Map();
  private costTracking: Map<string, CostTracking> = new Map();
  private monitoringInterval?: NodeJS.Timeout;
  private readonly MAX_HISTORY_LENGTH = 1000;

  constructor() {
    super();
    this.initializeDefaultPools();
    this.startMonitoring();
  }

  // Initialize default resource pools
  private initializeDefaultPools(): void {
    const pools: ResourcePool[] = [
      {
        poolId: 'pool-general-1',
        totalCpu: 64,
        totalMemory: 256 * 1024, // 256 GB
        totalGpu: 4,
        allocatedCpu: 0,
        allocatedMemory: 0,
        allocatedGpu: 0,
        region: 'us-east-1',
        nodeType: 'balanced',
        agents: []
      },
      {
        poolId: 'pool-gpu-1',
        totalCpu: 32,
        totalMemory: 512 * 1024, // 512 GB
        totalGpu: 8,
        allocatedCpu: 0,
        allocatedMemory: 0,
        allocatedGpu: 0,
        region: 'us-east-1',
        nodeType: 'gpu-optimized',
        agents: []
      },
      {
        poolId: 'pool-memory-1',
        totalCpu: 16,
        totalMemory: 1024 * 1024, // 1 TB
        totalGpu: 0,
        allocatedCpu: 0,
        allocatedMemory: 0,
        allocatedGpu: 0,
        region: 'us-west-1',
        nodeType: 'memory-optimized',
        agents: []
      }
    ];

    pools.forEach(pool => this.resourcePools.set(pool.poolId, pool));
    logger.info(`Initialized ${pools.length} resource pools`);
  }

  // Allocate resources to an agent
  async allocateResources(
    agentId: string,
    requirements: Partial<ResourceAllocation>,
    organizationId: string,
    priority: 'low' | 'medium' | 'high' | 'critical' = 'medium'
  ): Promise<ResourceAllocation> {
    // Find best pool for this agent
    const pool = this.selectOptimalPool(requirements);
    
    if (!pool) {
      throw new Error(`No resource pool available for agent ${agentId}`);
    }

    // Check if resources available
    const availableCpu = pool.totalCpu - pool.allocatedCpu;
    const availableMemory = pool.totalMemory - pool.allocatedMemory;
    const availableGpu = pool.totalGpu - pool.allocatedGpu;

    const requestedCpu = requirements.cpuQuota || 1;
    const requestedMemory = requirements.memoryLimit || 2048;
    const requestedGpu = requirements.gpuShares || 0;

    if (requestedCpu > availableCpu || 
        requestedMemory > availableMemory || 
        requestedGpu > availableGpu) {
      // Try to scale pool or queue request
      if (priority === 'critical') {
        await this.emergencyScale(pool.poolId, requestedCpu, requestedMemory, requestedGpu);
      } else {
        throw new Error(
          `Insufficient resources in pool ${pool.poolId}. ` +
          `Requested: CPU ${requestedCpu}, Memory ${requestedMemory}MB, GPU ${requestedGpu}. ` +
          `Available: CPU ${availableCpu}, Memory ${availableMemory}MB, GPU ${availableGpu}`
        );
      }
    }

    const allocation: ResourceAllocation = {
      agentId,
      cpuQuota: requestedCpu,
      memoryLimit: requestedMemory,
      gpuShares: requestedGpu,
      diskQuota: requirements.diskQuota || 10 * 1024, // 10 GB default
      networkBandwidth: requirements.networkBandwidth || 100,
      priorityBoost: priority === 'critical' || priority === 'high',
      burstCapacity: priority === 'critical'
    };

    // Update pool allocation
    pool.allocatedCpu += requestedCpu;
    pool.allocatedMemory += requestedMemory;
    pool.allocatedGpu += requestedGpu;
    pool.agents.push(agentId);

    this.allocations.set(agentId, allocation);

    // Set default scaling policy
    this.scalingPolicies.set(agentId, {
      agentId,
      scaleUpThreshold: 80,
      scaleDownThreshold: 20,
      minCpu: Math.max(0.5, requestedCpu * 0.5),
      maxCpu: requestedCpu * 4,
      minMemory: Math.max(1024, requestedMemory * 0.5),
      maxMemory: requestedMemory * 2,
      cooldownPeriod: 300 // 5 minutes
    });

    // Start cost tracking
    this.initializeCostTracking(agentId, organizationId, allocation);

    // Audit log
    await logAudit({
      userId: 'system',
      organizationId,
      action: 'resources_allocated',
      resource: 'compute_resources',
      resourceId: agentId,
      details: {
        poolId: pool.poolId,
        allocation,
        priority
      }
    });

    this.emit('resourcesAllocated', { agentId, allocation, poolId: pool.poolId });
    logger.info(`Allocated resources to agent ${agentId} in pool ${pool.poolId}`);

    return allocation;
  }

  // Select optimal pool based on requirements
  private selectOptimalPool(requirements: Partial<ResourceAllocation>): ResourcePool | undefined {
    const pools = Array.from(this.resourcePools.values());
    
    // Score each pool
    const scoredPools = pools.map(pool => {
      let score = 0;
      
      // Resource availability score
      const cpuAvailability = (pool.totalCpu - pool.allocatedCpu) / pool.totalCpu;
      const memoryAvailability = (pool.totalMemory - pool.allocatedMemory) / pool.totalMemory;
      score += (cpuAvailability + memoryAvailability) / 2;

      // Node type matching
      if (requirements.gpuShares && requirements.gpuShares > 0 && pool.nodeType === 'gpu-optimized') {
        score += 2;
      }
      if (requirements.memoryLimit && requirements.memoryLimit > 32 * 1024 && pool.nodeType === 'memory-optimized') {
        score += 1.5;
      }

      // Load balancing (prefer less loaded pools)
      const loadRatio = pool.agents.length / 20; // Assume 20 agents per pool is ideal
      score -= loadRatio * 0.5;

      return { pool, score };
    });

    // Sort by score descending
    scoredPools.sort((a, b) => b.score - a.score);
    
    return scoredPools[0]?.pool;
  }

  // Emergency scale a pool when critical resources needed
  private async emergencyScale(
    poolId: string, 
    neededCpu: number, 
    neededMemory: number, 
    neededGpu: number
  ): Promise<void> {
    logger.warn(`Emergency scaling pool ${poolId}`);
    
    const pool = this.resourcePools.get(poolId);
    if (!pool) throw new Error(`Pool ${poolId} not found`);

    // In real implementation, this would provision new cloud instances
    // For now, we simulate by increasing pool capacity
    pool.totalCpu += Math.max(neededCpu * 2, 16);
    pool.totalMemory += Math.max(neededMemory * 2, 64 * 1024);
    pool.totalGpu += Math.max(neededGpu * 2, 2);

    this.emit('poolScaled', { poolId, reason: 'emergency', pool });
    
    await logAudit({
      userId: 'system',
      organizationId: 'system',
      action: 'pool_emergency_scale',
      resource: 'resource_pool',
      resourceId: poolId,
      details: { addedCpu: neededCpu * 2, addedMemory: neededMemory * 2, addedGpu: neededGpu * 2 }
    });
  }

  // Release resources from an agent
  async releaseResources(agentId: string): Promise<void> {
    const allocation = this.allocations.get(agentId);
    if (!allocation) {
      logger.warn(`No allocation found for agent ${agentId}`);
      return;
    }

    // Find pool and release resources
    for (const pool of this.resourcePools.values()) {
      if (pool.agents.includes(agentId)) {
        pool.allocatedCpu -= allocation.cpuQuota;
        pool.allocatedMemory -= allocation.memoryLimit;
        pool.allocatedGpu -= allocation.gpuShares;
        pool.agents = pool.agents.filter(id => id !== agentId);
        break;
      }
    }

    this.allocations.delete(agentId);
    this.scalingPolicies.delete(agentId);
    this.usageHistory.delete(agentId);

    this.emit('resourcesReleased', { agentId });
    logger.info(`Released resources for agent ${agentId}`);
  }

  // Update resource usage for an agent
  recordUsage(agentId: string, usage: Partial<ResourceUsage>): void {
    const fullUsage: ResourceUsage = {
      agentId,
      timestamp: new Date(),
      cpuPercent: usage.cpuPercent || 0,
      memoryUsed: usage.memoryUsed || 0,
      gpuUtilization: usage.gpuUtilization || 0,
      diskIO: usage.diskIO || 0,
      networkIO: usage.networkIO || 0,
      activeTasks: usage.activeTasks || 0,
      queueDepth: usage.queueDepth || 0
    };

    let history = this.usageHistory.get(agentId);
    if (!history) {
      history = [];
      this.usageHistory.set(agentId, history);
    }

    history.push(fullUsage);

    // Keep history bounded
    if (history.length > this.MAX_HISTORY_LENGTH) {
      history.shift();
    }

    // Check if scaling needed
    this.evaluateScaling(agentId, fullUsage);
    
    // Update cost tracking
    this.updateCostTracking(agentId, fullUsage);
  }

  // Evaluate if agent needs scaling
  private evaluateScaling(agentId: string, usage: ResourceUsage): void {
    const policy = this.scalingPolicies.get(agentId);
    const allocation = this.allocations.get(agentId);
    
    if (!policy || !allocation) return;

    // Check cooldown
    if (policy.lastScaleTime) {
      const secondsSinceScale = (Date.now() - policy.lastScaleTime.getTime()) / 1000;
      if (secondsSinceScale < policy.cooldownPeriod) return;
    }

    const cpuUtilization = (usage.cpuPercent / 100) * allocation.cpuQuota;
    const cpuPercent = (cpuUtilization / allocation.cpuQuota) * 100;

    // Scale up
    if (cpuPercent > policy.scaleUpThreshold && allocation.cpuQuota < policy.maxCpu) {
      const newCpu = Math.min(allocation.cpuQuota * 1.5, policy.maxCpu);
      this.scaleAgent(agentId, { cpuQuota: newCpu });
      policy.lastScaleTime = new Date();
    }

    // Scale down
    if (cpuPercent < policy.scaleDownThreshold && allocation.cpuQuota > policy.minCpu) {
      const newCpu = Math.max(allocation.cpuQuota * 0.75, policy.minCpu);
      this.scaleAgent(agentId, { cpuQuota: newCpu });
      policy.lastScaleTime = new Date();
    }
  }

  // Scale an agent's resources
  async scaleAgent(agentId: string, newAllocation: Partial<ResourceAllocation>): Promise<void> {
    const current = this.allocations.get(agentId);
    if (!current) throw new Error(`No allocation found for agent ${agentId}`);

    const delta: Partial<ResourceAllocation> = {};
    
    if (newAllocation.cpuQuota) {
      delta.cpuQuota = newAllocation.cpuQuota - current.cpuQuota;
    }
    if (newAllocation.memoryLimit) {
      delta.memoryLimit = newAllocation.memoryLimit - current.memoryLimit;
    }
    if (newAllocation.gpuShares) {
      delta.gpuShares = newAllocation.gpuShares - current.gpuShares;
    }

    // Update pool allocations
    for (const pool of this.resourcePools.values()) {
      if (pool.agents.includes(agentId)) {
        if (delta.cpuQuota) pool.allocatedCpu += delta.cpuQuota;
        if (delta.memoryLimit) pool.allocatedMemory += delta.memoryLimit;
        if (delta.gpuShares) pool.allocatedGpu += delta.gpuShares;
        break;
      }
    }

    // Update allocation
    Object.assign(current, newAllocation);

    this.emit('agentScaled', { agentId, newAllocation, delta });
    logger.info(`Scaled agent ${agentId}: CPU ${delta.cpuQuota}, Memory ${delta.memoryLimit}`);
  }

  // Get resource metrics for an agent
  getAgentMetrics(agentId: string): {
    allocation: ResourceAllocation | undefined;
    currentUsage: ResourceUsage | undefined;
    averageCpu: number;
    averageMemory: number;
    peakCpu: number;
    peakMemory: number;
  } {
    const allocation = this.allocations.get(agentId);
    const history = this.usageHistory.get(agentId) || [];

    const currentUsage = history[history.length - 1];
    
    const avgCpu = history.length > 0 
      ? history.reduce((sum, u) => sum + u.cpuPercent, 0) / history.length 
      : 0;
    const avgMemory = history.length > 0 
      ? history.reduce((sum, u) => sum + u.memoryUsed, 0) / history.length 
      : 0;
    const peakCpu = history.length > 0 
      ? Math.max(...history.map(u => u.cpuPercent)) 
      : 0;
    const peakMemory = history.length > 0 
      ? Math.max(...history.map(u => u.memoryUsed)) 
      : 0;

    return {
      allocation,
      currentUsage,
      averageCpu: avgCpu,
      averageMemory: avgMemory,
      peakCpu,
      peakMemory
    };
  }

  // Get pool status
  getPoolStatus(poolId: string): ResourcePool | undefined {
    return this.resourcePools.get(poolId);
  }

  getAllPools(): ResourcePool[] {
    return Array.from(this.resourcePools.values());
  }

  // Initialize cost tracking
  private initializeCostTracking(agentId: string, organizationId: string, allocation: ResourceAllocation): void {
    const hourlyCost = this.calculateHourlyCost(allocation);
    
    const tracking: CostTracking = {
      agentId,
      organizationId,
      computeCost: hourlyCost,
      storageCost: (allocation.diskQuota / 1024) * 0.10, // $0.10 per GB
      networkCost: 0,
      totalCost: hourlyCost,
      billingPeriod: new Date().toISOString().slice(0, 7) // YYYY-MM
    };

    this.costTracking.set(agentId, tracking);
  }

  // Calculate hourly cost based on allocation
  private calculateHourlyCost(allocation: ResourceAllocation): number {
    const cpuCost = allocation.cpuQuota * 0.05;      // $0.05 per CPU core/hour
    const memoryCost = (allocation.memoryLimit / 1024) * 0.02; // $0.02 per GB/hour
    const gpuCost = allocation.gpuShares * 2.00;     // $2.00 per GPU/hour
    
    return cpuCost + memoryCost + gpuCost;
  }

  // Update cost based on usage
  private updateCostTracking(agentId: string, usage: ResourceUsage): void {
    const tracking = this.costTracking.get(agentId);
    if (!tracking) return;

    // Add network cost based on IO
    const networkCost = (usage.networkIO / 1024) * 0.01; // $0.01 per GB transferred
    tracking.networkCost += networkCost;
    tracking.totalCost = tracking.computeCost + tracking.storageCost + tracking.networkCost;
  }

  // Get cost report for an agent
  getCostReport(agentId: string): CostTracking | undefined {
    return this.costTracking.get(agentId);
  }

  // Get cost report for organization
  getOrganizationCostReport(organizationId: string): {
    totalCompute: number;
    totalStorage: number;
    totalNetwork: number;
    totalCost: number;
    agentCount: number;
  } {
    const orgAgents = Array.from(this.costTracking.values())
      .filter(t => t.organizationId === organizationId);

    return {
      totalCompute: orgAgents.reduce((sum, t) => sum + t.computeCost, 0),
      totalStorage: orgAgents.reduce((sum, t) => sum + t.storageCost, 0),
      totalNetwork: orgAgents.reduce((sum, t) => sum + t.networkCost, 0),
      totalCost: orgAgents.reduce((sum, t) => sum + t.totalCost, 0),
      agentCount: orgAgents.length
    };
  }

  // Reserve resources for future use
  async reserveResources(
    agentId: string,
    resources: ResourceAllocation,
    duration: number, // minutes
    priority: 'low' | 'medium' | 'high' | 'critical'
  ): Promise<ResourceReservation> {
    const reservation: ResourceReservation = {
      reservationId: uuidv4(),
      agentId,
      resources,
      startTime: new Date(),
      endTime: new Date(Date.now() + duration * 60 * 1000),
      priority,
      status: 'pending'
    };

    this.reservations.set(reservation.reservationId, reservation);

    // If high priority, immediately allocate
    if (priority === 'critical' || priority === 'high') {
      reservation.status = 'active';
      await this.allocateResources(agentId, resources, 'system', priority);
    }

    this.emit('resourcesReserved', { reservation });
    return reservation;
  }

  // Start monitoring loop
  private startMonitoring(): void {
    this.monitoringInterval = setInterval(() => {
      this.collectSystemMetrics();
    }, 30000); // Every 30 seconds
  }

  // Collect system-wide metrics
  private collectSystemMetrics(): void {
    const totalAllocated = Array.from(this.allocations.values()).reduce((sum, a) => ({
      cpu: sum.cpu + a.cpuQuota,
      memory: sum.memory + a.memoryLimit,
      gpu: sum.gpu + a.gpuShares
    }), { cpu: 0, memory: 0, gpu: 0 });

    const poolUtilization = Array.from(this.resourcePools.values()).map(pool => ({
      poolId: pool.poolId,
      cpuUtilization: (pool.allocatedCpu / pool.totalCpu) * 100,
      memoryUtilization: (pool.allocatedMemory / pool.totalMemory) * 100,
      gpuUtilization: (pool.allocatedGpu / pool.totalGpu) * 100,
      agentCount: pool.agents.length
    }));

    this.emit('systemMetrics', {
      timestamp: new Date(),
      totalAllocated,
      poolUtilization,
      activeAgents: this.allocations.size,
      activeReservations: this.reservations.size
    });
  }

  // Cleanup
  destroy(): void {
    if (this.monitoringInterval) {
      clearInterval(this.monitoringInterval);
    }
    this.removeAllListeners();
  }
}

// Singleton instance
export const resourceScheduler = new ResourceScheduler();

// Export types
export type { ResourceScheduler };
