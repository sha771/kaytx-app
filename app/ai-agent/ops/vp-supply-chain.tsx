import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Briefcase } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'vp-supply-chain',
    name: 'AI VP of Supply Chain',
    title: 'VP Supply Chain & Logistics',
    description: 'Manages end-to-end supply chain, logistics, procurement, and vendor relationships. 
          Optimizes supply chain efficiency and ensures seamless operations.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Briefcase,
    color: '#607D8B',
    type: 'employee' as const,
    humanCost: '$221k/year',
    aiCost: '$4k/year',
    efficiency: '55x efficiency improvement',
    replacesRole: 'VP Supply Chain & Logistics',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$16',
      tasksAutomatedDaily: 1441,
      responseTime: '1.1s',
      accuracyRate: '97.3%',
    },
    hierarchy: {
      department: 'Ops',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
