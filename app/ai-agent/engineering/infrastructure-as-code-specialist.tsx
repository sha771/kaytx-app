import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Code } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'infrastructure-as-code-specialist',
    name: 'Infrastructure as Code Specialist',
    title: 'Engineering',
    description: 'The Infrastructure as Code Specialist manages infrastructure provisioning through code using Terraform, CloudFormation, and Ansible.',
    capabilities: ["Terraform Development","CloudFormation Templates","Ansible Playbooks","Infrastructure Versioning","Resource Management","Environment Parity"],
    icon: Code,
    color: '#1565C0',
    type: 'agent' as const,
    humanCost: '$96k/year',
    aiCost: '$1k/year',
    efficiency: '96x efficiency improvement',
    replacesRole: 'Engineering',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$7',
      tasksAutomatedDaily: 612,
      responseTime: '1.1s',
      accuracyRate: '96.5%',
    },
    hierarchy: {
      department: 'Engineering',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
