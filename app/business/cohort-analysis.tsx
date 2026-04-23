 
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {
  Users,
  TrendingUp,
  TrendingDown,
  Calendar,
  Target,
  BarChart3,
  PieChart,
  Activity,
  Filter,
  Download,
  RefreshCw,
} from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Stack } from 'expo-router';

const { width } = Dimensions.get('window');

interface CohortData {
  cohort: string;
  users: number;
  retention: number[];
  revenue: number;
  churnRate: number;
  ltv: number;
}

export default function CohortAnalysisScreen() {
  const { theme } = useTheme();
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'quarter'>('month');
  const [selectedMetric, setSelectedMetric] = useState<'retention' | 'revenue' | 'churn'>('retention');

  const cohorts: CohortData[] = [
    {
      cohort: 'Jan 2025',
      users: 1250,
      retention: [100, 85, 72, 65, 58, 52, 48],
      revenue: 125000,
      churnRate: 15,
      ltv: 2400,
    },
    {
      cohort: 'Dec 2024',
      users: 1180,
      retention: [100, 82, 68, 60, 54, 49, 45],
      revenue: 118000,
      churnRate: 18,
      ltv: 2200,
    },
    {
      cohort: 'Nov 2024',
      users: 1050,
      retention: [100, 80, 65, 57, 51, 46, 42],
      revenue: 105000,
      churnRate: 20,
      ltv: 2100,
    },
    {
      cohort: 'Oct 2024',
      users: 980,
      retention: [100, 78, 62, 54, 48, 43, 39],
      revenue: 98000,
      churnRate: 22,
      ltv: 2000,
    },
    {
      cohort: 'Sep 2024',
      users: 920,
      retention: [100, 75, 58, 50, 44, 39, 35],
      revenue: 92000,
      churnRate: 25,
      ltv: 1900,
    },
  ];

  const getRetentionColor = (value: number) => {
    if (value >= 70) return '#34C759';
    if (value >= 50) return '#FF9500';
    return '#FF3B30';
  };

  const renderCohortTable = () => (
    <View style={[styles.tableCard, { backgroundColor: theme.colors.cardBackground }]}>
      <View style={styles.tableHeader}>
        <Text style={[styles.tableTitle, { color: theme.colors.text }]}>Cohort Retention</Text>
        <TouchableOpacity style={styles.iconButton}>
          <Download size={20} color={theme.colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View>
          <View style={styles.tableRow}>
            <View style={[styles.tableCell, styles.headerCell]}>
              <Text style={[styles.headerText, { color: theme.colors.text }]}>Cohort</Text>
            </View>
            <View style={[styles.tableCell, styles.headerCell]}>
              <Text style={[styles.headerText, { color: theme.colors.text }]}>Users</Text>
            </View>
            {[0, 1, 2, 3, 4, 5, 6].map(week => (
              <View key={week} style={[styles.tableCell, styles.headerCell]}>
                <Text style={[styles.headerText, { color: theme.colors.text }]}>
                  Week {week}
                </Text>
              </View>
            ))}
          </View>

          {cohorts.map((cohort, index) => (
            <View key={index} style={styles.tableRow}>
              <View style={[styles.tableCell, { backgroundColor: theme.colors.background }]}>
                <Text style={[styles.cellText, { color: theme.colors.text, fontWeight: '600' }]}>
                  {cohort.cohort}
                </Text>
              </View>
              <View style={[styles.tableCell, { backgroundColor: theme.colors.background }]}>
                <Text style={[styles.cellText, { color: theme.colors.text }]}>
                  {cohort.users.toLocaleString()}
                </Text>
              </View>
              {cohort.retention.map((value, weekIndex) => (
                <View
                  key={weekIndex}
                  style={[
                    styles.tableCell,
                    { backgroundColor: `${getRetentionColor(value)}20` },
                  ]}
                >
                  <Text style={[styles.cellText, { color: getRetentionColor(value), fontWeight: '600' }]}>
                    {value}%
                  </Text>
                </View>
              ))}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );

  const renderMetricsCards = () => (
    <View style={styles.metricsGrid}>
      <View style={[styles.metricCard, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={[styles.metricIcon, { backgroundColor: '#007AFF20' }]}>
          <Users size={24} color="#007AFF" />
        </View>
        <Text style={[styles.metricValue, { color: theme.colors.text }]}>6,380</Text>
        <Text style={[styles.metricLabel, { color: theme.colors.secondaryText }]}>
          Total Users
        </Text>
        <View style={styles.metricChange}>
          <TrendingUp size={14} color="#34C759" />
          <Text style={[styles.changeText, { color: '#34C759' }]}>+12.5%</Text>
        </View>
      </View>

      <View style={[styles.metricCard, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={[styles.metricIcon, { backgroundColor: '#34C75920' }]}>
          <Target size={24} color="#34C759" />
        </View>
        <Text style={[styles.metricValue, { color: theme.colors.text }]}>68%</Text>
        <Text style={[styles.metricLabel, { color: theme.colors.secondaryText }]}>
          Avg Retention
        </Text>
        <View style={styles.metricChange}>
          <TrendingUp size={14} color="#34C759" />
          <Text style={[styles.changeText, { color: '#34C759' }]}>+5.2%</Text>
        </View>
      </View>

      <View style={[styles.metricCard, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={[styles.metricIcon, { backgroundColor: '#FF950020' }]}>
          <Activity size={24} color="#FF9500" />
        </View>
        <Text style={[styles.metricValue, { color: theme.colors.text }]}>20%</Text>
        <Text style={[styles.metricLabel, { color: theme.colors.secondaryText }]}>
          Churn Rate
        </Text>
        <View style={styles.metricChange}>
          <TrendingDown size={14} color="#FF3B30" />
          <Text style={[styles.changeText, { color: '#FF3B30' }]}>-3.1%</Text>
        </View>
      </View>

      <View style={[styles.metricCard, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={[styles.metricIcon, { backgroundColor: '#AF52DE20' }]}>
          <TrendingUp size={24} color="#AF52DE" />
        </View>
        <Text style={[styles.metricValue, { color: theme.colors.text }]}>$2,180</Text>
        <Text style={[styles.metricLabel, { color: theme.colors.secondaryText }]}>
          Avg LTV
        </Text>
        <View style={styles.metricChange}>
          <TrendingUp size={14} color="#34C759" />
          <Text style={[styles.changeText, { color: '#34C759' }]}>+8.3%</Text>
        </View>
      </View>
    </View>
  );

  const renderInsights = () => (
    <View style={[styles.insightsCard, { backgroundColor: theme.colors.cardBackground }]}>
      <Text style={[styles.insightsTitle, { color: theme.colors.text }]}>Key Insights</Text>
      
      <View style={styles.insightItem}>
        <View style={[styles.insightIcon, { backgroundColor: '#34C75920' }]}>
          <TrendingUp size={16} color="#34C759" />
        </View>
        <View style={styles.insightContent}>
          <Text style={[styles.insightText, { color: theme.colors.text }]}>
            January cohort shows 15% better retention than previous months
          </Text>
          <Text style={[styles.insightSubtext, { color: theme.colors.secondaryText }]}>
            New onboarding flow is working effectively
          </Text>
        </View>
      </View>

      <View style={styles.insightItem}>
        <View style={[styles.insightIcon, { backgroundColor: '#FF950020' }]}>
          <Activity size={16} color="#FF9500" />
        </View>
        <View style={styles.insightContent}>
          <Text style={[styles.insightText, { color: theme.colors.text }]}>
            Week 3 shows consistent drop-off across all cohorts
          </Text>
          <Text style={[styles.insightSubtext, { color: theme.colors.secondaryText }]}>
            Consider implementing re-engagement campaign
          </Text>
        </View>
      </View>

      <View style={styles.insightItem}>
        <View style={[styles.insightIcon, { backgroundColor: '#007AFF20' }]}>
          <Target size={16} color="#007AFF" />
        </View>
        <View style={styles.insightContent}>
          <Text style={[styles.insightText, { color: theme.colors.text }]}>
            Users acquired in Q4 have 22% higher LTV
          </Text>
          <Text style={[styles.insightSubtext, { color: theme.colors.secondaryText }]}>
            Holiday campaigns drove quality users
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Stack.Screen
        options={{
          title: 'Cohort Analysis',
          headerStyle: { backgroundColor: theme.colors.background },
          headerTintColor: theme.colors.text,
        }}
      />

      <View style={styles.header}>
        <View>
          <Text style={[styles.title, { color: theme.colors.text }]}>Cohort Analysis</Text>
          <Text style={[styles.subtitle, { color: theme.colors.secondaryText }]}>
            Track user behavior and retention over time
          </Text>
        </View>
        <TouchableOpacity style={[styles.refreshButton, { backgroundColor: theme.colors.primary }]}>
          <RefreshCw size={20} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.filterRow}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.periodFilters}>
          {(['week', 'month', 'quarter'] as const).map(period => (
            <TouchableOpacity
              key={period}
              style={[
                styles.filterChip,
                {
                  backgroundColor:
                    selectedPeriod === period ? theme.colors.primary : theme.colors.cardBackground,
                },
              ]}
              onPress={() => setSelectedPeriod(period)}
            >
              <Text
                style={[
                  styles.filterText,
                  { color: selectedPeriod === period ? 'white' : theme.colors.text },
                ]}
              >
                {period.charAt(0).toUpperCase() + period.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <TouchableOpacity style={[styles.filterButton, { backgroundColor: theme.colors.cardBackground }]}>
          <Filter size={20} color={theme.colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {renderMetricsCards()}
        {renderCohortTable()}
        {renderInsights()}

        <View style={[styles.chartCard, { backgroundColor: theme.colors.cardBackground }]}>
          <Text style={[styles.chartTitle, { color: theme.colors.text }]}>
            Retention Curve Comparison
          </Text>
          <View style={styles.chartPlaceholder}>
            <BarChart3 size={48} color={theme.colors.secondaryText} />
            <Text style={[styles.chartPlaceholderText, { color: theme.colors.secondaryText }]}>
              Interactive retention curves would appear here
            </Text>
          </View>
        </View>

        <View style={[styles.chartCard, { backgroundColor: theme.colors.cardBackground }]}>
          <Text style={[styles.chartTitle, { color: theme.colors.text }]}>
            Revenue by Cohort
          </Text>
          <View style={styles.chartPlaceholder}>
            <PieChart size={48} color={theme.colors.secondaryText} />
            <Text style={[styles.chartPlaceholderText, { color: theme.colors.secondaryText }]}>
              Revenue distribution chart would appear here
            </Text>
          </View>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
  },
  refreshButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterRow: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 16,
    gap: 12,
  },
  periodFilters: {
    flex: 1,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
  },
  filterButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 20,
  },
  metricCard: {
    width: (width - 52) / 2,
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  metricIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  metricValue: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  metricLabel: {
    fontSize: 12,
    marginBottom: 8,
  },
  metricChange: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  changeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  tableCard: {
    marginHorizontal: 20,
    padding: 16,
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  tableTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  iconButton: {
    padding: 8,
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableCell: {
    width: 80,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  headerCell: {
    backgroundColor: 'rgba(0,0,0,0.02)',
  },
  headerText: {
    fontSize: 12,
    fontWeight: '600',
  },
  cellText: {
    fontSize: 13,
  },
  insightsCard: {
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  insightsTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  insightItem: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 12,
  },
  insightIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  insightContent: {
    flex: 1,
  },
  insightText: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
    lineHeight: 20,
  },
  insightSubtext: {
    fontSize: 12,
    lineHeight: 16,
  },
  chartCard: {
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  chartPlaceholder: {
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  chartPlaceholderText: {
    fontSize: 14,
    textAlign: 'center',
  },
});
