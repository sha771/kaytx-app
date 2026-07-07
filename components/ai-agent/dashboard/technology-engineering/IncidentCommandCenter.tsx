import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { AlertTriangle, Clock, CheckCircle, XCircle, Users, Zap, Target, Activity } from 'lucide-react-native';

interface Incident {
  id: string;
  title: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  status: 'active' | 'investigating' | 'resolved' | 'monitoring';
  service: string;
  assignedTo: string;
  created: string;
  mttr?: string;
  impact: string;
}

interface IncidentCommandCenterProps {
  metrics: {
    activeIncidents: number;
    criticalAlerts: number;
    avgMTTR: string;
    resolvedToday: number;
  };
  incidents: Incident[];
}

export default function IncidentCommandCenter({ metrics, incidents }: IncidentCommandCenterProps) {
  const { theme } = useTheme();

  const incidentCards = [
    {
      label: 'Active Incidents',
      value: metrics.activeIncidents.toString(),
      icon: AlertTriangle,
      color: '#EF4444',
      subtitle: 'Open cases'
    },
    {
      label: 'Critical Alerts',
      value: metrics.criticalAlerts.toString(),
      icon: Zap,
      color: '#F59E0B',
      subtitle: 'Immediate attention'
    },
    {
      label: 'Avg MTTR',
      value: metrics.avgMTTR,
      icon: Clock,
      color: '#3B82F6',
      subtitle: 'Resolution time'
    },
    {
      label: 'Resolved Today',
      value: metrics.resolvedToday.toString(),
      icon: CheckCircle,
      color: '#10B981',
      subtitle: 'Closed cases'
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return '#EF4444';
      case 'high':
        return '#F59E0B';
      case 'medium':
        return '#3B82F6';
      case 'low':
        return '#10B981';
      default:
        return '#6B7280';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return '#EF4444';
      case 'investigating':
        return '#F59E0B';
      case 'resolved':
        return '#10B981';
      case 'monitoring':
        return '#3B82F6';
      default:
        return '#6B7280';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return AlertTriangle;
      case 'investigating':
        return Activity;
      case 'resolved':
        return CheckCircle;
      case 'monitoring':
        return Target;
      default:
        return AlertTriangle;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
          Incident Command Center
        </Text>
        <Text style={[styles.headerSubtitle, { color: theme.colors.textSecondary }]}>
          Incident Response & Management
        </Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.cardsRow}>
          {incidentCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <View key={index} style={[styles.card, { borderLeftColor: card.color }]}>
                <View style={[styles.cardIcon, { backgroundColor: card.color + '20' }]}>
                  <Icon size={20} color={card.color} />
                </View>
                <Text style={[styles.cardLabel, { color: theme.colors.textSecondary }]}>
                  {card.label}
                </Text>
                <Text style={[styles.cardValue, { color: theme.colors.text }]}>
                  {card.value}
                </Text>
                <Text style={[styles.cardSubtitle, { color: theme.colors.textSecondary }]}>
                  {card.subtitle}
                </Text>
              </View>
            );
          })}
        </View>
      </ScrollView>

      <View style={styles.incidentsSection}>
        <View style={styles.incidentsHeader}>
          <Text style={[styles.incidentsTitle, { color: theme.colors.text }]}>
            Active Incidents
          </Text>
          <Text style={[styles.incidentsCount, { color: theme.colors.textSecondary }]}>
            {incidents.length} incidents
          </Text>
        </View>

        {incidents.map((incident) => {
          const StatusIcon = getStatusIcon(incident.status);
          const statusColor = getStatusColor(incident.status);
          const severityColor = getSeverityColor(incident.severity);
          
          return (
            <View key={incident.id} style={[styles.incidentCard, { backgroundColor: 'rgba(255,255,255,0.03)', borderLeftColor: severityColor }]}>
              <View style={styles.incidentHeader}>
                <View style={styles.incidentInfo}>
                  <View style={[styles.severityBadge, { backgroundColor: severityColor + '20' }]}>
                    <AlertTriangle size={14} color={severityColor} />
                    <Text style={[styles.severityText, { color: severityColor }]}>
                      {incident.severity.toUpperCase()}
                    </Text>
                  </View>
                  <View style={styles.incidentDetails}>
                    <Text style={[styles.incidentTitle, { color: theme.colors.text }]}>
                      {incident.title}
                    </Text>
                    <Text style={[styles.incidentService, { color: theme.colors.textSecondary }]}>
                      {incident.service}
                    </Text>
                  </View>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: statusColor + '20' }]}>
                  <StatusIcon size={14} color={statusColor} />
                  <Text style={[styles.statusText, { color: statusColor }]}>
                    {incident.status.toUpperCase()}
                  </Text>
                </View>
              </View>

              <View style={styles.incidentMeta}>
                <View style={styles.metaItem}>
                  <Users size={14} color="#8B5CF6" />
                  <Text style={[styles.metaLabel, { color: theme.colors.textSecondary }]}>
                    Assigned to
                  </Text>
                  <Text style={[styles.metaValue, { color: theme.colors.text }]}>
                    {incident.assignedTo}
                  </Text>
                </View>

                <View style={styles.metaItem}>
                  <Clock size={14} color="#F59E0B" />
                  <Text style={[styles.metaLabel, { color: theme.colors.textSecondary }]}>
                    Created
                  </Text>
                  <Text style={[styles.metaValue, { color: theme.colors.text }]}>
                    {incident.created}
                  </Text>
                </View>

                {incident.mttr && (
                  <View style={styles.metaItem}>
                    <Target size={14} color="#10B981" />
                    <Text style={[styles.metaLabel, { color: theme.colors.textSecondary }]}>
                      MTTR
                    </Text>
                    <Text style={[styles.metaValue, { color: theme.colors.text }]}>
                      {incident.mttr}
                    </Text>
                  </View>
                )}

                <View style={styles.metaItem}>
                  <Activity size={14} color="#3B82F6" />
                  <Text style={[styles.metaLabel, { color: theme.colors.textSecondary }]}>
                    Impact
                  </Text>
                  <Text style={[styles.metaValue, { color: theme.colors.text }]}>
                    {incident.impact}
                  </Text>
                </View>
              </View>
            </View>
          );
        })}
      </View>

      <View style={styles.workflowSection}>
        <Text style={[styles.workflowTitle, { color: theme.colors.text }]}>
          Incident Response Workflow
        </Text>

        <View style={styles.workflowSteps}>
          <View style={styles.workflowStep}>
            <View style={[styles.stepDot, { backgroundColor: '#EF4444' }]}>
              <AlertTriangle size={16} color="#FFFFFF" />
            </View>
            <Text style={[styles.stepLabel, { color: theme.colors.text }]}>
              Detection
            </Text>
          </View>

          <View style={styles.workflowConnector} />

          <View style={styles.workflowStep}>
            <View style={[styles.stepDot, { backgroundColor: '#F59E0B' }]}>
              <Activity size={16} color="#FFFFFF" />
            </View>
            <Text style={[styles.stepLabel, { color: theme.colors.text }]}>
              Investigation
            </Text>
          </View>

          <View style={styles.workflowConnector} />

          <View style={styles.workflowStep}>
            <View style={[styles.stepDot, { backgroundColor: '#3B82F6' }]}>
              <Target size={16} color="#FFFFFF" />
            </View>
            <Text style={[styles.stepLabel, { color: theme.colors.text }]}>
              Resolution
            </Text>
          </View>

          <View style={styles.workflowConnector} />

          <View style={styles.workflowStep}>
            <View style={[styles.stepDot, { backgroundColor: '#10B981' }]}>
              <CheckCircle size={16} color="#FFFFFF" />
            </View>
            <Text style={[styles.stepLabel, { color: theme.colors.text }]}>
              Post-Mortem
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginBottom: 16,
  },
  header: {
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 13,
    opacity: 0.7,
  },
  cardsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  card: {
    width: 140,
    padding: 12,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderLeftWidth: 3,
  },
  cardIcon: {
    width: 36,
    height: 36,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardLabel: {
    fontSize: 10,
    fontWeight: '500',
    textTransform: 'uppercase',
    marginBottom: 4,
    opacity: 0.7,
  },
  cardValue: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 9,
    opacity: 0.6,
  },
  incidentsSection: {
    marginBottom: 20,
  },
  incidentsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  incidentsTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  incidentsCount: {
    fontSize: 12,
    opacity: 0.7,
  },
  incidentCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderLeftWidth: 4,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  incidentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  incidentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  severityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  severityText: {
    fontSize: 10,
    fontWeight: '700',
  },
  incidentDetails: {
    flex: 1,
  },
  incidentTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  incidentService: {
    fontSize: 11,
    opacity: 0.7,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
  },
  incidentMeta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaLabel: {
    fontSize: 10,
    opacity: 0.7,
  },
  metaValue: {
    fontSize: 11,
    fontWeight: '600',
  },
  workflowSection: {
    marginTop: 8,
  },
  workflowTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
  },
  workflowSteps: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  workflowStep: {
    alignItems: 'center',
  },
  stepDot: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  stepLabel: {
    fontSize: 11,
    fontWeight: '600',
  },
  workflowConnector: {
    flex: 1,
    height: 2,
    backgroundColor: 'rgba(255,255,255,0.1)',
    marginHorizontal: 8,
  }
});