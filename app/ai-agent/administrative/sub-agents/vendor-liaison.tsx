import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { MessageSquare } from 'lucide-react-native';

export default function VendorLiaisonPage() {
  const agent = {
    id: 'vendor-liaison',
    name: 'AI Vendor Liaison',
    title: 'Communication Sub-Agent',
    description: 'Handles vendor communications, negotiation support, and relationship management with automated correspondence tracking.',
    capabilities: ["Task Automation","Data Processing","Workflow Coordination","Performance Reporting","Quality Assurance","Compliance Monitoring"],
    icon: MessageSquare,
    color: '#EC4899',
    type: 'agent' as const,
    humanCost: '$50k/year',
    aiCost: '$1.0k/year',
    efficiency: '15x efficiency improvement',
    replacesRole: 'Vendor Liaison',
    infrastructure: {
      status: 'online',
      health: 95,
      uptime: '99.5%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3,200',
      tasksAutomatedDaily: 75,
      responseTime: '<2s',
      accuracyRate: '94%',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
