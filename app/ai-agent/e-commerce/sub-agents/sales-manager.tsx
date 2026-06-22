import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Target } from 'lucide-react-native';

export default function SalesManagerPage() {
  const agent = {
    id: 'sales-manager',
    name: 'AI Sales Manager',
    title: 'AI Sales Manager',
    description: 'The AI Sales Manager manages daily sales operations, tracks sales performance, coordinates sales activities, and ensures sales targets are achieved.',
    capabilities: ["Task Automation","Data Processing","Workflow Management","Sales Operations","Performance Tracking","Team Coordination","Sales Reporting","Target Monitoring","Activity Management","Process Optimization"],
    icon: Target,
    color: '#2E7D32',
    type: 'employee' as const,
    humanCost: '$85k/year',
    aiCost: '$2k/year',
    efficiency: '42x efficiency improvement',
    replacesRole: 'sales-manager',
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
      accuracyRate: '96.5%',
    },
    hierarchy: {
      department: 'E-Commerce',
      level: 'manager',
      reportsTo: 'vp-sales',
      manages: [],
    },
    specializedCapabilities: [
      'Sales Operations',
      'Performance Tracking',
      'Team Coordination',
      'Sales Reporting',
      'Target Monitoring',
      'Activity Management',
      'Process Optimization',
      'Sales Analytics',
      'Forecasting',
      'Team Leadership'
    ],
    integrationOptions: [
      'Sales Platforms',
      'CRM Systems',
      'Analytics Tools',
      'Reporting Platforms',
      'Communication Tools',
      'Performance Dashboards',
      'Commission Systems',
      'Collaboration Platforms'
    ],
    automationFeatures: [
      'Sales Tracking',
      'Performance Monitoring',
      'Report Generation',
      'Target Management',
      'Activity Logging',
      'Team Coordination',
      'Forecasting',
      'Process Automation'
    ],
    kpiMetrics: [
      'Sales Revenue',
      'Target Achievement',
      'Team Performance',
      'Activity Levels',
      'Conversion Rate',
      'Forecast Accuracy',
      'Process Efficiency',
      'Team Productivity'
    ],
    customOptions: {
      salesFocus: 'high',
      targetAmbition: 'aggressive',
      teamDevelopment: 'moderate',
      dataDriven: 'true',
      automationLevel: 'high'
    },
    advancedFeatures: {
      a2aCommunication: true,
      d2dCommunication: false,
      selfImprovement: true,
      selfLearning: true,
      predictiveInsights: true,
      anomalyDetection: false,
      sentimentAnalysis: false,
      unlimitedMemory: true,
      taskHistory: true,
      crossAgentCollaboration: true,
      departmentIntegration: true,
    },
    intelligenceFeatures: [
      { id: 'predictive', enabled: true, name: 'Predictive Engine', description: 'Forecasts sales performance' },
      { id: 'performance', enabled: true, name: 'Performance Tracker', description: 'Tracks sales performance' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'sm_1', name: 'Sales Operations', category: 'Sales', description: 'Manage sales operations', level: 'expert' },
      { id: 'sm_2', name: 'Performance Tracking', category: 'Analytics', description: 'Track sales performance', level: 'expert' },
      { id: 'sm_3', name: 'Team Coordination', category: 'Leadership', description: 'Coordinate sales team', level: 'expert' },
      { id: 'sm_4', name: 'Sales Reporting', category: 'Reporting', description: 'Generate sales reports', level: 'advanced' },
      { id: 'sm_5', name: 'Target Monitoring', category: 'Targets', description: 'Monitor sales targets', level: 'expert' }
    ],
    personality: [
      { trait: 'Sales Driven', value: 10, description: 'Highly sales-oriented' },
      { trait: 'Goal Oriented', value: 10, description: 'Focus on achieving targets' },
      { trait: 'Leadership', value: 9, description: 'Strong team leadership' },
      { trait: 'Motivational', value: 9, description: 'Motivates team effectively' },
      { trait: 'Analytical', value: 8, description: 'Analytical approach to sales' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
