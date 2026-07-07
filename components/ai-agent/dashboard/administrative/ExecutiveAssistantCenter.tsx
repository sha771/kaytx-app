import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Calendar, Clock, User, Briefcase, Plane, AlertCircle, CheckCircle, TrendingUp, Users, Video, MapPin, ArrowUpRight, ArrowDownRight, Sparkles } from 'lucide-react-native';

interface ExecutiveSchedule {
  executive: string;
  title: string;
  meetingsToday: number;
  availability: number;
  priorityRequests: number;
  actionItems: number;
  travelScheduled: boolean;
  nextMeeting: string;
  utilizationRate: number;
}

interface ExecutiveAssistantCenterProps {
  executives: ExecutiveSchedule[];
}

export default function ExecutiveAssistantCenter({ executives }: ExecutiveAssistantCenterProps) {
  const { theme } = useTheme();

  const getAvailabilityColor = (availability: number) => {
    if (availability >= 70) return '#10B981';
    if (availability >= 40) return '#F59E0B';
    return '#EF4444';
  };

  const getUtilizationColor = (utilization: number) => {
    if (utilization <= 60) return '#10B981';
    if (utilization <= 80) return '#F59E0B';
    return '#EF4444';
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={[styles.headerIcon, { backgroundColor: '#8B5CF6' + '20' }]}>
            <User size={24} color="#8B5CF6" />
          </View>
          <View style={styles.headerText}>
            <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
              Executive Assistant Center
            </Text>
            <Text style={[styles.headerSubtitle, { color: theme.colors.textSecondary }]}>
              Calendar & Schedule Intelligence
            </Text>
          </View>
        </View>
        <View style={[styles.totalBadge, { backgroundColor: '#8B5CF6' + '20' }]}>
          <Sparkles size={16} color="#8B5CF6" />
          <Text style={[styles.totalBadgeText, { color: '#8B5CF6' }]}>
            {executives.length} Executives
          </Text>
        </View>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {executives.map((exec, index) => (
          <View key={index} style={[styles.executiveCard, { borderColor: '#8B5CF6' + '30', borderWidth: 1 }]}>
            <View style={styles.executiveHeader}>
              <View style={[styles.executiveAvatar, { backgroundColor: '#8B5CF6' + '20' }]}>
                <User size={24} color="#8B5CF6" />
              </View>
              <View style={styles.executiveInfo}>
                <Text style={[styles.executiveName, { color: theme.colors.text }]}>
                  {exec.executive}
                </Text>
                <Text style={[styles.executiveTitle, { color: theme.colors.textSecondary }]}>
                  {exec.title}
                </Text>
              </View>
              {exec.travelScheduled && (
                <View style={[styles.travelBadge, { backgroundColor: '#06B6D4' + '20' }]}>
                  <Plane size={14} color="#06B6D4" />
                  <Text style={[styles.travelBadgeText, { color: '#06B6D4' }]}>
                    Travel
                  </Text>
                </View>
              )}
            </View>

            <View style={styles.metricsGrid}>
              <View style={styles.metricItem}>
                <Calendar size={16} color="#3B82F6" />
                <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                  Meetings Today
                </Text>
                <Text style={[styles.metricValue, { color: theme.colors.text }]}>
                  {exec.meetingsToday}
                </Text>
              </View>

              <View style={styles.metricItem}>
                <Clock size={16} color="#10B981" />
                <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                  Availability
                </Text>
                <Text style={[styles.metricValue, { color: getAvailabilityColor(exec.availability) }]}>
                  {exec.availability}%
                </Text>
              </View>

              <View style={styles.metricItem}>
                <AlertCircle size={16} color="#F59E0B" />
                <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                  Priority Requests
                </Text>
                <Text style={[styles.metricValue, { color: theme.colors.text }]}>
                  {exec.priorityRequests}
                </Text>
              </View>

              <View style={styles.metricItem}>
                <CheckCircle size={16} color="#22C55E" />
                <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                  Action Items
                </Text>
                <Text style={[styles.metricValue, { color: theme.colors.text }]}>
                  {exec.actionItems}
                </Text>
              </View>
            </View>

            <View style={styles.nextMeetingSection}>
              <View style={styles.nextMeetingHeader}>
                <Video size={14} color="#8B5CF6" />
                <Text style={[styles.nextMeetingLabel, { color: theme.colors.textSecondary }]}>
                  Next Meeting
                </Text>
              </View>
              <Text style={[styles.nextMeetingTime, { color: theme.colors.text }]}>
                {exec.nextMeeting}
              </Text>
            </View>

            <View style={styles.utilizationSection}>
              <View style={styles.utilizationHeader}>
                <TrendingUp size={14} color="#8B5CF6" />
                <Text style={[styles.utilizationLabel, { color: theme.colors.textSecondary }]}>
                  Calendar Utilization
                </Text>
                <Text style={[styles.utilizationValue, { color: getUtilizationColor(exec.utilizationRate) }]}>
                  {exec.utilizationRate}%
                </Text>
              </View>
              <View style={[styles.utilizationBar, { backgroundColor: 'rgba(255,255,255,0.08)' }]}>
                <View 
                  style={[
                    styles.utilizationFill, 
                    { 
                      backgroundColor: getUtilizationColor(exec.utilizationRate),
                      width: `${exec.utilizationRate}%`
                    }
                  ]} 
                />
              </View>
            </View>

            <View style={styles.quickActions}>
              <View style={[styles.actionButton, { backgroundColor: '#3B82F6' + '15', borderColor: '#3B82F6' + '30' }]}>
                <Calendar size={14} color="#3B82F6" />
                <Text style={[styles.actionButtonText, { color: '#3B82F6' }]}>
                  Schedule
                </Text>
              </View>
              <View style={[styles.actionButton, { backgroundColor: '#8B5CF6' + '15', borderColor: '#8B5CF6' + '30' }]}>
                <Briefcase size={14} color="#8B5CF6" />
                <Text style={[styles.actionButtonText, { color: '#8B5CF6' }]}>
                  Tasks
                </Text>
              </View>
              <View style={[styles.actionButton, { backgroundColor: '#06B6D4' + '15', borderColor: '#06B6D4' + '30' }]}>
                <Plane size={14} color="#06B6D4" />
                <Text style={[styles.actionButtonText, { color: '#06B6D4' }]}>
                  Travel
                </Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={[styles.overviewSection, { backgroundColor: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.08)' }]}>
        <View style={styles.overviewHeader}>
          <Users size={20} color="#8B5CF6" />
          <Text style={[styles.overviewTitle, { color: theme.colors.text }]}>
            Team Overview
          </Text>
        </View>
        <View style={styles.overviewStats}>
          <View style={styles.overviewStat}>
            <Text style={[styles.overviewStatValue, { color: theme.colors.text }]}>
              {executives.reduce((sum, exec) => sum + exec.meetingsToday, 0)}
            </Text>
            <Text style={[styles.overviewStatLabel, { color: theme.colors.textSecondary }]}>
              Total Meetings
            </Text>
          </View>
          <View style={styles.overviewStat}>
            <Text style={[styles.overviewStatValue, { color: theme.colors.text }]}>
              {executives.reduce((sum, exec) => sum + exec.priorityRequests, 0)}
            </Text>
            <Text style={[styles.overviewStatLabel, { color: theme.colors.textSecondary }]}>
              Priority Requests
            </Text>
          </View>
          <View style={styles.overviewStat}>
            <Text style={[styles.overviewStatValue, { color: theme.colors.text }]}>
              {executives.reduce((sum, exec) => sum + exec.actionItems, 0)}
            </Text>
            <Text style={[styles.overviewStatLabel, { color: theme.colors.textSecondary }]}>
              Action Items
            </Text>
          </View>
          <View style={styles.overviewStat}>
            <Text style={[styles.overviewStatValue, { color: theme.colors.text }]}>
              {Math.round(executives.reduce((sum, exec) => sum + exec.utilizationRate, 0) / executives.length)}%
            </Text>
            <Text style={[styles.overviewStatLabel, { color: theme.colors.textSecondary }]}>
              Avg Utilization
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
  totalBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  totalBadgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  scrollContent: {
    gap: 12,
  },
  executiveCard: {
    width: 280,
    borderRadius: 12,
    padding: 16,
    backgroundColor: 'rgba(255,255,255,0.02)',
  },
  executiveHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  executiveAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  executiveInfo: {
    flex: 1,
  },
  executiveName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  executiveTitle: {
    fontSize: 11,
  },
  travelBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  travelBadgeText: {
    fontSize: 10,
    fontWeight: '600',
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 16,
  },
  metricItem: {
    flex: 1,
    minWidth: 100,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  metricLabel: {
    fontSize: 10,
    flex: 1,
  },
  metricValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  nextMeetingSection: {
    marginBottom: 12,
  },
  nextMeetingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  nextMeetingLabel: {
    fontSize: 10,
    fontWeight: '500',
  },
  nextMeetingTime: {
    fontSize: 13,
    fontWeight: '600',
  },
  utilizationSection: {
    marginBottom: 16,
  },
  utilizationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 6,
  },
  utilizationLabel: {
    fontSize: 10,
    fontWeight: '500',
    flex: 1,
  },
  utilizationValue: {
    fontSize: 12,
    fontWeight: '600',
  },
  utilizationBar: {
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
  },
  utilizationFill: {
    height: '100%',
    borderRadius: 2,
  },
  quickActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
  },
  actionButtonText: {
    fontSize: 11,
    fontWeight: '600',
  },
  overviewSection: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    marginTop: 16,
  },
  overviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  overviewTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  overviewStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  overviewStat: {
    alignItems: 'center',
  },
  overviewStatValue: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  overviewStatLabel: {
    fontSize: 10,
  },
});