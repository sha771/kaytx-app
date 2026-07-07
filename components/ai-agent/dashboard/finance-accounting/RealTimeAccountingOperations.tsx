import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Activity, Clock, DollarSign, FileText, CheckCircle, AlertTriangle, Zap, Calendar } from 'lucide-react-native';

interface AccountingOperation {
  id: string;
  type: 'invoice' | 'payment' | 'journal' | 'budget' | 'forecast' | 'audit' | 'reconciliation';
  title: string;
  description: string;
  amount?: string;
  timestamp: string;
  status: 'completed' | 'pending' | 'processing';
  agent?: string;
}

interface RealTimeAccountingOperationsProps {
  operations: AccountingOperation[];
}

export default function RealTimeAccountingOperations({ operations }: RealTimeAccountingOperationsProps) {
  const { theme } = useTheme();

  const getOperationIcon = (type: string) => {
    switch (type) {
      case 'invoice':
        return <FileText size={16} color="#3B82F6" />;
      case 'payment':
        return <DollarSign size={16} color="#10B981" />;
      case 'journal':
        return <FileText size={16} color="#8B5CF6" />;
      case 'budget':
        return <Calendar size={16} color="#F59E0B" />;
      case 'forecast':
        return <Activity size={16} color="#06B6D4" />;
      case 'audit':
        return <AlertTriangle size={16} color="#EF4444" />;
      case 'reconciliation':
        return <CheckCircle size={16} color="#10B981" />;
      default:
        return <Activity size={16} color="#6B7280" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return '#10B981';
      case 'pending':
        return '#F59E0B';
      case 'processing':
        return '#3B82F6';
      default:
        return '#6B7280';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle size={12} color="#10B981" />;
      case 'pending':
        return <Clock size={12} color="#F59E0B" />;
      case 'processing':
        return <Zap size={12} color="#3B82F6" />;
      default:
        return <Activity size={12} color="#6B7280" />;
    }
  };

  const getOperationColor = (type: string) => {
    switch (type) {
      case 'invoice':
        return '#3B82F6';
      case 'payment':
        return '#10B981';
      case 'journal':
        return '#8B5CF6';
      case 'budget':
        return '#F59E0B';
      case 'forecast':
        return '#06B6D4';
      case 'audit':
        return '#EF4444';
      case 'reconciliation':
        return '#10B981';
      default:
        return '#6B7280';
    }
  };

  const formatTimeAgo = (timestamp: string) => {
    // Simple implementation - in production, use proper date formatting
    return timestamp;
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <View style={styles.header}>
        <Activity size={20} color={theme.colors.primary} />
        <Text style={[styles.title, { color: theme.colors.text }]}>
          Real-Time Accounting Operations
        </Text>
        <View style={[styles.liveIndicator, { backgroundColor: '#10B981' + '20' }]}>
          <View style={[styles.liveDot, { backgroundColor: '#10B981' }]} />
          <Text style={[styles.liveText, { color: '#10B981' }]}>
            LIVE
          </Text>
        </View>
      </View>

      <View style={styles.statsSection}>
        <View style={styles.statCard}>
          <CheckCircle size={14} color="#10B981" />
          <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>
            Completed
          </Text>
          <Text style={[styles.statValue, { color: '#10B981' }]}>
            {operations.filter(o => o.status === 'completed').length}
          </Text>
        </View>

        <View style={styles.statCard}>
          <Zap size={14} color="#3B82F6" />
          <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>
            Processing
          </Text>
          <Text style={[styles.statValue, { color: '#3B82F6' }]}>
            {operations.filter(o => o.status === 'processing').length}
          </Text>
        </View>

        <View style={styles.statCard}>
          <Clock size={14} color="#F59E0B" />
          <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>
            Pending
          </Text>
          <Text style={[styles.statValue, { color: '#F59E0B' }]}>
            {operations.filter(o => o.status === 'pending').length}
          </Text>
        </View>
      </View>

      <ScrollView style={styles.operationsList} showsVerticalScrollIndicator={false}>
        {operations.map((operation) => (
          <View 
            key={operation.id} 
            style={[
              styles.operationCard, 
              { borderLeftColor: getOperationColor(operation.type) }
            ]}
          >
            <View style={styles.operationHeader}>
              <View style={[styles.operationIcon, { backgroundColor: getOperationColor(operation.type) + '20' }]}>
                {getOperationIcon(operation.type)}
              </View>
              <View style={styles.operationHeaderContent}>
                <Text style={[styles.operationTitle, { color: theme.colors.text }]}>
                  {operation.title}
                </Text>
                <View style={styles.operationMeta}>
                  <Clock size={10} color="#6B7280" />
                  <Text style={[styles.operationTime, { color: theme.colors.textSecondary }]}>
                    {formatTimeAgo(operation.timestamp)}
                  </Text>
                  {operation.agent && (
                    <>
                      <Text style={[styles.operationSeparator, { color: theme.colors.textSecondary }]}>
                        •
                      </Text>
                      <Text style={[styles.operationAgent, { color: theme.colors.textSecondary }]}>
                        {operation.agent}
                      </Text>
                    </>
                  )}
                </View>
              </View>
              <View style={styles.statusSection}>
                {getStatusIcon(operation.status)}
              </View>
            </View>

            <Text style={[styles.operationDescription, { color: theme.colors.textSecondary }]}>
              {operation.description}
            </Text>

            {operation.amount && (
              <View style={styles.amountSection}>
                <DollarSign size={12} color="#10B981" />
                <Text style={[styles.amountValue, { color: '#10B981' }]}>
                  {operation.amount}
                </Text>
              </View>
            )}

            <View style={[styles.statusBadge, { backgroundColor: getStatusColor(operation.status) + '20' }]}>
              <Text style={[styles.statusText, { color: getStatusColor(operation.status) }]}>
                {operation.status.charAt(0).toUpperCase() + operation.status.slice(1)}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
    maxHeight: 500,
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
    flex: 1,
  },
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 8,
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
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    borderRadius: 12,
    padding: 12,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 10,
    fontWeight: '500',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
  },
  operationsList: {
    flex: 1,
  },
  operationCard: {
    padding: 12,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: 12,
    borderLeftWidth: 3,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  operationHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 8,
  },
  operationIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  operationHeaderContent: {
    flex: 1,
  },
  operationTitle: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 4,
  },
  operationMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  operationTime: {
    fontSize: 11,
  },
  operationSeparator: {
    fontSize: 10,
  },
  operationAgent: {
    fontSize: 11,
  },
  statusSection: {
    padding: 4,
  },
  operationDescription: {
    fontSize: 12,
    lineHeight: 16,
    marginBottom: 8,
  },
  amountSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 8,
  },
  amountValue: {
    fontSize: 14,
    fontWeight: '700',
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
  }
});