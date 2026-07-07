import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { 
  Calendar, Users, DollarSign, MapPin, Building2, TrendingUp,
  Activity, Zap, Shield, Sparkles, ArrowRight, BarChart3,
  Globe, Target, CheckCircle, AlertTriangle, Clock
} from 'lucide-react-native';

export default function EventManagementDashboard() {
  const router = useRouter();

  const EVENT_KPIS = [
    { label: 'Active Events', value: '1,260', icon: Calendar, color: '#06B6D4', trend: '+12%', forecast: '1,420' },
    { label: 'Upcoming Events', value: '847', icon: Clock, color: '#8B5CF6', trend: '+8%', forecast: '915' },
    { label: 'Total Attendees', value: '9.4M', icon: Users, color: '#10B981', trend: '+15%', forecast: '10.8M' },
    { label: 'Completion Rate', value: '94%', icon: CheckCircle, color: '#F59E0B', trend: '+2%', forecast: '96%' },
    { label: 'Satisfaction', value: '4.8/5', icon: Target, color: '#EC4899', trend: '+5%', forecast: '4.9/5' },
  ];

  const REVENUE_KPIS = [
    { label: 'Ticket Revenue', value: '$5.8B', icon: DollarSign, color: '#10B981', trend: '+18%', forecast: '$6.9B' },
    { label: 'Sponsorship', value: '$920M', icon: Building2, color: '#FFD700', trend: '+22%', forecast: '$1.1B' },
    { label: 'Merchandise', value: '$340M', icon: Sparkles, color: '#EC4899', trend: '+12%', forecast: '$380M' },
    { label: 'Vendor Revenue', value: '$210M', icon: Activity, color: '#06B6D4', trend: '+8%', forecast: '$230M' },
    { label: 'Total Profit', value: '$2.1B', icon: TrendingUp, color: '#8B5CF6', trend: '+25%', forecast: '$2.6B' },
  ];

  const OPERATIONS_KPIS = [
    { label: 'Venues Managed', value: '2,450', icon: MapPin, color: '#F59E0B', trend: '+5%', forecast: '2,570' },
    { label: 'Vendors Active', value: '8,920', icon: Building2, color: '#10B981', trend: '+10%', forecast: '9,800' },
    { label: 'Staff Assigned', value: '45,600', icon: Users, color: '#06B6D4', trend: '+7%', forecast: '48,700' },
    { label: 'Check-in Rate', value: '97%', icon: CheckCircle, color: '#8B5CF6', trend: '+1%', forecast: '98%' },
    { label: 'Schedule Accuracy', value: '96%', icon: Clock, color: '#EC4899', trend: '+3%', forecast: '97%' },
  ];

  const MARKETING_KPIS = [
    { label: 'Registrations', value: '12.4M', icon: Users, color: '#06B6D4', trend: '+14%', forecast: '14.1M' },
    { label: 'Conversion Rate', value: '24%', icon: Target, color: '#10B981', trend: '+4%', forecast: '26%' },
    { label: 'Social Engagement', value: '8.9M', icon: Activity, color: '#8B5CF6', trend: '+18%', forecast: '10.5M' },
    { label: 'Email Performance', value: '42%', icon: Globe, color: '#F59E0B', trend: '+6%', forecast: '45%' },
    { label: 'Brand Reach', value: '156M', icon: Sparkles, color: '#EC4899', trend: '+12%', forecast: '175M' },
  ];

  const AI_KPIS = [
    { label: 'Planning Tasks', value: '847K', icon: Calendar, color: '#06B6D4', trend: '+22%', forecast: '1.03M' },
    { label: 'Schedule Optimizations', value: '12.4K', icon: Zap, color: '#8B5CF6', trend: '+28%', forecast: '15.9K' },
    { label: 'Risk Predictions', value: '3,240', icon: Shield, color: '#F59E0B', trend: '+15%', forecast: '3,730' },
    { label: 'Recommendations', value: '89.2K', icon: Sparkles, color: '#10B981', trend: '+35%', forecast: '120K' },
    { label: 'Revenue Impact', value: '+$410M', icon: DollarSign, color: '#EC4899', trend: '+42%', forecast: '+$580M' },
  ];

  const AI_INSIGHTS = [
    {
      type: 'opportunity',
      icon: TrendingUp,
      color: '#10B981',
      title: 'VIP Demand Surge',
      message: 'VIP ticket demand projected to increase by 21% before registration closes.',
      impact: '+$85M potential revenue'
    },
    {
      type: 'optimization',
      icon: Zap,
      color: '#8B5CF6',
      title: 'Booth Traffic Optimization',
      message: 'Booth traffic optimization could improve sponsor ROI by 18%.',
      impact: '+$165M sponsor value'
    },
    {
      type: 'capacity',
      icon: AlertTriangle,
      color: '#F59E0B',
      title: 'Session Capacity Alert',
      message: 'Session capacity should be increased for AI & Innovation keynote.',
      impact: '2,400 additional seats needed'
    },
    {
      type: 'risk',
      icon: Shield,
      color: '#EF4444',
      title: 'Congestion Detected',
      message: 'Potential congestion detected near Entrance B during peak check-in.',
      impact: 'Deploy 12 additional staff'
    },
    {
      type: 'marketing',
      icon: Activity,
      color: '#06B6D4',
      title: 'Campaign Opportunity',
      message: 'Targeted email campaign could increase registrations by 9%.',
      impact: '+1.1M new registrations'
    },
  ];

  const LIVE_ACTIVITY = [
    { event: 'Ticket purchased', time: '2s ago', icon: DollarSign, color: '#10B981' },
    { event: 'Attendee checked in', time: '5s ago', icon: CheckCircle, color: '#06B6D4' },
    { event: 'Speaker session started', time: '12s ago', icon: Calendar, color: '#8B5CF6' },
    { event: 'Vendor delivery completed', time: '18s ago', icon: Building2, color: '#F59E0B' },
    { event: 'Sponsor activation launched', time: '24s ago', icon: Sparkles, color: '#FFD700' },
    { event: 'Crowd alert detected', time: '31s ago', icon: AlertTriangle, color: '#EF4444' },
    { event: 'Live stream started', time: '45s ago', icon: Globe, color: '#EC4899' },
    { event: 'AI schedule optimized', time: '52s ago', icon: Zap, color: '#8B5CF6' },
  ];

  const GLOBAL_EVENTS = [
    { region: 'North America', events: 524, attendees: '4.2M', revenue: '$3.2B', live: 87, color: '#06B6D4' },
    { region: 'Europe', events: 312, attendees: '2.8M', revenue: '$2.1B', live: 52, color: '#8B5CF6' },
    { region: 'Asia Pacific', events: 287, attendees: '1.8M', revenue: '$1.4B', live: 41, color: '#10B981' },
    { region: 'Latin America', events: 89, attendees: '420K', revenue: '$320M', live: 15, color: '#F59E0B' },
    { region: 'Middle East', events: 48, attendees: '180K', revenue: '$180M', live: 8, color: '#EC4899' },
  ];

  const REVENUE_INTELLIGENCE = [
    { category: 'Ticket Sales', current: '$5.8B', target: '$6.5B', progress: 89, color: '#06B6D4' },
    { category: 'Sponsorship', current: '$920M', target: '$1.1B', progress: 84, color: '#FFD700' },
    { category: 'Merchandise', current: '$340M', target: '$400M', progress: 85, color: '#8B5CF6' },
    { category: 'Vendor Fees', current: '$210M', target: '$250M', progress: 84, color: '#10B981' },
  ];

  const OPERATIONS_HEALTH = [
    { system: 'Ticketing Platform', status: 'operational', uptime: '99.9%', load: '67%', color: '#10B981' },
    { system: 'Event Mobile App', status: 'operational', uptime: '99.7%', load: '72%', color: '#10B981' },
    { system: 'Payment Systems', status: 'operational', uptime: '99.8%', load: '54%', color: '#10B981' },
    { system: 'AI Services', status: 'operational', uptime: '99.9%', load: '81%', color: '#10B981' },
    { system: 'Live Streaming', status: 'degraded', uptime: '98.5%', load: '94%', color: '#F59E0B' },
    { system: 'Access Control', status: 'operational', uptime: '99.6%', load: '48%', color: '#10B981' },
  ];

  const AUDIENCE_PERFORMANCE = [
    { metric: 'Registration Conversion', value: '24%', target: '28%', trend: '+4%', color: '#06B6D4' },
    { metric: 'Check-in Rate', value: '93%', target: '95%', trend: '+2%', color: '#10B981' },
    { metric: 'Session Attendance', value: '87%', target: '90%', trend: '+6%', color: '#8B5CF6' },
    { metric: 'Engagement Score', value: '94%', target: '96%', trend: '+5%', color: '#F59E0B' },
    { metric: 'Satisfaction Rate', value: '4.8/5', target: '4.9/5', trend: '+5%', color: '#EC4899' },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerIcon}>
          <BarChart3 size={48} color="#06B6D4" />
        </View>
        <View>
          <Text style={styles.headerTitle}>Executive Dashboard</Text>
          <Text style={styles.headerSubtitle}>Chief Event Officer Command Center</Text>
        </View>
      </View>

      {/* Event KPIs */}
      <View style={styles.kpiSection}>
        <Text style={styles.kpiSectionTitle}>Event KPIs</Text>
        <View style={styles.kpiGrid}>
          {EVENT_KPIS.map((kpi, index) => (
            <View key={index} style={[styles.kpiCard, { borderColor: kpi.color + '40' }]}>
              <View style={[styles.kpiIcon, { backgroundColor: kpi.color + '20' }]}>
                <kpi.icon size={24} color={kpi.color} />
              </View>
              <Text style={styles.kpiValue}>{kpi.value}</Text>
              <Text style={styles.kpiLabel}>{kpi.label}</Text>
              <View style={styles.kpiTrends}>
                <View style={[styles.trendBadge, { backgroundColor: kpi.color + '20' }]}>
                  <TrendingUp size={10} color={kpi.color} />
                  <Text style={[styles.trendText, { color: kpi.color }]}>{kpi.trend}</Text>
                </View>
                <Text style={styles.forecastText}>Forecast: {kpi.forecast}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Revenue KPIs */}
      <View style={styles.kpiSection}>
        <Text style={styles.kpiSectionTitle}>Revenue KPIs</Text>
        <View style={styles.kpiGrid}>
          {REVENUE_KPIS.map((kpi, index) => (
            <View key={index} style={[styles.kpiCard, { borderColor: kpi.color + '40' }]}>
              <View style={[styles.kpiIcon, { backgroundColor: kpi.color + '20' }]}>
                <kpi.icon size={24} color={kpi.color} />
              </View>
              <Text style={styles.kpiValue}>{kpi.value}</Text>
              <Text style={styles.kpiLabel}>{kpi.label}</Text>
              <View style={styles.kpiTrends}>
                <View style={[styles.trendBadge, { backgroundColor: kpi.color + '20' }]}>
                  <TrendingUp size={10} color={kpi.color} />
                  <Text style={[styles.trendText, { color: kpi.color }]}>{kpi.trend}</Text>
                </View>
                <Text style={styles.forecastText}>Forecast: {kpi.forecast}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Operations KPIs */}
      <View style={styles.kpiSection}>
        <Text style={styles.kpiSectionTitle}>Operations KPIs</Text>
        <View style={styles.kpiGrid}>
          {OPERATIONS_KPIS.map((kpi, index) => (
            <View key={index} style={[styles.kpiCard, { borderColor: kpi.color + '40' }]}>
              <View style={[styles.kpiIcon, { backgroundColor: kpi.color + '20' }]}>
                <kpi.icon size={24} color={kpi.color} />
              </View>
              <Text style={styles.kpiValue}>{kpi.value}</Text>
              <Text style={styles.kpiLabel}>{kpi.label}</Text>
              <View style={styles.kpiTrends}>
                <View style={[styles.trendBadge, { backgroundColor: kpi.color + '20' }]}>
                  <TrendingUp size={10} color={kpi.color} />
                  <Text style={[styles.trendText, { color: kpi.color }]}>{kpi.trend}</Text>
                </View>
                <Text style={styles.forecastText}>Forecast: {kpi.forecast}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Marketing KPIs */}
      <View style={styles.kpiSection}>
        <Text style={styles.kpiSectionTitle}>Marketing KPIs</Text>
        <View style={styles.kpiGrid}>
          {MARKETING_KPIS.map((kpi, index) => (
            <View key={index} style={[styles.kpiCard, { borderColor: kpi.color + '40' }]}>
              <View style={[styles.kpiIcon, { backgroundColor: kpi.color + '20' }]}>
                <kpi.icon size={24} color={kpi.color} />
              </View>
              <Text style={styles.kpiValue}>{kpi.value}</Text>
              <Text style={styles.kpiLabel}>{kpi.label}</Text>
              <View style={styles.kpiTrends}>
                <View style={[styles.trendBadge, { backgroundColor: kpi.color + '20' }]}>
                  <TrendingUp size={10} color={kpi.color} />
                  <Text style={[styles.trendText, { color: kpi.color }]}>{kpi.trend}</Text>
                </View>
                <Text style={styles.forecastText}>Forecast: {kpi.forecast}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* AI KPIs */}
      <View style={styles.kpiSection}>
        <Text style={styles.kpiSectionTitle}>AI KPIs</Text>
        <View style={styles.kpiGrid}>
          {AI_KPIS.map((kpi, index) => (
            <View key={index} style={[styles.kpiCard, { borderColor: kpi.color + '40' }]}>
              <View style={[styles.kpiIcon, { backgroundColor: kpi.color + '20' }]}>
                <kpi.icon size={24} color={kpi.color} />
              </View>
              <Text style={styles.kpiValue}>{kpi.value}</Text>
              <Text style={styles.kpiLabel}>{kpi.label}</Text>
              <View style={styles.kpiTrends}>
                <View style={[styles.trendBadge, { backgroundColor: kpi.color + '20' }]}>
                  <TrendingUp size={10} color={kpi.color} />
                  <Text style={[styles.trendText, { color: kpi.color }]}>{kpi.trend}</Text>
                </View>
                <Text style={styles.forecastText}>Forecast: {kpi.forecast}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* AI Insights Center */}
      <View style={styles.insightsSection}>
        <Text style={styles.sectionTitle}>AI Insights Center</Text>
        <Text style={styles.sectionDescription}>Executive intelligence recommendations</Text>
        {AI_INSIGHTS.map((insight, index) => (
          <View key={index} style={[styles.insightCard, { borderColor: insight.color + '40' }]}>
            <View style={[styles.insightIcon, { backgroundColor: insight.color + '20' }]}>
              <insight.icon size={28} color={insight.color} />
            </View>
            <View style={styles.insightContent}>
              <Text style={styles.insightTitle}>{insight.title}</Text>
              <Text style={styles.insightMessage}>{insight.message}</Text>
              <Text style={[styles.insightImpact, { color: insight.color }]}>{insight.impact}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Global Event Dashboard */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Global Event Dashboard</Text>
        <View style={styles.globalGrid}>
          {GLOBAL_EVENTS.map((region, index) => (
            <View key={index} style={[styles.globalCard, { borderColor: region.color + '40' }]}>
              <View style={styles.globalHeader}>
                <View style={[styles.globalIcon, { backgroundColor: region.color + '20' }]}>
                  <Globe size={24} color={region.color} />
                </View>
                <View style={styles.globalInfo}>
                  <Text style={styles.globalRegion}>{region.region}</Text>
                  <Text style={styles.globalEvents}>{region.events} events</Text>
                </View>
                <View style={[styles.liveBadge, { backgroundColor: '#10B98120' }]}>
                  <Activity size={12} color="#10B981" />
                  <Text style={styles.liveCount}>{region.live} live</Text>
                </View>
              </View>
              <View style={styles.globalStats}>
                <View style={styles.globalStat}>
                  <Users size={14} color="#9CA3AF" />
                  <Text style={styles.globalStatLabel}>{region.attendees}</Text>
                </View>
                <View style={styles.globalStat}>
                  <DollarSign size={14} color="#9CA3AF" />
                  <Text style={[styles.globalStatLabel, { color: region.color }]}>{region.revenue}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Revenue Intelligence Engine */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Revenue Intelligence Engine</Text>
        <Text style={styles.sectionDescription}>Real-time revenue tracking vs targets</Text>
        {REVENUE_INTELLIGENCE.map((revenue, index) => (
          <View key={index} style={styles.revenueCard}>
            <View style={styles.revenueHeader}>
              <Text style={styles.revenueCategory}>{revenue.category}</Text>
              <View style={styles.revenueValues}>
                <Text style={styles.revenueCurrent}>{revenue.current}</Text>
                <Text style={styles.revenueTarget}>/ {revenue.target}</Text>
              </View>
            </View>
            <View style={styles.revenueBar}>
              <View 
                style={[
                  styles.revenueFill, 
                  { 
                    width: `${revenue.progress}%`,
                    backgroundColor: revenue.color
                  } 
                ]} 
              />
            </View>
            <Text style={[styles.revenueProgress, { color: revenue.color }]}>{revenue.progress}% of target</Text>
          </View>
        ))}
      </View>

      {/* Operations Health Snapshot */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Operations Health Snapshot</Text>
        <View style={styles.healthGrid}>
          {OPERATIONS_HEALTH.map((system, index) => (
            <View key={index} style={[styles.healthCard, { borderColor: system.color + '40' }]}>
              <View style={styles.healthHeader}>
                <Text style={styles.healthSystem}>{system.system}</Text>
                <View style={[styles.healthStatus, { backgroundColor: system.color + '20' }]}>
                  <CheckCircle size={12} color={system.color} />
                  <Text style={[styles.healthStatusText, { color: system.color }]}>{system.status}</Text>
                </View>
              </View>
              <View style={styles.healthMetrics}>
                <View style={styles.healthMetric}>
                  <Text style={styles.healthMetricLabel}>Uptime</Text>
                  <Text style={styles.healthMetricValue}>{system.uptime}</Text>
                </View>
                <View style={styles.healthMetric}>
                  <Text style={styles.healthMetricLabel}>Load</Text>
                  <Text style={styles.healthMetricValue}>{system.load}</Text>
                </View>
              </View>
              <View style={styles.healthLoadBar}>
                <View 
                  style={[
                    styles.healthLoadFill, 
                    { 
                      width: system.load,
                      backgroundColor: system.color
                    } 
                  ]} 
                />
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Audience Performance Center */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Audience Performance Center</Text>
        <View style={styles.audienceGrid}>
          {AUDIENCE_PERFORMANCE.map((metric, index) => (
            <View key={index} style={[styles.audienceCard, { borderColor: metric.color + '40' }]}>
              <Text style={styles.audienceValue}>{metric.value}</Text>
              <Text style={styles.audienceMetric}>{metric.metric}</Text>
              <View style={[styles.audienceTrend, { backgroundColor: metric.color + '20' }]}>
                <TrendingUp size={12} color={metric.color} />
                <Text style={[styles.audienceTrendText, { color: metric.color }]}>{metric.trend}</Text>
              </View>
              <Text style={styles.audienceTarget}>Target: {metric.target}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Real-Time Activity Feed */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Real-Time Event Activity</Text>
        <View style={styles.activityFeed}>
          {LIVE_ACTIVITY.map((activity, index) => (
            <View key={index} style={styles.activityItem}>
              <View style={[styles.activityIcon, { backgroundColor: activity.color + '20' }]}>
                <activity.icon size={16} color={activity.color} />
              </View>
              <Text style={styles.activityEvent}>{activity.event}</Text>
              <Text style={styles.activityTime}>{activity.time}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.actionsSection}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity
            onPress={() => router.push('/event-management/planning')}
            style={[styles.actionButton, { backgroundColor: '#06B6D415', borderColor: '#06B6D440' }]}
          >
            <Calendar size={24} color="#06B6D4" />
            <Text style={[styles.actionText, { color: '#06B6D4' }]}>Event Planning</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push('/event-management/ticketing')}
            style={[styles.actionButton, { backgroundColor: '#8B5CF615', borderColor: '#8B5CF640' }]}
          >
            <DollarSign size={24} color="#8B5CF6" />
            <Text style={[styles.actionText, { color: '#8B5CF6' }]}>Ticketing</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push('/event-management/venues')}
            style={[styles.actionButton, { backgroundColor: '#10B98115', borderColor: '#10B98140' }]}
          >
            <MapPin size={24} color="#10B981" />
            <Text style={[styles.actionText, { color: '#10B981' }]}>Venues</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push('/event-management/live-operations')}
            style={[styles.actionButton, { backgroundColor: '#F59E0B15', borderColor: '#F59E0B40' }]}
          >
            <Activity size={24} color="#F59E0B" />
            <Text style={[styles.actionText, { color: '#F59E0B' }]}>Live Operations</Text>
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
  kpiSection: {
    padding: 16,
  },
  kpiSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  kpiGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  kpiCard: {
    flex: 1,
    minWidth: 140,
    backgroundColor: '#0A0F1A',
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    gap: 6,
  },
  kpiIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  kpiValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  kpiLabel: {
    fontSize: 11,
    color: '#9CA3AF',
    textAlign: 'center',
  },
  kpiTrends: {
    alignItems: 'center',
    gap: 4,
  },
  trendBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 8,
    gap: 4,
  },
  trendText: {
    fontSize: 10,
    fontWeight: '600',
  },
  forecastText: {
    fontSize: 9,
    color: '#6B7280',
  },
  insightsSection: {
    padding: 16,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 14,
    color: '#9CA3AF',
    marginBottom: 16,
  },
  insightCard: {
    flexDirection: 'row',
    backgroundColor: '#0A0F1A',
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    gap: 16,
  },
  insightIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  insightContent: {
    flex: 1,
    gap: 4,
  },
  insightTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  insightMessage: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  insightImpact: {
    fontSize: 12,
    fontWeight: '600',
  },
  section: {
    padding: 16,
    marginTop: 8,
  },
  globalGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  globalCard: {
    flex: 1,
    minWidth: 200,
    backgroundColor: '#0A0F1A',
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
  },
  globalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  globalIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  globalInfo: {
    flex: 1,
  },
  globalRegion: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  globalEvents: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  liveCount: {
    fontSize: 11,
    fontWeight: '600',
    color: '#10B981',
  },
  globalStats: {
    flexDirection: 'row',
    backgroundColor: '#1F2937',
    borderRadius: 8,
    padding: 12,
    gap: 16,
  },
  globalStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  globalStatLabel: {
    fontSize: 12,
    color: '#9CA3AF',
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
    alignItems: 'center',
    marginBottom: 8,
  },
  revenueCategory: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  revenueValues: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
  },
  revenueCurrent: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#10B981',
  },
  revenueTarget: {
    fontSize: 13,
    color: '#9CA3AF',
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
  revenueProgress: {
    fontSize: 12,
    fontWeight: '600',
  },
  healthGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  healthCard: {
    flex: 1,
    minWidth: 180,
    backgroundColor: '#0A0F1A',
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
  },
  healthHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  healthSystem: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  healthStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  healthStatusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  healthMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 12,
  },
  healthMetric: {
    alignItems: 'center',
  },
  healthMetricLabel: {
    fontSize: 11,
    color: '#9CA3AF',
  },
  healthMetricValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  healthLoadBar: {
    height: 4,
    backgroundColor: '#1F2937',
    borderRadius: 2,
    overflow: 'hidden',
  },
  healthLoadFill: {
    height: '100%',
    borderRadius: 2,
  },
  audienceGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  audienceCard: {
    flex: 1,
    minWidth: 140,
    backgroundColor: '#0A0F1A',
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    gap: 8,
  },
  audienceValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  audienceMetric: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
  },
  audienceTrend: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  audienceTrendText: {
    fontSize: 11,
    fontWeight: '600',
  },
  audienceTarget: {
    fontSize: 10,
    color: '#6B7280',
  },
  activityFeed: {
    backgroundColor: '#0A0F1A',
    borderRadius: 12,
    padding: 12,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#1F2937',
    gap: 12,
  },
  activityIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activityEvent: {
    flex: 1,
    fontSize: 14,
    color: '#FFFFFF',
  },
  activityTime: {
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
