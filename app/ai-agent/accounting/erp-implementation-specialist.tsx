import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Settings2 } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'erp-implementation-specialist',
    name: 'ERP Implementation Specialist',
    title: 'ERP Implementation Specialist',
    description: 'Specialist managing ERP system implementations, migrations, and system integration projects for accounting systems.',
    capabilities: [
      "ERP Implementation Management",
      "System Migration",
      "Data Migration",
      "Process Mapping",
      "Integration Configuration",
      "Go-Live Support"
    ],
    icon: Settings2,
    color: '#4527A0',
    type: 'agent' as const,
    humanCost: '$105k/year',
    aiCost: '$1.8k/year',
    efficiency: '58x efficiency improvement',
    replacesRole: 'ERP Implementation Specialist',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$8.6',
      tasksAutomatedDaily: 2765,
      responseTime: '0.7s',
      accuracyRate: '98.4%',
    },
    hierarchy: {
      department: 'Accounting',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
