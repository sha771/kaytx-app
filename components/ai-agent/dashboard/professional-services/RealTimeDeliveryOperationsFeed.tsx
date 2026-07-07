import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { CheckCircle, AlertTriangle, Zap, Clock, Briefcase, FileText, Building, Shield, DollarSign } from 'lucide-react-native';
import { RealTimeDeliveryOperationsFeedConfig } from '../types';

interface RealTimeDeliveryOperationsFeedProps extends RealTimeDeliveryOperationsFeedConfig {}

export default function RealTimeDeliveryOperationsFeed({ operations }: RealTimeDeliveryOperationsFeedProps) {
  const { theme } = useTheme();

  const getOperationIcon = (event: string) => {
    if (event.includes('milestone') || event.includes('completed')) return CheckCircle;
    if (event.includes('approval')) return CheckCircle;
    if (event.includes('resource')) return Briefcase;
    if (event.includes('risk')) return AlertTriangle;
    if (event.includes('proposal')) return FileText;
    if (event.includes('invoice')) return DollarSign;
    if (event.includes('escalated')) return AlertTriangle;
    return Zap;
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return '#EF4444';
      case 'medium': return '#F59E0B';
      case 'low': return '#10B981';
      default: return '#6B7280';
    }
  };

  const getImpactBgColor = (impact: string) => {
    switch (impact) {
      case 'high': return '#EF4444' + '20';
      case 'medium': return '#F59E0B' + '20';
      case 'low': return '#10B981' + '20';
      default: return '#6B7280' + '20';
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: 'rgba(16, 185, 129, 0.05)', borderColor: 'rgba(16, 185, 129, 0.2)', borderWidth: 1 }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: '#10B981' }]}>
          Real-Time Delivery Operations Feed
        </Text>
        <View style={[styles.liveIndicator, { backgroundColor: '#EF4444' + '20' }]}>
          <View style={[styles.liveDot, { backgroundColor: '#EF4444' }]} />
          <Text style={[styles.liveText, { color: '#EF4444' }]}>LIVE</Text>
        </View>
      </View>

      <ScrollView style={styles.operationsScroll} showsVerticalScrollIndicator={false}>
        {operations.map((operation, index) => {
          const Icon = getOperationIcon(operation.event);
          const impactColor = getImpactColor(operation.impact);
          const impactBgColor = getImpactBgColor(operation.impact);

          return (
            <View key={index} style={[styles.operationItem, { backgroundColor: 'rgba(11, 15, 20, 0.6)', borderBottomColor: 'rgba(255, 255, 255, 0.1)', borderBottomWidth: 1 }]}>
              <View style={[styles.operationIcon, { backgroundColor: impactBgColor }]}>
                <Icon size={16} color={impactColor} />
              </View>
              
              <View style={styles.operationContent}>
                <Text style={[styles.operationEvent, { color: '#FFFFFF' }]}>{operation.event}</Text>
                <View style={styles.operationMeta}>
                  <Briefcase size={12} color="rgba(255, 255, 255, 0.4)" />
                  <Text style={[styles.operationProject, { color: 'rgba(255, 255, 255, 0.5)' }]}>{operation.project}</Text>
                </View>
              </View>

              <View style={styles.operationRight}>
                <View style={[styles.impactBadge, { backgroundColor: impactBgColor }]}>
                  <Text style={[styles.impactText, { color: impactColor }]}>{operation.impact}</Text>
                </View>
                <View style={styles.timeContainer}>
                  <Clock size={12} color="rgba(255, 255, 255, 0.4)" />
                  <Text style={[styles.operationTime, { color: 'rgba(255, 255, 255, 0.4)' }]}>{operation.time}</Text>
                </View>
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
    borderRadius: 16,
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
  },
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 4,
  },
  liveText: {
    fontSize: 10,
    fontWeight: '700',
  },
  operationsScroll: {
    maxHeight: 300,
  },
  operationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    gap: 12,
  },
  operationIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  operationContent: {
    flex: 1,
  },
  operationEvent: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  operationMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  operationProject: {
    fontSize: 12,
  },
  operationRight: {
    alignItems: 'flex-end',
    gap: 4,
  },
  impactBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  impactText: {
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  operationTime: {
    fontSize: 11,
  },
});
