import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Users } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'director-hr-2',
    name: 'Director of Human Resources - Europe',
    title: 'AI Director of Human Resources - Europe',
    description: 'The AI Director of Human Resources for Europe oversees HR operations, talent management, and organizational development across European markets, ensuring compliance with EU regulations.',
    capabilities: ["Task Automation","Data Processing","Workflow Management","Regional HR Strategy","Talent Management","EU Compliance","Workforce Planning","Performance Management","GDPR Management","Team Leadership"],
    icon: Users,
    color: '#E91E63',
    type: 'employee' as const,
    humanCost: '$175k/year',
    aiCost: '$3.5k/year',
    efficiency: '50x efficiency improvement',
    replacesRole: 'director-hr',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$13',
      tasksAutomatedDaily: 890,
      responseTime: '1.6s',
      accuracyRate: '96.8%',
    },
    hierarchy: {
      department: 'Hr',
      level: 'director',
      reportsTo: 'chro',
      manages: ['hr-managers-eu'],
    },
    specializedCapabilities: [
      'EU HR Strategy',
      'GDPR Compliance',
      'Multi-country Talent Management',
      'European Labor Laws',
      'Performance Management',
      'Employee Relations',
      'Workforce Analytics',
      'Cross-border Mobility'
    ],
    integrationOptions: [
      'EU HRIS Systems',
      'GDPR-compliant ATS',
      'Multi-country Payroll',
      'Learning Management',
      'Performance Tools',
      'Compliance Systems',
      'European Benefits',
      'Analytics Platforms'
    ],
    automationFeatures: [
      'EU Workflows',
      'GDPR Data Processing',
      'Multi-country Onboarding',
      'Compliance Monitoring',
      'European Training Programs',
      'Policy Implementation',
      'Reporting Automation',
      'Mobility Management'
    ],
    kpiMetrics: [
      'EU Retention Rate',
      'Time to Fill',
      'Employee Satisfaction',
      'GDPR Compliance Score',
      'Training Completion',
      'Diversity Metrics',
      'Cost per Hire',
      'Engagement Index'
    ],
    customOptions: {
      regionFocus: 'europe',
      complianceLevel: 'gdpr-strict',
      multiCountry: true,
      languageSupport: true,
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
      { id: 'predictive', enabled: true, name: 'Predictive Engine', description: 'Forecasts European workforce trends' },
      { id: 'compliance', enabled: true, name: 'Compliance Core', description: 'Ensures GDPR and EU compliance' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'dhr_1', name: 'EU Strategy', category: 'Strategy', description: 'Develop European HR strategy', level: 'expert' },
      { id: 'dhr_2', name: 'GDPR Compliance', category: 'Compliance', description: 'Manage GDPR compliance', level: 'expert' },
      { id: 'dhr_3', name: 'Multi-country HR', category: 'Operations', description: 'Handle multi-country HR', level: 'expert' },
      { id: 'dhr_4', name: 'European Labor Laws', category: 'Compliance', description: 'Understand EU labor laws', level: 'expert' },
      { id: 'dhr_5', name: 'Analytics', category: 'Analytics', description: 'Analyze European HR data', level: 'expert' }
    ],
    personality: [
      { trait: 'Cultural-sensitivity', value: 10, description: 'Highly sensitive to cultural differences' },
      { trait: 'Compliance-focused', value: 9, description: 'Strong focus on compliance' },
      { trait: 'Collaborative', value: 9, description: 'Works across countries' },
      { trait: 'Strategic', value: 9, description: 'Thinks strategically for Europe' },
      { trait: 'Multi-lingual', value: 8, description: 'Supports multiple languages' }
    ]

  };
  return <AgentPageWrapper agent={agent} />;
}
