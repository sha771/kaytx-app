import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { CreditCard, CheckCircle, XCircle, Globe, Activity, ArrowRight } from 'lucide-react-native';
import { PaymentSettlementConfig } from '../types';

interface PaymentSettlementProps {
  config: PaymentSettlementConfig;
}

export default function PaymentSettlement({ config }: PaymentSettlementProps) {
  const { theme } = useTheme();

  const getStatusColor = (status: 'processing' | 'completed' | 'failed') => {
    switch (status) {
      case 'completed': return '#10B981';
      case 'failed': return '#EF4444';
      case 'processing': return '#3B82F6';
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: '#05070A' }]}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={[styles.paymentBadge, { backgroundColor: '#3B82F620', borderColor: '#3B82F6' }]}>
            <CreditCard size={16} color="#3B82F6" />
            <Text style={styles.paymentBadgeText}>PAYMENTS</Text>
          </View>
          <Text style={[styles.title, { color: '#FFFFFF' }]}>
            Settlement Network
          </Text>
        </View>
        <View style={[styles.liveIndicator, { backgroundColor: '#10B98120', borderColor: '#10B981' }]}>
          <Activity size={12} color="#10B981" />
          <Text style={styles.liveText}>LIVE</Text>
        </View>
      </View>
      
      <View style={[styles.metricsRow, { backgroundColor: '#0A0F14', borderColor: '#1F2937' }]}>
        <View style={styles.metricItem}>
          <View style={[styles.metricIcon, { backgroundColor: '#3B82F620' }]}>
            <Activity size={20} color="#3B82F6" />
          </View>
          <Text style={[styles.metricLabel, { color: '#9CA3AF' }]}>Processed</Text>
          <Text style={[styles.metricValue, { color: '#FFFFFF' }]}>{config.transactionsProcessed}</Text>
        </View>
        <View style={styles.metricItem}>
          <View style={[styles.metricIcon, { backgroundColor: '#10B98120' }]}>
            <CheckCircle size={20} color="#10B981" />
          </View>
          <Text style={[styles.metricLabel, { color: '#9CA3AF' }]}>Success Rate</Text>
          <Text style={[styles.metricValue, { color: '#10B981' }]}>{config.successRate}%</Text>
        </View>
        <View style={styles.metricItem}>
          <View style={[styles.metricIcon, { backgroundColor: '#EF444420' }]}>
            <XCircle size={20} color="#EF4444" />
          </View>
          <Text style={[styles.metricLabel, { color: '#9CA3AF' }]}>Failures</Text>
          <Text style={[styles.metricValue, { color: '#EF4444' }]}>{config.paymentFailures}%</Text>
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: '#0A0F14', borderColor: '#1F2937' }]}>
        <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>Settlement Metrics</Text>
        <View style={styles.metricRow}>
          <CreditCard size={14} color="#3B82F6" />
          <Text style={[styles.settlementLabel, { color: '#9CA3AF' }]}>Settlement Time</Text>
          <Text style={[styles.settlementValue, { color: '#FFFFFF' }]}>{config.settlementTime}</Text>
        </View>
        <View style={styles.metricRow}>
          <Globe size={14} color="#06B6D4" />
          <Text style={[styles.settlementLabel, { color: '#9CA3AF' }]}>Cross-Border Payments</Text>
          <Text style={[styles.settlementValue, { color: '#FFFFFF' }]}>{config.crossBorderPayments}</Text>
        </View>
        <View style={styles.metricRow}>
          <Activity size={14} color="#10B981" />
          <Text style={[styles.settlementLabel, { color: '#9CA3AF' }]}>SWIFT Messages</Text>
          <Text style={[styles.settlementValue, { color: '#FFFFFF' }]}>{config.swiftMessages.toLocaleString()}</Text>
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: '#0A0F14', borderColor: '#1F2937' }]}>
        <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>Transaction Flow Network</Text>
        {config.transactionFlow.map((flow, index) => (
          <View key={index} style={[styles.flowItem, { backgroundColor: '#0A0F14', borderColor: getStatusColor(flow.status) }]}>
            <View style={[styles.flowIcon, { backgroundColor: getStatusColor(flow.status) + '20' }]}>
              <Globe size={16} color={getStatusColor(flow.status)} />
            </View>
            <View style={styles.flowContent}>
              <Text style={[styles.flowRoute, { color: '#FFFFFF' }]}>
                {flow.source} <ArrowRight size={12} color="#6B7280" /> {flow.destination}
              </Text>
              <Text style={[styles.flowVolume, { color: '#9CA3AF' }]}>
                Volume: {flow.volume}
              </Text>
            </View>
            <View style={[styles.statusBadge, { backgroundColor: getStatusColor(flow.status) + '20', borderColor: getStatusColor(flow.status) }]}>
              <Text style={[styles.statusText, { color: getStatusColor(flow.status) }]}>{flow.status}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 12,
    marginTop: 16,
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
  paymentBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    gap: 6,
  },
  paymentBadgeText: {
    color: '#3B82F6',
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
  metricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
  },
  metricItem: {
    alignItems: 'center',
  },
  metricIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  metricLabel: {
    fontSize: 11,
    marginTop: 4,
    marginBottom: 2,
  },
  metricValue: {
    fontSize: 18,
    fontWeight: '700',
  },
  section: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
  },
  metricRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
    gap: 8,
  },
  settlementLabel: {
    fontSize: 12,
  },
  settlementValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  flowItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
  },
  flowIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  flowContent: {
    flex: 1,
  },
  flowRoute: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 2,
  },
  flowVolume: {
    fontSize: 11,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    borderWidth: 1,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
  },
});
