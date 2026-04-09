 
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import { DollarSign, TrendingUp, TrendingDown, Target, Users, Calendar, BarChart3, PieChart } from 'lucide-react-native';

const salesData = [
  { id: 1, rep: 'John Smith', deals: 12, revenue: 145000, target: 120000, conversion: 24 },
  { id: 2, rep: 'Sarah Johnson', deals: 8, revenue: 98000, target: 100000, conversion: 18 },
  { id: 3, rep: 'Mike Wilson', deals: 15, revenue: 187000, target: 150000, conversion: 31 },
  { id: 4, rep: 'Emma Davis', deals: 6, revenue: 76000, target: 80000, conversion: 15 },
];

const pipelineStages = [
  { stage: 'Prospecting', count: 45, value: 450000, color: '#3B82F6' },
  { stage: 'Qualification', count: 32, value: 320000, color: '#10B981' },
  { stage: 'Proposal', count: 18, value: 540000, color: '#F59E0B' },
  { stage: 'Negotiation', count: 12, value: 360000, color: '#8B5CF6' },
  { stage: 'Closed Won', count: 8, value: 240000, color: '#059669' },
];

const recentDeals = [
  { id: 1, company: 'Tech Corp', value: 25000, stage: 'Closed Won', rep: 'John Smith', date: '2024-01-15' },
  { id: 2, company: 'Design Studio', value: 15000, stage: 'Negotiation', rep: 'Sarah Johnson', date: '2024-01-14' },
  { id: 3, company: 'Marketing Inc', value: 35000, stage: 'Proposal', rep: 'Mike Wilson', date: '2024-01-13' },
];

const salesMetrics = [
  { label: 'Total Revenue', value: '$506K', change: '+12%', trend: 'up' },
  { label: 'Active Deals', value: '115', change: '+8%', trend: 'up' },
  { label: 'Conversion Rate', value: '22%', change: '-2%', trend: 'down' },
  { label: 'Avg Deal Size', value: '$18.5K', change: '+5%', trend: 'up' },
];

export default function SalesManagementScreen() {
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'quarter' | 'year'>('month');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSalesData = salesData.filter(rep =>
    rep.rep.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStageColor = (stage: string) => {
    const stageData = pipelineStages.find(s => s.stage === stage);
    return stageData?.color || '#6B7280';
  };

  const getTrendIcon = (trend: string) => {
    return trend === 'up' ? TrendingUp : TrendingDown;
  };

  const getTrendColor = (trend: string) => {
    return trend === 'up' ? '#10B981' : '#EF4444';
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen 
        options={{
          title: 'Sales Management',
          headerStyle: { backgroundColor: '#059669' },
          headerTintColor: '#FFFFFF',
        }} 
      />
      
      <ScrollView style={styles.content}>
        {/* Period Selector */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sales Overview</Text>
          <View style={styles.periodSelector}>
            {['week', 'month', 'quarter', 'year'].map((period) => (
              <TouchableOpacity
                key={period}
                style={[styles.periodButton, selectedPeriod === period && styles.activePeriodButton]}
                onPress={() => setSelectedPeriod(period as any)}
              >
                <Text style={[styles.periodText, selectedPeriod === period && styles.activePeriodText]}>
                  {period.charAt(0).toUpperCase() + period.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Sales Metrics */}
        <View style={styles.section}>
          <View style={styles.metricsGrid}>
            {salesMetrics.map((metric, index) => {
              const TrendIcon = getTrendIcon(metric.trend);
              return (
                <View key={index} style={styles.metricCard}>
                  <View style={styles.metricHeader}>
                    <Text style={styles.metricValue}>{metric.value}</Text>
                    <View style={[styles.trendContainer, { backgroundColor: getTrendColor(metric.trend) + '20' }]}>
                      <TrendIcon size={16} color={getTrendColor(metric.trend)} />
                    </View>
                  </View>
                  <Text style={styles.metricLabel}>{metric.label}</Text>
                  <Text style={[styles.metricChange, { color: getTrendColor(metric.trend) }]}>
                    {metric.change}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>

        {/* Sales Pipeline */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sales Pipeline</Text>
          <View style={styles.pipelineContainer}>
            {pipelineStages.map((stage, index) => (
              <View key={index} style={styles.pipelineStage}>
                <View style={styles.stageHeader}>
                  <View style={[styles.stageIndicator, { backgroundColor: stage.color }]} />
                  <Text style={styles.stageName}>{stage.stage}</Text>
                </View>
                <Text style={styles.stageCount}>{stage.count} deals</Text>
                <Text style={styles.stageValue}>${(stage.value / 1000).toFixed(0)}K</Text>
                <View style={styles.stageBar}>
                  <View 
                    style={[
                      styles.stageProgress, 
                      { 
                        backgroundColor: stage.color,
                        width: `${(stage.count / 45) * 100}%`
                      }
                    ]} 
                  />
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Sales Team Performance */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Team Performance</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search sales reps..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          
          {filteredSalesData.map((rep) => (
            <View key={rep.id} style={styles.repCard}>
              <View style={styles.repHeader}>
                <View style={styles.repAvatar}>
                  <Text style={styles.repAvatarText}>{rep.rep.charAt(0)}</Text>
                </View>
                <View style={styles.repInfo}>
                  <Text style={styles.repName}>{rep.rep}</Text>
                  <Text style={styles.repDeals}>{rep.deals} active deals</Text>
                </View>
                <View style={styles.repTarget}>
                  <Text style={styles.targetProgress}>
                    {Math.round((rep.revenue / rep.target) * 100)}%
                  </Text>
                  <Text style={styles.targetLabel}>of target</Text>
                </View>
              </View>
              
              <View style={styles.repStats}>
                <View style={styles.repStat}>
                  <DollarSign size={16} color="#059669" />
                  <Text style={styles.statValue}>${(rep.revenue / 1000).toFixed(0)}K</Text>
                  <Text style={styles.statLabel}>Revenue</Text>
                </View>
                <View style={styles.repStat}>
                  <Target size={16} color="#3B82F6" />
                  <Text style={styles.statValue}>${(rep.target / 1000).toFixed(0)}K</Text>
                  <Text style={styles.statLabel}>Target</Text>
                </View>
                <View style={styles.repStat}>
                  <TrendingUp size={16} color="#F59E0B" />
                  <Text style={styles.statValue}>{rep.conversion}%</Text>
                  <Text style={styles.statLabel}>Conversion</Text>
                </View>
              </View>
              
              <View style={styles.progressBar}>
                <View 
                  style={[
                    styles.progressFill, 
                    { 
                      width: `${Math.min((rep.revenue / rep.target) * 100, 100)}%`,
                      backgroundColor: rep.revenue >= rep.target ? '#10B981' : '#3B82F6'
                    }
                  ]} 
                />
              </View>
            </View>
          ))}
        </View>

        {/* Recent Deals */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Deals</Text>
          {recentDeals.map((deal) => (
            <View key={deal.id} style={styles.dealCard}>
              <View style={styles.dealHeader}>
                <Text style={styles.dealCompany}>{deal.company}</Text>
                <Text style={styles.dealValue}>${deal.value.toLocaleString()}</Text>
              </View>
              <View style={styles.dealMeta}>
                <View style={[styles.dealStage, { backgroundColor: getStageColor(deal.stage) }]}>
                  <Text style={styles.dealStageText}>{deal.stage}</Text>
                </View>
                <Text style={styles.dealRep}>{deal.rep}</Text>
                <Text style={styles.dealDate}>{deal.date}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionGrid}>
            <TouchableOpacity style={styles.actionButton}>
              <Users size={24} color="#059669" />
              <Text style={styles.actionText}>Add Lead</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Calendar size={24} color="#059669" />
              <Text style={styles.actionText}>Schedule Call</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <BarChart3 size={24} color="#059669" />
              <Text style={styles.actionText}>View Reports</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <PieChart size={24} color="#059669" />
              <Text style={styles.actionText}>Analytics</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  periodSelector: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 4,
  },
  periodButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 8,
  },
  activePeriodButton: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  periodText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  activePeriodText: {
    color: '#059669',
    fontWeight: '600',
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  metricCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    flex: 1,
    minWidth: '45%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  metricHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  metricValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  trendContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  metricLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  metricChange: {
    fontSize: 14,
    fontWeight: '600',
  },
  pipelineContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  pipelineStage: {
    marginBottom: 16,
  },
  stageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  stageIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  stageName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  stageCount: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  stageValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  stageBar: {
    height: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 3,
  },
  stageProgress: {
    height: '100%',
    borderRadius: 3,
  },
  searchInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 16,
  },
  repCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  repHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  repAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#059669',
    alignItems: 'center',
    justifyContent: 'center',
  },
  repAvatarText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  repInfo: {
    flex: 1,
  },
  repName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  repDeals: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  repTarget: {
    alignItems: 'flex-end',
  },
  targetProgress: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#059669',
  },
  targetLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  repStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  repStat: {
    alignItems: 'center',
    gap: 4,
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  progressBar: {
    height: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 3,
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  dealCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  dealHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  dealCompany: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  dealValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#059669',
  },
  dealMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  dealStage: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  dealStageText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  dealRep: {
    fontSize: 14,
    color: '#6B7280',
  },
  dealDate: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  actionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  actionButton: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    flex: 1,
    minWidth: '45%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginTop: 8,
  },
});