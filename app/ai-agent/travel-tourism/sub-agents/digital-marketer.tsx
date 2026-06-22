import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { MonitorPlay } from 'lucide-react-native';

export default function DigitalMarketerPage() {
  const agent = {
    id: 'digital-marketer',
    name: 'AI Digital Marketer',
    title: 'AI Digital Marketer',
    description: 'The AI Digital Marketer executes digital marketing campaigns, manages online channels, optimizes digital presence, and drives customer acquisition through digital channels.",
    capabilities: ["Task Automation","Data Processing","Workflow Management","Digital Marketing","Campaign Management","Channel Management","SEO Optimization","Content Marketing","Social Media","Analytics"],
    icon: MonitorPlay,
    color: '#C62828',
    type: 'employee' as const,
    humanCost: '$65k/year',
    aiCost: '$1.5k/year',
    efficiency: '43x efficiency improvement',
    replacesRole: 'digital-marketer',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.7%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$5,300',
      tasksAutomatedDaily: 400,
      responseTime: '1.2s',
      accuracyRate: '97.5%',
    },
    hierarchy: {
      department: 'Travel & Tourism',
      level: 'marketer',
      reportsTo: 'vp-tourism-marketing',
      manages: [],
    },
    specializedCapabilities: [
      'Digital Marketing',
      'Campaign Management',
      'Channel Management',
      'SEO Optimization',
      'Content Marketing',
      'Social Media',
      'Analytics',
      'Conversion Optimization'
    ],
    integrationOptions: [
      'Marketing Platforms',
      'Social Media Tools',
      'SEO Tools',
      'Analytics Platforms',
      'Content Management',
      'Advertising Platforms',
      'CRM Systems'
    ],
    automationFeatures: [
      'Digital Marketing',
      'Campaign Management',
      'Channel Management',
      'SEO Optimization',
      'Content Marketing',
      'Social Media',
      'Analytics',
      'Conversion Optimization'
    ],
    kpiMetrics: [
      'Campaign ROI',
      'Digital Engagement',
      'Conversion Rate',
      'Traffic Growth',
      'SEO Ranking',
      'Social Reach',
      'Content Performance',
      'Acquisition Cost'
    ],
    customOptions: {
      roiFocus: 'high',
      engagementTarget: 'high',
      conversionFocus: 'high',
      seoTarget: 'high',
      contentQuality: 'high'
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
      { id: 'digital', enabled: true, name: 'Digital Optimizer', description: 'Optimizes digital marketing' },
      { id: 'campaign', enabled: true, name: 'Campaign Manager', description: 'Manages campaigns' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'digital_mkt_1', name: 'Digital Marketing', category: 'Digital', description: 'Execute digital marketing', level: 'expert' },
      { id: 'digital_mkt_2', name: 'Campaign Management', category: 'Campaign', description: 'Manage campaigns', level: 'expert' },
      { id: 'digital_mkt_3', name: 'SEO Optimization', category: 'SEO', description: 'Optimize SEO', level: 'expert' },
      { id: 'digital_mkt_4', name: 'Content Marketing', category: 'Content', description: 'Execute content marketing', level: 'advanced' },
      { id: 'digital_mkt_5', name: 'Analytics', category: 'Analytics', description: 'Analyze marketing data', level: 'advanced' }
    ],
    personality: [
      { trait: 'Creativity', value: 10, description: 'Highly creative' },
      { trait: 'Data Driven', value: 10, description: 'Data-driven' },
      { trait: 'Digital Focus', value: 10, description: 'Digital-first' },
      { trait: 'Results Focus', value: 9, description: 'Results-oriented' },
      { trait: 'Innovation', value: 9, description: 'Innovative marketer' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
