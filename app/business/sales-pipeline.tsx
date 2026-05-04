 
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import { TrendingUp, DollarSign, Target, Users, ChartBar, Calendar, ListFilter } from 'lucide-react-native';

interface SalesPipelineStage {
  id: string;
  name: string;
  deals: number;
  value: number;
  color: string;
}

interface Deal {
  id: string;
  name: string;
  company: string;
  value: number;
  stage: string;
  probability: number;
  closeDate: string;
  owner: string;
}

export default function SalesPipeline() {
  const [activeTab, setActiveTab] = useState<'pipeline' | 'deals' | 'analytics'>('pipeline');
  const [pipelineStages] = useState<SalesPipelineStage[]>([
    { id: '1', name: 'Prospecting', deals: 12, value: 145000, color: '#3498db' },
    { id: '2', name: 'Qualification', deals: 8, value: 98000, color: '#9b59b6' },
    { id: '3', name: 'Proposal', deals: 5, value: 75000, color: '#f39c12' },
    { id: '4', name: 'Negotiation', deals: 3, value: 45000, color: '#e67e22' },
    { id: '5', name: 'Closed Won', deals: 7, value: 125000, color: '#27ae60' },
  ]);
  const [deals] = useState<Deal[]>([
    { id: '1', name: 'Enterprise Software License', company: 'TechCorp Inc', value: 25000, stage: 'Proposal', probability: 75, closeDate: '2024-02-15', owner: 'John Doe' },
    { id: '2', name: 'Marketing Automation Setup', company: 'StartupXYZ', value: 15000, stage: 'Qualification', probability: 60, closeDate: '2024-02-20', owner: 'Jane Smith' },
    { id: '3', name: 'CRM Implementation', company: 'BigCorp Ltd', value: 35000, stage: 'Negotiation', probability: 85, closeDate: '2024-02-10', owner: 'Mike Johnson' },
    { id: '4', name: 'Consulting Services', company: 'MediumBiz', value: 12000, stage: 'Prospecting', probability: 30, closeDate: '2024-03-01', owner: 'Sarah Wilson' },
  ]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getProbabilityColor = (probability: number) => {
    if (probability >= 80) return '#27ae60';
    if (probability >= 60) return '#f39c12';
    if (probability >= 40) return '#e67e22';
    return '#e74c3c';
  };

  const renderPipeline = () => (
    <View style={styles.tabContent}>
      <View style={styles.pipelineOverview}>
        <View style={styles.overviewStats}>
          <View style={styles.overviewStat}>
            <DollarSign size={24} color="#4ecdc4" />
            <Text style={styles.overviewValue}>{formatCurrency(488000)}</Text>
            <Text style={styles.overviewLabel}>Total Pipeline</Text>
          </View>
          <View style={styles.overviewStat}>
            <Target size={24} color="#45b7d1" />
            <Text style={styles.overviewValue}>35</Text>
            <Text style={styles.overviewLabel}>Active Deals</Text>
          </View>
          <View style={styles.overviewStat}>
            <TrendingUp size={24} color="#f39c12" />
            <Text style={styles.overviewValue}>68%</Text>
            <Text style={styles.overviewLabel}>Win Rate</Text>
          </View>
        </View>
      </View>

      <View style={styles.pipelineStages}>
        <Text style={styles.sectionTitle}>Pipeline Stages</Text>
        {pipelineStages.map((stage) => (
          <View key={stage.id} style={styles.stageCard}>
            <View style={styles.stageHeader}>
              <View style={styles.stageInfo}>
                <View style={[styles.stageIndicator, { backgroundColor: stage.color }]} />
                <Text style={styles.stageName}>{stage.name}</Text>
              </View>
              <Text style={styles.stageValue}>{formatCurrency(stage.value)}</Text>
            </View>
            <View style={styles.stageStats}>
              <Text style={styles.stageDeals}>{stage.deals} deals</Text>
              <View style={styles.stageProgress}>
                <View 
                  style={[
                    styles.stageProgressFill, 
                    { 
                      width: `${(stage.value / 145000) * 100}%`,
                      backgroundColor: stage.color 
                    }
                  ]} 
                />
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  const renderDeals = () => (
    <View style={styles.tabContent}>
      <View style={styles.dealsHeader}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search deals..."
            placeholderTextColor="#666"
          />
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <ListFilter size={16} color="#4ecdc4" />
        </TouchableOpacity>
      </View>

      <View style={styles.dealsList}>
        {deals.map((deal) => (
          <View key={deal.id} style={styles.dealCard}>
            <View style={styles.dealHeader}>
              <View style={styles.dealInfo}>
                <Text style={styles.dealName}>{deal.name}</Text>
                <Text style={styles.dealCompany}>{deal.company}</Text>
              </View>
              <Text style={styles.dealValue}>{formatCurrency(deal.value)}</Text>
            </View>
            
            <View style={styles.dealDetails}>
              <View style={styles.dealMeta}>
                <Text style={styles.dealStage}>{deal.stage}</Text>
                <Text style={styles.dealOwner}>Owner: {deal.owner}</Text>
              </View>
              <Text style={styles.dealCloseDate}>Close: {deal.closeDate}</Text>
            </View>

            <View style={styles.probabilityContainer}>
              <Text style={styles.probabilityLabel}>Probability</Text>
              <View style={styles.probabilityBar}>
                <View 
                  style={[
                    styles.probabilityFill, 
                    { 
                      width: `${deal.probability}%`,
                      backgroundColor: getProbabilityColor(deal.probability)
                    }
                  ]} 
                />
              </View>
              <Text style={[
                styles.probabilityText,
                { color: getProbabilityColor(deal.probability) }
              ]}>
                {deal.probability}%
              </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  const renderAnalytics = () => (
    <View style={styles.tabContent}>
      <View style={styles.analyticsGrid}>
        <View style={styles.analyticsCard}>
          <Text style={styles.analyticsTitle}>Conversion Rate</Text>
          <Text style={styles.analyticsValue}>24.5%</Text>
          <Text style={styles.analyticsChange}>+2.3% from last month</Text>
        </View>
        <View style={styles.analyticsCard}>
          <Text style={styles.analyticsTitle}>Avg Deal Size</Text>
          <Text style={styles.analyticsValue}>{formatCurrency(18500)}</Text>
          <Text style={styles.analyticsChange}>+5.1% from last month</Text>
        </View>
        <View style={styles.analyticsCard}>
          <Text style={styles.analyticsTitle}>Sales Cycle</Text>
          <Text style={styles.analyticsValue}>45 days</Text>
          <Text style={styles.analyticsChange}>-3 days from last month</Text>
        </View>
        <View style={styles.analyticsCard}>
          <Text style={styles.analyticsTitle}>Monthly Revenue</Text>
          <Text style={styles.analyticsValue}>{formatCurrency(125000)}</Text>
          <Text style={styles.analyticsChange}>+12.8% from last month</Text>
        </View>
      </View>

      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Pipeline Velocity</Text>
        <View style={styles.chartPlaceholder}>
          <Text style={styles.chartText}>Pipeline velocity chart would go here</Text>
        </View>
      </View>

      <View style={styles.topPerformers}>
        <Text style={styles.sectionTitle}>Top Performers</Text>
        <View style={styles.performersList}>
          {['John Doe', 'Jane Smith', 'Mike Johnson'].map((performer, index) => (
            <View key={performer} style={styles.performerItem}>
              <View style={styles.performerRank}>
                <Text style={styles.rankNumber}>{index + 1}</Text>
              </View>
              <Text style={styles.performerName}>{performer}</Text>
              <Text style={styles.performerValue}>{formatCurrency(45000 - (index * 5000))}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen 
        options={{
          title: 'Sales Pipeline',
          headerStyle: { backgroundColor: '#1a1a1a' },
          headerTintColor: '#fff',
        }} 
      />
      
      <View style={styles.tabBar}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'pipeline' && styles.activeTab]}
          onPress={() => setActiveTab('pipeline')}
        >
          <ChartBar size={20} color={activeTab === 'pipeline' ? '#4ecdc4' : '#666'} />
          <Text style={[styles.tabText, activeTab === 'pipeline' && styles.activeTabText]}>Pipeline</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'deals' && styles.activeTab]}
          onPress={() => setActiveTab('deals')}
        >
          <Target size={20} color={activeTab === 'deals' ? '#4ecdc4' : '#666'} />
          <Text style={[styles.tabText, activeTab === 'deals' && styles.activeTabText]}>Deals</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'analytics' && styles.activeTab]}
          onPress={() => setActiveTab('analytics')}
        >
          <TrendingUp size={20} color={activeTab === 'analytics' ? '#4ecdc4' : '#666'} />
          <Text style={[styles.tabText, activeTab === 'analytics' && styles.activeTabText]}>Analytics</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {activeTab === 'pipeline' && renderPipeline()}
        {activeTab === 'deals' && renderDeals()}
        {activeTab === 'analytics' && renderAnalytics()}
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
  pipelineOverview: {
    backgroundColor: '#1a1a1a',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  overviewStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  overviewStat: {
    alignItems: 'center',
  },
  overviewValue: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
    marginTop: 8,
  },
  overviewLabel: {
    color: '#666',
    fontSize: 12,
    marginTop: 4,
  },
  pipelineStages: {
    marginBottom: 24,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  stageCard: {
    backgroundColor: '#1a1a1a',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  stageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  stageInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stageIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
  },
  stageName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  stageValue: {
    color: '#4ecdc4',
    fontSize: 16,
    fontWeight: '700',
  },
  stageStats: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  stageDeals: {
    color: '#666',
    fontSize: 14,
  },
  stageProgress: {
    flex: 1,
    height: 6,
    backgroundColor: '#2a2a2a',
    borderRadius: 3,
    marginLeft: 16,
    overflow: 'hidden',
  },
  stageProgressFill: {
    height: '100%',
    borderRadius: 3,
  },
  dealsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  searchContainer: {
    flex: 1,
    marginRight: 12,
  },
  searchInput: {
    backgroundColor: '#1a1a1a',
    color: '#fff',
    padding: 12,
    borderRadius: 8,
  },
  filterButton: {
    backgroundColor: '#1a1a1a',
    padding: 12,
    borderRadius: 8,
  },
  dealsList: {
    gap: 12,
  },
  dealCard: {
    backgroundColor: '#1a1a1a',
    padding: 16,
    borderRadius: 12,
  },
  dealHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  dealInfo: {
    flex: 1,
  },
  dealName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  dealCompany: {
    color: '#666',
    fontSize: 14,
    marginTop: 2,
  },
  dealValue: {
    color: '#4ecdc4',
    fontSize: 16,
    fontWeight: '700',
  },
  dealDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  dealMeta: {
    flex: 1,
  },
  dealStage: {
    color: '#45b7d1',
    fontSize: 14,
    fontWeight: '500',
  },
  dealOwner: {
    color: '#666',
    fontSize: 12,
    marginTop: 2,
  },
  dealCloseDate: {
    color: '#666',
    fontSize: 14,
  },
  probabilityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  probabilityLabel: {
    color: '#666',
    fontSize: 12,
    marginRight: 8,
  },
  probabilityBar: {
    flex: 1,
    height: 6,
    backgroundColor: '#2a2a2a',
    borderRadius: 3,
    marginRight: 8,
    overflow: 'hidden',
  },
  probabilityFill: {
    height: '100%',
    borderRadius: 3,
  },
  probabilityText: {
    fontSize: 12,
    fontWeight: '600',
  },
  analyticsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  analyticsCard: {
    backgroundColor: '#1a1a1a',
    padding: 16,
    borderRadius: 12,
    width: '48%',
    marginBottom: 12,
  },
  analyticsTitle: {
    color: '#666',
    fontSize: 14,
    marginBottom: 8,
  },
  analyticsValue: {
    color: '#4ecdc4',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  analyticsChange: {
    color: '#27ae60',
    fontSize: 12,
  },
  chartContainer: {
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
  topPerformers: {
    backgroundColor: '#1a1a1a',
    padding: 16,
    borderRadius: 12,
  },
  performersList: {
    gap: 12,
  },
  performerItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  performerRank: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#4ecdc4',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  rankNumber: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
  performerName: {
    color: '#fff',
    fontSize: 16,
    flex: 1,
  },
  performerValue: {
    color: '#4ecdc4',
    fontSize: 16,
    fontWeight: '600',
  },
});
