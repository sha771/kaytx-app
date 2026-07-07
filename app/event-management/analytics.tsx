import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { 
  BarChart3, TrendingUp, DollarSign, Users, Activity, Target,
  ArrowRight, Calendar, Globe, Download, Filter, Zap, PieChart
} from 'lucide-react-native';

export default function EventManagementAnalytics() {
  const router = useRouter();

  const ANALYTICS_OVERVIEW = [
    { label: 'Total Revenue', value: '$7.2B', icon: DollarSign, color: '#10B981', trend: '+22%' },
    { label: 'Total Events', value: '1,260', icon: Calendar, color: '#06B6D4', trend: '+12%' },
    { label: 'Total Attendees', value: '9.4M', icon: Users, color: '#8B5CF6', trend: '+15%' },
    { label: 'Avg Satisfaction', value: '4.8/5', icon: Target, color: '#F59E0B', trend: '+5%' },
  ];

  const REVENUE_ANALYTICS = [
    { category: 'Ticket Sales', amount: '$5.8B', percentage: 81, color: '#06B6D4' },
    { category: 'Sponsorship', amount: '$920M', percentage: 13, color: '#FFD700' },
    { category: 'Merchandise', amount: '$340M', percentage: 5, color: '#8B5CF6' },
    { category: 'Vendor Fees', amount: '$140M', percentage: 1, color: '#10B981' },
  ];

  const EVENT_PERFORMANCE = [
    { metric: 'Completion Rate', value: '94%', trend: '+2%', color: '#10B981' },
    { metric: 'On-Time Start', value: '96%', trend: '+3%', color: '#06B6D4' },
    { metric: 'Budget Adherence', value: '89%', trend: '+5%', color: '#8B5CF6' },
    { metric: 'Attendee Satisfaction', value: '4.8/5', trend: '+5%', color: '#F59E0B' },
  ];

  const ATTENDEE_INSIGHTS = [
    { insight: 'Registration Conversion', value: '24%', trend: '+4%', color: '#06B6D4' },
    { insight: 'Check-in Rate', value: '93%', trend: '+2%', color: '#10B981' },
    { insight: 'Session Attendance', value: '87%', trend: '+6%', color: '#8B5CF6' },
    { insight: 'Networking Engagement', value: '68%', trend: '+12%', color: '#F59E0B' },
  ];

  const GEOGRAPHIC_DISTRIBUTION = [
    { region: 'North America', events: 524, attendees: '4.2M', revenue: '$3.2B', color: '#06B6D4' },
    { region: 'Europe', events: 312, attendees: '2.8M', revenue: '$2.1B', color: '#8B5CF6' },
    { region: 'Asia Pacific', events: 287, attendees: '1.8M', revenue: '$1.4B', color: '#10B981' },
    { region: 'Latin America', events: 89, attendees: '420K', revenue: '$320M', color: '#F59E0B' },
    { region: 'Middle East', events: 48, attendees: '180K', revenue: '$180M', color: '#EC4899' },
  ];

  const AI_PERFORMANCE = [
    { metric: 'AI Planning Tasks', value: '847K', efficiency: '94%', impact: '+$410M', color: '#06B6D4' },
    { metric: 'Schedule Optimizations', value: '12.4K', efficiency: '89%', impact: '+$85M', color: '#8B5CF6' },
    { metric: 'Risk Predictions', value: '3,240', efficiency: '96%', impact: '+$120M', color: '#10B981' },
    { metric: 'Attendee Recommendations', value: '89.2K', efficiency: '92%', impact: '+$180M', color: '#F59E0B' },
  ];

  const REPORTS = [
    { name: 'Executive Summary', type: 'PDF', date: '2026-06-26', size: '2.4MB', icon: Download, color: '#06B6D4' },
    { name: 'Revenue Report', type: 'Excel', date: '2026-06-26', size: '1.8MB', icon: BarChart3, color: '#10B981' },
    { name: 'Attendee Analytics', type: 'PDF', date: '2026-06-25', size: '3.2MB', icon: Users, color: '#8B5CF6' },
    { name: 'AI Performance', type: 'PDF', date: '2026-06-25', size: '1.5MB', icon: Zap, color: '#F59E0B' },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerIcon}>
          <BarChart3 size={48} color="#06B6D4" />
        </View>
        <View>
          <Text style={styles.headerTitle}>Analytics Center</Text>
          <Text style={styles.headerSubtitle}>Deep Event Intelligence</Text>
        </View>
      </View>

      {/* Analytics Overview */}
      <View style={styles.statsContainer}>
        {ANALYTICS_OVERVIEW.map((stat, index) => (
          <View key={index} style={[styles.statCard, { borderColor: stat.color + '40' }]}>
            <View style={[styles.statIcon, { backgroundColor: stat.color + '20' }]}>
              <stat.icon size={24} color={stat.color} />
            </View>
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
            <View style={[styles.trendBadge, { backgroundColor: stat.color + '20' }]}>
              <TrendingUp size={10} color={stat.color} />
              <Text style={[styles.trendText, { color: stat.color }]}>{stat.trend}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Revenue Analytics */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Revenue Analytics</Text>
        {REVENUE_ANALYTICS.map((revenue, index) => (
          <View key={index} style={styles.revenueCard}>
            <View style={styles.revenueHeader}>
              <Text style={styles.revenueCategory}>{revenue.category}</Text>
              <Text style={styles.revenueAmount}>{revenue.amount}</Text>
            </View>
            <View style={styles.revenueBar}>
              <View 
                style={[
                  styles.revenueFill, 
                  { 
                    width: `${revenue.percentage}%`,
                    backgroundColor: revenue.color
                  } 
                ]} 
              />
            </View>
            <Text style={styles.revenuePercentage}>{revenue.percentage}% of total</Text>
          </View>
        ))}
      </View>

      {/* Event Performance */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Event Performance</Text>
        <View style={styles.performanceGrid}>
          {EVENT_PERFORMANCE.map((perf, index) => (
            <View key={index} style={[styles.performanceCard, { borderColor: perf.color + '40' }]}>
              <Text style={styles.performanceValue}>{perf.value}</Text>
              <Text style={styles.performanceLabel}>{perf.metric}</Text>
              <View style={[styles.performanceTrend, { backgroundColor: perf.color + '20' }]}>
                <TrendingUp size={12} color={perf.color} />
                <Text style={[styles.performanceTrendText, { color: perf.color }]}>{perf.trend}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Attendee Insights */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Attendee Insights</Text>
        <View style={styles.insightsGrid}>
          {ATTENDEE_INSIGHTS.map((insight, index) => (
            <View key={index} style={[styles.insightCard, { borderColor: insight.color + '40' }]}>
              <Target size={24} color={insight.color} />
              <Text style={styles.insightValue}>{insight.value}</Text>
              <Text style={styles.insightLabel}>{insight.insight}</Text>
              <View style={[styles.insightTrend, { backgroundColor: insight.color + '20' }]}>
                <TrendingUp size={12} color={insight.color} />
                <Text style={[styles.insightTrendText, { color: insight.color }]}>{insight.trend}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Geographic Distribution */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Geographic Distribution</Text>
        {GEOGRAPHIC_DISTRIBUTION.map((geo, index) => (
          <View key={index} style={[styles.geoCard, { borderColor: geo.color + '40' }]}>
            <View style={styles.geoHeader}>
              <View style={[styles.geoIcon, { backgroundColor: geo.color + '20' }]}>
                <Globe size={24} color={geo.color} />
              </View>
              <View style={styles.geoInfo}>
                <Text style={styles.geoRegion}>{geo.region}</Text>
                <Text style={styles.geoEvents}>{geo.events} events</Text>
              </View>
              <Text style={[styles.geoRevenue, { color: geo.color }]}>{geo.revenue}</Text>
            </View>
            <View style={styles.geoStats}>
              <View style={styles.geoStat}>
                <Users size={14} color="#9CA3AF" />
                <Text style={styles.geoStatLabel}>{geo.attendees} attendees</Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      {/* AI Performance */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>AI Performance</Text>
        {AI_PERFORMANCE.map((ai, index) => (
          <View key={index} style={styles.aiCard}>
            <View style={styles.aiHeader}>
              <Zap size={20} color={ai.color} />
              <Text style={styles.aiMetric}>{ai.metric}</Text>
            </View>
            <View style={styles.aiStats}>
              <View style={styles.aiStat}>
                <Text style={styles.aiStatValue}>{ai.value}</Text>
                <Text style={styles.aiStatLabel}>Tasks</Text>
              </View>
              <View style={styles.aiStat}>
                <Text style={[styles.aiStatValue, { color: ai.color }]}>{ai.efficiency}</Text>
                <Text style={styles.aiStatLabel}>Efficiency</Text>
              </View>
              <View style={styles.aiStat}>
                <Text style={[styles.aiStatValue, { color: '#10B981' }]}>{ai.impact}</Text>
                <Text style={styles.aiStatLabel}>Impact</Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      {/* Reports */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Reports</Text>
        <View style={styles.reportsList}>
          {REPORTS.map((report, index) => (
            <TouchableOpacity key={index} style={styles.reportItem}>
              <View style={[styles.reportIcon, { backgroundColor: report.color + '20' }]}>
                <report.icon size={20} color={report.color} />
              </View>
              <View style={styles.reportContent}>
                <Text style={styles.reportName}>{report.name}</Text>
                <Text style={styles.reportMeta}>{report.type} • {report.date} • {report.size}</Text>
              </View>
              <Download size={20} color="#9CA3AF" />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.actionsSection}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: '#06B6D415', borderColor: '#06B6D440' }]}
          >
            <Download size={24} color="#06B6D4" />
            <Text style={[styles.actionText, { color: '#06B6D4' }]}>Export</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: '#8B5CF615', borderColor: '#8B5CF640' }]}
          >
            <Filter size={24} color="#8B5CF6" />
            <Text style={[styles.actionText, { color: '#8B5CF6' }]}>Filter</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: '#10B98115', borderColor: '#10B98140' }]}
          >
            <PieChart size={24} color="#10B981" />
            <Text style={[styles.actionText, { color: '#10B981' }]}>Custom</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: '#F59E0B15', borderColor: '#F59E0B40' }]}
          >
            <BarChart3 size={24} color="#F59E0B" />
            <Text style={[styles.actionText, { color: '#F59E0B' }]}>Compare</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#03050A',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#06B6D440',
    gap: 16,
  },
  headerIcon: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#06B6D420',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    gap: 12,
  },
  statCard: {
    flex: 1,
    minWidth: 140,
    backgroundColor: '#0A0F1A',
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    gap: 8,
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  statLabel: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
  },
  trendBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  trendText: {
    fontSize: 10,
    fontWeight: '600',
  },
  section: {
    padding: 16,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  revenueCard: {
    backgroundColor: '#0A0F1A',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  revenueHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  revenueCategory: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  revenueAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#10B981',
  },
  revenueBar: {
    height: 8,
    backgroundColor: '#1F2937',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 6,
  },
  revenueFill: {
    height: '100%',
    borderRadius: 4,
  },
  revenuePercentage: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  performanceGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  performanceCard: {
    flex: 1,
    minWidth: 140,
    backgroundColor: '#0A0F1A',
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    gap: 8,
  },
  performanceValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  performanceLabel: {
    fontSize: 13,
    color: '#9CA3AF',
    textAlign: 'center',
  },
  performanceTrend: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  performanceTrendText: {
    fontSize: 11,
    fontWeight: '600',
  },
  insightsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  insightCard: {
    flex: 1,
    minWidth: 140,
    backgroundColor: '#0A0F1A',
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    gap: 8,
  },
  insightValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  insightLabel: {
    fontSize: 13,
    color: '#9CA3AF',
    textAlign: 'center',
  },
  insightTrend: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  insightTrendText: {
    fontSize: 11,
    fontWeight: '600',
  },
  geoCard: {
    backgroundColor: '#0A0F1A',
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  geoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  geoIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  geoInfo: {
    flex: 1,
  },
  geoRegion: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  geoEvents: {
    fontSize: 13,
    color: '#9CA3AF',
  },
  geoRevenue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  geoStats: {
    flexDirection: 'row',
    backgroundColor: '#1F2937',
    borderRadius: 12,
    padding: 16,
  },
  geoStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  geoStatLabel: {
    fontSize: 13,
    color: '#9CA3AF',
  },
  aiCard: {
    backgroundColor: '#0A0F1A',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  aiHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  aiMetric: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  aiStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#1F2937',
    borderRadius: 12,
    padding: 16,
  },
  aiStat: {
    alignItems: 'center',
  },
  aiStatValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  aiStatLabel: {
    fontSize: 11,
    color: '#9CA3AF',
  },
  reportsList: {
    backgroundColor: '#0A0F1A',
    borderRadius: 12,
    overflow: 'hidden',
  },
  reportItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1F2937',
    gap: 12,
  },
  reportIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  reportContent: {
    flex: 1,
  },
  reportName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  reportMeta: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  actionsSection: {
    padding: 16,
    marginTop: 8,
    marginBottom: 24,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    minWidth: 140,
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    gap: 8,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
  },
});
