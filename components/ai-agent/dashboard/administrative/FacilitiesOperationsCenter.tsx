import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Building2, Calendar, Wrench, Users, MapPin, AlertTriangle, CheckCircle, TrendingUp, Sparkles, ArrowUpRight, ArrowDownRight, DoorOpen, Car, Coffee, Wifi } from 'lucide-react-native';

interface FacilityMetrics {
  officeUtilization: number;
  roomReservations: number;
  maintenanceRequests: number;
  assetTracking: number;
  visitorManagement: number;
  spaceEfficiency: number;
  energyConsumption: string;
  cleaningSchedule: number;
}

interface FacilityArea {
  name: string;
  utilization: number;
  capacity: number;
  current: number;
  icon: string;
  color: string;
}

interface FacilitiesOperationsCenterProps {
  metrics: FacilityMetrics;
  areas: FacilityArea[];
}

export default function FacilitiesOperationsCenter({ metrics, areas }: FacilitiesOperationsCenterProps) {
  const { theme } = useTheme();

  const getUtilizationColor = (utilization: number) => {
    if (utilization >= 80) return '#10B981';
    if (utilization >= 60) return '#F59E0B';
    return '#EF4444';
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={[styles.headerIcon, { backgroundColor: '#8B5CF6' + '20' }]}>
            <Building2 size={24} color="#8B5CF6" />
          </View>
          <View style={styles.headerText}>
            <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
              Facilities & Office Operations
            </Text>
            <Text style={[styles.headerSubtitle, { color: theme.colors.textSecondary }]}>
              Real-time facility management
            </Text>
          </View>
        </View>
        <View style={[styles.efficiencyBadge, { backgroundColor: '#10B981' + '20' }]}>
          <Sparkles size={16} color="#10B981" />
          <Text style={[styles.efficiencyBadgeText, { color: '#10B981' }]}>
            {metrics.spaceEfficiency}% Efficient
          </Text>
        </View>
      </View>

      <View style={styles.metricsGrid}>
        <View style={[styles.metricCard, { backgroundColor: 'rgba(59, 130, 246, 0.1)', borderColor: '#3B82F6' + '30' }]}>
          <View style={[styles.metricIcon, { backgroundColor: '#3B82F6' + '20' }]}>
            <Building2 size={20} color="#3B82F6" />
          </View>
          <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
            Office Utilization
          </Text>
          <Text style={[styles.metricValue, { color: theme.colors.text }]}>
            {metrics.officeUtilization}%
          </Text>
          <View style={styles.metricTrend}>
            <ArrowUpRight size={12} color="#10B981" />
            <Text style={[styles.trendText, { color: '#10B981' }]}>
              +5.2%
            </Text>
          </View>
        </View>

        <View style={[styles.metricCard, { backgroundColor: 'rgba(16, 185, 129, 0.1)', borderColor: '#10B981' + '30' }]}>
          <View style={[styles.metricIcon, { backgroundColor: '#10B981' + '20' }]}>
            <Calendar size={20} color="#10B981" />
          </View>
          <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
            Room Reservations
          </Text>
          <Text style={[styles.metricValue, { color: theme.colors.text }]}>
            {metrics.roomReservations}
          </Text>
          <View style={styles.metricTrend}>
            <ArrowUpRight size={12} color="#10B981" />
            <Text style={[styles.trendText, { color: '#10B981' }]}>
              +12.8%
            </Text>
          </View>
        </View>

        <View style={[styles.metricCard, { backgroundColor: 'rgba(245, 158, 11, 0.1)', borderColor: '#F59E0B' + '30' }]}>
          <View style={[styles.metricIcon, { backgroundColor: '#F59E0B' + '20' }]}>
            <Wrench size={20} color="#F59E0B" />
          </View>
          <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
            Maintenance Requests
          </Text>
          <Text style={[styles.metricValue, { color: theme.colors.text }]}>
            {metrics.maintenanceRequests}
          </Text>
          <View style={styles.metricTrend}>
            <ArrowDownRight size={12} color="#10B981" />
            <Text style={[styles.trendText, { color: '#10B981' }]}>
              -8.4%
            </Text>
          </View>
        </View>

        <View style={[styles.metricCard, { backgroundColor: 'rgba(139, 92, 246, 0.1)', borderColor: '#8B5CF6' + '30' }]}>
          <View style={[styles.metricIcon, { backgroundColor: '#8B5CF6' + '20' }]}>
            <Users size={20} color="#8B5CF6" />
          </View>
          <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
            Visitors Today
          </Text>
          <Text style={[styles.metricValue, { color: theme.colors.text }]}>
            {metrics.visitorManagement}
          </Text>
          <View style={styles.metricTrend}>
            <ArrowUpRight size={12} color="#10B981" />
            <Text style={[styles.trendText, { color: '#10B981' }]}>
              +15.3%
            </Text>
          </View>
        </View>
      </View>

      <View style={[styles.areasSection, { backgroundColor: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.08)' }]}>
        <View style={styles.areasHeader}>
          <MapPin size={20} color="#8B5CF6" />
          <Text style={[styles.areasTitle, { color: theme.colors.text }]}>
            Facility Areas
          </Text>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.areasScroll}>
          {areas.map((area, index) => (
            <View key={index} style={[styles.areaCard, { borderColor: area.color + '30', borderWidth: 1 }]}>
              <View style={[styles.areaIcon, { backgroundColor: area.color + '20' }]}>
                <Text style={styles.areaEmoji}>{area.icon}</Text>
              </View>
              <Text style={[styles.areaName, { color: theme.colors.text }]}>
                {area.name}
              </Text>
              
              <View style={styles.areaMetric}>
                <Text style={[styles.areaMetricLabel, { color: theme.colors.textSecondary }]}>
                  Utilization
                </Text>
                <Text style={[styles.areaMetricValue, { color: getUtilizationColor(area.utilization) }]}>
                  {area.utilization}%
                </Text>
              </View>

              <View style={styles.areaMetric}>
                <Text style={[styles.areaMetricLabel, { color: theme.colors.textSecondary }]}>
                  Capacity
                </Text>
                <Text style={[styles.areaMetricValue, { color: theme.colors.text }]}>
                  {area.current}/{area.capacity}
                </Text>
              </View>

              <View style={[styles.areaProgress, { backgroundColor: 'rgba(255,255,255,0.08)' }]}>
                <View 
                  style={[
                    styles.areaProgressFill, 
                    { 
                      backgroundColor: getUtilizationColor(area.utilization),
                      width: `${area.utilization}%`
                    }
                  ]} 
                />
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

      <View style={styles.operationsSection}>
        <View style={styles.operationsHeader}>
          <TrendingUp size={20} color="#8B5CF6" />
          <Text style={[styles.operationsTitle, { color: theme.colors.text }]}>
            Operations Status
          </Text>
        </View>

        <View style={styles.operationsMetrics}>
          <View style={styles.operationMetric}>
            <View style={[styles.operationIcon, { backgroundColor: '#3B82F6' + '20' }]}>
              <Wifi size={16} color="#3B82F6" />
            </View>
            <View style={styles.operationInfo}>
              <Text style={[styles.operationLabel, { color: theme.colors.textSecondary }]}>
                Energy Consumption
              </Text>
              <Text style={[styles.operationValue, { color: theme.colors.text }]}>
                {metrics.energyConsumption}
              </Text>
            </View>
          </View>

          <View style={styles.operationMetric}>
            <View style={[styles.operationIcon, { backgroundColor: '#10B981' + '20' }]}>
              <CheckCircle size={16} color="#10B981" />
            </View>
            <View style={styles.operationInfo}>
              <Text style={[styles.operationLabel, { color: theme.colors.textSecondary }]}>
                Cleaning Schedule
              </Text>
              <Text style={[styles.operationValue, { color: theme.colors.text }]}>
                {metrics.cleaningSchedule}% Complete
              </Text>
            </View>
          </View>

          <View style={styles.operationMetric}>
            <View style={[styles.operationIcon, { backgroundColor: '#F59E0B' + '20' }]}>
              <Car size={16} color="#F59E0B" />
            </View>
            <View style={styles.operationInfo}>
              <Text style={[styles.operationLabel, { color: theme.colors.textSecondary }]}>
                Parking Availability
              </Text>
              <Text style={[styles.operationValue, { color: theme.colors.text }]}>
                142/200
              </Text>
            </View>
          </View>

          <View style={styles.operationMetric}>
            <View style={[styles.operationIcon, { backgroundColor: '#EF4444' + '20' }]}>
              <AlertTriangle size={16} color="#EF4444" />
            </View>
            <View style={styles.operationInfo}>
              <Text style={[styles.operationLabel, { color: theme.colors.textSecondary }]}>
                Active Alerts
              </Text>
              <Text style={[styles.operationValue, { color: theme.colors.text }]}>
                3
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View style={[styles.amenitiesSection, { backgroundColor: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.08)' }]}>
        <View style={styles.amenitiesHeader}>
          <Coffee size={20} color="#8B5CF6" />
          <Text style={[styles.amenitiesTitle, { color: theme.colors.text }]}>
            Amenities Status
          </Text>
        </View>
        <View style={styles.amenitiesGrid}>
          <View style={styles.amenityItem}>
            <DoorOpen size={14} color="#10B981" />
            <Text style={[styles.amenityText, { color: theme.colors.textSecondary }]}>
              All Access Points: Secure
            </Text>
          </View>
          <View style={styles.amenityItem}>
            <Wifi size={14} color="#10B981" />
            <Text style={[styles.amenityText, { color: theme.colors.textSecondary }]}>
              Network: 99.8% Uptime
            </Text>
          </View>
          <View style={styles.amenityItem}>
            <Coffee size={14} color="#10B981" />
            <Text style={[styles.amenityText, { color: theme.colors.textSecondary }]}>
              Kitchen: Fully Stocked
            </Text>
          </View>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  headerSubtitle: {
    fontSize: 12,
    marginTop: 2,
  },
  efficiencyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  efficiencyBadgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 16,
  },
  metricCard: {
    flex: 1,
    minWidth: 140,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
  },
  metricIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  metricLabel: {
    fontSize: 11,
    fontWeight: '500',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  metricValue: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
  },
  metricTrend: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  trendText: {
    fontSize: 12,
    fontWeight: '600',
  },
  areasSection: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    marginBottom: 16,
  },
  areasHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  areasTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  areasScroll: {
    gap: 12,
  },
  areaCard: {
    width: 160,
    borderRadius: 12,
    padding: 16,
    backgroundColor: 'rgba(255,255,255,0.02)',
  },
  areaIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  areaEmoji: {
    fontSize: 20,
  },
  areaName: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 12,
  },
  areaMetric: {
    marginBottom: 8,
  },
  areaMetricLabel: {
    fontSize: 10,
    marginBottom: 2,
  },
  areaMetricValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  areaProgress: {
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
    marginTop: 8,
  },
  areaProgressFill: {
    height: '100%',
    borderRadius: 2,
  },
  operationsSection: {
    marginBottom: 16,
  },
  operationsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  operationsTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  operationsMetrics: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  operationMetric: {
    flex: 1,
    minWidth: 120,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: 'rgba(255,255,255,0.02)',
    borderRadius: 8,
    padding: 12,
  },
  operationIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  operationInfo: {
    flex: 1,
  },
  operationLabel: {
    fontSize: 10,
    fontWeight: '500',
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  operationValue: {
    fontSize: 16,
    fontWeight: '700',
  },
  amenitiesSection: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
  },
  amenitiesHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  amenitiesTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  amenitiesGrid: {
    gap: 8,
  },
  amenityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  amenityText: {
    fontSize: 12,
  },
});
