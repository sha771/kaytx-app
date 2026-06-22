import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { ShieldAlert } from 'lucide-react-native';

export default function CampusSafetyIntelligencePage() {
  const agent = {
    id: 'campus-safety-intelligence',
    name: 'AI Campus Safety Intelligence',
    title: 'Education Agent',
    description: 'Automated Campus Safety Intelligence agent specializing in campus security with advanced AI capabilities for threat detection, safety monitoring, and emergency response coordination.',
    capabilities: ["Threat Detection","Safety Monitoring","Emergency Response Coordination","Access Control","Incident Reporting","Safety Analytics"],
    icon: ShieldAlert,
    color: '#EF4444',
    type: 'agent' as const,
    humanCost: '$54k/year',
    aiCost: '$1.1k/year',
    efficiency: '15x efficiency improvement',
    replacesRole: 'Campus Safety Director',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.7%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3,500',
      tasksAutomatedDaily: 55,
      responseTime: '<1s',
      accuracyRate: '97%',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}