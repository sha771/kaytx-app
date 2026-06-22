import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { TrendingUp } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'capital-planning-specialist',
    name: 'capital-planning-specialist',
    title: 'AI Capital Planning Specialist',
    description: 'The AI Capital Planning Specialist specializes in strategic capital allocation, investment planning, and long-term financial resource optimization. This agent ensures optimal capital structure and maximizes returns on invested capital.',
    capabilities: ["Capital Budgeting","Investment Analysis","Capital Structure Optimization","Project Valuation","ROI Analysis","Capital Allocation","Financial Planning","Risk Assessment","Strategic Planning","Performance Monitoring"],
    icon: TrendingUp,
    color: '#1B5E20',
    type: 'agent' as const,
    humanCost: '$95k/year',
    aiCost: '$1.2k/year',
    efficiency: '79x efficiency improvement',
    replacesRole: 'capital-planning-specialist',
    infrastructure: {
      status: 'online',
      health: 96,
      uptime: '99.5%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$7815',
      tasksAutomatedDaily: 287,
      responseTime: '0.8s',
      accuracyRate: '97.3%',
    },
    hierarchy: {
      department: 'Finance',
      level: 'specialist',
      reportsTo: 'vp-financial-planning',
      manages: [],
    },
    specializedCapabilities: [
      'Capital Budgeting',
      'Investment Appraisal',
      'Capital Structure Analysis',
      'Project Finance',
      'ROI Optimization',
      'Cost of Capital Calculation',
      'Financial Modeling',
      'Strategic Planning'
    ],
    integrationOptions: [
      'ERP Systems',
      'Financial Planning Tools',
      'Investment Platforms',
      'Project Management',
      'Budgeting Software',
      'Analytics Platforms',
      'Data Warehouses',
      'Reporting Tools'
    ],
    automationFeatures: [
      'Capital Budget Automation',
      'Investment Analysis',
      'ROI Calculation',
      'Risk Assessment',
      'Performance Tracking',
      'Report Generation',
      'Scenario Modeling',
      'Alert Notifications'
    ],
    kpiMetrics: [
      'Capital Efficiency',
      'ROI',
      'IRR',
      'NPV',
      'Capital Turnover',
      'Investment Returns',
      'Cost of Capital',
      'Project Success Rate'
    ],
    customOptions: {
      riskTolerance: 'moderate',
      investmentHorizon: 'long-term',
      capitalStructure: 'optimal',
      analysisDepth: 'comprehensive',
      reportingFrequency: 'monthly'
    },
    advancedFeatures: {
      a2aCommunication: true,
      d2dCommunication: true,
      selfImprovement: true,
      selfLearning: true,
      predictiveInsights: true,
      anomalyDetection: true,
      sentimentAnalysis: false,
      unlimitedMemory: true,
      taskHistory: true,
      crossAgentCollaboration: true,
      departmentIntegration: true,
    },
    intelligenceFeatures: [
      { id: 'predictive', enabled: true, name: 'Predictive Engine', description: 'Forecasts capital needs and investment returns' },
      { id: 'anomaly', enabled: true, name: 'Anomaly Detector', description: 'Detects capital allocation anomalies' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'cp_1', name: 'Capital Budgeting', category: 'Planning', description: 'Plan and allocate capital effectively', level: 'expert' },
      { id: 'cp_2', name: 'Investment Analysis', category: 'Analytics', description: 'Analyze investment opportunities', level: 'expert' },
      { id: 'cp_3', name: 'ROI Calculation', category: 'Analytics', description: 'Calculate return on investment', level: 'expert' },
      { id: 'cp_4', name: 'Financial Modeling', category: 'Analytics', description: 'Build financial models', level: 'advanced' },
      { id: 'cp_5', name: 'Risk Assessment', category: 'Risk', description: 'Evaluate investment risks', level: 'advanced' }
    ],
    personality: [
      { trait: 'Analytical', value: 10, description: 'Thoroughly analyzes capital decisions' },
      { trait: 'Strategic', value: 9, description: 'Thinks long-term about capital allocation' },
      { trait: 'Precision', value: 9, description: 'Ensures accurate financial calculations' },
      { trait: 'Efficiency', value: 8, description: 'Optimizes capital deployment' },
      { trait: 'Proactivity', value: 8, description: 'Identifies capital opportunities' }
    ]

  };
  return <AgentPageWrapper agent={agent} />;
}
