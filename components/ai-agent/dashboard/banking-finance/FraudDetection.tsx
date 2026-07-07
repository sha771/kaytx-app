import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Shield, AlertTriangle, Activity, Fingerprint, Eye, Lock } from 'lucide-react-native';
import { FraudDetectionConfig } from '../types';

interface FraudDetectionProps {
  config: FraudDetectionConfig;
}

export default function FraudDetection({ config }: FraudDetectionProps) {
  const { theme } = useTheme();

  const getSeverityColor = (severity: 'low' | 'medium' | 'high') => {
    switch (severity) {
      case 'high': return '#EF4444';
      case 'medium': return '#F59E0B';
      case 'low': return '#3B82F6';
    }
  };

  const getRiskColor = (risk: 'low' | 'medium' | 'high') => {
    switch (risk) {
      case 'high': return '#EF4444';
      case 'medium': return '#F59E0B';
      case 'low': return '#10B981';
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: '#05070A' }]}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={[styles.fraudBadge, { backgroundColor: '#EF444420', borderColor: '#EF4444' }]}>
            <Shield size={16} color="#EF4444" />
            <Text style={styles.fraudBadgeText}>FRAUD DEFENSE</Text>
          </View>
          <Text style={[styles.title, { color: '#FFFFFF' }]}>
            Transaction Security
          </Text>
        </View>
        <View style={[styles.liveIndicator, { backgroundColor: '#10B98120', borderColor: '#10B981' }]}>
          <Eye size={12} color="#10B981" />
          <Text style={styles.liveText}>MONITORING</Text>
        </View>
      </View>
      
      <View style={[styles.metricsRow, { backgroundColor: '#0A0F14', borderColor: '#1F2937' }]}>
        <View style={styles.metricItem}>
          <View style={[styles.metricIcon, { backgroundColor: '#F59E0B20' }]}>
            <AlertTriangle size={20} color="#F59E0B" />
          </View>
          <Text style={[styles.metricLabel, { color: '#9CA3AF' }]}>Suspicious</Text>
          <Text style={[styles.metricValue, { color: '#FFFFFF' }]}>{config.suspiciousTransactions}</Text>
        </View>
        <View style={styles.metricItem}>
          <View style={[styles.metricIcon, { backgroundColor: '#EF444420' }]}>
            <Shield size={20} color="#EF4444" />
          </View>
          <Text style={[styles.metricLabel, { color: '#9CA3AF' }]}>AML Flags</Text>
          <Text style={[styles.metricValue, { color: '#EF4444' }]}>{config.amlFlags}</Text>
        </View>
        <View style={styles.metricItem}>
          <View style={[styles.metricIcon, { backgroundColor: '#10B98120' }]}>
            <Fingerprint size={20} color="#10B981" />
          </View>
          <Text style={[styles.metricLabel, { color: '#9CA3AF' }]}>Verification</Text>
          <Text style={[styles.metricValue, { color: '#10B981' }]}>{config.identityVerificationRate}%</Text>
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: '#0A0F14', borderColor: '#1F2937' }]}>
        <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>Fraud Network Analysis</Text>
        {config.fraudNetwork.map((node, index) => (
          <View key={node.id} style={[styles.networkNode, { backgroundColor: '#0A0F14', borderColor: getRiskColor(node.riskLevel) }]}>
            <View style={[styles.nodeIndicator, { backgroundColor: getRiskColor(node.riskLevel) }]} />
            <View style={styles.nodeContent}>
              <Text style={[styles.nodeEntity, { color: '#FFFFFF' }]}>{node.entity}</Text>
              <Text style={[styles.nodeConnections, { color: '#9CA3AF' }]}>
                {node.connections} connections
              </Text>
            </View>
            <View style={[styles.riskBadge, { backgroundColor: getRiskColor(node.riskLevel) + '20', borderColor: getRiskColor(node.riskLevel) }]}>
              <Text style={[styles.riskText, { color: getRiskColor(node.riskLevel) }]}>{node.riskLevel}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: '#0A0F14', borderColor: '#1F2937' }]}>
        <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>Real-Time Anomaly Detection</Text>
        {config.anomalyDetection.map((anomaly, index) => (
          <View key={anomaly.id} style={[styles.anomalyCard, { backgroundColor: '#0A0F14', borderColor: getSeverityColor(anomaly.severity) }]}>
            <View style={[styles.anomalyIcon, { backgroundColor: getSeverityColor(anomaly.severity) + '20' }]}>
              <Activity size={16} color={getSeverityColor(anomaly.severity)} />
            </View>
            <View style={styles.anomalyContent}>
              <Text style={[styles.anomalyType, { color: '#FFFFFF' }]}>{anomaly.type}</Text>
              <Text style={[styles.anomalyTimestamp, { color: '#9CA3AF' }]}>{anomaly.timestamp}</Text>
            </View>
            <View style={[styles.severityBadge, { backgroundColor: getSeverityColor(anomaly.severity) + '20', borderColor: getSeverityColor(anomaly.severity) }]}>
              <Text style={[styles.severityText, { color: getSeverityColor(anomaly.severity) }]}>{anomaly.severity}</Text>
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
  fraudBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    gap: 6,
  },
  fraudBadgeText: {
    color: '#EF4444',
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
  networkNode: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
  },
  nodeIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 12,
  },
  nodeContent: {
    flex: 1,
  },
  nodeEntity: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 2,
  },
  nodeConnections: {
    fontSize: 11,
  },
  riskBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    borderWidth: 1,
  },
  riskText: {
    fontSize: 10,
    fontWeight: '600',
  },
  anomalyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
  },
  anomalyIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  anomalyContent: {
    flex: 1,
  },
  anomalyType: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 2,
  },
  anomalyTimestamp: {
    fontSize: 11,
  },
  severityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    borderWidth: 1,
  },
  severityText: {
    fontSize: 10,
    fontWeight: '600',
  },
});
