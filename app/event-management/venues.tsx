import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { 
  MapPin, Building2, Users, CheckCircle, TrendingUp, ArrowRight,
  BarChart3, Activity, AlertTriangle, Wrench, Shield, Zap, Clock, Calendar
} from 'lucide-react-native';

export default function VenueOperationsCenter() {
  const router = useRouter();

  const VENUE_STATS = [
    { label: 'Venues Managed', value: '2,450', icon: Building2, color: '#06B6D4', trend: '+5%' },
    { label: 'Capacity Utilization', value: '87%', icon: Users, color: '#8B5CF6', trend: '+4%' },
    { label: 'Ready for Events', value: '2,180', icon: CheckCircle, color: '#10B981', trend: '+2%' },
    { label: 'Maintenance Alerts', value: '47', icon: AlertTriangle, color: '#F59E0B', trend: '-12%' },
  ];

  const VENUES = [
    {
      id: 1,
      name: 'Moscone Center',
      location: 'San Francisco, CA',
      capacity: 25000,
      currentOccupancy: 21400,
      status: 'active',
      eventsToday: 3,
      nextEvent: 'Tech Summit 2026',
      equipmentStatus: 'operational',
      readiness: 98,
      facilities: {
        seating: 'optimal',
        audio: 'operational',
        lighting: 'operational',
        hvac: 'operational',
        security: 'operational'
      }
    },
    {
      id: 2,
      name: 'Madison Square Garden',
      location: 'New York, NY',
      capacity: 20000,
      currentOccupancy: 0,
      status: 'preparing',
      eventsToday: 1,
      nextEvent: 'Global Music Festival',
      equipmentStatus: 'maintenance',
      readiness: 85,
      facilities: {
        seating: 'maintenance',
        audio: 'operational',
        lighting: 'operational',
        hvac: 'operational',
        security: 'operational'
      }
    },
    {
      id: 3,
      name: 'McCormick Place',
      location: 'Chicago, IL',
      capacity: 30000,
      currentOccupancy: 28500,
      status: 'active',
      eventsToday: 2,
      nextEvent: 'AI Innovation Conference',
      equipmentStatus: 'operational',
      readiness: 96,
      facilities: {
        seating: 'optimal',
        audio: 'operational',
        lighting: 'operational',
        hvac: 'operational',
        security: 'operational'
      }
    },
  ];

  const EQUIPMENT_STATUS = [
    { equipment: 'Audio Systems', operational: 2340, maintenance: 87, offline: 23, color: '#06B6D4' },
    { equipment: 'Lighting Systems', operational: 2410, maintenance: 32, offline: 8, color: '#8B5CF6' },
    { equipment: 'HVAC Systems', operational: 2380, maintenance: 58, offline: 12, color: '#10B981' },
    { equipment: 'Security Systems', operational: 2445, maintenance: 5, offline: 0, color: '#F59E0B' },
    { equipment: 'Seating Systems', operational: 2290, maintenance: 145, offline: 15, color: '#EC4899' },
  ];

  const FACILITY_READINESS = [
    { category: 'Seating', ready: 2290, total: 2450, color: '#06B6D4' },
    { category: 'Restrooms', ready: 2410, total: 2450, color: '#8B5CF6' },
    { category: 'Food Service', ready: 2340, total: 2450, color: '#10B981' },
    { category: 'Parking', ready: 2380, total: 2450, color: '#F59E0B' },
    { category: 'Accessibility', ready: 2445, total: 2450, color: '#EC4899' },
  ];

  const CAPACITY_DASHBOARD = [
    { venue: 'Moscone Center', capacity: 25000, occupied: 21400, available: 3600, utilization: 86, color: '#06B6D4' },
    { venue: 'Madison Square Garden', capacity: 20000, occupied: 0, available: 20000, utilization: 0, color: '#8B5CF6' },
    { venue: 'McCormick Place', capacity: 30000, occupied: 28500, available: 1500, utilization: 95, color: '#10B981' },
    { venue: 'O2 Arena', capacity: 20000, occupied: 18200, available: 1800, utilization: 91, color: '#F59E0B' },
    { venue: 'Sydney Opera House', capacity: 5700, occupied: 5200, available: 500, utilization: 91, color: '#EC4899' },
  ];

  const VENUE_MAP_ZONES = [
    { zone: 'Main Hall', capacity: 15000, occupied: 12800, status: 'operational', color: '#10B981' },
    { zone: 'Conference Rooms', capacity: 5000, occupied: 4200, status: 'operational', color: '#06B6D4' },
    { zone: 'Exhibition Area', capacity: 8000, occupied: 7200, status: 'operational', color: '#8B5CF6' },
    { zone: 'VIP Lounge', capacity: 1000, occupied: 850, status: 'operational', color: '#FFD700' },
    { zone: 'Food Court', capacity: 3000, occupied: 2800, status: 'busy', color: '#F59E0B' },
    { zone: 'Outdoor Space', capacity: 4000, occupied: 0, status: 'closed', color: '#6B7280' },
  ];

  const VENUE_ANALYTICS = [
    { metric: 'Avg Utilization', value: '87%', target: '90%', color: '#06B6D4' },
    { metric: 'Turnaround Time', value: '2.4h', target: '2h', color: '#F59E0B' },
    { metric: 'Maintenance Score', value: '94%', target: '95%', color: '#10B981' },
    { metric: 'Energy Efficiency', value: '89%', target: '85%', color: '#8B5CF6' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#10B981';
      case 'preparing': return '#F59E0B';
      case 'maintenance': return '#EF4444';
      case 'offline': return '#6B7280';
      default: return '#06B6D4';
    }
  };

  const getFacilityColor = (status: string) => {
    switch (status) {
      case 'optimal': return '#10B981';
      case 'operational': return '#06B6D4';
      case 'maintenance': return '#F59E0B';
      case 'offline': return '#EF4444';
      default: return '#6B7280';
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerIcon}>
          <MapPin size={48} color="#06B6D4" />
        </View>
        <View>
          <Text style={styles.headerTitle}>Venue Operations Center</Text>
          <Text style={styles.headerSubtitle}>Capacity & Facility Management</Text>
        </View>
      </View>

      {/* Venue Stats */}
      <View style={styles.statsContainer}>
        {VENUE_STATS.map((stat, index) => (
          <View key={index} style={[styles.statCard, { borderColor: stat.color + '40' }]}>
            <View style={[styles.statIcon, { backgroundColor: stat.color + '20' }]}>
              <stat.icon size={24} color={stat.color} />
            </View>
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
            <View style={[styles.trendBadge, { backgroundColor: stat.color + '20' }]}>
              <TrendingUp size={10} color={stat.color} />
              <Text style={[styles.trendText, { color: stat.color }]}>{stat.trend}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Equipment Status */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Equipment Status</Text>
        {EQUIPMENT_STATUS.map((eq, index) => (
          <View key={index} style={[styles.equipmentCard, { borderColor: eq.color + '40' }]}>
            <View style={styles.equipmentHeader}>
              <Text style={styles.equipmentName}>{eq.equipment}</Text>
              <View style={styles.equipmentStats}>
                <View style={styles.equipmentStat}>
                  <View style={[styles.statDot, { backgroundColor: '#10B981' }]} />
                  <Text style={styles.equipmentStatLabel}>{eq.operational} operational</Text>
                </View>
                <View style={styles.equipmentStat}>
                  <View style={[styles.statDot, { backgroundColor: '#F59E0B' }]} />
                  <Text style={styles.equipmentStatLabel}>{eq.maintenance} maintenance</Text>
                </View>
                <View style={styles.equipmentStat}>
                  <View style={[styles.statDot, { backgroundColor: '#EF4444' }]} />
                  <Text style={styles.equipmentStatLabel}>{eq.offline} offline</Text>
                </View>
              </View>
            </View>
            <View style={styles.equipmentBar}>
              <View 
                style={[
                  styles.equipmentFill, 
                  { 
                    width: `${(eq.operational / (eq.operational + eq.maintenance + eq.offline)) * 100}%`,
                    backgroundColor: '#10B981'
                  } 
                ]} 
              />
            </View>
          </View>
        ))}
      </View>

      {/* Capacity Dashboard */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Capacity Dashboard</Text>
        <Text style={styles.sectionDescription}>Real-time venue capacity and utilization</Text>
        {CAPACITY_DASHBOARD.map((venue, index) => (
          <View key={index} style={styles.capacityDashboardCard}>
            <View style={styles.capacityDashboardHeader}>
              <Text style={styles.capacityDashboardVenue}>{venue.venue}</Text>
              <View style={[styles.capacityDashboardUtilization, { backgroundColor: venue.color + '20' }]}>
                <Text style={[styles.capacityDashboardUtilizationText, { color: venue.color }]}>{venue.utilization}% utilized</Text>
              </View>
            </View>
            <View style={styles.capacityDashboardStats}>
              <View style={styles.capacityDashboardStat}>
                <Text style={styles.capacityDashboardStatLabel}>Capacity</Text>
                <Text style={styles.capacityDashboardStatValue}>{venue.capacity.toLocaleString()}</Text>
              </View>
              <View style={styles.capacityDashboardStat}>
                <Text style={styles.capacityDashboardStatLabel}>Occupied</Text>
                <Text style={[styles.capacityDashboardStatValue, { color: '#10B981' }]}>{venue.occupied.toLocaleString()}</Text>
              </View>
              <View style={styles.capacityDashboardStat}>
                <Text style={styles.capacityDashboardStatLabel}>Available</Text>
                <Text style={[styles.capacityDashboardStatValue, { color: '#06B6D4' }]}>{venue.available.toLocaleString()}</Text>
              </View>
            </View>
            <View style={styles.capacityDashboardBar}>
              <View 
                style={[
                  styles.capacityDashboardFill, 
                  { width: `${venue.utilization}%`, backgroundColor: venue.color }
                ]} 
              />
            </View>
          </View>
        ))}
      </View>

      {/* Venue Map */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Interactive Venue Map</Text>
        <Text style={styles.sectionDescription}>Zone-wise capacity and status</Text>
        <View style={styles.venueMapContainer}>
          <View style={styles.venueMapGrid}>
            {VENUE_MAP_ZONES.map((zone, index) => (
              <View key={index} style={[styles.venueMapZone, { borderColor: zone.color + '40' }]}>
                <View style={styles.venueMapZoneHeader}>
                  <Text style={styles.venueMapZoneName}>{zone.zone}</Text>
                  <View style={[styles.venueMapZoneStatus, { backgroundColor: zone.color + '20' }]}>
                    <CheckCircle size={10} color={zone.color} />
                    <Text style={[styles.venueMapZoneStatusText, { color: zone.color }]}>{zone.status}</Text>
                  </View>
                </View>
                <View style={styles.venueMapZoneCapacity}>
                  <Text style={styles.venueMapZoneOccupied}>{zone.occupied.toLocaleString()}</Text>
                  <Text style={styles.venueMapZoneTotal}>/ {zone.capacity.toLocaleString()}</Text>
                </View>
                <View style={styles.venueMapZoneBar}>
                  <View 
                    style={[
                      styles.venueMapZoneFill, 
                      { width: `${(zone.occupied / zone.capacity) * 100}%`, backgroundColor: zone.color }
                    ]} 
                  />
                </View>
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* Venue Analytics */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Venue Analytics</Text>
        <View style={styles.analyticsGrid}>
          {VENUE_ANALYTICS.map((metric, index) => (
            <View key={index} style={[styles.analyticsCard, { borderColor: metric.color + '40' }]}>
              <Text style={styles.analyticsValue}>{metric.value}</Text>
              <Text style={styles.analyticsMetric}>{metric.metric}</Text>
              <Text style={styles.analyticsTarget}>Target: {metric.target}</Text>
              <View style={[styles.analyticsIndicator, { backgroundColor: metric.color + '20' }]}>
                <TrendingUp size={10} color={metric.color} />
                <Text style={[styles.analyticsIndicatorText, { color: metric.color }]}>
                  {parseFloat(metric.value) >= parseFloat(metric.target.replace('h', '')) ? 'On Track' : 'Needs Attention'}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Facility Readiness */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Facility Readiness</Text>
        {FACILITY_READINESS.map((facility, index) => (
          <View key={index} style={styles.facilityCard}>
            <View style={styles.facilityHeader}>
              <Text style={styles.facilityName}>{facility.category}</Text>
              <Text style={styles.facilityStatus}>{facility.ready} / {facility.total} ready</Text>
            </View>
            <View style={styles.facilityBar}>
              <View 
                style={[
                  styles.facilityFill, 
                  { 
                    width: `${(facility.ready / facility.total) * 100}%`,
                    backgroundColor: facility.color
                  } 
                ]} 
              />
            </View>
            <Text style={styles.facilityPercent}>
              {Math.round((facility.ready / facility.total) * 100)}% ready
            </Text>
          </View>
        ))}
      </View>

      {/* Venues List */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Active Venues</Text>
        {VENUES.map((venue) => (
          <View key={venue.id} style={[styles.venueCard, { borderColor: getStatusColor(venue.status) + '40' }]}>
            {/* Venue Header */}
            <View style={styles.venueHeader}>
              <View style={styles.venueHeaderLeft}>
                <Text style={styles.venueName}>{venue.name}</Text>
                <Text style={styles.venueLocation}>{venue.location}</Text>
              </View>
              <View style={[styles.venueStatus, { backgroundColor: getStatusColor(venue.status) + '20' }]}>
                <Activity size={14} color={getStatusColor(venue.status)} />
                <Text style={[styles.venueStatusText, { color: getStatusColor(venue.status) }]}>{venue.status}</Text>
              </View>
            </View>

            {/* Capacity */}
            <View style={styles.capacitySection}>
              <View style={styles.capacityHeader}>
                <View style={styles.capacityItem}>
                  <Users size={16} color="#06B6D4" />
                  <View>
                    <Text style={styles.capacityLabel}>Capacity</Text>
                    <Text style={styles.capacityValue}>{venue.capacity.toLocaleString()}</Text>
                  </View>
                </View>
                <View style={styles.capacityItem}>
                  <Activity size={16} color="#8B5CF6" />
                  <View>
                    <Text style={styles.capacityLabel}>Occupancy</Text>
                    <Text style={styles.capacityValue}>{venue.currentOccupancy.toLocaleString()}</Text>
                  </View>
                </View>
              </View>
              <View style={styles.capacityBar}>
                <View 
                  style={[
                    styles.capacityFill, 
                    { 
                      width: `${(venue.currentOccupancy / venue.capacity) * 100}%`,
                      backgroundColor: getStatusColor(venue.status)
                    } 
                  ]} 
                />
              </View>
              <Text style={styles.capacityPercent}>
                {Math.round((venue.currentOccupancy / venue.capacity) * 100)}% occupied
              </Text>
            </View>

            {/* Facilities */}
            <View style={styles.facilitiesSection}>
              <Text style={styles.facilitiesTitle}>Facilities Status</Text>
              <View style={styles.facilitiesGrid}>
                {Object.entries(venue.facilities).map(([key, value]) => (
                  <View key={key} style={styles.facilityItem}>
                    <View style={[styles.facilityDot, { backgroundColor: getFacilityColor(value) }]} />
                    <Text style={styles.facilityItemLabel}>{key.charAt(0).toUpperCase() + key.slice(1)}</Text>
                  </View>
                ))}
              </View>
            </View>

            {/* Event Info */}
            <View style={styles.eventInfoSection}>
              <View style={styles.eventInfoItem}>
                <Calendar size={16} color="#9CA3AF" />
                <View>
                  <Text style={styles.eventInfoLabel}>Events Today</Text>
                  <Text style={styles.eventInfoValue}>{venue.eventsToday}</Text>
                </View>
              </View>
              <View style={styles.eventInfoItem}>
                <Clock size={16} color="#9CA3AF" />
                <View>
                  <Text style={styles.eventInfoLabel}>Next Event</Text>
                  <Text style={styles.eventInfoValue}>{venue.nextEvent}</Text>
                </View>
              </View>
            </View>

            {/* Readiness */}
            <View style={styles.readinessSection}>
              <View style={styles.readinessHeader}>
                <Shield size={20} color="#10B981" />
                <Text style={styles.readinessLabel}>Overall Readiness</Text>
              </View>
              <View style={styles.readinessBar}>
                <View 
                  style={[
                    styles.readinessFill, 
                    { 
                      width: `${venue.readiness}%`,
                      backgroundColor: venue.readiness >= 95 ? '#10B981' : venue.readiness >= 85 ? '#F59E0B' : '#EF4444'
                    } 
                  ]} 
                />
              </View>
              <Text style={styles.readinessValue}>{venue.readiness}% ready</Text>
            </View>

            <TouchableOpacity
              style={[styles.venueButton, { backgroundColor: '#06B6D4' }]}
              onPress={() => router.push('/event-management/dashboard')}
            >
              <Text style={styles.venueButtonText}>View Venue Details</Text>
              <ArrowRight size={20} color="white" />
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {/* Quick Actions */}
      <View style={styles.actionsSection}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: '#06B6D415', borderColor: '#06B6D440' }]}
          >
            <Building2 size={24} color="#06B6D4" />
            <Text style={[styles.actionText, { color: '#06B6D4' }]}>Add Venue</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: '#8B5CF615', borderColor: '#8B5CF640' }]}
          >
            <Wrench size={24} color="#8B5CF6" />
            <Text style={[styles.actionText, { color: '#8B5CF6' }]}>Maintenance</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: '#10B98115', borderColor: '#10B98140' }]}
          >
            <BarChart3 size={24} color="#10B981" />
            <Text style={[styles.actionText, { color: '#10B981' }]}>Analytics</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: '#F59E0B15', borderColor: '#F59E0B40' }]}
          >
            <Zap size={24} color="#F59E0B" />
            <Text style={[styles.actionText, { color: '#F59E0B' }]}>Optimize</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#03050A',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#06B6D440',
    gap: 16,
  },
  headerIcon: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#06B6D420',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    gap: 12,
  },
  statCard: {
    flex: 1,
    minWidth: 140,
    backgroundColor: '#0A0F1A',
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    gap: 8,
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  statLabel: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
  },
  trendBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  trendText: {
    fontSize: 10,
    fontWeight: '600',
  },
  section: {
    padding: 16,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  equipmentCard: {
    backgroundColor: '#0A0F1A',
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  equipmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  equipmentName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  equipmentStats: {
    flexDirection: 'row',
    gap: 16,
  },
  equipmentStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  equipmentStatLabel: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  equipmentBar: {
    height: 6,
    backgroundColor: '#1F2937',
    borderRadius: 3,
    overflow: 'hidden',
  },
  equipmentFill: {
    height: '100%',
    borderRadius: 3,
  },
  facilityCard: {
    backgroundColor: '#0A0F1A',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  facilityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  facilityName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  facilityStatus: {
    fontSize: 13,
    color: '#9CA3AF',
  },
  facilityBar: {
    height: 6,
    backgroundColor: '#1F2937',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 6,
  },
  facilityFill: {
    height: '100%',
    borderRadius: 3,
  },
  facilityPercent: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  venueCard: {
    backgroundColor: '#0A0F1A',
    borderWidth: 1,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  venueHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  venueHeaderLeft: {
    flex: 1,
  },
  venueName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  venueLocation: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  venueStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    gap: 6,
  },
  venueStatusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  capacitySection: {
    marginBottom: 16,
  },
  capacityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 12,
  },
  capacityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  capacityLabel: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  capacityValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  capacityBar: {
    height: 8,
    backgroundColor: '#1F2937',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 6,
  },
  capacityFill: {
    height: '100%',
    borderRadius: 4,
  },
  capacityPercent: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  facilitiesSection: {
    marginBottom: 16,
  },
  facilitiesTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  facilitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  facilityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  facilityDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  facilityItemLabel: {
    fontSize: 13,
    color: '#E5E7EB',
  },
  eventInfoSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#1F2937',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  eventInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  eventInfoLabel: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  eventInfoValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  readinessSection: {
    marginBottom: 16,
  },
  readinessHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  readinessLabel: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  readinessBar: {
    height: 8,
    backgroundColor: '#1F2937',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 6,
  },
  readinessFill: {
    height: '100%',
    borderRadius: 4,
  },
  readinessValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  venueButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 14,
    borderRadius: 12,
    gap: 12,
  },
  venueButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  actionsSection: {
    padding: 16,
    marginTop: 8,
    marginBottom: 24,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    minWidth: 140,
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    gap: 8,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
  },
  capacityDashboardCard: {
    backgroundColor: '#0A0F1A',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  capacityDashboardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  capacityDashboardVenue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  capacityDashboardUtilization: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  capacityDashboardUtilizationText: {
    fontSize: 11,
    fontWeight: '600',
  },
  capacityDashboardStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 12,
  },
  capacityDashboardStat: {
    alignItems: 'center',
  },
  capacityDashboardStatLabel: {
    fontSize: 11,
    color: '#9CA3AF',
  },
  capacityDashboardStatValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  capacityDashboardBar: {
    height: 8,
    backgroundColor: '#1F2937',
    borderRadius: 4,
    overflow: 'hidden',
  },
  capacityDashboardFill: {
    height: '100%',
    borderRadius: 4,
  },
  venueMapContainer: {
    backgroundColor: '#0A0F1A',
    borderRadius: 12,
    padding: 16,
  },
  venueMapGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  venueMapZone: {
    flex: 1,
    minWidth: 180,
    backgroundColor: '#1F2937',
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
  },
  venueMapZoneHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  venueMapZoneName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  venueMapZoneStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  venueMapZoneStatusText: {
    fontSize: 10,
    fontWeight: '600',
  },
  venueMapZoneCapacity: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 8,
  },
  venueMapZoneOccupied: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  venueMapZoneTotal: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  venueMapZoneBar: {
    height: 6,
    backgroundColor: '#374151',
    borderRadius: 3,
    overflow: 'hidden',
  },
  venueMapZoneFill: {
    height: '100%',
    borderRadius: 3,
  },
  analyticsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  analyticsCard: {
    flex: 1,
    minWidth: 140,
    backgroundColor: '#0A0F1A',
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    gap: 8,
  },
  analyticsValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  analyticsMetric: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
  },
  analyticsTarget: {
    fontSize: 10,
    color: '#6B7280',
  },
  analyticsIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  analyticsIndicatorText: {
    fontSize: 11,
    fontWeight: '600',
  },
});
