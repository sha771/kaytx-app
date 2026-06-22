import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Building } from 'lucide-react-native';

export default function VenueManagerPage() {
  const agent = {
    id: 'venue-manager',
    name: 'AI Venue Manager',
    title: 'AI Venue Manager',
    description: 'The AI Venue Manager manages venue selection, coordinates venue operations, handles site logistics, and ensures venues meet event requirements and standards.',
    capabilities: ["Task Automation","Data Processing","Workflow Management","Venue Selection","Site Operations","Logistics Coordination","Vendor Relations","Inspection Management","Contract Management","Space Planning"],
    icon: Building,
    color: '#795548',
    type: 'employee' as const,
    humanCost: '$90k/year',
    aiCost: '$2.5k/year',
    efficiency: '36x efficiency improvement',
    replacesRole: 'venue-manager',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$7,292',
      tasksAutomatedDaily: 650,
      responseTime: '1.7s',
      accuracyRate: '96.5%',
    },
    hierarchy: {
      department: 'Event Management',
      level: 'manager',
      reportsTo: 'vp-event-logistics',
      manages: ['site-coordinator', 'venue-inspector', 'space-planner'],
    },
    specializedCapabilities: [
      'Venue Selection',
      'Site Operations',
      'Logistics Coordination',
      'Vendor Relations',
      'Inspection Management',
      'Contract Management',
      'Space Planning',
      'Facility Management',
      'Site Preparation',
      'Venue Compliance'
    ],
    integrationOptions: [
      'Venue Management Systems',
      'Site Inspection Tools',
      'Contract Management Software',
      'Space Planning Applications',
      'Facility Management Systems',
      'Communication Platforms',
      'Project Management Tools',
      'Mapping Systems'
    ],
    automationFeatures: [
      'Venue Search',
      'Site Inspection',
      'Contract Management',
      'Space Planning',
      'Logistics Coordination',
      'Vendor Communication',
      'Compliance Checks',
      'Report Generation'
    ],
    kpiMetrics: [
      'Venue Satisfaction',
      'Site Readiness',
      'Cost Efficiency',
      'Contract Compliance',
      'Space Utilization',
      'Inspection Results',
      'Vendor Performance',
      'Timeline Adherence'
    ],
    customOptions: {
      qualityStandard: 'high',
      costEfficiency: 'optimized',
      complianceLevel: 'strict',
      spaceOptimization: 'high',
      vendorQuality: 'premium'
    },
    advancedFeatures: {
      a2aCommunication: true,
      d2dCommunication: true,
      selfImprovement: true,
      selfLearning: true,
      predictiveInsights: true,
      anomalyDetection: true,
      sentimentAnalysis: false,
      unlimitedMemory: true,
      taskHistory: true,
      crossAgentCollaboration: true,
      departmentIntegration: true,
    },
    intelligenceFeatures: [
      { id: 'venue', enabled: true, name: 'Venue Analyzer', description: 'Analyzes venue suitability' },
      { id: 'anomaly', enabled: true, name: 'Anomaly Detector', description: 'Detects venue issues' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'vm_1', name: 'Venue Selection', category: 'Selection', description: 'Select optimal venues', level: 'expert' },
      { id: 'vm_2', name: 'Site Operations', category: 'Operations', description: 'Manage site operations', level: 'expert' },
      { id: 'vm_3', name: 'Space Planning', category: 'Planning', description: 'Plan venue spaces', level: 'expert' },
      { id: 'vm_4', name: 'Contract Management', category: 'Contract', description: 'Manage venue contracts', level: 'advanced' },
      { id: 'vm_5', name: 'Facility Management', category: 'Facility', description: 'Manage facilities', level: 'advanced' }
    ],
    personality: [
      { trait: 'Detail Oriented', value: 10, description: 'Meticulous attention to detail' },
      { trait: 'Site Knowledge', value: 10, description: 'Deep venue expertise' },
      { trait: 'Negotiation', value: 9, description: 'Strong negotiation skills' },
      { trait: 'Quality Focus', value: 9, description: 'Focus on quality standards' },
      { trait: 'Organization', value: 9, description: 'Well-organized' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
