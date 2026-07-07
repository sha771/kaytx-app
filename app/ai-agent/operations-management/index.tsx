import React from 'react';
import DepartmentDashboardView from '@/components/ai-agent/dashboard/DepartmentDashboardView';

const DEPARTMENT_AGENTS = [
  { id: 'neural-operations-hub', name: 'AI Neural Operations Hub', description: 'Central operations coordination and management system', icon: Briefcase, color: '#00695C' },
  { id: 'predictive-process-optimizer', name: 'AI Predictive Process Optimizer', description: 'Predictive process optimization and efficiency improvement', icon: Zap, color: '#00695C' },
  { id: 'real-time-resource-allocation', name: 'AI Real-Time Resource Allocation', description: 'Real-time resource allocation and management', icon: Users, color: '#00695C' },
  { id: 'cognitive-supply-orchestrator', name: 'AI Cognitive Supply Orchestrator', description: 'Cognitive supply chain orchestration and management', icon: Package, color: '#00695C' },
  { id: 'adaptive-quality-manager', name: 'AI Adaptive Quality Manager', description: 'Adaptive quality management and control systems', icon: Shield, color: '#00695C' },
  { id: 'intelligent-maintenance-predictor', name: 'AI Intelligent Maintenance Predictor', description: 'Predictive maintenance and equipment management', icon: Wrench, color: '#00695C' },
  { id: 'neural-lean-consultant', name: 'AI Neural Lean Consultant', description: 'Lean consulting and continuous improvement', icon: TrendingUp, color: '#00695C' },
  { id: 'predictive-capacity-planner', name: 'AI Predictive Capacity Planner', description: 'Predictive capacity planning and optimization', icon: Gauge, color: '#00695C' },
  { id: 'real-time-workflow-orchestrator', name: 'AI Real-Time Workflow Orchestrator', description: 'Real-time workflow orchestration and automation', icon: Layout, color: '#00695C' },
  { id: 'cognitive-exception-handler', name: 'AI Cognitive Exception Handler', description: 'Intelligent exception handling and problem resolution', icon: AlertTriangle, color: '#00695C' },
  { id: 'automated-compliance-monitor', name: 'AI Automated Compliance Monitor', description: 'Automated compliance monitoring and reporting', icon: CheckCircle, color: '#00695C' },
  { id: 'neural-risk-assessment', name: 'AI Neural Risk Assessment', description: 'Neural risk assessment and mitigation strategies', icon: Shield, color: '#00695C' },
  { id: 'adaptive-project-manager', name: 'AI Adaptive Project Manager', description: 'Adaptive project management and coordination', icon: Calendar, color: '#00695C' },
  { id: 'intelligent-cost-optimizer', name: 'AI Intelligent Cost Optimizer', description: 'Intelligent cost optimization and reduction', icon: LineChart, color: '#00695C' },
  { id: 'predictive-demand-forecaster', name: 'AI Predictive Demand Forecaster', description: 'Predictive demand forecasting and planning', icon: BarChart3, color: '#00695C' },
];

export default function DepartmentIndex() {
  return (
    <DepartmentDashboardView
      departmentId="operations-management"
      agents={DEPARTMENT_AGENTS}
    />
  );
}
