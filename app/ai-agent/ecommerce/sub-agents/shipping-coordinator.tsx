import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Truck } from 'lucide-react-native';

export default function ShippingCoordinatorPage() {
  const agent = {
    id: 'shipping-coordinator',
    name: 'AI Shipping Coordinator',
    title: 'E-Commerce Agent',
    description: 'Automated Shipping Coordinator agent specializing in shipping coordination with advanced AI capabilities for task automation, data processing, and workflow coordination.',
    capabilities: ["Task Automation","Data Processing","Workflow Coordination","Shipping Coordination","Carrier Management","Route Optimization","Tracking","Cost Management"],
    icon: Truck,
    color: '#FF5722',
    type: 'agent' as const,
    humanCost: '$55k/year',
    aiCost: '$1.5k/year',
    efficiency: '36x efficiency improvement',
    replacesRole: 'Shipping Coordinator',
    infrastructure: {
      status: 'online' as const,
      health: 96,
      uptime: '99.6%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4,500',
      tasksAutomatedDaily: 300,
      responseTime: '2.5s',
      accuracyRate: '97.5%',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
