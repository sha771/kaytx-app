import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Server } from 'lucide-react-native';

export default function AIDraftAnalystPage() {
  const agent = {
    id: 'draft-analyst',
    name: 'AI Draft Analyst',
    title: 'AI Draft Analyst',
    description: 'Analyzes draft strategies and provides pick/ban recommendations.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Server,
    color: 'undefined',
    type: 'agent' as const,
    humanCost: '$50k/year',
    aiCost: '$1k/year',
    efficiency: '50x efficiency improvement',
    replacesRole: 'draft-analyst',
    hierarchy: {
      department: 'Gaming & Esports'
    },
    infrastructure: {
      status: 'online',
      health: 96,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$8,297',
      tasksAutomatedDaily: 778,
      responseTime: '1.2s',
      accuracyRate: '96.5%',
    }
  };
  return <AgentPageWrapper agent={agent} />;
}
