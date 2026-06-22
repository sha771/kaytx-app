import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Globe } from 'lucide-react-native';

export default function InternationalOperationsManagerPage() {
  const agent = {
    id: 'international-operations-manager',
    name: 'AI International Operations Manager',
    title: 'AI International Operations Manager',
    description: 'The AI International Operations Manager manages international e-commerce operations, coordinates cross-border activities, and ensures smooth global operations.',
    capabilities: ["Task Automation","Data Processing","Workflow Management","International Operations","Cross-Border Management","Localization","Compliance","Currency Management","Logistics Coordination","Team Leadership"],
    icon: Globe,
    color: '#1565C0',
    type: 'employee' as const,
    humanCost: '$110k/year',
    aiCost: '$3k/year',
    efficiency: '37x efficiency improvement',
    replacesRole: 'international-operations-manager',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$8,900',
      tasksAutomatedDaily: 600,
      responseTime: '1.5s',
      accuracyRate: '97.0%',
    },
    hierarchy: {
      department: 'E-Commerce',
      level: 'manager',
      reportsTo: 'vp-international',
      manages: [],
    },
    specializedCapabilities: [
      'International Operations',
      'Cross-Border Management',
      'Localization',
      'Compliance',
      'Currency Management',
      'Logistics Coordination',
      'Market Expansion',
      'Cultural Adaptation',
      'Risk Management',
      'Team Leadership'
    ],
    integrationOptions: [
      'International Platforms',
      'Localization Tools',
      'Compliance Systems',
      'Currency Platforms',
      'International Logistics',
      'Market Research',
      'Risk Management',
      'Communication Systems'
    ],
    automationFeatures: [
      'International Operations',
      'Cross-Border Management',
      'Localization',
      'Compliance Monitoring',
      'Currency Management',
      'Logistics Coordination',
      'Risk Assessment',
      'Report Generation'
    ],
    kpiMetrics: [
      'International Revenue',
      'Cross-Border Efficiency',
      'Localization Quality',
      'Compliance Rate',
      'Currency Efficiency',
      'Logistics Performance',
      'Market Expansion',
      'Team Productivity'
    ],
    customOptions: {
      globalFocus: 'high',
      localizationLevel: 'deep',
      complianceLevel: 'strict',
      automationLevel: 'high',
      culturalAdaptation: 'high'
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
      { id: 'predictive', enabled: true, name: 'Predictive Engine', description: 'Forecasts international trends' },
      { id: 'anomaly', enabled: true, name: 'Anomaly Detector', description: 'Detects international anomalies' },
      { id: 'market', enabled: true, name: 'Market Analyzer', description: 'Analyzes international markets' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'iom_1', name: 'International Operations', category: 'International', description: 'Manage international operations', level: 'expert' },
      { id: 'iom_2', name: 'Cross-Border Management', category: 'Cross-Border', description: 'Manage cross-border activities', level: 'expert' },
      { id: 'iom_3', name: 'Localization', category: 'Localization', description: 'Manage localization', level: 'expert' },
      { id: 'iom_4', name: 'Compliance', category: 'Compliance', description: 'Ensure compliance', level: 'expert' },
      { id: 'iom_5', name: 'Market Expansion', category: 'Expansion', description: 'Drive market expansion', level: 'advanced' }
    ],
    personality: [
      { trait: 'Global Mindset', value: 10, description: 'Global perspective' },
      { trait: 'Cultural Awareness', value: 10, description: 'High cultural awareness' },
      { trait: 'Strategic', value: 9, description: 'Strategic international planning' },
      { trait: 'Adaptable', value: 9, description: 'Adaptable to different markets' },
      { trait: 'Leadership', value: 9, description: 'Strong leadership' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
