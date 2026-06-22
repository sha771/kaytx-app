import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Shield } from 'lucide-react-native';

export default function VPLossPreventionPage() {
  const agent = {
    id: 'vp-loss-prevention',
    name: 'AI VP Loss Prevention',
    title: 'AI VP Loss Prevention',
    description: 'The AI VP Loss Prevention oversees all loss prevention initiatives, manages security, fraud detection, and asset protection to minimize shrinkage and ensure store safety.',
    capabilities: ["Task Automation","Data Processing","Workflow Management","Loss Prevention","Security Management","Fraud Detection","Asset Protection","Risk Assessment","Investigation","Compliance"],
    icon: Shield,
    color: '#424242',
    type: 'employee' as const,
    humanCost: '$165k/year',
    aiCost: '$4k/year',
    efficiency: '41x efficiency improvement',
    replacesRole: 'vp-loss-prevention',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$13,400',
      tasksAutomatedDaily: 880,
      responseTime: '1.1s',
      accuracyRate: '98.0%',
    },
    hierarchy: {
      department: 'Retail & Stores',
      level: 'vp_director',
      reportsTo: 'chief-retail-officer',
      manages: ['loss-prevention-manager', 'security-manager', 'fraud-investigator', 'audit-specialist'],
    },
    specializedCapabilities: [
      'Loss Prevention Strategy',
      'Security Management',
      'Fraud Detection',
      'Asset Protection',
      'Risk Assessment',
      'Investigation',
      'Compliance',
      'Incident Response'
    ],
    integrationOptions: [
      'Security Systems',
      'Surveillance Platforms',
      'Fraud Detection Tools',
      'Analytics Platforms',
      'Communication Systems',
      'Incident Management',
      'Audit Systems',
      'Reporting Platforms'
    ],
    automationFeatures: [
      'Security Monitoring',
      'Fraud Detection',
      'Risk Assessment',
      'Investigation Support',
      'Incident Response',
      'Audit Management',
      'Report Generation',
      'Alert Management'
    ],
    kpiMetrics: [
      'Shrinkage Rate',
      'Fraud Detection Rate',
      'Security Incidents',
      'Asset Loss',
      'Investigation Resolution',
      'Compliance Rate',
      'Cost Savings',
      'Safety Incidents'
    ],
    customOptions: {
      securityFocus: 'high',
      fraudDetection: 'strict',
      riskManagement: 'high',
      investigationSpeed: 'fast',
      complianceLevel: 'strict'
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
      { id: 'fraud', enabled: true, name: 'Fraud Detector', description: 'Detects fraudulent activities' },
      { id: 'risk', enabled: true, name: 'Risk Analyzer', description: 'Analyzes security risks' },
      { id: 'anomaly', enabled: true, name: 'Anomaly Detector', description: 'Detects suspicious patterns' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'loss_1', name: 'Loss Prevention', category: 'Security', description: 'Prevent losses', level: 'expert' },
      { id: 'loss_2', name: 'Security Management', category: 'Security', description: 'Manage security operations', level: 'expert' },
      { id: 'loss_3', name: 'Fraud Detection', category: 'Fraud', description: 'Detect fraud', level: 'expert' },
      { id: 'loss_4', name: 'Investigation', category: 'Investigation', description: 'Conduct investigations', level: 'advanced' },
      { id: 'loss_5', name: 'Risk Assessment', category: 'Risk', description: 'Assess security risks', level: 'advanced' }
    ],
    personality: [
      { trait: 'Vigilance', value: 10, description: 'Highly vigilant' },
      { trait: 'Integrity', value: 10, description: 'High integrity' },
      { trait: 'Analytical', value: 9, description: 'Analytical thinker' },
      { trait: 'Problem Solving', value: 9, description: 'Excellent problem solver' },
      { trait: 'Leadership', value: 8, description: 'Strong security leadership' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
