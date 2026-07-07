import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Activity, Clock, CheckCircle, AlertTriangle, Truck, Package, Factory, ShoppingCart, MapPin, Zap } from 'lucide-react-native';

interface OperationEvent {
  id: string;
  type: 'shipment' | 'inventory' | 'order' | 'factory' | 'risk' | 'logistics' | 'demand' | 'supplier';
  severity: 'info' | 'success' | 'warning' | 'critical';
  title: string;
  description: string;
  location?: string;
  timestamp: string;
  impact?: string;
}

export default function RealTimeOperationsFeed() {
  const { theme } = useTheme();
  const [events, setEvents] = useState<OperationEvent[]>([
    {
      id: '1',
      type: 'supplier',
      severity: 'warning',
      title: 'Supplier Shipment Delayed',
      description: 'Global Components Inc shipment delayed by 2 days due to port congestion',
      location: 'Shanghai, CN',
      timestamp: '2 minutes ago',
      impact: '12 containers affected'
    },
    {
      id: '2',
      type: 'inventory',
      severity: 'success',
      title: 'Inventory Replenished',
      description: 'DC #2 inventory replenished with 4,200 units of electronics category',
      location: 'Europe DC #2',
      timestamp: '5 minutes ago',
      impact: 'Stockout risk reduced by 18%'
    },
    {
      id: '3',
      type: 'order',
      severity: 'success',
      title: 'Order Fulfilled',
      description: 'Bulk order #ORD-28472 fulfilled and shipped to retail partner',
      location: 'North America',
      timestamp: '8 minutes ago',
      impact: '2,400 units delivered'
    },
    {
      id: '4',
      type: 'factory',
      severity: 'info',
      title: 'Factory Output Updated',
      description: 'Production Line A output increased by 12% after optimization',
      location: 'Factory #1',
      timestamp: '12 minutes ago',
      impact: '+1,200 units/day'
    },
    {
      id: '5',
      type: 'risk',
      severity: 'warning',
      title: 'Risk Detected',
      description: 'Weather disruption risk identified for Gulf Coast shipments',
      location: 'Gulf Coast, US',
      timestamp: '15 minutes ago',
      impact: '48 shipments potentially affected'
    },
    {
      id: '6',
      type: 'logistics',
      severity: 'success',
      title: 'Logistics Route Optimized',
      description: 'AI route optimization reduced delivery time by 18% for corridor A',
      location: 'North America',
      timestamp: '18 minutes ago',
      impact: 'Cost savings: $4,200'
    },
    {
      id: '7',
      type: 'demand',
      severity: 'info',
      title: 'Demand Forecast Updated',
      description: 'Q4 demand forecast updated with 8% increase in electronics',
      location: 'Global',
      timestamp: '22 minutes ago',
      impact: 'Inventory adjusted accordingly'
    },
    {
      id: '8',
      type: 'supplier',
      severity: 'critical',
      title: 'Supplier Risk Alert',
      description: 'Pacific Trade Partners showing payment delay pattern',
      location: 'Asia Pacific',
      timestamp: '25 minutes ago',
      impact: 'Contract under review'
    },
  ]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'shipment': return <Truck size={14} color="#3B82F6" />;
      case 'inventory': return <Package size={14} color="#10B981" />;
      case 'order': return <ShoppingCart size={14} color="#8B5CF6" />;
      case 'factory': return <Factory size={14} color="#06B6D4" />;
      case 'risk': return <AlertTriangle size={14} color="#EF4444" />;
      case 'logistics': return <Truck size={14} color="#F59E0B" />;
      case 'demand': return <Activity size={14} color="#EC4899" />;
      case 'supplier': return <ShoppingCart size={14} color="#6B7280" />;
      default: return <Activity size={14} color="#6B7280" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'info': return '#3B82F6';
      case 'success': return '#10B981';
      case 'warning': return '#F59E0B';
      case 'critical': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const getSeverityBackground = (severity: string) => {
    const color = getSeverityColor(severity);
    return color + '15';
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'info': return <Activity size={12} color="#3B82F6" />;
      case 'success': return <CheckCircle size={12} color="#10B981" />;
      case 'warning': return <AlertTriangle size={12} color="#F59E0B" />;
      case 'critical': return <AlertTriangle size={12} color="#EF4444" />;
      default: return <Activity size={12} color="#6B7280" />;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <View style={styles.header}>
        <Activity size={20} color="#06B6D4" />
        <Text style={[styles.title, { color: theme.colors.text }]}>
          Real-Time Operations Feed
        </Text>
        <View style={styles.liveIndicator}>
          <View style={styles.liveDot} />
          <Text style={[styles.liveText, { color: '#10B981' }]}>
            LIVE
          </Text>
        </View>
      </View>

      <ScrollView 
        style={styles.feedScroll}
        contentContainerStyle={styles.feedContent}
        showsVerticalScrollIndicator={false}
      >
        {events.map((event, index) => (
          <View 
            key={event.id}
            style={[
              styles.eventCard, 
              { 
                backgroundColor: getSeverityBackground(event.severity),
                borderColor: `${getSeverityColor(event.severity)}30`,
                borderWidth: 1
              }
            ]}
          >
            <View style={styles.eventHeader}>
              <View style={styles.eventIconContainer}>
                {getTypeIcon(event.type)}
              </View>
              <View style={styles.eventMeta}>
                <Text style={[styles.eventTitle, { color: theme.colors.text }]}>
                  {event.title}
                </Text>
                <View style={styles.eventMetaRow}>
                  <View style={[
                    styles.severityBadge, 
                    { backgroundColor: getSeverityColor(event.severity) + '20' }
                  ]}>
                    {getSeverityIcon(event.severity)}
                    <Text style={[
                      styles.severityText, 
                      { color: getSeverityColor(event.severity) }
                    ]}>
                      {event.severity.toUpperCase()}
                    </Text>
                  </View>
                  <View style={styles.timestampContainer}>
                    <Clock size={10} color="#6B7280" />
                    <Text style={[styles.timestampText, { color: theme.colors.textSecondary }]}>
                      {event.timestamp}
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            <Text style={[styles.eventDescription, { color: theme.colors.textSecondary }]}>
              {event.description}
            </Text>

            <View style={styles.eventFooter}>
              {event.location && (
                <View style={styles.locationContainer}>
                  <MapPin size={12} color="#6B7280" />
                  <Text style={[styles.locationText, { color: theme.colors.textSecondary }]}>
                    {event.location}
                  </Text>
                </View>
              )}
              {event.impact && (
                <View style={styles.impactContainer}>
                  <Zap size={12} color="#F59E0B" />
                  <Text style={[styles.impactText, { color: '#F59E0B' }]}>
                    {event.impact}
                  </Text>
                </View>
              )}
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
    maxHeight: 400,
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
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    borderRadius: 12,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10B981',
  },
  liveText: {
    fontSize: 10,
    fontWeight: '600',
  },
  feedScroll: {
    flex: 1,
  },
  feedContent: {
    paddingBottom: 8,
  },
  eventCard: {
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  eventHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 8,
  },
  eventIconContainer: {
    width: 28,
    height: 28,
    borderRadius: 6,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  eventMeta: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 4,
  },
  eventMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
  },
  severityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  severityText: {
    fontSize: 9,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  timestampContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  timestampText: {
    fontSize: 10,
  },
  eventDescription: {
    fontSize: 12,
    lineHeight: 16,
    marginBottom: 8,
  },
  eventFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flexWrap: 'wrap',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locationText: {
    fontSize: 10,
  },
  impactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  impactText: {
    fontSize: 10,
    fontWeight: '500',
  },
});