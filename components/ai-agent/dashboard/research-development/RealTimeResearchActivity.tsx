import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Activity, Clock, FileText, FlaskConical, Lightbulb, Zap, CheckCircle, AlertCircle, BookOpen, Globe } from 'lucide-react-native';

export default function RealTimeResearchActivity() {
  const { theme } = useTheme();

  const researchActivities = [
    {
      id: 'activity-001',
      type: 'paper_analysis',
      title: 'New paper analyzed',
      description: 'Quantum entanglement in neural networks - arXiv:2406.12345',
      timestamp: '2 minutes ago',
      icon: FileText,
      color: '#0B8AFF'
    },
    {
      id: 'activity-002',
      type: 'experiment_complete',
      title: 'Experiment completed',
      description: 'Quantum coherence test #1247 - Success rate: 94%',
      timestamp: '8 minutes ago',
      icon: FlaskConical,
      color: '#10B981'
    },
    {
      id: 'activity-003',
      type: 'discovery',
      title: 'Discovery generated',
      description: 'Novel qubit stabilization method identified',
      timestamp: '15 minutes ago',
      icon: Lightbulb,
      color: '#8B5CF6'
    },
    {
      id: 'activity-004',
      type: 'patent_filed',
      title: 'Patent filed',
      description: 'US Patent Application 18/123,456 - Quantum Error Correction',
      timestamp: '32 minutes ago',
      icon: CheckCircle,
      color: '#F59E0B'
    },
    {
      id: 'activity-005',
      type: 'trend_detected',
      title: 'Technology trend detected',
      description: 'Emerging pattern in solid-state battery research',
      timestamp: '45 minutes ago',
      icon: Zap,
      color: '#06B6D4'
    },
    {
      id: 'activity-006',
      type: 'milestone',
      title: 'Research milestone achieved',
      description: 'Team Alpha reached 1000 paper analysis milestone',
      timestamp: '1 hour ago',
      icon: Activity,
      color: '#EC4899'
    },
    {
      id: 'activity-007',
      type: 'opportunity',
      title: 'Innovation opportunity identified',
      description: 'Cross-domain application potential in bio-quantum computing',
      timestamp: '1 hour ago',
      icon: Globe,
      color: '#14B8A6'
    },
    {
      id: 'activity-008',
      type: 'publication',
      title: 'Publication generated',
      description: 'Research paper submitted to Nature Quantum Information',
      timestamp: '2 hours ago',
      icon: BookOpen,
      color: '#6366F1'
    }
  ];

  const activityStats = [
    { label: 'Today', count: 247, color: '#0B8AFF' },
    { label: 'This Week', count: 1247, color: '#8B5CF6' },
    { label: 'This Month', count: 4521, color: '#10B981' }
  ];

  const activityTypes = [
    { type: 'Paper Analysis', count: 892, percentage: 36, color: '#0B8AFF' },
    { type: 'Experiments', count: 567, percentage: 23, color: '#10B981' },
    { type: 'Discoveries', count: 423, percentage: 17, color: '#8B5CF6' },
    { type: 'Patents', count: 234, percentage: 9, color: '#F59E0B' },
    { type: 'Publications', count: 331, percentage: 13, color: '#06B6D4' }
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Activity size={24} color="#0B8AFF" />
          <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
            Real-time Research Activity
          </Text>
        </View>
        <View style={[styles.liveIndicator, { backgroundColor: '#EF4444' + '20' }]}>
          <View style={[styles.liveDot, { backgroundColor: '#EF4444' }]} />
          <Text style={[styles.liveText, { color: '#EF4444' }]}>
            LIVE
          </Text>
        </View>
      </View>

      {/* Activity Statistics */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.statsScroll}>
        {activityStats.map((stat) => (
          <View 
            key={stat.label}
            style={[
              styles.statCard,
              { 
                backgroundColor: stat.color + '15',
                borderColor: stat.color + '30'
              }
            ]}
          >
            <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>
              {stat.label}
            </Text>
            <Text style={[styles.statCount, { color: theme.colors.text }]}>
              {stat.count.toLocaleString()}
            </Text>
          </View>
        ))}
      </ScrollView>

      {/* Activity Types */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Activity Distribution
        </Text>
        <View style={styles.typesGrid}>
          {activityTypes.map((item) => (
            <View 
              key={item.type}
              style={[
                styles.typeCard,
                { backgroundColor: theme.colors.background }
              ]}
            >
              <View style={[styles.typeDot, { backgroundColor: item.color }]} />
              <Text style={[styles.typeLabel, { color: theme.colors.text }]}>
                {item.type}
              </Text>
              <View style={styles.typeMetrics}>
                <Text style={[styles.typeCount, { color: theme.colors.text }]}>
                  {item.count}
                </Text>
                <Text style={[styles.typePercentage, { color: item.color }]}>
                  {item.percentage}%
                </Text>
              </View>
              <View style={[styles.typeBar, { backgroundColor: theme.colors.border }]}>
                <View 
                  style={[
                    styles.typeBarFill,
                    { 
                      backgroundColor: item.color,
                      width: `${item.percentage}%`
                    }
                  ]} 
                />
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Activity Feed */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Live Activity Feed
        </Text>
        <ScrollView style={styles.feedScroll} showsVerticalScrollIndicator={false}>
          {researchActivities.map((activity) => {
            const Icon = activity.icon;
            return (
              <View 
                key={activity.id}
                style={[
                  styles.activityCard,
                  { backgroundColor: theme.colors.background }
                ]}
              >
                <View style={[styles.activityIcon, { backgroundColor: activity.color + '20' }]}>
                  <Icon size={16} color={activity.color} />
                </View>
                <View style={styles.activityContent}>
                  <View style={styles.activityHeader}>
                    <Text style={[styles.activityTitle, { color: theme.colors.text }]}>
                      {activity.title}
                    </Text>
                    <View style={styles.activityTimestamp}>
                      <Clock size={10} color="#6B7280" />
                      <Text style={[styles.timestampText, { color: '#6B7280' }]}>
                        {activity.timestamp}
                      </Text>
                    </View>
                  </View>
                  <Text style={[styles.activityDescription, { color: theme.colors.textSecondary }]}>
                    {activity.description}
                  </Text>
                </View>
              </View>
            );
          })}
        </ScrollView>
      </View>

      {/* Activity Velocity */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Activity Velocity
        </Text>
        <View style={styles.velocityContainer}>
          <View style={styles.velocityCard}>
            <Zap size={20} color="#F59E0B" />
            <Text style={[styles.velocityLabel, { color: theme.colors.textSecondary }]}>
              Current Rate
            </Text>
            <Text style={[styles.velocityValue, { color: theme.colors.text }]}>
              47/min
            </Text>
            <Text style={[styles.velocityTrend, { color: '#22C55E' }]}>
              +12% vs last hour
            </Text>
          </View>

          <View style={styles.velocityCard}>
            <Activity size={20} color="#0B8AFF" />
            <Text style={[styles.velocityLabel, { color: theme.colors.textSecondary }]}>
              Peak Today
            </Text>
            <Text style={[styles.velocityValue, { color: theme.colors.text }]}>
              89/min
            </Text>
            <Text style={[styles.velocityTrend, { color: '#22C55E' }]}>
              At 10:30 AM
            </Text>
          </View>

          <View style={styles.velocityCard}>
            <Clock size={20} color="#8B5CF6" />
            <Text style={[styles.velocityLabel, { color: theme.colors.textSecondary }]}>
              Avg Response Time
            </Text>
            <Text style={[styles.velocityValue, { color: theme.colors.text }]}>
              2.3s
            </Text>
            <Text style={[styles.velocityTrend, { color: '#22C55E' }]}>
              -0.4s improvement
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 16,
    borderRadius: 16,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginLeft: 12,
  },
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  liveText: {
    fontSize: 11,
    fontWeight: '700',
  },
  statsScroll: {
    marginBottom: 20,
  },
  statCard: {
    width: 100,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    marginRight: 12,
  },
  statLabel: {
    fontSize: 10,
    fontWeight: '500',
    marginBottom: 6,
    textTransform: 'uppercase',
  },
  statCount: {
    fontSize: 18,
    fontWeight: '700',
  },
  section: {
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
  },
  typesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  typeCard: {
    width: '31%',
    marginRight: '2%',
    marginBottom: 12,
    padding: 12,
    borderRadius: 10,
  },
  typeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginBottom: 8,
  },
  typeLabel: {
    fontSize: 11,
    fontWeight: '600',
    marginBottom: 8,
  },
  typeMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  typeCount: {
    fontSize: 14,
    fontWeight: '700',
  },
  typePercentage: {
    fontSize: 12,
    fontWeight: '600',
  },
  typeBar: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  typeBarFill: {
    height: '100%',
    borderRadius: 3,
  },
  feedScroll: {
    maxHeight: 350,
  },
  activityCard: {
    flexDirection: 'row',
    padding: 12,
    borderRadius: 10,
    marginBottom: 8,
  },
  activityIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
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
  activityTitle: {
    fontSize: 13,
    fontWeight: '600',
  },
  activityTimestamp: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timestampText: {
    fontSize: 10,
    marginLeft: 4,
  },
  activityDescription: {
    fontSize: 11,
    lineHeight: 16,
  },
  velocityContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  velocityCard: {
    width: '31%',
    marginRight: '2%',
    padding: 14,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.05)',
    marginBottom: 12,
  },
  velocityLabel: {
    fontSize: 10,
    marginTop: 8,
    marginBottom: 4,
  },
  velocityValue: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  velocityTrend: {
    fontSize: 10,
  },
});