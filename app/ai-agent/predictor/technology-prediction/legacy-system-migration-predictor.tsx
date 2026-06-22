import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { ArrowRightLeft } from 'lucide-react-native';

export default function LegacySystemMigrationPredictorPage() {
  const agent = {
    id: 'ai-legacy-system-migration-predictor',
    name: 'AI Legacy System Migration Predictor',
    title: 'AI Legacy System Migration Predictor',
    description: 'Legacy system migration prediction system using AI and system analysis for migration complexity assessment, timeline forecasting, and risk prediction.',
    capabilities: ['Migration Complexity Assessment', 'Timeline Forecasting', 'Risk Prediction', 'Cost Estimation', 'Dependency Analysis'],
    icon: ArrowRightLeft,
    color: '#6366F1',
    type: 'employee' as const,
    humanCost: '$160k/year',
    aiCost: '$3,200/mo',
    efficiency: '92%',
    replacesRole: 'legacy-migration-analyst',
    infrastructure: {
      status: 'online',
      health: 96,
      uptime: '99.7%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$13,000',
      tasksAutomatedDaily: 510,
      responseTime: '1.2s',
      accuracyRate: '92%',
    },
    hierarchy: {
      department: 'Predictor',
      subDepartment: 'Technology Prediction',
      level: 'specialist',
      reportsTo: 'ai-technology-prediction-director',
      manages: [],
    },
    specializedCapabilities: [
      'Migration Complexity Assessment',
      'Timeline Forecasting',
      'Risk Prediction',
      'Cost Estimation',
      'Dependency Analysis'
    ],
    integrationOptions: [
      'Legacy System Analysis Tools',
      'Code Analysis Platforms',
      'Dependency Mapping Systems',
      'Project Management Tools',
      'Cost Estimation Systems',
      'Risk Management Platforms',
      'Architecture Documentation',
      'Migration Planning Tools'
    ],
    automationFeatures: [
      'Migration Complexity Assessment',
      'Timeline Forecasting',
      'Risk Prediction',
      'Cost Estimation',
      'Dependency Analysis',
      'Complexity Scoring',
      'Risk Alerting',
      'Migration Planning'
    ],
    kpiMetrics: [
      'Complexity Assessment Accuracy',
      'Timeline Forecast Success',
      'Risk Prediction Precision',
      'Cost Estimation Quality',
      'Dependency Analysis Impact',
      'Migration Success Rate',
      'Timeline Adherence',
      'Business Impact'
    ],
    customOptions: {
      analyticsApproach: 'migration-focused',
      dataFocus: 'system-analysis',
      predictionModel: 'complexity-analysis',
      insightDelivery: 'real-time',
      strategyIntegration: 'migration-driven'
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
      { id: 'complexity', enabled: true, name: 'Complexity Assessment', description: 'Migration complexity assessment' },
      { id: 'timeline', enabled: true, name: 'Timeline Forecasting', description: 'Migration timeline forecasting' },
      { id: 'risk', enabled: true, name: 'Risk Prediction', description: 'Migration risk prediction' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'migrate_1', name: 'Migration Complexity Assessment', category: 'Assessment', description: 'Assess migration complexity', level: 'expert' },
      { id: 'migrate_2', name: 'Timeline Forecasting', category: 'Forecasting', description: 'Forecast migration timeline', level: 'expert' },
      { id: 'migrate_3', name: 'Risk Prediction', category: 'Prediction', description: 'Predict migration risks', level: 'expert' },
      { id: 'migrate_4', name: 'Cost Estimation', category: 'Estimation', description: 'Estimate migration costs', level: 'expert' },
      { id: 'migrate_5', name: 'Dependency Analysis', category: 'Analysis', description: 'Analyze dependencies', level: 'expert' }
    ],
    personality: [
      { trait: 'Migration Insight', value: 10, description: 'Expert migration analyst' },
      { trait: 'Complexity Analysis', value: 10, description: 'Strong complexity assessor' },
      { trait: 'Risk Awareness', value: 10, description: 'Deep risk understanding' },
      { trait: 'Planning Skills', value: 9, description: 'Expert planner' },
      { trait: 'Communication', value: 9, description: 'Clear migration communicator' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
