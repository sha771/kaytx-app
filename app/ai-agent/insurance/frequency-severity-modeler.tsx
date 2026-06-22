import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Users } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'frequency-severity-modeler',
    uid: 'ktx-16-frequency-severity-modeler',
    name: 'AI Frequency/Severity Modeler',
    title: 'AI Frequency/Severity Modeler',
    description: 'The frequency-severity-modeler AI provides specialized services and automation within the Insurance & Risk department.',
    capabilities: ["Task Automation", "Data Processing", "Workflow Management"],
    icon: Users,
    color: '#FF7043',
    type: 'sub' as const,
    humanCost: '$56k/year',
    aiCost: '$1k/year',
    efficiency: '56x efficiency improvement',
    replacesRole: 'frequency-severity-modeler',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4',
      tasksAutomatedDaily: 970,
      responseTime: '1.6s',
      accuracyRate: '96.7%',
    },
    hierarchy: {
      department: 'Insurance & Risk',
      level: 'specialist',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
