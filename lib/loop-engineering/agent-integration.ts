/**
 * Loop Engineering - Agent Hierarchy Integration
 * 
 * Integration layer that connects loop engineering with the existing
 * AI agent hierarchy system, enabling loops to leverage the full
 * agent workforce across all departments.
 */

import {
  LoopConfig,
  LoopNode,
  LoopTemplate,
  LoopCondition,
  LoopAction
} from './types';
import {
  marketingGrowthMainAgents,
  marketingGrowthSubAgents,
  salesRevenueMainAgents,
  salesRevenueSubAgents,
  customerExperienceMainAgents,
  customerExperienceSubAgents,
  operationsManagementMainAgents,
  operationsManagementSubAgents,
  financeAccountingMainAgents,
  financeAccountingSubAgents,
  technologyEngineeringMainAgents,
  technologyEngineeringSubAgents,
  humanResourcesMainAgents,
  humanResourcesSubAgents,
  legalComplianceMainAgents,
  legalComplianceSubAgents,
  dataIntelligenceMainAgents,
  dataIntelligenceSubAgents,
  productManagementMainAgents,
  productManagementSubAgents,
  securityRiskMainAgents,
  securityRiskSubAgents,
  researchDevelopmentMainAgents,
  researchDevelopmentSubAgents,
  administrativeMainAgents,
  administrativeSubAgents,
  tradingInvestmentsMainAgents,
  tradingInvestmentsSubAgents,
  realEstatePropertyMainAgents,
  realEstatePropertySubAgents,
  insuranceRiskMainAgents,
  insuranceRiskSubAgents,
  healthcareMedicalMainAgents,
  healthcareMedicalSubAgents,
  manufacturingProductionMainAgents,
  manufacturingProductionSubAgents,
  transportationLogisticsMainAgents,
  transportationLogisticsSubAgents,
  governmentPublicSectorMainAgents,
  governmentPublicSectorSubAgents,
  supplyChainLogisticsMainAgents,
  supplyChainLogisticsSubAgents,
  aiManagementGovernanceMainAgents,
  aiManagementGovernanceSubAgents,
  professionalServicesMainAgents,
  professionalServicesSubAgents,
  mediaEntertainmentMainAgents,
  mediaEntertainmentSubAgents
} from '@/constants/aiAgentHierarchy';

/**
 * Agent hierarchy mapping for loop integration
 */
const AGENT_HIERARCHY = {
  'customer-experience': {
    main: customerExperienceMainAgents,
    sub: customerExperienceSubAgents
  },
  'sales-revenue': {
    main: salesRevenueMainAgents,
    sub: salesRevenueSubAgents
  },
  'marketing-growth': {
    main: marketingGrowthMainAgents,
    sub: marketingGrowthSubAgents
  },
  'operations-management': {
    main: operationsManagementMainAgents,
    sub: operationsManagementSubAgents
  },
  'finance-accounting': {
    main: financeAccountingMainAgents,
    sub: financeAccountingSubAgents
  },
  'technology-engineering': {
    main: technologyEngineeringMainAgents,
    sub: technologyEngineeringSubAgents
  },
  'human-resources': {
    main: humanResourcesMainAgents,
    sub: humanResourcesSubAgents
  },
  'legal-compliance': {
    main: legalComplianceMainAgents,
    sub: legalComplianceSubAgents
  },
  'data-intelligence': {
    main: dataIntelligenceMainAgents,
    sub: dataIntelligenceSubAgents
  },
  'product-management': {
    main: productManagementMainAgents,
    sub: productManagementSubAgents
  },
  'security-risk': {
    main: securityRiskMainAgents,
    sub: securityRiskSubAgents
  },
  'research-development': {
    main: researchDevelopmentMainAgents,
    sub: researchDevelopmentSubAgents
  },
  'administrative': {
    main: administrativeMainAgents,
    sub: administrativeSubAgents
  },
  'trading-investments': {
    main: tradingInvestmentsMainAgents,
    sub: tradingInvestmentsSubAgents
  },
  'real-estate-property': {
    main: realEstatePropertyMainAgents,
    sub: realEstatePropertySubAgents
  },
  'insurance-risk': {
    main: insuranceRiskMainAgents,
    sub: insuranceRiskSubAgents
  },
  'healthcare-medical': {
    main: healthcareMedicalMainAgents,
    sub: healthcareMedicalSubAgents
  },
  'manufacturing-production': {
    main: manufacturingProductionMainAgents,
    sub: manufacturingProductionSubAgents
  },
  'transportation-logistics': {
    main: transportationLogisticsMainAgents,
    sub: transportationLogisticsSubAgents
  },
  'government-public-sector': {
    main: governmentPublicSectorMainAgents,
    sub: governmentPublicSectorSubAgents
  },
  'supply-chain-logistics': {
    main: supplyChainLogisticsMainAgents,
    sub: supplyChainLogisticsSubAgents
  },
  'ai-management-governance': {
    main: aiManagementGovernanceMainAgents,
    sub: aiManagementGovernanceSubAgents
  },
  'professional-services': {
    main: professionalServicesMainAgents,
    sub: professionalServicesSubAgents
  },
  'media-entertainment': {
    main: mediaEntertainmentMainAgents,
    sub: mediaEntertainmentSubAgents
  }
};

/**
 * Get available agents for a department
 */
export function getDepartmentAgents(departmentId: string) {
  const hierarchy = AGENT_HIERARCHY[departmentId as keyof typeof AGENT_HIERARCHY];
  if (!hierarchy) {
    return { main: [], sub: [] };
  }

  return {
    main: hierarchy.main.map(agent => ({
      id: agent.id,
      name: agent.name,
      title: agent.title,
      type: 'main' as const,
      capabilities: agent.capabilities,
      department: agent.hierarchy?.department || departmentId
    })),
    sub: hierarchy.sub.map(agent => ({
      id: agent.id,
      name: agent.name,
      title: agent.title,
      type: 'sub' as const,
      capabilities: agent.capabilities,
      department: agent.hierarchy?.department || departmentId
    }))
  };
}

/**
 * Get all available agents across all departments
 */
export function getAllAvailableAgents() {
  const allAgents: Array<{
    id: string;
    name: string;
    title: string;
    type: 'main' | 'sub';
    capabilities: string[];
    department: string;
  }> = [];

  Object.entries(AGENT_HIERARCHY).forEach(([departmentId, hierarchy]) => {
    hierarchy.main.forEach(agent => {
      allAgents.push({
        id: agent.id,
        name: agent.name,
        title: agent.title,
        type: 'main',
        capabilities: agent.capabilities,
        department: agent.hierarchy?.department || departmentId
      });
    });

    hierarchy.sub.forEach(agent => {
      allAgents.push({
        id: agent.id,
        name: agent.name,
        title: agent.title,
        type: 'sub',
        capabilities: agent.capabilities,
        department: agent.hierarchy?.department || departmentId
      });
    });
  });

  return allAgents;
}

/**
 * Find agents by capability
 */
export function findAgentsByCapability(capability: string) {
  const allAgents = getAllAvailableAgents();
  return allAgents.filter(agent => 
    agent.capabilities.some(cap => 
      cap.toLowerCase().includes(capability.toLowerCase())
    )
  );
}

/**
 * Create a loop node from an agent
 */
export function createAgentNode(agent: any, position?: { x: number; y: number }): LoopNode {
  return {
    id: `node_${agent.id}_${Date.now()}`,
    type: 'agent',
    name: agent.name,
    description: agent.title || agent.description,
    agentId: agent.id,
    agentType: agent.type === 'main' ? 'main' : 'sub',
    nextNodes: [],
    position
  };
}

/**
 * Create a condition node
 */
export function createConditionNode(
  name: string,
  conditions: LoopCondition[],
  position?: { x: number; y: number }
): LoopNode {
  return {
    id: `condition_${Date.now()}`,
    type: 'condition',
    name,
    description: 'Conditional logic checkpoint',
    conditions,
    nextNodes: [],
    position
  };
}

/**
 * Create an action node
 */
export function createActionNode(
  name: string,
  actions: LoopAction[],
  position?: { x: number; y: number }
): LoopNode {
  return {
    id: `action_${Date.now()}`,
    type: 'action',
    name,
    description: 'Execute predefined actions',
    actions,
    nextNodes: [],
    position
  };
}

/**
 * Create a basic loop configuration from agents
 */
export function createBasicLoopConfig(
  name: string,
  description: string,
  agents: any[],
  goal: string
): Partial<LoopConfig> {
  const nodes: LoopNode[] = [];
  let previousNodeId: string | null = null;

  // Create start node
  const startNode: LoopNode = {
    id: 'start',
    type: 'start',
    name: 'Start',
    description: 'Loop execution start point',
    nextNodes: [],
    position: { x: 50, y: 50 }
  };
  nodes.push(startNode);
  previousNodeId = startNode.id;

  // Create agent nodes
  agents.forEach((agent, index) => {
    const agentNode = createAgentNode(agent, {
      x: 50 + (index + 1) * 150,
      y: 50
    });
    
    if (previousNodeId) {
      nodes.find(n => n.id === previousNodeId)!.nextNodes = [agentNode.id];
    }
    
    nodes.push(agentNode);
    previousNodeId = agentNode.id;
  });

  // Create end node
  const endNode: LoopNode = {
    id: 'end',
    type: 'end',
    name: 'End',
    description: 'Loop execution end point',
    nextNodes: [],
    position: { x: 50 + (agents.length + 1) * 150, y: 50 }
  };
  
  if (previousNodeId) {
    nodes.find(n => n.id === previousNodeId)!.nextNodes = [endNode.id];
  }
  nodes.push(endNode);

  return {
    name,
    description,
    version: '1.0.0',
    status: 'idle',
    goal: {
      primary: goal,
      successCriteria: [],
      maxIterations: 10
    },
    nodes,
    startNodeId: startNode.id,
    endNodeId: endNode.id,
    settings: {
      triggerType: 'manual',
      retryPolicy: {
        maxRetries: 3,
        backoffStrategy: 'exponential',
        initialDelay: 1000
      },
      concurrency: 1,
      priority: 'medium'
    },
    integration: {
      relatedAgents: agents.map(a => a.id)
    },
    metadata: {
      createdBy: 'system',
      createdAt: new Date(),
      tags: ['auto-generated'],
      category: 'custom'
    }
  };
}

/**
 * Generate loop templates based on department capabilities
 */
export function generateDepartmentLoopTemplates(departmentId: string): LoopTemplate[] {
  const agents = getDepartmentAgents(departmentId);
  const templates: LoopTemplate[] = [];

  // Generate sequential workflow template
  if (agents.main.length > 0) {
    templates.push({
      id: `template_${departmentId}_sequential`,
      name: `${departmentId} Sequential Workflow`,
      description: 'Execute agents in sequence for comprehensive processing',
      category: 'automation',
      config: createBasicLoopConfig(
        'Sequential Workflow',
        'Execute agents in sequential order',
        agents.main.slice(0, 3),
        'Complete all sequential processing steps'
      ),
      defaultSettings: {
        triggerType: 'manual',
        retryPolicy: {
          maxRetries: 3,
          backoffStrategy: 'exponential',
          initialDelay: 1000
        },
        concurrency: 1,
        priority: 'medium'
      },
      requiredAgents: agents.main.slice(0, 3).map(a => a.id),
      exampleUseCases: [
        'Sequential data processing',
        'Multi-stage analysis',
        'Progressive refinement'
      ]
    });
  }

  // Generate parallel coordination template
  if (agents.sub.length > 1) {
    templates.push({
      id: `template_${departmentId}_parallel`,
      name: `${departmentId} Parallel Coordination`,
      description: 'Coordinate multiple sub-agents working in parallel',
      category: 'coordination',
      config: createBasicLoopConfig(
        'Parallel Coordination',
        'Coordinate parallel agent execution',
        agents.sub.slice(0, 4),
        'Complete parallel processing efficiently'
      ),
      defaultSettings: {
        triggerType: 'manual',
        retryPolicy: {
          maxRetries: 2,
          backoffStrategy: 'linear',
          initialDelay: 500
        },
        concurrency: 4,
        priority: 'high'
      },
      requiredAgents: agents.sub.slice(0, 4).map(a => a.id),
      exampleUseCases: [
        'Parallel data analysis',
        'Concurrent task processing',
        'Multi-perspective evaluation'
      ]
    });
  }

  // Generate optimization loop template
  templates.push({
    id: `template_${departmentId}_optimization`,
    name: `${departmentId} Optimization Loop`,
    description: 'Iterative optimization with feedback and refinement',
    category: 'optimization',
    config: {
      ...createBasicLoopConfig(
        'Optimization Loop',
        'Iterative optimization process',
        agents.main.slice(0, 2),
        'Achieve optimal results through iteration'
      ),
      goal: {
        primary: 'Optimize performance metrics',
        successCriteria: [
          {
            id: 'opt_convergence',
            name: 'Convergence Criteria',
            description: 'Check if results have converged',
            operator: 'less_than',
            targetPath: 'improvement_rate',
            targetValue: 0.01,
            threshold: 0.01
          }
        ],
        maxIterations: 20
      }
    },
    defaultSettings: {
      triggerType: 'manual',
      retryPolicy: {
        maxRetries: 5,
        backoffStrategy: 'exponential',
        initialDelay: 2000
      },
      concurrency: 1,
      priority: 'high'
    },
    requiredAgents: agents.main.slice(0, 2).map(a => a.id),
    exampleUseCases: [
      'Performance optimization',
      'Quality improvement',
      'Cost reduction'
    ]
  });

  return templates;
}

/**
 * Get suggested loops for a specific agent
 */
export function getSuggestedLoopsForAgent(agentId: string) {
  const allAgents = getAllAvailableAgents();
  const agent = allAgents.find(a => a.id === agentId);
  
  if (!agent) return [];

  const suggestions: LoopTemplate[] = [];
  const departmentAgents = getDepartmentAgents(agent.department);

  // Suggest coordination with peers
  const peers = departmentAgents.main.filter(a => a.id !== agentId);
  if (peers.length > 0) {
    suggestions.push({
      id: `suggestion_${agentId}_coordination`,
      name: `Coordinate with ${agent.department} peers`,
      description: 'Work together with other agents in your department',
      category: 'coordination',
      config: createBasicLoopConfig(
        'Department Coordination',
        'Coordinate with department peers',
        [agent, ...peers.slice(0, 2)],
        'Achieve departmental objectives through coordination'
      ),
      defaultSettings: {
        triggerType: 'manual',
        retryPolicy: {
          maxRetries: 3,
          backoffStrategy: 'exponential',
          initialDelay: 1000
        },
        concurrency: 1,
        priority: 'medium'
      },
      requiredAgents: [agentId, ...peers.slice(0, 2).map(a => a.id)],
      exampleUseCases: [
        'Cross-functional collaboration',
        'Department-wide initiatives',
        'Shared goal achievement'
      ]
    });
  }

  // Suggest sub-agent coordination
  const subAgents = departmentAgents.sub.filter(a => 
    a.capabilities.some(cap => agent.capabilities.includes(cap))
  );
  
  if (subAgents.length > 0) {
    suggestions.push({
      id: `suggestion_${agentId}_sub_coordination`,
      name: `Coordinate with specialized sub-agents`,
      description: 'Work with specialized sub-agents for detailed tasks',
      category: 'coordination',
      config: createBasicLoopConfig(
        'Sub-Agent Coordination',
        'Coordinate with specialized sub-agents',
        [agent, ...subAgents.slice(0, 3)],
        'Leverage specialized capabilities'
      ),
      defaultSettings: {
        triggerType: 'manual',
        retryPolicy: {
          maxRetries: 2,
          backoffStrategy: 'linear',
          initialDelay: 500
        },
        concurrency: 3,
        priority: 'medium'
      },
      requiredAgents: [agentId, ...subAgents.slice(0, 3).map(a => a.id)],
      exampleUseCases: [
        'Specialized task execution',
        'Detailed analysis',
        'Expert coordination'
      ]
    });
  }

  return suggestions;
}

/**
 * Validate loop configuration against available agents
 */
export function validateLoopConfig(config: Partial<LoopConfig>): {
  valid: boolean;
  errors: string[];
  warnings: string[];
} {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Check if all referenced agents exist
  const allAgents = getAllAvailableAgents();
  const agentIds = new Set(allAgents.map(a => a.id));

  if (config.integration?.relatedAgents) {
    config.integration.relatedAgents.forEach(agentId => {
      if (!agentIds.has(agentId)) {
        errors.push(`Agent ${agentId} not found in available agents`);
      }
    });
  }

  // Check node configurations
  if (config.nodes) {
    config.nodes.forEach(node => {
      if (node.type === 'agent' && node.agentId && !agentIds.has(node.agentId)) {
        errors.push(`Node ${node.id} references unknown agent ${node.agentId}`);
      }
      
      if (node.nextNodes) {
        node.nextNodes.forEach(nextNodeId => {
          if (!config.nodes?.find(n => n.id === nextNodeId)) {
            errors.push(`Node ${node.id} references unknown next node ${nextNodeId}`);
          }
        });
      }
    });
  }

  // Check start and end nodes
  if (config.startNodeId && !config.nodes?.find(n => n.id === config.startNodeId)) {
    errors.push(`Start node ${config.startNodeId} not found`);
  }

  if (config.endNodeId && !config.nodes?.find(n => n.id === config.endNodeId)) {
    errors.push(`End node ${config.endNodeId} not found`);
  }

  // Warnings for best practices
  if (config.goal?.maxIterations && config.goal.maxIterations > 100) {
    warnings.push('High iteration count may lead to long execution times');
  }

  if (config.settings?.concurrency && config.settings.concurrency > 10) {
    warnings.push('High concurrency may impact performance');
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings
  };
}