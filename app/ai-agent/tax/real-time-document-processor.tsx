import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { FileText } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'real-time-document-processor',
    name: 'AI Real-Time Document Processor',
    title: 'Real-Time Document Processor',
    description: 'Tax document processing and management with real-time capabilities',
    capabilities: ["Document Processing","Real-Time Management","Content Extraction","Automated Organization"],
    icon: FileText,
    color: '#2E7D32',
    type: 'employee' as const,
    humanCost: '$68k/year',
    aiCost: '$1.7k/year',
    efficiency: '40x efficiency improvement',
    replacesRole: 'Document Processor',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.7%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$5.5k',
      tasksAutomatedDaily: 445,
      responseTime: '0.3s',
      accuracyRate: '98.3%',
    },
    hierarchy: {
      department: 'Tax',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
