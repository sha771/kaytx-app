import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { FileText } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'invoice-processor',
    name: 'invoice-processor',
    title: 'invoice-processor',
    description: 'The invoice-processor AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: FileText,
    color: '#0D47A1',
    type: 'agent' as const,
    humanCost: '$82k/year',
    aiCost: '$1k/year',
    efficiency: '82x efficiency improvement',
    replacesRole: 'invoice-processor',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$6',
      tasksAutomatedDaily: 566,
      responseTime: '0.3s',
      accuracyRate: '97.5%',
    },
    hierarchy: {
      department: 'Accounting',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
