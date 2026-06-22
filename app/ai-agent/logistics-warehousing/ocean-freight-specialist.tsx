import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Anchor } from 'lucide-react-native';

export default function OceanFreightSpecialistPage() {
  const agent = {
    id: 'ocean-freight-specialist',
    name: 'AI Ocean Freight Specialist',
    title: 'Ocean Freight Specialist',
    description: 'The AI Ocean Freight Specialist manages ocean freight shipments, coordinates carrier bookings, optimizes container utilization, and ensures efficient ocean freight operations.',
    capabilities: ["Ocean Freight Management","Carrier Booking","Container Optimization","Route Planning","Documentation","Tracking","Cost Analysis","Compliance","Performance Monitoring","Customer Service"],
    icon: Anchor,
    color: '#8B5CF6',
    type: 'employee' as const,
    humanCost: '$65k/year',
    aiCost: '$1.7k/year',
    efficiency: '38x efficiency improvement',
    replacesRole: 'ocean-freight-specialist',
    infrastructure: {
      status: 'online' as const,
      health: 96,
      uptime: '99.6%',
      lastActive: 'Now',
      processingPower: 'standard' as const,
    },
    roiMetrics: {
      savingsPerMonth: '$5,292',
      tasksAutomatedDaily: 520,
      responseTime: '1.5s',
      accuracyRate: '95.8%',
    },
    hierarchy: {
      department: 'Logistics & Warehousing',
      level: 'specialist',
      reportsTo: 'freight-forwarding-manager',
      manages: [],
    },
    specializedCapabilities: [
      'Ocean Freight Management',
      'Carrier Booking',
      'Container Optimization',
      'Route Planning',
      'Documentation',
      'Tracking',
      'Cost Analysis',
      'Compliance'
    ],
    integrationOptions: [
      'Ocean Freight Platforms',
      'Carrier Portals',
      'Container Systems',
      'Documentation Tools',
      'Tracking Systems',
      'Analytics Platforms',
      'ERP Integration'
    ],
    automationFeatures: [
      'Ocean Freight Planning',
      'Carrier Booking',
      'Container Optimization',
      'Documentation Generation',
      'Tracking Coordination',
      'Cost Analysis',
      'Report Generation'
    ],
    kpiMetrics: [
      'Booking Accuracy',
      'Container Utilization',
      'Transit Time',
      'Documentation Quality',
      'Cost Efficiency',
      'Carrier Performance',
      'Customer Satisfaction'
    ],
    customOptions: {
      efficiencyLevel: 'high',
      automationLevel: 'intermediate',
      costFocus: 'high',
      serviceLevel: 'premium'
    },
    advancedFeatures: {
      a2aCommunication: true,
      d2dCommunication: false,
      selfImprovement: true,
      selfLearning: true,
      predictiveInsights: false,
      anomalyDetection: true,
      sentimentAnalysis: false,
      unlimitedMemory: true,
      taskHistory: true,
      crossAgentCollaboration: true,
      departmentIntegration: false,
    },
    agentType: 'learning',
    skills: [
      { id: 'ofs1', name: 'Ocean Freight', category: 'Ocean', description: 'Manage ocean freight', level: 'expert' },
      { id: 'ofs2', name: 'Container Management', category: 'Container', description: 'Manage containers', level: 'expert' },
      { id: 'ofs3', name: 'Route Planning', category: 'Route', description: 'Plan routes', level: 'expert' }
    ],
    personality: [
      { trait: 'Strategic', value: 10, description: 'Strategic thinker' },
      { trait: 'Detail Oriented', value: 10, description: 'Attention to detail' },
      { trait: 'Global Perspective', value: 10, description: 'Global mindset' },
      { trait: 'Cost Conscious', value: 9, description: 'Cost-focused' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
