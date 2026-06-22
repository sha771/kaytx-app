import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Heart } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'director-benefits-1',
    name: 'Director of Benefits - Health & Wellness',
    title: 'AI Director of Benefits - Health & Wellness',
    description: 'The AI Director of Benefits for Health & Wellness oversees health insurance, wellness programs, and medical benefits for the entire organization.',
    capabilities: ["Task Automation","Data Processing","Workflow Management","Health Benefits Design","Wellness Program Management","Insurance Vendor Management","Benefits Administration","Compliance Monitoring","Cost Containment","Team Leadership"],
    icon: Heart,
    color: '#E91E63',
    type: 'employee' as const,
    humanCost: '$160k/year',
    aiCost: '$3.5k/year',
    efficiency: '46x efficiency improvement',
    replacesRole: 'director-benefits',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$11',
      tasksAutomatedDaily: 865,
      responseTime: '1.7s',
      accuracyRate: '96.8%',
    },
    hierarchy: {
      department: 'Hr',
      level: 'director',
      reportsTo: 'vp-compensation',
      manages: ['benefits-admins-health'],
    },
    specializedCapabilities: [
      'Health Plan Design',
      'Wellness Programs',
      'Insurance Management',
      'Benefits Administration',
      'Compliance Monitoring',
      'Cost Analysis',
      'Vendor Management',
      'Wellness Analytics'
    ],
    integrationOptions: [
      'Benefits Platforms',
      'Insurance Systems',
      'Wellness Apps',
      'HRIS Integration',
      'Claims Systems',
      'Vendor Portals',
      'Analytics Suite',
      'Communication Tools'
    ],
    automationFeatures: [
      'Enrollment Processing',
      'Claims Monitoring',
      'Wellness Tracking',
      'Compliance Checking',
      'Cost Analysis',
      'Vendor Coordination',
      'Communication Automation',
      'Reporting Automation'
    ],
    kpiMetrics: [
      'Enrollment Rate',
      'Cost per Employee',
      'Wellness Participation',
      'Claims Cost',
      'Employee Satisfaction',
      'Compliance Score',
      'Vendor Performance',
      'Health Outcomes'
    ],
    customOptions: {
      focus: 'health-wellness',
      wellnessFocus: 'prevention',
      costStrategy: 'value-based',
      complianceLevel: 'strict',
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
      { id: 'predictive', enabled: true, name: 'Predictive Engine', description: 'Forecasts health costs' },
      { id: 'wellness', enabled: true, name: 'Wellness Core', description: 'Manages wellness programs' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'db_1', name: 'Health Benefits', category: 'Benefits', description: 'Manage health benefits', level: 'expert' },
      { id: 'db_2', name: 'Wellness Programs', category: 'Wellness', description: 'Run wellness programs', level: 'expert' },
      { id: 'db_3', name: 'Insurance Management', category: 'Operations', description: 'Manage insurance', level: 'expert' },
      { id: 'db_4', name: 'Benefits Administration', category: 'Operations', description: 'Administer benefits', level: 'expert' },
      { id: 'db_5', name: 'Cost Containment', category: 'Finance', description: 'Contain costs', level: 'expert' }
    ],
    personality: [
      { trait: 'Caring', value: 10, description: 'Cares about employee health' },
      { trait: 'Analytical', value: 9, description: 'Analytical in cost analysis' },
      { trait: 'Service-oriented', value: 9, description: 'Service-oriented approach' },
      { trait: 'Compliance-focused', value: 9, description: 'Focuses on compliance' },
      { trait: 'Collaborative', value: 8, description: 'Works with vendors' }
    ]

  };
  return <AgentPageWrapper agent={agent} />;
}
