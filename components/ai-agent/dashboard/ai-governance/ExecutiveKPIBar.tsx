import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Brain, Shield, AlertTriangle, CheckCircle, Database, Zap, FileText, TrendingUp, Activity, UserCheck } from 'lucide-react-native';

interface GovernanceKPI {
  label: string;
  value: string | number;
  trend: string;
  icon: any;
  color: string;
  status: 'safe' | 'warning' | 'critical';
}

interface ExecutiveKPIBarProps {
  kpis: GovernanceKPI[];
}

export default function ExecutiveKPIBar({ kpis }: ExecutiveKPIBarProps) {
  const { theme } = useTheme();

  const getStatusColor = (status: 'safe' | 'warning' | 'critical') => {
    switch (status) {
      case 'safe': return '#10B981';
      case 'warning': return '#F59E0B';
      case 'critical': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const getStatusBackground = (status: 'safe' | 'warning' | 'critical') => {
    switch (status) {
      case 'safe': return 'rgba(16, 185, 129, 0.1)';
      case 'warning': return 'rgba(245, 158, 11, 0.1)';
      case 'critical': return 'rgba(239, 68, 68, 0.1)';
      default: return 'rgba(107, 114, 128, 0.1)';
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <View style={styles.header}>
        <Brain size={20} color="#06B6D4" />
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
          AI Governance KPIs
        </Text>
      </View>

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {kpis.map((kpi, index) => {
          const Icon = kpi.icon;
          const statusColor = getStatusColor(kpi.status);
          const statusBackground = getStatusBackground(kpi.status);

          return (
            <View 
              key={index} 
              style={[
                styles.kpiCard, 
                { 
                  backgroundColor: statusBackground,
                  borderColor: statusColor + '30',
                  borderWidth: 1
                }
              ]}
            >
              <View style={[styles.iconContainer, { backgroundColor: statusColor + '20' }]}>
                <Icon size={24} color={statusColor} />
              </View>
              <Text style={[styles.kpiLabel, { color: theme.colors.textSecondary }]}>
                {kpi.label}
              </Text>
              <Text style={[styles.kpiValue, { color: statusColor }]}>
                {kpi.value}
              </Text>
              <View style={styles.trendContainer}>
                <TrendingUp size={12} color={kpi.trend.startsWith('+') ? '#10B981' : '#EF4444'} />
                <Text style={[
                  styles.trendText, 
                  { color: kpi.trend.startsWith('+') ? '#10B981' : '#EF4444' }
                ]}>
                  {kpi.trend}
                </Text>
              </View>
              <View style={[
                styles.statusIndicator, 
                { backgroundColor: statusColor }
              ]} />
            </View>
          );
        })}
      </ScrollView>
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
  scrollContent: {
    gap: 12,
    paddingHorizontal: 4,
  },
  kpiCard: {
    borderRadius: 12,
    padding: 16,
    minWidth: 140,
    position: 'relative',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  kpiLabel: {
    fontSize: 11,
    fontWeight: '500',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  kpiValue: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
  },
  trendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  trendText: {
    fontSize: 12,
    fontWeight: '600',
  },
  statusIndicator: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});