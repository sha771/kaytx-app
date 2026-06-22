import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { ArrowRightLeft } from 'lucide-react-native';

export default function ConversionSpecialistPage() {
  const agent = {
    id: 'conversion-specialist',
    name: 'AI Conversion Specialist',
    title: 'AI Conversion Specialist',
    description: 'The AI Conversion Specialist optimizes conversion rates, analyzes funnel performance, implements conversion strategies, and drives improvements across the customer journey.',
    capabilities: ["Task Automation","Data Processing","Workflow Management","Conversion Optimization","Funnel Analysis","A/B Testing","User Experience","Landing Page Optimization","Cart Abandonment","Analytics"],
    icon: ArrowRightLeft,
    color: '#E65100',
    type: 'employee' as const,
    humanCost: '$90k/year',
    aiCost: '$2.5k/year',
    efficiency: '36x efficiency improvement',
    replacesRole: 'conversion-specialist',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.7%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$7,300',
      tasksAutomatedDaily: 480,
      responseTime: '1.7s',
      accuracyRate: '97.0%',
    },
    hierarchy: {
      department: 'E-Commerce',
      level: 'specialist',
      reportsTo: 'vp-sales',
      manages: [],
    },
    specializedCapabilities: [
      'Conversion Optimization',
      'Funnel Analysis',
      'A/B Testing',
      'User Experience',
      'Landing Page Optimization',
      'Cart Abandonment',
      'Conversion Analytics',
      'User Behavior Analysis',
      'Testing Strategy',
      'Performance Tracking'
    ],
    integrationOptions: [
      'Analytics Platforms',
      'A/B Testing Tools',
      'Heatmap Tools',
      'User Recording Platforms',
      'Landing Page Builders',
      'Cart Recovery Tools',
      'Funnel Analytics',
      'Testing Platforms'
    ],
    automationFeatures: [
      'Conversion Tracking',
      'Funnel Analysis',
      'A/B Testing',
      'Landing Page Optimization',
      'Cart Recovery',
      'User Behavior Analysis',
      'Performance Monitoring',
      'Report Generation'
    ],
    kpiMetrics: [
      'Conversion Rate',
      'Funnel Efficiency',
      'Test Success Rate',
      'Cart Recovery Rate',
      'Landing Page Performance',
      'User Engagement',
      'Revenue Impact',
      'Optimization ROI'
    ],
    customOptions: {
      optimizationFocus: 'high',
      testingIntensity: 'aggressive',
      userCentric: 'true',
      dataDriven: 'true',
      automationLevel: 'high'
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
      { id: 'predictive', enabled: true, name: 'Predictive Engine', description: 'Forecasts conversion trends' },
      { id: 'anomaly', enabled: true, name: 'Anomaly Detector', description: 'Detects conversion anomalies' },
      { id: 'funnel', enabled: true, name: 'Funnel Optimizer', description: 'Optimizes conversion funnels' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'cs_1', name: 'Conversion Optimization', category: 'Conversion', description: 'Optimize conversion rates', level: 'expert' },
      { id: 'cs_2', name: 'Funnel Analysis', category: 'Analytics', description: 'Analyze conversion funnels', level: 'expert' },
      { id: 'cs_3', name: 'A/B Testing', category: 'Testing', description: 'Run A/B tests', level: 'expert' },
      { id: 'cs_4', name: 'User Experience', category: 'UX', description: 'Optimize user experience', level: 'advanced' },
      { id: 'cs_5', name: 'Cart Abandonment', category: 'Recovery', description: 'Reduce cart abandonment', level: 'expert' }
    ],
    personality: [
      { trait: 'Data Driven', value: 10, description: 'Data-focused optimization' },
      { trait: 'Experimental', value: 10, description: 'Experimental approach' },
      { trait: 'User Centric', value: 9, description: 'User-centered optimization' },
      { trait: 'Analytical', value: 9, description: 'Strong analytical skills' },
      { trait: 'Persistent', value: 9, description: 'Persistent in optimization efforts' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
