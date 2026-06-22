import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Target } from 'lucide-react-native';

export default function RetailSalesLeadPage() {
  const agent = {
    id: 'retail-sales-lead',
    name: 'AI Retail Sales Lead',
    title: 'AI Retail Sales Lead',
    description: 'The AI Retail Sales Lead drives retail banking sales initiatives, manages sales targets, coaches sales teams, and develops strategies for product cross-selling and customer acquisition.',
    capabilities: ["Task Automation","Data Processing","Workflow Management","Sales Management","Target Setting","Team Coaching","Cross-Selling","Customer Acquisition","Sales Analytics","Performance Tracking"],
    icon: Target,
    color: '#2E7D32',
    type: 'employee' as const,
    humanCost: '$90k/year',
    aiCost: '$2k/year',
    efficiency: '45x efficiency improvement',
    replacesRole: 'retail-sales-lead',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.7%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$7,300',
      tasksAutomatedDaily: 480,
      responseTime: '1.7s',
      accuracyRate: '97.0%',
    },
    hierarchy: {
      department: 'Banking & Finance',
      level: 'specialist',
      reportsTo: 'vp-retail-banking',
      manages: [],
    },
    specializedCapabilities: [
      'Sales Management',
      'Target Setting',
      'Team Coaching',
      'Cross-Selling',
      'Customer Acquisition',
      'Sales Analytics',
      'Performance Tracking',
      'Product Knowledge',
      'Sales Strategy',
      'Incentive Management'
    ],
    integrationOptions: [
      'CRM Systems',
      'Sales Platforms',
      'Analytics Tools',
      'Training Platforms',
      'Performance Management Systems',
      'Commission Systems',
      'Marketing Automation',
      'Reporting Tools'
    ],
    automationFeatures: [
      'Sales Tracking',
      'Target Monitoring',
      'Performance Analytics',
      'Coaching Delivery',
      'Lead Management',
      'Cross-Sell Opportunities',
      'Sales Reporting',
      'Incentive Calculation'
    ],
    kpiMetrics: [
      'Sales Targets',
      'Cross-Sell Ratio',
      'Customer Acquisition',
      'Team Performance',
      'Product Adoption',
      'Revenue Growth',
      'Conversion Rate',
      'Sales Cycle Time'
    ],
    customOptions: {
      salesFocus: 'high',
      targetAmbition: 'aggressive',
      coachingIntensity: 'moderate',
      customerCentricity: 'balanced',
      automationLevel: 'high'
    },
    advancedFeatures: {
      a2aCommunication: true,
      d2dCommunication: false,
      selfImprovement: true,
      selfLearning: true,
      predictiveInsights: true,
      anomalyDetection: false,
      sentimentAnalysis: false,
      unlimitedMemory: true,
      taskHistory: true,
      crossAgentCollaboration: true,
      departmentIntegration: true,
    },
    intelligenceFeatures: [
      { id: 'predictive', enabled: true, name: 'Predictive Engine', description: 'Forecasts sales performance' },
      { id: 'opportunity', enabled: true, name: 'Opportunity Detector', description: 'Identifies sales opportunities' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'rs_1', name: 'Sales Management', category: 'Sales', description: 'Manage sales operations', level: 'expert' },
      { id: 'rs_2', name: 'Team Coaching', category: 'Coaching', description: 'Coach sales teams', level: 'expert' },
      { id: 'rs_3', name: 'Cross-Selling', category: 'Sales', description: 'Drive cross-selling initiatives', level: 'expert' },
      { id: 'rs_4', name: 'Customer Acquisition', category: 'Acquisition', description: 'Acquire new customers', level: 'advanced' },
      { id: 'rs_5', name: 'Sales Analytics', category: 'Analytics', description: 'Analyze sales performance', level: 'expert' }
    ],
    personality: [
      { trait: 'Sales Driven', value: 10, description: 'Highly sales-oriented' },
      { trait: 'Goal Oriented', value: 10, description: 'Focus on achieving targets' },
      { trait: 'Motivational', value: 9, description: 'Motivates team effectively' },
      { trait: 'Strategic', value: 9, description: 'Strategic sales approach' },
      { trait: 'Persistent', value: 9, description: 'Persistent in pursuing goals' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
