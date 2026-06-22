import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Target } from 'lucide-react-native';

export default function SalesManagerPage() {
  const agent = {
    id: 'sales-manager',
    name: 'AI Sales Manager',
    title: 'AI Sales Manager',
    description: 'The AI Sales Manager oversees sales operations, manages sales team, drives revenue growth, and ensures sales targets are met across all channels.',
    capabilities: ["Task Automation","Data Processing","Workflow Management","Sales Operations","Team Management","Revenue Growth","Target Achievement","Sales Analytics","Performance Tracking","Customer Acquisition"],
    icon: Target,
    color: '#2E7D32',
    type: 'employee' as const,
    humanCost: '$80k/year',
    aiCost: '$2k/year',
    efficiency: '40x efficiency improvement',
    replacesRole: 'sales-manager',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.7%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$6,500',
      tasksAutomatedDaily: 460,
      responseTime: '1.3s',
      accuracyRate: '97.0%',
    },
    hierarchy: {
      department: 'Retail & Stores',
      level: 'manager',
      reportsTo: 'vp-sales',
      manages: ['sales-associate', 'cashier', 'customer-service-rep'],
    },
    specializedCapabilities: [
      'Sales Operations',
      'Team Management',
      'Revenue Growth',
      'Target Achievement',
      'Sales Analytics',
      'Performance Tracking',
      'Customer Acquisition',
      'Sales Training'
    ],
    integrationOptions: [
      'POS Systems',
      'CRM Platforms',
      'Sales Force Automation',
      'Analytics Tools',
      'Communication Systems',
      'Performance Dashboards',
      'Training Platforms'
    ],
    automationFeatures: [
      'Sales Tracking',
      'Performance Monitoring',
      'Target Management',
      'Sales Forecasting',
      'Team Coordination',
      'Report Generation',
      'Task Assignment',
      'Customer Follow-up'
    ],
    kpiMetrics: [
      'Sales Revenue',
      'Target Achievement',
      'Conversion Rate',
      'Team Productivity',
      'Customer Acquisition',
      'Average Transaction Value',
      'Sales per Employee',
      'Forecast Accuracy'
    ],
    customOptions: {
      salesFocus: 'high',
      revenueTarget: 'aggressive',
      teamDevelopment: 'high',
      customerAcquisition: 'high',
      performanceTracking: 'strict'
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
      { id: 'sales', enabled: true, name: 'Sales Predictor', description: 'Forecasts sales performance' },
      { id: 'performance', enabled: true, name: 'Performance Analyzer', description: 'Analyzes team performance' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'sales_mgr_1', name: 'Sales Operations', category: 'Sales', description: 'Manage sales operations', level: 'expert' },
      { id: 'sales_mgr_2', name: 'Team Management', category: 'Management', description: 'Manage sales team', level: 'expert' },
      { id: 'sales_mgr_3', name: 'Revenue Growth', category: 'Revenue', description: 'Drive revenue growth', level: 'expert' },
      { id: 'sales_mgr_4', name: 'Target Achievement', category: 'Targets', description: 'Achieve sales targets', level: 'advanced' },
      { id: 'sales_mgr_5', name: 'Sales Analytics', category: 'Analytics', description: 'Analyze sales data', level: 'advanced' }
    ],
    personality: [
      { trait: 'Sales Drive', value: 10, description: 'Strong sales orientation' },
      { trait: 'Results Focus', value: 10, description: 'Results-driven leader' },
      { trait: 'Team Development', value: 9, description: 'Focuses on team growth' },
      { trait: 'Customer Focus', value: 9, description: 'Customer-centric approach' },
      { trait: 'Strategic Thinking', value: 9, description: 'Strategic sales planner' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
