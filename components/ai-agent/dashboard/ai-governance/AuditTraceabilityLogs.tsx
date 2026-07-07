import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { FileText, Clock, User, Shield, AlertTriangle, CheckCircle, Zap, Lock, Eye, GitBranch, Activity, Search, Filter } from 'lucide-react-native';

interface AuditLog {
  id: string;
  timestamp: string;
  eventType: 'decision' | 'prompt' | 'output' | 'override' | 'violation' | 'deployment';
  category: string;
  description: string;
  agent: string;
  model: string;
  user: string;
  status: 'success' | 'warning' | 'critical';
  traceId: string;
  details: {
    label: string;
    value: string;
  }[];
}

interface AuditTraceabilityLogsProps {
  logs: AuditLog[];
}

export default function AuditTraceabilityLogs({ logs }: AuditTraceabilityLogsProps) {
  const { theme } = useTheme();

  const getEventTypeColor = (eventType: string) => {
    switch (eventType) {
      case 'decision': return '#06B6D4';
      case 'prompt': return '#8B5CF6';
      case 'output': return '#10B981';
      case 'override': return '#F59E0B';
      case 'violation': return '#EF4444';
      case 'deployment': return '#3B82F6';
      default: return '#6B7280';
    }
  };

  const getEventTypeBackground = (eventType: string) => {
    const color = getEventTypeColor(eventType);
    return color + '15';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return '#10B981';
      case 'warning': return '#F59E0B';
      case 'critical': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const getStatusBackground = (status: string) => {
    const color = getStatusColor(status);
    return color + '15';
  };

  const eventTypeIcon = {
    decision: Activity,
    prompt: FileText,
    output: CheckCircle,
    override: User,
    violation: AlertTriangle,
    deployment: Zap,
  };

  const recentActivity = [
    { event: 'Model deployment approved', time: '2 min ago', status: 'success' },
    { event: 'Policy violation blocked', time: '15 min ago', status: 'warning' },
    { event: 'Human override triggered', time: '1 hour ago', status: 'warning' },
    { event: 'Audit log recorded', time: '2 hours ago', status: 'success' },
    { event: 'Risk threshold exceeded', time: '3 hours ago', status: 'critical' },
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <View style={styles.header}>
        <FileText size={20} color="#8B5CF6" />
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
          Audit & Traceability Logs
        </Text>
      </View>

      {/* Audit Timeline */}
      <View style={[styles.timelineSection, { backgroundColor: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.08)', borderWidth: 1 }]}>
        <View style={styles.timelineHeader}>
          <Clock size={18} color="#06B6D4" />
          <Text style={[styles.timelineTitle, { color: theme.colors.text }]}>
            Immutable Audit Timeline
          </Text>
        </View>
        <View style={styles.timelineContent}>
          {recentActivity.map((activity, index) => (
            <View key={index} style={styles.timelineItem}>
              <View style={[
                styles.timelineDot, 
                { backgroundColor: activity.status === 'success' ? '#10B981' : activity.status === 'warning' ? '#F59E0B' : '#EF4444' }
              ]} />
              <View style={styles.timelineInfo}>
                <Text style={[styles.timelineEvent, { color: theme.colors.text }]}>
                  {activity.event}
                </Text>
                <Text style={[styles.timelineTime, { color: theme.colors.textSecondary }]}>
                  {activity.time}
                </Text>
              </View>
              {index < recentActivity.length - 1 && (
                <View style={[styles.timelineConnector, { backgroundColor: 'rgba(255,255,255,0.1)' }]} />
              )}
            </View>
          ))}
        </View>
      </View>

      {/* Filter Bar */}
      <View style={[styles.filterSection, { backgroundColor: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.08)', borderWidth: 1 }]}>
        <View style={styles.filterRow}>
          <View style={[styles.filterInput, { backgroundColor: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)', borderWidth: 1 }]}>
            <Search size={16} color={theme.colors.textSecondary} />
            <Text style={[styles.filterPlaceholder, { color: theme.colors.textSecondary }]}>
              Search logs...
            </Text>
          </View>
          <View style={[styles.filterButton, { backgroundColor: '#8B5CF6' + '20' }]}>
            <Filter size={16} color="#8B5CF6" />
            <Text style={[styles.filterButtonText, { color: '#8B5CF6' }]}>
              Filters
            </Text>
          </View>
        </View>
      </View>

      {/* Audit Log Cards */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.logsScroll}
      >
        {logs.map((log) => {
          const eventTypeColor = getEventTypeColor(log.eventType);
          const eventTypeBackground = getEventTypeBackground(log.eventType);
          const statusColor = getStatusColor(log.status);
          const statusBackground = getStatusBackground(log.status);
          const EventTypeIcon = eventTypeIcon[log.eventType];

          return (
            <View 
              key={log.id} 
              style={[
                styles.logCard, 
                { 
                  backgroundColor: eventTypeBackground,
                  borderColor: eventTypeColor + '30',
                  borderWidth: 1
                }
              ]}
            >
              <View style={styles.logHeader}>
                <View style={[styles.logIcon, { backgroundColor: eventTypeColor + '20' }]}>
                  <EventTypeIcon size={24} color={eventTypeColor} />
                </View>
                <View style={styles.logStatus}>
                  <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
                  <Text style={[styles.statusText, { color: statusColor }]}>
                    {log.status.toUpperCase()}
                  </Text>
                </View>
              </View>

              <Text style={[styles.logDescription, { color: theme.colors.text }]}>
                {log.description}
              </Text>
              <View style={[styles.categoryBadge, { backgroundColor: eventTypeColor + '20' }]}>
                <Text style={[styles.categoryText, { color: eventTypeColor }]}>
                  {log.eventType.toUpperCase()}
                </Text>
              </View>

              <View style={styles.logMeta}>
                <View style={styles.metaItem}>
                  <User size={12} color={theme.colors.textSecondary} />
                  <Text style={[styles.metaText, { color: theme.colors.textSecondary }]}>
                    {log.agent}
                  </Text>
                </View>
                <View style={styles.metaItem}>
                  <Zap size={12} color={theme.colors.textSecondary} />
                  <Text style={[styles.metaText, { color: theme.colors.textSecondary }]}>
                    {log.model}
                  </Text>
                </View>
              </View>

              <View style={styles.logDetails}>
                {log.details.slice(0, 3).map((detail, index) => (
                  <View key={index} style={styles.detailItem}>
                    <Text style={[styles.detailLabel, { color: theme.colors.textSecondary }]}>
                      {detail.label}
                    </Text>
                    <Text style={[styles.detailValue, { color: theme.colors.text }]}>
                      {detail.value}
                    </Text>
                  </View>
                ))}
              </View>

              <View style={styles.traceSection}>
                <View style={styles.traceRow}>
                  <GitBranch size={12} color="#8B5CF6" />
                  <Text style={[styles.traceLabel, { color: theme.colors.textSecondary }]}>
                    Trace ID
                  </Text>
                  <Text style={[styles.traceValue, { color: '#8B5CF6' }]}>
                    {log.traceId}
                  </Text>
                </View>
              </View>

              <View style={styles.logFooter}>
                <Clock size={12} color={theme.colors.textSecondary} />
                <Text style={[styles.footerText, { color: theme.colors.textSecondary }]}>
                  {log.timestamp}
                </Text>
              </View>
            </View>
          );
        })}
      </ScrollView>

      {/* Decision Trace Graph */}
      <View style={[styles.traceGraphSection, { backgroundColor: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.08)', borderWidth: 1 }]}>
        <View style={styles.traceGraphHeader}>
          <GitBranch size={18} color="#06B6D4" />
          <Text style={[styles.traceGraphTitle, { color: theme.colors.text }]}>
            Decision Trace Graph
          </Text>
        </View>
        <View style={styles.traceGraphContent}>
          <View style={styles.traceNode}>
            <View style={[styles.nodeDot, { backgroundColor: '#06B6D4' }]} />
            <Text style={[styles.nodeLabel, { color: theme.colors.text }]}>
              User Input
            </Text>
          </View>
          <View style={[styles.traceLine, { backgroundColor: 'rgba(6, 182, 212, 0.3)' }]} />
          <View style={styles.traceNode}>
            <View style={[styles.nodeDot, { backgroundColor: '#8B5CF6' }]} />
            <Text style={[styles.nodeLabel, { color: theme.colors.text }]}>
              AI Processing
            </Text>
          </View>
          <View style={[styles.traceLine, { backgroundColor: 'rgba(139, 92, 246, 0.3)' }]} />
          <View style={styles.traceNode}>
            <View style={[styles.nodeDot, { backgroundColor: '#10B981' }]} />
            <Text style={[styles.nodeLabel, { color: theme.colors.text }]}>
              Policy Check
            </Text>
          </View>
          <View style={[styles.traceLine, { backgroundColor: 'rgba(16, 185, 129, 0.3)' }]} />
          <View style={styles.traceNode}>
            <View style={[styles.nodeDot, { backgroundColor: '#F59E0B' }]} />
            <Text style={[styles.nodeLabel, { color: theme.colors.text }]}>
              Decision
            </Text>
          </View>
          <View style={[styles.traceLine, { backgroundColor: 'rgba(245, 158, 11, 0.3)' }]} />
          <View style={styles.traceNode}>
            <View style={[styles.nodeDot, { backgroundColor: '#EF4444' }]} />
            <Text style={[styles.nodeLabel, { color: theme.colors.text }]}>
              Output
            </Text>
          </View>
        </View>
      </View>

      {/* Governance Audit Ledger */}
      <View style={[styles.ledgerSection, { backgroundColor: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.08)', borderWidth: 1 }]}>
        <View style={styles.ledgerHeader}>
          <Shield size={18} color="#10B981" />
          <Text style={[styles.ledgerTitle, { color: theme.colors.text }]}>
            Governance Audit Ledger
          </Text>
        </View>
        <View style={styles.ledgerStats}>
          <View style={styles.ledgerStat}>
            <Text style={[styles.ledgerLabel, { color: theme.colors.textSecondary }]}>
              Total Logs
            </Text>
            <Text style={[styles.ledgerValue, { color: '#06B6D4' }]}>
              1,284,392
            </Text>
          </View>
          <View style={styles.ledgerStat}>
            <Text style={[styles.ledgerLabel, { color: theme.colors.textSecondary }]}>
              Today
            </Text>
            <Text style={[styles.ledgerValue, { color: '#10B981' }]}>
              24,847
            </Text>
          </View>
          <View style={styles.ledgerStat}>
            <Text style={[styles.ledgerLabel, { color: theme.colors.textSecondary }]}>
              Violations
            </Text>
            <Text style={[styles.ledgerValue, { color: '#EF4444' }]}>
              142
            </Text>
          </View>
          <View style={styles.ledgerStat}>
            <Text style={[styles.ledgerLabel, { color: theme.colors.textSecondary }]}>
              Overrides
            </Text>
            <Text style={[styles.ledgerValue, { color: '#F59E0B' }]}>
              89
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
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  timelineSection: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
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
    gap: 12,
  },
  timelineItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    position: 'relative',
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginTop: 2,
  },
  timelineInfo: {
    flex: 1,
  },
  timelineEvent: {
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 2,
  },
  timelineTime: {
    fontSize: 11,
    fontWeight: '500',
  },
  timelineConnector: {
    position: 'absolute',
    left: 5,
    top: 14,
    width: 2,
    height: 32,
  },
  filterSection: {
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  filterRow: {
    flexDirection: 'row',
    gap: 12,
  },
  filterInput: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  filterPlaceholder: {
    fontSize: 13,
    fontWeight: '500',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  filterButtonText: {
    fontSize: 12,
    fontWeight: '600',
  },
  logsScroll: {
    gap: 16,
    paddingHorizontal: 4,
    marginBottom: 16,
  },
  logCard: {
    borderRadius: 16,
    padding: 20,
    minWidth: 280,
  },
  logHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  logIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
  },
  logDescription: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 12,
  },
  categoryText: {
    fontSize: 10,
    fontWeight: '600',
  },
  logMeta: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaText: {
    fontSize: 11,
    fontWeight: '500',
  },
  logDetails: {
    gap: 6,
    marginBottom: 12,
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailLabel: {
    fontSize: 11,
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 11,
    fontWeight: '600',
  },
  traceSection: {
    marginBottom: 12,
  },
  traceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  traceLabel: {
    fontSize: 11,
    fontWeight: '500',
  },
  traceValue: {
    fontSize: 11,
    fontWeight: '600',
    fontFamily: 'monospace',
  },
  logFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },
  footerText: {
    fontSize: 11,
    fontWeight: '500',
  },
  traceGraphSection: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  traceGraphHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  traceGraphTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  traceGraphContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  traceNode: {
    alignItems: 'center',
    gap: 4,
  },
  nodeDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
  },
  nodeLabel: {
    fontSize: 10,
    fontWeight: '500',
  },
  traceLine: {
    width: 32,
    height: 2,
  },
  ledgerSection: {
    borderRadius: 12,
    padding: 16,
  },
  ledgerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  ledgerTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  ledgerStats: {
    flexDirection: 'row',
    gap: 12,
  },
  ledgerStat: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.02)',
  },
  ledgerLabel: {
    fontSize: 11,
    fontWeight: '500',
    marginBottom: 4,
  },
  ledgerValue: {
    fontSize: 18,
    fontWeight: '700',
  },
});