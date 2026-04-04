import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import { BarChart3, TrendingUp, Users, DollarSign, Settings, Plus, Search, Filter, Calendar, Target } from 'lucide-react-native';

interface AnalyticsData {
  id: string;
  metric: string;
  value: string;
  change: number;
  period: string;
  trend: 'up' | 'down' | 'stable';
}

const mockAnalytics: AnalyticsData[] = [
  {
    id: '1',
    metric: 'Total Revenue',
    value: '$124,500',
    change: 12.5,
    period: 'vs last month',
    trend: 'up'
  },
  {
    id: '2',
    metric: 'Active Users',
    value: '8,432',
    change: -3.2,
    period: 'vs last week',
    trend: 'down'
  },
  {
    id: '3',
    metric: 'Conversion Rate',
    value: '3.8%',
    change: 0.5,
    period: 'vs last month',
    trend: 'up'
  },
  {
    id: '4',
    metric: 'Customer Satisfaction',
    value: '4.7/5',
    change: 0.2,
    period: 'vs last quarter',
    trend: 'up'
  }
];

interface ReportItem {
  id: string;
  name: string;
  type: 'sales' | 'marketing' | 'customer' | 'financial';
  lastUpdated: string;
  status: 'ready' | 'generating' | 'error';
}

const mockReports: ReportItem[] = [
  {
    id: '1',
    name: 'Monthly Sales Report',
    type: 'sales',
    lastUpdated: '2 hours ago',
    status: 'ready'
  },
  {
    id: '2',
    name: 'Marketing Campaign Analysis',
    type: 'marketing',
    lastUpdated: '1 day ago',
    status: 'ready'
  },
  {
    id: '3',
    name: 'Customer Behavior Insights',
    type: 'customer',
    lastUpdated: '3 hours ago',
    status: 'generating'
  },
  {
    id: '4',
    name: 'Financial Performance',
    type: 'financial',
    lastUpdated: '5 hours ago',
    status: 'ready'
  }
];

export default function ReportsInsightsScreen() {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const getTrendColor = (trend: AnalyticsData['trend']) => {
    switch (trend) {
      case 'up': return '#10B981';
      case 'down': return '#EF4444';
      case 'stable': return '#6B7280';
      default: return '#6B7280';
    }
  };

  const getTrendIcon = (trend: AnalyticsData['trend']) => {
    switch (trend) {
      case 'up': return <TrendingUp size={16} color="#10B981" />;
      case 'down': return <TrendingUp size={16} color="#EF4444" style={{ transform: [{ rotate: '180deg' }] }} />;
      case 'stable': return <BarChart3 size={16} color="#6B7280" />;
      default: return <BarChart3 size={16} color="#6B7280" />;
    }
  };

  const getTypeColor = (type: ReportItem['type']) => {
    switch (type) {
      case 'sales': return '#3B82F6';
      case 'marketing': return '#10B981';
      case 'customer': return '#F59E0B';
      case 'financial': return '#8B5CF6';
      default: return '#6B7280';
    }
  };

  const getStatusColor = (status: ReportItem['status']) => {
    switch (status) {
      case 'ready': return '#10B981';
      case 'generating': return '#F59E0B';
      case 'error': return '#EF4444';
      default: return '#6B7280';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen 
        options={{
          title: 'Reports & Insights',
          headerStyle: { backgroundColor: '#1F2937' },
          headerTintColor: '#FFFFFF',
        }} 
      />
      
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <Search size={20} color="#6B7280" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search reports..."
            placeholderTextColor="#6B7280"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        
        <View style={styles.filterContainer}>
          <TouchableOpacity style={styles.filterButton}>
            <Filter size={20} color="#3B82F6" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.addButton}>
            <Plus size={20} color="#FFFFFF" />
            <Text style={styles.addButtonText}>Create Report</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Key Metrics</Text>
          
          <View style={styles.metricsGrid}>
            {mockAnalytics.map((metric) => (
              <View key={metric.id} style={styles.metricCard}>
                <View style={styles.metricHeader}>
                  <Text style={styles.metricName}>{metric.metric}</Text>
                  {getTrendIcon(metric.trend)}
                </View>
                
                <Text style={styles.metricValue}>{metric.value}</Text>
                
                <View style={styles.metricChange}>
                  <Text style={[styles.changeText, { color: getTrendColor(metric.trend) }]}>
                    {metric.change > 0 ? '+' : ''}{metric.change}%
                  </Text>
                  <Text style={styles.changePeriod}>{metric.period}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Available Reports</Text>
          
          {mockReports.map((report) => (
            <TouchableOpacity key={report.id} style={styles.reportCard}>
              <View style={styles.reportHeader}>
                <View style={styles.reportInfo}>
                  <View style={styles.reportTitleContainer}>
                    <View style={[styles.typeIndicator, { backgroundColor: getTypeColor(report.type) }]} />
                    <Text style={styles.reportName}>{report.name}</Text>
                  </View>
                  <Text style={styles.reportType}>{report.type.toUpperCase()}</Text>
                </View>
                
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(report.status) }]}>
                  <Text style={styles.statusText}>{report.status.toUpperCase()}</Text>
                </View>
              </View>
              
              <View style={styles.reportDetails}>
                <View style={styles.detailItem}>
                  <Calendar size={16} color="#6B7280" />
                  <Text style={styles.detailText}>Last updated: {report.lastUpdated}</Text>
                </View>
              </View>
              
              <View style={styles.reportActions}>
                <TouchableOpacity style={styles.actionButton}>
                  <BarChart3 size={16} color="#3B82F6" />
                  <Text style={styles.actionText}>View</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.actionButton}>
                  <Target size={16} color="#10B981" />
                  <Text style={styles.actionText}>Export</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.actionButton}>
                  <Settings size={16} color="#6B7280" />
                  <Text style={styles.actionText}>Configure</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.quickActions}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          
          <View style={styles.actionGrid}>
            <TouchableOpacity style={styles.actionCard}>
              <BarChart3 size={24} color="#3B82F6" />
              <Text style={styles.actionCardText}>Sales Dashboard</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionCard}>
              <Users size={24} color="#10B981" />
              <Text style={styles.actionCardText}>Customer Analytics</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionCard}>
              <DollarSign size={24} color="#F59E0B" />
              <Text style={styles.actionCardText}>Revenue Report</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionCard}>
              <TrendingUp size={24} color="#8B5CF6" />
              <Text style={styles.actionCardText}>Performance Trends</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.insights}>
          <Text style={styles.sectionTitle}>AI Insights</Text>
          
          <View style={styles.insightsList}>
            <View style={styles.insightCard}>
              <View style={styles.insightIcon}>
                <TrendingUp size={20} color="#10B981" />
              </View>
              <View style={styles.insightContent}>
                <Text style={styles.insightTitle}>Revenue Growth Opportunity</Text>
                <Text style={styles.insightDescription}>
                  Your conversion rate increased by 15% this month. Consider scaling your marketing efforts.
                </Text>
              </View>
            </View>
            
            <View style={styles.insightCard}>
              <View style={styles.insightIcon}>
                <Users size={20} color="#3B82F6" />
              </View>
              <View style={styles.insightContent}>
                <Text style={styles.insightTitle}>Customer Retention Alert</Text>
                <Text style={styles.insightDescription}>
                  Customer churn rate is 5% higher than usual. Review your retention strategies.
                </Text>
              </View>
            </View>
            
            <View style={styles.insightCard}>
              <View style={styles.insightIcon}>
                <Target size={20} color="#F59E0B" />
              </View>
              <View style={styles.insightContent}>
                <Text style={styles.insightTitle}>Peak Performance Time</Text>
                <Text style={styles.insightDescription}>
                  Your team performs best between 10 AM - 2 PM. Schedule important tasks accordingly.
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: '#1F2937',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  filterButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#EBF4FF',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3B82F6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    marginLeft: 4,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 12,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  metricCard: {
    width: '48%',
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
  metricHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  metricName: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  metricValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  metricChange: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  changeText: {
    fontSize: 14,
    fontWeight: '600',
    marginRight: 4,
  },
  changePeriod: {
    fontSize: 12,
    color: '#6B7280',
  },
  reportCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  reportHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  reportInfo: {
    flex: 1,
  },
  reportTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  typeIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  reportName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  reportType: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
  },
  reportDetails: {
    marginBottom: 12,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#6B7280',
  },
  reportActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingTop: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
  },
  actionText: {
    marginLeft: 4,
    fontSize: 12,
    fontWeight: '500',
    color: '#4B5563',
  },
  quickActions: {
    marginBottom: 24,
  },
  actionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionCardText: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '500',
    color: '#1F2937',
    textAlign: 'center',
  },
  insights: {
    marginBottom: 24,
  },
  insightsList: {
    gap: 12,
  },
  insightCard: {
    flexDirection: 'row',
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
  insightIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  insightContent: {
    flex: 1,
  },
  insightTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  insightDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
});