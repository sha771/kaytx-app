 
import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Switch,
  Modal,
  ActivityIndicator,
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Search,
  CircleCheck,
  Circle,
  Settings,
  X,
  RefreshCw,
  Zap,
  Calendar,
  MessageCircle,
  Video,
  Mail,
  ChartBar,
  Users,
  Database,
  Lock,
} from 'lucide-react-native';
import { trpc } from '@/lib/trpc';
import { useTheme } from '@/providers/ThemeProvider';

export default function IntegrationsScreen() {
  const { theme } = useTheme();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedIntegration, setSelectedIntegration] = useState<any | null>(null);

  // Real tRPC data
  const { data: subscription } = trpc.user.getSubscription.useQuery();
  const isEnterprise = subscription?.plan === 'enterprise';

  const { data: integrations = [], isLoading, refetch } = trpc.receptionist.getIntegrations.useQuery();

  const categories = useMemo(() => [
    { id: 'all', label: 'All' },
    { id: 'crm', label: 'CRM' },
    { id: 'calendar', label: 'Calendar' },
    { id: 'communication', label: 'Communication' },
    { id: 'analytics', label: 'Analytics' },
    { id: 'productivity', label: 'Productivity' },
  ], []);

  const filteredIntegrations = useMemo(() => {
    return integrations.filter((integration) => {
      const matchesSearch = integration.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || integration.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [integrations, searchQuery, selectedCategory]);

  const getIconForCategory = (category: string) => {
    const icons = {
      crm: Database,
      calendar: Calendar,
      communication: MessageCircle,
      analytics: ChartBar,
      productivity: Zap,
    } as Record<string, React.ComponentType<any>>;
    return icons[category] || Zap;
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Integrations',
          headerStyle: { backgroundColor: theme.colors.background },
          headerTintColor: theme.colors.text,
          headerShadowVisible: false,
        }}
      />
      <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]} edges={['bottom']}>
        <View style={[styles.header, { backgroundColor: theme.colors.background, borderBottomColor: theme.colors.border }]}>
          <View style={styles.statsRow}>
            <View style={[styles.statBox, { backgroundColor: theme.colors.cardBackground }]}>
              <Text style={[styles.statValue, { color: theme.colors.primary }]}>
                {integrations.filter((i) => i.isConnected).length}
              </Text>
              <Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>Connected</Text>
            </View>
            <View style={[styles.statBox, { backgroundColor: theme.colors.cardBackground }]}>
              <Text style={[styles.statValue, { color: theme.colors.primary }]}>{integrations.length}</Text>
              <Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>Available</Text>
            </View>
          </View>

          <View style={[styles.searchBar, { backgroundColor: theme.colors.cardBackground }]}>
            <Search size={18} color={theme.colors.secondaryText} />
            <TextInput
              style={[styles.searchInput, { color: theme.colors.text }]}
              placeholder="Search integrations..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor={theme.colors.secondaryText}
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
                  { backgroundColor: theme.colors.cardBackground },
                  selectedCategory === category.id && { backgroundColor: theme.colors.primary },
                ]}
                onPress={() => setSelectedCategory(category.id)}
              >
                <Text
                  style={[
                    styles.categoryChipText,
                    { color: theme.colors.secondaryText },
                    selectedCategory === category.id && { color: '#FFFFFF' },
                  ]}
                >
                  {category.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {isLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={theme.colors.primary} />
            </View>
          ) : (
            <View style={styles.integrationsList}>
              {filteredIntegrations.map((integration) => {
                const IconComponent = getIconForCategory(integration.category);
                return (
                  <TouchableOpacity
                    key={integration.id}
                    style={[styles.integrationCard, { backgroundColor: theme.colors.cardBackground, borderColor: theme.colors.border }]}
                    onPress={() => setSelectedIntegration(integration)}
                  >
                    {!isEnterprise && (
                      <View style={styles.lockOverlayMini}>
                        <Lock size={14} color="white" />
                      </View>
                    )}
                    <View style={styles.integrationHeader}>
                      <View style={styles.integrationLeft}>
                        <View
                          style={[
                            styles.integrationIcon,
                            { backgroundColor: integration.isConnected ? '#34C75920' : theme.colors.background },
                          ]}
                        >
                          <IconComponent
                            size={24}
                            color={integration.isConnected ? '#34C759' : theme.colors.secondaryText}
                          />
                        </View>
                        <View style={styles.integrationInfo}>
                          <Text style={[styles.integrationName, { color: theme.colors.text }]}>{integration.name}</Text>
                          <Text style={[styles.integrationDescription, { color: theme.colors.secondaryText }]} numberOfLines={2}>
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
                        <Circle size={20} color={theme.colors.secondaryText} />
                      )}
                    </View>

                    {integration.isConnected && integration.lastSync && (
                      <View style={[styles.syncInfo, { borderTopColor: theme.colors.border }]}>
                        <RefreshCw size={12} color={theme.colors.secondaryText} />
                        <Text style={[styles.syncText, { color: theme.colors.secondaryText }]}>
                          Last synced: {new Date(integration.lastSync).toLocaleString()}
                        </Text>
                      </View>
                    )}

                    <View style={[styles.categoryTag, { backgroundColor: theme.colors.background }]}>
                      <Text style={[styles.categoryTagText, { color: theme.colors.secondaryText }]}>{integration.category.toUpperCase()}</Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          )}
        </ScrollView>

        <Modal
          visible={selectedIntegration !== null}
          animationType="slide"
          transparent={false}
          onRequestClose={() => setSelectedIntegration(null)}
        >
          {selectedIntegration && (
            <SafeAreaView style={[styles.modalContainer, { backgroundColor: theme.colors.background }]}>
              <View style={[styles.modalHeader, { backgroundColor: theme.colors.background, borderBottomColor: theme.colors.border }]}>
                <Text style={[styles.modalTitle, { color: theme.colors.text }]}>Integration Settings</Text>
                <TouchableOpacity onPress={() => setSelectedIntegration(null)}>
                  <X size={24} color={theme.colors.text} />
                </TouchableOpacity>
              </View>

              <ScrollView style={styles.modalContent}>
                <View style={styles.integrationDetails}>
                  <View
                    style={[
                      styles.integrationIconLarge,
                      { backgroundColor: selectedIntegration.isConnected ? '#34C75920' : theme.colors.cardBackground },
                    ]}
                  >
                    {React.createElement(getIconForCategory(selectedIntegration.category), {
                      size: 48,
                      color: selectedIntegration.isConnected ? '#34C759' : theme.colors.secondaryText,
                    })}
                  </View>
                  <Text style={[styles.integrationNameLarge, { color: theme.colors.text }]}>{selectedIntegration.name}</Text>
                  <Text style={[styles.integrationDescriptionLarge, { color: theme.colors.secondaryText }]}>
                    {selectedIntegration.description}
                  </Text>
                </View>

                {!isEnterprise ? (
                  <View style={[styles.lockCard, { backgroundColor: theme.colors.cardBackground }]}>
                    <Lock size={48} color={theme.colors.primary} style={{ marginBottom: 16 }} />
                    <Text style={[styles.lockTitle, { color: theme.colors.text }]}>Enterprise Feature</Text>
                    <Text style={[styles.lockDescription, { color: theme.colors.secondaryText }]}>
                      Deep CRM and custom integrations are available on the Enterprise plan.
                    </Text>
                    <TouchableOpacity 
                      style={[styles.upgradeButton, { backgroundColor: theme.colors.primary }]}
                      onPress={() => {
                        setSelectedIntegration(null);
                        router.push('/enterprise-admin');
                      }}
                    >
                      <Text style={styles.upgradeButtonText}>Upgrade to Enterprise</Text>
                    </TouchableOpacity>
                  </View>
                ) : selectedIntegration.isConnected ? (
                  <>
                    <View style={[styles.statusSection, { backgroundColor: theme.colors.cardBackground }]}>
                      <View style={styles.statusRow}>
                        <Text style={[styles.statusLabel, { color: theme.colors.secondaryText }]}>Status</Text>
                        <View style={styles.statusBadge}>
                          <View style={styles.statusDot} />
                          <Text style={styles.statusText}>Active</Text>
                        </View>
                      </View>
                      {selectedIntegration.lastSync && (
                        <View style={styles.statusRow}>
                          <Text style={[styles.statusLabel, { color: theme.colors.secondaryText }]}>Last Sync</Text>
                          <Text style={[styles.statusValue, { color: theme.colors.text }]}>
                            {new Date(selectedIntegration.lastSync).toLocaleString()}
                          </Text>
                        </View>
                      )}
                    </View>

                    <View style={[styles.settingsSection, { backgroundColor: theme.colors.cardBackground }]}>
                      <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Settings</Text>
                      
                      <View style={[styles.settingItem, { borderBottomColor: theme.colors.border }]}>
                        <View style={styles.settingLeft}>
                          <Text style={[styles.settingLabel, { color: theme.colors.text }]}>Auto Sync</Text>
                          <Text style={[styles.settingDescription, { color: theme.colors.secondaryText }]}>
                            Automatically sync data every hour
                          </Text>
                        </View>
                        <Switch value={true} trackColor={{ false: theme.colors.border, true: theme.colors.primary }} />
                      </View>

                      <View style={[styles.settingItem, { borderBottomColor: theme.colors.border }]}>
                        <View style={styles.settingLeft}>
                          <Text style={[styles.settingLabel, { color: theme.colors.text }]}>Notifications</Text>
                          <Text style={[styles.settingDescription, { color: theme.colors.secondaryText }]}>
                            Receive notifications for sync status
                          </Text>
                        </View>
                        <Switch value={true} trackColor={{ false: theme.colors.border, true: theme.colors.primary }} />
                      </View>

                      <View style={[styles.settingItem, { borderBottomColor: theme.colors.border }]}>
                        <View style={styles.settingLeft}>
                          <Text style={[styles.settingLabel, { color: theme.colors.text }]}>Two-way Sync</Text>
                          <Text style={[styles.settingDescription, { color: theme.colors.secondaryText }]}>
                            Sync data in both directions
                          </Text>
                        </View>
                        <Switch value={false} trackColor={{ false: theme.colors.border, true: theme.colors.primary }} />
                      </View>
                    </View>

                    <TouchableOpacity style={[styles.syncButton, { backgroundColor: theme.colors.cardBackground, borderColor: theme.colors.primary }]}>
                      <RefreshCw size={20} color={theme.colors.primary} />
                      <Text style={[styles.syncButtonText, { color: theme.colors.primary }]}>Sync Now</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.disconnectButton, { backgroundColor: theme.colors.cardBackground, borderColor: theme.colors.error }]}>
                      <Text style={[styles.disconnectButtonText, { color: theme.colors.error }]}>Disconnect Integration</Text>
                    </TouchableOpacity>
                  </>
                ) : (
                  <>
                    <View style={[styles.featuresSection, { backgroundColor: theme.colors.cardBackground }]}>
                      <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Features</Text>
                      <View style={[styles.featureItem, { borderBottomColor: theme.colors.border }]}>
                        <CircleCheck size={16} color="#34C759" />
                        <Text style={[styles.featureText, { color: theme.colors.text }]}>Two-way data synchronization</Text>
                      </View>
                      <View style={[styles.featureItem, { borderBottomColor: theme.colors.border }]}>
                        <CircleCheck size={16} color="#34C759" />
                        <Text style={[styles.featureText, { color: theme.colors.text }]}>Real-time updates</Text>
                      </View>
                      <View style={[styles.featureItem, { borderBottomColor: theme.colors.border }]}>
                        <CircleCheck size={16} color="#34C759" />
                        <Text style={[styles.featureText, { color: theme.colors.text }]}>Automated workflows</Text>
                      </View>
                      <View style={[styles.featureItem, { borderBottomColor: theme.colors.border }]}>
                        <CircleCheck size={16} color="#34C759" />
                        <Text style={[styles.featureText, { color: theme.colors.text }]}>Custom field mapping</Text>
                      </View>
                    </View>

                    <TouchableOpacity style={[styles.connectButton, { backgroundColor: theme.colors.primary }]}>
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
    color: '#007AFF',
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
    backgroundColor: '#007AFF',
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
    borderColor: '#007AFF',
  },
  syncButtonText: {
    color: '#007AFF',
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
    backgroundColor: '#007AFF',
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  lockOverlayMini: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 10,
    padding: 4,
    zIndex: 10,
  },
  lockCard: {
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  lockTitle: {
    fontSize: 20,
    fontWeight: '700' as const,
    marginBottom: 8,
  },
  lockDescription: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
  },
  upgradeButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  upgradeButtonText: {
    color: 'white',
    fontWeight: '600' as const,
  },
});
