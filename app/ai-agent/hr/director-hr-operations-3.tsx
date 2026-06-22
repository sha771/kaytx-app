import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Settings } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'director-hr-operations-3',
    name: 'Director of HR Operations - Shared Services',
    title: 'AI Director of HR Operations - Shared Services',
    description: 'The AI Director of HR Operations for Shared Services manages HR shared services centers, centralized operations, and service excellence across regions.',
    capabilities: ["Task Automation","Data Processing","Workflow Management","Shared Services Management","Centralized Operations","Service Excellence","Regional Coordination","Vendor Management","Cost Optimization","Team Leadership"],
    icon: Settings,
    color: '#607D8B',
    type: 'employee' as const,
    humanCost: '$165k/year',
    aiCost: '$3.5k/year',
    efficiency: '47x efficiency improvement',
    replacesRole: 'director-hr-ops',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$12',
      tasksAutomatedDaily: 885,
      responseTime: '1.5s',
      accuracyRate: '97.1%',
    },
    hierarchy: {
      department: 'Hr',
      level: 'director',
      reportsTo: 'vp-hr-ops',
      manages: ['shared-services-team', 'regional-ops-leads'],
    },
    specializedCapabilities: [
      'Shared Services',
      'Centralized Operations',
      'Service Excellence',
      'Regional Coordination',
      'Vendor Management',
      'Cost Optimization',
      'Service Level Management',
      'Performance Analytics'
    ],
    integrationOptions: [
      'Shared Services Platforms',
      'Regional Systems',
      'Vendor Portals',
      'HRIS Integration',
      'Analytics Suite',
      'Communication Tools',
      'Quality Systems',
      'Cost Management'
    ],
    automationFeatures: [
      'Service Routing',
      'Regional Coordination',
      'Vendor Management',
      'Cost Tracking',
      'SLA Monitoring',
      'Quality Assurance',
      'Report Generation',
      'Performance Analytics'
    ],
    kpiMetrics: [
      'Service Coverage',
      'Cost Efficiency',
      'SLA Compliance',
      'Vendor Performance',
      'Regional Satisfaction',
      'Service Quality',
      'Centralization Rate',
      'ROI of Shared Services'
    ],
    customOptions: {
      serviceModel: 'centralized',
      coverageScope: 'global',
      costStrategy: 'optimization',
      serviceLevel: 'premium',
      dataDriven: true
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
      { id: 'predictive', enabled: true, name: 'Predictive Engine', description: 'Forecasts service demand' },
      { id: 'shared', enabled: true, name: 'Shared Core', description: 'Optimizes shared services' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'dho_1', name: 'Shared Services', category: 'Operations', description: 'Manage shared services', level: 'expert' },
      { id: 'dho_2', name: 'Centralized Operations', category: 'Operations', description: 'Run centralized ops', level: 'expert' },
      { id: 'dho_3', name: 'Service Excellence', category: 'Service', description: 'Ensure service excellence', level: 'expert' },
      { id: 'dho_4', name: 'Regional Coordination', category: 'Operations', description: 'Coordinate regions', level: 'expert' },
      { id: 'dho_5', name: 'Cost Optimization', category: 'Finance', description: 'Optimize costs', level: 'expert' }
    ],
    personality: [
      { trait: 'Service-oriented', value: 10, description: 'Service-focused' },
      { trait: 'Efficient', value: 9, description: 'Efficient operations' },
      { trait: 'Collaborative', value: 9, description: 'Collaborates regionally' },
      { trait: 'Cost-conscious', value: 9, description: 'Cost-aware' },
      { trait: 'Strategic', value: 8, description: 'Strategic thinker' }
    ]

  };
  return <AgentPageWrapper agent={agent} />;
}
