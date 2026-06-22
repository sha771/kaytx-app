import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Users } from 'lucide-react-native';

export default function AcquisitionSpecialistPage() {
  const agent = {
    id: 'acquisition-specialist',
    name: 'AI Acquisition Specialist',
    title: 'AI Acquisition Specialist',
    description: 'The AI Acquisition Specialist manages customer acquisition channels, optimizes acquisition costs, develops acquisition strategies, and drives new customer growth.',
    capabilities: ["Task Automation","Data Processing","Workflow Management","Acquisition Management","Channel Optimization","Cost Management","Strategy Development","Analytics","Campaign Management","Performance Tracking"],
    icon: Users,
    color: '#1976D2',
    type: 'employee' as const,
    humanCost: '$85k/year',
    aiCost: '$2k/year',
    efficiency: '42x efficiency improvement',
    replacesRole: 'acquisition-specialist',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.7%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$6,900',
      tasksAutomatedDaily: 450,
      responseTime: '1.8s',
      accuracyRate: '97.0%',
    },
    hierarchy: {
      department: 'E-Commerce',
      level: 'specialist',
      reportsTo: 'vp-growth',
      manages: [],
    },
    specializedCapabilities: [
      'Acquisition Management',
      'Channel Optimization',
      'Cost Management',
      'Strategy Development',
      'Analytics',
      'Campaign Management',
      'Performance Tracking',
      'Channel Analysis',
      'Budget Optimization',
      'ROI Analysis'
    ],
    integrationOptions: [
      'Acquisition Platforms',
      'Channel Management',
      'Analytics Systems',
      'Campaign Tools',
      'Budget Management',
      'Performance Tracking',
      'Business Intelligence',
      'Marketing Automation'
    ],
    automationFeatures: [
      'Acquisition Channel Management',
      'Cost Optimization',
      'Campaign Management',
      'Performance Tracking',
      'Channel Analysis',
      'Budget Optimization',
      'ROI Analysis',
      'Report Generation'
    ],
    kpiMetrics: [
      'Acquisition Rate',
      'Cost Per Acquisition',
      'Channel Performance',
      'Campaign ROI',
      'Budget Efficiency',
      'Conversion Rate',
      'Customer Quality',
      'Acquisition Speed'
    ],
    customOptions: {
      costFocus: 'high',
      channelDiversity: 'high',
      dataDriven: 'true',
      automationLevel: 'high',
      continuousOptimization: 'true'
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
      { id: 'predictive', enabled: true, name: 'Predictive Engine', description: 'Forecasts acquisition trends' },
      { id: 'anomaly', enabled: true, name: 'Anomaly Detector', description: 'Detects acquisition anomalies' },
      { id: 'optimizer', enabled: true, name: 'Channel Optimizer', description: 'Optimizes acquisition channels' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'as_1', name: 'Acquisition Management', category: 'Acquisition', description: 'Manage acquisition', level: 'expert' },
      { id: 'as_2', name: 'Channel Optimization', category: 'Channel', description: 'Optimize channels', level: 'expert' },
      { id: 'as_3', name: 'Cost Management', category: 'Cost', description: 'Manage acquisition costs', level: 'expert' },
      { id: 'as_4', name: 'Strategy Development', category: 'Strategy', description: 'Develop strategies', level: 'expert' },
      { id: 'as_5', name: 'ROI Analysis', category: 'ROI', description: 'Analyze ROI', level: 'advanced' }
    ],
    personality: [
      { trait: 'Cost Conscious', value: 10, description: 'Cost-focused mindset' },
      { trait: 'Data Driven', value: 10, description: 'Data-driven approach' },
      { trait: 'Strategic', value: 9, description: 'Strategic acquisition planning' },
      { trait: 'Results Driven', value: 9, description: 'Results-oriented approach' },
      { trait: 'Analytical', value: 9, description: 'Strong analytical skills' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
