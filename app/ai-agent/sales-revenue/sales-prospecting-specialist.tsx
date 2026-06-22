import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { DollarSign } from 'lucide-react-native';

export default function SalesProspectingSpecialistPage() {
  const agent = {
    id: 'sales-prospecting-specialist',
    name: 'AI Sales Prospecting Specialist',
    title: 'AI Sales Prospecting Specialist',
    description: 'The AI Sales Prospecting Specialist identifies prospects, qualifies leads, and builds prospect pipelines.',
    capabilities: ["Task Automation","Data Processing","Prospect Identification","Lead Qualification","Pipeline Building","Communication","Analytics","Prospecting Intelligence"],
    icon: DollarSign,
    color: '#10B981',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$3k/year',
    efficiency: '22x efficiency improvement',
    replacesRole: 'sales-prospecting-specialist',
    infrastructure: {
      status: 'online' as const,
      health: 98,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$5,200',
      tasksAutomatedDaily: 280,
      responseTime: '0.6s',
      accuracyRate: '97.8%',
    },
    hierarchy: {
      department: 'Sales & Revenue',
      level: 'management',
      reportsTo: 'vp-sales',
      manages: [],
    },
    specializedCapabilities: [
      'Prospect Identification',
      'Lead Qualification',
      'Pipeline Building',
      'Communication',
      'Analytics',
      'Prospecting Intelligence'
    ],
    integrationOptions: [
      'CRM Systems',
      'Prospecting Platforms',
      'Lead Sources',
      'Analytics Systems',
      'Communication Platforms',
      'Sales Systems',
      'Data Enrichment',
      'Performance Tracking'
    ],
    automationFeatures: [
      'Prospect Identification',
      'Lead Qualification',
      'Pipeline Building',
      'Communication Automation',
      'Analytics Generation',
      'Performance Tracking',
      'Prospecting Intelligence'
    ],
    kpiMetrics: [
      'Prospect Quality',
      'Lead Conversion',
      'Pipeline Growth',
      'Communication Effectiveness',
      'Prospecting Intelligence',
      'Cost Efficiency',
      'Performance Metrics'
    ],
    customOptions: {
      prospectingFocus: 'high',
      leadQuality: 'maximum',
      pipelineGrowth: 'optimized',
      integrationLevel: 'comprehensive'
    },
    advancedFeatures: {
      a2aCommunication: true,
      d2dCommunication: true,
      selfImprovement: true,
      selfLearning: true,
      predictiveInsights: true,
      anomalyDetection: true,
      sentimentAnalysis: true,
      unlimitedMemory: true,
      taskHistory: true,
      crossAgentCollaboration: true,
      departmentIntegration: true,
    },
    intelligenceFeatures: [
      { id: 'prospecting', enabled: true, name: 'Prospecting Engine', description: 'Identifies prospects' },
      { id: 'qualification', enabled: true, name: 'Lead Qualifier', description: 'Qualifies leads' },
      { id: 'pipeline', enabled: true, name: 'Pipeline Builder', description: 'Builds pipeline' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'sales_1', name: 'Prospect Identification', category: 'Prospecting', description: 'Identify prospects', level: 'expert' },
      { id: 'sales_2', name: 'Lead Qualification', category: 'Qualification', description: 'Qualify leads', level: 'expert' },
      { id: 'sales_3', name: 'Pipeline Building', category: 'Pipeline', description: 'Build pipeline', level: 'expert' },
      { id: 'sales_4', name: 'Communication', category: 'Communication', description: 'Communicate effectively', level: 'expert' },
      { id: 'sales_5', name: 'Analytics', category: 'Analytics', description: 'Analyze data', level: 'expert' }
    ],
    personality: [
      { trait: 'Prospecting Expertise', value: 10, description: 'Prospecting expertise' },
      { trait: 'Lead Focus', value: 10, description: 'Lead oriented' },
      { trait: 'Pipeline Building', value: 10, description: 'Pipeline builder' },
      { trait: 'Communication', value: 10, description: 'Excellent communication' },
      { trait: 'Professionalism', value: 9, description: 'Highly professional' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
