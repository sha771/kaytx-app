import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Landmark } from 'lucide-react-native';

export default function CorporateLendingSpecialistPage() {
  const agent = {
    id: 'corporate-lending-specialist',
    name: 'AI Corporate Lending Specialist',
    title: 'AI Corporate Lending Specialist',
    description: 'The AI Corporate Lending Specialist manages corporate lending operations, structures loan deals, manages loan portfolios, and ensures lending compliance and profitability.',
    capabilities: ["Task Automation","Data Processing","Workflow Management","Lending Operations","Loan Structuring","Portfolio Management","Compliance","Risk Management","Deal Execution","Relationship Management"],
    icon: Landmark,
    color: '#2E7D32',
    type: 'employee' as const,
    humanCost: '$100k/year',
    aiCost: '$2.5k/year',
    efficiency: '40x efficiency improvement',
    replacesRole: 'corporate-lending-specialist',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$8,100',
      tasksAutomatedDaily: 540,
      responseTime: '1.5s',
      accuracyRate: '97.0%',
    },
    hierarchy: {
      department: 'Banking & Finance',
      level: 'specialist',
      reportsTo: 'vp-corporate-banking',
      manages: [],
    },
    specializedCapabilities: [
      'Lending Operations',
      'Loan Structuring',
      'Portfolio Management',
      'Compliance',
      'Risk Management',
      'Deal Execution',
      'Relationship Management',
      'Credit Analysis',
      'Pricing Strategy',
      'Documentation'
    ],
    integrationOptions: [
      'Loan Management Systems',
      'Credit Analysis Platforms',
      'Risk Management Tools',
      'Compliance Systems',
      'Portfolio Analytics',
      'Document Management',
      'Pricing Tools',
      'Reporting Platforms'
    ],
    automationFeatures: [
      'Loan Processing',
      'Deal Structuring',
      'Portfolio Monitoring',
      'Compliance Checks',
      'Risk Assessment',
      'Pricing Analysis',
      'Document Generation',
      'Report Creation'
    ],
    kpiMetrics: [
      'Loan Portfolio Growth',
      'Portfolio Quality',
      'Deal Execution Speed',
      'Risk Exposure',
      'Compliance Rate',
      'Profitability',
      'Customer Satisfaction',
      'Market Share'
    ],
    customOptions: {
      riskTolerance: 'moderate',
      growthFocus: 'high',
      complianceLevel: 'strict',
      profitabilityFocus: 'high',
      automationLevel: 'high'
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
      { id: 'predictive', enabled: true, name: 'Predictive Engine', description: 'Forecasts lending performance' },
      { id: 'anomaly', enabled: true, name: 'Anomaly Detector', description: 'Detects lending anomalies' },
      { id: 'risk', enabled: true, name: 'Risk Analyzer', description: 'Analyzes lending risks' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'cls_1', name: 'Lending Operations', category: 'Lending', description: 'Manage lending operations', level: 'expert' },
      { id: 'cls_2', name: 'Loan Structuring', category: 'Structuring', description: 'Structure loan deals', level: 'expert' },
      { id: 'cls_3', name: 'Portfolio Management', category: 'Portfolio', description: 'Manage loan portfolios', level: 'expert' },
      { id: 'cls_4', name: 'Risk Management', category: 'Risk', description: 'Manage lending risks', level: 'advanced' },
      { id: 'cls_5', name: 'Deal Execution', category: 'Execution', description: 'Execute loan deals', level: 'expert' }
    ],
    personality: [
      { trait: 'Deal Oriented', value: 10, description: 'Focus on deal execution' },
      { trait: 'Risk Aware', value: 9, description: 'Risk-conscious approach' },
      { trait: 'Strategic', value: 9, description: 'Strategic lending approach' },
      { trait: 'Analytical', value: 9, description: 'Analytical decision making' },
      { trait: 'Relationship Builder', value: 8, description: 'Builds client relationships' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
