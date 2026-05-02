 
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  TextInput,
  Image,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  ChartBar,
  TrendingUp,
  TrendingDown,
  Users,
  Target,
  Calendar,
  ListFilter,
  Download,
  ArrowLeft,
  Eye,
  MousePointer,
  DollarSign,
  Percent,
  Clock,
  Activity,
} from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { trpc } from '@/lib/trpc';
import { router } from 'expo-router';

interface ABTest {
  id: string;
  name: string;
  description: string;
  status: 'running' | 'completed' | 'draft' | 'paused';
  startDate: string;
  endDate: string;
  variants: ABVariant[];
  metric: string;
  confidence: number;
  winner?: string;
  participants: number;
}

interface ABVariant {
  id: string;
  name: string;
  description: string;
  traffic: number;
  conversions: number;
  conversionRate: number;
  revenue: number;
  isControl: boolean;
}

interface TestMetric {
  title: string;
  value: string;
  change: string;
  icon: React.ComponentType<any>;
  color: string;
}

const mockTests: ABTest[] = [
  {
    id: '1',
    name: 'Homepage Hero Button',
    description: 'Testing different CTA button colors',
    status: 'running',
    startDate: '2024-01-15',
    endDate: '2024-02-15',
    metric: 'Click-through Rate',
    confidence: 95,
    participants: 15420,
    variants: [
      {
        id: 'a',
        name: 'Control (Blue)',
        description: 'Original blue button',
        traffic: 50,
        conversions: 1247,
        conversionRate: 8.1,
        revenue: 24940,
        isControl: true,
      },
      {
        id: 'b',
        name: 'Variant (Green)',
        description: 'Green button variant',
        traffic: 50,
        conversions: 1389,
        conversionRate: 9.0,
        revenue: 27780,
        isControl: false,
      },
    ],
  },
  {
    id: '2',
    name: 'Email Subject Lines',
    description: 'Testing personalized vs generic subject lines',
    status: 'completed',
    startDate: '2024-01-01',
    endDate: '2024-01-31',
    metric: 'Open Rate',
    confidence: 99,
    winner: 'b',
    participants: 8750,
    variants: [
      {
        id: 'a',
        name: 'Generic Subject',
        description: 'Standard promotional subject',
        traffic: 50,
        conversions: 1750,
        conversionRate: 20.0,
        revenue: 8750,
        isControl: true,
      },
      {
        id: 'b',
        name: 'Personalized Subject',
        description: 'Personalized with first name',
        traffic: 50,
        conversions: 2188,
        conversionRate: 25.0,
        revenue: 10940,
        isControl: false,
      },
    ],
  },
];

const testMetrics: TestMetric[] = [
  {
    title: 'Active Tests',
    value: '3',
    change: '+1',
    icon: Activity,
    color: '#007AFF',
  },
  {
    title: 'Avg Confidence',
    value: '94%',
    change: '+2%',
    icon: Target,
    color: '#34C759',
  },
  {
    title: 'Total Participants',
    value: '24.2K',
    change: '+15%',
    icon: Users,
    color: '#FF9500',
  },
  {
    title: 'Conversion Lift',
    value: '12.5%',
    change: '+3.2%',
    icon: TrendingUp,
    color: '#AF52DE',
  },
];

export default function ABTestingScreen() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const [selectedTab, setSelectedTab] = useState<'tests' | 'results' | 'insights'>('tests');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return '#34C759';
      case 'completed': return '#007AFF';
      case 'draft': return '#8E8E93';
      case 'paused': return '#FF9500';
      default: return theme.colors.secondaryText;
    }
  };

  const filteredTests = (abTests || []).filter(test => {
    const matchesSearch = test.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || test.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const renderMetric = ({ item }: { item: TestMetric }) => {
    const IconComponent = item.icon;
    const isPositive = item.change.startsWith('+');
    
    return (
      <View style={[styles.metricCard, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.metricHeader}>
          <View style={[styles.metricIcon, { backgroundColor: `${item.color}20` }]}>
            <IconComponent size={20} color={item.color} />
          </View>
          <Text style={[styles.metricChange, { color: isPositive ? '#34C759' : '#FF3B30' }]}>
            {item.change}
          </Text>
        </View>
        <Text style={[styles.metricValue, { color: theme.colors.text }]}>{item.value}</Text>
        <Text style={[styles.metricTitle, { color: theme.colors.secondaryText }]}>{item.title}</Text>
      </View>
    );
  };

  const renderTest = ({ item }: { item: ABTest }) => {
    const statusColor = getStatusColor(item.status);
    const winningVariant = item.winner ? item.variants.find(v => v.id === item.winner) : null;
    
    return (
      <View style={[styles.testCard, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.testHeader}>
          <View style={styles.testInfo}>
            <Text style={[styles.testName, { color: theme.colors.text }]}>{item.name}</Text>
            <Text style={[styles.testDescription, { color: theme.colors.secondaryText }]}>
              {item.description}
            </Text>
            <View style={styles.testBadges}>
              <View style={[styles.statusBadge, { backgroundColor: statusColor + '20' }]}>
                <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
                <Text style={[styles.statusText, { color: statusColor }]}>
                  {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                </Text>
              </View>
              <Text style={[styles.metricText, { color: theme.colors.secondaryText }]}>
                {item.metric}
              </Text>
            </View>
          </View>
          <View style={styles.testStats}>
            <Text style={[styles.confidenceValue, { color: theme.colors.text }]}>
              {item.confidence}%
            </Text>
            <Text style={[styles.confidenceLabel, { color: theme.colors.secondaryText }]}>
              Confidence
            </Text>
          </View>
        </View>

        <View style={styles.variantsSection}>
          <Text style={[styles.variantsTitle, { color: theme.colors.text }]}>Variants</Text>
          {item.variants.map((variant) => (
            <View key={variant.id} style={styles.variantRow}>
              <View style={styles.variantInfo}>
                <View style={styles.variantHeader}>
                  <Text style={[styles.variantName, { color: theme.colors.text }]}>
                    {variant.name}
                  </Text>
                  {variant.isControl && (
                    <View style={[styles.controlBadge, { backgroundColor: theme.colors.primary + '20' }]}>
                      <Text style={[styles.controlText, { color: theme.colors.primary }]}>Control</Text>
                    </View>
                  )}
                  {item.winner === variant.id && (
                    <View style={[styles.winnerBadge, { backgroundColor: '#34C759' + '20' }]}>
                      <Text style={[styles.winnerText, { color: '#34C759' }]}>Winner</Text>
                    </View>
                  )}
                </View>
                <Text style={[styles.variantDescription, { color: theme.colors.secondaryText }]}>
                  {variant.description}
                </Text>
              </View>
              <View style={styles.variantMetrics}>
                <View style={styles.variantMetric}>
                  <Text style={[styles.variantMetricValue, { color: theme.colors.text }]}>
                    {variant.conversionRate}%
                  </Text>
                  <Text style={[styles.variantMetricLabel, { color: theme.colors.secondaryText }]}>
                    Conv. Rate
                  </Text>
                </View>
                <View style={styles.variantMetric}>
                  <Text style={[styles.variantMetricValue, { color: theme.colors.text }]}>
                    {variant.conversions}
                  </Text>
                  <Text style={[styles.variantMetricLabel, { color: theme.colors.secondaryText }]}>
                    Conversions
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.testFooter}>
          <View style={styles.testDates}>
            <Text style={[styles.dateText, { color: theme.colors.secondaryText }]}>
              {item.startDate} - {item.endDate}
            </Text>
            <Text style={[styles.participantsText, { color: theme.colors.secondaryText }]}>
              {item.participants.toLocaleString()} participants
            </Text>
          </View>
          <TouchableOpacity style={[styles.viewButton, { backgroundColor: theme.colors.primary }]}>
            <Eye size={14} color="white" />
            <Text style={styles.viewButtonText}>View Details</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderTests = () => (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      {/* Metrics */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Testing Overview</Text>
        <FlatList
          data={testMetrics}
          renderItem={renderMetric}
          keyExtractor={(item) => item.title}
          numColumns={2}
          scrollEnabled={false}
          contentContainerStyle={styles.metricsContainer}
        />
      </View>

      {/* Search and Filters */}
      <View style={styles.filtersSection}>
        <View style={[styles.searchBar, { backgroundColor: theme.colors.cardBackground }]}>
          <TextInput
            style={[styles.searchInput, { color: theme.colors.text }]}
            placeholder="Search tests..."
            placeholderTextColor={theme.colors.secondaryText}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.statusFilters}>
          {['all', 'running', 'completed', 'draft', 'paused'].map((status) => (
            <TouchableOpacity
              key={status}
              style={[
                styles.statusFilter,
                filterStatus === status && { backgroundColor: theme.colors.primary },
              ]}
              onPress={() => setFilterStatus(status)}
            >
              <Text
                style={[
                  styles.statusFilterText,
                  {
                    color: filterStatus === status ? 'white' : theme.colors.secondaryText,
                  },
                ]}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={filteredTests}
        renderItem={renderTest}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        contentContainerStyle={styles.testsList}
      />
    </ScrollView>
  );

  const renderResults = () => (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Test Results Summary</Text>
        <View style={[styles.resultsCard, { backgroundColor: theme.colors.cardBackground }]}>
          <Text style={[styles.resultsTitle, { color: theme.colors.text }]}>Recent Wins</Text>
          <Text style={[styles.resultsDescription, { color: theme.colors.secondaryText }]}>
            Personalized email subjects increased open rates by 25% with 99% confidence.
          </Text>
        </View>
      </View>
    </ScrollView>
  );

  const renderInsights = () => (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Testing Insights</Text>
        <View style={[styles.insightsCard, { backgroundColor: theme.colors.cardBackground }]}>
          <Text style={[styles.insightsTitle, { color: theme.colors.text }]}>Key Learnings</Text>
          <Text style={[styles.insightsDescription, { color: theme.colors.secondaryText }]}>
            Personalization consistently outperforms generic messaging across all channels.
          </Text>
        </View>
      </View>
    </ScrollView>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.colors.background, paddingTop: insets.top + 10 }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.colors.text }]}>A/B Testing</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerButton}>
            <Download size={20} color={theme.colors.text} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <ListFilter size={20} color={theme.colors.text} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        {(['tests', 'results', 'insights'] as const).map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tab,
              selectedTab === tab && { backgroundColor: theme.colors.primary },
            ]}
            onPress={() => setSelectedTab(tab)}
          >
            <Text
              style={[
                styles.tabText,
                {
                  color: selectedTab === tab ? 'white' : theme.colors.secondaryText,
                },
              ]}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Content */}
      {selectedTab === 'tests' && renderTests()}
      {selectedTab === 'results' && renderResults()}
      {selectedTab === 'insights' && renderInsights()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  backButton: {
    padding: 8,
    marginRight: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    flex: 1,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  headerButton: {
    padding: 8,
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 16,
    gap: 8,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
  },
  tabContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  metricsContainer: {
    gap: 12,
  },
  metricCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 6,
  },
  metricHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  metricIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  metricChange: {
    fontSize: 12,
    fontWeight: '600',
  },
  metricValue: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  metricTitle: {
    fontSize: 12,
    fontWeight: '500',
  },
  filtersSection: {
    marginBottom: 20,
  },
  searchBar: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 12,
  },
  searchInput: {
    fontSize: 16,
  },
  statusFilters: {
    flexDirection: 'row',
  },
  statusFilter: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.05)',
    marginRight: 8,
  },
  statusFilterText: {
    fontSize: 14,
    fontWeight: '500',
  },
  testsList: {
    gap: 16,
  },
  testCard: {
    padding: 16,
    borderRadius: 12,
  },
  testHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  testInfo: {
    flex: 1,
  },
  testName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  testDescription: {
    fontSize: 14,
    marginBottom: 8,
  },
  testBadges: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  metricText: {
    fontSize: 12,
  },
  testStats: {
    alignItems: 'center',
  },
  confidenceValue: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 2,
  },
  confidenceLabel: {
    fontSize: 12,
  },
  variantsSection: {
    marginBottom: 16,
  },
  variantsTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
  },
  variantRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  variantInfo: {
    flex: 1,
  },
  variantHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  variantName: {
    fontSize: 14,
    fontWeight: '500',
  },
  controlBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  controlText: {
    fontSize: 10,
    fontWeight: '600',
  },
  winnerBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  winnerText: {
    fontSize: 10,
    fontWeight: '600',
  },
  variantDescription: {
    fontSize: 12,
  },
  variantMetrics: {
    flexDirection: 'row',
    gap: 16,
  },
  variantMetric: {
    alignItems: 'center',
  },
  variantMetricValue: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  variantMetricLabel: {
    fontSize: 10,
  },
  testFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  testDates: {
    flex: 1,
  },
  dateText: {
    fontSize: 12,
    marginBottom: 2,
  },
  participantsText: {
    fontSize: 12,
  },
  viewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 4,
  },
  viewButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  resultsCard: {
    padding: 16,
    borderRadius: 12,
  },
  resultsTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  resultsDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  insightsCard: {
    padding: 16,
    borderRadius: 12,
  },
  insightsTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  insightsDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
});