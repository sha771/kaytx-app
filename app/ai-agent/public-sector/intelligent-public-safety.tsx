import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { AlertCircle } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'intelligent-public-safety',
    name: 'AI Intelligent Public Safety',
    title: 'Intelligent Public Safety',
    description: 'Intelligent public safety and security systems with AI monitoring',
    capabilities: ["Public Safety","Security Systems","Emergency Response","Risk Prevention"],
    icon: AlertCircle,
    color: '#1565C0',
    type: 'employee' as const,
    humanCost: '$110k/year',
    aiCost: '$3.0k/year',
    efficiency: '36x efficiency improvement',
    replacesRole: 'Public Safety Director',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$8.9k',
      tasksAutomatedDaily: 245,
      responseTime: '0.8s',
      accuracyRate: '96.5%',
    },
    hierarchy: {
      department: 'Public Sector',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
