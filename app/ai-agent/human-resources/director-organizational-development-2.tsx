import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { GitBranch } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'director-organizational-development-2',
    name: 'Director of Organizational Development - Design & Structure',
    title: 'AI Director of Organizational Development - Design & Structure',
    description: 'The AI Director of Organizational Development for Design & Structure manages organizational design, structure optimization, and workforce alignment initiatives.',
    capabilities: ["Task Automation","Data Processing","Workflow Management","Organizational Design","Structure Optimization","Workforce Alignment","Role Architecture","Team Design","Capability Modeling","Team Leadership"],
    icon: GitBranch,
    color: '#3F51B5',
    type: 'employee' as const,
    humanCost: '$165k/year',
    aiCost: '$3.5k/year',
    efficiency: '47x efficiency improvement',
    replacesRole: 'director-od',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$12',
      tasksAutomatedDaily: 860,
      responseTime: '1.6s',
      accuracyRate: '97.0%',
    },
    hierarchy: {
      department: 'Hr',
      level: 'director',
      reportsTo: 'chro',
      manages: ['od-analysts', 'structure-specialists'],
    },
    specializedCapabilities: [
      'Organizational Design',
      'Structure Optimization',
      'Workforce Alignment',
      'Role Architecture',
      'Team Design',
      'Capability Modeling',
      'Span Analysis',
      'Efficiency Optimization'
    ],
    integrationOptions: [
      'Org Chart Tools',
      'HRIS Systems',
      'Analytics Platforms',
      'Workforce Planning',
      'Performance Systems',
      'Project Management',
      'Visualization Tools',
      'Planning Suite'
    ],
    automationFeatures: [
      'Org Chart Updates',
      'Structure Analysis',
      'Role Mapping',
      'Span Calculation',
      'Capability Assessment',
      'Efficiency Analysis',
      'Report Generation',
      'Recommendation Engine'
    ],
    kpiMetrics: [
      'Structure Efficiency',
      'Role Clarity',
      'Span of Control',
      'Workforce Alignment',
      'Capability Coverage',
      'Decision Speed',
      'Collaboration Score',
      'Cost Efficiency'
    ],
    customOptions: {
      designModel: 'agile',
      structureType: 'matrix',
      alignmentFocus: 'strategic',
      efficiencyMetric: 'value-based',
      dataDriven: true
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
      { id: 'predictive', enabled: true, name: 'Predictive Engine', description: 'Forecasts structure needs' },
      { id: 'design', enabled: true, name: 'Design Core', description: 'Optimizes organizational design' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'dod_1', name: 'Organizational Design', category: 'Design', description: 'Design organizations', level: 'expert' },
      { id: 'dod_2', name: 'Structure Optimization', category: 'Optimization', description: 'Optimize structures', level: 'expert' },
      { id: 'dod_3', name: 'Workforce Alignment', category: 'Alignment', description: 'Align workforce', level: 'expert' },
      { id: 'dod_4', name: 'Role Architecture', category: 'Design', description: 'Design roles', level: 'expert' },
      { id: 'dod_5', name: 'Capability Modeling', category: 'Modeling', description: 'Model capabilities', level: 'expert' }
    ],
    personality: [
      { trait: 'Analytical', value: 10, description: 'Analytical thinker' },
      { trait: 'Structured', value: 9, description: 'Structured approach' },
      { trait: 'Strategic', value: 9, description: 'Strategic designer' },
      { trait: 'Efficiency-focused', value: 9, description: 'Focuses on efficiency' },
      { trait: 'Collaborative', value: 8, description: 'Collaborates with leaders' }
    ]

  };
  return <AgentPageWrapper agent={agent} />;
}
