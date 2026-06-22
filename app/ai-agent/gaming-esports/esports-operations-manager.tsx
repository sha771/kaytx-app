import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Settings } from 'lucide-react-native';

export default function AIEsportsOperationsManagerPage() {
  const agent = {
    id: 'esports-operations-manager',
    name: 'AI Esports Operations Manager',
    title: 'AI Esports Operations Manager',
    description: 'The AI Esports Operations Manager oversees daily operations, facility management, team logistics, and operational efficiency for esports organizations.',
    capabilities: ["Operations Management","Facility Coordination","Team Logistics","Resource Allocation","Process Optimization","Vendor Management","Budget Control","Reporting"],
    icon: Settings,
    color: '#607D8B',
    type: 'employee' as const,
    humanCost: '$90k/year',
    aiCost: '$2k/year',
    efficiency: '45x efficiency improvement',
    replacesRole: 'esports-operations-manager',
    hierarchy: {
      department: 'Gaming & Esports',
      level: 'manager',
      reportsTo: 'esports-director'
    },
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4,813',
      tasksAutomatedDaily: 808,
      responseTime: '2.2s',
      accuracyRate: '97.6%',
    }
  };
  return <AgentPageWrapper agent={agent} />;
}
