import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Search } from 'lucide-react-native';

export default function FraudInvestigatorPage() {
  const agent = {
    id: 'fraud-investigator',
    name: 'AI Fraud Investigator',
    title: 'AI Fraud Investigator',
    description: 'The AI Fraud Investigator investigates fraudulent activities, analyzes transaction patterns, identifies fraud risks, and prevents financial losses.',
    capabilities: ["Task Automation","Data Processing","Workflow Management","Fraud Investigation","Transaction Analysis","Pattern Recognition","Risk Identification","Evidence Collection","Report Generation","Collaboration"],
    icon: Search,
    color: '#212121',
    type: 'employee' as const,
    humanCost: '$60k/year',
    aiCost: '$1.2k/year',
    efficiency: '50x efficiency improvement',
    replacesRole: 'fraud-investigator',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.7%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4,900',
      tasksAutomatedDaily: 380,
      responseTime: '1.1s',
      accuracyRate: '98.5%',
    },
    hierarchy: {
      department: 'Retail & Stores',
      level: 'analyst',
      reportsTo: 'loss-prevention-manager',
      manages: [],
    },
    specializedCapabilities: [
      'Fraud Investigation',
      'Transaction Analysis',
      'Pattern Recognition',
      'Risk Identification',
      'Evidence Collection',
      'Report Generation',
      'Collaboration',
      'Fraud Prevention'
    ],
    integrationOptions: [
      'Transaction Systems',
      'Analytics Platforms',
      'Fraud Detection Tools',
      'Communication Systems',
      'Reporting Platforms',
      'Data Warehouses',
      'Investigation Tools'
    ],
    automationFeatures: [
      'Fraud Detection',
      'Transaction Analysis',
      'Pattern Recognition',
      'Risk Assessment',
      'Evidence Collection',
      'Report Generation',
      'Investigation Support',
      'Collaboration'
    ],
    kpiMetrics: [
      'Fraud Detection Rate',
      'Investigation Accuracy',
      'Response Time',
      'Loss Prevention',
      'Pattern Recognition',
      'Evidence Quality',
      'Report Timeliness',
      'Collaboration Effectiveness'
    ],
    customOptions: {
      detectionAccuracy: 'high',
      responseSpeed: 'fast',
      investigationDepth: 'high',
      preventionFocus: 'high',
      collaboration: 'high'
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
      { id: 'pattern', enabled: true, name: 'Pattern Recognizer', description: 'Recognizes fraud patterns' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'fraud_inv_1', name: 'Fraud Investigation', category: 'Investigation', description: 'Investigate fraud', level: 'expert' },
      { id: 'fraud_inv_2', name: 'Transaction Analysis', category: 'Analysis', description: 'Analyze transactions', level: 'expert' },
      { id: 'fraud_inv_3', name: 'Pattern Recognition', category: 'Pattern', description: 'Recognize patterns', level: 'expert' },
      { id: 'fraud_inv_4', name: 'Risk Identification', category: 'Risk', description: 'Identify risks', level: 'advanced' },
      { id: 'fraud_inv_5', name: 'Evidence Collection', category: 'Evidence', description: 'Collect evidence', level: 'advanced' }
    ],
    personality: [
      { trait: 'Analytical', value: 10, description: 'Highly analytical' },
      { trait: 'Detail Oriented', value: 10, description: 'Detail-oriented' },
      { trait: 'Integrity', value: 10, description: 'High integrity' },
      { trait: 'Persistence', value: 9, description: 'Persistent investigator' },
      { trait: 'Problem Solving', value: 9, description: 'Excellent problem solver' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
