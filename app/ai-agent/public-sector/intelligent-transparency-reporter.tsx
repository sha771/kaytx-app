import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { FileText } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'intelligent-transparency-reporter',
    name: 'AI Intelligent Transparency Reporter',
    title: 'Intelligent Transparency Reporter',
    description: 'Government transparency and reporting with AI',
    capabilities: ["Transparency Reporting","Government Accountability","Public Information","Data Disclosure"],
    icon: FileText,
    color: '#1565C0',
    type: 'employee' as const,
    humanCost: '$78k/year',
    aiCost: '$2.0k/year',
    efficiency: '39x efficiency improvement',
    replacesRole: 'Transparency Officer',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$6.3k',
      tasksAutomatedDaily: 378,
      responseTime: '0.4s',
      accuracyRate: '97.9%',
    },
    hierarchy: {
      department: 'Public Sector',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
