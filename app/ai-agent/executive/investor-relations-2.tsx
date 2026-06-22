import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { DollarSign } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'investor-relations-2',
    name: 'Investor Relations Director 2',
    title: 'Director of Shareholder Services',
    description: 'Manages shareholder services, dividend administration, and shareholder record management.',
    capabilities: ["Shareholder Services","Dividend Administration","Record Management","Shareholder Support","Transfer Agent Coordination"],
    icon: DollarSign,
    color: '#4A148C',
    type: 'agent' as const,
    humanCost: '$190k/year',
    aiCost: '$4k/year',
    efficiency: '48x efficiency improvement',
    replacesRole: 'Investor Relations Director',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$15k',
      tasksAutomatedDaily: 208,
      responseTime: '0.5s',
      accuracyRate: '97.3%',
    },
    hierarchy: {
      department: 'Executive',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
