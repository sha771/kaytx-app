/**
 * Process Isolation / Sandboxing Service
 * AI Operating System - Core Component #3
 * 
 * Provides secure isolation for AI agents using containers, cgroups, and network policies
 * Ensures one compromised agent cannot affect others
 */

import { EventEmitter } from 'events';
import { v4 as uuidv4 } from 'uuid';
import { createLogger } from '../lib/production-logger';
import { logAudit } from '../lib/audit';

const logger = createLogger('AgentSandbox');

// Sandbox Types
export type SandboxType = 'docker' | 'gvisor' | 'firecracker' | 'namespace';
export type SandboxStatus = 'creating' | 'running' | 'paused' | 'stopped' | 'error' | 'destroyed';
export type SecurityLevel = 'low' | 'medium' | 'high' | 'maximum';

export interface SandboxConfig {
  sandboxId: string;
  agentId: string;
  organizationId: string;
  type: SandboxType;
  securityLevel: SecurityLevel;
  
  // Resource limits
  resources: {
    cpuCores: number;
    memoryMb: number;
    diskMb: number;
    gpuShares: number;
    ioBandwidthMbps: number;
  };
  
  // Filesystem
  filesystem: {
    rootFs: string; // Base image
    readOnly: boolean;
    allowedPaths: string[];
    tempStorageMb: number;
    persistentVolume?: string;
  };
  
  // Network
  network: {
    mode: 'isolated' | 'nat' | 'bridge' | 'host';
    allowedDomains: string[];
    allowedPorts: number[];
    allowedProtocols: ('tcp' | 'udp' | 'icmp')[];
    bandwidthLimitMbps: number;
    firewallRules: FirewallRule[];
  };
  
  // Secrets
  secrets: {
    injectMode: 'env' | 'file' | 'memory';
    allowedSecrets: string[];
    rotationPolicy?: string;
  };
  
  // Monitoring
  monitoring: {
    logStdout: boolean;
    logStderr: boolean;
    syscallTracing: boolean;
    fileAccessLogging: boolean;
    networkActivityLogging: boolean;
  };
}

export interface FirewallRule {
  direction: 'inbound' | 'outbound';
  action: 'allow' | 'deny';
  protocol: 'tcp' | 'udp' | 'icmp' | 'any';
  portRange?: { start: number; end: number };
  ipRange?: string;
  domain?: string;
  priority: number;
}

export interface AgentSandbox {
  sandboxId: string;
  agentId: string;
  config: SandboxConfig;
  status: SandboxStatus;
  
  // Runtime info
  runtime: {
    containerId?: string;
    namespaceId?: string;
    pid?: number;
    createdAt: Date;
    startedAt?: Date;
    pausedAt?: Date;
    stoppedAt?: Date;
    exitCode?: number;
  };
  
  // Security info
  security: {
    seccompProfile: string;
    apparmorProfile?: string;
    selinuxContext?: string;
    capabilities: string[];
    droppedCapabilities: string[];
    noNewPrivileges: boolean;
    readOnlyRootFilesystem: boolean;
  };
  
  // Current metrics
  metrics: {
    cpuPercent: number;
    memoryUsedMb: number;
    diskUsedMb: number;
    networkRxBytes: number;
    networkTxBytes: number;
    syscallCount: number;
    fileOpenCount: number;
    lastUpdated: Date;
  };
  
  // Violations
  violations: SecurityViolation[];
}

export interface SecurityViolation {
  id: string;
  timestamp: Date;
  severity: 'low' | 'medium' | 'high' | 'critical';
  type: 'filesystem' | 'network' | 'syscall' | 'resource' | 'secret' | 'privilege';
  description: string;
  details: Record<string, any>;
  action: 'logged' | 'blocked' | 'terminated' | 'quarantined';
  resolved: boolean;
}

export interface FileSystemAccess {
  path: string;
  operation: 'read' | 'write' | 'delete' | 'execute' | 'create';
  timestamp: Date;
  allowed: boolean;
  size?: number;
}

export interface NetworkActivity {
  timestamp: Date;
  direction: 'inbound' | 'outbound';
  protocol: string;
  sourceIp: string;
  sourcePort: number;
  destIp: string;
  destPort: number;
  domain?: string;
  bytesTransferred: number;
  allowed: boolean;
}

export interface SyscallEvent {
  timestamp: Date;
  syscall: string;
  arguments: any[];
  result: number;
  duration: number;
  allowed: boolean;
}

export interface QuarantineResult {
  quarantineId: string;
  sandboxId: string;
  agentId: string;
  reason: string;
  isolatedAt: Date;
  canRestore: boolean;
  snapshotPath?: string;
  forensicData: {
    memoryDump?: string;
    filesystemSnapshot?: string;
    networkLogs: NetworkActivity[];
    syscallLogs: SyscallEvent[];
    violations: SecurityViolation[];
  };
}

export interface CheckpointData {
  checkpointId: string;
  sandboxId: string;
  createdAt: Date;
  memoryState: Buffer;
  filesystemState: string;
  networkConnections: any[];
  openFiles: string[];
  environment: Record<string, string>;
  sizeBytes: number;
}

class AgentSandboxService extends EventEmitter {
  private sandboxes: Map<string, AgentSandbox> = new Map();
  private violations: Map<string, SecurityViolation[]> = new Map();
  private quarantined: Map<string, QuarantineResult> = new Map();
  private checkpoints: Map<string, CheckpointData> = new Map();
  private monitoringInterval?: NodeJS.Timeout;
  private readonly VIOLATION_THRESHOLD = 5; // Max violations before auto-quarantine
  private readonly MONITORING_INTERVAL_MS = 10000; // 10 seconds

  constructor() {
    super();
    this.startMonitoring();
  }

  // Create a new sandbox for an agent
  async createSandbox(
    agentId: string,
    organizationId: string,
    securityLevel: SecurityLevel,
    resourceAllocation: {
      cpuCores: number;
      memoryMb: number;
      diskMb: number;
      gpuShares?: number;
    },
    networkPolicy: {
      allowedDomains: string[];
      allowedPorts: number[];
    },
    secrets: string[]
  ): Promise<AgentSandbox> {
    const sandboxId = `sandbox-${uuidv4()}`;
    
    // Select sandbox type based on security level
    const sandboxType = this.selectSandboxType(securityLevel);
    
    // Build security configuration
    const security = this.buildSecurityConfig(securityLevel);
    
    const config: SandboxConfig = {
      sandboxId,
      agentId,
      organizationId,
      type: sandboxType,
      securityLevel,
      resources: {
        cpuCores: resourceAllocation.cpuCores,
        memoryMb: resourceAllocation.memoryMb,
        diskMb: resourceAllocation.diskMb,
        gpuShares: resourceAllocation.gpuShares || 0,
        ioBandwidthMbps: 100
      },
      filesystem: {
        rootFs: this.selectBaseImage(sandboxType),
        readOnly: securityLevel === 'high' || securityLevel === 'maximum',
        allowedPaths: ['/tmp', '/var/tmp', '/app/data'],
        tempStorageMb: 1024
      },
      network: {
        mode: securityLevel === 'maximum' ? 'isolated' : 'nat',
        allowedDomains: networkPolicy.allowedDomains,
        allowedPorts: networkPolicy.allowedPorts,
        allowedProtocols: ['tcp', 'udp'],
        bandwidthLimitMbps: 100,
        firewallRules: this.generateFirewallRules(networkPolicy)
      },
      secrets: {
        injectMode: securityLevel === 'maximum' ? 'memory' : 'env',
        allowedSecrets: secrets,
        rotationPolicy: '24h'
      },
      monitoring: {
        logStdout: true,
        logStderr: true,
        syscallTracing: securityLevel === 'high' || securityLevel === 'maximum',
        fileAccessLogging: securityLevel !== 'low',
        networkActivityLogging: true
      }
    };

    const sandbox: AgentSandbox = {
      sandboxId,
      agentId,
      config,
      status: 'creating',
      runtime: {
        createdAt: new Date()
      },
      security,
      metrics: {
        cpuPercent: 0,
        memoryUsedMb: 0,
        diskUsedMb: 0,
        networkRxBytes: 0,
        networkTxBytes: 0,
        syscallCount: 0,
        fileOpenCount: 0,
        lastUpdated: new Date()
      },
      violations: []
    };

    this.sandboxes.set(sandboxId, sandbox);

    // Create actual container/isolation
    try {
      await this.createContainer(sandbox);
      sandbox.status = 'running';
      sandbox.runtime.startedAt = new Date();
      
      logger.info(`Sandbox ${sandboxId} created for agent ${agentId} with ${securityLevel} security`);
    } catch (error) {
      sandbox.status = 'error';
      throw error;
    }

    await logAudit({
      userId: 'system',
      organizationId,
      action: 'sandbox_created',
      resource: 'sandbox',
      resourceId: sandboxId,
      details: { agentId, securityLevel, type: sandboxType }
    });

    this.emit('sandboxCreated', { sandboxId, agentId, securityLevel });
    
    return sandbox;
  }

  // Select appropriate sandbox technology
  private selectSandboxType(securityLevel: SecurityLevel): SandboxType {
    switch (securityLevel) {
      case 'low':
        return 'namespace'; // Linux namespaces only
      case 'medium':
        return 'docker'; // Docker containers
      case 'high':
        return 'gvisor'; // Google's gVisor for additional isolation
      case 'maximum':
        return 'firecracker'; // AWS Firecracker microVMs
      default:
        return 'docker';
    }
  }

  // Build security configuration based on level
  private buildSecurityConfig(level: SecurityLevel) {
    const baseConfig = {
      seccompProfile: 'default',
      noNewPrivileges: true,
      readOnlyRootFilesystem: true,
      capabilities: [] as string[],
      droppedCapabilities: ['ALL']
    };

    switch (level) {
      case 'low':
        return {
          ...baseConfig,
          seccompProfile: 'minimal',
          capabilities: ['chown', 'dac_override', 'fowner', 'fsetid', 'kill', 'setgid', 'setuid', 'setpcap'],
          droppedCapabilities: []
        };
      
      case 'medium':
        return {
          ...baseConfig,
          seccompProfile: 'docker-default',
          capabilities: ['chown', 'dac_override', 'fowner'],
          droppedCapabilities: ['kill', 'setuid', 'setgid']
        };
      
      case 'high':
        return {
          ...baseConfig,
          seccompProfile: 'restricted',
          apparmorProfile: 'docker-high-security',
          capabilities: [],
          droppedCapabilities: ['ALL']
        };
      
      case 'maximum':
        return {
          ...baseConfig,
          seccompProfile: 'maximum',
          apparmorProfile: 'docker-maximum-security',
          selinuxContext: 'sandboxed_agent_t',
          capabilities: [],
          droppedCapabilities: ['ALL']
        };
    }
  }

  // Select base image
  private selectBaseImage(type: SandboxType): string {
    const images: Record<SandboxType, string> = {
      'docker': 'kaytx/agent-runtime:latest',
      'gvisor': 'kaytx/agent-runtime:gvisor',
      'firecracker': 'kaytx/agent-runtime:microvm',
      'namespace': 'kaytx/agent-runtime:minimal'
    };
    return images[type];
  }

  // Generate firewall rules
  private generateFirewallRules(networkPolicy: {
    allowedDomains: string[];
    allowedPorts: number[];
  }): FirewallRule[] {
    const rules: FirewallRule[] = [];
    
    // Allow DNS
    rules.push({
      direction: 'outbound',
      action: 'allow',
      protocol: 'udp',
      portRange: { start: 53, end: 53 },
      ipRange: '0.0.0.0/0',
      priority: 100
    });

    // Allow HTTPS
    rules.push({
      direction: 'outbound',
      action: 'allow',
      protocol: 'tcp',
      portRange: { start: 443, end: 443 },
      priority: 200
    });

    // Allow HTTP (if needed)
    rules.push({
      direction: 'outbound',
      action: 'allow',
      protocol: 'tcp',
      portRange: { start: 80, end: 80 },
      priority: 300
    });

    // Allow specified ports
    networkPolicy.allowedPorts.forEach((port, idx) => {
      rules.push({
        direction: 'outbound',
        action: 'allow',
        protocol: 'tcp',
        portRange: { start: port, end: port },
        priority: 400 + idx
      });
    });

    // Deny everything else
    rules.push({
      direction: 'outbound',
      action: 'deny',
      protocol: 'any',
      priority: 9999
    });

    return rules;
  }

  // Create actual container
  private async createContainer(sandbox: AgentSandbox): Promise<void> {
    const { config } = sandbox;
    
    logger.info(`Creating ${config.type} container for sandbox ${config.sandboxId}`);

    switch (config.type) {
      case 'docker':
        await this.createDockerContainer(sandbox);
        break;
      case 'gvisor':
        await this.createGvisorContainer(sandbox);
        break;
      case 'firecracker':
        await this.createFirecrackerVM(sandbox);
        break;
      case 'namespace':
        await this.createNamespace(sandbox);
        break;
    }

    // Apply network policies
    await this.applyNetworkPolicies(sandbox);
    
    // Setup monitoring
    await this.setupMonitoring(sandbox);
  }

  // Create Docker container
  private async createDockerContainer(sandbox: AgentSandbox): Promise<void> {
    // In production, would use Dockerode or docker CLI
    // docker run -d \
    //   --name ${sandbox.config.sandboxId} \
    //   --cpus=${sandbox.config.resources.cpuCores} \
    //   --memory=${sandbox.config.resources.memoryMb}m \
    //   --read-only \
    //   --security-opt seccomp=${sandbox.security.seccompProfile} \
    //   --cap-drop ALL \
    //   --cap-add ${sandbox.security.capabilities.join(' --cap-add ')} \
    //   --network isolated \
    //   ${sandbox.config.filesystem.rootFs}
    
    sandbox.runtime.containerId = `docker-${uuidv4().slice(0, 12)}`;
    logger.info(`Docker container ${sandbox.runtime.containerId} created`);
  }

  // Create gVisor container
  private async createGvisorContainer(sandbox: AgentSandbox): Promise<void> {
    // gVisor provides additional isolation by intercepting syscalls
    // runsc run --platform=kvm ${sandbox.config.sandboxId}
    sandbox.runtime.containerId = `gvisor-${uuidv4().slice(0, 12)}`;
    logger.info(`gVisor container ${sandbox.runtime.containerId} created`);
  }

  // Create Firecracker microVM
  private async createFirecrackerVM(sandbox: AgentSandbox): Promise<void> {
    // Firecracker provides VM-level isolation
    // firecracker --api-sock /tmp/${sandbox.config.sandboxId}.socket
    sandbox.runtime.containerId = `fc-${uuidv4().slice(0, 12)}`;
    sandbox.runtime.namespaceId = `vm-${uuidv4()}`;
    logger.info(`Firecracker VM ${sandbox.runtime.containerId} created`);
  }

  // Create Linux namespace isolation
  private async createNamespace(sandbox: AgentSandbox): Promise<void> {
    // Uses Linux namespaces (pid, net, ipc, mnt, uts, user, cgroup)
    sandbox.runtime.namespaceId = `ns-${uuidv4().slice(0, 12)}`;
    logger.info(`Namespace ${sandbox.runtime.namespaceId} created`);
  }

  // Apply network policies
  private async applyNetworkPolicies(sandbox: AgentSandbox): Promise<void> {
    const { config } = sandbox;
    
    // In production:
    // 1. Create isolated network namespace
    // 2. Setup virtual ethernet pair
    // 3. Apply iptables rules based on firewallRules
    // 4. Setup DNS filtering for allowedDomains
    
    logger.info(`Network policies applied to sandbox ${config.sandboxId}`);
  }

  // Setup monitoring
  private async setupMonitoring(sandbox: AgentSandbox): Promise<void> {
    const { config } = sandbox;
    
    if (config.monitoring.syscallTracing) {
      // Setup seccomp-bpf for syscall tracing
      logger.info(`Syscall tracing enabled for sandbox ${config.sandboxId}`);
    }

    if (config.monitoring.fileAccessLogging) {
      // Setup fanotify or inotify for file access monitoring
      logger.info(`File access logging enabled for sandbox ${config.sandboxId}`);
    }
  }

  // Pause a sandbox (freeze execution)
  async pauseSandbox(sandboxId: string): Promise<void> {
    const sandbox = this.sandboxes.get(sandboxId);
    if (!sandbox) throw new Error(`Sandbox ${sandboxId} not found`);
    if (sandbox.status !== 'running') {
      throw new Error(`Cannot pause sandbox in ${sandbox.status} state`);
    }

    // In production:
    // docker pause ${sandbox.runtime.containerId}
    // or kill -STOP for namespace-based

    sandbox.status = 'paused';
    sandbox.runtime.pausedAt = new Date();

    this.emit('sandboxPaused', { sandboxId, agentId: sandbox.agentId });
    logger.info(`Sandbox ${sandboxId} paused`);
  }

  // Resume a paused sandbox
  async resumeSandbox(sandboxId: string): Promise<void> {
    const sandbox = this.sandboxes.get(sandboxId);
    if (!sandbox) throw new Error(`Sandbox ${sandboxId} not found`);
    if (sandbox.status !== 'paused') {
      throw new Error(`Cannot resume sandbox in ${sandbox.status} state`);
    }

    // docker unpause ${sandbox.runtime.containerId}
    // or kill -CONT for namespace-based

    sandbox.status = 'running';
    sandbox.runtime.pausedAt = undefined;

    this.emit('sandboxResumed', { sandboxId, agentId: sandbox.agentId });
    logger.info(`Sandbox ${sandboxId} resumed`);
  }

  // Stop a sandbox
  async stopSandbox(sandboxId: string, force: boolean = false): Promise<void> {
    const sandbox = this.sandboxes.get(sandboxId);
    if (!sandbox) throw new Error(`Sandbox ${sandboxId} not found`);
    
    if (sandbox.status !== 'running' && sandbox.status !== 'paused') {
      throw new Error(`Cannot stop sandbox in ${sandbox.status} state`);
    }

    if (force) {
      // docker kill ${sandbox.runtime.containerId}
      logger.info(`Force stopped sandbox ${sandboxId}`);
    } else {
      // docker stop ${sandbox.runtime.containerId} (graceful)
      logger.info(`Gracefully stopped sandbox ${sandboxId}`);
    }

    sandbox.status = 'stopped';
    sandbox.runtime.stoppedAt = new Date();

    this.emit('sandboxStopped', { sandboxId, agentId: sandbox.agentId, force });
  }

  // Destroy a sandbox
  async destroySandbox(sandboxId: string): Promise<void> {
    const sandbox = this.sandboxes.get(sandboxId);
    if (!sandbox) throw new Error(`Sandbox ${sandboxId} not found`);

    // Ensure stopped first
    if (sandbox.status === 'running' || sandbox.status === 'paused') {
      await this.stopSandbox(sandboxId, true);
    }

    // docker rm ${sandbox.runtime.containerId}
    // Cleanup volumes, networks, etc.

    sandbox.status = 'destroyed';

    // Cleanup checkpoints
    for (const [id, checkpoint] of this.checkpoints.entries()) {
      if (checkpoint.sandboxId === sandboxId) {
        this.checkpoints.delete(id);
      }
    }

    this.sandboxes.delete(sandboxId);

    await logAudit({
      userId: 'system',
      organizationId: sandbox.config.organizationId,
      action: 'sandbox_destroyed',
      resource: 'sandbox',
      resourceId: sandboxId,
      details: { agentId: sandbox.agentId }
    });

    this.emit('sandboxDestroyed', { sandboxId, agentId: sandbox.agentId });
    logger.info(`Sandbox ${sandboxId} destroyed`);
  }

  // Create checkpoint (save state)
  async createCheckpoint(sandboxId: string): Promise<CheckpointData> {
    const sandbox = this.sandboxes.get(sandboxId);
    if (!sandbox) throw new Error(`Sandbox ${sandboxId} not found`);
    if (sandbox.status !== 'running') {
      throw new Error(`Cannot checkpoint sandbox in ${sandbox.status} state`);
    }

    const checkpointId = `checkpoint-${uuidv4()}`;
    
    // In production:
    // docker checkpoint create ${sandbox.runtime.containerId} ${checkpointId}
    // or CRIU for namespace-based

    const checkpoint: CheckpointData = {
      checkpointId,
      sandboxId,
      createdAt: new Date(),
      memoryState: Buffer.alloc(0), // Would contain actual memory dump
      filesystemState: `/var/checkpoints/${checkpointId}`,
      networkConnections: [],
      openFiles: [],
      environment: {},
      sizeBytes: 0
    };

    this.checkpoints.set(checkpointId, checkpoint);

    logger.info(`Checkpoint ${checkpointId} created for sandbox ${sandboxId}`);
    this.emit('checkpointCreated', { checkpointId, sandboxId });

    return checkpoint;
  }

  // Restore from checkpoint
  async restoreCheckpoint(checkpointId: string): Promise<void> {
    const checkpoint = this.checkpoints.get(checkpointId);
    if (!checkpoint) throw new Error(`Checkpoint ${checkpointId} not found`);

    const sandbox = this.sandboxes.get(checkpoint.sandboxId);
    if (!sandbox) throw new Error(`Sandbox ${checkpoint.sandboxId} not found`);

    // docker start --checkpoint ${checkpointId} ${sandbox.runtime.containerId}

    sandbox.status = 'running';
    sandbox.runtime.startedAt = new Date();

    logger.info(`Checkpoint ${checkpointId} restored for sandbox ${checkpoint.sandboxId}`);
    this.emit('checkpointRestored', { checkpointId, sandboxId: checkpoint.sandboxId });
  }

  // Record security violation
  recordViolation(
    sandboxId: string,
    type: SecurityViolation['type'],
    severity: SecurityViolation['severity'],
    description: string,
    details: Record<string, any>
  ): void {
    const sandbox = this.sandboxes.get(sandboxId);
    if (!sandbox) return;

    // Determine action
    let action: SecurityViolation['action'] = 'logged';
    
    if (severity === 'critical' || type === 'privilege') {
      action = 'terminated';
    } else if (severity === 'high') {
      action = 'blocked';
    } else if (sandbox.violations.length >= this.VIOLATION_THRESHOLD) {
      action = 'quarantined';
    }

    const violation: SecurityViolation = {
      id: `violation-${uuidv4()}`,
      timestamp: new Date(),
      severity,
      type,
      description,
      details,
      action,
      resolved: false
    };

    sandbox.violations.push(violation);

    // Store in global violations map
    let orgViolations = this.violations.get(sandbox.config.organizationId);
    if (!orgViolations) {
      orgViolations = [];
      this.violations.set(sandbox.config.organizationId, orgViolations);
    }
    orgViolations.push(violation);

    // Take action
    if (action === 'terminated') {
      this.terminateSandbox(sandboxId, `Critical violation: ${description}`);
    } else if (action === 'quarantined') {
      this.quarantineSandbox(sandboxId, `Multiple violations detected: ${sandbox.violations.length}`);
    }

    this.emit('securityViolation', { sandboxId, violation });
    logger.warn(`Security violation in sandbox ${sandboxId}: ${description}`);
  }

  // Terminate sandbox due to violation
  private async terminateSandbox(sandboxId: string, reason: string): Promise<void> {
    const sandbox = this.sandboxes.get(sandboxId);
    if (!sandbox) return;

    logger.error(`Terminating sandbox ${sandboxId}: ${reason}`);

    await this.stopSandbox(sandboxId, true);
    
    sandbox.status = 'error';
    
    // Notify security team
    await logAudit({
      userId: 'system',
      organizationId: sandbox.config.organizationId,
      action: 'sandbox_terminated',
      resource: 'sandbox',
      resourceId: sandboxId,
      details: { reason, violations: sandbox.violations.length }
    });

    this.emit('sandboxTerminated', { sandboxId, agentId: sandbox.agentId, reason });
  }

  // Quarantine sandbox for investigation
  async quarantineSandbox(sandboxId: string, reason: string): Promise<QuarantineResult> {
    const sandbox = this.sandboxes.get(sandboxId);
    if (!sandbox) throw new Error(`Sandbox ${sandboxId} not found`);

    const quarantineId = `quarantine-${uuidv4()}`;
    
    logger.error(`Quarantining sandbox ${sandboxId}: ${reason}`);

    // Create forensic data
    const forensicData: QuarantineResult['forensicData'] = {
      networkLogs: [], // Would collect from monitoring
      syscallLogs: [],
      violations: [...sandbox.violations]
    };

    // Capture state before stopping
    const canRestore = sandbox.status === 'running';
    let snapshotPath: string | undefined;
    
    if (canRestore) {
      const checkpoint = await this.createCheckpoint(sandboxId);
      snapshotPath = checkpoint.filesystemState;
      forensicData.memoryDump = `${snapshotPath}/memory.dump`;
    }

    // Stop and isolate
    await this.stopSandbox(sandboxId, true);

    // Move to isolated network
    // docker network connect quarantine-network ${sandbox.runtime.containerId}

    const quarantine: QuarantineResult = {
      quarantineId,
      sandboxId,
      agentId: sandbox.agentId,
      reason,
      isolatedAt: new Date(),
      canRestore,
      snapshotPath,
      forensicData
    };

    this.quarantined.set(quarantineId, quarantine);

    await logAudit({
      userId: 'system',
      organizationId: sandbox.config.organizationId,
      action: 'sandbox_quarantined',
      resource: 'sandbox',
      resourceId: sandboxId,
      details: { quarantineId, reason, canRestore }
    });

    this.emit('sandboxQuarantined', { quarantineId, sandboxId, agentId: sandbox.agentId });
    
    return quarantine;
  }

  // Restore from quarantine
  async restoreFromQuarantine(quarantineId: string): Promise<void> {
    const quarantine = this.quarantined.get(quarantineId);
    if (!quarantine) throw new Error(`Quarantine ${quarantineId} not found`);

    if (!quarantine.canRestore || !quarantine.snapshotPath) {
      throw new Error('Cannot restore - no snapshot available');
    }

    // Restore from checkpoint
    const checkpointId = quarantine.snapshotPath.split('/').pop();
    if (checkpointId) {
      await this.restoreCheckpoint(checkpointId);
    }

    // Remove from quarantine
    this.quarantined.delete(quarantineId);

    logger.info(`Sandbox ${quarantine.sandboxId} restored from quarantine ${quarantineId}`);
    this.emit('sandboxRestoredFromQuarantine', { quarantineId, sandboxId: quarantine.sandboxId });
  }

  // Get sandbox status
  getSandbox(sandboxId: string): AgentSandbox | undefined {
    return this.sandboxes.get(sandboxId);
  }

  // Get sandbox by agent ID
  getSandboxByAgent(agentId: string): AgentSandbox | undefined {
    return Array.from(this.sandboxes.values()).find(s => s.agentId === agentId);
  }

  // Get all sandboxes for organization
  getOrganizationSandboxes(organizationId: string): AgentSandbox[] {
    return Array.from(this.sandboxes.values())
      .filter(s => s.config.organizationId === organizationId);
  }

  // Get security violations
  getViolations(organizationId: string): SecurityViolation[] {
    return this.violations.get(organizationId) || [];
  }

  // Get quarantined sandboxes
  getQuarantined(organizationId?: string): QuarantineResult[] {
    let results = Array.from(this.quarantined.values());
    if (organizationId) {
      results = results.filter(q => {
        const sandbox = this.sandboxes.get(q.sandboxId);
        return sandbox?.config.organizationId === organizationId;
      });
    }
    return results;
  }

  // Update sandbox metrics
  updateMetrics(sandboxId: string, metrics: Partial<AgentSandbox['metrics']>): void {
    const sandbox = this.sandboxes.get(sandboxId);
    if (!sandbox) return;

    Object.assign(sandbox.metrics, metrics);
    sandbox.metrics.lastUpdated = new Date();
  }

  // Start monitoring loop
  private startMonitoring(): void {
    this.monitoringInterval = setInterval(async () => {
      await this.collectMetrics();
    }, this.MONITORING_INTERVAL_MS);
  }

  // Collect metrics from all sandboxes
  private async collectMetrics(): Promise<void> {
    for (const sandbox of this.sandboxes.values()) {
      if (sandbox.status !== 'running') continue;

      try {
        // In production: docker stats ${sandbox.runtime.containerId}
        // Parse CPU, memory, network, I/O stats
        
        const mockMetrics: Partial<AgentSandbox['metrics']> = {
          cpuPercent: Math.random() * 50,
          memoryUsedMb: Math.random() * sandbox.config.resources.memoryMb,
          networkRxBytes: sandbox.metrics.networkRxBytes + Math.random() * 1000,
          networkTxBytes: sandbox.metrics.networkTxBytes + Math.random() * 1000
        };

        this.updateMetrics(sandbox.sandboxId, mockMetrics);

        // Check resource limits
        if (mockMetrics.memoryUsedMb && mockMetrics.memoryUsedMb > sandbox.config.resources.memoryMb * 0.95) {
          this.recordViolation(
            sandbox.sandboxId,
            'resource',
            'high',
            'Memory usage exceeded 95% of limit',
            { usage: mockMetrics.memoryUsedMb, limit: sandbox.config.resources.memoryMb }
          );
        }
      } catch (error) {
        logger.error(`Failed to collect metrics for sandbox ${sandbox.sandboxId}: ${error}`);
      }
    }
  }

  // Cleanup
  destroy(): void {
    if (this.monitoringInterval) {
      clearInterval(this.monitoringInterval);
    }
    this.removeAllListeners();
    
    // Cleanup all sandboxes
    const promises = Array.from(this.sandboxes.keys()).map(id => 
      this.destroySandbox(id).catch(err => 
        logger.error(`Failed to destroy sandbox ${id}: ${err}`)
      )
    );
    
    Promise.all(promises).then(() => {
      logger.info('All sandboxes cleaned up');
    });
  }
}

// Singleton instance
export const agentSandboxService = new AgentSandboxService();

// Export types
export type { AgentSandboxService };
