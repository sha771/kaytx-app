import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Layers } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'director-shared-services-1',
    name: 'Director of Shared Services - Global Operations',
    title: 'AI Director of Shared Services - Global Operations',
    description: 'The AI Director of Shared Services for Global Operations manages global HR shared services centers, service delivery excellence, and operational standardization.',
    capabilities: ["Task Automation","Data Processing","Workflow Management","Global Shared Services","Service Delivery Excellence','Operational Standardization','Regional Coordination','Vendor Management','Cost Management','Team Leadership"],
    icon: Layers,
    color: '#009688',
    type: 'employee' as const,
    humanCost: '$170k/year',
    aiCost: '$4k/year',
    efficiency: '43x efficiency improvement',
    replacesRole: 'director-shared-services',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$12',
      tasksAutomatedDaily: 895,
      responseTime: '1.3s',
      accuracyRate: '97.5%',
    },
    hierarchy: {
      department: 'Hr',
      level: 'director',
      reportsTo: 'vp-hr-ops',
      manages: ['global-ss-team', 'regional-ss-leads'],
    },
    specializedCapabilities: [
      'Global Shared Services',
      'Service Delivery Excellence',
      'Operational Standardization',
      'Regional Coordination',
      'Vendor Management',
      'Cost Management',
      'Service Level Management',
      'Quality Assurance'
    ],
    integrationOptions: [
      'Shared Services Platforms',
      'Global HRIS',
      'Service Desk Systems',
      'Vendor Portals',
      'Analytics Suite',
      'Quality Systems',
      'Communication Tools',
      'Cost Management'
    ],
    automationFeatures: [
      'Service Routing',
      'Standardization Enforcement',
      'Regional Coordination',
      'Vendor Management',
      'Cost Tracking',
      'SLA Monitoring',
      'Quality Assurance',
      'Report Generation'
    ],
    kpiMetrics: [
      'Service Coverage',
      'Standardization Rate',
      'Cost Efficiency',
      'SLA Compliance',
      'Regional Satisfaction',
      'Quality Score',
      'Vendor Performance',
      'ROI of Shared Services'
    ],
    customOptions: {
      serviceModel: 'global',
      standardizationLevel: 'high',
      costStrategy: 'efficiency',
      qualityStandard: 'six-sigma',
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
      { id: 'dss_1', name: 'Global Shared Services', category: 'Operations', description: 'Manage global SS', level: 'expert' },
      { id: 'dss_2', name: 'Service Excellence', category: 'Service', description: 'Ensure service excellence', level: 'expert' },
      { id: 'dss_3', name: 'Standardization', category: 'Operations', description: 'Standardize operations', level: 'expert' },
      { id: 'dss_4', name: 'Regional Coordination', category: 'Operations', description: 'Coordinate regions', level: 'expert' },
      { id: 'dss_5', name: 'Cost Management', category: 'Finance', description: 'Manage costs', level: 'expert' }
    ],
    personality: [
      { trait: 'Service-oriented', value: 10, description: 'Service-focused' },
      { trait: 'Global-mindset', value: 9, description: 'Global perspective' },
      { trait: 'Efficient', value: 9, description: 'Efficient operations' },
      { trait: 'Standardization-focused', value: 9, description: 'Focuses on standardization' },
      { trait: 'Collaborative', value: 8, description: 'Collaborates globally' }
    ]

  };
  return <AgentPageWrapper agent={agent} />;
}
