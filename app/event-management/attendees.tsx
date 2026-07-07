import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { 
  Users, CheckCircle, TrendingUp, ArrowRight, BarChart3, Activity,
  Globe, Target, Star, MessageSquare, Calendar, MapPin, Heart
} from 'lucide-react-native';

export default function AttendeeIntelligenceHub() {
  const router = useRouter();

  const ATTENDEE_STATS = [
    { label: 'Total Registrations', value: '12.4M', icon: Users, color: '#06B6D4', trend: '+14%' },
    { label: 'Check-ins Today', value: '847K', icon: CheckCircle, color: '#10B981', trend: '+12%' },
    { label: 'Engagement Score', value: '94%', icon: Activity, color: '#8B5CF6', trend: '+6%' },
    { label: 'Satisfaction Rate', value: '4.8/5', icon: Star, color: '#F59E0B', trend: '+5%' },
  ];

  const DEMOGRAPHICS = [
    { category: 'Age 18-24', percentage: 28, color: '#06B6D4' },
    { category: 'Age 25-34', percentage: 35, color: '#8B5CF6' },
    { category: 'Age 35-44', percentage: 22, color: '#10B981' },
    { category: 'Age 45-54', percentage: 11, color: '#F59E0B' },
    { category: 'Age 55+', percentage: 4, color: '#EC4899' },
  ];

  const ATTENDEE_SEGMENTS = [
    { segment: 'VIP Attendees', count: 124000, avgSpend: '$7,200', satisfaction: '4.9/5', color: '#FFD700' },
    { segment: 'Corporate', count: '2.4M', avgSpend: '$2,400', satisfaction: '4.7/5', color: '#8B5CF6' },
    { segment: 'General', count: '5.2M', avgSpend: '$460', satisfaction: '4.6/5', color: '#06B6D4' },
    { segment: 'Students', count: '3.2M', avgSpend: '$128', satisfaction: '4.5/5', color: '#10B981' },
    { segment: 'Press/Media', count: '8.4K', avgSpend: '$0', satisfaction: '4.8/5', color: '#F59E0B' },
  ];

  const SESSION_ATTENDANCE = [
    { session: 'AI & Innovation Keynote', attendees: 12400, capacity: 15000, fillRate: 83, color: '#06B6D4' },
    { session: 'Future of Tech Panel', attendees: 8900, capacity: 10000, fillRate: 89, color: '#8B5CF6' },
    { session: 'Networking Reception', attendees: 11200, capacity: 12000, fillRate: 93, color: '#10B981' },
    { session: 'Workshop: AI Implementation', attendees: 2400, capacity: 3000, fillRate: 80, color: '#F59E0B' },
    { session: 'Executive Roundtable', attendees: 847, capacity: 1000, fillRate: 85, color: '#EC4899' },
  ];

  const ENGAGEMENT_METRICS = [
    { metric: 'Session Attendance', value: '87%', trend: '+4%', color: '#06B6D4' },
    { metric: 'Networking Connections', value: '1.2M', trend: '+14%', color: '#8B5CF6' },
    { metric: 'App Interactions', value: '8.9M', trend: '+22%', color: '#10B981' },
    { metric: 'Survey Responses', value: '78%', trend: '+8%', color: '#F59E0B' },
    { metric: 'Social Mentions', value: '156K', trend: '+18%', color: '#EC4899' },
  ];

  const TOP_ATTENDEES = [
    {
      name: 'Sarah Chen',
      company: 'TechCorp Inc.',
      eventsAttended: 12,
      totalSpent: '$48,000',
      engagementScore: 98,
      tier: 'VIP',
      lastEvent: 'Tech Summit 2026'
    },
    {
      name: 'Michael Rodriguez',
      company: 'Innovation Labs',
      eventsAttended: 8,
      totalSpent: '$32,400',
      engagementScore: 95,
      tier: 'VIP',
      lastEvent: 'Global Music Festival'
    },
    {
      name: 'Emily Watson',
      company: 'Future Systems',
      eventsAttended: 15,
      totalSpent: '$54,000',
      engagementScore: 94,
      tier: 'VIP',
      lastEvent: 'AI Innovation Conference'
    },
  ];

  const RECENT_ACTIVITY = [
    { action: 'New registration', attendee: 'John Smith', event: 'Tech Summit 2026', time: '2s ago', icon: Users, color: '#10B981' },
    { action: 'Check-in', attendee: 'Sarah Johnson', event: 'Global Music Festival', time: '5s ago', icon: CheckCircle, color: '#06B6D4' },
    { action: 'Session joined', attendee: 'Mike Davis', event: 'AI Innovation Conference', time: '12s ago', icon: Calendar, color: '#8B5CF6' },
    { action: 'Feedback submitted', attendee: 'Lisa Brown', event: 'Tech Summit 2026', time: '24s ago', icon: MessageSquare, color: '#F59E0B' },
    { action: 'Connection made', attendee: 'David Wilson', event: 'Global Music Festival', time: '31s ago', icon: Heart, color: '#EC4899' },
  ];

  const ATTENDEE_JOURNEY = [
    { stage: 'Discovery', attendees: '15.2M', conversion: 100, dropoff: 0, color: '#06B6D4' },
    { stage: 'Interest', attendees: '8.4M', conversion: 55, dropoff: 45, color: '#8B5CF6' },
    { stage: 'Registration', attendees: '6.2M', conversion: 41, dropoff: 14, color: '#10B981' },
    { stage: 'Check-in', attendees: '5.8M', conversion: 38, dropoff: 3, color: '#F59E0B' },
    { stage: 'Engagement', attendees: '5.2M', conversion: 34, dropoff: 4, color: '#EC4899' },
    { stage: 'Retention', attendees: '4.8M', conversion: 32, dropoff: 2, color: '#FFD700' },
  ];

  const AUDIENCE_ANALYTICS = [
    { metric: 'Avg Session Duration', value: '45min', target: '50min', color: '#06B6D4' },
    { metric: 'Networking Rate', value: '12/hr', target: '15/hr', color: '#8B5CF6' },
    { metric: 'Content Consumption', value: '78%', target: '85%', color: '#10B981' },
    { metric: 'Return Rate', value: '67%', target: '70%', color: '#F59E0B' },
  ];

  const BEHAVIORAL_INSIGHTS = [
    { insight: 'Peak engagement occurs during keynote sessions (9AM-11AM)', impact: 'high', category: 'Timing', color: '#06B6D4' },
    { insight: 'VIP attendees spend 3x more on networking events', impact: 'high', category: 'Spending', color: '#FFD700' },
    { insight: 'Mobile app usage peaks during lunch breaks', impact: 'medium', category: 'Behavior', color: '#8B5CF6' },
    { insight: 'First-time attendees prefer guided networking sessions', impact: 'medium', category: 'Preference', color: '#10B981' },
    { insight: 'Post-event survey response rate: 78%', impact: 'high', category: 'Feedback', color: '#F59E0B' },
  ];

  const ENGAGEMENT_TRACKING = [
    { activity: 'Session Attendance', count: '8.9M', participants: '5.2M', rate: '59%', color: '#06B6D4' },
    { activity: 'Networking Events', count: '1.2M', participants: '3.8M', rate: '32%', color: '#8B5CF6' },
    { activity: 'Workshops', count: '847K', participants: '2.4M', rate: '35%', color: '#10B981' },
    { activity: 'Exhibition Visits', count: '2.1M', participants: '4.8M', rate: '44%', color: '#F59E0B' },
    { activity: 'Social Activities', count: '620K', participants: '3.2M', rate: '19%', color: '#EC4899' },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerIcon}>
          <Users size={48} color="#06B6D4" />
        </View>
        <View>
          <Text style={styles.headerTitle}>Attendee Intelligence Hub</Text>
          <Text style={styles.headerSubtitle}>Audience Analytics & Engagement</Text>
        </View>
      </View>

      {/* Attendee Stats */}
      <View style={styles.statsContainer}>
        {ATTENDEE_STATS.map((stat, index) => (
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

      {/* Demographics */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Demographics</Text>
        {DEMOGRAPHICS.map((demo, index) => (
          <View key={index} style={styles.demoCard}>
            <View style={styles.demoHeader}>
              <Text style={styles.demoCategory}>{demo.category}</Text>
              <Text style={styles.demoPercentage}>{demo.percentage}%</Text>
            </View>
            <View style={styles.demoBar}>
              <View 
                style={[
                  styles.demoFill, 
                  { 
                    width: `${demo.percentage}%`,
                    backgroundColor: demo.color
                  } 
                ]} 
              />
            </View>
          </View>
        ))}
      </View>

      {/* Attendee Segments */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Attendee Segments</Text>
        {ATTENDEE_SEGMENTS.map((segment, index) => (
          <View key={index} style={[styles.segmentCard, { borderColor: segment.color + '40' }]}>
            <View style={[styles.segmentHeader, { backgroundColor: segment.color + '20' }]}>
              <Text style={[styles.segmentName, { color: segment.color }]}>{segment.segment}</Text>
              <Text style={[styles.segmentCount, { color: segment.color }]}>{segment.count}</Text>
            </View>
            <View style={styles.segmentStats}>
              <View style={styles.segmentStat}>
                <Text style={styles.segmentStatLabel}>Avg Spend</Text>
                <Text style={styles.segmentStatValue}>{segment.avgSpend}</Text>
              </View>
              <View style={styles.segmentStat}>
                <Text style={styles.segmentStatLabel}>Satisfaction</Text>
                <Text style={styles.segmentStatValue}>{segment.satisfaction}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      {/* Session Attendance */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Session Attendance</Text>
        {SESSION_ATTENDANCE.map((session, index) => (
          <View key={index} style={styles.sessionCard}>
            <View style={styles.sessionHeader}>
              <Text style={styles.sessionName}>{session.session}</Text>
              <Text style={styles.sessionAttendees}>{session.attendees.toLocaleString()} / {session.capacity.toLocaleString()}</Text>
            </View>
            <View style={styles.sessionBar}>
              <View 
                style={[
                  styles.sessionFill, 
                  { 
                    width: `${session.fillRate}%`,
                    backgroundColor: session.color
                  } 
                ]} 
              />
            </View>
            <Text style={styles.sessionFillRate}>{session.fillRate}% capacity</Text>
          </View>
        ))}
      </View>

      {/* Engagement Metrics */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Engagement Metrics</Text>
        <View style={styles.metricsGrid}>
          {ENGAGEMENT_METRICS.map((metric, index) => (
            <View key={index} style={[styles.metricCard, { borderColor: metric.color + '40' }]}>
              <Text style={styles.metricValue}>{metric.value}</Text>
              <Text style={styles.metricLabel}>{metric.metric}</Text>
              <View style={[styles.metricTrend, { backgroundColor: metric.color + '20' }]}>
                <TrendingUp size={12} color={metric.color} />
                <Text style={[styles.metricTrendText, { color: metric.color }]}>{metric.trend}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Top Attendees */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Top Attendees</Text>
        {TOP_ATTENDEES.map((attendee, index) => (
          <View key={index} style={styles.attendeeCard}>
            <View style={styles.attendeeHeader}>
              <View style={[styles.attendeeAvatar, { backgroundColor: '#06B6D420' }]}>
                <Users size={24} color="#06B6D4" />
              </View>
              <View style={styles.attendeeInfo}>
                <Text style={styles.attendeeName}>{attendee.name}</Text>
                <Text style={styles.attendeeCompany}>{attendee.company}</Text>
              </View>
              <View style={[styles.tierBadge, { backgroundColor: '#FFD70020' }]}>
                <Star size={14} color="#FFD700" />
                <Text style={[styles.tierText, { color: '#FFD700' }]}>{attendee.tier}</Text>
              </View>
            </View>
            <View style={styles.attendeeStats}>
              <View style={styles.attendeeStat}>
                <Text style={styles.attendeeStatValue}>{attendee.eventsAttended}</Text>
                <Text style={styles.attendeeStatLabel}>Events</Text>
              </View>
              <View style={styles.attendeeStat}>
                <Text style={styles.attendeeStatValue}>{attendee.totalSpent}</Text>
                <Text style={styles.attendeeStatLabel}>Total Spent</Text>
              </View>
              <View style={styles.attendeeStat}>
                <Text style={styles.attendeeStatValue}>{attendee.engagementScore}%</Text>
                <Text style={styles.attendeeStatLabel}>Engagement</Text>
              </View>
            </View>
            <View style={styles.attendeeFooter}>
              <Calendar size={14} color="#9CA3AF" />
              <Text style={styles.attendeeLastEvent}>{attendee.lastEvent}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Attendee Journey Map */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Attendee Journey Map</Text>
        <Text style={styles.sectionDescription}>Conversion funnel from discovery to retention</Text>
        <View style={styles.journeyContainer}>
          {ATTENDEE_JOURNEY.map((stage, index) => (
            <View key={index} style={styles.journeyStage}>
              <View style={styles.journeyHeader}>
                <Text style={styles.journeyStageName}>{stage.stage}</Text>
                <Text style={styles.journeyStageAttendees}>{stage.attendees}</Text>
              </View>
              <View style={styles.journeyBar}>
                <View 
                  style={[
                    styles.journeyFill, 
                    { width: `${stage.conversion}%`, backgroundColor: stage.color }
                  ]} 
                />
              </View>
              <View style={styles.journeyStats}>
                <Text style={[styles.journeyConversion, { color: stage.color }]}>{stage.conversion}% conversion</Text>
                <Text style={styles.journeyDropoff}>{stage.dropoff}% dropoff</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Audience Analytics */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Audience Analytics</Text>
        <View style={styles.analyticsGrid}>
          {AUDIENCE_ANALYTICS.map((metric, index) => (
            <View key={index} style={[styles.analyticsCard, { borderColor: metric.color + '40' }]}>
              <Text style={styles.analyticsValue}>{metric.value}</Text>
              <Text style={styles.analyticsMetric}>{metric.metric}</Text>
              <Text style={styles.analyticsTarget}>Target: {metric.target}</Text>
              <View style={[styles.analyticsIndicator, { backgroundColor: metric.color + '20' }]}>
                <TrendingUp size={10} color={metric.color} />
                <Text style={[styles.analyticsIndicatorText, { color: metric.color }]}>
                  {parseFloat(metric.value.replace('min', '').replace('/hr', '')) >= parseFloat(metric.target.replace('min', '').replace('/hr', '')) ? 'On Track' : 'Needs Attention'}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Behavioral Insights */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Behavioral Insights</Text>
        <Text style={styles.sectionDescription}>AI-powered attendee behavior analysis</Text>
        {BEHAVIORAL_INSIGHTS.map((insight, index) => (
          <View key={index} style={[styles.insightCard, { borderColor: insight.color + '40' }]}>
            <View style={styles.insightHeader}>
              <View style={[styles.insightCategoryBadge, { backgroundColor: insight.color + '20' }]}>
                <Text style={[styles.insightCategory, { color: insight.color }]}>{insight.category}</Text>
              </View>
              <View style={[styles.insightImpactBadge, { backgroundColor: insight.color + '20' }]}>
                <Text style={[styles.insightImpact, { color: insight.color }]}>{insight.impact} impact</Text>
              </View>
            </View>
            <Text style={styles.insightText}>{insight.insight}</Text>
          </View>
        ))}
      </View>

      {/* Engagement Tracking */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Engagement Tracking</Text>
        <Text style={styles.sectionDescription}>Real-time activity participation rates</Text>
        {ENGAGEMENT_TRACKING.map((activity, index) => (
          <View key={index} style={styles.engagementCard}>
            <View style={styles.engagementHeader}>
              <Text style={styles.engagementActivity}>{activity.activity}</Text>
              <View style={styles.engagementStats}>
                <Text style={styles.engagementCount}>{activity.count}</Text>
                <Text style={styles.engagementParticipants}>{activity.participants} participants</Text>
              </View>
            </View>
            <View style={styles.engagementBar}>
              <View 
                style={[
                  styles.engagementFill, 
                  { width: `${parseFloat(activity.rate)}%`, backgroundColor: activity.color }
                ]} 
              />
            </View>
            <Text style={[styles.engagementRate, { color: activity.color }]}>{activity.rate} participation rate</Text>
          </View>
        ))}
      </View>

      {/* Recent Activity */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Activity</Text>
        <View style={styles.activityList}>
          {RECENT_ACTIVITY.map((activity, index) => (
            <View key={index} style={styles.activityItem}>
              <View style={[styles.activityIcon, { backgroundColor: activity.color + '20' }]}>
                <activity.icon size={16} color={activity.color} />
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityAction}>{activity.action}</Text>
                <Text style={styles.activityAttendee}>{activity.attendee}</Text>
                <Text style={styles.activityEvent}>{activity.event}</Text>
              </View>
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
            style={[styles.actionButton, { backgroundColor: '#06B6D415', borderColor: '#06B6D440' }]}
          >
            <Users size={24} color="#06B6D4" />
            <Text style={[styles.actionText, { color: '#06B6D4' }]}>View All</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: '#8B5CF615', borderColor: '#8B5CF640' }]}
          >
            <MessageSquare size={24} color="#8B5CF6" />
            <Text style={[styles.actionText, { color: '#8B5CF6' }]}>Send Message</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: '#10B98115', borderColor: '#10B98140' }]}
          >
            <BarChart3 size={24} color="#10B981" />
            <Text style={[styles.actionText, { color: '#10B981' }]}>Analytics</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: '#F59E0B15', borderColor: '#F59E0B40' }]}
          >
            <Target size={24} color="#F59E0B" />
            <Text style={[styles.actionText, { color: '#F59E0B' }]}>Segment</Text>
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
  demoCard: {
    backgroundColor: '#0A0F1A',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  demoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  demoCategory: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  demoPercentage: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#9CA3AF',
  },
  demoBar: {
    height: 8,
    backgroundColor: '#1F2937',
    borderRadius: 4,
    overflow: 'hidden',
  },
  demoFill: {
    height: '100%',
    borderRadius: 4,
  },
  segmentCard: {
    backgroundColor: '#0A0F1A',
    borderWidth: 1,
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
  },
  segmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  segmentName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  segmentCount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  segmentStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#1F2937',
  },
  segmentStat: {
    alignItems: 'center',
  },
  segmentStatLabel: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  segmentStatValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  sessionCard: {
    backgroundColor: '#0A0F1A',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  sessionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  sessionName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  sessionAttendees: {
    fontSize: 13,
    color: '#9CA3AF',
  },
  sessionBar: {
    height: 8,
    backgroundColor: '#1F2937',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 6,
  },
  sessionFill: {
    height: '100%',
    borderRadius: 4,
  },
  sessionFillRate: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  metricCard: {
    flex: 1,
    minWidth: 140,
    backgroundColor: '#0A0F1A',
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    gap: 8,
  },
  metricValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  metricLabel: {
    fontSize: 13,
    color: '#9CA3AF',
    textAlign: 'center',
  },
  metricTrend: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  metricTrendText: {
    fontSize: 11,
    fontWeight: '600',
  },
  attendeeCard: {
    backgroundColor: '#0A0F1A',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  attendeeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  attendeeAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  attendeeInfo: {
    flex: 1,
  },
  attendeeName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  attendeeCompany: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  tierBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    gap: 6,
  },
  tierText: {
    fontSize: 12,
    fontWeight: '600',
  },
  attendeeStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#1F2937',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  attendeeStat: {
    alignItems: 'center',
  },
  attendeeStatValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  attendeeStatLabel: {
    fontSize: 11,
    color: '#9CA3AF',
  },
  attendeeFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  attendeeLastEvent: {
    fontSize: 13,
    color: '#9CA3AF',
  },
  activityList: {
    backgroundColor: '#0A0F1A',
    borderRadius: 12,
    overflow: 'hidden',
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
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
  activityAction: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  activityAttendee: {
    fontSize: 13,
    color: '#9CA3AF',
  },
  activityEvent: {
    fontSize: 12,
    color: '#6B7280',
  },
  activityTime: {
    fontSize: 11,
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
  journeyContainer: {
    backgroundColor: '#0A0F1A',
    borderRadius: 12,
    padding: 16,
  },
  journeyStage: {
    marginBottom: 16,
  },
  journeyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  journeyStageName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  journeyStageAttendees: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#9CA3AF',
  },
  journeyBar: {
    height: 12,
    backgroundColor: '#1F2937',
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 6,
  },
  journeyFill: {
    height: '100%',
    borderRadius: 6,
  },
  journeyStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  journeyConversion: {
    fontSize: 12,
    fontWeight: '600',
  },
  journeyDropoff: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  analyticsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  analyticsCard: {
    flex: 1,
    minWidth: 140,
    backgroundColor: '#0A0F1A',
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    gap: 8,
  },
  analyticsValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  analyticsMetric: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
  },
  analyticsTarget: {
    fontSize: 10,
    color: '#6B7280',
  },
  analyticsIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  analyticsIndicatorText: {
    fontSize: 11,
    fontWeight: '600',
  },
  insightCard: {
    backgroundColor: '#0A0F1A',
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  insightHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  insightCategoryBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  insightCategory: {
    fontSize: 11,
    fontWeight: '600',
  },
  insightImpactBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  insightImpact: {
    fontSize: 11,
    fontWeight: '600',
  },
  insightText: {
    fontSize: 14,
    color: '#E5E7EB',
  },
  engagementCard: {
    backgroundColor: '#0A0F1A',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  engagementHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  engagementActivity: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  engagementStats: {
    alignItems: 'flex-end',
  },
  engagementCount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#10B981',
  },
  engagementParticipants: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  engagementBar: {
    height: 8,
    backgroundColor: '#1F2937',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 6,
  },
  engagementFill: {
    height: '100%',
    borderRadius: 4,
  },
  engagementRate: {
    fontSize: 12,
    fontWeight: '600',
  },
});
