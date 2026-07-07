import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Settings } from 'lucide-react-native';

export default function ResearchOperationsDirectorPage() {
  const agent = {
    id: 'research-operations-director',
    name: 'AI Research Operations Director',
    title: 'AI Research Operations Director',
    description: 'The AI Research Operations Director manages research operations, oversees research facilities, coordinates research processes, and ensures efficient research infrastructure across all research activities.',
    capabilities: ["Research Operations","Research Facilities","Process Management","Operational Excellence","Research Infrastructure","Laboratory Management","Research Logistics","Process Optimization","Operations Strategy","Research Efficiency"],
    icon: Settings,
    color: '#795548',
    type: 'employee' as const,
    humanCost: '$145k/year',
    aiCost: '$5k/year',
    efficiency: '29x efficiency improvement',
    replacesRole: 'research-operations-director',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$12,000',
      tasksAutomatedDaily: 470,
      responseTime: '1.2s',
      accuracyRate: '97.0%',
    },
    hierarchy: {
      department: 'Research & Development',
      level: 'director',
      reportsTo: 'vp-research',
      manages: ['facilities-manager', 'process-coordinator', 'logistics-manager'],
    },
    specializedCapabilities: [
      'Research Operations',
      'Research Facilities',
      'Process Management',
      'Operational Excellence',
      'Research Infrastructure',
      'Laboratory Management',
      'Research Logistics',
      'Process Optimization'
    ],
    integrationOptions: [
      'Operations Management',
      'Facility Systems',
      'Process Tools',
      'Infrastructure Platforms',
      'Laboratory Systems',
      'Logistics Tools',
      'Quality Systems',
      'Automation Platforms'
    ],
    automationFeatures: [
      'Research Operations',
      'Research Facilities',
      'Process Management',
      'Operational Excellence',
      'Research Infrastructure',
      'Laboratory Management',
      'Research Logistics',
      'Process Optimization'
    ],
    kpiMetrics: [
      'Operational Efficiency',
      'Facility Performance',
      'Process Optimization',
      'Infrastructure Reliability',
      'Laboratory Success',
      'Logistics Efficiency',
      'Quality Standards',
      'Cost Efficiency'
    ],
    customOptions: {
      operationsStrategy: 'efficient',
      facilityStandard: 'excellence',
      processOptimization: 'continuous',
      infrastructureFocus: 'reliable',
      qualityStandard: 'high'
    },
    advancedFeatures: {
      a2aCommunication: true,
      d2dCommunication: true,
      selfImprovement: true,
      selfLearning: true,
      predictiveInsights: true,
      anomalyDetection: true,
      sentimentAnalysis: true,
      unlimitedMemory: true,
      taskHistory: true,
      crossAgentCollaboration: true,
      departmentIntegration: true,
    },
    intelligenceFeatures: [
      { id: 'operations', enabled: true, name: 'Operations Optimizer', description: 'Optimizes research operations' },
      { id: 'facilities', enabled: true, name: 'Facility Manager', description: 'Manages research facilities' },
      { id: 'process', enabled: true, name: 'Process Optimizer', description: 'Optimizes research processes' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'rops_1', name: 'Research Operations', category: 'Operations', description: 'Manage research operations', level: 'expert' },
      { id: 'rops_2', name: 'Research Facilities', category: 'Facilities', description: 'Manage research facilities', level: 'expert' },
      { id: 'rops_3', name: 'Process Management', category: 'Process', description: 'Manage research processes', level: 'expert' },
      { id: 'rops_4', name: 'Operational Excellence', category: 'Excellence', description: 'Ensure operational excellence', level: 'expert' },
      { id: 'rops_5', name: 'Process Optimization', category: 'Optimization', description: 'Optimize research processes', level: 'expert' }
    ],
    personality: [
      { trait: 'Operational Excellence', value: 10, description: 'Operations expert' },
      { trait: 'Efficiency Focus', value: 10, description: 'Efficiency-driven' },
      { trait: 'Problem Solving', value: 10, description: 'Exceptional problem solver' },
      { trait: 'Organization', value: 10, description: 'Highly organized' },
      { trait: 'Process Improvement', value: 9, description: 'Continuous improvement focused' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}