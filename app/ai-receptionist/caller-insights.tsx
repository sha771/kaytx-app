 
import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  useWindowDimensions,
  ActivityIndicator,
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Search,
  ListFilter,
  TrendingUp,
  TrendingDown,
  Users,
  Phone,
  Clock,
  MapPin,
  Building,
  Award,
  ChartBar,
  ChartPie,
  Activity,
  Lock,
} from 'lucide-react-native';
import { trpc } from '@/lib/trpc';
import { useTheme } from '@/providers/ThemeProvider';

export default function CallerInsightsScreen() {
  const { theme } = useTheme();
  const router = useRouter();
  const { width } = useWindowDimensions();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'positive' | 'neutral' | 'negative'>('all');

  // Real tRPC data
  const { data: subscription } = trpc.user.getSubscription.useQuery();
  const isEnterprise = subscription?.plan === 'enterprise';

  const { data: callerInsights = [], isLoading } = trpc.receptionist.getCallerInsights.useQuery();

  const filteredInsights = useMemo(() => {
    return callerInsights.filter((insight) => {
      const matchesSearch =
        insight.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        insight.customerCompany.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = filterType === 'all' || insight.sentiment === filterType;
      return matchesSearch && matchesFilter;
    });
  }, [callerInsights, searchQuery, filterType]);

  const stats = useMemo(() => {
    if (!callerInsights.length) return { totalCalls: 0, avgWinRate: 0, avgDealValue: 0 };
    const totalCalls = callerInsights.reduce((sum, i) => sum + i.totalCalls, 0);
    const avgWinRate = callerInsights.reduce((sum, i) => sum + i.winRate, 0) / callerInsights.length;
    const avgDealValue = callerInsights.reduce((sum, i) => sum + i.avgDealValue, 0) / callerInsights.length;
    return { totalCalls, avgWinRate, avgDealValue };
  }, [callerInsights]);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Stack.Screen
        options={{
          title: 'Caller Insights',
          headerStyle: { backgroundColor: theme.colors.background },
          headerTintColor: theme.colors.text,
          headerShadowVisible: false,
        }}
      />
      <SafeAreaView style={styles.container} edges={['bottom']}>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={theme.colors.primary} />
          </View>
        ) : (
          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            <View style={styles.statsGrid}>
              <View style={[styles.statCard, { backgroundColor: theme.colors.primary + '15' }]}>
                <View style={styles.statIconContainer}>
                  <Phone size={20} color={theme.colors.primary} />
                </View>
                <Text style={[styles.statValue, { color: theme.colors.text }]}>{stats.totalCalls}</Text>
                <Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>Total Calls</Text>
              </View>

              <View style={[styles.statCard, { backgroundColor: '#34C75915' }]}>
                <View style={styles.statIconContainer}>
                  <Award size={20} color="#34C759" />
                </View>
                <Text style={[styles.statValue, { color: theme.colors.text }]}>{stats.avgWinRate.toFixed(1)}%</Text>
                <Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>Avg Win Rate</Text>
              </View>

              <View style={[styles.statCard, { backgroundColor: '#FF950015' }]}>
                <View style={styles.statIconContainer}>
                  <TrendingUp size={20} color="#FF9500" />
                </View>
                <Text style={[styles.statValue, { color: theme.colors.text }]}>${(stats.avgDealValue / 1000).toFixed(0)}K</Text>
                <Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>Avg Deal Value</Text>
              </View>
            </View>

            <View style={styles.searchSection}>
              <View style={[styles.searchBar, { backgroundColor: theme.colors.cardBackground, borderColor: theme.colors.border }]}>
                <Search size={18} color={theme.colors.secondaryText} />
                <TextInput
                  style={[styles.searchInput, { color: theme.colors.text }]}
                  placeholder="Search by name or company..."
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  placeholderTextColor={theme.colors.secondaryText}
                />
              </View>

              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.filterContainer}
              >
                {['all', 'positive', 'neutral', 'negative'].map((Filter) => (
                  <TouchableOpacity
                    key={Filter}
                    style={[
                      styles.filterChip,
                      { backgroundColor: theme.colors.cardBackground },
                      filterType === Filter && { backgroundColor: theme.colors.primary },
                    ]}
                    onPress={() => setFilterType(Filter as typeof filterType)}
                  >
                    <Text
                      style={[
                        styles.filterChipText,
                        { color: theme.colors.secondaryText },
                        filterType === Filter && { color: '#FFFFFF' },
                      ]}
                    >
                      {Filter.charAt(0).toUpperCase() + Filter.slice(1)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            <View style={styles.insightsList}>
              {filteredInsights.map((insight) => (
                <View key={insight.id} style={[styles.insightCard, { backgroundColor: theme.colors.cardBackground, borderColor: theme.colors.border }]}>
                  {!isEnterprise && (
                    <TouchableOpacity 
                      style={styles.lockOverlay}
                      onPress={() => router.push('/enterprise-admin')}
                    >
                      <Lock size={24} color={theme.colors.text} />
                    </TouchableOpacity>
                  )}
                  <View style={styles.insightHeader}>
                    <View style={styles.insightHeaderLeft}>
                      <Text style={[styles.insightName, { color: theme.colors.text }]}>{insight.customerName}</Text>
                      <View style={styles.companyRow}>
                        <Building size={14} color={theme.colors.secondaryText} />
                        <Text style={[styles.insightCompany, { color: theme.colors.secondaryText }]}>{insight.customerCompany}</Text>
                      </View>
                    </View>
                    <View
                      style={[
                        styles.sentimentBadge,
                        { backgroundColor: getSentimentColor(insight.sentiment) + '20' },
                      ]}
                    >
                      <Text
                        style={[
                          styles.sentimentText,
                          { color: getSentimentColor(insight.sentiment) },
                        ]}
                      >
                        {insight.sentiment}
                      </Text>
                    </View>
                  </View>

                  <View style={[styles.metricsGrid, { backgroundColor: theme.colors.background }]}>
                    <View style={styles.metricItem}>
                      <Phone size={16} color={theme.colors.primary} />
                      <Text style={[styles.metricValue, { color: theme.colors.text }]}>{insight.totalCalls}</Text>
                      <Text style={[styles.metricLabel, { color: theme.colors.secondaryText }]}>Calls</Text>
                    </View>
                    <View style={styles.metricItem}>
                      <Award size={16} color="#34C759" />
                      <Text style={[styles.metricValue, { color: theme.colors.text }]}>{insight.totalDeals}</Text>
                      <Text style={[styles.metricLabel, { color: theme.colors.secondaryText }]}>Deals</Text>
                    </View>
                    <View style={styles.metricItem}>
                      <TrendingUp size={16} color="#FF9500" />
                      <Text style={[styles.metricValue, { color: theme.colors.text }]}>${(insight.avgDealValue / 1000).toFixed(0)}K</Text>
                      <Text style={[styles.metricLabel, { color: theme.colors.secondaryText }]}>Avg Deal</Text>
                    </View>
                    <View style={styles.metricItem}>
                      <Activity size={16} color="#5AC8FA" />
                      <Text style={[styles.metricValue, { color: theme.colors.text }]}>{insight.winRate}%</Text>
                      <Text style={[styles.metricLabel, { color: theme.colors.secondaryText }]}>Win Rate</Text>
                    </View>
                  </View>

                  <View style={styles.demographicsSection}>
                    <Text style={[styles.sectionTitle, { color: theme.colors.secondaryText }]}>Demographics</Text>
                    <View style={styles.demographicsGrid}>
                      <View style={[styles.demographicItem, { backgroundColor: theme.colors.background }]}>
                        <Building size={14} color={theme.colors.secondaryText} />
                        <Text style={[styles.demographicText, { color: theme.colors.text }]}>{insight.demographics.industry}</Text>
                      </View>
                      <View style={[styles.demographicItem, { backgroundColor: theme.colors.background }]}>
                        <Users size={14} color={theme.colors.secondaryText} />
                        <Text style={[styles.demographicText, { color: theme.colors.text }]}>{insight.demographics.companySize}</Text>
                      </View>
                      <View style={[styles.demographicItem, { backgroundColor: theme.colors.background }]}>
                        <MapPin size={14} color={theme.colors.secondaryText} />
                        <Text style={[styles.demographicText, { color: theme.colors.text }]}>{insight.demographics.location}</Text>
                      </View>
                    </View>
                  </View>

                  {insight.preferredTime && (
                    <View style={[styles.behaviorSection, { backgroundColor: theme.colors.primary + '15' }]}>
                      <Clock size={14} color={theme.colors.primary} />
                      <Text style={[styles.behaviorText, { color: theme.colors.primary }]}>Preferred Time: {insight.preferredTime}</Text>
                    </View>
                  )}

                  {insight.behaviorPattern && (
                    <View style={[styles.patternSection, { backgroundColor: '#FF950015' }]}>
                      <Text style={[styles.patternText, { color: theme.colors.text }]}>{insight.behaviorPattern}</Text>
                    </View>
                  )}

                  <View style={[styles.cardFooter, { borderTopColor: theme.colors.border }]}>
                    <Text style={[styles.lastContactText, { color: theme.colors.secondaryText }]}>
                      Last contact: {new Date(insight.lastContact).toLocaleDateString()}
                    </Text>
                    <TouchableOpacity style={styles.viewDetailsButton}>
                      <Text style={[styles.viewDetailsText, { color: theme.colors.primary }]}>View Details</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>
        )}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F7',
  },
  content: {
    flex: 1,
  },
  statsGrid: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingTop: 16,
    gap: 12,
  },
  statCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  statIconContainer: {
    marginBottom: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700' as const,
    color: '#1A1A1A',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#8E8E93',
  },
  searchSection: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: '#1A1A1A',
  },
  filterContainer: {
    flexDirection: 'row',
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F2F2F7',
    marginRight: 8,
  },
  filterChipActive: {
    backgroundColor: '#007AFF',
  },
  filterChipText: {
    fontSize: 14,
    fontWeight: '500' as const,
    color: '#8E8E93',
  },
  filterChipTextActive: {
    color: '#FFFFFF',
  },
  insightsList: {
    padding: 16,
    gap: 16,
  },
  insightCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  insightHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  insightHeaderLeft: {
    flex: 1,
  },
  insightName: {
    fontSize: 18,
    fontWeight: '600' as const,
    color: '#1A1A1A',
    marginBottom: 4,
  },
  companyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  insightCompany: {
    fontSize: 14,
    color: '#8E8E93',
  },
  sentimentBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  sentimentText: {
    fontSize: 12,
    fontWeight: '600' as const,
    textTransform: 'capitalize' as const,
  },
  metricsGrid: {
    flexDirection: 'row',
    backgroundColor: '#F9F9F9',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    justifyContent: 'space-around',
  },
  metricItem: {
    alignItems: 'center',
    gap: 4,
  },
  metricValue: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: '#1A1A1A',
  },
  metricLabel: {
    fontSize: 11,
    color: '#8E8E93',
  },
  demographicsSection: {
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '600' as const,
    color: '#8E8E93',
    marginBottom: 8,
    textTransform: 'uppercase' as const,
  },
  demographicsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  demographicItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#F9F9F9',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  demographicText: {
    fontSize: 13,
    color: '#1A1A1A',
  },
  behaviorSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#F0F8FF',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  behaviorText: {
    fontSize: 13,
    color: '#007AFF',
    flex: 1,
  },
  patternSection: {
    backgroundColor: '#FFF5F0',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  patternText: {
    fontSize: 13,
    color: '#1A1A1A',
    fontStyle: 'italic' as const,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F2F2F7',
  },
  lastContactText: {
    fontSize: 12,
    color: '#8E8E93',
  },
  viewDetailsButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  viewDetailsText: {
    fontSize: 14,
    fontWeight: '600' as const,
  },
  loadingContainer: {
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lockOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 16,
    zIndex: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
