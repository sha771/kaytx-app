import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Cpu } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'ai-anomaly-detector',
    name: 'AI Anomaly Detector',
    title: 'Anomaly Detector',
    description: 'AI Anomaly Detector - Anomaly Detector level AI agent in the analytics insights department. Part of the Kaytx AI Workforce hierarchy providing specialized analytics insights capabilities.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Cpu,
    color: 'hsl(258, 70%, 50%)',
    type: 'agent' as const,
    humanCost: '$70k/year',
    aiCost: '$1k/year',
    efficiency: '70x efficiency improvement',
    replacesRole: 'Anomaly Detector',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$5',
      tasksAutomatedDaily: 1047,
      responseTime: '0.9s',
      accuracyRate: '97.7%',
    },
    hierarchy: {
      department: 'analytics insights',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
