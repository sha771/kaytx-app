import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { TrendingUp } from 'lucide-react-native';

export default function VPSalesPage() {
  const agent = {
    id: 'vp-sales',
    name: 'AI VP Sales',
    title: 'AI VP Sales',
    description: 'The AI VP Sales oversees e-commerce sales operations, manages sales targets, drives revenue growth, and leads the digital sales team to achieve business objectives.',
    capabilities: ["Task Automation","Data Processing","Workflow Management","Sales Management","Revenue Growth","Target Setting","Team Leadership","Sales Analytics","Performance Tracking","Strategic Planning"],
    icon: TrendingUp,
    color: '#2E7D32',
    type: 'employee' as const,
    humanCost: '$175k/year',
    aiCost: '$4k/year',
    efficiency: '44x efficiency improvement',
    replacesRole: 'vp-sales',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$14,200',
      tasksAutomatedDaily: 950,
      responseTime: '1.3s',
      accuracyRate: '97.8%',
    },
    hierarchy: {
      department: 'E-Commerce',
      level: 'vp_director',
      reportsTo: 'chief-commerce-officer',
      manages: ['sales-manager', 'conversion-specialist', 'revenue-analyst', 'sales-operations-lead'],
    },
    specializedCapabilities: [
      'Sales Management',
      'Revenue Growth',
      'Target Setting',
      'Team Leadership',
      'Sales Analytics',
      'Performance Tracking',
      'Strategic Planning',
      'Sales Optimization',
      'Forecasting',
      'Team Development'
    ],
    integrationOptions: [
      'Sales Platforms',
      'Analytics Systems',
      'CRM Platforms',
      'Performance Tools',
      'Forecasting Systems',
      'Commission Systems',
      'Reporting Platforms',
      'Business Intelligence'
    ],
    automationFeatures: [
      'Sales Monitoring',
      'Revenue Tracking',
      'Target Management',
      'Performance Analytics',
      'Sales Forecasting',
      'Team Coordination',
      'Report Generation',
      'Optimization'
    ],
    kpiMetrics: [
      'Total Revenue',
      'Sales Targets',
      'Conversion Rate',
      'Team Performance',
      'Customer Acquisition',
      'Average Order Value',
      'Sales Growth',
      'Forecast Accuracy'
    ],
    customOptions: {
      growthFocus: 'high',
      targetAmbition: 'aggressive',
      teamDevelopment: 'high',
      dataDriven: 'true',
      automationLevel: 'high'
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
      { id: 'predictive', enabled: true, name: 'Predictive Engine', description: 'Forecasts sales performance' },
      { id: 'anomaly', enabled: true, name: 'Anomaly Detector', description: 'Detects sales anomalies' },
      { id: 'revenue', enabled: true, name: 'Revenue Optimizer', description: 'Optimizes revenue strategies' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'vps_1', name: 'Sales Management', category: 'Sales', description: 'Manage sales operations', level: 'expert' },
      { id: 'vps_2', name: 'Revenue Growth', category: 'Revenue', description: 'Drive revenue growth', level: 'expert' },
      { id: 'vps_3', name: 'Team Leadership', category: 'Leadership', description: 'Lead sales teams', level: 'expert' },
      { id: 'vps_4', name: 'Sales Analytics', category: 'Analytics', description: 'Analyze sales performance', level: 'expert' },
      { id: 'vps_5', name: 'Strategic Planning', category: 'Strategy', description: 'Plan sales strategies', level: 'expert' }
    ],
    personality: [
      { trait: 'Sales Driven', value: 10, description: 'Highly sales-oriented' },
      { trait: 'Goal Oriented', value: 10, description: 'Focus on achieving targets' },
      { trait: 'Leadership', value: 10, description: 'Strong leadership capabilities' },
      { trait: 'Strategic', value: 9, description: 'Strategic sales approach' },
      { trait: 'Motivational', value: 9, description: 'Motivates team effectively' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
