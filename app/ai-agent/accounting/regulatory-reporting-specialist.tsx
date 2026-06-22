import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { FileCheck } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'regulatory-reporting-specialist',
    name: 'Regulatory Reporting Specialist',
    title: 'Regulatory Reporting Specialist',
    description: 'Specialist preparing and filing regulatory reports to various government agencies and regulatory bodies.',
    capabilities: [
      "Regulatory Report Preparation",
      "Agency Filing Management",
      "Report Accuracy Verification",
      "Filing Deadline Tracking",
      "Regulatory Update Monitoring",
      "Report Documentation"
    ],
    icon: FileCheck,
    color: '#1565C0',
    type: 'agent' as const,
    humanCost: '$75k/year',
    aiCost: '$1.2k/year',
    efficiency: '62x efficiency improvement',
    replacesRole: 'Regulatory Reporting Specialist',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$6.1',
      tasksAutomatedDaily: 2134,
      responseTime: '0.9s',
      accuracyRate: '98.4%',
    },
    hierarchy: {
      department: 'Accounting',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
