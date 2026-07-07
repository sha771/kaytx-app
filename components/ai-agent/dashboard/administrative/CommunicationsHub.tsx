import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { MessageSquare, Mail, Megaphone, Users, TrendingUp, Clock, CheckCircle, AlertCircle, Sparkles, ArrowUpRight, ArrowDownRight, Send, Reply, Forward, Star } from 'lucide-react-native';

interface CommunicationChannel {
  name: string;
  icon: string;
  volume: number;
  responseTime: string;
  engagement: number;
  color: string;
}

interface CommunicationMetrics {
  internalMessages: number;
  announcements: number;
  employeeRequests: number;
  teamCollaboration: number;
  messageVolume: number;
  avgResponseTime: string;
  engagementRate: number;
  satisfactionScore: number;
}

interface CommunicationsHubProps {
  metrics: CommunicationMetrics;
  channels: CommunicationChannel[];
}

export default function CommunicationsHub({ metrics, channels }: CommunicationsHubProps) {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={[styles.headerIcon, { backgroundColor: '#8B5CF6' + '20' }]}>
            <MessageSquare size={24} color="#8B5CF6" />
          </View>
          <View style={styles.headerText}>
            <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
              Communications Hub
            </Text>
            <Text style={[styles.headerSubtitle, { color: theme.colors.textSecondary }]}>
              Internal communications intelligence
            </Text>
          </View>
        </View>
        <View style={[styles.engagementBadge, { backgroundColor: '#10B981' + '20' }]}>
          <Sparkles size={16} color="#10B981" />
          <Text style={[styles.engagementBadgeText, { color: '#10B981' }]}>
            {metrics.engagementRate}% Engagement
          </Text>
        </View>
      </View>

      <View style={styles.metricsGrid}>
        <View style={[styles.metricCard, { backgroundColor: 'rgba(59, 130, 246, 0.1)', borderColor: '#3B82F6' + '30' }]}>
          <View style={[styles.metricIcon, { backgroundColor: '#3B82F6' + '20' }]}>
            <MessageSquare size={20} color="#3B82F6" />
          </View>
          <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
            Internal Messages
          </Text>
          <Text style={[styles.metricValue, { color: theme.colors.text }]}>
            {metrics.internalMessages.toLocaleString()}
          </Text>
          <View style={styles.metricTrend}>
            <ArrowUpRight size={12} color="#10B981" />
            <Text style={[styles.trendText, { color: '#10B981' }]}>
              +15.3%
            </Text>
          </View>
        </View>

        <View style={[styles.metricCard, { backgroundColor: 'rgba(16, 185, 129, 0.1)', borderColor: '#10B981' + '30' }]}>
          <View style={[styles.metricIcon, { backgroundColor: '#10B981' + '20' }]}>
            <Megaphone size={20} color="#10B981" />
          </View>
          <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
            Announcements
          </Text>
          <Text style={[styles.metricValue, { color: theme.colors.text }]}>
            {metrics.announcements}
          </Text>
          <View style={styles.metricTrend}>
            <ArrowUpRight size={12} color="#10B981" />
            <Text style={[styles.trendText, { color: '#10B981' }]}>
              +8.7%
            </Text>
          </View>
        </View>

        <View style={[styles.metricCard, { backgroundColor: 'rgba(245, 158, 11, 0.1)', borderColor: '#F59E0B' + '30' }]}>
          <View style={[styles.metricIcon, { backgroundColor: '#F59E0B' + '20' }]}>
            <Users size={20} color="#F59E0B" />
          </View>
          <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
            Employee Requests
          </Text>
          <Text style={[styles.metricValue, { color: theme.colors.text }]}>
            {metrics.employeeRequests}
          </Text>
          <View style={styles.metricTrend}>
            <ArrowUpRight size={12} color="#F59E0B" />
            <Text style={[styles.trendText, { color: '#F59E0B' }]}>
              +12.1%
            </Text>
          </View>
        </View>

        <View style={[styles.metricCard, { backgroundColor: 'rgba(139, 92, 246, 0.1)', borderColor: '#8B5CF6' + '30' }]}>
          <View style={[styles.metricIcon, { backgroundColor: '#8B5CF6' + '20' }]}>
            <Clock size={20} color="#8B5CF6" />
          </View>
          <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
            Avg Response
          </Text>
          <Text style={[styles.metricValue, { color: theme.colors.text }]}>
            {metrics.avgResponseTime}
          </Text>
          <View style={styles.metricTrend}>
            <ArrowDownRight size={12} color="#10B981" />
            <Text style={[styles.trendText, { color: '#10B981' }]}>
              -22.5%
            </Text>
          </View>
        </View>
      </View>

      <View style={[styles.channelsSection, { backgroundColor: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.08)' }]}>
        <View style={styles.channelsHeader}>
          <MessageSquare size={20} color="#8B5CF6" />
          <Text style={[styles.channelsTitle, { color: theme.colors.text }]}>
            Communication Channels
          </Text>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.channelsScroll}>
          {channels.map((channel, index) => (
            <View key={index} style={[styles.channelCard, { borderColor: channel.color + '30', borderWidth: 1 }]}>
              <View style={[styles.channelIcon, { backgroundColor: channel.color + '20' }]}>
                <Text style={styles.channelEmoji}>{channel.icon}</Text>
              </View>
              <Text style={[styles.channelName, { color: theme.colors.text }]}>
                {channel.name}
              </Text>
              
              <View style={styles.channelMetric}>
                <Text style={[styles.channelMetricLabel, { color: theme.colors.textSecondary }]}>
                  Volume
                </Text>
                <Text style={[styles.channelMetricValue, { color: channel.color }]}>
                  {channel.volume.toLocaleString()}
                </Text>
              </View>

              <View style={styles.channelMetric}>
                <Text style={[styles.channelMetricLabel, { color: theme.colors.textSecondary }]}>
                  Response Time
                </Text>
                <Text style={[styles.channelMetricValue, { color: theme.colors.text }]}>
                  {channel.responseTime}
                </Text>
              </View>

              <View style={styles.channelMetric}>
                <Text style={[styles.channelMetricLabel, { color: theme.colors.textSecondary }]}>
                  Engagement
                </Text>
                <Text style={[styles.channelMetricValue, { color: '#10B981' }]}>
                  {channel.engagement}%
                </Text>
              </View>

              <View style={[styles.channelProgress, { backgroundColor: 'rgba(255,255,255,0.08)' }]}>
                <View 
                  style={[
                    styles.channelProgressFill, 
                    { 
                      backgroundColor: channel.color,
                      width: `${channel.engagement}%`
                    }
                  ]} 
                />
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

      <View style={styles.activitySection}>
        <View style={styles.activityHeader}>
          <TrendingUp size={20} color="#8B5CF6" />
          <Text style={[styles.activityTitle, { color: theme.colors.text }]}>
            Communication Activity
          </Text>
        </View>

        <View style={styles.activityMetrics}>
          <View style={styles.activityMetric}>
            <View style={[styles.activityIcon, { backgroundColor: '#3B82F6' + '20' }]}>
              <Send size={16} color="#3B82F6" />
            </View>
            <View style={styles.activityInfo}>
              <Text style={[styles.activityLabel, { color: theme.colors.textSecondary }]}>
                Messages Sent
              </Text>
              <Text style={[styles.activityValue, { color: theme.colors.text }]}>
                {Math.round(metrics.messageVolume * 0.6).toLocaleString()}
              </Text>
            </View>
          </View>

          <View style={styles.activityMetric}>
            <View style={[styles.activityIcon, { backgroundColor: '#10B981' + '20' }]}>
              <Reply size={16} color="#10B981" />
            </View>
            <View style={styles.activityInfo}>
              <Text style={[styles.activityLabel, { color: theme.colors.textSecondary }]}>
                Replies
              </Text>
              <Text style={[styles.activityValue, { color: theme.colors.text }]}>
                {Math.round(metrics.messageVolume * 0.4).toLocaleString()}
              </Text>
            </View>
          </View>

          <View style={styles.activityMetric}>
            <View style={[styles.activityIcon, { backgroundColor: '#F59E0B' + '20' }]}>
              <Forward size={16} color="#F59E0B" />
            </View>
            <View style={styles.activityInfo}>
              <Text style={[styles.activityLabel, { color: theme.colors.textSecondary }]}>
                Forwards
              </Text>
              <Text style={[styles.activityValue, { color: theme.colors.text }]}>
                {Math.round(metrics.messageVolume * 0.15).toLocaleString()}
              </Text>
            </View>
          </View>

          <View style={styles.activityMetric}>
            <View style={[styles.activityIcon, { backgroundColor: '#EF4444' + '20' }]}>
              <Star size={16} color="#EF4444" />
            </View>
            <View style={styles.activityInfo}>
              <Text style={[styles.activityLabel, { color: theme.colors.textSecondary }]}>
                High Priority
              </Text>
              <Text style={[styles.activityValue, { color: theme.colors.text }]}>
                {Math.round(metrics.messageVolume * 0.08).toLocaleString()}
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View style={[styles.satisfactionSection, { backgroundColor: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.08)' }]}>
        <View style={styles.satisfactionHeader}>
          <CheckCircle size={20} color="#8B5CF6" />
          <Text style={[styles.satisfactionTitle, { color: theme.colors.text }]}>
            Communication Satisfaction
          </Text>
          <View style={[styles.satisfactionBadge, { backgroundColor: metrics.satisfactionScore >= 4.5 ? '#10B981' + '20' : '#F59E0B' + '20' }]}>
            <Star size={14} color={metrics.satisfactionScore >= 4.5 ? '#10B981' : '#F59E0B'} />
            <Text style={[styles.satisfactionBadgeText, { color: metrics.satisfactionScore >= 4.5 ? '#10B981' : '#F59E0B' }]}>
              {metrics.satisfactionScore}/5.0
            </Text>
          </View>
        </View>

        <View style={styles.satisfactionStats}>
          <View style={styles.satisfactionStat}>
            <Text style={[styles.satisfactionStatValue, { color: theme.colors.text }]}>
              {metrics.teamCollaboration}%
            </Text>
            <Text style={[styles.satisfactionStatLabel, { color: theme.colors.textSecondary }]}>
              Team Collaboration
            </Text>
          </View>
          <View style={styles.satisfactionStat}>
            <Text style={[styles.satisfactionStatValue, { color: theme.colors.text }]}>
              {metrics.engagementRate}%
            </Text>
            <Text style={[styles.satisfactionStatLabel, { color: theme.colors.textSecondary }]}>
              Engagement Rate
            </Text>
          </View>
          <View style={styles.satisfactionStat}>
            <Text style={[styles.satisfactionStatValue, { color: theme.colors.text }]}>
              94.2%
            </Text>
            <Text style={[styles.satisfactionStatLabel, { color: theme.colors.textSecondary }]}>
              Read Rate
            </Text>
          </View>
          <View style={styles.satisfactionStat}>
            <Text style={[styles.satisfactionStatValue, { color: theme.colors.text }]}>
              87.5%
            </Text>
            <Text style={[styles.satisfactionStatLabel, { color: theme.colors.textSecondary }]}>
              Response Rate
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  headerSubtitle: {
    fontSize: 12,
    marginTop: 2,
  },
  engagementBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  engagementBadgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 16,
  },
  metricCard: {
    flex: 1,
    minWidth: 140,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
  },
  metricIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  metricLabel: {
    fontSize: 11,
    fontWeight: '500',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  metricValue: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
  },
  metricTrend: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  trendText: {
    fontSize: 12,
    fontWeight: '600',
  },
  channelsSection: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    marginBottom: 16,
  },
  channelsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  channelsTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  channelsScroll: {
    gap: 12,
  },
  channelCard: {
    width: 160,
    borderRadius: 12,
    padding: 16,
    backgroundColor: 'rgba(255,255,255,0.02)',
  },
  channelIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  channelEmoji: {
    fontSize: 20,
  },
  channelName: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 12,
  },
  channelMetric: {
    marginBottom: 8,
  },
  channelMetricLabel: {
    fontSize: 10,
    marginBottom: 2,
  },
  channelMetricValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  channelProgress: {
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
    marginTop: 8,
  },
  channelProgressFill: {
    height: '100%',
    borderRadius: 2,
  },
  activitySection: {
    marginBottom: 16,
  },
  activityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  activityMetrics: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  activityMetric: {
    flex: 1,
    minWidth: 120,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: 'rgba(255,255,255,0.02)',
    borderRadius: 8,
    padding: 12,
  },
  activityIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activityInfo: {
    flex: 1,
  },
  activityLabel: {
    fontSize: 10,
    fontWeight: '500',
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  activityValue: {
    fontSize: 16,
    fontWeight: '700',
  },
  satisfactionSection: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
  },
  satisfactionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  satisfactionTitle: {
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
  },
  satisfactionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  satisfactionBadgeText: {
    fontSize: 11,
    fontWeight: '600',
  },
  satisfactionStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  satisfactionStat: {
    alignItems: 'center',
  },
  satisfactionStatValue: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  satisfactionStatLabel: {
    fontSize: 10,
  },
});