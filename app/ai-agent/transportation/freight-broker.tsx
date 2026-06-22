import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-freight-broker',
    uid: 'ktx-19-freight-broker',
    name: 'AI Freight Broker',
    title: 'AI Freight Broker',
    description: 'AI Freight Broker coordinates team activities and ensures quality output for the Transportation & Logistics department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Route Optimization', 'Shipment Tracking', 'Warehouse Management', 'Carrier Relations', 'Customs Compliance'],
    color: '#26A69A',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '94% efficiency',
    replacesRole: 'AI Freight Broker',
    subAgents: [
      { id: 'ai-slot-optimizer', uid: 'ktx-19-slot-optimizer', name: 'AI Slot Optimizer', title: 'AI Slot Optimizer', route: '/ai-agent/transportation/slot-optimizer' },
      { id: 'ai-return-processor', uid: 'ktx-19-return-processor', name: 'AI Return Processor', title: 'AI Return Processor', route: '/ai-agent/transportation/return-processor' },
      { id: 'ai-document-preparer', uid: 'ktx-19-document-preparer', name: 'AI Document Preparer', title: 'AI Document Preparer', route: '/ai-agent/transportation/document-preparer' }
    ],
    infrastructure: {
      status: 'online',
      health: 91,
      uptime: '99.4%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3513',
      tasksAutomatedDaily: 389,
      responseTime: '1.7s',
      accuracyRate: '97.9%',
    },
    hierarchy: {
      department: 'Transportation & Logistics',
      level: 'team_lead',
      departmentId: 19,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
