import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { FileText } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'cognitive-support-reporter',
    name: 'AI Cognitive Support Reporter',
    title: 'Cognitive Support Reporter',
    description: 'Comprehensive support reporting and insights with cognitive AI',
    capabilities: ["Support Reporting","Insight Generation","Data Analysis","Executive Dashboards"],
    icon: FileText,
    color: '#1976D2',
    type: 'employee' as const,
    humanCost: '$76k/year',
    aiCost: '$2.0k/year',
    efficiency: '38x efficiency improvement',
    replacesRole: 'Support Reporter',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$6.1k',
      tasksAutomatedDaily: 323,
      responseTime: '0.6s',
      accuracyRate: '97.2%',
    },
    hierarchy: {
      department: 'Customer Support',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
