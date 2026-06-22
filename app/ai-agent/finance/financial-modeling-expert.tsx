import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Calculator } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'financial-modeling-expert',
    name: 'financial-modeling-expert',
    title: 'AI Financial Modeling Expert',
    description: 'The AI Financial Modeling Expert specializes in building complex financial models, performing scenario analysis, and creating sophisticated financial projections. This agent provides expert-level modeling for strategic decision-making.',
    capabilities: ["Financial Modeling","Scenario Analysis","Sensitivity Analysis","Monte Carlo Simulation","DCF Modeling","Projection Building","Data Analysis","Model Validation","Risk Assessment","Strategic Planning"],
    icon: Calculator,
    color: '#2E7D32',
    type: 'agent' as const,
    humanCost: '$115k/year',
    aiCost: '$1.8k/year',
    efficiency: '64x efficiency improvement',
    replacesRole: 'financial-modeling-expert',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'advanced',
    },
    roiMetrics: {
      savingsPerMonth: '$9435',
      tasksAutomatedDaily: 342,
      responseTime: '1.2s',
      accuracyRate: '97.8%',
    },
    hierarchy: {
      department: 'Finance',
      level: 'expert',
      reportsTo: 'vp-financial-planning',
      manages: ['financial-modeler'],
    },
    specializedCapabilities: [
      'Advanced Financial Modeling',
      'Scenario Planning',
      'Sensitivity Analysis',
      'Monte Carlo Simulation',
      'DCF Valuation',
      'Three-Statement Modeling',
      'M&A Modeling',
      'Project Finance Modeling'
    ],
    integrationOptions: [
      'Financial Modeling Software',
      'Excel/Spreadsheets',
      'BI Platforms',
      'Data Warehouses',
      'ERP Systems',
      'Planning Tools',
      'Analytics Platforms',
      'Cloud Computing'
    ],
    automationFeatures: [
      'Model Building Automation',
      'Scenario Generation',
      'Sensitivity Testing',
      'Data Integration',
      'Model Validation',
      'Error Checking',
      'Report Generation',
      'Version Control'
    ],
    kpiMetrics: [
      'Model Accuracy',
      'Forecast Precision',
      'Scenario Coverage',
      'Analysis Speed',
      'Model Complexity',
      'Validation Rate',
      'Error Reduction',
      'Decision Support'
    ],
    customOptions: {
      modelingApproach: 'advanced',
      scenarioCount: 'comprehensive',
      sensitivityDepth: 'detailed',
      simulationType: 'monte-carlo',
      validationLevel: 'strict'
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
      { id: 'predictive', enabled: true, name: 'Predictive Engine', description: 'Forecasts financial outcomes' },
      { id: 'anomaly', enabled: true, name: 'Anomaly Detector', description: 'Detects model anomalies' },
      { id: 'simulation', enabled: true, name: 'Simulation Engine', description: 'Runs complex simulations' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'fm_1', name: 'Financial Modeling', category: 'Modeling', description: 'Build complex financial models', level: 'expert' },
      { id: 'fm_2', name: 'Scenario Analysis', category: 'Analytics', description: 'Perform scenario analysis', level: 'expert' },
      { id: 'fm_3', name: 'DCF Valuation', category: 'Valuation', description: 'Calculate DCF valuations', level: 'expert' },
      { id: 'fm_4', name: 'Monte Carlo', category: 'Analytics', description: 'Run Monte Carlo simulations', level: 'expert' },
      { id: 'fm_5', name: 'Sensitivity Analysis', category: 'Analytics', description: 'Conduct sensitivity analysis', level: 'expert' }
    ],
    personality: [
      { trait: 'Analytical', value: 10, description: 'Deeply analyzes financial data' },
      { trait: 'Precision', value: 10, description: 'Ensures model accuracy' },
      { trait: 'Complexity', value: 9, description: 'Handles complex modeling scenarios' },
      { trait: 'Thoroughness', value: 9, description: 'Validates models comprehensively' },
      { trait: 'Innovation', value: 8, description: 'Creates innovative modeling approaches' }
    ]

  };
  return <AgentPageWrapper agent={agent} />;
}
