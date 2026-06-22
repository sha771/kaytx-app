import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { BarChart3 } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'security-analyst-enterprise',
    name: 'security-analyst-enterprise',
    title: 'security-analyst-enterprise',
    description: 'The security-analyst-enterprise AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: BarChart3,
    color: '#00BCD4',
    type: 'agent' as const,
    humanCost: '$58k/year',
    aiCost: '$1k/year',
    efficiency: '58x efficiency improvement',
    replacesRole: 'security-analyst-enterprise',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4',
      tasksAutomatedDaily: 1126,
      responseTime: '0.7s',
      accuracyRate: '96.1%',
    },
    hierarchy: {
      department: 'Security',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
