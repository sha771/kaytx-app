import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Brain, Database, TrendingUp, RefreshCw, Search, Filter } from 'lucide-react-native';
import { api } from '@/lib/trpc';

export default function AgentBrainsDashboard() {
  const [allStatistics, setAllStatistics] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);

  useEffect(() => {
    fetchAllStatistics();
  }, []);

  const fetchAllStatistics = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await api.agentsBrain.getAllAgentStatistics.query();
      if (result.success) {
        setAllStatistics(result.statistics);
      }
    } catch (err) {
      setError('Failed to load brain statistics');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const calculateTotals = () => {
    if (!allStatistics) return { totalWikiPages: 0, totalSources: 0, totalTokenSavings: 0 };
    
    let totalWikiPages = 0;
    let totalSources = 0;
    let totalTokenSavings = 0;

    Object.values(allStatistics).forEach((stats: any) => {
      totalWikiPages += stats.totalWikiPages || 0;
      totalSources += stats.totalSources || 0;
      totalTokenSavings += stats.tokenSavings || 0;
    });

    return { totalWikiPages, totalSources, totalTokenSavings };
  };

  const totals = calculateTotals();

  const filteredStatistics = selectedDepartment
    ? Object.fromEntries(
        Object.entries(allStatistics || {}).filter(([agentId]) => 
          agentId.toLowerCase().includes(selectedDepartment.toLowerCase())
        )
      )
    : allStatistics;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Brain size={32} color="#007AFF" />
        <View style={styles.headerText}>
          <Text style={styles.title}>Agent Brains Dashboard</Text>
          <Text style={styles.subtitle}>Monitor all AI agent brain systems</Text>
        </View>
        <TouchableOpacity onPress={fetchAllStatistics} style={styles.refreshButton}>
          <RefreshCw size={20} color="#007AFF" />
        </TouchableOpacity>
      </View>

      {/* Summary Cards */}
      <View style={styles.summaryCards}>
        <View style={styles.summaryCard}>
          <Database size={24} color="#007AFF" />
          <View style={styles.summaryCardContent}>
            <Text style={styles.summaryValue}>{totals.totalWikiPages}</Text>
            <Text style={styles.summaryLabel}>Total Wiki Pages</Text>
          </View>
        </View>
        <View style={styles.summaryCard}>
          <Database size={24} color="#34C759" />
          <View style={styles.summaryCardContent}>
            <Text style={styles.summaryValue}>{totals.totalSources}</Text>
            <Text style={styles.summaryLabel}>Total Sources</Text>
          </View>
        </View>
        <View style={styles.summaryCard}>
          <TrendingUp size={24} color="#FF9500" />
          <View style={styles.summaryCardContent}>
            <Text style={styles.summaryValue}>{((totals.totalTokenSavings || 0) / 1000).toFixed(1)}k</Text>
            <Text style={styles.summaryLabel}>Tokens Saved</Text>
          </View>
        </View>
      </View>

      {/* Filter */}
      <View style={styles.filterSection}>
        <Filter size={20} color="#8E8E93" />
        <Text style={styles.filterLabel}>Filter by Department:</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
          <TouchableOpacity
            onPress={() => setSelectedDepartment(null)}
            style={[
              styles.filterChip,
              selectedDepartment === null && styles.filterChipActive
            ]}
          >
            <Text style={[
              styles.filterChipText,
              selectedDepartment === null && styles.filterChipTextActive
            ]}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSelectedDepartment('marketing')}
            style={[
              styles.filterChip,
              selectedDepartment === 'marketing' && styles.filterChipActive
            ]}
          >
            <Text style={[
              styles.filterChipText,
              selectedDepartment === 'marketing' && styles.filterChipTextActive
            ]}>Marketing</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSelectedDepartment('sales')}
            style={[
              styles.filterChip,
              selectedDepartment === 'sales' && styles.filterChipActive
            ]}
          >
            <Text style={[
              styles.filterChipText,
              selectedDepartment === 'sales' && styles.filterChipTextActive
            ]}>Sales</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSelectedDepartment('hr')}
            style={[
              styles.filterChip,
              selectedDepartment === 'hr' && styles.filterChipActive
            ]}
          >
            <Text style={[
              styles.filterChipText,
              selectedDepartment === 'hr' && styles.filterChipTextActive
            ]}>HR</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSelectedDepartment('finance')}
            style={[
              styles.filterChip,
              selectedDepartment === 'finance' && styles.filterChipActive
            ]}
          >
            <Text style={[
              styles.filterChipText,
              selectedDepartment === 'finance' && styles.filterChipTextActive
            ]}>Finance</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSelectedDepartment('operations')}
            style={[
              styles.filterChip,
              selectedDepartment === 'operations' && styles.filterChipActive
            ]}
          >
            <Text style={[
              styles.filterChipText,
              selectedDepartment === 'operations' && styles.filterChipTextActive
            ]}>Operations</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* Agent Brain List */}
      {loading ? (
        <View style={styles.centerContainer}>
          <Text style={styles.loadingText}>Loading brain statistics...</Text>
        </View>
      ) : error ? (
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity onPress={fetchAllStatistics} style={styles.retryButton}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : filteredStatistics && Object.keys(filteredStatistics).length > 0 ? (
        <View style={styles.brainList}>
          {Object.entries(filteredStatistics).map(([agentId, stats]: [string, any]) => (
            <View key={agentId} style={styles.brainCard}>
              <View style={styles.brainCardHeader}>
                <Brain size={24} color="#007AFF" />
                <View style={styles.brainCardTitle}>
                  <Text style={styles.agentId}>{agentId}</Text>
                  <Text style={styles.agentType}>{stats.agentType || 'General Agent'}</Text>
                </View>
                <View style={[
                  styles.statusBadge,
                  { backgroundColor: stats.status === 'healthy' ? '#34C75920' : '#FF950020' }
                ]}>
                  <Text style={[
                    styles.statusText,
                    { color: stats.status === 'healthy' ? '#34C759' : '#FF9500' }
                  ]}>
                    {stats.status || 'Active'}
                  </Text>
                </View>
              </View>

              <View style={styles.brainStats}>
                <View style={styles.brainStat}>
                  <Text style={styles.brainStatValue}>{stats.totalWikiPages || 0}</Text>
                  <Text style={styles.brainStatLabel}>Wiki Pages</Text>
                </View>
                <View style={styles.brainStat}>
                  <Text style={styles.brainStatValue}>{stats.totalSources || 0}</Text>
                  <Text style={styles.brainStatLabel}>Sources</Text>
                </View>
                <View style={styles.brainStat}>
                  <Text style={styles.brainStatValue}>{((stats.tokenSavings || 0) / 1000).toFixed(1)}k</Text>
                  <Text style={styles.brainStatLabel}>Tokens Saved</Text>
                </View>
              </View>

              {stats.lastUpdated && (
                <Text style={styles.lastUpdated}>
                  Last updated: {new Date(stats.lastUpdated).toLocaleString()}
                </Text>
              )}
            </View>
          ))}
        </View>
      ) : (
        <View style={styles.centerContainer}>
          <Database size={48} color="#8E8E93" />
          <Text style={styles.emptyText}>No agent brains found</Text>
          <Text style={styles.emptySubtext}>
            Initialize agent brains to see statistics here
          </Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F7',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  headerText: {
    flex: 1,
    marginLeft: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
  },
  subtitle: {
    fontSize: 14,
    color: '#8E8E93',
    marginTop: 2,
  },
  refreshButton: {
    padding: 8,
  },
  summaryCards: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
  },
  summaryCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  summaryCardContent: {
    marginLeft: 12,
  },
  summaryValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
  },
  summaryLabel: {
    fontSize: 12,
    color: '#8E8E93',
    marginTop: 2,
  },
  filterSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  filterLabel: {
    fontSize: 14,
    color: '#000000',
    marginLeft: 8,
    marginRight: 12,
  },
  filterScroll: {
    flex: 1,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F5F5F7',
    marginRight: 8,
  },
  filterChipActive: {
    backgroundColor: '#007AFF',
  },
  filterChipText: {
    fontSize: 14,
    color: '#000000',
    fontWeight: '600',
  },
  filterChipTextActive: {
    color: '#FFFFFF',
  },
  brainList: {
    padding: 16,
    gap: 12,
  },
  brainCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  brainCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  brainCardTitle: {
    flex: 1,
    marginLeft: 12,
  },
  agentId: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },
  agentType: {
    fontSize: 12,
    color: '#8E8E93',
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  brainStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    backgroundColor: '#F5F5F7',
    borderRadius: 8,
  },
  brainStat: {
    alignItems: 'center',
  },
  brainStatValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
  },
  brainStatLabel: {
    fontSize: 12,
    color: '#8E8E93',
    marginTop: 2,
  },
  lastUpdated: {
    fontSize: 12,
    color: '#8E8E93',
    marginTop: 12,
    textAlign: 'right',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  loadingText: {
    fontSize: 16,
    color: '#8E8E93',
  },
  errorText: {
    fontSize: 16,
    color: '#FF3B30',
    marginBottom: 16,
  },
  retryButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: '#007AFF',
    borderRadius: 8,
  },
  retryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#8E8E93',
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#8E8E93',
    marginTop: 8,
    textAlign: 'center',
  },
});
