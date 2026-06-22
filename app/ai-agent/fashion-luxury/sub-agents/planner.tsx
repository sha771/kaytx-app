import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Calendar } from 'lucide-react-native';

export default function PlannerPage() {
  const agent = {
    id: 'planner',
    name: 'AI Planner',
    title: 'AI Planner',
    description: 'The AI Planner develops merchandise plans, forecasts sales, and optimizes inventory levels for fashion and luxury products.',
    capabilities: ["Merchandise Planning","Sales Forecasting","Inventory Planning","Demand Planning","Financial Planning","Seasonal Planning","Open-to-Buy","Performance Analysis","Planning Analytics","Budget Management"],
    icon: Calendar,
    color: '#2196F3',
    type: 'employee' as const,
    humanCost: '$80k/year',
    aiCost: '$2.5k/year',
    efficiency: '32x efficiency improvement',
    replacesRole: 'planner',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$6,500',
      tasksAutomatedDaily: 420,
      responseTime: '1.5s',
      accuracyRate: '97.0%',
    },
    hierarchy: {
      department: 'Fashion & Luxury',
      level: 'specialist',
      reportsTo: 'vp-merchandising',
      manages: [],
    },
    specializedCapabilities: [
      'Merchandise Planning',
      'Sales Forecasting',
      'Inventory Planning',
      'Demand Planning',
      'Financial Planning',
      'Seasonal Planning',
      'Open-to-Buy',
      'Performance Analysis'
    ],
    integrationOptions: [
      'Planning Systems',
      'Forecasting Tools',
      'Inventory Management',
      'Sales Data',
      'Financial Systems',
      'Analytics Platforms',
      'Budget Tools',
      'Performance Tracking'
    ],
    automationFeatures: [
      'Merchandise Planning',
      'Sales Forecasting',
      'Inventory Optimization',
      'Demand Planning',
      'Financial Planning',
      'Seasonal Planning',
      'OTB Management',
      'Performance Analysis'
    ],
    kpiMetrics: [
      'Forecast Accuracy',
      'Inventory Turnover',
      'Sales Achievement',
      'Budget Adherence',
      'Planning Efficiency',
      'Demand Accuracy',
      'Seasonal Performance',
      'OTB Utilization'
    ],
    customOptions: {
      planningHorizon: 'seasonal',
      forecastingMethod: 'ai-powered',
      inventoryStrategy: 'lean',
      budgetApproach: 'strategic',
      performanceFocus: 'profitability'
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
      { id: 'plan', enabled: true, name: 'Planning Engine', description: 'Develops merchandise plans' },
      { id: 'forecast', enabled: true, name: 'Sales Forecaster', description: 'Forecasts sales' },
      { id: 'optimize', enabled: true, name: 'Inventory Optimizer', description: 'Optimizes inventory' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'plan_1', name: 'Merchandise Planning', category: 'Planning', description: 'Plan merchandise', level: 'expert' },
      { id: 'plan_2', name: 'Sales Forecasting', category: 'Forecasting', description: 'Forecast sales', level: 'expert' },
      { id: 'plan_3', name: 'Inventory Planning', category: 'Inventory', description: 'Plan inventory', level: 'expert' },
      { id: 'plan_4', name: 'Demand Planning', category: 'Demand', description: 'Plan demand', level: 'expert' },
      { id: 'plan_5', name: 'Financial Planning', category: 'Financial', description: 'Plan finances', level: 'expert' }
    ],
    personality: [
      { trait: 'Analytical Thinking', value: 10, description: 'Strong analytical capabilities' },
      { trait: 'Planning Excellence', value: 10, description: 'Excellent planning skills' },
      { trait: 'Data-Driven', value: 10, description: 'Highly data-driven' },
      { trait: 'Strategic Thinking', value: 10, description: 'Excellent strategic thinking' },
      { trait: 'Accuracy', value: 10, description: 'Focused on accuracy' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
