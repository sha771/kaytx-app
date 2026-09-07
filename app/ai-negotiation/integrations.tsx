 
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Switch,
  Modal,
} from 'react-native';
import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Search,
  CircleCheck,
  Circle,
  X,
  RefreshCw,
  Zap,
  Calendar,
  MessageCircle,
  BarChart3,
  Database,
} from 'lucide-react-native';
import { mockIntegrations } from '@/utils/mockNegotiationData';
import type { Integration } from '@/types/negotiation';

export default function IntegrationsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null);

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'crm', label: 'CRM' },
    { id: 'calendar', label: 'Calendar' },
    { id: 'communication', label: 'Communication' },
    { id: 'analytics', label: 'Analytics' },
    { id: 'productivity', label: 'Productivity' },
  ];

  const filteredIntegrations = mockIntegrations.filter((integration) => {
    const matchesSearch = integration.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || integration.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getIconForCategory = (category: string) => {
    const icons = {
      crm: Database,
      calendar: Calendar,
      communication: MessageCircle,
      analytics: BarChart3,
      productivity: Zap,
    } as Record<string, React.ComponentType<any>>;
    return icons[category] || Zap;
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Integrations',
          headerStyle: { backgroundColor: '#FFFFFF' },
          headerTintColor: '#1A1A1A',
          headerShadowVisible: false,
        }}
      />
      <SafeAreaView style={styles.container} edges={['bottom']}>
        <View style={styles.header}>
          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>
                {mockIntegrations.filter((i) => i.isConnected).length}
              </Text>
              <Text style={styles.statLabel}>Connected</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>{mockIntegrations.length}</Text>
              <Text style={styles.statLabel}>Available</Text>
            </View>
          </View>

          <View style={styles.searchBar}>
            <Search size={18} color="#8E8E93" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search integrations..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor="#8E8E93"
            />
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.categoryContainer}
          >
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryChip,
                  selectedCategory === category.id && styles.categoryChipActive,
                ]}
                onPress={() => setSelectedCategory(category.id)}
              >
                <Text
                  style={[
                    styles.categoryChipText,
                    selectedCategory === category.id && styles.categoryChipTextActive,
                  ]}
                >
                  {category.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.integrationsList}>
            {filteredIntegrations.map((integration) => {
              const IconComponent = getIconForCategory(integration.category);
              return (
                <TouchableOpacity
                  key={integration.id}
                  style={styles.integrationCard}
                  onPress={() => setSelectedIntegration(integration)}
                >
                  <View style={styles.integrationHeader}>
                    <View style={styles.integrationLeft}>
                      <View
                        style={[
                          styles.integrationIcon,
                          { backgroundColor: integration.isConnected ? '#34C75920' : '#F2F2F7' },
                        ]}
                      >
                        <IconComponent
                          size={24}
                          color={integration.isConnected ? '#34C759' : '#8E8E93'}
                        />
                      </View>
                      <View style={styles.integrationInfo}>
                        <Text style={styles.integrationName}>{integration.name}</Text>
                        <Text style={styles.integrationDescription} numberOfLines={2}>
                          {integration.description}
                        </Text>
                      </View>
                    </View>
                    {integration.isConnected ? (
                      <View style={styles.connectedBadge}>
                        <CircleCheck size={16} color="#34C759" />
                        <Text style={styles.connectedText}>Connected</Text>
                      </View>
                    ) : (
                      <Circle size={20} color="#8E8E93" />
                    )}
                  </View>

                  {integration.isConnected && integration.lastSync && (
                    <View style={styles.syncInfo}>
                      <RefreshCw size={12} color="#8E8E93" />
                      <Text style={styles.syncText}>
                        Last synced: {new Date(integration.lastSync).toLocaleString()}
                      </Text>
                    </View>
                  )}

                  <View style={styles.categoryTag}>
                    <Text style={styles.categoryTagText}>{integration.category.toUpperCase()}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>

        <Modal
          visible={selectedIntegration !== null}
          animationType="slide"
          transparent={false}
          onRequestClose={() => setSelectedIntegration(null)}
        >
          {selectedIntegration && (
            <SafeAreaView style={styles.modalContainer}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Integration Settings</Text>
                <TouchableOpacity onPress={() => setSelectedIntegration(null)}>
                  <X size={24} color="#1A1A1A" />
                </TouchableOpacity>
              </View>

              <ScrollView style={styles.modalContent}>
                <View style={styles.integrationDetails}>
                  <View
                    style={[
                      styles.integrationIconLarge,
                      { backgroundColor: selectedIntegration.isConnected ? '#34C75920' : '#F2F2F7' },
                    ]}
                  >
                    {React.createElement(getIconForCategory(selectedIntegration.category), {
                      size: 48,
                      color: selectedIntegration.isConnected ? '#34C759' : '#8E8E93',
                    })}
                  </View>
                  <Text style={styles.integrationNameLarge}>{selectedIntegration.name}</Text>
                  <Text style={styles.integrationDescriptionLarge}>
                    {selectedIntegration.description}
                  </Text>
                </View>

                {selectedIntegration.isConnected ? (
                  <>
                    <View style={styles.statusSection}>
                      <View style={styles.statusRow}>
                        <Text style={styles.statusLabel}>Status</Text>
                        <View style={styles.statusBadge}>
                          <View style={styles.statusDot} />
                          <Text style={styles.statusText}>Active</Text>
                        </View>
                      </View>
                      {selectedIntegration.lastSync && (
                        <View style={styles.statusRow}>
                          <Text style={styles.statusLabel}>Last Sync</Text>
                          <Text style={styles.statusValue}>
                            {new Date(selectedIntegration.lastSync).toLocaleString()}
                          </Text>
                        </View>
                      )}
                    </View>

                    <View style={styles.settingsSection}>
                      <Text style={styles.sectionTitle}>Settings</Text>
                      
                      <View style={styles.settingItem}>
                        <View style={styles.settingLeft}>
                          <Text style={styles.settingLabel}>Auto Sync</Text>
                          <Text style={styles.settingDescription}>
                            Automatically sync data every hour
                          </Text>
                        </View>
                        <Switch value={true} trackColor={{ true: '#FF2D92' }} />
                      </View>

                      <View style={styles.settingItem}>
                        <View style={styles.settingLeft}>
                          <Text style={styles.settingLabel}>Notifications</Text>
                          <Text style={styles.settingDescription}>
                            Receive notifications for sync status
                          </Text>
                        </View>
                        <Switch value={true} trackColor={{ true: '#FF2D92' }} />
                      </View>

                      <View style={styles.settingItem}>
                        <View style={styles.settingLeft}>
                          <Text style={styles.settingLabel}>Two-way Sync</Text>
                          <Text style={styles.settingDescription}>
                            Sync data in both directions
                          </Text>
                        </View>
                        <Switch value={false} trackColor={{ true: '#FF2D92' }} />
                      </View>
                    </View>

                    <TouchableOpacity style={styles.syncButton}>
                      <RefreshCw size={20} color="#FF2D92" />
                      <Text style={styles.syncButtonText}>Sync Now</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.disconnectButton}>
                      <Text style={styles.disconnectButtonText}>Disconnect Integration</Text>
                    </TouchableOpacity>
                  </>
                ) : (
                  <>
                    <View style={styles.featuresSection}>
                      <Text style={styles.sectionTitle}>Features</Text>
                      <View style={styles.featureItem}>
                        <CircleCheck size={16} color="#34C759" />
                        <Text style={styles.featureText}>Two-way data synchronization</Text>
                      </View>
                      <View style={styles.featureItem}>
                        <CircleCheck size={16} color="#34C759" />
                        <Text style={styles.featureText}>Real-time updates</Text>
                      </View>
                      <View style={styles.featureItem}>
                        <CircleCheck size={16} color="#34C759" />
                        <Text style={styles.featureText}>Automated workflows</Text>
                      </View>
                      <View style={styles.featureItem}>
                        <CircleCheck size={16} color="#34C759" />
                        <Text style={styles.featureText}>Custom field mapping</Text>
                      </View>
                    </View>

                    <TouchableOpacity style={styles.connectButton}>
                      <Text style={styles.connectButtonText}>
                        Connect {selectedIntegration.name}
                      </Text>
                    </TouchableOpacity>
                  </>
                )}
              </ScrollView>
            </SafeAreaView>
          )}
        </Modal>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F7',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  statBox: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 28,
    fontWeight: '700' as const,
    color: '#FF2D92',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 13,
    color: '#8E8E93',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F7',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: '#1A1A1A',
  },
  categoryContainer: {
    flexDirection: 'row',
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F2F2F7',
    marginRight: 8,
  },
  categoryChipActive: {
    backgroundColor: '#FF2D92',
  },
  categoryChipText: {
    fontSize: 14,
    fontWeight: '500' as const,
    color: '#8E8E93',
  },
  categoryChipTextActive: {
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
  },
  integrationsList: {
    padding: 16,
    gap: 12,
  },
  integrationCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  integrationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  integrationLeft: {
    flexDirection: 'row',
    flex: 1,
    gap: 12,
  },
  integrationIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  integrationInfo: {
    flex: 1,
  },
  integrationName: {
    fontSize: 17,
    fontWeight: '600' as const,
    color: '#1A1A1A',
    marginBottom: 4,
  },
  integrationDescription: {
    fontSize: 14,
    color: '#8E8E93',
    lineHeight: 18,
  },
  connectedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#34C75920',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  connectedText: {
    fontSize: 12,
    fontWeight: '600' as const,
    color: '#34C759',
  },
  syncInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F2F2F7',
    marginTop: 12,
  },
  syncText: {
    fontSize: 12,
    color: '#8E8E93',
  },
  categoryTag: {
    alignSelf: 'flex-start',
    backgroundColor: '#F2F2F7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginTop: 8,
  },
  categoryTagText: {
    fontSize: 10,
    fontWeight: '600' as const,
    color: '#8E8E93',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#F5F5F7',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700' as const,
    color: '#1A1A1A',
  },
  modalContent: {
    flex: 1,
    padding: 16,
  },
  integrationDetails: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  integrationIconLarge: {
    width: 80,
    height: 80,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  integrationNameLarge: {
    fontSize: 24,
    fontWeight: '700' as const,
    color: '#1A1A1A',
    marginBottom: 8,
  },
  integrationDescriptionLarge: {
    fontSize: 16,
    color: '#8E8E93',
    textAlign: 'center',
    lineHeight: 22,
  },
  statusSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    gap: 16,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusLabel: {
    fontSize: 15,
    color: '#8E8E93',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#34C75920',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#34C759',
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: '#34C759',
  },
  statusValue: {
    fontSize: 15,
    color: '#1A1A1A',
    fontWeight: '500' as const,
  },
  settingsSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '600' as const,
    color: '#1A1A1A',
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
  },
  settingLeft: {
    flex: 1,
    marginRight: 12,
  },
  settingLabel: {
    fontSize: 16,
    color: '#1A1A1A',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 13,
    color: '#8E8E93',
  },
  syncButton: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#FF2D92',
  },
  syncButtonText: {
    color: '#FF2D92',
    fontSize: 16,
    fontWeight: '600' as const,
  },
  disconnectButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FF3B30',
  },
  disconnectButtonText: {
    color: '#FF3B30',
    fontSize: 16,
    fontWeight: '600' as const,
  },
  featuresSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
  },
  featureText: {
    fontSize: 15,
    color: '#1A1A1A',
  },
  connectButton: {
    backgroundColor: '#FF2D92',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
  },
  connectButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600' as const,
  },
});
