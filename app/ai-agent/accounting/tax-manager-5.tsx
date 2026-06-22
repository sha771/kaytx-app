import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { FileText } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'tax-manager-5',
    name: 'Tax Manager V',
    title: 'Tax Manager V',
    description: 'Senior tax manager overseeing tax technology systems, automation implementation, and digital transformation of tax processes.',
    capabilities: [
      "Tax Technology Implementation",
      "Process Automation",
      "Digital Tax Transformation",
      "System Integration",
      "Data Analytics for Tax",
      "Workflow Optimization"
    ],
    icon: FileText,
    color: '#2196F3',
    type: 'agent' as const,
    humanCost: '$120k/year',
    aiCost: '$1.9k/year',
    efficiency: '63x efficiency improvement',
    replacesRole: 'Tax Manager V',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$9.8',
      tasksAutomatedDaily: 3020,
      responseTime: '0.7s',
      accuracyRate: '98.7%',
    },
    hierarchy: {
      department: 'Accounting',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
