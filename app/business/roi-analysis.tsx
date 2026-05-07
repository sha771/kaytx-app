 
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  TextInput,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  ChartBarBig,
  ChartPie,
  Calendar,
  ListFilter,
  Download,
  ArrowLeft,
  Target,
  Activity,
  Percent,
} from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { router } from 'expo-router';

interface ROIMetric {
  id: string;
  name: string;
  investment: number;
  return: number;
  roi: number;
  period: string;
  category: 'marketing' | 'sales' | 'operations' | 'technology';
  status: 'positive' | 'negative' | 'neutral';
}

interface ROITrend {
  period: string;
  value: number;
  change: number;
}

const mockROIData: ROIMetric[] = [
  {
    id: '1',
    name: 'Email Marketing Campaign',
    investment: 5000,
    return: 25000,
    roi: 400,
    period: 'Q1 2024',
    category: 'marketing',
    status: 'positive',
  },
  {
    id: '2',
    name: 'Sales Team Training',
    investment: 15000,
    return: 45000,
    roi: 200,
    period: 'Q1 2024',
    category: 'sales',
    status: 'positive',
  },
  {
    id: '3',
    name: 'CRM System Upgrade',
    investment: 25000,
    return: 35000,
    roi: 40,
    period: 'Q1 2024',
    category: 'technology',
    status: 'positive',
  },
  {
    id: '4',
    name: 'Office Renovation',
    investment: 50000,
    return: 30000,
    roi: -40,
    period: 'Q1 2024',
    category: 'operations',
    status: 'negative',
  },
];

const roiTrends: ROITrend[] = [
  { period: 'Jan', value: 150, change: 12 },
  { period: 'Feb', value: 180, change: 20 },
  { period: 'Mar', value: 220, change: 22 },
  { period: 'Apr', value: 195, change: -11 },
  { period: 'May', value: 240, change: 23 },
  { period: 'Jun', value: 280, change: 17 },
];

export default function ROIAnalysisScreen() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const [selectedPeriod, setSelectedPeriod] = useState<string>('Q1 2024');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'marketing': return '#007AFF';
      case 'sales': return '#34C759';
      case 'operations': return '#FF9500';
      case 'technology': return '#AF52DE';
      default: return theme.colors.secondaryText;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'positive': return '#34C759';
      case 'negative': return '#FF3B30';
      case 'neutral': return '#8E8E93';
      default: return theme.colors.secondaryText;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const filteredData = mockROIData.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const totalInvestment = filteredData.reduce((sum, item) => sum + item.investment, 0);
  const totalReturn = filteredData.reduce((sum, item) => sum + item.return, 0);
  const averageROI = filteredData.length > 0 ? 
    filteredData.reduce((sum, item) => sum + item.roi, 0) / filteredData.length : 0;

  const renderROIItem = ({ item }: { item: ROIMetric }) => {
    const StatusIcon = item.status === 'positive' ? TrendingUp : TrendingDown;
    
    return (
      <View style={[styles.roiCard, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.roiHeader}>
          <View style={styles.roiInfo}>
            <Text style={[styles.roiName, { color: theme.colors.text }]}>{item.name}</Text>
            <View style={styles.roiBadges}>
              <View style={[styles.categoryBadge, { backgroundColor: getCategoryColor(item.category) + '20' }]}>
                <Text style={[styles.categoryText, { color: getCategoryColor(item.category) }]}>
                  {item.category.toUpperCase()}
                </Text>
              </View>
              <Text style={[styles.periodText, { color: theme.colors.secondaryText }]}>{item.period}</Text>
            </View>
          </View>
          <View style={styles.roiStatus}>
            <StatusIcon size={20} color={getStatusColor(item.status)} />
          </View>
        </View>
        
        <View style={styles.roiMetrics}>
          <View style={styles.metricItem}>
            <Text style={[styles.metricLabel, { color: theme.colors.secondaryText }]}>Investment</Text>
            <Text style={[styles.metricValue, { color: theme.colors.text }]}>
              {formatCurrency(item.investment)}
            </Text>
          </View>
          <View style={styles.metricItem}>
            <Text style={[styles.metricLabel, { color: theme.colors.secondaryText }]}>Return</Text>
            <Text style={[styles.metricValue, { color: theme.colors.text }]}>
              {formatCurrency(item.return)}
            </Text>
          </View>
          <View style={styles.metricItem}>
            <Text style={[styles.metricLabel, { color: theme.colors.secondaryText }]}>ROI</Text>
            <Text style={[styles.roiValue, { color: getStatusColor(item.status) }]}>
              {item.roi > 0 ? '+' : ''}{item.roi}%
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const renderTrendItem = ({ item }: { item: ROITrend }) => {
    const isPositive = item.change > 0;
    
    return (
      <View style={styles.trendItem}>
        <Text style={[styles.trendPeriod, { color: theme.colors.text }]}>{item.period}</Text>
        <Text style={[styles.trendValue, { color: theme.colors.text }]}>{item.value}%</Text>
        <View style={styles.trendChange}>
          {isPositive ? (
            <TrendingUp size={12} color="#34C759" />
          ) : (
            <TrendingDown size={12} color="#FF3B30" />
          )}
          <Text style={[styles.trendChangeText, { color: isPositive ? '#34C759' : '#FF3B30' }]}>
            {item.change > 0 ? '+' : ''}{item.change}%
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.colors.background, paddingTop: insets.top + 10 }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.colors.text }]}>ROI Analysis</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerButton}>
            <Download size={20} color={theme.colors.text} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <ListFilter size={20} color={theme.colors.text} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Summary Cards */}
        <View style={styles.summaryContainer}>
          <View style={[styles.summaryCard, { backgroundColor: theme.colors.cardBackground }]}>
            <View style={[styles.summaryIcon, { backgroundColor: '#007AFF20' }]}>
              <DollarSign size={20} color="#007AFF" />
            </View>
            <Text style={[styles.summaryValue, { color: theme.colors.text }]}>
              {formatCurrency(totalInvestment)}
            </Text>
            <Text style={[styles.summaryLabel, { color: theme.colors.secondaryText }]}>Total Investment</Text>
          </View>
          
          <View style={[styles.summaryCard, { backgroundColor: theme.colors.cardBackground }]}>
            <View style={[styles.summaryIcon, { backgroundColor: '#34C75920' }]}>
              <TrendingUp size={20} color="#34C759" />
            </View>
            <Text style={[styles.summaryValue, { color: theme.colors.text }]}>
              {formatCurrency(totalReturn)}
            </Text>
            <Text style={[styles.summaryLabel, { color: theme.colors.secondaryText }]}>Total Return</Text>
          </View>
          
          <View style={[styles.summaryCard, { backgroundColor: theme.colors.cardBackground }]}>
            <View style={[styles.summaryIcon, { backgroundColor: '#AF52DE20' }]}>
              <Percent size={20} color="#AF52DE" />
            </View>
            <Text style={[styles.summaryValue, { color: theme.colors.text }]}>
              {averageROI.toFixed(1)}%
            </Text>
            <Text style={[styles.summaryLabel, { color: theme.colors.secondaryText }]}>Average ROI</Text>
          </View>
        </View>

        {/* ROI Trends */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>ROI Trends</Text>
          <View style={[styles.trendsCard, { backgroundColor: theme.colors.cardBackground }]}>
            <FlatList
              data={roiTrends}
              renderItem={renderTrendItem}
              keyExtractor={(item) => item.period}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.trendsContainer}
            />
          </View>
        </View>

        {/* Search and Filters */}
        <View style={styles.filtersSection}>
          <View style={[styles.searchBar, { backgroundColor: theme.colors.cardBackground }]}>
            <TextInput
              style={[styles.searchInput, { color: theme.colors.text }]}
              placeholder="Search investments..."
              placeholderTextColor={theme.colors.secondaryText}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryFilters}>
            {['all', 'marketing', 'sales', 'operations', 'technology'].map((category) => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryFilter,
                  selectedCategory === category && { backgroundColor: theme.colors.primary },
                ]}
                onPress={() => setSelectedCategory(category)}
              >
                <Text
                  style={[
                    styles.categoryFilterText,
                    {
                      color: selectedCategory === category ? 'white' : theme.colors.secondaryText,
                    },
                  ]}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* ROI List */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Investment Analysis</Text>
          <FlatList
            data={filteredData}
            renderItem={renderROIItem}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            contentContainerStyle={styles.roiList}
          />
        </View>
      </ScrollView>
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
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  summaryContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  summaryCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  summaryIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  summaryLabel: {
    fontSize: 12,
    textAlign: 'center',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  trendsCard: {
    padding: 16,
    borderRadius: 12,
  },
  trendsContainer: {
    gap: 20,
  },
  trendItem: {
    alignItems: 'center',
    minWidth: 60,
  },
  trendPeriod: {
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 8,
  },
  trendValue: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  trendChange: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  trendChangeText: {
    fontSize: 10,
    fontWeight: '500',
  },
  filtersSection: {
    marginBottom: 24,
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
  categoryFilters: {
    flexDirection: 'row',
  },
  categoryFilter: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.05)',
    marginRight: 8,
  },
  categoryFilterText: {
    fontSize: 14,
    fontWeight: '500',
  },
  roiList: {
    gap: 12,
  },
  roiCard: {
    padding: 16,
    borderRadius: 12,
  },
  roiHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  roiInfo: {
    flex: 1,
  },
  roiName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  roiBadges: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryText: {
    fontSize: 10,
    fontWeight: '600',
  },
  periodText: {
    fontSize: 12,
  },
  roiStatus: {
    padding: 4,
  },
  roiMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metricItem: {
    alignItems: 'center',
  },
  metricLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  metricValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  roiValue: {
    fontSize: 16,
    fontWeight: '700',
  },
});
