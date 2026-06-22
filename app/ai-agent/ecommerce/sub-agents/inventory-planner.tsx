import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Package } from 'lucide-react-native';

export default function InventoryPlannerPage() {
  const agent = {
    id: 'inventory-planner',
    name: 'AI Inventory Planner',
    title: 'E-Commerce Agent',
    description: 'Automated Inventory Planner agent specializing in inventory planning with advanced AI capabilities for task automation, data processing, and workflow coordination.',
    capabilities: ["Task Automation","Data Processing","Workflow Coordination","Inventory Planning","Demand Forecasting","Stock Optimization","Replenishment Planning","Analytics"],
    icon: Package,
    color: '#FF5722',
    type: 'agent' as const,
    humanCost: '$60k/year',
    aiCost: '$1.5k/year',
    efficiency: '40x efficiency improvement',
    replacesRole: 'Inventory Planner',
    infrastructure: {
      status: 'online' as const,
      health: 96,
      uptime: '99.6%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4,900',
      tasksAutomatedDaily: 330,
      responseTime: '2.4s',
      accuracyRate: '97.0%',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
