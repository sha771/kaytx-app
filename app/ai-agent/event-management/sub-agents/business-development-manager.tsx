import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { TrendingUp } from 'lucide-react-native';

export default function BusinessDevelopmentManagerPage() {
  const agent = {
    id: 'business-development-manager',
    name: 'AI Business Development Manager',
    title: 'AI Business Development Manager',
    description: 'The AI Business Development Manager identifies new business opportunities, builds strategic partnerships, and drives revenue growth for the event business.',
    capabilities: ["Task Automation","Data Processing","Business Development","Partnership Building","Revenue Growth","Market Expansion","Client AcquisitionSales Strategy","Opportunity Identification","Relationship Management"],
    icon: TrendingUp,
    color: '#4CAF50',
    type: 'employee' as const,
    humanCost: '$75k/year',
    aiCost: '$2.5k/year',
    efficiency: '30x efficiency improvement',
    replacesRole: 'business-development-manager',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.7%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$6,042',
      tasksAutomatedDaily: 500,
      responseTime: '1.9s',
      accuracyRate: '96.0%',
    },
    hierarchy: {
      department: 'Event Management',
      level: 'manager',
      reportsTo: 'chief-event-officer',
      manages: [],
    },
    specializedCapabilities: [
      'Business Development',
      'Partnership Building',
      'Revenue Growth',
      'Market Expansion',
      'Client Acquisition',
      'Sales Strategy',
      'Opportunity Identification',
      'Relationship Management',
      'Strategic Alliances',
      'Business Planning'
    ],
    integrationOptions: [
      'CRM Platforms',
      'Sales Tools',
      'Business Intelligence Systems',
      'Partnership Management Software',
      'Analytics Platforms',
      'Communication Tools',
      'Proposal Software',
      'Market Research Tools'
    ],
    automationFeatures: [
      'Lead Generation',
      'Partnership Outreach',
      'Opportunity Tracking',
      'Sales Pipeline Management',
      'Proposal Generation',
      'Relationship Nurturing',
      'Market Analysis',
      'Report Generation'
    ],
    kpiMetrics: [
      'Revenue Growth',
      'New Partnerships',
      'Client Acquisition',
      'Market Expansion',
      'Deal Closure Rate',
      'Partnership Value',
      'Sales Pipeline',
      'Business Impact'
    ],
    customOptions: {
      growthFocus: 'aggressive',
      partnershipQuality: 'strategic',
      marketExpansion: 'targeted',
      revenuePriority: 'high',
      relationshipDepth: 'long-term'
    },
    advancedFeatures: {
      a2aCommunication: true,
      d2dCommunication: false,
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
      { id: 'business', enabled: true, name: 'Business Analyzer', description: 'Analyzes business opportunities' },
      { id: 'predictive', enabled: true, name: 'Predictive Engine', description: 'Forecasts growth opportunities' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'bdm_1', name: 'Business Development', category: 'Business', description: 'Develop business opportunities', level: 'expert' },
      { id: 'bdm_2', name: 'Partnership Building', category: 'Partnership', description: 'Build strategic partnerships', level: 'expert' },
      { id: 'bdm_3', name: 'Revenue Growth', category: 'Revenue', description: 'Drive revenue growth', level: 'expert' }
    ],
    personality: [
      { trait: 'Business Acumen', value: 10, description: 'Strong business sense' },
      { trait: 'Relationship Building', value: 10, description: 'Excellent relationship builder' },
      { trait: 'Strategic Thinking', value: 9, description: 'Strategic approach' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
