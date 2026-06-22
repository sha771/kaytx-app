import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Briefcase } from 'lucide-react-native';

export default function ProjectManagerPage() {
  const agent = {
    id: 'project-manager',
    name: 'AI Project Manager',
    title: 'AI Project Manager',
    description: 'The AI Project Manager manages destination development projects, oversees project timelines, coordinates stakeholders, and ensures successful project delivery.',
    capabilities: ["Task Automation","Data Processing","Workflow Management","Project Management","Timeline Management","Stakeholder Coordination","Budget Management","Risk Management","Quality Assurance","Project Delivery"],
    icon: Briefcase,
    color: '#EF6C00',
    type: 'employee' as const,
    humanCost: '$80k/year',
    aiCost: '$2k/year',
    efficiency: '40x efficiency improvement',
    replacesRole: 'project-manager',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.7%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$6,500',
      tasksAutomatedDaily: 460,
      responseTime: '1.3s',
      accuracyRate: '97.5%',
    },
    hierarchy: {
      department: 'Travel & Tourism',
      level: 'manager',
      reportsTo: 'vp-destination-development',
      manages: [],
    },
    specializedCapabilities: [
      'Project Management',
      'Timeline Management',
      'Stakeholder Coordination',
      'Budget Management',
      'Risk Management',
      'Quality Assurance',
      'Project Delivery',
      'Resource Allocation'
    ],
    integrationOptions: [
      'Project Management Systems',
      'Timeline Tools',
      'Budget Platforms',
      'Risk Management',
      'Communication Systems',
      'Quality Platforms',
      'Resource Management'
    ],
    automationFeatures: [
      'Project Management',
      'Timeline Management',
      'Stakeholder Coordination',
      'Budget Management',
      'Risk Management',
      'Quality Assurance',
      'Project Delivery',
      'Resource Allocation'
    ],
    kpiMetrics: [
      'Project Completion',
      'Timeline Adherence',
      'Budget Performance',
      'Quality Scores',
      'Stakeholder Satisfaction',
      'Risk Mitigation',
      'Delivery Success',
      'Resource Efficiency'
    ],
    customOptions: {
      deliveryFocus: 'high',
      timelineAdherence: 'strict',
      budgetControl: 'strict',
      qualityStandard: 'high',
      stakeholderSatisfaction: 'high'
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
      { id: 'project', enabled: true, name: 'Project Manager', description: 'Manages projects' },
      { id: 'timeline', enabled: true, name: 'Timeline Optimizer', description: 'Optimizes timelines' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'proj_mgr_1', name: 'Project Management', category: 'Project', description: 'Manage projects', level: 'expert' },
      { id: 'proj_mgr_2', name: 'Timeline Management', category: 'Timeline', description: 'Manage timelines', level: 'expert' },
      { id: 'proj_mgr_3', name: 'Stakeholder Coordination', category: 'Stakeholder', description: 'Coordinate stakeholders', level: 'expert' },
      { id: 'proj_mgr_4', name: 'Budget Management', category: 'Budget', description: 'Manage budgets', level: 'expert' },
      { id: 'proj_mgr_5', name: 'Risk Management', category: 'Risk', description: 'Manage risks', level: 'advanced' }
    ],
    personality: [
      { trait: 'Project Focus', value: 10, description: 'Project-oriented' },
      { trait: 'Organization', value: 10, description: 'Well-organized' },
      { trait: 'Leadership', value: 10, description: 'Strong leader' },
      { trait: 'Problem Solving', value: 9, description: 'Excellent problem solver' },
      { trait: 'Communication', value: 9, description: 'Clear communicator' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
