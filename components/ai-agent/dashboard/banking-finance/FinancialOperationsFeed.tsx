import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Activity, TrendingUp, Shield, AlertTriangle, BarChart3, Globe, CheckCircle, Zap } from 'lucide-react-native';
import { FinancialOperationsFeedConfig } from '../types';

interface FinancialOperationsFeedProps {
  config: FinancialOperationsFeedConfig;
}

export default function FinancialOperationsFeed({ config }: FinancialOperationsFeedProps) {
  const { theme } = useTheme();

  const getOperationIcon = (type: string) => {
    switch (type) {
      case 'trade': return Activity;
      case 'position': return TrendingUp;
      case 'risk': return Shield;
      case 'fraud': return AlertTriangle;
      case 'portfolio': return BarChart3;
      case 'market': return Globe;
      case 'settlement': return CheckCircle;
      default: return Activity;
    }
  };

  const getImpactColor = (impact: 'critical' | 'high' | 'medium' | 'low') => {
    switch (impact) {
      case 'critical': return '#EF4444';
      case 'high': return '#F59E0B';
      case 'medium': return '#3B82F6';
      case 'low': return '#6B7280';
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: '#05070A' }]}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={[styles.feedBadge, { backgroundColor: '#F59E0B20', borderColor: '#F59E0B' }]}>
            <Zap size={16} color="#F59E0B" />
            <Text style={styles.feedBadgeText}>OPERATIONS</Text>
          </View>
          <Text style={[styles.title, { color: '#FFFFFF' }]}>
            Financial Feed
          </Text>
        </View>
        <View style={[styles.liveIndicator, { backgroundColor: '#10B98120', borderColor: '#10B981' }]}>
          <Activity size={12} color="#10B981" />
          <Text style={styles.liveText}>LIVE</Text>
        </View>
      </View>
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {config.operations.map((operation) => {
          const Icon = getOperationIcon(operation.type);
          return (
            <View key={operation.id} style={[styles.operationCard, { backgroundColor: '#0A0F14', borderColor: getImpactColor(operation.impact) }]}>
              <View style={[styles.iconContainer, { backgroundColor: getImpactColor(operation.impact) + '20' }]}>
                <Icon size={16} color={getImpactColor(operation.impact)} />
              </View>
              <View style={styles.operationContent}>
                <Text style={[styles.operationDescription, { color: '#FFFFFF' }]}>
                  {operation.description}
                </Text>
                <Text style={[styles.operationTimestamp, { color: '#9CA3AF' }]}>
                  {operation.timestamp}
                </Text>
              </View>
              <View style={[styles.impactBadge, { backgroundColor: getImpactColor(operation.impact) + '20', borderColor: getImpactColor(operation.impact) }]}>
                <Text style={[styles.impactText, { color: getImpactColor(operation.impact) }]}>{operation.impact}</Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 12,
    marginTop: 16,
    maxHeight: 400,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  feedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    gap: 6,
  },
  feedBadgeText: {
    color: '#F59E0B',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
  },
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    gap: 6,
  },
  liveText: {
    color: '#10B981',
    fontSize: 10,
    fontWeight: '700',
  },
  operationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  operationContent: {
    flex: 1,
  },
  operationDescription: {
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 2,
  },
  operationTimestamp: {
    fontSize: 11,
  },
  impactBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    borderWidth: 1,
  },
  impactText: {
    fontSize: 10,
    fontWeight: '600',
  },
});
