import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { HardHat } from 'lucide-react-native';

export default function ConstructionManagerPage() {
  const agent = {
    id: 'construction-manager',
    name: 'AI Construction Manager',
    title: 'AI Construction Manager',
    description: 'The AI Construction Manager oversees store construction projects, manages contractors, ensures quality standards, and delivers projects on time and within budget.',
    capabilities: ["Task Automation","Data Processing","Workflow Management","Construction Management","Project Oversight","Contractor Management","Quality Control","Budget Management","Timeline Management","Safety Compliance"],
    icon: HardHat,
    color: '#6D4C41',
    type: 'employee' as const,
    humanCost: '$85k/year',
    aiCost: '$2k/year',
    efficiency: '42x efficiency improvement',
    replacesRole: 'construction-manager',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.7%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$6,900',
      tasksAutomatedDaily: 480,
      responseTime: '1.3s',
      accuracyRate: '97.2%',
    },
    hierarchy: {
      department: 'Retail & Stores',
      level: 'manager',
      reportsTo: 'vp-store-development',
      manages: [],
    },
    specializedCapabilities: [
      'Construction Management',
      'Project Oversight',
      'Contractor Management',
      'Quality Control',
      'Budget Management',
      'Timeline Management',
      'Safety Compliance',
      'Issue Resolution'
    ],
    integrationOptions: [
      'Construction Management',
      'Project Management',
      'Contractor Systems',
      'Quality Management',
      'Budgeting Tools',
      'Communication Systems',
      'Safety Platforms'
    ],
    automationFeatures: [
      'Project Management',
      'Contractor Coordination',
      'Quality Monitoring',
      'Budget Tracking',
      'Timeline Management',
      'Safety Monitoring',
      'Issue Resolution',
      'Report Generation'
    ],
    kpiMetrics: [
      'Project Completion',
      'Budget Adherence',
      'Timeline Compliance',
      'Quality Scores',
      'Safety Incidents',
      'Contractor Performance',
      'Issue Resolution',
      'Cost Efficiency'
    ],
    customOptions: {
      qualityFocus: 'high',
      budgetControl: 'strict',
      timelineAdherence: 'strict',
      safetyPriority: 'high',
      contractorManagement: 'high'
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
      { id: 'project', enabled: true, name: 'Project Tracker', description: 'Tracks project progress' },
      { id: 'budget', enabled: true, name: 'Budget Monitor', description: 'Monitors project budgets' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'const_1', name: 'Construction Management', category: 'Construction', description: 'Manage construction', level: 'expert' },
      { id: 'const_2', name: 'Project Oversight', category: 'Project', description: 'Oversee projects', level: 'expert' },
      { id: 'const_3', name: 'Contractor Management', category: 'Contractor', description: 'Manage contractors', level: 'expert' },
      { id: 'const_4', name: 'Quality Control', category: 'Quality', description: 'Control quality', level: 'advanced' },
      { id: 'const_5', name: 'Budget Management', category: 'Budget', description: 'Manage budgets', level: 'advanced' }
    ],
    personality: [
      { trait: 'Project Focus', value: 10, description: 'Project-oriented' },
      { trait: 'Quality Focus', value: 10, description: 'Quality-conscious' },
      { trait: 'Budget Conscious', value: 9, description: 'Budget-conscious' },
      { trait: 'Safety Focus', value: 10, description: 'Safety-conscious' },
      { trait: 'Problem Solving', value: 9, description: 'Excellent problem solver' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
