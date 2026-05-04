 
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import { DollarSign, TrendingUp, Calendar, ChartBar, Target, ArrowUp, ArrowDown } from 'lucide-react-native';

interface RevenueData {
  id: string;
  period: string;
  revenue: number;
  growth: number;
  target: number;
}

interface RevenueSource {
  id: string;
  name: string;
  revenue: number;
  percentage: number;
  color: string;
}

export default function RevenueTracking() {
  const [activeTab, setActiveTab] = useState<'overview' | 'sources' | 'forecast'>('overview');
  const [timePeriod, setTimePeriod] = useState<'monthly' | 'quarterly' | 'yearly'>('monthly');
  const [revenueData] = useState<RevenueData[]>([
    { id: '1', period: 'Jan 2024', revenue: 125000, growth: 12.5, target: 120000 },
    { id: '2', period: 'Feb 2024', revenue: 138000, growth: 10.4, target: 130000 },
    { id: '3', period: 'Mar 2024', revenue: 142000, growth: 2.9, target: 135000 },
    { id: '4', period: 'Apr 2024', revenue: 156000, growth: 9.9, target: 145000 },
  ]);
  const [revenueSources] = useState<RevenueSource[]>([
    { id: '1', name: 'Software Licenses', revenue: 85000, percentage: 54.5, color: '#4ecdc4' },
    { id: '2', name: 'Consulting Services', revenue: 35000, percentage: 22.4, color: '#45b7d1' },
    { id: '3', name: 'Support & Maintenance', revenue: 25000, percentage: 16.0, color: '#f39c12' },
    { id: '4', name: 'Training', revenue: 11000, percentage: 7.1, color: '#e74c3c' },
  ]);

  const formatCurrency = (amount: number) => {
    if (!amount || typeof amount !== 'number') return '$0';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const totalRevenue = revenueData.reduce((sum, item) => sum + item.revenue, 0);
  const averageGrowth = revenueData.reduce((sum, item) => sum + item.growth, 0) / revenueData.length;

  const renderOverview = () => (
    <View style={styles.tabContent}>
      <View style={styles.metricsGrid}>
        <View style={styles.metricCard}>
          <DollarSign size={24} color="#4ecdc4" />
          <Text style={styles.metricValue}>{formatCurrency(totalRevenue)}</Text>
          <Text style={styles.metricLabel}>Total Revenue</Text>
          <View style={styles.metricChange}>
            <ArrowUp size={16} color="#27ae60" />
            <Text style={styles.changeText}>+{averageGrowth.toFixed(1)}%</Text>
          </View>
        </View>
        <View style={styles.metricCard}>
          <Target size={24} color="#45b7d1" />
          <Text style={styles.metricValue}>{formatCurrency(530000)}</Text>
          <Text style={styles.metricLabel}>Target Revenue</Text>
          <View style={styles.metricChange}>
            <ArrowUp size={16} color="#27ae60" />
            <Text style={styles.changeText}>+5.2%</Text>
          </View>
        </View>
        <View style={styles.metricCard}>
          <TrendingUp size={24} color="#f39c12" />
          <Text style={styles.metricValue}>{formatCurrency(156000)}</Text>
          <Text style={styles.metricLabel}>This Month</Text>
          <View style={styles.metricChange}>
            <ArrowUp size={16} color="#27ae60" />
            <Text style={styles.changeText}>+9.9%</Text>
          </View>
        </View>
        <View style={styles.metricCard}>
          <ChartBar size={24} color="#e74c3c" />
          <Text style={styles.metricValue}>{formatCurrency(39000)}</Text>
          <Text style={styles.metricLabel}>Monthly Avg</Text>
          <View style={styles.metricChange}>
            <ArrowUp size={16} color="#27ae60" />
            <Text style={styles.changeText}>+8.7%</Text>
          </View>
        </View>
      </View>

      <View style={styles.periodSelector}>
        <TouchableOpacity 
          style={[styles.periodButton, timePeriod === 'monthly' && styles.activePeriod]}
          onPress={() => setTimePeriod('monthly')}
        >
          <Text style={[styles.periodText, timePeriod === 'monthly' && styles.activePeriodText]}>Monthly</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.periodButton, timePeriod === 'quarterly' && styles.activePeriod]}
          onPress={() => setTimePeriod('quarterly')}
        >
          <Text style={[styles.periodText, timePeriod === 'quarterly' && styles.activePeriodText]}>Quarterly</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.periodButton, timePeriod === 'yearly' && styles.activePeriod]}
          onPress={() => setTimePeriod('yearly')}
        >
          <Text style={[styles.periodText, timePeriod === 'yearly' && styles.activePeriodText]}>Yearly</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.revenueChart}>
        <Text style={styles.sectionTitle}>Revenue Trend</Text>
        <View style={styles.chartContainer}>
          {revenueData.map((item, index) => (
            <View key={item.id} style={styles.chartBar}>
              <View style={styles.barContainer}>
                <View 
                  style={[
                    styles.revenueBar, 
                    { height: `${(item.revenue / 160000) * 100}%` }
                  ]} 
                />
                <View 
                  style={[
                    styles.targetLine, 
                    { bottom: `${(item.target / 160000) * 100}%` }
                  ]} 
                />
              </View>
              <Text style={styles.barLabel}>{item.period.split(' ')[0]}</Text>
              <Text style={styles.barValue}>{formatCurrency(item.revenue)}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );

  const renderSources = () => (
    <View style={styles.tabContent}>
      <View style={styles.sourcesHeader}>
        <Text style={styles.sectionTitle}>Revenue Sources</Text>
        <Text style={styles.totalRevenueText}>{formatCurrency(156000)} total</Text>
      </View>

      <View style={styles.sourcesList}>
        {revenueSources.map((source) => (
          <View key={source.id} style={styles.sourceCard}>
            <View style={styles.sourceHeader}>
              <View style={styles.sourceInfo}>
                <View style={[styles.sourceIndicator, { backgroundColor: source.color }]} />
                <Text style={styles.sourceName}>{source.name}</Text>
              </View>
              <Text style={styles.sourceRevenue}>{formatCurrency(source.revenue)}</Text>
            </View>
            <View style={styles.sourceProgress}>
              <View style={styles.progressBar}>
                <View 
                  style={[
                    styles.progressFill, 
                    { 
                      width: `${source.percentage}%`,
                      backgroundColor: source.color 
                    }
                  ]} 
                />
              </View>
              <Text style={styles.sourcePercentage}>{source.percentage}%</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.sourceAnalytics}>
        <Text style={styles.sectionTitle}>Source Performance</Text>
        <View style={styles.analyticsGrid}>
          <View style={styles.analyticsItem}>
            <Text style={styles.analyticsLabel}>Top Performer</Text>
            <Text style={styles.analyticsValue}>Software Licenses</Text>
          </View>
          <View style={styles.analyticsItem}>
            <Text style={styles.analyticsLabel}>Fastest Growing</Text>
            <Text style={styles.analyticsValue}>Consulting (+15%)</Text>
          </View>
          <View style={styles.analyticsItem}>
            <Text style={styles.analyticsLabel}>Most Consistent</Text>
            <Text style={styles.analyticsValue}>Support & Maintenance</Text>
          </View>
        </View>
      </View>
    </View>
  );

  const renderForecast = () => (
    <View style={styles.tabContent}>
      <View style={styles.forecastHeader}>
        <Text style={styles.sectionTitle}>Revenue Forecast</Text>
        <TouchableOpacity style={styles.forecastButton}>
          <Text style={styles.forecastButtonText}>Update Forecast</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.forecastMetrics}>
        <View style={styles.forecastCard}>
          <Text style={styles.forecastLabel}>Next Month Projection</Text>
          <Text style={styles.forecastValue}>{formatCurrency(168000)}</Text>
          <Text style={styles.forecastChange}>+7.7% growth expected</Text>
        </View>
        <View style={styles.forecastCard}>
          <Text style={styles.forecastLabel}>Quarter End Target</Text>
          <Text style={styles.forecastValue}>{formatCurrency(485000)}</Text>
          <Text style={styles.forecastChange}>92% of target achieved</Text>
        </View>
      </View>

      <View style={styles.forecastChart}>
        <Text style={styles.chartTitle}>6-Month Forecast</Text>
        <View style={styles.chartPlaceholder}>
          <Text style={styles.chartText}>Forecast chart visualization would go here</Text>
        </View>
      </View>

      <View style={styles.forecastFactors}>
        <Text style={styles.sectionTitle}>Forecast Factors</Text>
        <View style={styles.factorsList}>
          <View style={styles.factorItem}>
            <View style={styles.factorIcon}>
              <TrendingUp size={16} color="#27ae60" />
            </View>
            <View style={styles.factorInfo}>
              <Text style={styles.factorName}>Seasonal Trends</Text>
              <Text style={styles.factorDescription}>Q2 typically shows 15% increase</Text>
            </View>
            <Text style={styles.factorImpact}>+15%</Text>
          </View>
          <View style={styles.factorItem}>
            <View style={styles.factorIcon}>
              <Target size={16} color="#45b7d1" />
            </View>
            <View style={styles.factorInfo}>
              <Text style={styles.factorName}>New Product Launch</Text>
              <Text style={styles.factorDescription}>Expected to boost revenue</Text>
            </View>
            <Text style={styles.factorImpact}>+8%</Text>
          </View>
          <View style={styles.factorItem}>
            <View style={styles.factorIcon}>
              <ChartBar size={16} color="#f39c12" />
            </View>
            <View style={styles.factorInfo}>
              <Text style={styles.factorName}>Market Conditions</Text>
              <Text style={styles.factorDescription}>Stable growth environment</Text>
            </View>
            <Text style={styles.factorImpact}>+3%</Text>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen 
        options={{
          title: 'Revenue Tracking',
          headerStyle: { backgroundColor: '#1a1a1a' },
          headerTintColor: '#fff',
        }} 
      />
      
      <View style={styles.tabBar}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'overview' && styles.activeTab]}
          onPress={() => setActiveTab('overview')}
        >
          <ChartBar size={20} color={activeTab === 'overview' ? '#4ecdc4' : '#666'} />
          <Text style={[styles.tabText, activeTab === 'overview' && styles.activeTabText]}>Overview</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'sources' && styles.activeTab]}
          onPress={() => setActiveTab('sources')}
        >
          <DollarSign size={20} color={activeTab === 'sources' ? '#4ecdc4' : '#666'} />
          <Text style={[styles.tabText, activeTab === 'sources' && styles.activeTabText]}>Sources</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'forecast' && styles.activeTab]}
          onPress={() => setActiveTab('forecast')}
        >
          <TrendingUp size={20} color={activeTab === 'forecast' ? '#4ecdc4' : '#666'} />
          <Text style={[styles.tabText, activeTab === 'forecast' && styles.activeTabText]}>Forecast</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'sources' && renderSources()}
        {activeTab === 'forecast' && renderForecast()}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#1a1a1a',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginHorizontal: 4,
  },
  activeTab: {
    backgroundColor: '#2a2a2a',
  },
  tabText: {
    color: '#666',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 8,
  },
  activeTabText: {
    color: '#4ecdc4',
  },
  content: {
    flex: 1,
  },
  tabContent: {
    padding: 16,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  metricCard: {
    backgroundColor: '#1a1a1a',
    padding: 16,
    borderRadius: 12,
    width: '48%',
    marginBottom: 12,
    alignItems: 'center',
  },
  metricValue: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    marginTop: 8,
  },
  metricLabel: {
    color: '#666',
    fontSize: 12,
    marginTop: 4,
  },
  metricChange: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  changeText: {
    color: '#27ae60',
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 4,
  },
  periodSelector: {
    flexDirection: 'row',
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
    padding: 4,
    marginBottom: 24,
  },
  periodButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 6,
  },
  activePeriod: {
    backgroundColor: '#4ecdc4',
  },
  periodText: {
    color: '#666',
    fontSize: 14,
    fontWeight: '500',
  },
  activePeriodText: {
    color: '#fff',
  },
  revenueChart: {
    backgroundColor: '#1a1a1a',
    padding: 16,
    borderRadius: 12,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  chartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    height: 200,
    paddingTop: 20,
  },
  chartBar: {
    alignItems: 'center',
    flex: 1,
  },
  barContainer: {
    position: 'relative',
    width: 40,
    height: 150,
    justifyContent: 'flex-end',
  },
  revenueBar: {
    backgroundColor: '#4ecdc4',
    width: '100%',
    borderRadius: 4,
  },
  targetLine: {
    position: 'absolute',
    width: '100%',
    height: 2,
    backgroundColor: '#f39c12',
  },
  barLabel: {
    color: '#666',
    fontSize: 12,
    marginTop: 8,
  },
  barValue: {
    color: '#fff',
    fontSize: 10,
    marginTop: 4,
  },
  sourcesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  totalRevenueText: {
    color: '#4ecdc4',
    fontSize: 16,
    fontWeight: '600',
  },
  sourcesList: {
    marginBottom: 24,
  },
  sourceCard: {
    backgroundColor: '#1a1a1a',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  sourceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sourceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  sourceIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
  },
  sourceName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  sourceRevenue: {
    color: '#4ecdc4',
    fontSize: 16,
    fontWeight: '700',
  },
  sourceProgress: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: '#2a2a2a',
    borderRadius: 3,
    marginRight: 12,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  sourcePercentage: {
    color: '#666',
    fontSize: 14,
    fontWeight: '500',
  },
  sourceAnalytics: {
    backgroundColor: '#1a1a1a',
    padding: 16,
    borderRadius: 12,
  },
  analyticsGrid: {
    gap: 12,
  },
  analyticsItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  analyticsLabel: {
    color: '#666',
    fontSize: 14,
  },
  analyticsValue: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  forecastHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  forecastButton: {
    backgroundColor: '#4ecdc4',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  forecastButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  forecastMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  forecastCard: {
    backgroundColor: '#1a1a1a',
    padding: 16,
    borderRadius: 12,
    flex: 1,
    marginHorizontal: 6,
    alignItems: 'center',
  },
  forecastLabel: {
    color: '#666',
    fontSize: 14,
    marginBottom: 8,
  },
  forecastValue: {
    color: '#4ecdc4',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  forecastChange: {
    color: '#27ae60',
    fontSize: 12,
  },
  forecastChart: {
    backgroundColor: '#1a1a1a',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  chartTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
  },
  chartPlaceholder: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
  },
  chartText: {
    color: '#666',
    fontSize: 16,
  },
  forecastFactors: {
    backgroundColor: '#1a1a1a',
    padding: 16,
    borderRadius: 12,
  },
  factorsList: {
    gap: 12,
  },
  factorItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  factorIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#2a2a2a',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  factorInfo: {
    flex: 1,
  },
  factorName: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  factorDescription: {
    color: '#666',
    fontSize: 12,
    marginTop: 2,
  },
  factorImpact: {
    color: '#27ae60',
    fontSize: 14,
    fontWeight: '600',
  },
});
