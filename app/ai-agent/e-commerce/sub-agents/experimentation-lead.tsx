import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { FlaskConical } from 'lucide-react-native';

export default function ExperimentationLeadPage() {
  const agent = {
    id: 'experimentation-lead',
    name: 'AI Experimentation Lead',
    title: 'AI Experimentation Lead',
    description: 'The AI Experimentation Lead manages experimentation programs, designs A/B tests, analyzes test results, and drives data-driven optimization through testing.',
    capabilities: ["Task Automation","Data Processing","Workflow Management","Experimentation Management","A/B Testing","Test Design","Statistical Analysis","Result Analysis","Program Management","Analytics"],
    icon: FlaskConical,
    color: '#7B1FA2',
    type: 'employee' as const,
    humanCost: '$95k/year',
    aiCost: '$2.5k/year',
    efficiency: '38x efficiency improvement',
    replacesRole: 'experimentation-lead',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.7%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$7,700',
      tasksAutomatedDaily: 500,
      responseTime: '1.6s',
      accuracyRate: '97.5%',
    },
    hierarchy: {
      department: 'E-Commerce',
      level: 'specialist',
      reportsTo: 'vp-growth',
      manages: [],
    },
    specializedCapabilities: [
      'Experimentation Management',
      'A/B Testing',
      'Test Design',
      'Statistical Analysis',
      'Result Analysis',
      'Program Management',
      'Experiment Planning',
      'Hypothesis Testing',
      'Data Analysis',
      'Optimization'
    ],
    integrationOptions: [
      'Experimentation Platforms',
      'A/B Testing Tools',
      'Analytics Systems',
      'Statistical Software',
      'Program Management',
      'Data Warehouses',
      'Business Intelligence',
      'Testing Platforms'
    ],
    automationFeatures: [
      'Experiment Management',
      'Test Design',
      'Statistical Analysis',
      'Result Analysis',
      'Program Management',
      'Hypothesis Testing',
      'Data Analysis',
      'Report Generation'
    ],
    kpiMetrics: [
      'Test Success Rate',
      'Experiment Velocity',
      'Statistical Significance',
      'Result Accuracy',
      'Program Efficiency',
      'Optimization Impact',
      'Hypothesis Validation',
      'Team Productivity'
    ],
    customOptions: {
      testingIntensity: 'aggressive',
      statisticalRigor: 'high',
      dataDriven: 'true',
      automationLevel: 'high',
      continuousExperimentation: 'true'
    },
    advancedFeatures: {
      a2aCommunication: true,
      d2dCommunication: false,
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
      { id: 'predictive', enabled: true, name: 'Predictive Engine', description: 'Forecasts test outcomes' },
      { id: 'anomaly', enabled: true, name: 'Anomaly Detector', description: 'Detects test anomalies' },
      { id: 'statistical', enabled: true, name: 'Statistical Engine', description: 'Statistical analysis' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'el_1', name: 'Experimentation Management', category: 'Experimentation', description: 'Manage experiments', level: 'expert' },
      { id: 'el_2', name: 'A/B Testing', category: 'Testing', description: 'Design A/B tests', level: 'expert' },
      { id: 'el_3', name: 'Statistical Analysis', category: 'Statistics', description: 'Statistical analysis', level: 'expert' },
      { id: 'el_4', name: 'Result Analysis', category: 'Analysis', description: 'Analyze results', level: 'expert' },
      { id: 'el_5', name: 'Program Management', category: 'Program', description: 'Manage testing program', level: 'advanced' }
    ],
    personality: [
      { trait: 'Experimental', value: 10, description: 'Experimental mindset' },
      { trait: 'Data Driven', value: 10, description: 'Data-driven approach' },
      { trait: 'Analytical', value: 10, description: 'Strong analytical skills' },
      { trait: 'Curious', value: 9, description: 'Curious about testing' },
      { trait: 'Rigorous', value: 9, description: 'Statistical rigor' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
