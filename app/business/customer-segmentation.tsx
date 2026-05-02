 
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Stack } from 'expo-router';
import {
  Users,
  TrendingUp,
  Target,
  DollarSign,
  Search,
  ListFilter,
  Plus,
  ChartBar,
} from 'lucide-react-native';

interface Segment {
  id: string;
  name: string;
  description: string;
  size: number;
  avgValue: number;
  growth: number;
  status: 'growing' | 'stable' | 'declining';
  criteria: {
    demographics?: string;
    behavior?: string;
    location?: string;
    spending?: string;
  };
}

export default function CustomerSegmentationScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  const [segments] = useState<Segment[]>([
    {
      id: '1',
      name: 'Enterprise Customers',
      description: 'Large organizations with 500+ employees',
      size: 245,
      avgValue: 125000,
      growth: 18.5,
      status: 'growing',
      criteria: {
        demographics: 'B2B, Enterprise',
        behavior: 'High engagement, Long sales cycle',
        location: 'Global',
        spending: '$100K+ annually',
      },
    },
    {
      id: '2',
      name: 'SMB Power Users',
      description: 'Small to medium businesses with active usage',
      size: 1250,
      avgValue: 12000,
      growth: 24.2,
      status: 'growing',
      criteria: {
        demographics: 'B2B, SMB',
        behavior: 'Daily active users',
        location: 'North America',
        spending: '$10K-$50K annually',
      },
    },
    {
      id: '3',
      name: 'Startup Tier',
      description: 'Early-stage companies and startups',
      size: 3400,
      avgValue: 2500,
      growth: 12.8,
      status: 'stable',
      criteria: {
        demographics: 'B2B, Startup',
        behavior: 'Growing usage',
        location: 'Tech hubs',
        spending: '$1K-$10K annually',
      },
    },
    {
      id: '4',
      name: 'At-Risk Customers',
      description: 'Decreased engagement, potential churn',
      size: 180,
      avgValue: 8500,
      growth: -8.3,
      status: 'declining',
      criteria: {
        demographics: 'Mixed',
        behavior: 'Low engagement, Support tickets',
        location: 'Various',
        spending: 'Declining',
      },
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'growing':
        return '#10B981';
      case 'stable':
        return '#F59E0B';
      case 'declining':
        return '#EF4444';
      default:
        return '#64748B';
    }
  };

  const filteredSegments = segments.filter(
    (segment) =>
      searchQuery === '' ||
      segment.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      segment.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = {
    totalSegments: segments.length,
    totalCustomers: segments.reduce((sum, s) => sum + s.size, 0),
    avgGrowth: (
      segments.reduce((sum, s) => sum + s.growth, 0) / segments.length
    ).toFixed(1),
    totalRevenue: segments.reduce((sum, s) => sum + s.size * s.avgValue, 0),
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Customer Segmentation',
          headerStyle: { backgroundColor: '#0F172A' },
          headerTintColor: '#fff',
          headerRight: () => (
            <TouchableOpacity style={styles.headerButton}>
              <Plus size={24} color="#fff" />
            </TouchableOpacity>
          ),
        }}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Customer Segments</Text>
          <Text style={styles.subtitle}>Analyze and target customer groups</Text>
        </View>

        <View style={styles.statsGrid}>
          <View style={[styles.statCard, { backgroundColor: '#3B82F6' }]}>
            <Target size={20} color="#fff" />
            <Text style={styles.statValue}>{stats.totalSegments}</Text>
            <Text style={styles.statLabel}>Segments</Text>
          </View>

          <View style={[styles.statCard, { backgroundColor: '#10B981' }]}>
            <Users size={20} color="#fff" />
            <Text style={styles.statValue}>{stats.totalCustomers.toLocaleString()}</Text>
            <Text style={styles.statLabel}>Customers</Text>
          </View>

          <View style={[styles.statCard, { backgroundColor: '#8B5CF6' }]}>
            <TrendingUp size={20} color="#fff" />
            <Text style={styles.statValue}>{stats.avgGrowth}%</Text>
            <Text style={styles.statLabel}>Avg Growth</Text>
          </View>

          <View style={[styles.statCard, { backgroundColor: '#F59E0B' }]}>
            <DollarSign size={20} color="#fff" />
            <Text style={styles.statValue}>
              ${(stats.totalRevenue / 1000000).toFixed(1)}M
            </Text>
            <Text style={styles.statLabel}>Revenue</Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.searchContainer}>
            <Search size={20} color="#64748B" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search segments..."
              placeholderTextColor="#64748B"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            <TouchableOpacity>
              <ListFilter size={20} color="#64748B" />
            </TouchableOpacity>
          </View>

          {filteredSegments.map((segment) => (
            <View key={segment.id} style={styles.segmentCard}>
              <View style={styles.segmentHeader}>
                <View style={styles.segmentInfo}>
                  <Text style={styles.segmentName}>{segment.name}</Text>
                  <Text style={styles.segmentDescription}>
                    {segment.description}
                  </Text>
                </View>
                <View
                  style={[
                    styles.statusBadge,
                    { backgroundColor: getStatusColor(segment.status) + '20' },
                  ]}
                >
                  <Text
                    style={[
                      styles.statusText,
                      { color: getStatusColor(segment.status) },
                    ]}
                  >
                    {segment.status.toUpperCase()}
                  </Text>
                </View>
              </View>

              <View style={styles.metricsRow}>
                <View style={styles.metricItem}>
                  <Users size={16} color="#64748B" />
                  <Text style={styles.metricValue}>
                    {segment.size.toLocaleString()}
                  </Text>
                  <Text style={styles.metricLabel}>Customers</Text>
                </View>

                <View style={styles.metricItem}>
                  <DollarSign size={16} color="#64748B" />
                  <Text style={styles.metricValue}>
                    ${(segment.avgValue / 1000).toFixed(0)}K
                  </Text>
                  <Text style={styles.metricLabel}>Avg Value</Text>
                </View>

                <View style={styles.metricItem}>
                  <TrendingUp
                    size={16}
                    color={getStatusColor(segment.status)}
                  />
                  <Text
                    style={[
                      styles.metricValue,
                      { color: getStatusColor(segment.status) },
                    ]}
                  >
                    {segment.growth > 0 ? '+' : ''}
                    {segment.growth}%
                  </Text>
                  <Text style={styles.metricLabel}>Growth</Text>
                </View>

                <View style={styles.metricItem}>
                  <ChartBarBig size={16} color="#64748B" />
                  <Text style={styles.metricValue}>
                    ${((segment.size * segment.avgValue) / 1000000).toFixed(1)}M
                  </Text>
                  <Text style={styles.metricLabel}>Revenue</Text>
                </View>
              </View>

              <View style={styles.criteriaSection}>
                <Text style={styles.criteriaTitle}>Segment Criteria</Text>
                <View style={styles.criteriaGrid}>
                  {Object.entries(segment.criteria).map(([key, value]) => (
                    <View key={key} style={styles.criteriaItem}>
                      <Text style={styles.criteriaKey}>
                        {key.charAt(0).toUpperCase() + key.slice(1)}:
                      </Text>
                      <Text style={styles.criteriaValue}>{value}</Text>
                    </View>
                  ))}
                </View>
              </View>

              <View style={styles.actions}>
                <TouchableOpacity style={styles.actionButton}>
                  <Text style={styles.actionButtonText}>View Customers</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                  <Text style={styles.actionButtonText}>Create Campaign</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  headerButton: {
    marginRight: 16,
  },
  header: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748B',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    gap: 12,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    minWidth: '22%',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    gap: 4,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
  },
  statLabel: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.8)',
  },
  section: {
    padding: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#fff',
  },
  segmentCard: {
    backgroundColor: '#1E293B',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  segmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  segmentInfo: {
    flex: 1,
    marginRight: 12,
  },
  segmentName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 6,
  },
  segmentDescription: {
    fontSize: 14,
    color: '#94A3B8',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
  },
  metricsRow: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 8,
  },
  metricItem: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#0F172A',
    padding: 12,
    borderRadius: 8,
    gap: 6,
  },
  metricValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },
  metricLabel: {
    fontSize: 10,
    color: '#64748B',
  },
  criteriaSection: {
    marginBottom: 16,
    padding: 12,
    backgroundColor: '#0F172A',
    borderRadius: 8,
  },
  criteriaTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#94A3B8',
    marginBottom: 12,
  },
  criteriaGrid: {
    gap: 10,
  },
  criteriaItem: {
    flexDirection: 'row',
    gap: 8,
  },
  criteriaKey: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748B',
  },
  criteriaValue: {
    fontSize: 13,
    color: '#94A3B8',
    flex: 1,
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#334155',
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#3B82F6',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
});
