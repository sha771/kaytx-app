import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { ShoppingCart } from 'lucide-react-native';

export default function HRProcurementSpecialistPage() {
  const agent = {
    id: 'hr-procurement-specialist',
    name: 'AI HR Procurement Specialist',
    title: 'AI HR Procurement Specialist',
    description: 'The AI HR Procurement Specialist manages HR procurement processes, sources HR services and products, and ensures cost-effective acquisition of HR resources.',
    capabilities: ["Procurement Management","Strategic Sourcing","Supplier Evaluation','Cost Analysis','Procurement Analytics','Contract Negotiation','Quality Assurance','Spend Management"],
    icon: ShoppingCart,
    color: '#673AB7',
    type: 'agent' as const,
    humanCost: '$75k/year',
    aiCost: '$4k/year',
    efficiency: '17x efficiency improvement',
    replacesRole: 'hr-procurement-specialist',
    infrastructure: {
      status: 'online' as const,
      health: 95,
      uptime: '99.5%',
      lastActive: 'Now',
      processingPower: 'standard' as const,
    },
    roiMetrics: {
      savingsPerMonth: '$5,917',
      tasksAutomatedDaily: 285,
      responseTime: '0.8s',
      accuracyRate: '98.4%',
    },
    hierarchy: {
      department: 'Human Resources',
      level: 'team_lead',
      reportsTo: 'vp-hr-operations',
      manages: [],
    },
    specializedCapabilities: ['Procurement Management','Strategic Sourcing','Supplier Evaluation','Cost Analysis','Contract Negotiation'],
    integrationOptions: ['Procurement Systems','Supplier Platforms','Analytics Tools','Contract Systems'],
    automationFeatures: ['Procurement Automation','Sourcing Optimization','Supplier Evaluation','Cost Analysis'],
    kpiMetrics: ['Procurement Efficiency','Cost Savings','Supplier Quality','Contract Compliance','Spend Optimization'],
    customOptions: { procurementFocus: 'strategic', sourcingPriority: 'high', costOptimization: 'maximum' },
    advancedFeatures: {
      a2aCommunication: true, d2dCommunication: true, selfImprovement: true, selfLearning: true,
      predictiveInsights: true, anomalyDetection: true, sentimentAnalysis: true, unlimitedMemory: true,
      taskHistory: true, crossAgentCollaboration: true, departmentIntegration: true,
    },
    intelligenceFeatures: [
      { id: 'procure', enabled: true, name: 'Procurement Manager', description: 'Manages procurement' },
      { id: 'source', enabled: true, name: 'Strategic Sourcing', description: 'Sources strategically' },
      { id: 'evaluate', enabled: true, name: 'Supplier Evaluator', description: 'Evaluates suppliers' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'hrps_1', name: 'Procurement Management', category: 'Procurement', description: 'Manage procurement', level: 'expert' },
      { id: 'hrps_2', name: 'Strategic Sourcing', category: 'Sourcing', description: 'Source strategically', level: 'expert' },
      { id: 'hrps_3', name: 'Supplier Evaluation', category: 'Evaluation', description: 'Evaluate suppliers', level: 'expert' }
    ],
    personality: [
      { trait: 'Procurement Focus', value: 10, description: 'Procurement oriented' },
      { trait: 'Cost Conscious', value: 9, description: 'Cost conscious' },
      { trait: 'Negotiation', value: 9, description: 'Negotiation skilled' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
