import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Scroll } from 'lucide-react-native';

export default function EstatePlannerPage() {
  const agent = {
    id: 'estate-planner',
    name: 'AI Estate Planner',
    title: 'Banking Agent',
    description: 'Automated Estate Planner agent specializing in estate planning with advanced AI capabilities for task automation, data processing, and workflow coordination.',
    capabilities: ["Task Automation","Data Processing","Workflow Coordination","Estate Planning","Wealth Transfer","Tax Planning","Trust Services","Legal Coordination"],
    icon: Scroll,
    color: '#1B5E20',
    type: 'agent' as const,
    humanCost: '$75k/year',
    aiCost: '$1.5k/year',
    efficiency: '50x efficiency improvement',
    replacesRole: 'Estate Planner',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.7%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$6,100',
      tasksAutomatedDaily: 400,
      responseTime: '1.9s',
      accuracyRate: '97.5%',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
