import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Flame } from 'lucide-react-native';

export default function GasUtilityManagerPage() {
  const agent = {
    id: 'gas-utility-manager',
    name: 'AI Gas Utility Manager',
    title: 'AI Gas Utility Manager',
    description: 'The AI Gas Utility Manager oversees natural gas distribution, pipeline management, and gas safety operations.',
    capabilities: ["Task Automation","Data Processing","Gas Operations","Pipeline Management","Distribution","Safety Monitoring","Team Coordination","Compliance"],
    icon: Flame,
    color: '#FF5722',
    type: 'employee' as const,
    humanCost: '$102k/year',
    aiCost: '$2.6k/year',
    efficiency: '38x efficiency improvement',
    replacesRole: 'gas-utility-manager',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$8,300',
      tasksAutomatedDaily: 630,
      responseTime: '1.5s',
      accuracyRate: '96.6%',
    },
    hierarchy: {
      department: 'Energy & Utilities',
      level: 'manager',
      reportsTo: 'vp-utilities-management',
      manages: ['pipeline-technician', 'safety-inspector', 'distribution-coordinator'],
    },
    specializedCapabilities: [
      'Gas Operations',
      'Pipeline Management',
      'Distribution',
      'Safety Monitoring',
      'Team Coordination',
      'Compliance',
      'Leak Detection',
      'Pressure Management'
    ],
    integrationOptions: [
      'Gas Management Systems',
      'Pipeline Monitoring',
      'Distribution Controls',
      'Safety Systems',
      'Leak Detection',
      'Team Communication',
      'Compliance Systems'
    ],
    automationFeatures: [
      'Gas Monitoring',
      'Pipeline Management',
      'Distribution Control',
      'Safety Monitoring',
      'Leak Detection',
      'Team Coordination',
      'Compliance Monitoring',
      'Pressure Management'
    ],
    kpiMetrics: [
      'Distribution Efficiency',
      'Pipeline Integrity',
      'Safety Incidents',
      'Leak Response',
      'Compliance Rate',
      'Team Performance',
      'Customer Satisfaction',
      'Cost per Unit'
    ],
    customOptions: {
      safetyPriority: 'critical',
      efficiencyTarget: 'high',
      complianceLevel: 'strict',
      teamSize: 'medium',
      leakDetection: 'continuous'
    },
    advancedFeatures: {
      a2aCommunication: true,
      d2dCommunication: true,
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
      { id: 'predictive', enabled: true, name: 'Demand Predictor', description: 'Predicts gas demand' },
      { id: 'anomaly', enabled: true, name: 'Leak Detector', description: 'Detects gas leaks' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'gas_1', name: 'Gas Operations', category: 'Operations', description: 'Manage gas operations', level: 'expert' },
      { id: 'gas_2', name: 'Pipeline Management', category: 'Pipeline', description: 'Manage pipelines', level: 'expert' },
      { id: 'gas_3', name: 'Distribution', category: 'Distribution', description: 'Manage distribution', level: 'expert' },
      { id: 'gas_4', name: 'Safety', category: 'Safety', description: 'Ensure safety', level: 'expert' },
      { id: 'gas_5', name: 'Compliance', category: 'Compliance', description: 'Ensure compliance', level: 'expert' }
    ],
    personality: [
      { trait: 'Safety Focus', value: 10, description: 'Prioritizes safety' },
      { trait: 'Technical Expertise', value: 9, description: 'Deep gas knowledge' },
      { trait: 'Crisis Management', value: 10, description: 'Handles emergencies' },
      { trait: 'Leadership', value: 9, description: 'Effective leader' },
      { trait: 'Problem Solving', value: 9, description: 'Strong problem solver' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
