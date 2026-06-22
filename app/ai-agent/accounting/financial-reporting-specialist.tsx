import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { FileSpreadsheet } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'financial-reporting-specialist',
    name: 'Financial Reporting Specialist',
    title: 'Financial Reporting Specialist',
    description: 'Specialist preparing financial statements, management reports, and ensuring compliance with reporting requirements.',
    capabilities: [
      "Financial Statement Preparation",
      "Management Reporting",
      "Report Consolidation",
      "Disclosure Preparation",
      "Reporting Automation",
      "Documentation Management"
    ],
    icon: FileSpreadsheet,
    color: '#1565C0',
    type: 'agent' as const,
    humanCost: '$70k/year',
    aiCost: '$1.2k/year',
    efficiency: '58x efficiency improvement',
    replacesRole: 'Financial Reporting Specialist',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$5.7',
      tasksAutomatedDaily: 2034,
      responseTime: '0.9s',
      accuracyRate: '97.8%',
    },
    hierarchy: {
      department: 'Accounting',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
