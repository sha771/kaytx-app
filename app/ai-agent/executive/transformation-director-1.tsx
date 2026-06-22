import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { RefreshCw } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'transformation-director-1',
    name: 'Transformation Director 1',
    title: 'Director of Digital Transformation',
    description: 'Leads digital transformation initiatives, technology adoption, and digital capability building.',
    capabilities: ["Digital Transformation","Technology Adoption","Digital Capabilities","Change Management","Transformation Strategy"],
    icon: RefreshCw,
    color: '#4A148C',
    type: 'agent' as const,
    humanCost: '$180k/year',
    aiCost: '$4k/year',
    efficiency: '45x efficiency improvement',
    replacesRole: 'Transformation Director',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$15k',
      tasksAutomatedDaily: 200,
      responseTime: '0.5s',
      accuracyRate: '97.5%',
    },
    hierarchy: {
      department: 'Executive',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
