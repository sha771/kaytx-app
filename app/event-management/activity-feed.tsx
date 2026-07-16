import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { 
  Activity, Radio, CheckCircle, Truck, Zap, AlertTriangle, Video, Brain,
  DollarSign, Users, Calendar, Clock, TrendingUp, Filter, Pause, Play
} from 'lucide-react-native';

export default function RealTimeEventActivityFeed() {
  const router = useRouter();
  const [isLive, setIsLive] = useState(true);

  const ACTIVITY_STATS = [
    { label: 'Live Activities', value: '847', icon: Activity, color: '#06B6D4' },
    { label: 'Events Active', value: '47', icon: Radio, color: '#8B5CF6' },
    { label: 'Attendees Online', value: '124K', icon: Users, color: '#10B981' },
    { label: 'Throughput', value: '12.4/s', icon: TrendingUp, color: '#F59E0B' },
  ];

  const ACTIVITY_TYPES = [
    { type: 'ticket', count: 284, icon: DollarSign, color: '#10B981' },
    { type: 'check-in', count: 347, icon: CheckCircle, color: '#06B6D4' },
    { type: 'session', count: 89, icon: Radio, color: '#8B5CF6' },
    { type: 'vendor', count: 45, icon: Truck, color: '#F59E0B' },
    { type: 'sponsor', count: 28, icon: Zap, color: '#FFD700' },
    { type: 'alert', count: 12, icon: AlertTriangle, color: '#EF4444' },
    { type: 'stream', count: 34, icon: Video, color: '#EC4899' },
    { type: 'ai', count: 8, icon: Brain, color: '#10B981' },
  ];

  const LIVE_ACTIVITIES = [
    { id: 1, type: 'ticket', event: 'Tech Summit 2026', activity: 'Ticket purchased', details: 'VIP Tier - $1,200', user: 'John Smith', time: '2s ago', icon: DollarSign, color: '#10B981' },
    { id: 2, type: 'check-in', event: 'Global Music Festival', activity: 'Attendee checked in', details: 'Gate A - QR Validated', user: 'Sarah Johnson', time: '5s ago', icon: CheckCircle, color: '#06B6D4' },
    { id: 3, type: 'session', event: 'AI Innovation Conference', activity: 'Speaker session started', details: 'AI & Innovation Keynote', user: 'Dr. Sarah Chen', time: '12s ago', icon: Radio, color: '#8B5CF6' },
    { id: 4, type: 'vendor', event: 'Tech Summit 2026', activity: 'Vendor delivery completed', details: 'Catering - Lunch Service', user: 'Gourmet Events', time: '24s ago', icon: Truck, color: '#F59E0B' },
    { id: 5, type: 'sponsor', event: 'Global Music Festival', activity: 'Sponsor activation launched', details: 'TechCorp - Main Stage', user: 'TechCorp Team', time: '31s ago', icon: Zap, color: '#FFD700' },
    { id: 6, type: 'alert', event: 'Tech Summit 2026', activity: 'Crowd alert detected', details: 'Entrance B - High Density', user: 'System', time: '45s ago', icon: AlertTriangle, color: '#EF4444' },
    { id: 7, type: 'stream', event: 'AI Innovation Conference', activity: 'Live stream started', details: 'Main Hall - 8,470 viewers', user: 'Broadcast Team', time: '58s ago', icon: Video, color: '#EC4899' },
    { id: 8, type: 'ai', event: 'Global Music Festival', activity: 'AI schedule optimized', details: 'Session timing adjusted', user: 'Agent Planner', time: '1m ago', icon: Brain, color: '#10B981' },
    { id: 9, type: 'ticket', event: 'Corporate Summit', activity: 'Ticket purchased', details: 'General Admission - $450', user: 'Mike Davis', time: '1m ago', icon: DollarSign, color: '#10B981' },
    { id: 10, type: 'check-in', event: 'Tech Summit 2026', activity: 'Attendee checked in', details: 'Gate C - QR Validated', user: 'Emily Brown', time: '1m ago', icon: CheckCircle, color: '#06B6D4' },
    { id: 11, type: 'session', event: 'Global Music Festival', activity: 'Speaker session started', details: 'Main Stage Performance', user: 'The Electric Band', time: '2m ago', icon: Radio, color: '#8B5CF6' },
    { id: 12, type: 'vendor', event: 'AI Innovation Conference', activity: 'Vendor delivery completed', details: 'Equipment - Audio Setup', user: 'Sound Pro', time: '2m ago', icon: Truck, color: '#F59E0B' },
    { id: 13, type: 'sponsor', event: 'Tech Summit 2026', activity: 'Sponsor activation launched', details: 'Innovation Ventures - Booth', user: 'Innovation Team', time: '2m ago', icon: Zap, color: '#FFD700' },
    { id: 14, type: 'stream', event: 'Global Music Festival', activity: 'Live stream started', details: 'Side Stage - 12,400 viewers', user: 'Broadcast Team', time: '3m ago', icon: Video, color: '#EC4899' },
    { id: 15, type: 'ai', event: 'Tech Summit 2026', activity: 'AI schedule optimized', details: 'Resource allocation updated', user: 'Agent Venue', time: '3m ago', icon: Brain, color: '#10B981' },
  ];

  const EVENT_SUMMARY = [
    { event: 'Tech Summit 2026', activities: 347, status: 'live', color: '#06B6D4' },
    { event: 'Global Music Festival', activities: 284, status: 'live', color: '#8B5CF6' },
    { event: 'AI Innovation Conference', activities: 124, status: 'live', color: '#10B981' },
    { event: 'Corporate Summit', activities: 89, status: 'upcoming', color: '#F59E0B' },
  ];

  const OPERATIONS_WALL = [
    { metric: 'System Uptime', value: '99.8%', status: 'optimal', color: '#10B981' },
    { metric: 'API Response Time', value: '24ms', status: 'optimal', color: '#10B981' },
    { metric: 'Database Load', value: '67%', status: 'optimal', color: '#10B981' },
    { metric: 'Memory Usage', value: '4.2GB', status: 'warning', color: '#F59E0B' },
    { metric: 'Network Throughput', value: '8.4 Gbps', status: 'optimal', color: '#10B981' },
    { metric: 'Cache Hit Rate', value: '94%', status: 'optimal', color: '#06B6D4' },
  ];

  const ACTIVITY_TIMELINE = [
    { time: '09:00', ticket: 45, checkin: 89, session: 12, total: 146, color: '#06B6D4' },
    { time: '10:00', ticket: 67, checkin: 124, session: 24, total: 215, color: '#8B5CF6' },
    { time: '11:00', ticket: 89, checkin: 156, session: 34, total: 279, color: '#10B981' },
    { time: '12:00', ticket: 34, checkin: 89, session: 45, total: 168, color: '#F59E0B' },
    { time: '13:00', ticket: 56, checkin: 112, session: 28, total: 196, color: '#FFD700' },
    { time: '14:00', ticket: 78, checkin: 145, session: 18, total: 241, color: '#EC4899' },
  ];

  const SYSTEM_STATUS = [
    { system: 'Authentication', status: 'operational', uptime: '99.9%', color: '#10B981' },
    { system: 'Database Cluster', status: 'operational', uptime: '99.8%', color: '#10B981' },
    { system: 'API Gateway', status: 'operational', uptime: '99.7%', color: '#10B981' },
    { system: 'Message Queue', status: 'degraded', uptime: '98.5%', color: '#F59E0B' },
    { system: 'Cache Layer', status: 'operational', uptime: '99.9%', color: '#10B981' },
    { system: 'Stream Service', status: 'operational', uptime: '99.6%', color: '#06B6D4' },
  ];

  const PERFORMANCE_METRICS = [
    { metric: 'Avg Response Time', value: '24ms', target: '30ms', status: 'excellent', color: '#10B981' },
    { metric: 'Error Rate', value: '0.12%', target: '0.5%', status: 'excellent', color: '#10B981' },
    { metric: 'Throughput', value: '1,240 req/s', target: '1,000 req/s', status: 'excellent', color: '#10B981' },
    { metric: 'P95 Latency', value: '45ms', target: '50ms', status: 'good', color: '#06B6D4' },
  ];

  const ALERT_TRENDS = [
    { period: 'Last Hour', critical: 2, warning: 8, info: 24, total: 34, color: '#EF4444' },
    { period: 'Last 6 Hours', critical: 12, warning: 45, info: 124, total: 181, color: '#F59E0B' },
    { period: 'Last 24 Hours', critical: 28, warning: 89, info: 347, total: 464, color: '#10B981' },
    { period: 'Last 7 Days', critical: 67, warning: 234, info: 890, total: 1191, color: '#06B6D4' },
  ];

  const GEOGRAPHIC_DISTRIBUTION = [
    { region: 'North America', activities: 447, percentage: 52, color: '#10B981' },
    { region: 'Europe', activities: 234, percentage: 27, color: '#06B6D4' },
    { region: 'Asia Pacific', activities: 124, percentage: 15, color: '#8B5CF6' },
    { region: 'Other Regions', activities: 42, percentage: 6, color: '#F59E0B' },
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'ticket': return '#10B981';
      case 'check-in': return '#06B6D4';
      case 'session': return '#8B5CF6';
      case 'vendor': return '#F59E0B';
      case 'sponsor': return '#FFD700';
      case 'alert': return '#EF4444';
      case 'stream': return '#EC4899';
      case 'ai': return '#10B981';
      default: return '#06B6D4';
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerIcon}>
          <Activity size={48} color="#06B6D4" />
        </View>
        <View>
          <Text style={styles.headerTitle}>Real-Time Activity Feed</Text>
          <Text style={styles.headerSubtitle}>Live Event Operations Wall</Text>
        </View>
        <TouchableOpacity
          style={[styles.liveToggle, { backgroundColor: isLive ? '#10B981' : '#374151' }]}
          onPress={() => setIsLive(!isLive)}
        >
          {isLive ? <Pause size={20} color="white" /> : <Play size={20} color="white" />}
          <Text style={styles.liveToggleText}>{isLive ? 'Live' : 'Paused'}</Text>
        </TouchableOpacity>
      </View>

      {/* Activity Stats */}
      <View style={styles.statsContainer}>
        {ACTIVITY_STATS.map((stat, index) => (
          <View key={index} style={[styles.statCard, { borderColor: stat.color + '40' }]}>
            <View style={[styles.statIcon, { backgroundColor: stat.color + '20' }]}>
              <stat.icon size={24} color={stat.color} />
            </View>
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </View>
        ))}
      </View>

      {/* Activity Types */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Activity Types</Text>
        <View style={styles.typesGrid}>
          {ACTIVITY_TYPES.map((type, index) => (
            <View key={index} style={[styles.typeCard, { borderColor: type.color + '40' }]}>
              <View style={[styles.typeIcon, { backgroundColor: type.color + '20' }]}>
                <type.icon size={20} color={type.color} />
              </View>
              <Text style={styles.typeCount}>{type.count}</Text>
              <Text style={styles.typeName}>{type.type}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Operations Wall Dashboard */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Operations Wall Dashboard</Text>
        <Text style={styles.sectionDescription}>Real-time system and infrastructure metrics</Text>
        <View style={styles.operationsGrid}>
          {OPERATIONS_WALL.map((op, index) => (
            <View key={index} style={[styles.operationsCard, { borderColor: op.color + '40' }]}>
              <Text style={styles.operationsValue}>{op.value}</Text>
              <Text style={styles.operationsMetric}>{op.metric}</Text>
              <View style={[styles.operationsStatus, { backgroundColor: op.color + '20' }]}>
                <CheckCircle size={10} color={op.color} />
                <Text style={[styles.operationsStatusText, { color: op.color }]}>{op.status}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Activity Timeline */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Activity Timeline</Text>
        <Text style={styles.sectionDescription}>Hourly activity distribution across event operations</Text>
        {ACTIVITY_TIMELINE.map((timeline, index) => (
          <View key={index} style={styles.timelineCard}>
            <View style={styles.timelineHeader}>
              <Text style={styles.timelineTime}>{timeline.time}</Text>
              <View style={styles.timelineTotal}>
                <Text style={styles.timelineTotalLabel}>Total</Text>
                <Text style={[styles.timelineTotalValue, { color: timeline.color }]}>{timeline.total}</Text>
              </View>
            </View>
            <View style={styles.timelineBars}>
              <View style={styles.timelineBarContainer}>
                <Text style={styles.timelineBarLabel}>Ticket</Text>
                <View style={styles.timelineBar}>
                  <View style={[styles.timelineBarFill, { width: `${(timeline.ticket / 156) * 100}%`, backgroundColor: '#10B981' }]} />
                </View>
                <Text style={styles.timelineBarValue}>{timeline.ticket}</Text>
              </View>
              <View style={styles.timelineBarContainer}>
                <Text style={styles.timelineBarLabel}>Check-in</Text>
                <View style={styles.timelineBar}>
                  <View style={[styles.timelineBarFill, { width: `${(timeline.checkin / 156) * 100}%`, backgroundColor: '#06B6D4' }]} />
                </View>
                <Text style={styles.timelineBarValue}>{timeline.checkin}</Text>
              </View>
              <View style={styles.timelineBarContainer}>
                <Text style={styles.timelineBarLabel}>Session</Text>
                <View style={styles.timelineBar}>
                  <View style={[styles.timelineBarFill, { width: `${(timeline.session / 156) * 100}%`, backgroundColor: '#8B5CF6' }]} />
                </View>
                <Text style={styles.timelineBarValue}>{timeline.session}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      {/* System Status */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>System Status</Text>
        <Text style={styles.sectionDescription}>Infrastructure component health monitoring</Text>
        {SYSTEM_STATUS.map((system, index) => (
          <View key={index} style={styles.systemCard}>
            <View style={styles.systemHeader}>
              <Text style={styles.systemName}>{system.system}</Text>
              <View style={[styles.systemStatusBadge, { backgroundColor: system.color + '20' }]}>
                <Activity size={12} color={system.color} />
                <Text style={[styles.systemStatusText, { color: system.color }]}>{system.status}</Text>
              </View>
            </View>
            <View style={styles.systemMetrics}>
              <View style={styles.systemMetric}>
                <Text style={styles.systemMetricLabel}>Uptime</Text>
                <Text style={styles.systemMetricValue}>{system.uptime}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      {/* Performance Metrics */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Performance Metrics</Text>
        <Text style={styles.sectionDescription}>Application performance and SLA compliance</Text>
        <View style={styles.performanceGrid}>
          {PERFORMANCE_METRICS.map((perf, index) => (
            <View key={index} style={[styles.performanceCard, { borderColor: perf.color + '40' }]}>
              <Text style={styles.performanceValue}>{perf.value}</Text>
              <Text style={styles.performanceMetric}>{perf.metric}</Text>
              <Text style={styles.performanceTarget}>Target: {perf.target}</Text>
              <View style={[styles.performanceStatus, { backgroundColor: perf.color + '20' }]}>
                <TrendingUp size={10} color={perf.color} />
                <Text style={[styles.performanceStatusText, { color: perf.color }]}>{perf.status}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Alert Trends */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Alert Trends</Text>
        <Text style={styles.sectionDescription}>Alert frequency and severity over time</Text>
        {ALERT_TRENDS.map((trend, index) => (
          <View key={index} style={styles.alertTrendCard}>
            <View style={styles.alertTrendHeader}>
              <Text style={styles.alertTrendPeriod}>{trend.period}</Text>
              <View style={styles.alertTrendTotal}>
                <Text style={styles.alertTrendTotalLabel}>Total</Text>
                <Text style={[styles.alertTrendTotalValue, { color: trend.color }]}>{trend.total}</Text>
              </View>
            </View>
            <View style={styles.alertTrendBreakdown}>
              <View style={styles.alertTrendItem}>
                <View style={[styles.alertTrendDot, { backgroundColor: '#EF4444' }]} />
                <Text style={styles.alertTrendLabel}>Critical</Text>
                <Text style={styles.alertTrendValue}>{trend.critical}</Text>
              </View>
              <View style={styles.alertTrendItem}>
                <View style={[styles.alertTrendDot, { backgroundColor: '#F59E0B' }]} />
                <Text style={styles.alertTrendLabel}>Warning</Text>
                <Text style={styles.alertTrendValue}>{trend.warning}</Text>
              </View>
              <View style={styles.alertTrendItem}>
                <View style={[styles.alertTrendDot, { backgroundColor: '#06B6D4' }]} />
                <Text style={styles.alertTrendLabel}>Info</Text>
                <Text style={styles.alertTrendValue}>{trend.info}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      {/* Geographic Distribution */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Geographic Distribution</Text>
        <Text style={styles.sectionDescription}>Activity distribution by region</Text>
        {GEOGRAPHIC_DISTRIBUTION.map((geo, index) => (
          <View key={index} style={styles.geoCard}>
            <View style={styles.geoHeader}>
              <Text style={styles.geoRegion}>{geo.region}</Text>
              <View style={styles.geoPercentage}>
                <Text style={[styles.geoPercentageValue, { color: geo.color }]}>{geo.percentage}%</Text>
              </View>
            </View>
            <View style={styles.geoBar}>
              <View style={[styles.geoBarFill, { width: `${geo.percentage}%`, backgroundColor: geo.color }]} />
            </View>
            <Text style={styles.geoActivities}>{geo.activities} activities</Text>
          </View>
        ))}
      </View>

      {/* Event Summary */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Event Activity Summary</Text>
        {EVENT_SUMMARY.map((summary, index) => (
          <View key={index} style={[styles.summaryCard, { borderColor: summary.color + '40' }]}>
            <View style={styles.summaryHeader}>
              <View style={styles.summaryHeaderLeft}>
                <Text style={styles.summaryEvent}>{summary.event}</Text>
                <View style={[styles.summaryStatus, { backgroundColor: summary.color + '20' }]}>
                  <Radio size={12} color={summary.color} />
                  <Text style={[styles.summaryStatusText, { color: summary.color }]}>{summary.status}</Text>
                </View>
              </View>
              <Text style={styles.summaryActivities}>{summary.activities} activities</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Live Activities Feed */}
      <View style={styles.section}>
        <View style={styles.feedHeader}>
          <Text style={styles.sectionTitle}>Live Activities</Text>
          <TouchableOpacity style={styles.filterButton}>
            <Filter size={18} color="#9CA3AF" />
            <Text style={styles.filterButtonText}>Filter</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.activitiesList}>
          {LIVE_ACTIVITIES.map((activity) => (
            <View key={activity.id} style={styles.activityItem}>
              <View style={[styles.activityIcon, { backgroundColor: activity.color + '20' }]}>
                <activity.icon size={18} color={activity.color} />
              </View>
              <View style={styles.activityContent}>
                <View style={styles.activityHeader}>
                  <Text style={styles.activityEvent}>{activity.event}</Text>
                  <View style={styles.activityTime}>
                    <Clock size={12} color="#9CA3AF" />
                    <Text style={styles.activityTimeText}>{activity.time}</Text>
                  </View>
                </View>
                <Text style={styles.activityName}>{activity.activity}</Text>
                <Text style={styles.activityDetails}>{activity.details}</Text>
                <Text style={styles.activityUser}>{activity.user}</Text>
              </View>
              <View style={[styles.activityIndicator, { backgroundColor: getTypeColor(activity.type) + '20' }]}>
                <Activity size={12} color={getTypeColor(activity.type)} />
              </View>
            </View>
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
            <Filter size={24} color="#06B6D4" />
            <Text style={[styles.actionText, { color: '#06B6D4' }]}>Filter</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: '#8B5CF615', borderColor: '#8B5CF640' }]}
          >
            <Calendar size={24} color="#8B5CF6" />
            <Text style={[styles.actionText, { color: '#8B5CF6' }]}>Export</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: '#10B98115', borderColor: '#10B98140' }]}
          >
            <AlertTriangle size={24} color="#10B981" />
            <Text style={[styles.actionText, { color: '#10B981' }]}>Alerts</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: '#F59E0B15', borderColor: '#F59E0B40' }]}
          >
            <Brain size={24} color="#F59E0B" />
            <Text style={[styles.actionText, { color: '#F59E0B' }]}>AI Ops</Text>
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
  liveToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 8,
    marginLeft: 'auto',
  },
  liveToggleText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
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
  typesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  typeCard: {
    flex: 1,
    minWidth: 100,
    backgroundColor: '#0A0F1A',
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    gap: 6,
  },
  typeIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  typeCount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  typeName: {
    fontSize: 11,
    color: '#9CA3AF',
    textAlign: 'center',
  },
  summaryCard: {
    backgroundColor: '#0A0F1A',
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  summaryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryHeaderLeft: {
    flex: 1,
  },
  summaryEvent: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 6,
  },
  summaryStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 6,
    alignSelf: 'flex-start',
  },
  summaryStatusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  summaryActivities: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#9CA3AF',
  },
  feedHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#1F2937',
    gap: 6,
  },
  filterButtonText: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  activitiesList: {
    backgroundColor: '#0A0F1A',
    borderRadius: 12,
    overflow: 'hidden',
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#1F2937',
    gap: 12,
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activityContent: {
    flex: 1,
  },
  activityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  activityEvent: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  activityTime: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  activityTimeText: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  activityName: {
    fontSize: 13,
    color: '#FFFFFF',
    marginBottom: 2,
  },
  activityDetails: {
    fontSize: 12,
    color: '#9CA3AF',
    marginBottom: 2,
  },
  activityUser: {
    fontSize: 11,
    color: '#6B7280',
  },
  activityIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
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
  operationsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  operationsCard: {
    flex: 1,
    minWidth: 140,
    backgroundColor: '#0A0F1A',
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    gap: 8,
  },
  operationsValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  operationsMetric: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
  },
  operationsStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  operationsStatusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  timelineCard: {
    backgroundColor: '#0A0F1A',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  timelineHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  timelineTime: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  timelineTotal: {
    alignItems: 'flex-end',
  },
  timelineTotalLabel: {
    fontSize: 11,
    color: '#9CA3AF',
  },
  timelineTotalValue: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  timelineBars: {
    gap: 12,
  },
  timelineBarContainer: {
    gap: 6,
  },
  timelineBarLabel: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  timelineBar: {
    height: 8,
    backgroundColor: '#1F2937',
    borderRadius: 4,
    overflow: 'hidden',
  },
  timelineBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  timelineBarValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  systemCard: {
    backgroundColor: '#0A0F1A',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  systemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  systemName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  systemStatusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  systemStatusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  systemMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  systemMetric: {
    alignItems: 'center',
  },
  systemMetricLabel: {
    fontSize: 11,
    color: '#9CA3AF',
  },
  systemMetricValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
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
  performanceMetric: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
  },
  performanceTarget: {
    fontSize: 10,
    color: '#6B7280',
  },
  performanceStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  performanceStatusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  alertTrendCard: {
    backgroundColor: '#0A0F1A',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  alertTrendHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  alertTrendPeriod: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  alertTrendTotal: {
    alignItems: 'flex-end',
  },
  alertTrendTotalLabel: {
    fontSize: 11,
    color: '#9CA3AF',
  },
  alertTrendTotalValue: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  alertTrendBreakdown: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  alertTrendItem: {
    alignItems: 'center',
    gap: 6,
  },
  alertTrendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  alertTrendLabel: {
    fontSize: 11,
    color: '#9CA3AF',
  },
  alertTrendValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  geoCard: {
    backgroundColor: '#0A0F1A',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  geoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  geoRegion: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  geoPercentage: {
    alignItems: 'flex-end',
  },
  geoPercentageValue: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  geoBar: {
    height: 8,
    backgroundColor: '#1F2937',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 6,
  },
  geoBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  geoActivities: {
    fontSize: 12,
    color: '#9CA3AF',
  },
});
