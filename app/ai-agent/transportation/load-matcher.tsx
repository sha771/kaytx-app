import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-load-matcher',
    uid: 'ktx-19-load-matcher',
    name: 'AI Load Matcher',
    title: 'AI Load Matcher',
    description: 'AI Load Matcher provides specialized expertise and executes critical tasks for the Transportation & Logistics department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Logistics Analytics', 'Fleet Management', 'Route Optimization', 'Shipment Tracking', 'Warehouse Management'],
    color: '#26A69A',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '80% efficiency',
    replacesRole: 'AI Load Matcher',
    infrastructure: {
      status: 'online',
      health: 85,
      uptime: '99.2%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3335',
      tasksAutomatedDaily: 355,
      responseTime: '1.6s',
      accuracyRate: '97.5%',
    },
    hierarchy: {
      department: 'Transportation & Logistics',
      level: 'specialist',
      departmentId: 19,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
