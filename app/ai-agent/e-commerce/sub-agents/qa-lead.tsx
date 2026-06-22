import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { CheckCircle } from 'lucide-react-native';

export default function QALeadPage() {
  const agent = {
    id: 'qa-lead',
    name: 'AI QA Lead',
    title: 'AI QA Lead',
    description: 'The AI QA Lead manages quality assurance processes, oversees testing strategies, ensures software quality, and drives continuous improvement of testing practices.',
    capabilities: ["Task Automation","Data Processing","Workflow Management","Quality Assurance","Testing Strategy","Test Automation","Quality Metrics","Bug Tracking","Performance Testing","Team Leadership"],
    icon: CheckCircle,
    color: '#2E7D32',
    type: 'employee' as const,
    humanCost: '$110k/year',
    aiCost: '$3k/year',
    efficiency: '37x efficiency improvement',
    replacesRole: 'qa-lead',
    infrastructure: {
      status: 'online' as const,
      health: 98,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$8,900',
      tasksAutomatedDaily: 600,
      responseTime: '1.5s',
      accuracyRate: '97.5%',
    },
    hierarchy: {
      department: 'E-Commerce',
      level: 'specialist',
      reportsTo: 'vp-technology',
      manages: [],
    },
    specializedCapabilities: [
      'Quality Assurance',
      'Testing Strategy',
      'Test Automation',
      'Quality Metrics',
      'Bug Tracking',
      'Performance Testing',
      'Security Testing',
      'Regression Testing',
      'Quality Planning',
      'Team Leadership'
    ],
    integrationOptions: [
      'Testing Platforms',
      'Automation Tools',
      'Bug Tracking Systems',
      'Performance Tools',
      'Security Testing',
      'CI/CD Integration',
      'Quality Metrics',
      'Reporting Platforms'
    ],
    automationFeatures: [
      'Test Automation',
      'Quality Monitoring',
      'Bug Tracking',
      'Performance Testing',
      'Security Testing',
      'Regression Testing',
      'Quality Reporting',
      'Test Planning'
    ],
    kpiMetrics: [
      'Test Coverage',
      'Bug Detection Rate',
      'Test Automation',
      'Quality Score',
      'Release Quality',
      'Bug Fix Time',
      'Test Efficiency',
      'Team Productivity'
    ],
    customOptions: {
      qualityStandard: 'high',
      automationLevel: 'high',
      testingDepth: 'comprehensive',
      continuousTesting: 'true'
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
      { id: 'predictive', enabled: true, name: 'Predictive Engine', description: 'Forecasts quality issues' },
      { id: 'anomaly', enabled: true, name: 'Anomaly Detector', description: 'Detects quality anomalies' },
      { id: 'quality', enabled: true, name: 'Quality Scorer', description: 'Scores quality metrics' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'qa_1', name: 'Quality Assurance', category: 'QA', description: 'Manage quality assurance', level: 'expert' },
      { id: 'qa_2', name: 'Testing Strategy', category: 'Testing', description: 'Develop testing strategy', level: 'expert' },
      { id: 'qa_3', name: 'Test Automation', category: 'Automation', description: 'Automate testing', level: 'expert' },
      { id: 'qa_4', name: 'Performance Testing', category: 'Performance', description: 'Conduct performance testing', level: 'expert' },
      { id: 'qa_5', name: 'Quality Metrics', category: 'Metrics', description: 'Track quality metrics', level: 'expert' }
    ],
    personality: [
      { trait: 'Quality Focused', value: 10, description: 'Quality-focused mindset' },
      { trait: 'Detail Oriented', value: 10, description: 'Attention to quality details' },
      { trait: 'Analytical', value: 9, description: 'Strong analytical skills' },
      { trait: 'Thorough', value: 9, description: 'Thorough testing approach' },
      { trait: 'Process Oriented', value: 9, description: 'Process-focused approach' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
