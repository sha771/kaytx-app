import React from 'react';
import DepartmentDashboardView from '@/components/ai-agent/dashboard/DepartmentDashboardView';
import { Briefcase, AlertCircle, MessageSquare, FileText, Database, Layout, TrendingUp, Send, BarChart3, ArrowRight, RefreshCw, Shield, Users, PieChart, Star, Globe } from 'lucide-react-native';

const DEPARTMENT_AGENTS = [
  { id: 'neural-customer-support-hub', name: 'AI Neural Customer Support Hub', description: 'Central customer support coordination system', icon: Briefcase, color: '#1976D2' },
  { id: 'predictive-issue-resolver', name: 'AI Predictive Issue Resolver', description: 'Predictive issue resolution and troubleshooting', icon: AlertCircle, color: '#1976D2' },
  { id: 'real-time-chat-assistant', name: 'AI Real-Time Chat Assistant', description: 'Real-time chat support with AI assistance', icon: MessageSquare, color: '#1976D2' },
  { id: 'cognitive-ticket-manager', name: 'AI Cognitive Ticket Manager', description: 'Intelligent ticket management and routing', icon: FileText, color: '#1976D2' },
  { id: 'adaptive-knowledge-base', name: 'AI Adaptive Knowledge Base', description: 'Adaptive knowledge base and self-service', icon: Database, color: '#1976D2' },
  { id: 'intelligent-support-routing', name: 'AI Intelligent Support Routing', description: 'Intelligent routing and escalation management', icon: Layout, color: '#1976D2' },
  { id: 'neural-sentiment-analyzer', name: 'AI Neural Sentiment Analyzer', description: 'Customer sentiment analysis and insights', icon: TrendingUp, color: '#1976D2' },
  { id: 'predictive-response-generator', name: 'AI Predictive Response Generator', description: 'Predictive response generation and automation', icon: Send, color: '#1976D2' },
  { id: 'real-time-support-analytics', name: 'AI Real-Time Support Analytics', description: 'Real-time support analytics and reporting', icon: BarChart3, color: '#1976D2' },
  { id: 'cognitive-escalation-manager', name: 'AI Cognitive Escalation Manager', description: 'Intelligent escalation and priority management', icon: ArrowRight, color: '#1976D2' },
  { id: 'automated-support-workflow', name: 'AI Automated Support Workflow', description: 'Automated support workflow orchestration', icon: RefreshCw, color: '#1976D2' },
  { id: 'neural-quality-assurance', name: 'AI Neural Quality Assurance', description: 'Support quality assurance and monitoring', icon: Shield, color: '#1976D2' },
  { id: 'adaptive-training-coordinator', name: 'AI Adaptive Training Coordinator', description: 'Support team training and development', icon: Users, color: '#1976D2' },
  { id: 'intelligent-performance-tracker', name: 'AI Intelligent Performance Tracker', description: 'Support performance tracking and metrics', icon: PieChart, color: '#1976D2' },
  { id: 'predictive-customer-satisfaction', name: 'AI Predictive Customer Satisfaction', description: 'Customer satisfaction prediction and analysis', icon: Star, color: '#1976D2' },
  { id: 'real-time-multi-language-support', name: 'AI Real-Time Multi-Language Support', description: 'Real-time multi-language support capabilities', icon: Globe, color: '#1976D2' },
  { id: 'cognitive-support-reporter', name: 'AI Cognitive Support Reporter', description: 'Comprehensive support reporting and insights', icon: FileText, color: '#1976D2' },
];

export default function DepartmentIndex() {
  return (
    <DepartmentDashboardView
      departmentId="customer-experience"
      agents={DEPARTMENT_AGENTS}
    />
  );
}
