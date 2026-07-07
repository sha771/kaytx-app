import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Users } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'director-hr-3',
    name: 'Director of Human Resources - Asia Pacific',
    title: 'AI Director of Human Resources - Asia Pacific',
    description: 'The AI Director of Human Resources for Asia Pacific oversees HR operations across APAC markets, managing diverse talent pools and ensuring cultural alignment throughout the region.',
    capabilities: ["Task Automation","Data Processing","Workflow Management","APAC HR Strategy","Talent Management","Cultural Alignment","Workforce Planning","Performance Management","Regional Compliance","Team Leadership"],
    icon: Users,
    color: '#E91E63',
    type: 'employee' as const,
    humanCost: '$170k/year',
    aiCost: '$3.5k/year',
    efficiency: '49x efficiency improvement',
    replacesRole: 'director-hr',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$12',
      tasksAutomatedDaily: 870,
      responseTime: '1.7s',
      accuracyRate: '96.5%',
    },
    hierarchy: {
      department: 'Hr',
      level: 'director',
      reportsTo: 'chro',
      manages: ['hr-managers-apac'],
    },
    specializedCapabilities: [
      'APAC Strategy',
      'Cross-cultural Management',
      'Asian Talent Markets',
      'Regional Compliance',
      'Performance Management',
      'Employee Relations',
      'Workforce Analytics',
      'Growth Market Focus'
    ],
    integrationOptions: [
      'APAC HRIS Systems',
      'Regional ATS',
      'Multi-currency Payroll',
      'Learning Management',
      'Performance Tools',
      'Compliance Systems',
      'Regional Benefits',
      'Analytics Platforms'
    ],
    automationFeatures: [
      'APAC Workflows',
      'Cultural Adaptation',
      'Multi-language Support',
      'Compliance Monitoring',
      'Regional Training Programs',
      'Policy Implementation',
      'Reporting Automation',
      'Talent Pipeline Management'
    ],
    kpiMetrics: [
      'APAC Retention Rate',
      'Time to Fill',
      'Employee Satisfaction',
      'Cultural Fit Score',
      'Training Completion',
      'Diversity Metrics',
      'Cost per Hire',
      'Engagement Index'
    ],
    customOptions: {
      regionFocus: 'apac',
      culturalAdaptation: 'high',
      multiLanguage: true,
      growthFocus: true,
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
      { id: 'predictive', enabled: true, name: 'Predictive Engine', description: 'Forecasts APAC workforce trends' },
      { id: 'cultural', enabled: true, name: 'Cultural Core', description: 'Adapts to regional cultures' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'dhr_1', name: 'APAC Strategy', category: 'Strategy', description: 'Develop APAC HR strategy', level: 'expert' },
      { id: 'dhr_2', name: 'Cross-cultural Management', category: 'Operations', description: 'Manage across cultures', level: 'expert' },
      { id: 'dhr_3', name: 'Asian Markets', category: 'Operations', description: 'Understand Asian talent markets', level: 'expert' },
      { id: 'dhr_4', name: 'Regional Compliance', category: 'Compliance', description: 'Handle APAC compliance', level: 'expert' },
      { id: 'dhr_5', name: 'Growth Focus', category: 'Strategy', description: 'Focus on growth markets', level: 'expert' }
    ],
    personality: [
      { trait: 'Cultural-adaptability', value: 10, description: 'Highly adaptable to cultures' },
      { trait: 'Growth-mindset', value: 9, description: 'Focuses on growth opportunities' },
      { trait: 'Collaborative', value: 9, description: 'Works across APAC region' },
      { trait: 'Strategic', value: 9, description: 'Thinks strategically for APAC' },
      { trait: 'Multi-lingual', value: 8, description: 'Supports APAC languages' }
    ]

  };
  return <AgentPageWrapper agent={agent} />;
}
