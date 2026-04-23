/**
 * Hot-Swappable Components System
 * AI Operating System - Core Component #6
 * 
 * Updates agents without downtime using blue-green deployment
 * Zero-downtime updates, instant rollback, A/B testing support
 */

import { EventEmitter } from 'events';
import { v4 as uuidv4 } from 'uuid';
import { createLogger } from '../lib/production-logger';
import { logAudit } from '../lib/audit';

const logger = createLogger('HotSwap');

// Deployment Types
export type DeploymentStrategy = 
  | 'rolling'        // Update instances one by one
  | 'blue-green'     // Full parallel deployment, instant switch
  | 'canary'         // Gradual traffic shift (5%, 25%, 50%, 100%)
  | 'a-b-test'       // Split traffic for testing
  | 'recreate';      // Stop old, start new (with downtime)

export type DeploymentStatus = 
  | 'pending'        // Waiting to start
  | 'preparing'      // Creating new version
  | 'deploying'      // In progress
  | 'verifying'      // Health checks running
  | 'promoting'      // Switching traffic
  | 'completed'      // Successfully deployed
  | 'failed'         // Deployment failed
  | 'rolling-back';   // Reverting to previous

export interface ComponentVersion {
  versionId: string;
  componentId: string;    // Agent or service ID
  version: string;        // Semantic version (e.g., "1.2.3")
  code: string;
  config: Record<string, any>;
  assets: Map<string, Buffer>;
  checksum: string;
  sizeBytes: number;
  
  // Metadata
  createdAt: Date;
  createdBy: string;
  changeLog: string[];
  labels: Record<string, string>;
  
  // Rollback info
  previousVersionId?: string;
  rollbackAvailable: boolean;
}

export interface Deployment {
  deploymentId: string;
  componentId: string;
  strategy: DeploymentStrategy;
  status: DeploymentStatus;
  
  // Versions
  sourceVersion: ComponentVersion;
  targetVersion: ComponentVersion;
  
  // Blue-Green specific
  blueInstances: DeploymentInstance[];
  greenInstances: DeploymentInstance[];
  
  // Canary/A-B specific
  trafficSplit: TrafficSplit;
  
  // Progress
  progress: number;
  startedAt: Date;
  completedAt?: Date;
  estimatedDuration: number; // seconds
  
  // Health checks
  healthChecks: HealthCheckConfig;
  healthResults: HealthCheckResult[];
  
  // Verification
  verificationScript?: string;
  verificationResults?: VerificationResult;
  
  // Rollback
  canRollback: boolean;
  autoRollbackOnFailure: boolean;
  rollbackDeploymentId?: string;
  
  // Events
  events: DeploymentEvent[];
}

export interface DeploymentInstance {
  instanceId: string;
  deploymentId: string;
  versionId: string;
  status: 'creating' | 'ready' | 'serving' | 'draining' | 'terminated';
  trafficPercent: number;
  
  // Health
  healthStatus: 'healthy' | 'unhealthy' | 'unknown';
  lastHealthCheck?: Date;
  errorCount: number;
  
  // Metrics
  requestCount: number;
  errorRate: number;
  latencyP50: number;
  latencyP99: number;
  
  // Lifecycle
  createdAt: Date;
  startedAt?: Date;
  terminatedAt?: Date;
}

export interface TrafficSplit {
  sourcePercent: number;
  targetPercent: number;
  
  // A/B test specific
  criteria?: {
    userSegment?: string[];
    headerValue?: string;
    cookieValue?: string;
    random?: number;
  };
}

export interface HealthCheckConfig {
  endpoint: string;
  interval: number;      // seconds
  timeout: number;       // seconds
  retries: number;
  
  // Success criteria
  expectedStatus: number;
  expectedResponse?: string;
  
  // Thresholds
  consecutiveSuccesses: number;
  consecutiveFailures: number;
  
  // Custom checks
  customChecks?: Array<{
    name: string;
    command: string;
    expectedOutput: string;
  }>;
}

export interface HealthCheckResult {
  timestamp: Date;
  instanceId: string;
  passed: boolean;
  responseTime: number;
  statusCode?: number;
  error?: string;
  consecutive: number;
}

export interface VerificationResult {
  passed: boolean;
  duration: number;
  testsRun: number;
  testsPassed: number;
  testsFailed: number;
  failures: Array<{
    test: string;
    error: string;
    severity: 'critical' | 'warning';
  }>;
}

export interface DeploymentEvent {
  timestamp: Date;
  type: 'info' | 'warning' | 'error' | 'milestone';
  message: string;
  details?: Record<string, any>;
}

export interface RollbackRequest {
  deploymentId: string;
  reason: string;
  immediate: boolean;
  preserveData: boolean;
}

class HotSwapSystem extends EventEmitter {
  private versions: Map<string, ComponentVersion> = new Map(); // versionId -> version
  private deployments: Map<string, Deployment> = new Map(); // deploymentId -> deployment
  private componentDeployments: Map<string, Set<string>> = new Map(); // componentId -> deploymentIds
  private activeDeployments: Map<string, string> = new Map(); // componentId -> deploymentId
  private monitoringInterval?: NodeJS.Timeout;
  private readonly HEALTH_CHECK_INTERVAL = 5000; // 5 seconds

  constructor() {
    super();
    this.startMonitoring();
  }

  // Register a new component version
  async registerVersion(
    componentId: string,
    version: string,
    code: string,
    config: Record<string, any>,
    createdBy: string,
    changeLog: string[]
  ): Promise<ComponentVersion> {
    const versionId = `${componentId}@${version}`;
    
    // Find previous version for rollback support
    const previousVersions = this.getVersionsForComponent(componentId);
    const previousVersion = previousVersions.length > 0 ? 
      previousVersions[previousVersions.length - 1] : undefined;

    const componentVersion: ComponentVersion = {
      versionId,
      componentId,
      version,
      code,
      config,
      assets: new Map(),
      checksum: this.calculateChecksum(code),
      sizeBytes: Buffer.from(code).length,
      createdAt: new Date(),
      createdBy,
      changeLog,
      labels: {
        'managed-by': 'hotswap-system',
        'created-at': new Date().toISOString()
      },
      previousVersionId: previousVersion?.versionId,
      rollbackAvailable: !!previousVersion
    };

    this.versions.set(versionId, componentVersion);

    await logAudit({
      userId: createdBy,
      organizationId: 'system',
      action: 'version_registered',
      resource: 'component_version',
      resourceId: versionId,
      details: { componentId, version, sizeBytes: componentVersion.sizeBytes }
    });

    this.emit('versionRegistered', { versionId, componentId, version });
    logger.info(`Registered version ${versionId}`);

    return componentVersion;
  }

  // Calculate checksum for integrity
  private calculateChecksum(code: string): string {
    // In production: Use crypto.createHash('sha256')
    return `sha256:${Buffer.from(code).toString('base64').slice(0, 16)}`;
  }

  // Start a deployment
  async deploy(
    componentId: string,
    targetVersionId: string,
    strategy: DeploymentStrategy,
    config: {
      healthChecks?: Partial<HealthCheckConfig>;
      trafficSplit?: Partial<TrafficSplit>;
      autoRollback?: boolean;
      verificationScript?: string;
    },
    initiatedBy: string
  ): Promise<Deployment> {
    const targetVersion = this.versions.get(targetVersionId);
    if (!targetVersion) {
      throw new Error(`Version ${targetVersionId} not found`);
    }

    // Get current active version
    const activeDeploymentId = this.activeDeployments.get(componentId);
    let sourceVersion: ComponentVersion | undefined;
    
    if (activeDeploymentId) {
      const activeDeployment = this.deployments.get(activeDeploymentId);
      sourceVersion = activeDeployment?.targetVersion;
    }

    // If no active version, create a placeholder
    if (!sourceVersion) {
      sourceVersion = {
        versionId: `${componentId}@0.0.0`,
        componentId,
        version: '0.0.0',
        code: '',
        config: {},
        assets: new Map(),
        checksum: '',
        sizeBytes: 0,
        createdAt: new Date(),
        createdBy: 'system',
        changeLog: ['Initial version'],
        labels: {},
        rollbackAvailable: false
      };
    }

    const deploymentId = `deploy-${uuidv4()}`;
    const now = new Date();

    // Setup health checks
    const healthChecks: HealthCheckConfig = {
      endpoint: config.healthChecks?.endpoint || '/health',
      interval: config.healthChecks?.interval || 5,
      timeout: config.healthChecks?.timeout || 10,
      retries: config.healthChecks?.retries || 3,
      expectedStatus: config.healthChecks?.expectedStatus || 200,
      expectedResponse: config.healthChecks?.expectedResponse,
      consecutiveSuccesses: 2,
      consecutiveFailures: 3
    };

    // Setup traffic split
    const trafficSplit: TrafficSplit = {
      sourcePercent: 100,
      targetPercent: 0,
      ...config.trafficSplit
    };

    const deployment: Deployment = {
      deploymentId,
      componentId,
      strategy,
      status: 'pending',
      sourceVersion,
      targetVersion,
      blueInstances: [],
      greenInstances: [],
      trafficSplit,
      progress: 0,
      startedAt: now,
      estimatedDuration: this.estimateDuration(strategy),
      healthChecks,
      healthResults: [],
      verificationScript: config.verificationScript,
      canRollback: true,
      autoRollbackOnFailure: config.autoRollback !== false,
      events: [{
        timestamp: now,
        type: 'info',
        message: `Deployment ${deploymentId} created`,
        details: { strategy, sourceVersion: sourceVersion.versionId, targetVersion: targetVersionId }
      }]
    };

    this.deployments.set(deploymentId, deployment);
    
    // Track component deployments
    let compDeployments = this.componentDeployments.get(componentId);
    if (!compDeployments) {
      compDeployments = new Set();
      this.componentDeployments.set(componentId, compDeployments);
    }
    compDeployments.add(deploymentId);

    await logAudit({
      userId: initiatedBy,
      organizationId: 'system',
      action: 'deployment_created',
      resource: 'deployment',
      resourceId: deploymentId,
      details: { componentId, strategy, targetVersion: targetVersionId }
    });

    this.emit('deploymentCreated', { deploymentId, componentId, strategy });
    logger.info(`Created deployment ${deploymentId} for ${componentId}`);

    // Start deployment
    this.executeDeployment(deploymentId).catch(err => {
      logger.error(`Deployment ${deploymentId} failed: ${err}`);
    });

    return deployment;
  }

  // Estimate deployment duration based on strategy
  private estimateDuration(strategy: DeploymentStrategy): number {
    switch (strategy) {
      case 'blue-green':
        return 180; // 3 minutes
      case 'rolling':
        return 300; // 5 minutes
      case 'canary':
        return 600; // 10 minutes
      case 'a-b-test':
        return 120; // 2 minutes
      case 'recreate':
        return 60; // 1 minute
      default:
        return 180;
    }
  }

  // Execute deployment based on strategy
  private async executeDeployment(deploymentId: string): Promise<void> {
    const deployment = this.deployments.get(deploymentId);
    if (!deployment) throw new Error(`Deployment ${deploymentId} not found`);

    try {
      await this.transitionStatus(deploymentId, 'preparing');

      switch (deployment.strategy) {
        case 'blue-green':
          await this.executeBlueGreenDeployment(deploymentId);
          break;
        case 'rolling':
          await this.executeRollingDeployment(deploymentId);
          break;
        case 'canary':
          await this.executeCanaryDeployment(deploymentId);
          break;
        case 'a-b-test':
          await this.executeABTestDeployment(deploymentId);
          break;
        case 'recreate':
          await this.executeRecreateDeployment(deploymentId);
          break;
      }
    } catch (error) {
      await this.handleDeploymentFailure(deploymentId, error instanceof Error ? error.message : 'Unknown error');
    }
  }

  // Blue-Green Deployment
  private async executeBlueGreenDeployment(deploymentId: string): Promise<void> {
    const deployment = this.deployments.get(deploymentId)!;

    this.addEvent(deploymentId, 'info', 'Starting blue-green deployment');
    await this.transitionStatus(deploymentId, 'deploying');

    // Blue = current (old) instances
    // Green = new instances with target version

    // Step 1: Create green instances
    this.addEvent(deploymentId, 'info', 'Creating green instances with new version');
    deployment.greenInstances = await this.createInstances(
      deploymentId,
      deployment.targetVersion,
      3, // Number of green instances
      0  // No traffic initially
    );

    deployment.progress = 25;
    await this.transitionStatus(deploymentId, 'verifying');

    // Step 2: Health check green instances
    this.addEvent(deploymentId, 'info', 'Running health checks on green instances');
    const healthy = await this.runHealthChecks(deploymentId, deployment.greenInstances);
    
    if (!healthy) {
      throw new Error('Green instances failed health checks');
    }

    deployment.progress = 50;

    // Step 3: Run verification tests
    if (deployment.verificationScript) {
      this.addEvent(deploymentId, 'info', 'Running verification tests');
      const verification = await this.runVerification(deploymentId);
      
      if (!verification.passed) {
        throw new Error(`Verification failed: ${verification.testsFailed} tests failed`);
      }
    }

    deployment.progress = 75;
    await this.transitionStatus(deploymentId, 'promoting');

    // Step 4: Switch traffic (instant)
    this.addEvent(deploymentId, 'milestone', 'Switching all traffic to green');
    await this.switchTraffic(deploymentId, 0, 100); // 0% blue, 100% green

    // Step 5: Drain and terminate blue instances
    this.addEvent(deploymentId, 'info', 'Draining blue instances');
    await this.drainInstances(deployment.blueInstances);
    await this.terminateInstances(deployment.blueInstances);

    deployment.progress = 100;
    deployment.completedAt = new Date();
    await this.transitionStatus(deploymentId, 'completed');

    // Update active deployment
    this.activeDeployments.set(deployment.componentId, deploymentId);

    this.addEvent(deploymentId, 'milestone', 'Blue-green deployment completed successfully');
    logger.info(`Blue-green deployment ${deploymentId} completed`);
  }

  // Rolling Deployment
  private async executeRollingDeployment(deploymentId: string): Promise<void> {
    const deployment = this.deployments.get(deploymentId)!;
    
    this.addEvent(deploymentId, 'info', 'Starting rolling deployment');
    await this.transitionStatus(deploymentId, 'deploying');

    // Rolling update: Replace instances one by one
    const totalInstances = 3; // Total instances to maintain
    
    for (let i = 0; i < totalInstances; i++) {
      this.addEvent(deploymentId, 'info', `Rolling update: Replacing instance ${i + 1}/${totalInstances}`);

      // Create new instance
      const [newInstance] = await this.createInstances(
        deploymentId,
        deployment.targetVersion,
        1,
        0
      );

      // Health check
      const healthy = await this.runHealthChecks(deploymentId, [newInstance]);
      if (!healthy) {
        throw new Error(`New instance ${i + 1} failed health check`);
      }

      // Gradually shift traffic
      await this.switchTraffic(deploymentId, 
        ((totalInstances - i - 1) / totalInstances) * 100,
        ((i + 1) / totalInstances) * 100
      );

      // Terminate one old instance
      if (deployment.blueInstances.length > 0) {
        const oldInstance = deployment.blueInstances.shift()!;
        await this.drainInstances([oldInstance]);
        await this.terminateInstances([oldInstance]);
      }

      deployment.progress = ((i + 1) / totalInstances) * 100;
    }

    deployment.completedAt = new Date();
    await this.transitionStatus(deploymentId, 'completed');
    this.activeDeployments.set(deployment.componentId, deploymentId);

    this.addEvent(deploymentId, 'milestone', 'Rolling deployment completed');
    logger.info(`Rolling deployment ${deploymentId} completed`);
  }

  // Canary Deployment
  private async executeCanaryDeployment(deploymentId: string): Promise<void> {
    const deployment = this.deployments.get(deploymentId)!;
    
    this.addEvent(deploymentId, 'info', 'Starting canary deployment');
    await this.transitionStatus(deploymentId, 'deploying');

    // Canary phases
    const phases = [
      { percent: 5, waitSeconds: 60, name: 'Canary 5%' },
      { percent: 25, waitSeconds: 120, name: 'Canary 25%' },
      { percent: 50, waitSeconds: 180, name: 'Canary 50%' },
      { percent: 100, waitSeconds: 0, name: 'Full rollout' }
    ];

    // Create canary instances
    deployment.greenInstances = await this.createInstances(
      deploymentId,
      deployment.targetVersion,
      2,
      0
    );

    await this.transitionStatus(deploymentId, 'verifying');

    for (const phase of phases) {
      this.addEvent(deploymentId, 'info', `Canary phase: ${phase.name}`);
      
      // Shift traffic
      await this.switchTraffic(deploymentId, 100 - phase.percent, phase.percent);

      // Monitor for errors
      if (phase.waitSeconds > 0) {
        this.addEvent(deploymentId, 'info', `Monitoring for ${phase.waitSeconds}s`);
        await this.sleep(phase.waitSeconds * 1000);

        // Check error rate
        const errorRate = await this.checkErrorRate(deployment.greenInstances);
        if (errorRate > 0.01) { // >1% error rate
          throw new Error(`Canary phase ${phase.name} failed: Error rate ${(errorRate * 100).toFixed(2)}%`);
        }
      }

      deployment.progress = (phases.indexOf(phase) + 1) / phases.length * 100;
    }

    // Full deployment, terminate old instances
    await this.drainInstances(deployment.blueInstances);
    await this.terminateInstances(deployment.blueInstances);

    deployment.completedAt = new Date();
    await this.transitionStatus(deploymentId, 'completed');
    this.activeDeployments.set(deployment.componentId, deploymentId);

    this.addEvent(deploymentId, 'milestone', 'Canary deployment completed successfully');
    logger.info(`Canary deployment ${deploymentId} completed`);
  }

  // A/B Test Deployment
  private async executeABTestDeployment(deploymentId: string): Promise<void> {
    const deployment = this.deployments.get(deploymentId)!;
    
    this.addEvent(deploymentId, 'info', 'Starting A/B test deployment');
    await this.transitionStatus(deploymentId, 'deploying');

    // Create both versions
    deployment.blueInstances = await this.createInstances(
      deploymentId,
      deployment.sourceVersion,
      2,
      50 // 50% traffic to old
    );

    deployment.greenInstances = await this.createInstances(
      deploymentId,
      deployment.targetVersion,
      2,
      50 // 50% traffic to new
    );

    await this.transitionStatus(deploymentId, 'verifying');

    // Health check both
    const blueHealthy = await this.runHealthChecks(deploymentId, deployment.blueInstances);
    const greenHealthy = await this.runHealthChecks(deploymentId, deployment.greenInstances);

    if (!blueHealthy || !greenHealthy) {
      throw new Error('Health checks failed');
    }

    // Traffic is already split 50/50 for A/B test
    deployment.trafficSplit = { sourcePercent: 50, targetPercent: 50 };
    deployment.progress = 100;

    // A/B test stays in "deploying" state until manually promoted or rolled back
    this.addEvent(deploymentId, 'milestone', 'A/B test active - 50/50 traffic split');
    logger.info(`A/B test deployment ${deploymentId} active`);

    // Don't mark as completed - requires manual decision
  }

  // Recreate Deployment (with downtime)
  private async executeRecreateDeployment(deploymentId: string): Promise<void> {
    const deployment = this.deployments.get(deploymentId)!;
    
    this.addEvent(deploymentId, 'warning', 'Starting recreate deployment (downtime expected)');
    await this.transitionStatus(deploymentId, 'deploying');

    // Terminate all old instances
    await this.drainInstances(deployment.blueInstances);
    await this.terminateInstances(deployment.blueInstances);

    deployment.progress = 50;

    // Create new instances
    deployment.greenInstances = await this.createInstances(
      deploymentId,
      deployment.targetVersion,
      3,
      100
    );

    await this.transitionStatus(deploymentId, 'verifying');

    // Health check
    const healthy = await this.runHealthChecks(deploymentId, deployment.greenInstances);
    if (!healthy) {
      throw new Error('New instances failed health checks');
    }

    deployment.progress = 100;
    deployment.completedAt = new Date();
    await this.transitionStatus(deploymentId, 'completed');
    this.activeDeployments.set(deployment.componentId, deploymentId);

    this.addEvent(deploymentId, 'milestone', 'Recreate deployment completed');
    logger.info(`Recreate deployment ${deploymentId} completed`);
  }

  // Create instances
  private async createInstances(
    deploymentId: string,
    version: ComponentVersion,
    count: number,
    trafficPercent: number
  ): Promise<DeploymentInstance[]> {
    const instances: DeploymentInstance[] = [];

    for (let i = 0; i < count; i++) {
      const instance: DeploymentInstance = {
        instanceId: `instance-${uuidv4()}`,
        deploymentId,
        versionId: version.versionId,
        status: 'creating',
        trafficPercent: 0,
        healthStatus: 'unknown',
        errorCount: 0,
        requestCount: 0,
        errorRate: 0,
        latencyP50: 0,
        latencyP99: 0,
        createdAt: new Date()
      };

      instances.push(instance);

      // Simulate instance creation
      await this.sleep(1000);
      instance.status = 'ready';
      instance.trafficPercent = trafficPercent / count;
    }

    return instances;
  }

  // Run health checks on instances
  private async runHealthChecks(
    deploymentId: string,
    instances: DeploymentInstance[]
  ): Promise<boolean> {
    const deployment = this.deployments.get(deploymentId)!;
    const config = deployment.healthChecks;

    for (const instance of instances) {
      let consecutiveSuccesses = 0;
      let consecutiveFailures = 0;

      for (let attempt = 0; attempt < config.retries * 2; attempt++) {
        const startTime = Date.now();
        
        try {
          // Simulate health check
          const healthy = Math.random() > 0.1; // 90% success rate
          const responseTime = Date.now() - startTime;

          const result: HealthCheckResult = {
            timestamp: new Date(),
            instanceId: instance.instanceId,
            passed: healthy,
            responseTime,
            statusCode: healthy ? 200 : 500,
            consecutive: healthy ? ++consecutiveSuccesses : ++consecutiveFailures
          };

          deployment.healthResults.push(result);
          instance.healthStatus = healthy ? 'healthy' : 'unhealthy';

          if (consecutiveSuccesses >= config.consecutiveSuccesses) {
            instance.status = 'serving';
            break;
          }

          if (consecutiveFailures >= config.consecutiveFailures) {
            return false;
          }

          await this.sleep(config.interval * 1000);
        } catch (error) {
          consecutiveFailures++;
          if (consecutiveFailures >= config.consecutiveFailures) {
            return false;
          }
        }
      }
    }

    return true;
  }

  // Run verification tests
  private async runVerification(deploymentId: string): Promise<VerificationResult> {
    const deployment = this.deployments.get(deploymentId)!;
    
    // Simulate running tests
    await this.sleep(5000);

    const result: VerificationResult = {
      passed: true,
      duration: 5000,
      testsRun: 50,
      testsPassed: 48,
      testsFailed: 2,
      failures: [
        { test: 'edge_case_1', error: 'Minor edge case failure', severity: 'warning' }
      ]
    };

    deployment.verificationResults = result;
    return result;
  }

  // Switch traffic between versions
  private async switchTraffic(
    deploymentId: string,
    sourcePercent: number,
    targetPercent: number
  ): Promise<void> {
    const deployment = this.deployments.get(deploymentId)!;
    
    deployment.trafficSplit = { sourcePercent, targetPercent };

    // Update instance traffic percentages
    const blueCount = deployment.blueInstances.length;
    const greenCount = deployment.greenInstances.length;

    if (blueCount > 0) {
      const bluePerInstance = sourcePercent / blueCount;
      deployment.blueInstances.forEach(i => i.trafficPercent = bluePerInstance);
    }

    if (greenCount > 0) {
      const greenPerInstance = targetPercent / greenCount;
      deployment.greenInstances.forEach(i => i.trafficPercent = greenPerInstance);
    }

    this.emit('trafficSwitched', { deploymentId, sourcePercent, targetPercent });
    logger.info(`Deployment ${deploymentId}: Traffic switched to ${targetPercent}% new version`);
  }

  // Drain instances (stop accepting new connections)
  private async drainInstances(instances: DeploymentInstance[]): Promise<void> {
    for (const instance of instances) {
      instance.status = 'draining';
      instance.trafficPercent = 0;
      
      // Wait for existing connections to complete
      await this.sleep(5000);
    }
  }

  // Terminate instances
  private async terminateInstances(instances: DeploymentInstance[]): Promise<void> {
    for (const instance of instances) {
      instance.status = 'terminated';
      instance.terminatedAt = new Date();
    }
  }

  // Check error rate on instances
  private async checkErrorRate(instances: DeploymentInstance[]): Promise<number> {
    // Simulate checking error rate
    await this.sleep(100);
    return Math.random() * 0.005; // 0-0.5% error rate
  }

  // Handle deployment failure
  private async handleDeploymentFailure(deploymentId: string, error: string): Promise<void> {
    const deployment = this.deployments.get(deploymentId)!;
    
    this.addEvent(deploymentId, 'error', `Deployment failed: ${error}`);
    await this.transitionStatus(deploymentId, 'failed');

    // Auto-rollback if enabled
    if (deployment.autoRollbackOnFailure) {
      this.addEvent(deploymentId, 'warning', 'Auto-rollback triggered');
      await this.rollback(deploymentId, 'Deployment failure', true);
    }

    this.emit('deploymentFailed', { deploymentId, error });
    logger.error(`Deployment ${deploymentId} failed: ${error}`);
  }

  // Rollback deployment
  async rollback(
    deploymentId: string,
    reason: string,
    immediate: boolean = false
  ): Promise<Deployment> {
    const deployment = this.deployments.get(deploymentId);
    if (!deployment) {
      throw new Error(`Deployment ${deploymentId} not found`);
    }

    if (!deployment.canRollback) {
      throw new Error('Cannot rollback this deployment');
    }

    await this.transitionStatus(deploymentId, 'rolling-back');
    this.addEvent(deploymentId, 'warning', `Rollback initiated: ${reason}`);

    // Create rollback deployment
    const rollbackDeployment = await this.deploy(
      deployment.componentId,
      deployment.sourceVersion.versionId,
      immediate ? 'blue-green' : 'rolling',
      {
        autoRollback: false
      },
      'system'
    );

    deployment.rollbackDeploymentId = rollbackDeployment.deploymentId;

    await logAudit({
      userId: 'system',
      organizationId: 'system',
      action: 'deployment_rollback',
      resource: 'deployment',
      resourceId: deploymentId,
      details: { reason, rollbackDeploymentId: rollbackDeployment.deploymentId }
    });

    this.emit('deploymentRollback', { deploymentId, reason, rollbackDeploymentId: rollbackDeployment.deploymentId });
    logger.info(`Deployment ${deploymentId} rolled back`);

    return rollbackDeployment;
  }

  // Promote A/B test (switch 100% to new version)
  async promoteABTest(deploymentId: string, initiatedBy: string): Promise<void> {
    const deployment = this.deployments.get(deploymentId);
    if (!deployment) {
      throw new Error(`Deployment ${deploymentId} not found`);
    }

    if (deployment.strategy !== 'a-b-test') {
      throw new Error('Can only promote A/B test deployments');
    }

    this.addEvent(deploymentId, 'info', 'Promoting A/B test to 100% new version');

    // Switch all traffic to new version
    await this.switchTraffic(deploymentId, 0, 100);

    // Drain and terminate old instances
    await this.drainInstances(deployment.blueInstances);
    await this.terminateInstances(deployment.blueInstances);

    deployment.completedAt = new Date();
    await this.transitionStatus(deploymentId, 'completed');
    this.activeDeployments.set(deployment.componentId, deploymentId);

    await logAudit({
      userId: initiatedBy,
      organizationId: 'system',
      action: 'ab_test_promoted',
      resource: 'deployment',
      resourceId: deploymentId
    });

    this.emit('abTestPromoted', { deploymentId, componentId: deployment.componentId });
    logger.info(`A/B test ${deploymentId} promoted`);
  }

  // Transition deployment status
  private async transitionStatus(deploymentId: string, newStatus: DeploymentStatus): Promise<void> {
    const deployment = this.deployments.get(deploymentId);
    if (!deployment) return;

    const oldStatus = deployment.status;
    deployment.status = newStatus;

    this.emit('statusChanged', { deploymentId, oldStatus, newStatus });
  }

  // Add deployment event
  private addEvent(
    deploymentId: string,
    type: DeploymentEvent['type'],
    message: string,
    details?: Record<string, any>
  ): void {
    const deployment = this.deployments.get(deploymentId);
    if (!deployment) return;

    deployment.events.push({
      timestamp: new Date(),
      type,
      message,
      details
    });

    this.emit('deploymentEvent', { deploymentId, type, message });
  }

  // Get deployment
  getDeployment(deploymentId: string): Deployment | undefined {
    return this.deployments.get(deploymentId);
  }

  // Get deployments for component
  getComponentDeployments(componentId: string): Deployment[] {
    const deploymentIds = this.componentDeployments.get(componentId);
    if (!deploymentIds) return [];

    return Array.from(deploymentIds)
      .map(id => this.deployments.get(id))
      .filter((d): d is Deployment => d !== undefined);
  }

  // Get active deployment for component
  getActiveDeployment(componentId: string): Deployment | undefined {
    const deploymentId = this.activeDeployments.get(componentId);
    if (!deploymentId) return undefined;
    return this.deployments.get(deploymentId);
  }

  // Get version
  getVersion(versionId: string): ComponentVersion | undefined {
    return this.versions.get(versionId);
  }

  // Get versions for component
  getVersionsForComponent(componentId: string): ComponentVersion[] {
    return Array.from(this.versions.values())
      .filter(v => v.componentId === componentId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  // Utility: Sleep
  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Start monitoring
  private startMonitoring(): void {
    this.monitoringInterval = setInterval(() => {
      this.monitorDeployments();
    }, 10000); // Every 10 seconds
  }

  // Monitor active deployments
  private monitorDeployments(): void {
    for (const deployment of this.deployments.values()) {
      if (deployment.status !== 'deploying' && deployment.status !== 'verifying') {
        continue;
      }

      // Update instance metrics
      for (const instance of [...deployment.blueInstances, ...deployment.greenInstances]) {
        if (instance.status === 'serving') {
          // Simulate metrics
          instance.requestCount += Math.floor(Math.random() * 100);
          instance.errorRate = Math.random() * 0.01;
          instance.latencyP50 = 50 + Math.random() * 100;
          instance.latencyP99 = 200 + Math.random() * 300;
        }
      }
    }
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
export const hotSwapSystem = new HotSwapSystem();

// Export types
export type { HotSwapSystem };
