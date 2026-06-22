import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { LayoutGrid } from 'lucide-react-native';

export default function MerchandisingManagerPage() {
  const agent = {
    id: 'merchandising-manager',
    name: 'AI Merchandising Manager',
    title: 'AI Merchandising Manager',
    description: 'The AI Merchandising Manager oversees product assortment, inventory planning, pricing execution, and merchandising performance across all retail channels.',
    capabilities: ["Assortment Planning","Inventory Management","Pricing Execution","Sales Analysis","Product Allocation","Merchandising Analytics","Team Coordination","Forecasting","Performance Tracking","Seasonal Planning"],
    icon: LayoutGrid,
    color: '#FF9800',
    type: 'employee' as const,
    humanCost: '$120k/year',
    aiCost: '$3k/year',
    efficiency: '40x efficiency improvement',
    replacesRole: 'merchandising-manager',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$9,750',
      tasksAutomatedDaily: 700,
      responseTime: '1.4s',
      accuracyRate: '97.5%',
    },
    hierarchy: {
      department: 'Fashion & Luxury',
      level: 'manager',
      reportsTo: 'vp-merchandising',
      manages: ['buyer', 'planner', 'allocator', 'inventory-analyst', 'merchandising-assistant'],
    },
    specializedCapabilities: [
      'Assortment Planning',
      'Inventory Management',
      'Pricing Execution',
      'Sales Analysis',
      'Product Allocation',
      'Merchandising Analytics',
      'Forecasting',
      'Seasonal Planning'
    ],
    integrationOptions: [
      'Merchandising Systems',
      'Inventory Management',
      'POS Systems',
      'Analytics Platforms',
      'Forecasting Tools',
      'Pricing Systems',
      'Product Catalogs',
      'Sales Data'
    ],
    automationFeatures: [
      'Assortment Planning',
      'Inventory Monitoring',
      'Pricing Updates',
      'Sales Analysis',
      'Product Allocation',
      'Performance Tracking',
      'Replenishment',
      'Reporting'
    ],
    kpiMetrics: [
      'Sales Performance',
      'Inventory Turnover',
      'Sell-Through Rate',
      'Gross Margin',
      'Forecast Accuracy',
      'Product Mix',
      'Category Performance',
      'Seasonal Performance'
    ],
    customOptions: {
      merchandisingApproach: 'data-driven',
      inventoryStrategy: 'just-in-time',
      pricingApproach: 'competitive',
      planningHorizon: 'seasonal',
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
      { id: 'assort', enabled: true, name: 'Assortment Planner', description: 'Plans product assortments' },
      { id: 'inventory', enabled: true, name: 'Inventory Manager', description: 'Manages inventory levels' },
      { id: 'sales', enabled: true, name: 'Sales Analyzer', description: 'Analyzes sales performance' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'merch_mgr_1', name: 'Assortment Planning', category: 'Planning', description: 'Plan product assortments', level: 'expert' },
      { id: 'merch_mgr_2', name: 'Inventory Management', category: 'Inventory', description: 'Manage inventory levels', level: 'expert' },
      { id: 'merch_mgr_3', name: 'Pricing Execution', category: 'Pricing', description: 'Execute pricing strategies', level: 'expert' },
      { id: 'merch_mgr_4', name: 'Sales Analysis', category: 'Sales', description: 'Analyze sales performance', level: 'expert' },
      { id: 'merch_mgr_5', name: 'Merchandising Analytics', category: 'Analytics', description: 'Analyze merchandising performance', level: 'expert' }
    ],
    personality: [
      { trait: 'Analytical Thinking', value: 10, description: 'Strong analytical capabilities' },
      { trait: 'Data-Driven', value: 10, description: 'Highly data-driven' },
      { id: 'Commercial Awareness', value: 10, description: 'Strong commercial awareness' },
      { trait: 'Detail Oriented', value: 10, description: 'Meticulous attention to detail' },
      { trait: 'Performance Focus', value: 10, description: 'Focused on performance' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
