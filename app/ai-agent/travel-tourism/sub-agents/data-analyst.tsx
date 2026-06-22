import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Database } from 'lucide-react-native';

export default function DataAnalystPage() {
  const agent = {
    id: 'data-analyst',
    name: 'AI Data Analyst',
    title: 'AI Data Analyst',
    description: 'The AI Data Analyst analyzes tourism data, identifies trends, generates insights, and provides data-driven recommendations for tourism operations.",
    capabilities: ["Task Automation","Data Processing","Workflow Management","Data Analysis","Trend Identification","Insight Generation","Data Visualization","Statistical Analysis","Reporting","Predictive Modeling"],
    icon: Database,
    color: '#2E7D32',
    type: 'employee' as const,
    humanCost: '$65k/year',
    aiCost: '$1.5k/year',
    efficiency: '43x efficiency improvement',
    replacesRole: 'data-analyst',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.7%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$5,300',
      tasksAutomatedDaily: 400,
      responseTime: '1.2s',
      accuracyRate: '98.0%',
    },
    hierarchy: {
      department: 'Travel & Tourism',
      level: 'analyst',
      reportsTo: 'vp-tourism-analytics',
      manages: [],
    },
    specializedCapabilities: [
      'Data Analysis',
      'Trend Identification',
      'Insight Generation',
      'Data Visualization',
      'Statistical Analysis',
      'Reporting',
      'Predictive Modeling',
      'Data Quality'
    ],
    integrationOptions: [
      'Analytics Platforms',
      'Data Warehouses',
      'Visualization Tools',
      'Statistical Software',
      'Reporting Systems',
      'Data Sources',
      'ML Platforms'
    ],
    automationFeatures: [
      'Data Analysis',
      'Trend Identification',
      'Insight Generation',
      'Data Visualization',
      'Statistical Analysis',
      'Reporting',
      'Predictive Modeling',
      'Data Quality'
    ],
    kpiMetrics: [
      'Analysis Accuracy',
      'Insight Quality',
      'Trend Detection',
      'Visualization Effectiveness',
      'Report Timeliness',
      'Prediction Accuracy',
      'Data Quality',
      'Stakeholder Satisfaction'
    ],
    customOptions: {
      analysisDepth: 'high',
      insightQuality: 'high',
      predictionAccuracy: 'high',
      dataQuality: 'strict',
      visualizationQuality: 'high'
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
      { id: 'analyze', enabled: true, name: 'Data Analyzer', description: 'Analyzes data' },
      { id: 'trend', enabled: true, name: 'Trend Detector', description: 'Detects trends' },
      { id: 'insight', enabled: true, name: 'Insight Generator', description: 'Generates insights' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'data_analyst_1', name: 'Data Analysis', category: 'Data', description: 'Analyze data', level: 'expert' },
      { id: 'data_analyst_2', name: 'Trend Identification', category: 'Trend', description: 'Identify trends', level: 'expert' },
      { id: 'data_analyst_3', name: 'Insight Generation', category: 'Insight', description: 'Generate insights', level: 'expert' },
      { id: 'data_analyst_4', name: 'Statistical Analysis', category: 'Statistics', description: 'Perform statistical analysis', level: 'advanced' },
      { id: 'data_analyst_5', name: 'Predictive Modeling', category: 'Prediction', description: 'Build predictive models', level: 'advanced' }
    ],
    personality: [
      { trait: 'Analytical', value: 10, description: 'Highly analytical' },
      { trait: 'Data Driven', value: 10, description: 'Data-driven' },
      { trait: 'Detail Oriented', value: 10, description: 'Detail-oriented' },
      { trait: 'Insight Driven', value: 9, description: 'Insight-oriented' },
      { trait: 'Curiosity', value: 9, description: 'Curious analyst' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
