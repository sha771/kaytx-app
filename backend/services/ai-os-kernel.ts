/**
 * Agent Lifecycle Management (The Kernel)
 * AI Operating System - Core Component #4
 * 
 * The "operating system kernel" for AI agents
 * Manages process lifecycle: spawn, kill, pause, resume, migrate, monitor
 * Similar to how Linux/Windows manages application processes
 */

import { EventEmitter } from 'events';
import { v4 as uuidv4 } from 'uuid';
import { createLogger } from '../lib/production-logger';
import { logAudit } from '../lib/audit';

const logger = createLogger('AgentKernel');

// Process States (like Unix process states)
export type AgentProcessState = 
  | 'created'      // Just created, not started
  | 'ready'        // Ready to run, waiting for scheduler
  | 'running'      // Currently executing
  | 'waiting'      // Waiting for I/O or event
  | 'paused'       // Suspended (SIGSTOP equivalent)
  | 'stopping'     // In the process of stopping
  | 'stopped'      // Gracefully stopped
  | 'terminated'   // Forcefully killed
  | 'zombie'       // Dead but not cleaned up
  | 'error';       // Error state

export type AgentPriority = 'idle' | 'low' | 'normal' | 'high' | 'realtime';

export interface AgentProcess {
  pid: string;                    // Process ID (like Unix PID)
  agentId: string;              // The AI agent this process runs
  organizationId: string;
  state: AgentProcessState;
  priority: AgentPriority;
  
  // Process metadata
  metadata: {
    name: string;
    version: string;
    type: string;
    createdBy: string;
    createdAt: Date;
    startedAt?: Date;
    stoppedAt?: Date;
    exitCode?: number;
    exitReason?: string;
  };
  
  // Resource usage
  resources: {
    cpuTimeMs: number;          // Total CPU time consumed
    memoryPeakMb: number;       // Peak memory usage
    memoryCurrentMb: number;    // Current memory usage
    ioReadBytes: number;
    ioWriteBytes: number;
    networkRxBytes: number;
    networkTxBytes: number;
    openFileDescriptors: number;
    threadCount: number;
  };
  
  // Scheduling
  scheduling: {
    quantum: number;            // Time slice in ms
    cpuAffinity: number[];      // Which CPU cores can run on
    niceValue: number;          // -20 to 19 (Unix nice)
    lastScheduledAt?: Date;
    totalScheduledTime: number;
    contextSwitches: number;
    preemptions: number;
  };
  
  // Parent/child relationships
  parentPid?: string;
  childPids: string[];
  
  // Execution context
  context: {
    workingDirectory: string;
    environment: Record<string, string>;
    arguments: string[];
    stdin: string;
    stdout: string[];
    stderr: string[];
  };
  
  // Health monitoring
  health: {
    lastHeartbeat: Date;
    heartbeatInterval: number;
    missedHeartbeats: number;
    isResponsive: boolean;
    healthChecks: HealthCheckResult[];
  };
  
  // Migration state
  migration?: {
    sourceNode: string;
    targetNode: string;
    progress: number;
    stateTransferred: boolean;
    startedAt: Date;
    completedAt?: Date;
  };
}

export interface HealthCheckResult {
  timestamp: Date;
  check: string;
  passed: boolean;
  responseTime: number;
  details?: Record<string, any>;
}

export interface ProcessStats {
  totalProcesses: number;
  byState: Record<AgentProcessState, number>;
  totalCpuTime: number;
  totalMemoryUsed: number;
  topConsumers: Array<{
    pid: string;
    agentId: string;
    cpuPercent: number;
    memoryMb: number;
  }>;
}

export interface Signal {
  type: 'SIGTERM' | 'SIGKILL' | 'SIGSTOP' | 'SIGCONT' | 'SIGUSR1' | 'SIGUSR2' | 'SIGHUP';
  payload?: any;
  sender: string;
  timestamp: Date;
}

export interface Checkpoint {
  checkpointId: string;
  pid: string;
  agentId: string;
  createdAt: Date;
  state: {
    memoryImage: Buffer;
    registers: Record<string, any>;
    openFiles: string[];
    networkConnections: any[];
    environment: Record<string, string>;
    agentState: any;  // Agent-specific state
  };
  sizeBytes: number;
  compressionRatio: number;
  storedAt: string;  // Storage location
}

export interface ProcessQueue {
  realtime: AgentProcess[];
  high: AgentProcess[];
  normal: AgentProcess[];
  low: AgentProcess[];
  idle: AgentProcess[];
}

class AgentKernel extends EventEmitter {
  private processes: Map<string, AgentProcess> = new Map();
  private checkpoints: Map<string, Checkpoint> = new Map();
  private processQueue: ProcessQueue = {
    realtime: [],
    high: [],
    normal: [],
    low: [],
    idle: []
  };
  private nextPid = 1000;  // Start PIDs at 1000
  private schedulerInterval?: NodeJS.Timeout;
  private healthCheckInterval?: NodeJS.Timeout;
  private readonly DEFAULT_QUANTUM = 100; // 100ms time slice
  private readonly HEALTH_CHECK_INTERVAL = 5000; // 5 seconds

  constructor() {
    super();
    this.startScheduler();
    this.startHealthMonitoring();
  }

  // Generate next PID
  private generatePid(): string {
    return `pid-${this.nextPid++}`;
  }

  // SPAWN: Create and start a new agent process (like fork+exec in Unix)
  async spawn(
    agentId: string,
    organizationId: string,
    config: {
      name: string;
      version: string;
      type: string;
      priority?: AgentPriority;
      environment?: Record<string, string>;
      arguments?: string[];
      workingDirectory?: string;
      parentPid?: string;
    },
    createdBy: string
  ): Promise<AgentProcess> {
    const pid = this.generatePid();
    
    const process: AgentProcess = {
      pid,
      agentId,
      organizationId,
      state: 'created',
      priority: config.priority || 'normal',
      metadata: {
        name: config.name,
        version: config.version,
        type: config.type,
        createdBy,
        createdAt: new Date()
      },
      resources: {
        cpuTimeMs: 0,
        memoryPeakMb: 0,
        memoryCurrentMb: 0,
        ioReadBytes: 0,
        ioWriteBytes: 0,
        networkRxBytes: 0,
        networkTxBytes: 0,
        openFileDescriptors: 0,
        threadCount: 1
      },
      scheduling: {
        quantum: this.DEFAULT_QUANTUM,
        cpuAffinity: [], // All cores
        niceValue: 0,
        totalScheduledTime: 0,
        contextSwitches: 0,
        preemptions: 0
      },
      parentPid: config.parentPid,
      childPids: [],
      context: {
        workingDirectory: config.workingDirectory || `/agents/${agentId}`,
        environment: {
          'KAYTX_AGENT_ID': agentId,
          'KAYTX_PROCESS_ID': pid,
          'KAYTX_ORG_ID': organizationId,
          ...config.environment
        },
        arguments: config.arguments || [],
        stdin: '',
        stdout: [],
        stderr: []
      },
      health: {
        lastHeartbeat: new Date(),
        heartbeatInterval: 30000, // 30 seconds
        missedHeartbeats: 0,
        isResponsive: true,
        healthChecks: []
      }
    };

    // Register parent-child relationship
    if (config.parentPid) {
      const parent = this.processes.get(config.parentPid);
      if (parent) {
        parent.childPids.push(pid);
      }
    }

    this.processes.set(pid, process);

    // Transition to ready state
    await this.transitionState(pid, 'ready');

    // Add to scheduling queue
    this.enqueueProcess(process);

    await logAudit({
      userId: createdBy,
      organizationId,
      action: 'process_spawned',
      resource: 'agent_process',
      resourceId: pid,
      details: { agentId, name: config.name, priority: config.priority }
    });

    this.emit('processSpawned', { pid, agentId, organizationId });
    logger.info(`Spawned process ${pid} for agent ${agentId}`);

    return process;
  }

  // KILL: Forcefully terminate a process (SIGKILL)
  async kill(pid: string, force: boolean = true): Promise<void> {
    const process = this.processes.get(pid);
    if (!process) {
      throw new Error(`Process ${pid} not found`);
    }

    if (process.state === 'terminated' || process.state === 'zombie') {
      return; // Already dead
    }

    // Send kill signal
    await this.sendSignal(pid, {
      type: force ? 'SIGKILL' : 'SIGTERM',
      sender: 'kernel',
      timestamp: new Date()
    });

    // Mark for termination
    await this.transitionState(pid, force ? 'terminated' : 'stopping');

    // Cleanup
    await this.cleanupProcess(pid);

    logger.info(`${force ? 'Killed' : 'Terminated'} process ${pid}`);
  }

  // PAUSE: Suspend process execution (SIGSTOP)
  async pause(pid: string): Promise<void> {
    const process = this.processes.get(pid);
    if (!process) {
      throw new Error(`Process ${pid} not found`);
    }

    if (process.state !== 'running' && process.state !== 'ready') {
      throw new Error(`Cannot pause process in ${process.state} state`);
    }

    // Send stop signal
    await this.sendSignal(pid, {
      type: 'SIGSTOP',
      sender: 'kernel',
      timestamp: new Date()
    });

    // Remove from scheduling queue
    this.dequeueProcess(process);

    await this.transitionState(pid, 'paused');

    await logAudit({
      userId: 'system',
      organizationId: process.organizationId,
      action: 'process_paused',
      resource: 'agent_process',
      resourceId: pid
    });

    this.emit('processPaused', { pid, agentId: process.agentId });
    logger.info(`Paused process ${pid}`);
  }

  // RESUME: Resume a paused process (SIGCONT)
  async resume(pid: string): Promise<void> {
    const process = this.processes.get(pid);
    if (!process) {
      throw new Error(`Process ${pid} not found`);
    }

    if (process.state !== 'paused') {
      throw new Error(`Cannot resume process in ${process.state} state`);
    }

    // Send continue signal
    await this.sendSignal(pid, {
      type: 'SIGCONT',
      sender: 'kernel',
      timestamp: new Date()
    });

    // Re-add to scheduling queue
    this.enqueueProcess(process);

    await this.transitionState(pid, 'ready');

    await logAudit({
      userId: 'system',
      organizationId: process.organizationId,
      action: 'process_resumed',
      resource: 'agent_process',
      resourceId: pid
    });

    this.emit('processResumed', { pid, agentId: process.agentId });
    logger.info(`Resumed process ${pid}`);
  }

  // MIGRATE: Live migration to another node (like VM migration)
  async migrate(pid: string, targetNode: string): Promise<void> {
    const process = this.processes.get(pid);
    if (!process) {
      throw new Error(`Process ${pid} not found`);
    }

    if (process.state !== 'running' && process.state !== 'paused') {
      throw new Error(`Cannot migrate process in ${process.state} state`);
    }

    const sourceNode = 'current-node'; // Would be actual node ID

    // Start migration
    process.migration = {
      sourceNode,
      targetNode,
      progress: 0,
      stateTransferred: false,
      startedAt: new Date()
    };

    logger.info(`Starting migration of process ${pid} to ${targetNode}`);

    // Step 1: Pre-copy memory (iterative memory transfer)
    await this.preCopyMemory(pid, targetNode);
    process.migration.progress = 30;

    // Step 2: Pause briefly for final sync
    const wasRunning = process.state === 'running';
    if (wasRunning) {
      await this.pause(pid);
    }
    process.migration.progress = 50;

    // Step 3: Transfer final state
    await this.transferFinalState(pid, targetNode);
    process.migration.progress = 80;
    process.migration.stateTransferred = true;

    // Step 4: Resume on target
    await this.resumeOnTarget(pid, targetNode);
    process.migration.progress = 100;
    process.migration.completedAt = new Date();

    // Update process location
    process.metadata.stoppedAt = new Date();
    process.metadata.exitReason = `Migrated to ${targetNode}`;

    await logAudit({
      userId: 'system',
      organizationId: process.organizationId,
      action: 'process_migrated',
      resource: 'agent_process',
      resourceId: pid,
      details: { sourceNode, targetNode, duration: process.migration.completedAt.getTime() - process.migration.startedAt.getTime() }
    });

    this.emit('processMigrated', { pid, agentId: process.agentId, sourceNode, targetNode });
    logger.info(`Successfully migrated process ${pid} to ${targetNode}`);
  }

  // Pre-copy memory for live migration
  private async preCopyMemory(pid: string, targetNode: string): Promise<void> {
    // In production: Iteratively copy memory pages
    // Track dirty pages, re-copy until dirty set is small
    logger.info(`Pre-copying memory for process ${pid} to ${targetNode}`);
  }

  // Transfer final state after pause
  private async transferFinalState(pid: string, targetNode: string): Promise<void> {
    const process = this.processes.get(pid);
    if (!process) return;

    // Transfer:
    // - Remaining memory pages
    // - CPU registers/state
    // - Open file descriptors
    // - Network connections (with TCP handoff)
    // - Agent-specific state

    logger.info(`Transferring final state for process ${pid} to ${targetNode}`);
  }

  // Resume process on target node
  private async resumeOnTarget(pid: string, targetNode: string): Promise<void> {
    // In production: RPC call to target node's kernel
    // targetNodeKernel.spawnFromMigration(pid, state)
    logger.info(`Resuming process ${pid} on target node ${targetNode}`);
  }

  // CHECKPOINT: Save process state for later restoration
  async checkpoint(pid: string): Promise<Checkpoint> {
    const process = this.processes.get(pid);
    if (!process) {
      throw new Error(`Process ${pid} not found`);
    }

    const checkpointId = `checkpoint-${uuidv4()}`;

    // Pause briefly to ensure consistent state
    const wasRunning = process.state === 'running';
    if (wasRunning) {
      await this.pause(pid);
    }

    // Capture state
    const checkpoint: Checkpoint = {
      checkpointId,
      pid,
      agentId: process.agentId,
      createdAt: new Date(),
      state: {
        memoryImage: Buffer.from(JSON.stringify(process)), // Simplified
        registers: {},  // Would capture actual CPU state
        openFiles: [],  // Would capture file descriptors
        networkConnections: [], // Would capture connections
        environment: { ...process.context.environment },
        agentState: null // Would capture agent-specific state
      },
      sizeBytes: 0,
      compressionRatio: 0.5,
      storedAt: `/var/checkpoints/${checkpointId}`
    };

    this.checkpoints.set(checkpointId, checkpoint);

    // Resume if was running
    if (wasRunning) {
      await this.resume(pid);
    }

    logger.info(`Created checkpoint ${checkpointId} for process ${pid}`);
    this.emit('checkpointCreated', { checkpointId, pid, agentId: process.agentId });

    return checkpoint;
  }

  // RESTORE: Restore process from checkpoint
  async restore(checkpointId: string): Promise<AgentProcess> {
    const checkpoint = this.checkpoints.get(checkpointId);
    if (!checkpoint) {
      throw new Error(`Checkpoint ${checkpointId} not found`);
    }

    // Create new process from checkpoint
    const pid = this.generatePid();

    const process: AgentProcess = {
      pid,
      agentId: checkpoint.agentId,
      organizationId: 'restored', // Would need to store this in checkpoint
      state: 'created',
      priority: 'normal',
      metadata: {
        name: `restored-${checkpoint.agentId}`,
        version: 'unknown',
        type: 'restored',
        createdBy: 'system',
        createdAt: new Date(),
        startedAt: new Date()
      },
      resources: {
        cpuTimeMs: 0,
        memoryPeakMb: 0,
        memoryCurrentMb: 0,
        ioReadBytes: 0,
        ioWriteBytes: 0,
        networkRxBytes: 0,
        networkTxBytes: 0,
        openFileDescriptors: 0,
        threadCount: 1
      },
      scheduling: {
        quantum: this.DEFAULT_QUANTUM,
        cpuAffinity: [],
        niceValue: 0,
        totalScheduledTime: 0,
        contextSwitches: 0,
        preemptions: 0
      },
      childPids: [],
      context: {
        workingDirectory: '/',
        environment: checkpoint.state.environment,
        arguments: [],
        stdin: '',
        stdout: [],
        stderr: []
      },
      health: {
        lastHeartbeat: new Date(),
        heartbeatInterval: 30000,
        missedHeartbeats: 0,
        isResponsive: true,
        healthChecks: []
      }
    };

    this.processes.set(pid, process);
    await this.transitionState(pid, 'ready');
    this.enqueueProcess(process);

    logger.info(`Restored process ${pid} from checkpoint ${checkpointId}`);
    this.emit('processRestored', { pid, checkpointId, agentId: checkpoint.agentId });

    return process;
  }

  // Send signal to process
  private async sendSignal(pid: string, signal: Signal): Promise<void> {
    // In production: This would send actual OS signal or message
    this.emit('signal', { pid, signal });
    logger.debug(`Sent signal ${signal.type} to process ${pid}`);
  }

  // Transition process state
  private async transitionState(pid: string, newState: AgentProcessState): Promise<void> {
    const process = this.processes.get(pid);
    if (!process) return;

    const oldState = process.state;
    process.state = newState;

    if (newState === 'running') {
      process.metadata.startedAt = new Date();
    }

    if (newState === 'stopped' || newState === 'terminated') {
      process.metadata.stoppedAt = new Date();
    }

    this.emit('stateTransition', { pid, agentId: process.agentId, oldState, newState });
    logger.debug(`Process ${pid} transitioned: ${oldState} -> ${newState}`);
  }

  // Enqueue process for scheduling
  private enqueueProcess(process: AgentProcess): void {
    const queue = this.processQueue[process.priority];
    if (!queue.find(p => p.pid === process.pid)) {
      queue.push(process);
    }
  }

  // Dequeue process from scheduling
  private dequeueProcess(process: AgentProcess): void {
    const queue = this.processQueue[process.priority];
    const index = queue.findIndex(p => p.pid === process.pid);
    if (index !== -1) {
      queue.splice(index, 1);
    }
  }

  // Cleanup process resources
  private async cleanupProcess(pid: string): Promise<void> {
    const process = this.processes.get(pid);
    if (!process) return;

    // Terminate child processes
    for (const childPid of process.childPids) {
      await this.kill(childPid, true);
    }

    // Notify parent
    if (process.parentPid) {
      const parent = this.processes.get(process.parentPid);
      if (parent) {
        parent.childPids = parent.childPids.filter(id => id !== pid);
      }
    }

    // Transition to zombie briefly, then remove
    await this.transitionState(pid, 'zombie');

    // In production: Would wait for parent to reap child (wait/waitpid)
    setTimeout(() => {
      this.processes.delete(pid);
      this.emit('processReaped', { pid });
    }, 5000);
  }

  // Get process by PID
  getProcess(pid: string): AgentProcess | undefined {
    return this.processes.get(pid);
  }

  // Get process by agent ID
  getProcessByAgent(agentId: string): AgentProcess | undefined {
    return Array.from(this.processes.values()).find(p => p.agentId === agentId);
  }

  // List all processes
  listProcesses(filters?: {
    organizationId?: string;
    state?: AgentProcessState;
    agentId?: string;
  }): AgentProcess[] {
    let processes = Array.from(this.processes.values());

    if (filters?.organizationId) {
      processes = processes.filter(p => p.organizationId === filters.organizationId);
    }
    if (filters?.state) {
      processes = processes.filter(p => p.state === filters.state);
    }
    if (filters?.agentId) {
      processes = processes.filter(p => p.agentId === filters.agentId);
    }

    return processes;
  }

  // Get process statistics
  getStats(): ProcessStats {
    const processes = Array.from(this.processes.values());
    
    const byState = processes.reduce((acc, p) => {
      acc[p.state] = (acc[p.state] || 0) + 1;
      return acc;
    }, {} as Record<AgentProcessState, number>);

    const totalCpuTime = processes.reduce((sum, p) => sum + p.resources.cpuTimeMs, 0);
    const totalMemory = processes.reduce((sum, p) => sum + p.resources.memoryCurrentMb, 0);

    const topConsumers = processes
      .map(p => ({
        pid: p.pid,
        agentId: p.agentId,
        cpuPercent: Math.random() * 100, // Would calculate actual CPU %
        memoryMb: p.resources.memoryCurrentMb
      }))
      .sort((a, b) => b.cpuPercent - a.cpuPercent)
      .slice(0, 10);

    return {
      totalProcesses: processes.length,
      byState,
      totalCpuTime,
      totalMemoryUsed: totalMemory,
      topConsumers
    };
  }

  // Update process priority (renice)
  async setPriority(pid: string, priority: AgentPriority, niceValue?: number): Promise<void> {
    const process = this.processes.get(pid);
    if (!process) {
      throw new Error(`Process ${pid} not found`);
    }

    // Remove from old queue
    this.dequeueProcess(process);

    // Update priority
    process.priority = priority;
    if (niceValue !== undefined) {
      process.scheduling.niceValue = Math.max(-20, Math.min(19, niceValue));
    }

    // Add to new queue
    this.enqueueProcess(process);

    logger.info(`Changed priority of process ${pid} to ${priority}`);
  }

  // Set CPU affinity (which cores process can use)
  setCpuAffinity(pid: string, cores: number[]): void {
    const process = this.processes.get(pid);
    if (!process) {
      throw new Error(`Process ${pid} not found`);
    }

    process.scheduling.cpuAffinity = cores;
    logger.info(`Set CPU affinity of process ${pid} to cores ${cores.join(',')}`);
  }

  // Update resource metrics
  updateResourceMetrics(pid: string, metrics: Partial<AgentProcess['resources']>): void {
    const process = this.processes.get(pid);
    if (!process) return;

    Object.assign(process.resources, metrics);

    // Track peak memory
    if (metrics.memoryCurrentMb && metrics.memoryCurrentMb > process.resources.memoryPeakMb) {
      process.resources.memoryPeakMb = metrics.memoryCurrentMb;
    }
  }

  // Record heartbeat from process
  recordHeartbeat(pid: string): void {
    const process = this.processes.get(pid);
    if (!process) return;

    process.health.lastHeartbeat = new Date();
    process.health.missedHeartbeats = 0;
    process.health.isResponsive = true;
  }

  // Start scheduler
  private startScheduler(): void {
    this.schedulerInterval = setInterval(() => {
      this.runScheduler();
    }, 10); // 10ms scheduler tick
  }

  // Run scheduler (priority-based round-robin)
  private runScheduler(): void {
    // Process each priority level
    const priorities: AgentPriority[] = ['realtime', 'high', 'normal', 'low', 'idle'];
    
    for (const priority of priorities) {
      const queue = this.processQueue[priority];
      
      for (let i = 0; i < queue.length; i++) {
        const process = queue[i];
        
        if (process.state !== 'ready' && process.state !== 'running') {
          continue;
        }

        // Simulate running process
        if (process.state === 'ready') {
          this.transitionState(process.pid, 'running');
          process.scheduling.lastScheduledAt = new Date();
        }

        // In production: Actually schedule process on CPU
        // For now, just track
        process.scheduling.totalScheduledTime += 10;
        process.resources.cpuTimeMs += 10;

        // Check if quantum expired
        if (process.scheduling.totalScheduledTime % process.scheduling.quantum === 0) {
          process.scheduling.preemptions++;
          this.transitionState(process.pid, 'ready');
        }
      }
    }
  }

  // Start health monitoring
  private startHealthMonitoring(): void {
    this.healthCheckInterval = setInterval(() => {
      this.checkHealth();
    }, this.HEALTH_CHECK_INTERVAL);
  }

  // Check health of all processes
  private checkHealth(): void {
    const now = new Date();

    for (const process of this.processes.values()) {
      if (process.state !== 'running' && process.state !== 'ready') {
        continue;
      }

      const heartbeatAge = now.getTime() - process.health.lastHeartbeat.getTime();
      const maxAge = process.health.heartbeatInterval * 2;

      if (heartbeatAge > maxAge) {
        process.health.missedHeartbeats++;
        
        if (process.health.missedHeartbeats >= 3) {
          process.health.isResponsive = false;
          
          // Attempt recovery
          logger.warn(`Process ${process.pid} unresponsive, attempting recovery`);
          this.emit('processUnresponsive', { pid: process.pid, agentId: process.agentId });
          
          // Could trigger automatic restart here
        }
      }

      // Run health checks
      this.runHealthChecks(process);
    }
  }

  // Run health checks on a process
  private runHealthChecks(process: AgentProcess): void {
    const checks: HealthCheckResult[] = [];

    // Memory check
    const memoryOk = process.resources.memoryCurrentMb < process.resources.memoryPeakMb * 1.5;
    checks.push({
      timestamp: new Date(),
      check: 'memory',
      passed: memoryOk,
      responseTime: 0,
      details: { current: process.resources.memoryCurrentMb, peak: process.resources.memoryPeakMb }
    });

    // CPU check
    const cpuOk = process.resources.cpuTimeMs > 0; // At least some progress
    checks.push({
      timestamp: new Date(),
      check: 'cpu',
      passed: cpuOk,
      responseTime: 0,
      details: { totalTime: process.resources.cpuTimeMs }
    });

    process.health.healthChecks = checks;
  }

  // Cleanup
  destroy(): void {
    if (this.schedulerInterval) {
      clearInterval(this.schedulerInterval);
    }
    if (this.healthCheckInterval) {
      clearInterval(this.healthCheckInterval);
    }

    // Terminate all processes
    for (const pid of this.processes.keys()) {
      this.kill(pid, true).catch(err => 
        logger.error(`Failed to kill process ${pid} during cleanup: ${err}`)
      );
    }

    this.removeAllListeners();
  }
}

// Singleton instance
export const agentKernel = new AgentKernel();

// Export types
export type { AgentKernel };
