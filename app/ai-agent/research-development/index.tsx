import React from 'react';
import DepartmentDashboardView from '@/components/ai-agent/dashboard/DepartmentDashboardView';
import { Briefcase, Lightbulb, Search, FlaskConical, Calendar, FileText, Microscope, Zap, BarChart3, Network, Layout, Database, Target, TrendingUp, Compass } from 'lucide-react-native';

const DEPARTMENT_AGENTS = [
  { id: 'neural-rd-hub', name: 'AI Neural R&D Hub', description: 'Central R&D coordination and management system', icon: Briefcase, color: '#7B1FA2' },
  { id: 'predictive-innovation-engine', name: 'AI Predictive Innovation Engine', description: 'Predictive innovation and technology forecasting', icon: Lightbulb, color: '#7B1FA2' },
  { id: 'real-time-research-assistant', name: 'AI Real-Time Research Assistant', description: 'Real-time research assistance and data analysis', icon: Search, color: '#7B1FA2' },
  { id: 'cognitive-lab-management', name: 'AI Cognitive Lab Management', description: 'Intelligent laboratory management and optimization', icon: FlaskConical, color: '#7B1FA2' },
  { id: 'adaptive-development-planner', name: 'AI Adaptive Development Planner', description: 'Adaptive development planning and scheduling', icon: Calendar, color: '#7B1FA2' },
  { id: 'intelligent-patent-analyzer', name: 'AI Intelligent Patent Analyzer', description: 'Patent analysis and intellectual property management', icon: FileText, color: '#7B1FA2' },
  { id: 'neural-technology-scout', name: 'AI Neural Technology Scout', description: 'Technology scouting and trend identification', icon: Microscope, color: '#7B1FA2' },
  { id: 'predictive-prototype-developer', name: 'AI Predictive Prototype Developer', description: 'Predictive prototype development and testing', icon: Zap, color: '#7B1FA2' },
  { id: 'real-time-rd-analytics', name: 'AI Real-Time R&D Analytics', description: 'Real-time R&D analytics and performance tracking', icon: BarChart3, color: '#7B1FA2' },
  { id: 'cognitive-collaboration-platform', name: 'AI Cognitive Collaboration Platform', description: 'Research collaboration and knowledge sharing', icon: Network, color: '#7B1FA2' },
  { id: 'automated-research-workflow', name: 'AI Automated Research Workflow', description: 'Automated research workflow orchestration', icon: Layout, color: '#7B1FA2' },
  { id: 'neural-knowledge-management', name: 'AI Neural Knowledge Management', description: 'Research knowledge management and documentation', icon: Database, color: '#7B1FA2' },
  { id: 'adaptive-experiment-designer', name: 'AI Adaptive Experiment Designer', description: 'Adaptive experiment design and optimization', icon: Target, color: '#7B1FA2' },
  { id: 'intelligent-innovation-metrics', name: 'AI Intelligent Innovation Metrics', description: 'Innovation metrics and performance tracking', icon: TrendingUp, color: '#7B1FA2' },
  { id: 'predictive-trend-analysis', name: 'AI Predictive Trend Analysis', description: 'Predictive trend analysis and market insights', icon: Compass, color: '#7B1FA2' },
];

export default function DepartmentIndex() {
  return (
    <DepartmentDashboardView
      departmentId="research-development"
      agents={DEPARTMENT_AGENTS}
    />
  );
}
