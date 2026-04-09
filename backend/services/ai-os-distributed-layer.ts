/**
 * Distributed Execution Layer
 * AI Operating System - Core Component #7
 * 
 * Spreads agents across multiple servers for scale and reliability
 * Automatic load balancing, failover, replication, and geographic distribution
 */

import { EventEmitter } from 'events';
import { v4 as uuidv4 } from 'uuid';
import { createLogger } from '../lib/production-logger';
import { logAudit } from '../lib/audit';

const logger = createLogger('DistributedMesh');

// Node Types
export type NodeStatus = 'healthy' | 'degraded' | 'unhealthy' | 'offline' | 'maintenance';
export type NodeRole = 'master' | 'worker' | 'edge' | 'relay';
export type TaskPriority = 'critical' | 'high' | 'normal' | 'low' | 'background';

export interface Node {
  nodeId: string;
  name: string;
  region: string;
  zone: string;
  
  // Status
  status: NodeStatus;
  role: NodeRole;
  lastHeartbeat: Date;
  
  // Capabilities
  resources: NodeResources;
  availableResources: NodeResources;
  
  // Network
  address: {
    internal: string;
    external?: string;
    hostname: string;
  };
  latency: Record<string, number>; // nodeId -> latency ms
  
  // Metadata
  tags: string[];
  version: string;
  capabilities: string[];
  
  // Statistics
  stats: NodeStats;
  
  // Agent assignments
  assignedAgents: string[];
  agentCount: number;
}

export interface NodeResources {
  cpuCores: number;
  memoryGb: number;
  gpuCount: number;
  storageGb: number;
  bandwidthGbps: number;
}

export interface NodeStats {
  cpuUtilization: number;
  memoryUtilization: number;
  gpuUtilization: number;
  diskUtilization: number;
  networkUtilization: number;
  activeConnections: number;
  requestRate: number;
  errorRate: number;
  avgResponseTime: number;
}

export interface DistributedTask {
  taskId: string;
  agentId: string;
  organizationId: string;
  priority: TaskPriority;
  
  // Task details
  type: string;
  payload: any;
  
  // Routing
  sourceNode?: string;
  targetNode?: string;
  preferredRegion?: string;
  
  // Execution
  createdAt: Date;
  scheduledAt?: Date;
  startedAt?: Date;
  completedAt?: Date;
  
  // Status
  status: 'pending' | 'scheduled' | 'running' | 'completed' | 'failed' | 'retrying';
  retryCount: number;
  maxRetries: number;
  
  // Results
  result?: any;
  error?: string;
  
  // Routing history
  routeHistory: Array<{
    nodeId: string;
    action: 'received' | 'started' | 'completed' | 'failed';
    timestamp: Date;
  }>;
}

export interface AgentReplica {
  replicaId: string;
  agentId: string;
  nodeId: string;
  
  // Replication type
  type: 'primary' | 'backup' | 'read' | 'geo';
  priority: number; // Failover priority (lower = higher priority)
  
  // State
  status: 'syncing' | 'active' | 'stale' | 'failed';
  lagMs: number; // Replication lag
  lastSync: Date;
  
  // Data
  stateSnapshot: any;
  dataVersion: number;
}

export interface LoadBalancerConfig {
  strategy: 'round-robin' | 'least-connections' | 'least-latency' | 'weighted' | 'geo-proximity' | 'consistent-hash';
  healthCheckInterval: number;
  failoverEnabled: boolean;
  stickySessions: boolean;
  weights?: Record<string, number>; // nodeId -> weight
}

export interface RoutingDecision {
  taskId: string;
  selectedNode: string;
  strategy: string;
  reasoning: string;
  alternatives: string[];
  estimatedLatency: number;
  estimatedCost: number;
}

export interface FailoverEvent {
  eventId: string;
  timestamp: Date;
  agentId: string;
  fromNode: string;
  toNode: string;
  reason: string;
  duration: number;
  dataLoss: boolean;
  automatic: boolean;
}

export interface MeshTopology {
  nodes: Node[];
  connections: Array<{
    from: string;
    to: string;
    latency: number;
    bandwidth: number;
    healthy: boolean;
  }>;
  partitions: string[][]; // Groups of connected nodes
}

class DistributedExecutionLayer extends EventEmitter {
  private nodes: Map<string, Node> = new Map();
  private tasks: Map<string, DistributedTask> = new Map();
  private replicas: Map<string, AgentReplica> = new Map();
  private agentReplicas: Map<string, Set<string>> = new Map(); // agentId -> replicaIds
  private taskQueue: DistributedTask[] = [];
  private failoverHistory: FailoverEvent[] = [];
  private loadBalancer: LoadBalancerConfig;
  private heartbeatInterval?: NodeJS.Timeout;
  private taskSchedulerInterval?: NodeJS.Timeout;
  private localNodeId: string;
  
  private readonly HEARTBEAT_INTERVAL = 5000; // 5 seconds
  private readonly TASK_SCHEDULER_INTERVAL = 100; // 100ms
  private readonly MAX_TASK_AGE_MS = 300000; // 5 minutes
  private readonly FAILOVER_TIMEOUT_MS = 30000; // 30 seconds

  constructor(localNodeId?: string) {
    super();
    this.localNodeId = localNodeId || `node-${uuidv4()}`;
    
    this.loadBalancer = {
      strategy: 'least-connections',
      healthCheckInterval: 10000,
      failoverEnabled: true,
      stickySessions: true
    };

    this.initializeLocalNode();
    this.startHeartbeat();
    this.startTaskScheduler();
  }

  // Initialize local node
  private initializeLocalNode(): void {
    const localNode: Node = {
      nodeId: this.localNodeId,
      name: 'local-master',
      region: 'us-east-1',
      zone: 'a',
      status: 'healthy',
      role: 'master',
      lastHeartbeat: new Date(),
      resources: {
        cpuCores: 32,
        memoryGb: 128,
        gpuCount: 4,
        storageGb: 2000,
        bandwidthGbps: 10
      },
      availableResources: {
        cpuCores: 32,
        memoryGb: 128,
        gpuCount: 4,
        storageGb: 2000,
        bandwidthGbps: 10
      },
      address: {
        internal: '127.0.0.1',
        hostname: 'localhost'
      },
      latency: {},
      tags: ['master', 'us-east'],
      version: '1.0.0',
      capabilities: ['gpu', 'high-memory', 'compute-intensive'],
      stats: {
        cpuUtilization: 0,
        memoryUtilization: 0,
        gpuUtilization: 0,
        diskUtilization: 0,
        networkUtilization: 0,
        activeConnections: 0,
        requestRate: 0,
        errorRate: 0,
        avgResponseTime: 0
      },
      assignedAgents: [],
      agentCount: 0
    };

    this.nodes.set(this.localNodeId, localNode);
    logger.info(`Initialized local node ${this.localNodeId}`);
  }

  // Register a new node in the mesh
  async registerNode(node: Omit<Node, 'stats' | 'assignedAgents' | 'agentCount'>): Promise<Node> {
    const fullNode: Node = {
      ...node,
      stats: {
        cpuUtilization: 0,
        memoryUtilization: 0,
        gpuUtilization: 0,
        diskUtilization: 0,
        networkUtilization: 0,
        activeConnections: 0,
        requestRate: 0,
        errorRate: 0,
        avgResponseTime: 0
      },
      assignedAgents: [],
      agentCount: 0
    };

    this.nodes.set(node.nodeId, fullNode);

    await logAudit({
      userId: 'system',
      organizationId: 'system',
      action: 'node_registered',
      resource: 'distributed_node',
      resourceId: node.nodeId,
      details: { region: node.region, role: node.role, resources: node.resources }
    });

    this.emit('nodeRegistered', { nodeId: node.nodeId, region: node.region });
    logger.info(`Node ${node.nodeId} registered in region ${node.region}`);

    return fullNode;
  }

  // Remove a node
  async deregisterNode(nodeId: string): Promise<void> {
    const node = this.nodes.get(nodeId);
    if (!node) return;

    // Failover all agents on this node
    if (node.assignedAgents.length > 0) {
      logger.warn(`Node ${nodeId} has ${node.assignedAgents.length} agents - initiating failover`);
      
      for (const agentId of node.assignedAgents) {
        await this.failoverAgent(agentId, nodeId);
      }
    }

    this.nodes.delete(nodeId);

    await logAudit({
      userId: 'system',
      organizationId: 'system',
      action: 'node_deregistered',
      resource: 'distributed_node',
      resourceId: nodeId
    });

    this.emit('nodeDeregistered', { nodeId });
    logger.info(`Node ${nodeId} deregistered`);
  }

  // Place an agent on the optimal node
  async placeAgent(
    agentId: string,
    organizationId: string,
    requirements: {
      cpuCores: number;
      memoryGb: number;
      gpuCount?: number;
      preferredRegion?: string;
      capabilities?: string[];
    },
    priority: TaskPriority = 'normal'
  ): Promise<{ nodeId: string; node: Node }> {
    // Find best node
    const targetNode = this.selectOptimalNode(requirements, agentId);
    
    if (!targetNode) {
      throw new Error(`No available node for agent ${agentId} with requirements: ${JSON.stringify(requirements)}`);
    }

    // Reserve resources
    targetNode.availableResources.cpuCores -= requirements.cpuCores;
    targetNode.availableResources.memoryGb -= requirements.memoryGb;
    if (requirements.gpuCount) {
      targetNode.availableResources.gpuCount -= requirements.gpuCount;
    }
    targetNode.assignedAgents.push(agentId);
    targetNode.agentCount++;

    // Create task for agent placement
    const task: DistributedTask = {
      taskId: `place-${uuidv4()}`,
      agentId,
      organizationId,
      priority,
      type: 'agent-placement',
      payload: { agentId, requirements },
      sourceNode: this.localNodeId,
      targetNode: targetNode.nodeId,
      createdAt: new Date(),
      status: 'pending',
      retryCount: 0,
      maxRetries: 3,
      routeHistory: []
    };

    this.tasks.set(task.taskId, task);
    this.taskQueue.push(task);

    this.emit('agentPlaced', { agentId, nodeId: targetNode.nodeId, organizationId });
    logger.info(`Placed agent ${agentId} on node ${targetNode.nodeId}`);

    return { nodeId: targetNode.nodeId, node: targetNode };
  }

  // Select optimal node for agent placement
  private selectOptimalNode(
    requirements: {
      cpuCores: number;
      memoryGb: number;
      gpuCount?: number;
      preferredRegion?: string;
      capabilities?: string[];
    },
    agentId?: string
  ): Node | undefined {
    const candidates: Array<{ node: Node; score: number }> = [];

    for (const node of this.nodes.values()) {
      // Check if node has capacity
      if (node.availableResources.cpuCores < requirements.cpuCores) continue;
      if (node.availableResources.memoryGb < requirements.memoryGb) continue;
      if (requirements.gpuCount && node.availableResources.gpuCount < requirements.gpuCount) continue;
      
      // Check if node is healthy
      if (node.status !== 'healthy' && node.status !== 'degraded') continue;

      let score = 100; // Base score

      // Prefer less loaded nodes
      const loadFactor = node.agentCount / 20; // Assume 20 agents per node is ideal
      score -= loadFactor * 30;

      // Prefer matching capabilities
      if (requirements.capabilities) {
        const matchingCaps = requirements.capabilities.filter(c => 
          node.capabilities.includes(c)
        ).length;
        score += (matchingCaps / requirements.capabilities.length) * 20;
      }

      // Prefer preferred region
      if (requirements.preferredRegion && node.region === requirements.preferredRegion) {
        score += 25;
      }

      // Prefer geographically close to related agents (if any)
      if (agentId) {
        const relatedNodes = this.findRelatedAgentsNodes(agentId);
        if (relatedNodes.includes(node.nodeId)) {
          score += 15; // Co-location bonus
        }
      }

      // Penalize degraded nodes
      if (node.status === 'degraded') {
        score -= 50;
      }

      candidates.push({ node, score });
    }

    // Sort by score descending
    candidates.sort((a, b) => b.score - a.score);

    return candidates[0]?.node;
  }

  // Find nodes where related agents are running
  private findRelatedAgentsNodes(agentId: string): string[] {
    // In production: Look at agent relationships, org chart, etc.
    // For now, return empty
    return [];
  }

  // Replicate an agent across multiple nodes
  async replicateAgent(
    agentId: string,
    nodeCount: number = 3,
    strategy: 'active-active' | 'active-passive' | 'geo-distributed' = 'active-passive'
  ): Promise<AgentReplica[]> {
    const primaryNode = this.findAgentNode(agentId);
    if (!primaryNode) {
      throw new Error(`Agent ${agentId} not found on any node`);
    }

    const replicas: AgentReplica[] = [];
    const replicaIds = new Set<string>();

    // Select nodes for replication
    const targetNodes = this.selectReplicationNodes(primaryNode, nodeCount - 1, strategy);

    for (let i = 0; i < targetNodes.length; i++) {
      const node = targetNodes[i];
      
      const replica: AgentReplica = {
        replicaId: `replica-${uuidv4()}`,
        agentId,
        nodeId: node.nodeId,
        type: i === 0 ? 'primary' : 'backup',
        priority: i + 1,
        status: 'syncing',
        lagMs: 0,
        lastSync: new Date(),
        stateSnapshot: null,
        dataVersion: 0
      };

      replicas.push(replica);
      replicaIds.add(replica.replicaId);
      this.replicas.set(replica.replicaId, replica);

      // Update node assignments
      node.assignedAgents.push(agentId);
    }

    // Track replicas for this agent
    this.agentReplicas.set(agentId, replicaIds);

    // Start replication
    await this.startReplication(agentId, replicas);

    this.emit('agentReplicated', { agentId, replicaCount: replicas.length, strategy });
    logger.info(`Replicated agent ${agentId} to ${replicas.length} nodes with ${strategy} strategy`);

    return replicas;
  }

  // Select nodes for replication
  private selectReplicationNodes(
    primaryNode: Node,
    count: number,
    strategy: string
  ): Node[] {
    const candidates = Array.from(this.nodes.values())
      .filter(n => n.nodeId !== primaryNode.nodeId && n.status === 'healthy');

    if (strategy === 'geo-distributed') {
      // Select nodes in different regions
      const regions = new Set<string>();
      const selected: Node[] = [];

      for (const node of candidates) {
        if (!regions.has(node.region) && selected.length < count) {
          selected.push(node);
          regions.add(node.region);
        }
      }

      return selected;
    } else {
      // Select based on capacity and proximity
      return candidates
        .sort((a, b) => {
          // Prefer closer nodes
          const latencyA = primaryNode.latency[a.nodeId] || 100;
          const latencyB = primaryNode.latency[b.nodeId] || 100;
          return latencyA - latencyB;
        })
        .slice(0, count);
    }
  }

  // Start replication for an agent
  private async startReplication(agentId: string, replicas: AgentReplica[]): Promise<void> {
    const primary = replicas.find(r => r.type === 'primary');
    if (!primary) return;

    // In production: Setup actual replication stream
    // For now, simulate
    await this.sleep(1000);

    for (const replica of replicas) {
      replica.status = 'active';
      replica.lastSync = new Date();
    }

    logger.info(`Replication started for agent ${agentId}`);
  }

  // Handle agent failover
  async failoverAgent(agentId: string, failedNodeId: string, automatic: boolean = true): Promise<{ 
    success: boolean; 
    newNodeId?: string; 
    duration: number;
  }> {
    const startTime = Date.now();

    logger.warn(`Failing over agent ${agentId} from node ${failedNodeId}`);

    // Find replicas
    const replicaIds = this.agentReplicas.get(agentId);
    if (!replicaIds || replicaIds.size === 0) {
      logger.error(`No replicas found for agent ${agentId}`);
      return { success: false, duration: Date.now() - startTime };
    }

    // Find best replica to promote
    const replicas = Array.from(replicaIds)
      .map(id => this.replicas.get(id))
      .filter((r): r is AgentReplica => r !== undefined && r.nodeId !== failedNodeId)
      .sort((a, b) => a.priority - b.priority);

    if (replicas.length === 0) {
      logger.error(`No healthy replicas for agent ${agentId}`);
      return { success: false, duration: Date.now() - startTime };
    }

    const bestReplica = replicas[0];
    const newNode = this.nodes.get(bestReplica.nodeId);

    if (!newNode) {
      logger.error(`Replica node ${bestReplica.nodeId} not found`);
      return { success: false, duration: Date.now() - startTime };
    }

    // Promote replica to primary
    bestReplica.type = 'primary';
    bestReplica.priority = 0;

    // Update node assignments
    const failedNode = this.nodes.get(failedNodeId);
    if (failedNode) {
      failedNode.assignedAgents = failedNode.assignedAgents.filter(id => id !== agentId);
      failedNode.agentCount--;
    }

    newNode.agentCount++;

    // Record failover
    const event: FailoverEvent = {
      eventId: `failover-${uuidv4()}`,
      timestamp: new Date(),
      agentId,
      fromNode: failedNodeId,
      toNode: bestReplica.nodeId,
      reason: 'node_failure',
      duration: Date.now() - startTime,
      dataLoss: bestReplica.lagMs > 1000, // Potential data loss if lag > 1s
      automatic
    };

    this.failoverHistory.push(event);

    await logAudit({
      userId: 'system',
      organizationId: 'system',
      action: 'agent_failover',
      resource: 'distributed_agent',
      resourceId: agentId,
      details: { fromNode: failedNodeId, toNode: bestReplica.nodeId, duration: event.duration }
    });

    this.emit('agentFailover', event);
    logger.info(`Agent ${agentId} failed over to node ${bestReplica.nodeId} in ${event.duration}ms`);

    // Create new backup replica if needed
    if (replicas.length < 2) {
      await this.replicateAgent(agentId, 3);
    }

    return { success: true, newNodeId: bestReplica.nodeId, duration: event.duration };
  }

  // Submit a task for distributed execution
  async submitTask(
    agentId: string,
    organizationId: string,
    type: string,
    payload: any,
    priority: TaskPriority = 'normal',
    options?: {
      preferredRegion?: string;
      maxRetries?: number;
    }
  ): Promise<DistributedTask> {
    const task: DistributedTask = {
      taskId: `task-${uuidv4()}`,
      agentId,
      organizationId,
      priority,
      type,
      payload,
      preferredRegion: options?.preferredRegion,
      createdAt: new Date(),
      status: 'pending',
      retryCount: 0,
      maxRetries: options?.maxRetries || 3,
      routeHistory: []
    };

    this.tasks.set(task.taskId, task);
    
    // Add to queue based on priority
    this.insertIntoQueue(task);

    this.emit('taskSubmitted', { taskId: task.taskId, agentId, priority });
    logger.debug(`Task ${task.taskId} submitted for agent ${agentId}`);

    return task;
  }

  // Insert task into priority queue
  private insertIntoQueue(task: DistributedTask): void {
    const priorityOrder: Record<TaskPriority, number> = {
      'critical': 0,
      'high': 1,
      'normal': 2,
      'low': 3,
      'background': 4
    };

    const taskPriority = priorityOrder[task.priority];
    
    // Find insertion point
    let insertIndex = this.taskQueue.length;
    for (let i = 0; i < this.taskQueue.length; i++) {
      if (priorityOrder[this.taskQueue[i].priority] > taskPriority) {
        insertIndex = i;
        break;
      }
    }

    this.taskQueue.splice(insertIndex, 0, task);
  }

  // Route task to appropriate node
  private async routeTask(task: DistributedTask): Promise<RoutingDecision> {
    const agentId = task.agentId;
    
    // Find where agent is running
    const agentNode = this.findAgentNode(agentId);
    
    if (!agentNode) {
      throw new Error(`Agent ${agentId} not found on any node`);
    }

    // If agent has preferred region and current node doesn't match, consider migration
    if (task.preferredRegion && agentNode.region !== task.preferredRegion) {
      const closerNode = this.selectOptimalNode({
        cpuCores: 1,
        memoryGb: 1,
        preferredRegion: task.preferredRegion
      }, agentId);

      if (closerNode && closerNode.nodeId !== agentNode.nodeId) {
        // Could trigger migration here
        logger.info(`Task ${task.taskId} preferred region ${task.preferredRegion} but agent on ${agentNode.region}`);
      }
    }

    const decision: RoutingDecision = {
      taskId: task.taskId,
      selectedNode: agentNode.nodeId,
      strategy: this.loadBalancer.strategy,
      reasoning: `Agent ${agentId} is running on node ${agentNode.nodeId}`,
      alternatives: [],
      estimatedLatency: agentNode.latency[this.localNodeId] || 50,
      estimatedCost: 0.001
    };

    return decision;
  }

  // Find which node an agent is running on
  private findAgentNode(agentId: string): Node | undefined {
    for (const node of this.nodes.values()) {
      if (node.assignedAgents.includes(agentId)) {
        return node;
      }
    }
    return undefined;
  }

  // Execute task on target node
  private async executeTask(task: DistributedTask): Promise<void> {
    const decision = await this.routeTask(task);
    const targetNode = this.nodes.get(decision.selectedNode);

    if (!targetNode) {
      throw new Error(`Target node ${decision.selectedNode} not found`);
    }

    task.targetNode = targetNode.nodeId;
    task.status = 'running';
    task.startedAt = new Date();
    task.routeHistory.push({
      nodeId: targetNode.nodeId,
      action: 'started',
      timestamp: new Date()
    });

    // In production: RPC call to target node
    // For now, simulate execution
    await this.sleep(100);

    // Simulate result
    task.status = 'completed';
    task.completedAt = new Date();
    task.result = { success: true, data: `Executed ${task.type}` };
    task.routeHistory.push({
      nodeId: targetNode.nodeId,
      action: 'completed',
      timestamp: new Date()
    });

    this.emit('taskCompleted', { taskId: task.taskId, agentId: task.agentId });
  }

  // Get mesh topology
  getTopology(): MeshTopology {
    const nodes = Array.from(this.nodes.values());
    
    const connections: MeshTopology['connections'] = [];
    const nodeIds = nodes.map(n => n.nodeId);

    // Build connection graph
    for (let i = 0; i < nodeIds.length; i++) {
      for (let j = i + 1; j < nodeIds.length; j++) {
        const nodeA = this.nodes.get(nodeIds[i])!;
        const nodeB = this.nodes.get(nodeIds[j])!;
        
        const latency = nodeA.latency[nodeB.nodeId] || nodeB.latency[nodeA.nodeId] || 100;
        
        connections.push({
          from: nodeA.nodeId,
          to: nodeB.nodeId,
          latency,
          bandwidth: 1000, // Mbps
          healthy: nodeA.status === 'healthy' && nodeB.status === 'healthy'
        });
      }
    }

    // Find partitions (simplified)
    const partitions = [nodeIds]; // All connected in this implementation

    return { nodes, connections, partitions };
  }

  // Get node status
  getNode(nodeId: string): Node | undefined {
    return this.nodes.get(nodeId);
  }

  // Get all nodes
  getAllNodes(): Node[] {
    return Array.from(this.nodes.values());
  }

  // Get node statistics
  getNodeStats(nodeId: string): NodeStats | undefined {
    return this.nodes.get(nodeId)?.stats;
  }

  // Get task status
  getTask(taskId: string): DistributedTask | undefined {
    return this.tasks.get(taskId);
  }

  // Get agent replicas
  getAgentReplicas(agentId: string): AgentReplica[] {
    const replicaIds = this.agentReplicas.get(agentId);
    if (!replicaIds) return [];

    return Array.from(replicaIds)
      .map(id => this.replicas.get(id))
      .filter((r): r is AgentReplica => r !== undefined);
  }

  // Get failover history
  getFailoverHistory(agentId?: string): FailoverEvent[] {
    if (agentId) {
      return this.failoverHistory.filter(e => e.agentId === agentId);
    }
    return this.failoverHistory;
  }

  // Update node heartbeat
  recordHeartbeat(nodeId: string, stats: Partial<NodeStats>): void {
    const node = this.nodes.get(nodeId);
    if (!node) return;

    node.lastHeartbeat = new Date();
    node.status = 'healthy';
    
    if (stats) {
      Object.assign(node.stats, stats);
    }

    // Check if node was previously marked unhealthy
    // and has recovered
    if (node.status === 'offline' || node.status === 'unhealthy') {
      node.status = 'healthy';
      this.emit('nodeRecovered', { nodeId });
      logger.info(`Node ${nodeId} recovered`);
    }
  }

  // Mark node as unhealthy
  async markNodeUnhealthy(nodeId: string, reason: string): Promise<void> {
    const node = this.nodes.get(nodeId);
    if (!node) return;

    node.status = 'unhealthy';

    logger.error(`Node ${nodeId} marked unhealthy: ${reason}`);

    // Trigger failover for all agents on this node
    if (this.loadBalancer.failoverEnabled && node.assignedAgents.length > 0) {
      for (const agentId of [...node.assignedAgents]) {
        await this.failoverAgent(agentId, nodeId, true);
      }
    }

    this.emit('nodeUnhealthy', { nodeId, reason });
  }

  // Update load balancer configuration
  updateLoadBalancerConfig(config: Partial<LoadBalancerConfig>): void {
    Object.assign(this.loadBalancer, config);
    logger.info(`Load balancer config updated: ${JSON.stringify(config)}`);
  }

  // Start heartbeat monitoring
  private startHeartbeat(): void {
    this.heartbeatInterval = setInterval(() => {
      this.checkNodeHealth();
    }, this.HEARTBEAT_INTERVAL);
  }

  // Check node health based on heartbeats
  private checkNodeHealth(): void {
    const now = new Date();

    for (const node of this.nodes.values()) {
      if (node.nodeId === this.localNodeId) continue; // Don't check self

      const lastHeartbeat = now.getTime() - node.lastHeartbeat.getTime();

      if (lastHeartbeat > this.FAILOVER_TIMEOUT_MS) {
        // Node hasn't sent heartbeat
        if (node.status !== 'offline') {
          logger.error(`Node ${node.nodeId} missed heartbeat - marking offline`);
          this.markNodeUnhealthy(node.nodeId, 'heartbeat_timeout');
          node.status = 'offline';
        }
      } else if (lastHeartbeat > this.HEARTBEAT_INTERVAL * 3) {
        // Node is slow to respond
        if (node.status === 'healthy') {
          node.status = 'degraded';
          this.emit('nodeDegraded', { nodeId: node.nodeId });
        }
      }
    }
  }

  // Start task scheduler
  private startTaskScheduler(): void {
    this.taskSchedulerInterval = setInterval(() => {
      this.scheduleTasks();
    }, this.TASK_SCHEDULER_INTERVAL);
  }

  // Schedule pending tasks
  private async scheduleTasks(): Promise<void> {
    // Process up to 10 tasks per tick
    for (let i = 0; i < 10 && this.taskQueue.length > 0; i++) {
      const task = this.taskQueue.shift();
      if (!task) break;

      // Check task age
      const age = Date.now() - task.createdAt.getTime();
      if (age > this.MAX_TASK_AGE_MS) {
        task.status = 'failed';
        task.error = 'Task expired';
        this.emit('taskExpired', { taskId: task.taskId });
        continue;
      }

      try {
        await this.executeTask(task);
      } catch (error) {
        task.retryCount++;
        
        if (task.retryCount >= task.maxRetries) {
          task.status = 'failed';
          task.error = error instanceof Error ? error.message : 'Unknown error';
          this.emit('taskFailed', { taskId: task.taskId, error: task.error });
        } else {
          // Re-queue with backoff
          task.status = 'retrying';
          await this.sleep(Math.pow(2, task.retryCount) * 1000);
          this.insertIntoQueue(task);
        }
      }
    }
  }

  // Utility: Sleep
  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Cleanup
  destroy(): void {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
    }
    if (this.taskSchedulerInterval) {
      clearInterval(this.taskSchedulerInterval);
    }
    this.removeAllListeners();
  }
}

// Singleton instance
export const distributedExecutionLayer = new DistributedExecutionLayer();

// Export types
export type { DistributedExecutionLayer };
