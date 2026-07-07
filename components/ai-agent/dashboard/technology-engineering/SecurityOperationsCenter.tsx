import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Shield, AlertTriangle, Lock, Eye, CheckCircle, XCircle, Fingerprint, Database } from 'lucide-react-native';

interface SecurityThreat {
  id: string;
  type: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  status: 'active' | 'investigating' | 'resolved';
  source: string;
  detected: string;
  description: string;
}

interface SecurityOperationsCenterProps {
  metrics: {
    vulnerabilities: number;
    threatsDetected: number;
    securityScore: number;
    complianceStatus: string;
    securityIncidents: number;
  };
  threats: SecurityThreat[];
}

export default function SecurityOperationsCenter({ metrics, threats }: SecurityOperationsCenterProps) {
  const { theme } = useTheme();

  const securityCards = [
    {
      label: 'Vulnerabilities',
      value: metrics.vulnerabilities.toString(),
      icon: AlertTriangle,
      color: '#EF4444',
      subtitle: 'Open issues'
    },
    {
      label: 'Threats Detected',
      value: metrics.threatsDetected.toString(),
      icon: Eye,
      color: '#F59E0B',
      subtitle: 'This month'
    },
    {
      label: 'Security Score',
      value: `${metrics.securityScore}%`,
      icon: Shield,
      color: '#10B981',
      subtitle: 'Overall posture'
    },
    {
      label: 'Compliance',
      value: metrics.complianceStatus,
      icon: CheckCircle,
      color: '#3B82F6',
      subtitle: 'Status'
    },
    {
      label: 'Security Incidents',
      value: metrics.securityIncidents.toString(),
      icon: Lock,
      color: '#8B5CF6',
      subtitle: 'Active cases'
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
      default:
        return '#6B7280';
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
          Security Operations Center
        </Text>
        <Text style={[styles.headerSubtitle, { color: theme.colors.textSecondary }]}>
          Threat Detection & Security Monitoring
        </Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.cardsRow}>
          {securityCards.map((card, index) => {
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

      <View style={styles.scoreSection}>
        <View style={styles.scoreCard}>
          <View style={styles.scoreHeader}>
            <View style={[styles.scoreIcon, { backgroundColor: '#10B981' + '20' }]}>
              <Shield size={32} color="#10B981" />
            </View>
            <View style={styles.scoreInfo}>
              <Text style={[styles.scoreLabel, { color: theme.colors.textSecondary }]}>
                Security Posture Score
              </Text>
              <Text style={[styles.scoreValue, { color: theme.colors.text }]}>
                {metrics.securityScore}/100
              </Text>
            </View>
          </View>
          <View style={[styles.scoreBar, { backgroundColor: 'rgba(255,255,255,0.1)' }]}>
            <View 
              style={[styles.scoreFill, { 
                backgroundColor: metrics.securityScore >= 80 ? '#10B981' : metrics.securityScore >= 60 ? '#F59E0B' : '#EF4444',
                width: `${metrics.securityScore}%` 
              }]} 
            />
          </View>
          <Text style={[styles.scoreStatus, { color: theme.colors.textSecondary }]}>
            {metrics.securityScore >= 80 ? 'Excellent' : metrics.securityScore >= 60 ? 'Good' : 'Needs Improvement'}
          </Text>
        </View>
      </View>

      <View style={styles.threatsSection}>
        <View style={styles.threatsHeader}>
          <Text style={[styles.threatsTitle, { color: theme.colors.text }]}>
            Active Threats
          </Text>
          <Text style={[styles.threatsCount, { color: theme.colors.textSecondary }]}>
            {threats.length} threats
          </Text>
        </View>

        {threats.map((threat) => (
          <View key={threat.id} style={[styles.threatCard, { backgroundColor: 'rgba(255,255,255,0.03)', borderLeftColor: getSeverityColor(threat.severity) }]}>
            <View style={styles.threatHeader}>
              <View style={styles.threatInfo}>
                <View style={[styles.severityBadge, { backgroundColor: getSeverityColor(threat.severity) + '20' }]}>
                  <AlertTriangle size={14} color={getSeverityColor(threat.severity)} />
                  <Text style={[styles.severityText, { color: getSeverityColor(threat.severity) }]}>
                    {threat.severity.toUpperCase()}
                  </Text>
                </View>
                <View style={styles.threatDetails}>
                  <Text style={[styles.threatType, { color: theme.colors.text }]}>
                    {threat.type}
                  </Text>
                  <Text style={[styles.threatSource, { color: theme.colors.textSecondary }]}>
                    {threat.source}
                  </Text>
                </View>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: getStatusColor(threat.status) + '20' }]}>
                <Text style={[styles.statusText, { color: getStatusColor(threat.status) }]}>
                  {threat.status.toUpperCase()}
                </Text>
              </View>
            </View>

            <Text style={[styles.threatDescription, { color: theme.colors.textSecondary }]}>
              {threat.description}
            </Text>

            <View style={styles.threatMeta}>
              <View style={styles.metaItem}>
                <Fingerprint size={14} color="#8B5CF6" />
                <Text style={[styles.metaText, { color: theme.colors.textSecondary }]}>
                  Detected {threat.detected}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.complianceSection}>
        <Text style={[styles.complianceTitle, { color: theme.colors.text }]}>
          Compliance Status
        </Text>

        <View style={styles.complianceGrid}>
          <View style={[styles.complianceCard, { backgroundColor: 'rgba(16, 185, 129, 0.1)', borderColor: '#10B981' }]}>
            <CheckCircle size={24} color="#10B981" />
            <Text style={[styles.complianceLabel, { color: theme.colors.text }]}>
              SOC 2
            </Text>
            <Text style={[styles.complianceStatus, { color: '#10B981' }]}>
              Compliant
            </Text>
          </View>

          <View style={[styles.complianceCard, { backgroundColor: 'rgba(16, 185, 129, 0.1)', borderColor: '#10B981' }]}>
            <CheckCircle size={24} color="#10B981" />
            <Text style={[styles.complianceLabel, { color: theme.colors.text }]}>
              GDPR
            </Text>
            <Text style={[styles.complianceStatus, { color: '#10B981' }]}>
              Compliant
            </Text>
          </View>

          <View style={[styles.complianceCard, { backgroundColor: 'rgba(16, 185, 129, 0.1)', borderColor: '#10B981' }]}>
            <CheckCircle size={24} color="#10B981" />
            <Text style={[styles.complianceLabel, { color: theme.colors.text }]}>
              HIPAA
            </Text>
            <Text style={[styles.complianceStatus, { color: '#10B981' }]}>
              Compliant
            </Text>
          </View>

          <View style={[styles.complianceCard, { backgroundColor: 'rgba(245, 158, 11, 0.1)', borderColor: '#F59E0B' }]}>
            <AlertTriangle size={24} color="#F59E0B" />
            <Text style={[styles.complianceLabel, { color: theme.colors.text }]}>
              PCI DSS
            </Text>
            <Text style={[styles.complianceStatus, { color: '#F59E0B' }]}>
              Review
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
    width: 130,
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
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 9,
    opacity: 0.6,
  },
  scoreSection: {
    marginBottom: 20,
  },
  scoreCard: {
    padding: 20,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  scoreHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  scoreIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  scoreInfo: {
    flex: 1,
  },
  scoreLabel: {
    fontSize: 13,
    marginBottom: 4,
    opacity: 0.7,
  },
  scoreValue: {
    fontSize: 28,
    fontWeight: '700',
  },
  scoreBar: {
    height: 12,
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 12,
  },
  scoreFill: {
    height: '100%',
    borderRadius: 6,
  },
  scoreStatus: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  threatsSection: {
    marginBottom: 20,
  },
  threatsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  threatsTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  threatsCount: {
    fontSize: 12,
    opacity: 0.7,
  },
  threatCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderLeftWidth: 4,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  threatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  threatInfo: {
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
  threatDetails: {
    flex: 1,
  },
  threatType: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  threatSource: {
    fontSize: 11,
    opacity: 0.7,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
  },
  threatDescription: {
    fontSize: 12,
    opacity: 0.8,
    marginBottom: 12,
    lineHeight: 18,
  },
  threatMeta: {
    flexDirection: 'row',
    gap: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaText: {
    fontSize: 11,
    opacity: 0.7,
  },
  complianceSection: {
    marginTop: 8,
  },
  complianceTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  complianceGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  complianceCard: {
    width: '48%',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
  },
  complianceLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 8,
    marginBottom: 4,
  },
  complianceStatus: {
    fontSize: 12,
    fontWeight: '600',
  }
});