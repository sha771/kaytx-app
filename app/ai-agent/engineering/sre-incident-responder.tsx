import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { AlertTriangle } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'sre-incident-responder',
    name: 'SRE Incident Responder',
    title: 'Engineering',
    description: 'The SRE Incident Responder manages incident response, coordinates teams during outages, and implements post-incident reviews.',
    capabilities: ["Incident Management","On-call Coordination","Root Cause Analysis","Post-Incident Reviews","Communication Management","Escalation Protocols"],
    icon: AlertTriangle,
    color: '#FF9800',
    type: 'agent' as const,
    humanCost: '$97k/year',
    aiCost: '$1k/year',
    efficiency: '97x efficiency improvement',
    replacesRole: 'Engineering',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$8',
      tasksAutomatedDaily: 654,
      responseTime: '0.9s',
      accuracyRate: '96.8%',
    },
    hierarchy: {
      department: 'Engineering',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
