import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { TrendingUp, Globe, BarChart3, Users, Award, Zap, DollarSign, Activity } from 'lucide-react-native';

interface ChiefDeliveryOfficerDashboardProps {
  data: {
    totalRevenue: string;
    activeProjects: string;
    consultants: string;
    clientSatisfaction: string;
    utilization: string;
    aiProductivityImpact: string;
    activeEngagements: string;
    utilizationRate: string;
    billableRevenue: string;
    projectMargin: string;
    deliveryOnTimeRate: string;
    pipelineValue: string;
    resourceEfficiency: string;
  };
}

export default function ChiefDeliveryOfficerDashboard({ data }: ChiefDeliveryOfficerDashboardProps) {
  const { theme } = useTheme();

  // Portfolio Performance Data
  const portfolioPerformance = [
    { practice: 'Digital Transformation', revenue: '$720M', growth: '+22%', margin: 42, projects: '2,400', consultants: '12,000' },
    { practice: 'Cloud Services', revenue: '$580M', growth: '+18%', margin: 38, projects: '1,800', consultants: '8,500' },
    { practice: 'Data & AI', revenue: '$480M', growth: '+28%', margin: 45, projects: '1,200', consultants: '6,200' },
    { practice: 'Security', revenue: '$320M', growth: '+16%', margin: 40, projects: '900', consultants: '4,800' },
    { practice: 'Strategy', revenue: '$300M', growth: '+12%', margin: 48, projects: '750', consultants: '3,500' },
    { practice: 'Enterprise Applications', revenue: '$280M', growth: '+14%', margin: 36, projects: '850', consultants: '4,200' },
    { practice: 'Customer Experience', revenue: '$240M', growth: '+20%', margin: 41, projects: '680', consultants: '3,800' },
    { practice: 'Supply Chain', revenue: '$180M', growth: '+10%', margin: 35, projects: '520', consultants: '2,900' },
  ];

  // Global Operations Data
  const globalOperations = [
    { region: 'North America', revenue: '$840M', projects: '4,200', consultants: '18,000', deliveryCenters: 12, satisfaction: 94 },
    { region: 'EMEA', revenue: '$620M', projects: '3,100', consultants: '14,000', deliveryCenters: 8, satisfaction: 91 },
    { region: 'APAC', revenue: '$580M', projects: '2,900', consultants: '10,000', deliveryCenters: 6, satisfaction: 89 },
    { region: 'India', revenue: '$360M', projects: '2,250', consultants: '6,000', deliveryCenters: 4, satisfaction: 92 },
    { region: 'LATAM', revenue: '$180M', projects: '1,200', consultants: '3,500', deliveryCenters: 3, satisfaction: 87 },
  ];

  // Revenue Growth Trajectory
  const revenueGrowth = [
    { quarter: 'Q1 2024', revenue: '$2.1B', growth: '+8%', margin: 40.2, utilization: 84 },
    { quarter: 'Q2 2024', revenue: '$2.3B', growth: '+10%', margin: 41.1, utilization: 85 },
    { quarter: 'Q3 2024', revenue: '$2.5B', growth: '+9%', margin: 41.8, utilization: 86 },
    { quarter: 'Q4 2024', revenue: '$2.8B', growth: '+12%', margin: 42.4, utilization: 87 },
    { quarter: 'Q1 2025 (Forecast)', revenue: '$3.1B', growth: '+11%', margin: 43.0, utilization: 88 },
  ];

  // Delivery Health Overview
  const deliveryHealth = {
    onTimeDelivery: 94,
    budgetAdherence: 89,
    clientSatisfaction: 94,
    qualityScore: 92,
    resourceEfficiency: 87,
    riskManagement: 91
  };

  // Practice Performance Comparison
  const practiceComparison = [
    { metric: 'Revenue Growth', leader: 'Data & AI', value: '+28%', follower: 'Strategy', value: '+12%' },
    { metric: 'Profit Margin', leader: 'Strategy', value: '48%', follower: 'Supply Chain', value: '35%' },
    { metric: 'Client Satisfaction', leader: 'North America', value: '94%', follower: 'LATAM', value: '87%' },
    { metric: 'Resource Utilization', leader: 'India', value: '92%', follower: 'EMEA', value: '84%' },
  ];

  return (
    <View style={[styles.container, { backgroundColor: 'rgba(11, 15, 20, 0.8)', borderColor: 'rgba(16, 185, 129, 0.2)', borderWidth: 1 }]}>
      <Text style={[styles.title, { color: '#10B981' }]}>
        Chief Services Officer Command Center
      </Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Executive Summary - Large KPIs */}
        <View style={[styles.executiveSummary, { backgroundColor: 'rgba(11, 15, 20, 0.6)', borderColor: 'rgba(16, 185, 129, 0.2)', borderWidth: 1 }]}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>
              Executive Overview
            </Text>
            <Text style={[styles.sectionSubtitle, { color: 'rgba(255, 255, 255, 0.5)' }]}>
              Global Professional Services Performance
            </Text>
          </View>
          <View style={styles.executiveGrid}>
            <View style={[styles.executiveCard, { backgroundColor: 'rgba(16, 185, 129, 0.1)', borderColor: 'rgba(16, 185, 129, 0.3)', borderWidth: 1 }]}>
              <DollarSign size={24} color="#10B981" />
              <Text style={[styles.executiveValue, { color: '#10B981' }]}>{data.totalRevenue}</Text>
              <Text style={[styles.executiveLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>Total Revenue</Text>
              <View style={styles.trendBadge}>
                <TrendingUp size={12} color="#10B981" />
                <Text style={[styles.trendText, { color: '#10B981' }]}>+12% YoY</Text>
              </View>
            </View>

            <View style={[styles.executiveCard, { backgroundColor: 'rgba(6, 182, 212, 0.1)', borderColor: 'rgba(6, 182, 212, 0.3)', borderWidth: 1 }]}>
              <BarChart3 size={24} color="#06B6D4" />
              <Text style={[styles.executiveValue, { color: '#06B6D4' }]}>{data.activeProjects}</Text>
              <Text style={[styles.executiveLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>Active Projects</Text>
              <View style={styles.trendBadge}>
                <TrendingUp size={12} color="#10B981" />
                <Text style={[styles.trendText, { color: '#10B981' }]}>+8% QoQ</Text>
              </View>
            </View>

            <View style={[styles.executiveCard, { backgroundColor: 'rgba(139, 92, 246, 0.1)', borderColor: 'rgba(139, 92, 246, 0.3)', borderWidth: 1 }]}>
              <Users size={24} color="#8B5CF6" />
              <Text style={[styles.executiveValue, { color: '#8B5CF6' }]}>{data.consultants}</Text>
              <Text style={[styles.executiveLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>Consultants</Text>
              <View style={styles.trendBadge}>
                <TrendingUp size={12} color="#10B981" />
                <Text style={[styles.trendText, { color: '#10B981' }]}>+6% YoY</Text>
              </View>
            </View>

            <View style={[styles.executiveCard, { backgroundColor: 'rgba(16, 185, 129, 0.1)', borderColor: 'rgba(16, 185, 129, 0.3)', borderWidth: 1 }]}>
              <Award size={24} color="#10B981" />
              <Text style={[styles.executiveValue, { color: '#10B981' }]}>{data.clientSatisfaction}</Text>
              <Text style={[styles.executiveLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>Client Satisfaction</Text>
              <View style={styles.trendBadge}>
                <TrendingUp size={12} color="#10B981" />
                <Text style={[styles.trendText, { color: '#10B981' }]}>+3% YoY</Text>
              </View>
            </View>

            <View style={[styles.executiveCard, { backgroundColor: 'rgba(6, 182, 212, 0.1)', borderColor: 'rgba(6, 182, 212, 0.3)', borderWidth: 1 }]}>
              <Activity size={24} color="#06B6D4" />
              <Text style={[styles.executiveValue, { color: '#06B6D4' }]}>{data.utilization}</Text>
              <Text style={[styles.executiveLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>Utilization</Text>
              <View style={styles.trendBadge}>
                <TrendingUp size={12} color="#10B981" />
                <Text style={[styles.trendText, { color: '#10B981' }]}>+4% YoY</Text>
              </View>
            </View>

            <View style={[styles.executiveCard, { backgroundColor: 'rgba(139, 92, 246, 0.1)', borderColor: 'rgba(139, 92, 246, 0.3)', borderWidth: 1 }]}>
              <Zap size={24} color="#8B5CF6" />
              <Text style={[styles.executiveValue, { color: '#8B5CF6' }]}>{data.aiProductivityImpact}</Text>
              <Text style={[styles.executiveLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>AI Productivity</Text>
              <View style={styles.trendBadge}>
                <TrendingUp size={12} color="#10B981" />
                <Text style={[styles.trendText, { color: '#10B981' }]}>+28% YoY</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Delivery Health Overview */}
        <View style={[styles.deliveryHealthSection, { backgroundColor: 'rgba(11, 15, 20, 0.6)', borderColor: 'rgba(16, 185, 129, 0.2)', borderWidth: 1 }]}>
          <Text style={[styles.subsectionTitle, { color: '#FFFFFF' }]}>Delivery Health Overview</Text>
          <View style={styles.healthGrid}>
            <View style={styles.healthItem}>
              <Text style={[styles.healthLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>On-Time Delivery</Text>
              <Text style={[styles.healthValue, { color: '#10B981' }]}>{deliveryHealth.onTimeDelivery}%</Text>
              <View style={[styles.healthBar, { backgroundColor: 'rgba(16, 185, 129, 0.2)' }]}>
                <View style={[styles.healthFill, { width: `${deliveryHealth.onTimeDelivery}%`, backgroundColor: '#10B981' }]} />
              </View>
            </View>
            <View style={styles.healthItem}>
              <Text style={[styles.healthLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>Budget Adherence</Text>
              <Text style={[styles.healthValue, { color: '#06B6D4' }]}>{deliveryHealth.budgetAdherence}%</Text>
              <View style={[styles.healthBar, { backgroundColor: 'rgba(6, 182, 212, 0.2)' }]}>
                <View style={[styles.healthFill, { width: `${deliveryHealth.budgetAdherence}%`, backgroundColor: '#06B6D4' }]} />
              </View>
            </View>
            <View style={styles.healthItem}>
              <Text style={[styles.healthLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>Quality Score</Text>
              <Text style={[styles.healthValue, { color: '#8B5CF6' }]}>{deliveryHealth.qualityScore}%</Text>
              <View style={[styles.healthBar, { backgroundColor: 'rgba(139, 92, 246, 0.2)' }]}>
                <View style={[styles.healthFill, { width: `${deliveryHealth.qualityScore}%`, backgroundColor: '#8B5CF6' }]} />
              </View>
            </View>
            <View style={styles.healthItem}>
              <Text style={[styles.healthLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>Resource Efficiency</Text>
              <Text style={[styles.healthValue, { color: '#F59E0B' }]}>{deliveryHealth.resourceEfficiency}%</Text>
              <View style={[styles.healthBar, { backgroundColor: 'rgba(245, 158, 11, 0.2)' }]}>
                <View style={[styles.healthFill, { width: `${deliveryHealth.resourceEfficiency}%`, backgroundColor: '#F59E0B' }]} />
              </View>
            </View>
          </View>
        </View>
                <Text style={[styles.trendText, { color: '#10B981' }]}>+3% YoY</Text>
              </View>
            </View>

            <View style={[styles.executiveCard, { backgroundColor: 'rgba(6, 182, 212, 0.1)', borderColor: 'rgba(6, 182, 212, 0.3)', borderWidth: 1 }]}>
              <Activity size={24} color="#06B6D4" />
              <Text style={[styles.executiveValue, { color: '#06B6D4' }]}>{data.utilization}</Text>
              <Text style={[styles.executiveLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>Utilization</Text>
              <View style={styles.trendBadge}>
                <TrendingUp size={12} color="#10B981" />
                <Text style={[styles.trendText, { color: '#10B981' }]}>+4% YoY</Text>
              </View>
            </View>

            <View style={[styles.executiveCard, { backgroundColor: 'rgba(236, 72, 153, 0.1)', borderColor: 'rgba(236, 72, 153, 0.3)', borderWidth: 1 }]}>
              <Zap size={24} color="#EC4899" />
              <Text style={[styles.executiveValue, { color: '#EC4899' }]}>{data.aiProductivityImpact}</Text>
              <Text style={[styles.executiveLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>AI Productivity Impact</Text>
              <View style={styles.trendBadge}>
                <TrendingUp size={12} color="#10B981" />
                <Text style={[styles.trendText, { color: '#10B981' }]}>+28% YoY</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Portfolio Performance Dashboard */}
        <View style={[styles.portfolioSection, { backgroundColor: 'rgba(11, 15, 20, 0.6)', borderColor: 'rgba(16, 185, 129, 0.2)', borderWidth: 1 }]}>
          <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>
            Portfolio Performance Dashboard
          </Text>
          <View style={styles.practiceGrid}>
            {portfolioPerformance.map((practice, index) => (
              <View key={index} style={[styles.practiceCard, { backgroundColor: 'rgba(11, 15, 20, 0.4)', borderColor: 'rgba(16, 185, 129, 0.2)', borderWidth: 1 }]}>
                <Text style={[styles.practiceName, { color: '#FFFFFF' }]}>{practice.practice}</Text>
                <Text style={[styles.practiceRevenue, { color: '#10B981' }]}>{practice.revenue}</Text>
                <View style={styles.practiceMetrics}>
                  <View style={styles.metric}>
                    <Text style={[styles.metricLabel, { color: 'rgba(255, 255, 255, 0.5)' }]}>Growth</Text>
                    <Text style={[styles.metricValue, { color: '#10B981' }]}>{practice.growth}</Text>
                  </View>
                  <View style={styles.metric}>
                    <Text style={[styles.metricLabel, { color: 'rgba(255, 255, 255, 0.5)' }]}>Margin</Text>
                    <Text style={[styles.metricValue, { color: '#06B6D4' }]}>{practice.margin}%</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Global Operations Snapshot */}
        <View style={[styles.globalSection, { backgroundColor: 'rgba(11, 15, 20, 0.6)', borderColor: 'rgba(16, 185, 129, 0.2)', borderWidth: 1 }]}>
          <View style={styles.globalHeader}>
            <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>
              Global Operations Snapshot
            </Text>
            <Globe size={20} color="#06B6D4" />
          </View>
          <View style={styles.globalGrid}>
            {globalOperations.map((region, index) => (
              <View key={index} style={[styles.regionCard, { backgroundColor: 'rgba(11, 15, 20, 0.4)', borderColor: 'rgba(6, 182, 212, 0.2)', borderWidth: 1 }]}>
                <Text style={[styles.regionName, { color: '#FFFFFF' }]}>{region.region}</Text>
                <View style={styles.regionMetrics}>
                  <View style={styles.regionMetric}>
                    <Text style={[styles.regionMetricLabel, { color: 'rgba(255, 255, 255, 0.5)' }]}>Revenue</Text>
                    <Text style={[styles.regionMetricValue, { color: '#10B981' }]}>{region.revenue}</Text>
                  </View>
                  <View style={styles.regionMetric}>
                    <Text style={[styles.regionMetricLabel, { color: 'rgba(255, 255, 255, 0.5)' }]}>Projects</Text>
                    <Text style={[styles.regionMetricValue, { color: '#06B6D4' }]}>{region.projects}</Text>
                  </View>
                  <View style={styles.regionMetric}>
                    <Text style={[styles.regionMetricLabel, { color: 'rgba(255, 255, 255, 0.5)' }]}>Consultants</Text>
                    <Text style={[styles.regionMetricValue, { color: '#8B5CF6' }]}>{region.consultants}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Revenue Growth Trajectory */}
        <View style={[styles.growthSection, { backgroundColor: 'rgba(11, 15, 20, 0.6)', borderColor: 'rgba(16, 185, 129, 0.2)', borderWidth: 1 }]}>
          <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>
            Revenue Growth Trajectory
          </Text>
          <View style={styles.growthGrid}>
            {revenueGrowth.map((quarter, index) => (
              <View key={index} style={[styles.growthCard, { backgroundColor: 'rgba(11, 15, 20, 0.4)', borderColor: 'rgba(16, 185, 129, 0.2)', borderWidth: 1 }]}>
                <Text style={[styles.quarterLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>{quarter.quarter}</Text>
                <Text style={[styles.quarterRevenue, { color: '#10B981' }]}>{quarter.revenue}</Text>
                <View style={styles.growthBadge}>
                  <TrendingUp size={12} color="#10B981" />
                  <Text style={[styles.growthText, { color: '#10B981' }]}>{quarter.growth}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Delivery Health Overview */}
        <View style={[styles.healthSection, { backgroundColor: 'rgba(11, 15, 20, 0.6)', borderColor: 'rgba(16, 185, 129, 0.2)', borderWidth: 1 }]}>
          <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>
            Delivery Health Overview
          </Text>
          <View style={styles.healthMetrics}>
            <View style={styles.healthRow}>
              <Text style={[styles.healthLabel, { color: 'rgba(255, 255, 255, 0.8)' }]}>On-Time Delivery</Text>
              <View style={styles.healthBar}>
                <View style={[styles.healthFill, { backgroundColor: '#10B981', width: '94%' }]} />
              </View>
              <Text style={[styles.healthValue, { color: '#10B981' }]}>94%</Text>
            </View>
            <View style={styles.healthRow}>
              <Text style={[styles.healthLabel, { color: 'rgba(255, 255, 255, 0.8)' }]}>Client Satisfaction</Text>
              <View style={styles.healthBar}>
                <View style={[styles.healthFill, { backgroundColor: '#06B6D4', width: '91%' }]} />
              </View>
              <Text style={[styles.healthValue, { color: '#06B6D4' }]}>91%</Text>
            </View>
            <View style={styles.healthRow}>
              <Text style={[styles.healthLabel, { color: 'rgba(255, 255, 255, 0.8)' }]}>Resource Utilization</Text>
              <View style={styles.healthBar}>
                <View style={[styles.healthFill, { backgroundColor: '#8B5CF6', width: '86%' }]} />
              </View>
              <Text style={[styles.healthValue, { color: '#8B5CF6' }]}>86%</Text>
            </View>
            <View style={styles.healthRow}>
              <Text style={[styles.healthLabel, { color: 'rgba(255, 255, 255, 0.8)' }]}>Margin Achievement</Text>
              <View style={styles.healthBar}>
                <View style={[styles.healthFill, { backgroundColor: '#10B981', width: '89%' }]} />
              </View>
              <Text style={[styles.healthValue, { color: '#10B981' }]}>89%</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
  },
  summarySection: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  summaryContent: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  summaryItem: {
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 20,
    fontWeight: '700',
  },
  summaryDivider: {
    width: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  kpiGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
    gap: 12,
  },
  kpiCard: {
    width: '48%',
    padding: 14,
    borderRadius: 12,
  },
  kpiLabel: {
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  kpiValue: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 2,
  },
  kpiSubtitle: {
    fontSize: 10,
  },
  performanceSection: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 12,
  },
  performanceMetrics: {
    gap: 12,
  },
  performanceRow: {
    marginBottom: 8,
  },
  performanceBarContainer: {
    gap: 6,
  },
  performanceLabel: {
    fontSize: 13,
    fontWeight: '500',
  },
  progressBar: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  performanceValue: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'right',
  },
  revenueSection: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  revenueGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  revenueItem: {
    flex: 1,
    alignItems: 'center',
  },
  revenueLabel: {
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  revenueValue: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 2,
  },
  revenueTrend: {
    fontSize: 10,
    fontWeight: '500',
  },
  riskSection: {
    padding: 16,
    borderRadius: 12,
  },
  riskGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  riskItem: {
    alignItems: 'center',
    gap: 6,
  },
  riskDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  riskLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
  riskValue: {
    fontSize: 16,
    fontWeight: '700',
  },
});
