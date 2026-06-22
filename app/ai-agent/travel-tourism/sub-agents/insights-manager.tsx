import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Lightbulb } from 'lucide-react-native';

export default function InsightsManagerPage() {
  const agent = {
    id: 'insights-manager',
    name: 'AI Insights Manager',
    title: 'AI Insights Manager',
    description: 'The AI Insights Manager generates actionable insights, analyzes business performance, identifies opportunities, and drives data-informed decision making.",
    capabilities: ["Task Automation","Data Processing","Workflow Management","Insight Generation","Performance Analysis","Opportunity Identification","Decision Support","Strategic Recommendations","Business Intelligence","Impact Measurement"],
    icon: Lightbulb,
    color: '#43A047',
    type: 'employee' as const,
    humanCost: '$75k/year',
    aiCost: '$1.8k/year',
    efficiency: '41x efficiency improvement',
    replacesRole: 'insights-manager',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.7%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$6,100',
      tasksAutomatedDaily: 450,
      responseTime: '1.3s',
      accuracyRate: '97.5%',
    },
    hierarchy: {
      department: 'Travel & Tourism',
      level: 'manager',
      reportsTo: 'vp-tourism-analytics',
      manages: [],
    },
    specializedCapabilities: [
      'Insight Generation',
      'Performance Analysis',
      'Opportunity Identification',
      'Decision Support',
      'Strategic Recommendations',
      'Business Intelligence',
      'Impact Measurement',
      'Action Planning'
    ],
    integrationOptions: [
      'BI Platforms',
      'Analytics Systems',
      'Data Warehouses',
      'Decision Support Tools',
      'Communication Systems',
      'Strategic Planning',
      'Performance Management'
    ],
    automationFeatures: [
      'Insight Generation',
      'Performance Analysis',
      'Opportunity Identification',
      'Decision Support',
      'Strategic Recommendations',
      'Business Intelligence',
      'Impact Measurement',
      'Action Planning'
    ],
    kpiMetrics: [
      'Insight Quality',
      'Actionability',
      'Impact Measurement',
      'Decision Support',
      'Strategic Value',
      'Opportunity Capture',
      'BI Effectiveness',
      'Action Completion'
    ],
    customOptions: {
      insightQuality: 'high',
      actionability: 'high',
      strategicValue: 'high',
      impactMeasurement: 'high',
      decisionSupport: 'high'
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
      { id: 'insight', enabled: true, name: 'Insight Generator', description: 'Generates insights' },
      { id: 'opportunity', enabled: true, name: 'Opportunity Finder', description: 'Finds opportunities' },
      { id: 'impact', enabled: true, name: 'Impact Measurer', description: 'Measures impact' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'insights_mgr_1', name: 'Insight Generation', category: 'Insight', description: 'Generate insights', level: 'expert' },
      { id: 'insights_mgr_2', name: 'Performance Analysis', category: 'Performance', description: 'Analyze performance', level: 'expert' },
      { id: 'insights_mgr_3', name: 'Opportunity Identification', category: 'Opportunity', description: 'Identify opportunities', level: 'expert' },
      { id: 'insights_mgr_4', name: 'Decision Support', category: 'Decision', description: 'Support decisions', level: 'expert' },
      { id: 'insights_mgr_5', name: 'Strategic Recommendations', category: 'Strategy', description: 'Provide strategic recommendations', level: 'advanced' }
    ],
    personality: [
      { trait: 'Strategic Thinking', value: 10, description: 'Strategic thinker' },
      { trait: 'Insight Driven', value: 10, description: 'Insight-oriented' },
      { trait: 'Data Driven', value: 10, description: 'Data-driven' },
      { id: 'analytical', value: 9, description: 'Analytical thinker' },
      { trait: 'Action Oriented', value: 9, description: 'Action-oriented' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
