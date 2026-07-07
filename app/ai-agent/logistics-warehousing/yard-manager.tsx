import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { MapPin } from 'lucide-react-native';

export default function YardManagerPage() {
  const agent = {
    id: 'yard-manager',
    name: 'AI Yard Manager',
    title: 'Yard Manager',
    description: 'The AI Yard Manager manages yard operations, coordinates trailer movements, optimizes yard space utilization, and ensures efficient yard logistics for inbound and outbound trailers.',
    capabilities: ["Yard Management","Trailer Coordination","Space Optimization","Gate Operations","Dock Door Management","Performance Monitoring","Safety Compliance","Resource Allocation","Reporting","Continuous Improvement"],
    icon: MapPin,
    color: '#3B82F6',
    type: 'employee' as const,
    humanCost: '$58k/year',
    aiCost: '$1.5k/year',
    efficiency: '36x efficiency improvement',
    replacesRole: 'yard-manager',
    infrastructure: {
      status: 'online' as const,
      health: 96,
      uptime: '99.6%',
      lastActive: 'Now',
      processingPower: 'standard' as const,
    },
    roiMetrics: {
      savingsPerMonth: '$4,708',
      tasksAutomatedDaily: 480,
      responseTime: '1.6s',
      accuracyRate: '95.5%',
    },
    hierarchy: {
      department: 'Logistics & Warehousing',
      level: 'manager',
      reportsTo: 'warehouse-manager',
      manages: ['yard-coordinator', 'gate-operator'],
    },
    specializedCapabilities: [
      'Yard Management',
      'Trailer Coordination',
      'Space Optimization',
      'Gate Operations',
      'Dock Door Management',
      'Performance Monitoring',
      'Safety Compliance',
      'Resource Allocation'
    ],
    integrationOptions: [
      'Yard Management Systems',
      'GPS/RTLS',
      'Gate Systems',
      'Dock Door Tools',
      'Analytics Platforms',
      'ERP Integration',
      'Communication Systems'
    ],
    automationFeatures: [
      'Yard Planning',
      'Trailer Coordination',
      'Space Optimization',
      'Gate Operations',
      'Dock Door Management',
      'Performance Tracking',
      'Report Generation'
    ],
    kpiMetrics: [
      'Yard Utilization',
      'Trailer Turnaround',
      'Gate Throughput',
      'Dock Efficiency',
      'Space Efficiency',
      'Safety Incidents',
      'Overall Performance'
    ],
    customOptions: {
      efficiencyLevel: 'high',
      automationLevel: 'intermediate',
      utilizationLevel: 'maximum',
      safetyLevel: 'high'
    },
    advancedFeatures: {
      a2aCommunication: true,
      d2dCommunication: true,
      selfImprovement: true,
      selfLearning: true,
      predictiveInsights: false,
      anomalyDetection: true,
      sentimentAnalysis: false,
      unlimitedMemory: true,
      taskHistory: true,
      crossAgentCollaboration: true,
      departmentIntegration: true,
    },
    agentType: 'learning',
    skills: [
      { id: 'ym1', name: 'Yard Management', category: 'Yard', description: 'Manage yard operations', level: 'expert' },
      { id: 'ym2', name: 'Trailer Coordination', category: 'Trailer', description: 'Coordinate trailers', level: 'expert' },
      { id: 'ym3', name: 'Space Optimization', category: 'Space', description: 'Optimize space', level: 'expert' }
    ],
    personality: [
      { trait: 'Organized', value: 10, description: 'Well-organized' },
      { trait: 'Efficiency', value: 10, description: 'Prioritizes efficiency' },
      { trait: 'Coordination', value: 10, description: 'Excellent coordinator' },
      { trait: 'Safety Conscious', value: 9, description: 'Safety-conscious' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
