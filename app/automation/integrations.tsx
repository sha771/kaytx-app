 
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import { Link, Zap, Settings, ChartBar, Plus, CircleCheck, CircleAlert } from 'lucide-react-native';

interface Integration {
  id: string;
  name: string;
  description: string;
  category: string;
  isConnected: boolean;
  icon: string;
  status: 'active' | 'inactive' | 'error';
  lastSync: string;
}

interface IntegrationCategory {
  id: string;
  name: string;
  count: number;
}

export default function Integrations() {
  const [activeTab, setActiveTab] = useState<'all' | 'connected' | 'available'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [integrations] = useState<Integration[]>([
    { id: '1', name: 'Slack', description: 'Team communication and notifications', category: 'Communication', isConnected: true, icon: '💬', status: 'active', lastSync: '2 minutes ago' },
    { id: '2', name: 'Google Calendar', description: 'Schedule meetings and events', category: 'Productivity', isConnected: true, icon: '📅', status: 'active', lastSync: '5 minutes ago' },
    { id: '3', name: 'Salesforce', description: 'CRM and sales management', category: 'CRM', isConnected: false, icon: '☁️', status: 'inactive', lastSync: 'Never' },
    { id: '4', name: 'Mailchimp', description: 'Email marketing campaigns', category: 'Marketing', isConnected: true, icon: '📧', status: 'error', lastSync: '1 hour ago' },
    { id: '5', name: 'Zapier', description: 'Workflow automation', category: 'Automation', isConnected: false, icon: '⚡', status: 'inactive', lastSync: 'Never' },
    { id: '6', name: 'HubSpot', description: 'Marketing and sales platform', category: 'CRM', isConnected: true, icon: '🎯', status: 'active', lastSync: '10 minutes ago' },
  ]);
  const [categories] = useState<IntegrationCategory[]>([
    { id: 'all', name: 'All', count: 6 },
    { id: 'communication', name: 'Communication', count: 1 },
    { id: 'productivity', name: 'Productivity', count: 1 },
    { id: 'crm', name: 'CRM', count: 2 },
    { id: 'marketing', name: 'Marketing', count: 1 },
    { id: 'automation', name: 'Automation', count: 1 },
  ]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CircleCheck size={16} color="#27ae60" />;
      case 'error': return <CircleAlert size={16} color="#e74c3c" />;
      default: return <CircleAlert size={16} color="#95a5a6" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#27ae60';
      case 'error': return '#e74c3c';
      default: return '#95a5a6';
    }
  };

  const filteredIntegrations = integrations.filter(integration => {
    const categoryMatch = selectedCategory === 'all' || integration.category.toLowerCase() === selectedCategory;
    const tabMatch = activeTab === 'all' || 
                    (activeTab === 'connected' && integration.isConnected) ||
                    (activeTab === 'available' && !integration.isConnected);
    return categoryMatch && tabMatch;
  });

  const renderIntegrationCard = (integration: Integration) => (
    <View key={integration.id} style={styles.integrationCard}>
      <View style={styles.integrationHeader}>
        <View style={styles.integrationInfo}>
          <Text style={styles.integrationIcon}>{integration.icon}</Text>
          <View style={styles.integrationDetails}>
            <Text style={styles.integrationName}>{integration.name}</Text>
            <Text style={styles.integrationDescription}>{integration.description}</Text>
          </View>
        </View>
        <View style={styles.integrationActions}>
          {getStatusIcon(integration.status)}
          <TouchableOpacity 
            style={[
              styles.connectButton, 
              { backgroundColor: integration.isConnected ? '#e74c3c' : '#4ecdc4' }
            ]}
          >
            <Text style={styles.connectButtonText}>
              {integration.isConnected ? 'Disconnect' : 'Connect'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.integrationFooter}>
        <Text style={styles.integrationCategory}>{integration.category}</Text>
        <Text style={styles.lastSync}>Last sync: {integration.lastSync}</Text>
      </View>
      
      {integration.isConnected && (
        <View style={styles.integrationSettings}>
          <TouchableOpacity style={styles.settingsButton}>
            <Settings size={16} color="#666" />
            <Text style={styles.settingsText}>Configure</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen 
        options={{
          title: 'Integrations',
          headerStyle: { backgroundColor: '#1a1a1a' },
          headerTintColor: '#fff',
        }} 
      />
      
      <View style={styles.header}>
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Link size={20} color="#4ecdc4" />
            <Text style={styles.statValue}>{integrations.filter(i => i.isConnected).length}</Text>
            <Text style={styles.statLabel}>Connected</Text>
          </View>
          <View style={styles.statItem}>
            <Zap size={20} color="#45b7d1" />
            <Text style={styles.statValue}>{integrations.filter(i => i.status === 'active').length}</Text>
            <Text style={styles.statLabel}>Active</Text>
          </View>
          <View style={styles.statItem}>
            <ChartBar size={20} color="#f39c12" />
            <Text style={styles.statValue}>{integrations.length}</Text>
            <Text style={styles.statLabel}>Total</Text>
          </View>
        </View>
      </View>

      <View style={styles.tabBar}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'all' && styles.activeTab]}
          onPress={() => setActiveTab('all')}
        >
          <Text style={[styles.tabText, activeTab === 'all' && styles.activeTabText]}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'connected' && styles.activeTab]}
          onPress={() => setActiveTab('connected')}
        >
          <Text style={[styles.tabText, activeTab === 'connected' && styles.activeTabText]}>Connected</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'available' && styles.activeTab]}
          onPress={() => setActiveTab('available')}
        >
          <Text style={[styles.tabText, activeTab === 'available' && styles.activeTabText]}>Available</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.filtersContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryFilters}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryFilter,
                selectedCategory === category.id && styles.activeCategoryFilter
              ]}
              onPress={() => setSelectedCategory(category.id)}
            >
              <Text style={[
                styles.categoryFilterText,
                selectedCategory === category.id && styles.activeCategoryFilterText
              ]}>
                {category.name} ({category.count})
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search integrations..."
            placeholderTextColor="#666"
          />
        </View>

        <View style={styles.integrationsGrid}>
          {filteredIntegrations.map(renderIntegrationCard)}
        </View>

        <TouchableOpacity style={styles.addIntegrationButton}>
          <Plus size={20} color="#4ecdc4" />
          <Text style={styles.addIntegrationText}>Request New Integration</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    backgroundColor: '#1a1a1a',
    padding: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
    marginTop: 8,
  },
  statLabel: {
    color: '#666',
    fontSize: 12,
    marginTop: 4,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#1a1a1a',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
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
  },
  activeTabText: {
    color: '#4ecdc4',
  },
  filtersContainer: {
    backgroundColor: '#1a1a1a',
    paddingVertical: 8,
  },
  categoryFilters: {
    paddingHorizontal: 16,
  },
  categoryFilter: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#2a2a2a',
    marginRight: 8,
  },
  activeCategoryFilter: {
    backgroundColor: '#4ecdc4',
  },
  categoryFilterText: {
    color: '#666',
    fontSize: 14,
  },
  activeCategoryFilterText: {
    color: '#fff',
  },
  content: {
    flex: 1,
  },
  searchContainer: {
    padding: 16,
  },
  searchInput: {
    backgroundColor: '#1a1a1a',
    color: '#fff',
    padding: 12,
    borderRadius: 8,
  },
  integrationsGrid: {
    paddingHorizontal: 16,
    gap: 12,
  },
  integrationCard: {
    backgroundColor: '#1a1a1a',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  integrationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  integrationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  integrationIcon: {
    fontSize: 32,
    marginRight: 12,
  },
  integrationDetails: {
    flex: 1,
  },
  integrationName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  integrationDescription: {
    color: '#666',
    fontSize: 14,
    marginTop: 2,
  },
  integrationActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  connectButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  connectButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  integrationFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  integrationCategory: {
    color: '#4ecdc4',
    fontSize: 12,
    fontWeight: '500',
  },
  lastSync: {
    color: '#666',
    fontSize: 12,
  },
  integrationSettings: {
    borderTopWidth: 1,
    borderTopColor: '#2a2a2a',
    paddingTop: 12,
  },
  settingsButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingsText: {
    color: '#666',
    fontSize: 14,
    marginLeft: 8,
  },
  addIntegrationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1a1a1a',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#4ecdc4',
    borderStyle: 'dashed',
  },
  addIntegrationText: {
    color: '#4ecdc4',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 8,
  },
});
