import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { MapPin } from 'lucide-react-native';

export default function LastMileDeliveryAgentPage() {
  const agent = {
    id: 'last-mile-delivery-agent',
    name: 'AI Last Mile Delivery Agent',
    title: 'E-Commerce Agent',
    description: 'Automated Last Mile Delivery Agent agent specializing in last-mile delivery with advanced AI capabilities for task automation, data processing, and workflow coordination.',
    capabilities: ["Task Automation","Data Processing","Workflow Coordination","Last Mile Delivery","Route Optimization","Driver Coordination","Customer Communication","Delivery Tracking"],
    icon: MapPin,
    color: '#FF5722',
    type: 'agent' as const,
    humanCost: '$52k/year',
    aiCost: '$1.5k/year',
    efficiency: '34x efficiency improvement',
    replacesRole: 'Last Mile Delivery Agent',
    infrastructure: {
      status: 'online' as const,
      health: 96,
      uptime: '99.6%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4,200',
      tasksAutomatedDaily: 280,
      responseTime: '2.7s',
      accuracyRate: '96.5%',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
