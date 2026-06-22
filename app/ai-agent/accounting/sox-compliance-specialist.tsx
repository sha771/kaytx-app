import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Badge } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'sox-compliance-specialist',
    name: 'SOX Compliance Specialist',
    title: 'SOX Compliance Specialist',
    description: 'Specialist ensuring Sarbanes-Oxley compliance, managing Section 404 documentation, and coordinating SOX audits.',
    capabilities: [
      "SOX 404 Documentation",
      "Control Assessment",
      "SOX Audit Coordination",
      "Deficiency Management",
      "SOX Training",
      "Process Documentation"
    ],
    icon: Badge,
    color: '#1B5E20',
    type: 'agent' as const,
    humanCost: '$95k/year',
    aiCost: '$1.5k/year',
    efficiency: '63x efficiency improvement',
    replacesRole: 'SOX Compliance Specialist',
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
      accuracyRate: '98.7%',
    },
    hierarchy: {
      department: 'Accounting',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
