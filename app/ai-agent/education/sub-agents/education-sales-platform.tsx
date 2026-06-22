import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { ShoppingCart } from 'lucide-react-native';

export default function EducationSalesPlatformPage() {
  const agent = {
    id: 'education-sales-platform',
    name: 'AI Education Sales Platform',
    title: 'Education Agent',
    description: 'Automated Education Sales Platform agent specializing in educational sales with advanced AI capabilities for lead management, sales automation, and revenue tracking.',
    capabilities: ["Lead Management","Sales Automation","Revenue Tracking","Customer Relationship Management","Sales Analytics","Pipeline Management"],
    icon: ShoppingCart,
    color: '#3B82F6',
    type: 'agent' as const,
    humanCost: '$50k/year',
    aiCost: '$1.0k/year',
    efficiency: '14x efficiency improvement',
    replacesRole: 'Education Sales Director',
    infrastructure: {
      status: 'online',
      health: 95,
      uptime: '99.5%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3,300',
      tasksAutomatedDaily: 70,
      responseTime: '<2s',
      accuracyRate: '95%',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}