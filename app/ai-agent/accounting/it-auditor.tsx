import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Laptop } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'it-auditor',
    name: 'IT Auditor',
    title: 'IT Auditor',
    description: 'IT auditor evaluating information systems controls, cybersecurity, data integrity, and technology risk management.',
    capabilities: [
      "IT Control Assessment",
      "Cybersecurity Audit",
      "Data Integrity Verification",
      "System Access Review",
      "Technology Risk Analysis",
      "IT Governance Evaluation"
    ],
    icon: Laptop,
    color: '#0277BD',
    type: 'agent' as const,
    humanCost: '$95k/year',
    aiCost: '$1.5k/year',
    efficiency: '63x efficiency improvement',
    replacesRole: 'IT Auditor',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$7.8',
      tasksAutomatedDaily: 2456,
      responseTime: '0.8s',
      accuracyRate: '98.5%',
    },
    hierarchy: {
      department: 'Accounting',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
