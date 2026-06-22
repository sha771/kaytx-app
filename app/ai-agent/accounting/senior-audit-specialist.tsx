import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { ShieldCheck } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'senior-audit-specialist',
    name: 'Senior Audit Specialist',
    title: 'Senior Audit Specialist',
    description: 'The Senior Audit Specialist AI conducts comprehensive internal and external audits, ensuring compliance and identifying financial risks.',
    capabilities: ["Internal Auditing","External Audit Coordination","Compliance Verification","Risk Assessment","Audit Reporting"],
    icon: ShieldCheck,
    color: '#1565C0',
    type: 'agent' as const,
    humanCost: '$95k/year',
    aiCost: '$2k/year',
    efficiency: '47x efficiency improvement',
    replacesRole: 'Senior Auditor',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$7.7',
      tasksAutomatedDaily: 892,
      responseTime: '2.3s',
      accuracyRate: '99.2%',
    },
    hierarchy: {
      department: 'Accounting',
    },
    complianceFeatures: ['AICPA Standards', 'Audit Compliance', 'Risk Management'],
  };
  return <AgentPageWrapper agent={agent} />;
}
