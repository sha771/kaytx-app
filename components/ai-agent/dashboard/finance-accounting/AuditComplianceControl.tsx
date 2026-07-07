import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Shield, CheckCircle, AlertTriangle, XCircle, FileText, Clock, TrendingUp, Activity } from 'lucide-react-native';

interface ComplianceMetric {
  label: string;
  value: string;
  status: 'compliant' | 'warning' | 'critical';
  trend: 'up' | 'down' | 'stable';
}

interface AuditItem {
  id: string;
  title: string;
  status: 'complete' | 'in-progress' | 'pending';
  priority: 'high' | 'medium' | 'low';
  dueDate: string;
}

interface RiskFactor {
  category: string;
  level: 'low' | 'medium' | 'high' | 'critical';
  score: number;
}

interface AuditComplianceControlProps {
  complianceScore: number;
  auditReadiness: number;
  metrics: ComplianceMetric[];
  auditItems: AuditItem[];
  riskFactors: RiskFactor[];
}

export default function AuditComplianceControl({ 
  complianceScore, 
  auditReadiness,
  metrics,
  auditItems,
  riskFactors 
}: AuditComplianceControlProps) {
  const { theme } = useTheme();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'compliant':
      case 'complete':
        return '#10B981';
      case 'warning':
      case 'in-progress':
        return '#F59E0B';
      case 'critical':
      case 'pending':
        return '#EF4444';
      default:
        return '#6B7280';
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'low':
        return '#10B981';
      case 'medium':
        return '#3B82F6';
      case 'high':
        return '#F59E0B';
      case 'critical':
        return '#EF4444';
      default:
        return '#6B7280';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'compliant':
      case 'complete':
        return <CheckCircle size={14} color="#10B981" />;
      case 'warning':
      case 'in-progress':
        return <AlertTriangle size={14} color="#F59E0B" />;
      case 'critical':
      case 'pending':
        return <XCircle size={14} color="#EF4444" />;
      default:
        return <Activity size={14} color="#6B7280" />;
    }
  };

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return <TrendingUp size={12} color="#10B981" />;
      case 'down':
        return <Activity size={12} color="#EF4444" />;
      case 'stable':
        return <Activity size={12} color="#6B7280" />;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <View style={styles.header}>
        <Shield size={20} color={theme.colors.primary} />
        <Text style={[styles.title, { color: theme.colors.text }]}>
          Audit & Compliance Control
        </Text>
      </View>

      <View style={styles.scoreSection}>
        <View style={styles.scoreCard}>
          <CheckCircle size={20} color={getStatusColor(complianceScore >= 80 ? 'compliant' : complianceScore >= 60 ? 'warning' : 'critical')} />
          <Text style={[styles.scoreLabel, { color: theme.colors.textSecondary }]}>
            Compliance Score
          </Text>
          <Text style={[styles.scoreValue, { color: getStatusColor(complianceScore >= 80 ? 'compliant' : complianceScore >= 60 ? 'warning' : 'critical') }]}>
            {complianceScore}%
          </Text>
          <View style={[styles.scoreBar, { backgroundColor: 'rgba(255,255,255,0.1)' }]}>
            <View 
              style={[
                styles.scoreFill, 
                { 
                  backgroundColor: getStatusColor(complianceScore >= 80 ? 'compliant' : complianceScore >= 60 ? 'warning' : 'critical'),
                  width: `${complianceScore}%`
                }
              ]} 
            />
          </View>
        </View>

        <View style={styles.scoreCard}>
          <FileText size={20} color={getStatusColor(auditReadiness >= 80 ? 'compliant' : auditReadiness >= 60 ? 'warning' : 'critical')} />
          <Text style={[styles.scoreLabel, { color: theme.colors.textSecondary }]}>
            Audit Readiness
          </Text>
          <Text style={[styles.scoreValue, { color: getStatusColor(auditReadiness >= 80 ? 'compliant' : auditReadiness >= 60 ? 'warning' : 'critical') }]}>
            {auditReadiness}%
          </Text>
          <View style={[styles.scoreBar, { backgroundColor: 'rgba(255,255,255,0.1)' }]}>
            <View 
              style={[
                styles.scoreFill, 
                { 
                  backgroundColor: getStatusColor(auditReadiness >= 80 ? 'compliant' : auditReadiness >= 60 ? 'warning' : 'critical'),
                  width: `${auditReadiness}%`
                }
              ]} 
            />
          </View>
        </View>
      </View>

      <View style={styles.metricsSection}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Compliance Metrics
        </Text>
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.metricsRow}>
            {metrics.map((metric) => (
              <View 
                key={metric.label} 
                style={[
                  styles.metricCard, 
                  { borderLeftColor: getStatusColor(metric.status) }
                ]}
              >
                <View style={styles.metricHeader}>
                  {getStatusIcon(metric.status)}
                  <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                    {metric.label}
                  </Text>
                </View>
                <Text style={[styles.metricValue, { color: theme.colors.text }]}>
                  {metric.value}
                </Text>
                <View style={styles.metricTrend}>
                  {getTrendIcon(metric.trend)}
                  <Text style={[styles.trendText, { color: metric.trend === 'up' ? '#10B981' : metric.trend === 'down' ? '#EF4444' : '#6B7280' }]}>
                    {metric.trend === 'up' ? 'Improving' : metric.trend === 'down' ? 'Declining' : 'Stable'}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>

      <View style={styles.auditSection}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Audit Tracking
        </Text>
        
        <View style={styles.auditList}>
          {auditItems.map((item) => (
            <View key={item.id} style={styles.auditItem}>
              <View style={styles.auditHeader}>
                {getStatusIcon(item.status)}
                <Text style={[styles.auditTitle, { color: theme.colors.text }]}>
                  {item.title}
                </Text>
                <View style={[styles.priorityBadge, { backgroundColor: getLevelColor(item.priority) + '20' }]}>
                  <Text style={[styles.priorityText, { color: getLevelColor(item.priority) }]}>
                    {item.priority}
                  </Text>
                </View>
              </View>
              <View style={styles.auditMeta}>
                <Clock size={12} color="#6B7280" />
                <Text style={[styles.auditDate, { color: theme.colors.textSecondary }]}>
                  {item.dueDate}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.riskSection}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Risk Assessment
        </Text>
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.riskRow}>
            {riskFactors.map((risk) => (
              <View 
                key={risk.category} 
                style={[
                  styles.riskCard, 
                  { borderColor: getLevelColor(risk.level) }
                ]}
              >
                <Text style={[styles.riskCategory, { color: theme.colors.text }]}>
                  {risk.category}
                </Text>
                <Text style={[styles.riskLevel, { color: getLevelColor(risk.level) }]}>
                  {risk.level.charAt(0).toUpperCase() + risk.level.slice(1)}
                </Text>
                <View style={styles.riskScoreSection}>
                  <Text style={[styles.riskScoreLabel, { color: theme.colors.textSecondary }]}>
                    Risk Score
                  </Text>
                  <Text style={[styles.riskScoreValue, { color: getLevelColor(risk.level) }]}>
                    {risk.score}/100
                  </Text>
                  <View style={[styles.riskBar, { backgroundColor: 'rgba(255,255,255,0.1)' }]}>
                    <View 
                      style={[
                        styles.riskFill, 
                        { 
                          backgroundColor: getLevelColor(risk.level),
                          width: `${risk.score}%`
                        }
                      ]} 
                    />
                  </View>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>

      <View style={styles.alertsSection}>
        <View style={styles.alertCard}>
          <AlertTriangle size={14} color="#F59E0B" />
          <Text style={[styles.alertText, { color: theme.colors.textSecondary }]}>
            2 compliance items require attention before next audit
          </Text>
        </View>
        <View style={styles.alertCard}>
          <CheckCircle size={14} color="#10B981" />
          <Text style={[styles.alertText, { color: theme.colors.textSecondary }]}>
            All financial controls operating within acceptable parameters
          </Text>
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
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  scoreSection: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  scoreCard: {
    flex: 1,
    borderRadius: 12,
    padding: 16,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  scoreLabel: {
    fontSize: 11,
    fontWeight: '500',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  scoreValue: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
  },
  scoreBar: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  scoreFill: {
    height: '100%',
    borderRadius: 3,
  },
  metricsSection: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
  },
  metricsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  metricCard: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderLeftWidth: 3,
    minWidth: 120,
  },
  metricHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  metricLabel: {
    fontSize: 10,
    fontWeight: '500',
  },
  metricValue: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  metricTrend: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  trendText: {
    fontSize: 11,
    fontWeight: '600',
  },
  auditSection: {
    marginBottom: 16,
  },
  auditList: {
    gap: 8,
  },
  auditItem: {
    padding: 12,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  auditHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  auditTitle: {
    flex: 1,
    fontSize: 12,
    fontWeight: '600',
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  priorityText: {
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  auditMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  auditDate: {
    fontSize: 10,
  },
  riskSection: {
    marginBottom: 16,
  },
  riskRow: {
    flexDirection: 'row',
    gap: 12,
  },
  riskCard: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderWidth: 2,
    minWidth: 120,
  },
  riskCategory: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 4,
  },
  riskLevel: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 8,
  },
  riskScoreSection: {
    marginTop: 8,
  },
  riskScoreLabel: {
    fontSize: 10,
    marginBottom: 2,
  },
  riskScoreValue: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  riskBar: {
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
  },
  riskFill: {
    height: '100%',
    borderRadius: 2,
  },
  alertsSection: {
    gap: 8,
  },
  alertCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 10,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: 8,
  },
  alertText: {
    flex: 1,
    fontSize: 11,
  }
});