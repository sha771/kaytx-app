import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Activity, Zap, Shield, AlertTriangle, Database, FileText, CheckCircle, Clock, GitBranch, Ban, Lock, TrendingUp, Radio } from 'lucide-react-native';

interface GovernanceEvent {
  id: string;
  timestamp: string;
  eventType: 'deployment' | 'violation' | 'injection' | 'dataset' | 'audit' | 'risk' | 'override';
  severity: 'info' | 'warning' | 'critical';
  title: string;
  description: string;
  source: string;
  category: string;
  actionRequired: boolean;
  relatedSystem: string;
  traceId: string;
}

interface RealTimeGovernanceEventsFeedProps {
  events: GovernanceEvent[];
}

export default function RealTimeGovernanceEventsFeed({ events }: RealTimeGovernanceEventsFeedProps) {
  const { theme } = useTheme();

  const getEventTypeColor = (eventType: string) => {
    switch (eventType) {
      case 'deployment': return '#10B981';
      case 'violation': return '#EF4444';
      case 'injection': return '#F59E0B';
      case 'dataset': return '#06B6D4';
      case 'audit': return '#8B5CF6';
      case 'risk': return '#EC4899';
      case 'override': return '#3B82F6';
      default: return '#6B7280';
    }
  };

  const getEventTypeBackground = (eventType: string) => {
    const color = getEventTypeColor(eventType);
    return color + '15';
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'info': return '#10B981';
      case 'warning': return '#F59E0B';
      case 'critical': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const getSeverityBackground = (severity: string) => {
    const color = getSeverityColor(severity);
    return color + '15';
  };

  const eventTypeIcon = {
    deployment: Zap,
    violation: Ban,
    injection: Lock,
    dataset: Database,
    audit: FileText,
    risk: AlertTriangle,
    override: CheckCircle,
  };

  const liveStats = [
    { label: 'Events/min', value: 124, color: '#06B6D4' },
    { label: 'Critical', value: 3, color: '#EF4444' },
    { label: 'Warnings', value: 18, color: '#F59E0B' },
    { label: 'Info', value: 103, color: '#10B981' },
  ];

  const eventDistribution = [
    { type: 'Deployments', count: 45, color: '#10B981' },
    { type: 'Violations', count: 12, color: '#EF4444' },
    { type: 'Injections', count: 8, color: '#F59E0B' },
    { type: 'Datasets', count: 28, color: '#06B6D4' },
    { type: 'Audits', count: 31, color: '#8B5CF6' },
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <View style={styles.header}>
        <Radio size={20} color="#8B5CF6" />
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
          Real-time Governance Events Feed
        </Text>
        <View style={[styles.liveIndicator, { backgroundColor: '#EF4444' + '20' }]}>
          <View style={[styles.liveDot, { backgroundColor: '#EF4444' }]} />
          <Text style={[styles.liveText, { color: '#EF4444' }]}>
            LIVE
          </Text>
        </View>
      </View>

      {/* Live Statistics */}
      <View style={[styles.statsSection, { backgroundColor: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.08)', borderWidth: 1 }]}>
        <View style={styles.statsGrid}>
          {liveStats.map((stat, index) => (
            <View key={index} style={styles.statCard}>
              <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>
                {stat.label}
              </Text>
              <Text style={[styles.statValue, { color: stat.color }]}>
                {stat.value}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Event Distribution */}
      <View style={[styles.distributionSection, { backgroundColor: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.08)', borderWidth: 1 }]}>
        <View style={styles.distributionHeader}>
          <Activity size={18} color="#06B6D4" />
          <Text style={[styles.distributionTitle, { color: theme.colors.text }]}>
            Event Distribution
          </Text>
        </View>
        <View style={styles.distributionGrid}>
          {eventDistribution.map((item) => (
            <View key={item.type} style={styles.distributionItem}>
              <Text style={[styles.distributionLabel, { color: theme.colors.textSecondary }]}>
                {item.type}
              </Text>
              <View style={[styles.distributionBar, { backgroundColor: 'rgba(255,255,255,0.1)' }]}>
                <View 
                  style={[
                    styles.distributionFill, 
                    { backgroundColor: item.color, width: `${(item.count / 45) * 100}%` }
                  ]} 
                />
              </View>
              <Text style={[styles.distributionValue, { color: item.color }]}>
                {item.count}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Events Timeline */}
      <View style={[styles.timelineSection, { backgroundColor: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.08)', borderWidth: 1 }]}>
        <View style={styles.timelineHeader}>
          <Clock size={18} color="#8B5CF6" />
          <Text style={[styles.timelineTitle, { color: theme.colors.text }]}>
            Dynamic Governance Timeline
          </Text>
        </View>
        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.timelineContent}
        >
          {events.map((event, index) => {
            const eventTypeColor = getEventTypeColor(event.eventType);
            const eventTypeBackground = getEventTypeBackground(event.eventType);
            const severityColor = getSeverityColor(event.severity);
            const severityBackground = getSeverityBackground(event.severity);
            const EventTypeIcon = eventTypeIcon[event.eventType];

            return (
              <View key={event.id} style={styles.timelineItem}>
                <View style={[
                  styles.timelineDot, 
                  { backgroundColor: severityColor }
                ]} />
                <View style={[
                  styles.eventCard, 
                  { 
                    backgroundColor: eventTypeBackground,
                    borderColor: eventTypeColor + '30',
                    borderWidth: 1
                  }
                ]}>
                  <View style={styles.eventHeader}>
                    <View style={[styles.eventIcon, { backgroundColor: eventTypeColor + '20' }]}>
                      <EventTypeIcon size={20} color={eventTypeColor} />
                    </View>
                    <View style={styles.eventMeta}>
                      <View style={[
                        styles.severityBadge, 
                        { backgroundColor: severityBackground }
                      ]}>
                        <View style={[styles.severityDot, { backgroundColor: severityColor }]} />
                        <Text style={[styles.severityText, { color: severityColor }]}>
                          {event.severity.toUpperCase()}
                        </Text>
                      </View>
                      <Text style={[styles.eventTime, { color: theme.colors.textSecondary }]}>
                        {event.timestamp}
                      </Text>
                    </View>
                  </View>

                  <Text style={[styles.eventTitle, { color: theme.colors.text }]}>
                    {event.title}
                  </Text>
                  <Text style={[styles.eventDescription, { color: theme.colors.textSecondary }]}>
                    {event.description}
                  </Text>

                  <View style={styles.eventDetails}>
                    <View style={styles.detailRow}>
                      <Activity size={12} color={theme.colors.textSecondary} />
                      <Text style={[styles.detailLabel, { color: theme.colors.textSecondary }]}>
                        Source
                      </Text>
                      <Text style={[styles.detailValue, { color: theme.colors.text }]}>
                        {event.source}
                      </Text>
                    </View>
                    <View style={styles.detailRow}>
                      <GitBranch size={12} color={theme.colors.textSecondary} />
                      <Text style={[styles.detailLabel, { color: theme.colors.textSecondary }]}>
                        Category
                      </Text>
                      <Text style={[styles.detailValue, { color: theme.colors.text }]}>
                        {event.category}
                      </Text>
                    </View>
                    <View style={styles.detailRow}>
                      <Shield size={12} color={theme.colors.textSecondary} />
                      <Text style={[styles.detailLabel, { color: theme.colors.textSecondary }]}>
                        System
                      </Text>
                      <Text style={[styles.detailValue, { color: theme.colors.text }]}>
                        {event.relatedSystem}
                      </Text>
                    </View>
                  </View>

                  {event.actionRequired && (
                    <View style={[styles.actionRequired, { backgroundColor: '#EF4444' + '15' }]}>
                      <AlertTriangle size={14} color="#EF4444" />
                      <Text style={[styles.actionText, { color: '#EF4444' }]}>
                        Action Required
                      </Text>
                    </View>
                  )}

                  <View style={styles.traceSection}>
                    <GitBranch size={12} color="#8B5CF6" />
                    <Text style={[styles.traceLabel, { color: theme.colors.textSecondary }]}>
                      Trace ID
                    </Text>
                    <Text style={[styles.traceValue, { color: '#8B5CF6' }]}>
                      {event.traceId}
                    </Text>
                  </View>
                </View>
                {index < events.length - 1 && (
                  <View style={[styles.timelineConnector, { backgroundColor: 'rgba(255,255,255,0.1)' }]} />
                )}
              </View>
            );
          })}
        </ScrollView>
      </View>

      {/* Recent Critical Events */}
      <View style={[styles.criticalSection, { backgroundColor: 'rgba(239, 68, 68, 0.05)', borderColor: '#EF4444' + '30', borderWidth: 1 }]}>
        <View style={styles.criticalHeader}>
          <AlertTriangle size={18} color="#EF4444" />
          <Text style={[styles.criticalTitle, { color: '#EF4444' }]}>
            Recent Critical Events
          </Text>
        </View>
        <View style={styles.criticalList}>
          <View style={styles.criticalItem}>
            <View style={[styles.criticalDot, { backgroundColor: '#EF4444' }]} />
            <View style={styles.criticalInfo}>
              <Text style={[styles.criticalEvent, { color: theme.colors.text }]}>
                Prompt injection attack blocked
              </Text>
              <Text style={[styles.criticalTime, { color: theme.colors.textSecondary }]}>
                2 minutes ago
              </Text>
            </View>
          </View>
          <View style={styles.criticalItem}>
            <View style={[styles.criticalDot, { backgroundColor: '#EF4444' }]} />
            <View style={styles.criticalInfo}>
              <Text style={[styles.criticalEvent, { color: theme.colors.text }]}>
                Policy violation in customer-facing agent
              </Text>
              <Text style={[styles.criticalTime, { color: theme.colors.textSecondary }]}>
                15 minutes ago
              </Text>
            </View>
          </View>
          <View style={styles.criticalItem}>
            <View style={[styles.criticalDot, { backgroundColor: '#EF4444' }]} />
            <View style={styles.criticalInfo}>
              <Text style={[styles.criticalEvent, { color: theme.colors.text }]}>
                Model drift threshold exceeded
              </Text>
              <Text style={[styles.criticalTime, { color: theme.colors.textSecondary }]}>
                1 hour ago
              </Text>
            </View>
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
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  liveText: {
    fontSize: 10,
    fontWeight: '700',
  },
  statsSection: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 11,
    fontWeight: '500',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
  },
  distributionSection: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  distributionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  distributionTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  distributionGrid: {
    gap: 8,
  },
  distributionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  distributionLabel: {
    fontSize: 12,
    fontWeight: '500',
    width: 80,
  },
  distributionBar: {
    flex: 1,
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  distributionFill: {
    height: '100%',
    borderRadius: 4,
  },
  distributionValue: {
    fontSize: 12,
    fontWeight: '600',
    width: 30,
    textAlign: 'right',
  },
  timelineSection: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    maxHeight: 400,
  },
  timelineHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  timelineTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  timelineContent: {
    paddingLeft: 12,
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginTop: 16,
    marginRight: 12,
  },
  timelineConnector: {
    width: 2,
    marginLeft: 5,
    height: 24,
  },
  eventCard: {
    flex: 1,
    borderRadius: 12,
    padding: 16,
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  eventIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  eventMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  severityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  severityDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  severityText: {
    fontSize: 10,
    fontWeight: '600',
  },
  eventTime: {
    fontSize: 11,
    fontWeight: '500',
  },
  eventTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  eventDescription: {
    fontSize: 12,
    fontWeight: '400',
    marginBottom: 12,
    lineHeight: 16,
  },
  eventDetails: {
    gap: 6,
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailLabel: {
    fontSize: 11,
    fontWeight: '500',
    width: 60,
  },
  detailValue: {
    fontSize: 11,
    fontWeight: '600',
    flex: 1,
  },
  actionRequired: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginBottom: 12,
  },
  actionText: {
    fontSize: 12,
    fontWeight: '600',
  },
  traceSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  traceLabel: {
    fontSize: 10,
    fontWeight: '500',
  },
  traceValue: {
    fontSize: 10,
    fontWeight: '600',
    fontFamily: 'monospace',
  },
  criticalSection: {
    borderRadius: 12,
    padding: 16,
  },
  criticalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  criticalTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  criticalList: {
    gap: 8,
  },
  criticalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  criticalDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  criticalInfo: {
    flex: 1,
  },
  criticalEvent: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 2,
  },
  criticalTime: {
    fontSize: 11,
    fontWeight: '500',
  },
});