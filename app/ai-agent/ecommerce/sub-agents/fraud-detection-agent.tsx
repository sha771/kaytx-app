import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Shield } from 'lucide-react-native';

export default function FraudDetectionAgentPage() {
  const agent = {
    id: 'fraud-detection-agent',
    name: 'AI Fraud Detection Agent',
    title: 'E-Commerce Agent',
    description: 'Automated Fraud Detection Agent agent specializing in fraud detection with advanced AI capabilities for task automation, data processing, and workflow coordination.',
    capabilities: ["Task Automation","Data Processing","Workflow Coordination","Fraud Detection","Risk Assessment","Pattern Recognition","Investigation","Prevention"],
    icon: Shield,
    color: '#C62828',
    type: 'agent' as const,
    humanCost: '$70k/year',
    aiCost: '$1.5k/year',
    efficiency: '46x efficiency improvement',
    replacesRole: 'Fraud Detection Agent',
    infrastructure: {
      status: 'online' as const,
      health: 98,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$5,700',
      tasksAutomatedDaily: 380,
      responseTime: '1.5s',
      accuracyRate: '99.0%',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
