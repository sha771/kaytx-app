import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { FileText } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'financial-reporting-manager',
    name: 'Financial Reporting Manager',
    title: 'Financial Reporting Manager',
    description: 'Manager overseeing financial reporting processes, ensuring accurate and timely financial statements and regulatory filings.',
    capabilities: [
      "Financial Reporting Oversight",
      "Financial Statement Preparation",
      "Regulatory Filing Management",
      "Reporting Team Leadership",
      "GAAP/IFRS Compliance",
      "Audit Coordination"
    ],
    icon: FileText,
    color: '#0D47A1',
    type: 'agent' as const,
    humanCost: '$105k/year',
    aiCost: '$1.8k/year',
    efficiency: '58x efficiency improvement',
    replacesRole: 'Financial Reporting Manager',
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
      accuracyRate: '98.6%',
    },
    hierarchy: {
      department: 'Accounting',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
