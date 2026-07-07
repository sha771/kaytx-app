import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import ExecutiveKPIBar from './ExecutiveKPIBar';
import AIAgentOverview from './AIAgentOverview';
import CHROCommandCenter from './CHROCommandCenter';
import TalentAcquisitionHub from './TalentAcquisitionHub';
import WorkforceAnalyticsCenter from './WorkforceAnalyticsCenter';
import EmployeeEngagementDashboard from './EmployeeEngagementDashboard';
import PerformanceManagementCenter from './PerformanceManagementCenter';
import LearningDevelopmentHub from './LearningDevelopmentHub';
import RetentionAttritionAnalytics from './RetentionAttritionAnalytics';
import CompensationBenefitsIntelligence from './CompensationBenefitsIntelligence';
import WorkforcePlanningCenter from './WorkforcePlanningCenter';
import AIPeopleInsights from './AIPeopleInsights';
import RealTimeHRActivityFeed from './RealTimeHRActivityFeed';
import PeopleOperationsHealth from './PeopleOperationsHealth';

interface HRAgent {
  id: string;
  name: string;
  role: string;
  avatar: string;
  status: 'online' | 'busy' | 'offline';
  confidenceScore: number;
  hrContribution: string;
  employeesImpacted: number;
  performanceTrend: 'up' | 'stable' | 'down';
  metrics: {
    candidatesScreened?: number;
    interviewsScheduled?: number;
    hiringAccuracy?: number;
    coursesAssigned?: number;
    completionRate?: number;
    skillGapsIdentified?: number;
    engagementScore?: number;
    surveysAnalyzed?: number;
    retentionPredictions?: number;
  };
}

export default function HumanResourcesCommandCenter() {
  const { theme } = useTheme();

  // Executive KPIs
  const executiveKPIs = [
    { label: 'Total Employees', value: '5,482', change: '+12%', trend: 'up' as const, color: '#3B82F6' },
    { label: 'Engagement Score', value: '89%', change: '+5%', trend: 'up' as const, color: '#10B981' },
    { label: 'Retention Rate', value: '94%', change: '+2%', trend: 'up' as const, color: '#8B5CF6' },
    { label: 'Open Positions', value: '128', change: '-12%', trend: 'down' as const, color: '#F59E0B' },
    { label: 'Hiring Velocity', value: '18d', change: '-3d', trend: 'up' as const, color: '#06B6D4' },
    { label: 'Productivity', value: '87%', change: '+4%', trend: 'up' as const, color: '#10B981' },
    { label: 'Diversity Score', value: '78%', change: '+6%', trend: 'up' as const, color: '#EC4899' },
    { label: 'Training Rate', value: '91%', change: '+8%', trend: 'up' as const, color: '#3B82F6' },
    { label: 'Attrition Risk', value: '8%', change: '-5%', trend: 'down' as const, color: '#EF4444' },
  ];

  // AI HR Agents
  const hrAgents: HRAgent[] = [
    {
      id: 'recruitment',
      name: 'Agent Talent',
      role: 'Recruitment Agent',
      avatar: '🎯',
      status: 'online',
      confidenceScore: 94,
      hrContribution: '$2.4M',
      employeesImpacted: 842,
      performanceTrend: 'up',
      metrics: {
        candidatesScreened: 8420,
        interviewsScheduled: 842,
        hiringAccuracy: 94
      }
    },
    {
      id: 'learning',
      name: 'Agent Growth',
      role: 'Learning & Development',
      avatar: '📚',
      status: 'online',
      confidenceScore: 91,
      hrContribution: '$1.8M',
      employeesImpacted: 5482,
      performanceTrend: 'up',
      metrics: {
        coursesAssigned: 12800,
        completionRate: 91,
        skillGapsIdentified: 182
      }
    },
    {
      id: 'engagement',
      name: 'Agent Pulse',
      role: 'Employee Experience',
      avatar: '💚',
      status: 'online',
      confidenceScore: 96,
      hrContribution: '$3.2M',
      employeesImpacted: 5482,
      performanceTrend: 'up',
      metrics: {
        engagementScore: 88,
        surveysAnalyzed: 14200,
        retentionPredictions: 96
      }
    }
  ];

  // CHRO Metrics
  const chroMetrics = {
    totalWorkforce: 5482,
    employeeEngagement: 89,
    retentionRate: 94,
    openRoles: 128,
    hiringPipeline: 2481,
    headcountGrowth: 12,
    attritionRisk: 8,
    workforceProductivity: 87
  };

  const chroTrends = {
    engagement: '+5%',
    retention: '+2%',
    hiring: '+15%',
    productivity: '+4%'
  };

  // Talent Acquisition
  const talentMetrics = {
    openPositions: 128,
    applicationsReceived: 12480,
    qualifiedCandidates: 2481,
    interviewsScheduled: 842,
    offersExtended: 156,
    hiresCompleted: 89,
    timeToHire: 18,
    costPerHire: '$8,500',
    offerAcceptanceRate: 87
  };

  const recruitmentFunnel = [
    { stage: 'Applicants', count: 12480, conversionRate: 100, color: '#3B82F6' },
    { stage: 'Screened', count: 6240, conversionRate: 50, color: '#10B981' },
    { stage: 'Interviewed', count: 2481, conversionRate: 20, color: '#8B5CF6' },
    { stage: 'Offer Sent', count: 156, conversionRate: 1.3, color: '#F59E0B' },
    { stage: 'Hired', count: 89, conversionRate: 0.7, color: '#06B6D4' }
  ];

  // Workforce Analytics
  const departments = [
    { name: 'Engineering', headcount: 1240, growth: 15, color: '#3B82F6' },
    { name: 'Sales', headcount: 890, growth: 12, color: '#10B981' },
    { name: 'Marketing', headcount: 560, growth: 8, color: '#8B5CF6' },
    { name: 'Operations', headcount: 720, growth: 10, color: '#F59E0B' },
    { name: 'Finance', headcount: 340, growth: 5, color: '#06B6D4' }
  ];

  const workforceMetrics = {
    totalHeadcount: 5482,
    avgTenure: 3.8,
    diversityScore: 78,
    remotePercentage: 65,
    genderDistribution: {
      male: 52,
      female: 45,
      nonBinary: 3
    },
    ageDistribution: [
      { range: '20-29', percentage: 25 },
      { range: '30-39', percentage: 40 },
      { range: '40-49', percentage: 25 },
      { range: '50+', percentage: 10 }
    ]
  };

  // Employee Engagement
  const engagementMetrics = {
    overallEngagement: 89,
    employeeSatisfaction: 87,
    surveyResponseRate: 78,
    managerEffectiveness: 85,
    teamMorale: 86,
    netPromoterScore: 72
  };

  const teamEngagement = [
    { team: 'Engineering', engagementScore: 91, trend: 'up' as const, members: 1240 },
    { team: 'Sales', engagementScore: 88, trend: 'up' as const, members: 890 },
    { team: 'Marketing', engagementScore: 86, trend: 'stable' as const, members: 560 },
    { team: 'Operations', engagementScore: 84, trend: 'down' as const, members: 720 }
  ];

  const feedbackCategories = [
    { category: 'Work-Life Balance', positive: 72, neutral: 18, negative: 10 },
    { category: 'Career Growth', positive: 68, neutral: 22, negative: 10 },
    { category: 'Management', positive: 75, neutral: 15, negative: 10 }
  ];

  // Performance Management
  const performanceMetrics = {
    goalAchievement: 87,
    performanceReviews: 1420,
    highPerformers: 890,
    developmentPlans: 2450,
    promotionReadiness: 23,
    averageRating: 4.2
  };

  const goalCategories = [
    { category: 'Individual', completion: 89, onTrack: 1100, atRisk: 120 },
    { category: 'Team', completion: 85, onTrack: 280, atRisk: 40 },
    { category: 'Company', completion: 82, onTrack: 40, atRisk: 10 }
  ];

  const talentTiers = [
    { tier: 'Top Performers', count: 890, percentage: 16, color: '#10B981' },
    { tier: 'High Potential', count: 1200, percentage: 22, color: '#3B82F6' },
    { tier: 'Solid Contributors', count: 2800, percentage: 51, color: '#F59E0B' },
    { tier: 'Development Needed', count: 592, percentage: 11, color: '#EF4444' }
  ];

  // Learning & Development
  const learningMetrics = {
    trainingCompletion: 91,
    skillsDeveloped: 12500,
    certificationsEarned: 340,
    learningPaths: 4500,
    skillGapScore: 15,
    avgLearningHours: 12
  };

  const skillCategories = [
    { category: 'Technical Skills', proficiency: 78, gap: 22, demand: 'high' as const },
    { category: 'Leadership', proficiency: 72, gap: 28, demand: 'high' as const },
    { category: 'Communication', proficiency: 85, gap: 15, demand: 'medium' as const }
  ];

  const learningPrograms = [
    { program: 'Leadership Academy', enrolled: 450, completed: 380, completionRate: 84 },
    { program: 'Technical Skills', enrolled: 1200, completed: 1100, completionRate: 92 },
    { program: 'Soft Skills', enrolled: 800, completed: 720, completionRate: 90 }
  ];

  // Retention & Attrition
  const retentionMetrics = {
    retentionRate: 94,
    voluntaryTurnover: 6,
    involuntaryTurnover: 2,
    attritionRisk: 8,
    flightRiskEmployees: 142,
    avgTenureBeforeExit: 18
  };

  const riskSegments = [
    { segment: 'High Performers', count: 45, riskLevel: 'high' as const, percentage: 32 },
    { segment: 'New Hires', count: 58, riskLevel: 'medium' as const, percentage: 41 },
    { segment: 'Key Roles', count: 39, riskLevel: 'high' as const, percentage: 27 }
  ];

  const exitReasons = [
    { reason: 'Career Growth', count: 28, percentage: 35, trend: 'down' as const },
    { reason: 'Compensation', count: 22, percentage: 28, trend: 'stable' as const },
    { reason: 'Work-Life Balance', count: 18, percentage: 22, trend: 'up' as const },
    { reason: 'Management', count: 12, percentage: 15, trend: 'down' as const }
  ];

  // Compensation & Benefits
  const compensationMetrics = {
    totalPayroll: '$4.2M',
    avgSalary: '$85,000',
    compensationBudget: '$52M',
    benefitsUtilization: 78,
    salaryEquityScore: 87,
    bonusPool: '$1.2M'
  };

  const compensationBenchmarks = [
    { role: 'Software Engineer', currentAvg: '$95,000', marketAvg: '$92,000', variance: 3, competitive: true },
    { role: 'Sales Manager', currentAvg: '$88,000', marketAvg: '$90,000', variance: -2, competitive: false },
    { role: 'Marketing Lead', currentAvg: '$82,000', marketAvg: '$85,000', variance: -4, competitive: false }
  ];

  const benefitCategories = [
    { category: 'Health Insurance', enrollment: 95, utilization: 78, satisfaction: 85 },
    { category: '401(k)', enrollment: 82, utilization: 65, satisfaction: 82 },
    { category: 'Remote Work', enrollment: 65, utilization: 90, satisfaction: 92 }
  ];

  // Workforce Planning
  const planningMetrics = {
    futureHiringNeeds: 320,
    capacityUtilization: 87,
    successionReady: 78,
    workforceGrowth: 12,
    budgetUtilization: 85,
    criticalRoles: 12
  };

  const hiringForecasts = [
    { quarter: 'Q1 2026', planned: 80, forecasted: 85, confidence: 85 },
    { quarter: 'Q2 2026', planned: 90, forecasted: 95, confidence: 82 },
    { quarter: 'Q3 2026', planned: 85, forecasted: 88, confidence: 78 },
    { quarter: 'Q4 2026', planned: 65, forecasted: 70, confidence: 75 }
  ];

  const successionPlans = [
    { role: 'CTO', incumbent: 'John Smith', readyCount: 2, readinessTime: '6 months', riskLevel: 'low' as const },
    { role: 'VP Sales', incumbent: 'Sarah Johnson', readyCount: 1, readinessTime: '12 months', riskLevel: 'medium' as const },
    { role: 'CFO', incumbent: 'Mike Davis', readyCount: 3, readinessTime: '3 months', riskLevel: 'low' as const }
  ];

  // AI Insights
  const aiInsights = [
    {
      id: '1',
      type: 'risk' as const,
      title: 'Engineering team attrition risk increased',
      description: 'Engineering department shows 14% increase in attrition risk over the past quarter. Recommended action: Review compensation and career development opportunities.',
      impact: 'high' as const,
      confidence: 89,
      actionable: true
    },
    {
      id: '2',
      type: 'recommendation' as const,
      title: 'Leadership training recommended',
      description: '23 managers identified as needing leadership development training. Program recommended within next 60 days.',
      impact: 'medium' as const,
      confidence: 85,
      actionable: true
    },
    {
      id: '3',
      type: 'opportunity' as const,
      title: 'Recruitment cycle time optimization',
      description: 'AI analysis suggests recruitment cycle time can be reduced by 18% through automated screening and interview scheduling.',
      impact: 'medium' as const,
      confidence: 92,
      actionable: true
    },
    {
      id: '4',
      type: 'alert' as const,
      title: 'Marketing department capacity limits',
      description: 'Marketing team approaching capacity limits. Current utilization at 94%. Consider hiring additional resources or workload redistribution.',
      impact: 'high' as const,
      confidence: 88,
      actionable: true
    }
  ];

  // Activity Feed
  const hrActivities = [
    {
      id: '1',
      type: 'application' as const,
      title: 'New application received',
      description: 'Senior Software Engineer position received 15 new applications',
      timestamp: new Date(Date.now() - 5 * 60000).toISOString(),
      department: 'Engineering'
    },
    {
      id: '2',
      type: 'candidate' as const,
      title: 'Candidate advanced to final round',
      description: 'Jane Doe advanced to final interview for Product Manager role',
      timestamp: new Date(Date.now() - 15 * 60000).toISOString(),
      user: 'Recruitment Agent',
      department: 'Product'
    },
    {
      id: '3',
      type: 'onboarding' as const,
      title: 'New employee onboarded',
      description: 'John Smith completed onboarding for Software Engineer position',
      timestamp: new Date(Date.now() - 30 * 60000).toISOString(),
      user: 'HR Team',
      department: 'Engineering'
    },
    {
      id: '4',
      type: 'performance' as const,
      title: 'Performance review completed',
      description: 'Q4 performance reviews completed for Sales team (45 reviews)',
      timestamp: new Date(Date.now() - 45 * 60000).toISOString(),
      department: 'Sales'
    },
    {
      id: '5',
      type: 'training' as const,
      title: 'Training completed',
      description: 'Leadership Academy program completed by 12 employees',
      timestamp: new Date(Date.now() - 60 * 60000).toISOString(),
      department: 'All Departments'
    },
    {
      id: '6',
      type: 'survey' as const,
      title: 'Employee survey submitted',
      description: 'Employee engagement survey received 890 responses',
      timestamp: new Date(Date.now() - 90 * 60000).toISOString(),
      department: 'All Departments'
    }
  ];

  // System Health
  const systemHealths = [
    {
      name: 'HRIS System',
      status: 'healthy' as const,
      uptime: 99.9,
      lastCheck: '2 min ago',
      metrics: { responseTime: 120, errorRate: 0.1 }
    },
    {
      name: 'Payroll System',
      status: 'healthy' as const,
      uptime: 99.8,
      lastCheck: '5 min ago',
      metrics: { responseTime: 200, errorRate: 0.05 }
    },
    {
      name: 'Recruitment Platform',
      status: 'healthy' as const,
      uptime: 99.5,
      lastCheck: '3 min ago',
      metrics: { responseTime: 150, errorRate: 0.2 }
    },
    {
      name: 'Learning Platform',
      status: 'degraded' as const,
      uptime: 97.5,
      lastCheck: '1 min ago',
      metrics: { responseTime: 450, errorRate: 2.5 }
    },
    {
      name: 'Employee Experience Tools',
      status: 'healthy' as const,
      uptime: 99.2,
      lastCheck: '4 min ago',
      metrics: { responseTime: 180, errorRate: 0.3 }
    }
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]} showsVerticalScrollIndicator={false}>
      <ExecutiveKPIBar kpis={executiveKPIs} />
      <AIAgentOverview agents={hrAgents} />
      <CHROCommandCenter metrics={chroMetrics} trends={chroTrends} />
      <TalentAcquisitionHub metrics={talentMetrics} funnel={recruitmentFunnel} />
      <WorkforceAnalyticsCenter departments={departments} metrics={workforceMetrics} />
      <EmployeeEngagementDashboard metrics={engagementMetrics} teams={teamEngagement} feedback={feedbackCategories} />
      <PerformanceManagementCenter metrics={performanceMetrics} goals={goalCategories} talentTiers={talentTiers} />
      <LearningDevelopmentHub metrics={learningMetrics} skills={skillCategories} programs={learningPrograms} />
      <RetentionAttritionAnalytics metrics={retentionMetrics} riskSegments={riskSegments} exitReasons={exitReasons} />
      <CompensationBenefitsIntelligence metrics={compensationMetrics} benchmarks={compensationBenchmarks} benefits={benefitCategories} />
      <WorkforcePlanningCenter metrics={planningMetrics} forecasts={hiringForecasts} successionPlans={successionPlans} />
      <AIPeopleInsights insights={aiInsights} />
      <RealTimeHRActivityFeed activities={hrActivities} />
      <PeopleOperationsHealth systems={systemHealths} overallHealth="healthy" dataQualityScore={92} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});