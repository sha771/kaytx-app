import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { FileText } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'tax-specialist-3',
    name: 'Tax Specialist III',
    title: 'Tax Specialist III',
    description: 'Tax specialist focused on indirect taxes, VAT/GST compliance, and sales tax automation for multi-jurisdictional operations.',
    capabilities: [
      "VAT/GST Compliance",
      "Sales Tax Automation",
      "Indirect Tax Planning",
      "Exemption Certificate Management",
      "Use Tax Compliance",
      "Tax Technology"
    ],
    icon: FileText,
    color: '#90CAF9',
    type: 'agent' as const,
    humanCost: '$88k/year',
    aiCost: '$1.3k/year',
    efficiency: '67x efficiency improvement',
    replacesRole: 'Tax Specialist III',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$7.2',
      tasksAutomatedDaily: 2320,
      responseTime: '0.8s',
      accuracyRate: '98.5%',
    },
    hierarchy: {
      department: 'Accounting',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
