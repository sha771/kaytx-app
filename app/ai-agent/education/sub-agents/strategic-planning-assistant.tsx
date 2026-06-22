import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Map } from 'lucide-react-native';

export default function StrategicPlanningAssistantPage() {
  const agent = {
    id: 'strategic-planning-assistant',
    name: 'AI Strategic Planning Assistant',
    title: 'Education Agent',
    description: 'Automated Strategic Planning Assistant agent specializing in institutional planning with advanced AI capabilities for strategic analysis, goal setting, and implementation tracking.',
    capabilities: ["Strategic Analysis","Goal Setting","Implementation Tracking","Scenario Planning","Resource Allocation","Progress Measurement"],
    icon: Map,
    color: '#8B5CF6',
    type: 'agent' as const,
    humanCost: '$58k/year',
    aiCost: '$1.2k/year',
    efficiency: '16x efficiency improvement',
    replacesRole: 'Strategic Planning Director',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.7%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3,900',
      tasksAutomatedDaily: 50,
      responseTime: '<3s',
      accuracyRate: '96%',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}