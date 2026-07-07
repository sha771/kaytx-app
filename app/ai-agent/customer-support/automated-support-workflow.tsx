import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { RefreshCw } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'automated-support-workflow',
    name: 'AI Automated Support Workflow',
    title: 'Automated Support Workflow',
    description: 'Automated support workflow orchestration with intelligent process management',
    capabilities: ["Workflow Automation","Process Orchestration","Task Coordination","End-to-End Automation"],
    icon: RefreshCw,
    color: '#1976D2',
    type: 'employee' as const,
    humanCost: '$64k/year',
    aiCost: '$1.6k/year',
    efficiency: '40x efficiency improvement',
    replacesRole: 'Workflow Manager',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.7%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$5.2k',
      tasksAutomatedDaily: 467,
      responseTime: '0.3s',
      accuracyRate: '97.9%',
    },
    hierarchy: {
      department: 'Customer Support',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
