import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { CheckCircle2 } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'compliance-auditor',
    name: 'Compliance Auditor',
    title: 'Compliance Auditor',
    description: 'Auditor specializing in regulatory compliance assessment, ensuring adherence to laws, regulations, and industry standards.',
    capabilities: [
      "Regulatory Compliance Assessment",
      "Policy Adherence Review",
      "Compliance Gap Analysis",
      "Regulatory Update Monitoring",
      "Compliance Training Support",
      "Compliance Reporting"
    ],
    icon: CheckCircle2,
    color: '#2E7D32',
    type: 'agent' as const,
    humanCost: '$85k/year',
    aiCost: '$1.5k/year',
    efficiency: '56x efficiency improvement',
    replacesRole: 'Compliance Auditor',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$6.9',
      tasksAutomatedDaily: 2345,
      responseTime: '0.8s',
      accuracyRate: '98.2%',
    },
    hierarchy: {
      department: 'Accounting',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
