/**
 * =============================================================================
 * KNOWLEDGE GRAPH DATA GENERATOR
 * =============================================================================
 *
 * Generates comprehensive knowledge graph data with 6,000+ nodes across
 * 48 departments, 10 executives, command center, main agents, and sub-agents.
 *
 * @version 3.0.0
 */

import {
  KnowledgeGraphNode,
  GraphConnection,
  DepartmentCategory,
  NodeType,
  NodeMetrics,
  AgentCapability,
  NodeStatus,
  DEPARTMENT_NAMES,
  EXECUTIVE_ROLES,
  COMMAND_CENTER_ROLES,
  AGENT_SKILLS,
  PolarCoord,
  Point3D,
  LayerConfig,
  DEFAULT_LAYER_CONFIGS,
} from './types';

// ============================================
// UTILITY FUNCTIONS
// ============================================

const generateId = (prefix: string): string => `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

const randomBetween = (min: number, max: number): number => Math.random() * (max - min) + min;

const randomInt = (min: number, max: number): number => Math.floor(randomBetween(min, max + 1));

const pickRandom = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

const pickRandomN = <T>(arr: T[], n: number): T[] => {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(n, arr.length));
};

const generateTimestamp = (daysAgo: number = 0): string => {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString();
};

const generateMetrics = (): NodeMetrics => ({
  performance: randomInt(65, 99),
  reliability: randomInt(85, 100),
  efficiency: randomInt(70, 98),
  tokenUsage: randomInt(1000, 100000),
  responseTime: randomInt(50, 500),
  uptime: randomBetween(98, 100),
  taskCompletion: randomInt(85, 100),
  costEfficiency: randomBetween(0.5, 1.0),
  collaboration: randomInt(60, 100),
  learningRate: randomBetween(0.01, 0.1),
});

const generateEmbedding = (dimension: number = 128): number[] => {
  return Array.from({ length: dimension }, () => randomBetween(-1, 1));
};

const clusterColors: Record<string, string> = {
  technology: '#6366f1',
  product: '#8b5cf6',
  operations: '#10b981',
  finance: '#f59e0b',
  marketing: '#ec4899',
  sales: '#f97316',
  customer_success: '#14b8a6',
  hr: '#f43f5e',
  legal: '#6b7280',
  strategy: '#a855f7',
  design: '#d946ef',
  data: '#0ea5e9',
  security: '#ef4444',
  executive: '#f59e0b',
  infrastructure: '#64748b',
  research: '#06b6d4',
  innovation: '#8b5cf6',
  communications: '#84cc16',
  partnerships: '#22c55e',
  supply_chain: '#eab308',
  manufacturing: '#78716c',
  quality: '#0d9488',
  training: '#a3e635',
  support: '#2dd4bf',
  analytics: '#38bdf8',
  intelligence: '#818cf8',
  compliance: '#92400e',
};

const getCategoryForDepartment = (deptName: string): DepartmentCategory => {
  const categoryMap: Record<string, DepartmentCategory> = {
    'Software Engineering': 'technology',
    'Cloud Infrastructure': 'infrastructure',
    'DevOps & Reliability': 'technology',
    'Data Engineering': 'data',
    'AI/ML Research': 'research',
    'Cybersecurity': 'security',
    'QA & Testing': 'quality',
    'Technical Documentation': 'communications',
    'Product Management': 'product',
    'UX/UI Design': 'design',
    'Product Analytics': 'analytics',
    'Design Systems': 'design',
    'User Research': 'research',
    'Business Operations': 'operations',
    'Supply Chain': 'supply_chain',
    'Procurement': 'operations',
    'Facilities Management': 'operations',
    'Logistics': 'supply_chain',
    'Risk Management': 'compliance',
    'Process Optimization': 'operations',
    'Vendor Management': 'partnerships',
    'Financial Planning': 'finance',
    'Accounting': 'finance',
    'Legal & Compliance': 'legal',
    'Internal Audit': 'compliance',
    'Treasury': 'finance',
    'Tax': 'finance',
    'Digital Marketing': 'marketing',
    'Content Marketing': 'marketing',
    'Brand Management': 'marketing',
    'Sales Operations': 'sales',
    'Account Management': 'sales',
    'Lead Generation': 'sales',
    'Market Intelligence': 'intelligence',
    'Customer Support': 'support',
    'Customer Success': 'customer_success',
    'Technical Support': 'support',
    'Community Management': 'communications',
    'Training & Education': 'training',
    'Talent Acquisition': 'hr',
    'People Operations': 'hr',
    'Learning & Development': 'training',
    'Compensation & Benefits': 'hr',
    'Employee Experience': 'hr',
    'Corporate Strategy': 'strategy',
    'Business Intelligence': 'intelligence',
    'Innovation Lab': 'innovation',
    'Mergers & Acquisitions': 'strategy',
  };
  return categoryMap[deptName] || 'technology';
};

const getAllCapabilities = (): AgentCapability[] => [
  'nlp', 'vision', 'audio', 'decision', 'automation',
  'analytics', 'communication', 'integration', 'monitoring',
  'security', 'optimization', 'prediction', 'classification',
  'extraction', 'generation', 'reasoning', 'planning',
  'memory', 'learning', 'collaboration',
];

// ============================================
// POLAR COORDINATE CONVERSIONS
// ============================================

export const polarToCartesian = (polar: PolarCoord): Point3D => {
  const { r, theta, phi } = polar;
  return {
    x: r * Math.cos(theta) * Math.cos(phi),
    y: r * Math.sin(theta) * Math.cos(phi),
    z: r * Math.sin(phi),
  };
};

export const cartesianToPolar = (point: Point3D): PolarCoord => {
  const r = Math.sqrt(point.x ** 2 + point.y ** 2 + point.z ** 2);
  const theta = Math.atan2(point.y, point.x);
  const phi = Math.asin(point.z / (r || 1));
  return { r, theta, phi };
};

// ============================================
// NODE GENERATORS
// ============================================

export class KnowledgeGraphDataGenerator {
  private nodes: Map<string, KnowledgeGraphNode> = new Map();
  private connections: GraphConnection[] = [];
  private layerConfigs: LayerConfig[];

  constructor(layerConfigs?: LayerConfig[]) {
    this.layerConfigs = layerConfigs || DEFAULT_LAYER_CONFIGS;
  }

  /**
   * Generate the complete knowledge graph with 6,000+ nodes
   */
  generate(): { nodes: KnowledgeGraphNode[]; connections: GraphConnection[] } {
    this.nodes.clear();
    this.connections = [];

    // Generate in order: executives -> command center -> departments -> main agents -> sub-agents
    this.generateExecutiveLayer();
    this.generateCommandCenterLayer();
    this.generateDepartmentLayer();
    this.generateMainAgents();
    this.generateSubAgents();
    this.generateCrossConnections();

    return {
      nodes: Array.from(this.nodes.values()),
      connections: this.connections,
    };
  }

  /**
   * Layer 0: Generate 10 C-Suite executive nodes at center
   */
  private generateExecutiveLayer(): void {
    const layerConfig = this.layerConfigs[0];
    const executives: KnowledgeGraphNode[] = [];

  const capabilityPool: AgentCapability[] = ['decision', 'analytics', 'planning', 'reasoning', 'collaboration'];

    EXECUTIVE_ROLES.forEach((role, index) => {
      const theta = (index / EXECUTIVE_ROLES.length) * Math.PI * 2;
      const phi = randomBetween(-0.3, 0.3);
      const radius = randomBetween(0, layerConfig.thickness * 0.5);

      const polar: PolarCoord = { r: radius, theta, phi };
      const position = polarToCartesian(polar);

      const node: KnowledgeGraphNode = {
        id: `exec-${role.toLowerCase()}`,
        label: role,
        type: 'executive',
        category: 'executive',
        position,
        polarPosition: polar,
        radius: randomBetween(layerConfig.nodeMinRadius, layerConfig.nodeMaxRadius),
        color: '#f59e0b',
        secondaryColor: '#fbbf24',
        opacity: 1,
        scale: 1,
        glowIntensity: 0.8 + Math.random() * 0.2,
        pulseFrequency: randomBetween(1, 3),
        childrenIds: [],
        depth: 0,
        layerIndex: 0,
        angularPosition: (index / EXECUTIVE_ROLES.length) * 360,
        capabilities: pickRandomN(capabilityPool, randomInt(2, 4)),
        skills: ['Strategic Planning', 'Decision Making', 'Leadership', 'Resource Allocation'],
        status: 'active',
        metrics: {
          ...generateMetrics(),
          performance: randomInt(90, 100),
          reliability: randomInt(95, 100),
        },
        performanceHistory: this.generatePerformanceHistory(30),
        knowledgeBase: [],
        semanticClusters: ['executive'],
        centralityScore: 1.0,
        pageRank: 1.0,
        betweennessCentrality: 0.9 + Math.random() * 0.1,
        closenessCentrality: 0.95 + Math.random() * 0.05,
        retrievalScore: 1.0,
        contextWindow: 100000,
        knowledgeSources: ['corporate-strategy', 'executive-decisions'],
        metadata: {
          version: '1.0.0',
          createdAt: generateTimestamp(365),
          updatedAt: generateTimestamp(),
          tags: ['c-suite', 'executive', 'leadership'],
          priority: 1,
          department: 'executive',
        },
        isExpanded: true,
        isVisible: true,
        isHighlighted: false,
        isSelected: false,
        isLocked: true,
        subAgentCount: 0,
      };

      this.nodes.set(node.id, node);
      executives.push(node);
    });

    // Connect executives to each other (mesh topology)
    for (let i = 0; i < executives.length; i++) {
      for (let j = i + 1; j < executives.length; j++) {
        this.connections.push({
          id: generateId('conn'),
          fromId: executives[i].id,
          toId: executives[j].id,
          type: 'collaboration',
          color: '#f59e0b',
          width: 1.5,
          opacity: 0.4,
          style: 'animated',
          strength: 0.8 + Math.random() * 0.2,
          weight: 1.0,
          bidirectional: true,
          frequency: randomInt(50, 200),
          latency: randomBetween(1, 5),
          dataFlowRate: randomBetween(50, 200),
          semanticSimilarity: 0.7 + Math.random() * 0.3,
          relationshipConfidence: 0.9 + Math.random() * 0.1,
          temporalRecency: 1.0,
          animated: true,
          particleCount: 3,
          animationSpeed: 1.5,
          isActive: true,
          isHighlighted: false,
        });
      }
    }
  }

  /**
   * Layer 1: Generate 8 Command Center nodes
   */
  private generateCommandCenterLayer(): void {
    const layerConfig = this.layerConfigs[1];
    const commandNodes: KnowledgeGraphNode[] = [];

    COMMAND_CENTER_ROLES.forEach((role, index) => {
      const theta = (index / COMMAND_CENTER_ROLES.length) * Math.PI * 2;
      const phi = randomBetween(-0.2, 0.2);

      const polar: PolarCoord = { r: layerConfig.radius, theta, phi };
      const position = polarToCartesian(polar);

      const node: KnowledgeGraphNode = {
        id: `cmd-${role.toLowerCase().replace(/\s+/g, '-')}`,
        label: role,
        type: 'command_center',
        category: 'operations',
        position,
        polarPosition: polar,
        radius: randomBetween(layerConfig.nodeMinRadius, layerConfig.nodeMaxRadius),
        color: '#94a3b8',
        secondaryColor: '#cbd5e1',
        opacity: 0.95,
        scale: 1,
        glowIntensity: 0.6,
        pulseFrequency: randomBetween(0.5, 2),
        childrenIds: [],
        depth: 1,
        layerIndex: 1,
        angularPosition: (index / COMMAND_CENTER_ROLES.length) * 360,
        capabilities: ['automation', 'optimization', 'monitoring', 'analytics'],
        skills: ['System Orchestration', 'Resource Management', 'Task Scheduling'],
        status: 'active',
        metrics: generateMetrics(),
        performanceHistory: this.generatePerformanceHistory(30),
        knowledgeBase: [],
        semanticClusters: ['command-center'],
        centralityScore: 0.9,
        pageRank: 0.85,
        betweennessCentrality: 0.7 + Math.random() * 0.2,
        closenessCentrality: 0.8 + Math.random() * 0.15,
        retrievalScore: 0.9,
        contextWindow: 50000,
        knowledgeSources: ['command-center', 'system-logs'],
        metadata: {
          version: '1.0.0',
          createdAt: generateTimestamp(300),
          updatedAt: generateTimestamp(),
          tags: ['command-center', 'orchestration', 'management'],
          priority: 2,
          department: 'operations',
        },
        isExpanded: true,
        isVisible: true,
        isHighlighted: false,
        isSelected: false,
        isLocked: false,
        subAgentCount: 0,
      };

      this.nodes.set(node.id, node);
      commandNodes.push(node);
    });

    // Connect command center nodes to executives
    commandNodes.forEach(cmdNode => {
      const execNodes = Array.from(this.nodes.values()).filter(n => n.type === 'executive');
      execNodes.forEach(execNode => {
        this.connections.push({
          id: generateId('conn'),
          fromId: execNode.id,
          toId: cmdNode.id,
          type: 'hierarchy',
          color: '#94a3b8',
          width: 2,
          opacity: 0.5,
          style: 'animated',
          strength: 0.9,
          weight: 0.8,
          bidirectional: true,
          frequency: randomInt(100, 500),
          latency: randomBetween(1, 10),
          dataFlowRate: randomBetween(100, 500),
          semanticSimilarity: 0.6 + Math.random() * 0.3,
          relationshipConfidence: 0.85 + Math.random() * 0.15,
          temporalRecency: 0.9 + Math.random() * 0.1,
          animated: true,
          particleCount: 2,
          animationSpeed: 1,
          isActive: true,
          isHighlighted: false,
        });
      });
    });

    // Mesh connections within command center
    for (let i = 0; i < commandNodes.length; i++) {
      for (let j = i + 1; j < commandNodes.length; j += 2) {
        this.connections.push({
          id: generateId('conn'),
          fromId: commandNodes[i].id,
          toId: commandNodes[j].id,
          type: 'collaboration',
          color: '#64748b',
          width: 1,
          opacity: 0.3,
          style: 'dashed',
          strength: 0.5 + Math.random() * 0.3,
          weight: 0.3,
          bidirectional: true,
          frequency: randomInt(10, 100),
          latency: randomBetween(5, 20),
          dataFlowRate: randomBetween(10, 100),
          semanticSimilarity: 0.4 + Math.random() * 0.3,
          relationshipConfidence: 0.5 + Math.random() * 0.3,
          temporalRecency: 0.6 + Math.random() * 0.3,
          animated: false,
          particleCount: 1,
          animationSpeed: 0.5,
          isActive: true,
          isHighlighted: false,
        });
      }
    }
  }

  /**
   * Layer 2: Generate 48 Department nodes arranged in a perfect circle
   */
  private generateDepartmentLayer(): void {
    const layerConfig = this.layerConfigs[2];
    const deptNodes: KnowledgeGraphNode[] = [];

    DEPARTMENT_NAMES.forEach((deptName, index) => {
      const angleStep = (2 * Math.PI) / DEPARTMENT_NAMES.length;
      const theta = index * angleStep;
      const phi = randomBetween(-0.15, 0.15);
      const category = getCategoryForDepartment(deptName);
      const color = clusterColors[category] || '#10b981';

      const polar: PolarCoord = { r: layerConfig.radius, theta, phi };
      const position = polarToCartesian(polar);

      const node: KnowledgeGraphNode = {
        id: `dept-${deptName.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
        label: deptName,
        type: 'department',
        category,
        position,
        polarPosition: polar,
        radius: randomBetween(layerConfig.nodeMinRadius, layerConfig.nodeMaxRadius),
        color,
        secondaryColor: color,
        opacity: 0.9,
        scale: 1,
        glowIntensity: 0.5,
        pulseFrequency: randomBetween(0.3, 1),
        childrenIds: [],
        depth: 2,
        layerIndex: 2,
        angularPosition: (index / DEPARTMENT_NAMES.length) * 360,
        capabilities: pickRandomN(getAllCapabilities(), randomInt(3, 7)),
        skills: [],
        status: Math.random() > 0.1 ? 'active' : 'draft',
        metrics: generateMetrics(),
        performanceHistory: this.generatePerformanceHistory(30),
        knowledgeBase: [],
        semanticClusters: ['department', category],
        centralityScore: 0.7 + Math.random() * 0.2,
        pageRank: 0.6 + Math.random() * 0.3,
        betweennessCentrality: 0.5 + Math.random() * 0.3,
        closenessCentrality: 0.6 + Math.random() * 0.3,
        retrievalScore: 0.8,
        contextWindow: 25000,
        knowledgeSources: [`${category}-knowledge`, `${deptName.toLowerCase().replace(/\s+/g, '-')}`],
        metadata: {
          description: `${deptName} department handling all related operations`,
          version: '1.0.0',
          createdAt: generateTimestamp(randomInt(200, 365)),
          updatedAt: generateTimestamp(randomInt(0, 30)),
          tags: ['department', category, deptName.toLowerCase().replace(/\s+/g, '-')],
          priority: randomInt(1, 5),
          department: category,
        },
        isExpanded: true,
        isVisible: true,
        isHighlighted: false,
        isSelected: false,
        isLocked: false,
        subAgentCount: 0,
      };

      this.nodes.set(node.id, node);
      deptNodes.push(node);
    });

    // Connect departments to command center and executives
    deptNodes.forEach(deptNode => {
      // Connect to nearest command center node
      const cmdNodes = Array.from(this.nodes.values()).filter(n => n.type === 'command_center');
      const nearestCmd = cmdNodes.reduce((best, cmd) => {
        const dist = this.distance3D(deptNode.position, cmd.position);
        return dist < this.distance3D(deptNode.position, best.position) ? cmd : best;
      }, cmdNodes[0]);

      this.connections.push({
        id: generateId('conn'),
        fromId: nearestCmd.id,
        toId: deptNode.id,
        type: 'hierarchy',
        color: deptNode.color,
        width: 2.5,
        opacity: 0.6,
        style: 'solid',
        strength: 0.85 + Math.random() * 0.15,
        weight: 0.7,
        bidirectional: true,
        frequency: randomInt(50, 300),
        latency: randomBetween(2, 15),
        dataFlowRate: randomBetween(50, 300),
        semanticSimilarity: 0.5 + Math.random() * 0.3,
        relationshipConfidence: 0.7 + Math.random() * 0.2,
        temporalRecency: 0.8 + Math.random() * 0.2,
        animated: true,
        particleCount: 2,
        animationSpeed: 0.8,
        isActive: true,
        isHighlighted: false,
      });

      // Connect to relevant executive based on category
      const execNodes = Array.from(this.nodes.values()).filter(n => n.type === 'executive');
      const relevantExec = execNodes.find(e => {
        const catLower = deptNode.category.toLowerCase();
        const execLabel = e.label.toLowerCase();
        if (catLower.includes('technology') && (execLabel.includes('cto') || execLabel.includes('cio'))) return true;
        if (catLower.includes('finance') && execLabel.includes('cfo')) return true;
        if (catLower.includes('marketing') && execLabel.includes('cmo')) return true;
        if (catLower.includes('operations') && execLabel.includes('coo')) return true;
        if (catLower.includes('hr') && execLabel.includes('chro')) return true;
        return false;
      });

      if (relevantExec) {
        this.connections.push({
          id: generateId('conn'),
          fromId: relevantExec.id,
          toId: deptNode.id,
          type: 'reporting',
          color: '#f59e0b',
          width: 1.5,
          opacity: 0.4,
          style: 'dashed',
          strength: 0.6,
          weight: 0.5,
          bidirectional: false,
          frequency: randomInt(10, 50),
          latency: randomBetween(10, 50),
          dataFlowRate: randomBetween(10, 50),
          semanticSimilarity: 0.4 + Math.random() * 0.3,
          relationshipConfidence: 0.6 + Math.random() * 0.2,
          temporalRecency: 0.7 + Math.random() * 0.2,
          animated: false,
          particleCount: 1,
          animationSpeed: 0.5,
          isActive: true,
          isHighlighted: false,
        });
      }
    });
  }

  /**
   * Layer 3: Generate Main Agents (~200) connected to departments
   */
  private generateMainAgents(): void {
    const layerConfig = this.layerConfigs[3];
    const deptNodes = Array.from(this.nodes.values()).filter(n => n.type === 'department');
    const agentsPerDept = Math.ceil(200 / deptNodes.length);
    let agentId = 0;

    deptNodes.forEach(deptNode => {
      for (let i = 0; i < agentsPerDept; i++) {
        agentId++;
        const angleOffset = randomBetween(-0.2, 0.2);
        const theta = deptNode.polarPosition.theta + angleOffset;
        const radius = layerConfig.radius + randomBetween(-30, 30);
        const phi = randomBetween(-0.25, 0.25);

        const polar: PolarCoord = { r: radius, theta, phi };
        const position = polarToCartesian(polar);
        const capabilities = pickRandomN(getAllCapabilities(), randomInt(2, 5));

        const skills = capabilities.flatMap(cap => {
          const skillSet = AGENT_SKILLS[cap];
          return skillSet ? pickRandomN(skillSet, randomInt(1, 3)) : [];
        });

        const node: KnowledgeGraphNode = {
          id: `agent-${deptNode.id}-${i}`,
          label: `${deptNode.label.replace(/^.{0,10}/, m => m)} Agent ${i + 1}`,
          type: 'main_agent',
          category: deptNode.category,
          position,
          polarPosition: polar,
          radius: randomBetween(layerConfig.nodeMinRadius, layerConfig.nodeMaxRadius),
          color: deptNode.color,
          secondaryColor: deptNode.secondaryColor,
          opacity: 0.85,
          scale: 1,
          glowIntensity: 0.3 + Math.random() * 0.3,
          pulseFrequency: randomBetween(0.2, 1.5),
          parentId: deptNode.id,
          childrenIds: [],
          depth: 3,
          layerIndex: 3,
          angularPosition: deptNode.angularPosition + randomBetween(-5, 5),
          agentType: pickRandom(['reactive', 'proactive', 'learning', 'swarm', 'hybrid']),
          capabilities,
          skills: skills.slice(0, 8),
          status: Math.random() > 0.15 ? 'active' : pickRandom(['draft', 'paused']),
          metrics: generateMetrics(),
          performanceHistory: this.generatePerformanceHistory(30),
          knowledgeBase: [],
          semanticClusters: ['main-agent', deptNode.category],
          centralityScore: 0.4 + Math.random() * 0.3,
          pageRank: 0.3 + Math.random() * 0.3,
          betweennessCentrality: 0.3 + Math.random() * 0.3,
          closenessCentrality: 0.4 + Math.random() * 0.3,
          retrievalScore: 0.6 + Math.random() * 0.3,
          contextWindow: randomInt(8000, 32000),
          knowledgeSources: [`agent-${deptNode.metadata.department}`],
          metadata: {
            version: '1.0.0',
            createdAt: generateTimestamp(randomInt(30, 200)),
            updatedAt: generateTimestamp(randomInt(0, 15)),
            tags: ['agent', deptNode.category, ...capabilities],
            priority: randomInt(1, 5),
            department: deptNode.category,
          },
          isExpanded: false,
          isVisible: true,
          isHighlighted: false,
          isSelected: false,
          isLocked: false,
          subAgentCount: 0,
        };

        this.nodes.set(node.id, node);
        deptNode.childrenIds.push(node.id);

        // Connect agent to its department
        this.connections.push({
          id: generateId('conn'),
          fromId: deptNode.id,
          toId: node.id,
          type: 'hierarchy',
          color: deptNode.color,
          width: 2,
          opacity: 0.5,
          style: 'solid',
          strength: 0.8 + Math.random() * 0.2,
          weight: 0.6,
          bidirectional: false,
          frequency: randomInt(20, 200),
          latency: randomBetween(2, 20),
          dataFlowRate: randomBetween(20, 200),
          semanticSimilarity: 0.5 + Math.random() * 0.3,
          relationshipConfidence: 0.7 + Math.random() * 0.2,
          temporalRecency: 0.8 + Math.random() * 0.2,
          animated: true,
          particleCount: 1,
          animationSpeed: 0.6,
          isActive: true,
          isHighlighted: false,
        });
      }
    });
  }

  /**
   * Layer 4: Generate 5,000+ Sub-Agents clustered around main agents
   */
  private generateSubAgents(): void {
    const layerConfig = this.layerConfigs[4];
    const mainAgents = Array.from(this.nodes.values()).filter(n => n.type === 'main_agent');
    const totalSubAgents = 6000;
    const agentsPerMain = Math.ceil(totalSubAgents / mainAgents.length);
    let totalGenerated = 0;

    mainAgents.forEach(mainAgent => {
      const count = Math.min(agentsPerMain, totalSubAgents - totalGenerated);
      const subAgentIds: string[] = [];

      for (let i = 0; i < count; i++) {
        totalGenerated++;
        const theta = mainAgent.polarPosition.theta + randomBetween(-0.3, 0.3);
        const radius = layerConfig.radius + randomBetween(-40, 40);
        const phi = randomBetween(-0.3, 0.3);

        const polar: PolarCoord = { r: radius, theta, phi };
        const position = polarToCartesian(polar);

        const node: KnowledgeGraphNode = {
          id: `sub-${mainAgent.id}-${i}`,
          label: `${mainAgent.label} Sub ${i + 1}`,
          type: 'sub_agent',
          category: mainAgent.category,
          position,
          polarPosition: polar,
          radius: randomBetween(layerConfig.nodeMinRadius, layerConfig.nodeMaxRadius),
          color: '#8b5cf6',
          secondaryColor: '#a78bfa',
          opacity: 0.5 + Math.random() * 0.3,
          scale: 1,
          glowIntensity: 0.1 + Math.random() * 0.2,
          pulseFrequency: randomBetween(0.1, 1),
          parentId: mainAgent.id,
          childrenIds: [],
          depth: 4,
          layerIndex: 4,
          angularPosition: mainAgent.angularPosition + randomBetween(-10, 10),
          capabilities: pickRandomN(getAllCapabilities(), randomInt(1, 3)),
          skills: [],
          status: Math.random() > 0.2 ? 'active' : 'draft',
          metrics: generateMetrics(),
          performanceHistory: this.generatePerformanceHistory(10),
          knowledgeBase: [],
          semanticClusters: ['sub-agent', mainAgent.category],
          centralityScore: 0.1 + Math.random() * 0.2,
          pageRank: 0.05 + Math.random() * 0.15,
          betweennessCentrality: 0.05 + Math.random() * 0.15,
          closenessCentrality: 0.1 + Math.random() * 0.2,
          retrievalScore: 0.3 + Math.random() * 0.3,
          contextWindow: randomInt(2000, 8000),
          knowledgeSources: [],
          metadata: {
            version: '1.0.0',
            createdAt: generateTimestamp(randomInt(0, 60)),
            updatedAt: generateTimestamp(randomInt(0, 7)),
            tags: ['sub-agent', mainAgent.category],
            priority: randomInt(3, 5),
            department: mainAgent.category,
          },
          isExpanded: false,
          isVisible: true,
          isHighlighted: false,
          isSelected: false,
          isLocked: false,
          subAgentCount: 0,
        };

        this.nodes.set(node.id, node);
        subAgentIds.push(node.id);

        // Connect sub-agent to its parent main agent
        this.connections.push({
          id: generateId('conn'),
          fromId: mainAgent.id,
          toId: node.id,
          type: 'hierarchy',
          color: '#8b5cf6',
          width: 1,
          opacity: 0.3,
          style: 'dashed',
          strength: 0.5 + Math.random() * 0.3,
          weight: 0.2,
          bidirectional: false,
          frequency: randomInt(5, 50),
          latency: randomBetween(5, 50),
          dataFlowRate: randomBetween(5, 50),
          semanticSimilarity: 0.3 + Math.random() * 0.2,
          relationshipConfidence: 0.4 + Math.random() * 0.2,
          temporalRecency: 0.5 + Math.random() * 0.3,
          animated: false,
          particleCount: 0,
          animationSpeed: 0.3,
          isActive: Math.random() > 0.2,
          isHighlighted: false,
        });
      }

      mainAgent.subAgentCount = subAgentIds.length;
      mainAgent.childrenIds.push(...subAgentIds);
    });
  }

  /**
   * Generate cross-connections between different types of nodes
   */
  private generateCrossConnections(): void {
    const mainAgents = Array.from(this.nodes.values()).filter(n => n.type === 'main_agent');
    const departments = Array.from(this.nodes.values()).filter(n => n.type === 'department');

    // Cross-department collaboration connections between main agents
    const collaborationCount = Math.min(500, Math.floor(mainAgents.length * 0.3));
    for (let i = 0; i < collaborationCount; i++) {
      const agent1 = mainAgents[randomInt(0, mainAgents.length - 1)];
      const agent2 = mainAgents[randomInt(0, mainAgents.length - 1)];

      if (agent1.id === agent2.id) continue;

      const differentDept = this.getParentDepartment(agent1.id) !== this.getParentDepartment(agent2.id);

      this.connections.push({
        id: generateId('conn'),
        fromId: agent1.id,
        toId: agent2.id,
        type: differentDept ? 'collaboration' : 'dependency',
        color: '#22d3ee',
        width: randomBetween(0.5, 1.5),
        opacity: differentDept ? 0.2 : 0.4,
        style: Math.random() > 0.5 ? 'dotted' : 'dashed',
        strength: randomBetween(0.2, 0.7),
        weight: randomBetween(0.1, 0.5),
        bidirectional: Math.random() > 0.3,
        frequency: randomInt(5, 100),
        latency: randomBetween(5, 100),
        dataFlowRate: randomBetween(5, 100),
        semanticSimilarity: randomBetween(0.2, 0.8),
        relationshipConfidence: randomBetween(0.3, 0.8),
        temporalRecency: randomBetween(0.3, 1.0),
        animated: Math.random() > 0.7,
        particleCount: randomInt(0, 2),
        animationSpeed: randomBetween(0.2, 0.8),
        isActive: Math.random() > 0.1,
        isHighlighted: false,
      });
    }

    // Data flow connections between departments
    const dataFlowCount = 100;
    for (let i = 0; i < dataFlowCount; i++) {
      const dept1 = departments[randomInt(0, departments.length - 1)];
      const dept2 = departments[randomInt(0, departments.length - 1)];

      if (dept1.id === dept2.id) continue;

      this.connections.push({
        id: generateId('conn'),
        fromId: dept1.id,
        toId: dept2.id,
        type: 'data_flow',
        color: '#06b6d4',
        width: randomBetween(0.5, 2),
        opacity: 0.3,
        style: 'animated',
        strength: randomBetween(0.3, 0.8),
        weight: randomBetween(0.2, 0.6),
        bidirectional: false,
        frequency: randomInt(50, 500),
        latency: randomBetween(2, 30),
        dataFlowRate: randomBetween(50, 500),
        semanticSimilarity: randomBetween(0.3, 0.7),
        relationshipConfidence: randomBetween(0.4, 0.8),
        temporalRecency: randomBetween(0.5, 1.0),
        animated: true,
        particleCount: randomInt(1, 3),
        animationSpeed: randomBetween(0.5, 1.5),
        isActive: true,
        isHighlighted: false,
      });
    }
  }

  /**
   * Get the parent department of a node by traversing up the hierarchy
   */
  private getParentDepartment(nodeId: string): string | undefined {
    const node = this.nodes.get(nodeId);
    if (!node || !node.parentId) return undefined;
    const parent = this.nodes.get(node.parentId);
    if (parent?.type === 'department') return parent.id;
    return this.getParentDepartment(node.parentId);
  }

  /**
   * Generate fake performance history
   */
  private generatePerformanceHistory(days: number): { timestamp: string; value: number }[] {
    const history: { timestamp: string; value: number }[] = [];
    let currentValue = randomInt(70, 95);

    for (let i = days; i >= 0; i--) {
      currentValue = Math.max(50, Math.min(100, currentValue + randomBetween(-5, 5)));
      history.push({
        timestamp: generateTimestamp(i),
        value: Math.round(currentValue * 10) / 10,
      });
    }

    return history;
  }

  /**
   * Calculate 3D distance between two points
   */
  private distance3D(a: Point3D, b: Point3D): number {
    return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2 + (a.z - b.z) ** 2);
  }
}

// ============================================
// CONVENIENCE GENERATOR
// ============================================

let _cachedData: { nodes: KnowledgeGraphNode[]; connections: GraphConnection[] } | null = null;

export const generateKnowledgeGraphData = (): { nodes: KnowledgeGraphNode[]; connections: GraphConnection[] } => {
  if (_cachedData) return _cachedData;
  
  const generator = new KnowledgeGraphDataGenerator();
  _cachedData = generator.generate();
  
  console.log(`[KnowledgeGraph] Generated ${_cachedData.nodes.length} nodes and ${_cachedData.connections.length} connections`);
  
  return _cachedData;
};

export const resetKnowledgeGraphData = (): void => {
  _cachedData = null;
};