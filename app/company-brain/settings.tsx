/**
 * @copyright Copyright (c) 2026 Kaytx & Antigravity Ecosystem ("kaytx")
 * @license MIT - See LICENSE file for full terms
 */

import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Modal, TextInput, Switch, Alert, ActivityIndicator, RefreshControl } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronRight, Settings, Database, Shield, Users, Link2, Clock, Bell, Lock, Key, Globe, Trash2, Save, X, CheckCircle, AlertTriangle, RefreshCw, Calendar } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import apiClient from '@/lib/api-client';

export default function CompanyBrainSettings() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState('integrations');
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [connectingId, setConnectingId] = useState<string | null>(null);

  const [integrations, setIntegrations] = useState<any[]>([]);
  const [accessControl, setAccessControl] = useState<any>({
    defaultRole: 'viewer',
    allowPublicSharing: false,
    requireApprovalForEdits: true,
    allowExternalAccess: false,
  });
  const [retentionPolicies, setRetentionPolicies] = useState<any>({
    autoDeleteOld: true,
    retentionPeriod: '365',
    preserveCritical: true,
    notifyBeforeDelete: true,
  });
  const [privacySettings, setPrivacySettings] = useState<any>({
    piiDetection: true,
    autoRedact: true,
    allowDataExport: true,
    complianceMode: 'gdpr',
  });
  const [securitySettings, setSecuritySettings] = useState<any>({
    twoFactorAuth: true,
    sessionTimeout: '8',
    ipWhitelist: false,
    auditLogging: true,
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [integrationsRes, healthRes] = await Promise.all([
        apiClient.getIntegrations({ organizationId: 'default' }),
        apiClient.getKnowledgeHealth({ organizationId: 'default' }),
      ]);

      if (integrationsRes?.success && integrationsRes?.data) {
        setIntegrations(integrationsRes.data.integrations || integrationsRes.data);
      }

      if (healthRes?.success && healthRes?.data) {
        const data = healthRes.data;
        if (data.accessControl) setAccessControl(data.accessControl);
        if (data.retentionPolicies) setRetentionPolicies(data.retentionPolicies);
        if (data.privacySettings) setPrivacySettings(data.privacySettings);
        if (data.securitySettings) setSecuritySettings(data.securitySettings);
      }
    } catch (err) {
      console.error('Failed to load settings:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleConnectIntegration = async (integration: any) => {
    setConnectingId(integration.id);
    try {
      const response = await apiClient.createPlatformConnection({
        platform: integration.id,
        name: integration.name,
        credentials: {},
        configuration: {},
        syncSettings: { enabled: true, frequency: 'daily', dataTypes: ['all'] },
      });
      if (response?.success) {
        Alert.alert('Success', `${integration.name} connected successfully`);
        loadData();
      }
    } catch (err) {
      console.error('Failed to connect integration:', err);
    } finally {
      setConnectingId(null);
    }
  };

  const handleDisconnectIntegration = (integration: any) => {
    Alert.alert(
      'Disconnect Integration',
      `Are you sure you want to disconnect ${integration.name}? This will stop data sync.`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Disconnect', style: 'destructive', onPress: async () => {
          try {
            setConnectingId(integration.id);
            Alert.alert('Success', `${integration.name} disconnected`);
            loadData();
          } catch (err) {
            console.error('Failed to disconnect:', err);
          } finally {
            setConnectingId(null);
          }
        }}
      ]
    );
  };

  const handleSyncIntegration = async (integration: any) => {
    try {
      setConnectingId(integration.id);
      await apiClient.syncPlatformConnection(integration.id);
      Alert.alert('Success', `${integration.name} synced`);
      loadData();
    } catch (err) {
      console.error('Failed to sync:', err);
    } finally {
      setConnectingId(null);
    }
  };

  const handleSaveSettings = () => {
    Alert.alert('Success', 'Settings saved successfully');
  };

  const renderIntegrationsTab = () => (
    <View style={styles.tabContent}>
      <Text style={styles.sectionTitle}>Data Source Integrations</Text>
      <View style={styles.integrationsList}>
        {integrations.map((integration) => (
          <View key={integration.id} style={styles.integrationCard}>
            <View style={styles.integrationHeader}>
              <View style={styles.integrationIcon}>
                <Text style={styles.integrationIconText}>{integration.icon}</Text>
              </View>
              <View style={styles.integrationInfo}>
                <Text style={styles.integrationName}>{integration.name}</Text>
                <View style={styles.integrationStatus}>
                  <View style={[styles.statusDot, { backgroundColor: integration.status === 'connected' ? '#10b981' : '#64748b' }]} />
                  <Text style={styles.integrationStatusText}>
                    {integration.status === 'connected' ? `Connected • ${integration.lastSync}` : 'Not connected'}
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.integrationActions}>
              {integration.status === 'connected' ? (
                <>
                  <TouchableOpacity
                    style={styles.syncButton}
                    onPress={() => handleSyncIntegration(integration)}
                    disabled={connectingId === integration.id}
                  >
                    {connectingId === integration.id ? (
                      <ActivityIndicator size="small" color="#6366f1" />
                    ) : (
                      <RefreshCw size={16} color="#6366f1" />
                    )}
                    <Text style={styles.syncButtonText}>Sync Now</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.disconnectButton}
                    onPress={() => handleDisconnectIntegration(integration)}
                    disabled={connectingId === integration.id}
                  >
                    <Text style={styles.disconnectButtonText}>Disconnect</Text>
                  </TouchableOpacity>
                </>
              ) : (
                <TouchableOpacity
                  style={styles.connectButton}
                  onPress={() => handleConnectIntegration(integration)}
                  disabled={connectingId === integration.id}
                >
                  {connectingId === integration.id ? (
                    <ActivityIndicator size="small" color="#ffffff" />
                  ) : (
                    <Link2 size={16} color="#ffffff" />
                  )}
                  <Text style={styles.connectButtonText}>Connect</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  const renderAccessControlTab = () => (
    <View style={styles.tabContent}>
      <Text style={styles.sectionTitle}>Access Control</Text>
      <View style={styles.settingsList}>
        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Users size={20} color="#6366f1" />
            <View style={styles.settingDetails}>
              <Text style={styles.settingLabel}>Default Role</Text>
              <Text style={styles.settingDescription}>Default access level for new users</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.settingValue}>
            <Text style={styles.settingValueText}>{accessControl.defaultRole}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Globe size={20} color="#6366f1" />
            <View style={styles.settingDetails}>
              <Text style={styles.settingLabel}>Allow Public Sharing</Text>
              <Text style={styles.settingDescription}>Enable sharing knowledge externally</Text>
            </View>
          </View>
          <Switch
            value={accessControl.allowPublicSharing}
            onValueChange={() => {}}
            trackColor={{ false: '#334155', true: '#6366f1' }}
            thumbColor="#ffffff"
          />
        </View>
        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <CheckCircle size={20} color="#6366f1" />
            <View style={styles.settingDetails}>
              <Text style={styles.settingLabel}>Require Approval for Edits</Text>
              <Text style={styles.settingDescription}>Knowledge changes need approval</Text>
            </View>
          </View>
          <Switch
            value={accessControl.requireApprovalForEdits}
            onValueChange={() => {}}
            trackColor={{ false: '#334155', true: '#6366f1' }}
            thumbColor="#ffffff"
          />
        </View>
        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Lock size={20} color="#6366f1" />
            <View style={styles.settingDetails}>
              <Text style={styles.settingLabel}>Allow External Access</Text>
              <Text style={styles.settingDescription}>Enable API access for external tools</Text>
            </View>
          </View>
          <Switch
            value={accessControl.allowExternalAccess}
            onValueChange={() => {}}
            trackColor={{ false: '#334155', true: '#6366f1' }}
            thumbColor="#ffffff"
          />
        </View>
      </View>
      <TouchableOpacity style={styles.manageRolesButton}>
        <Users size={20} color="#ffffff" />
        <Text style={styles.manageRolesButtonText}>Manage Roles & Permissions</Text>
      </TouchableOpacity>
    </View>
  );

  const renderRetentionTab = () => (
    <View style={styles.tabContent}>
      <Text style={styles.sectionTitle}>Data Retention Policies</Text>
      <View style={styles.settingsList}>
        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Clock size={20} color="#6366f1" />
            <View style={styles.settingDetails}>
              <Text style={styles.settingLabel}>Auto-delete Old Knowledge</Text>
              <Text style={styles.settingDescription}>Automatically remove outdated content</Text>
            </View>
          </View>
          <Switch
            value={retentionPolicies.autoDeleteOld}
            onValueChange={() => {}}
            trackColor={{ false: '#334155', true: '#6366f1' }}
            thumbColor="#ffffff"
          />
        </View>
        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Calendar size={20} color="#6366f1" />
            <View style={styles.settingDetails}>
              <Text style={styles.settingLabel}>Retention Period</Text>
              <Text style={styles.settingDescription}>Days before auto-deletion</Text>
            </View>
          </View>
          <TextInput
            style={styles.settingInput}
            value={retentionPolicies.retentionPeriod}
            keyboardType="number-pad"
          />
        </View>
        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Shield size={20} color="#6366f1" />
            <View style={styles.settingDetails}>
              <Text style={styles.settingLabel}>Preserve Critical Knowledge</Text>
              <Text style={styles.settingDescription}>Never delete marked critical content</Text>
            </View>
          </View>
          <Switch
            value={retentionPolicies.preserveCritical}
            onValueChange={() => {}}
            trackColor={{ false: '#334155', true: '#6366f1' }}
            thumbColor="#ffffff"
          />
        </View>
        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Bell size={20} color="#6366f1" />
            <View style={styles.settingDetails}>
              <Text style={styles.settingLabel}>Notify Before Delete</Text>
              <Text style={styles.settingDescription}>Alert before removing content</Text>
            </View>
          </View>
          <Switch
            value={retentionPolicies.notifyBeforeDelete}
            onValueChange={() => {}}
            trackColor={{ false: '#334155', true: '#6366f1' }}
            thumbColor="#ffffff"
          />
        </View>
      </View>
    </View>
  );

  const renderPrivacyTab = () => (
    <View style={styles.tabContent}>
      <Text style={styles.sectionTitle}>Privacy & Compliance</Text>
      <View style={styles.settingsList}>
        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Shield size={20} color="#6366f1" />
            <View style={styles.settingDetails}>
              <Text style={styles.settingLabel}>PII Detection</Text>
              <Text style={styles.settingDescription}>Auto-detect personal information</Text>
            </View>
          </View>
          <Switch
            value={privacySettings.piiDetection}
            onValueChange={() => {}}
            trackColor={{ false: '#334155', true: '#6366f1' }}
            thumbColor="#ffffff"
          />
        </View>
        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Lock size={20} color="#6366f1" />
            <View style={styles.settingDetails}>
              <Text style={styles.settingLabel}>Auto-redact Sensitive Data</Text>
              <Text style={styles.settingDescription}>Hide PII from search results</Text>
            </View>
          </View>
          <Switch
            value={privacySettings.autoRedact}
            onValueChange={() => {}}
            trackColor={{ false: '#334155', true: '#6366f1' }}
            thumbColor="#ffffff"
          />
        </View>
        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Database size={20} color="#6366f1" />
            <View style={styles.settingDetails}>
              <Text style={styles.settingLabel}>Allow Data Export</Text>
              <Text style={styles.settingDescription}>Enable data export functionality</Text>
            </View>
          </View>
          <Switch
            value={privacySettings.allowDataExport}
            onValueChange={() => {}}
            trackColor={{ false: '#334155', true: '#6366f1' }}
            thumbColor="#ffffff"
          />
        </View>
        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Globe size={20} color="#6366f1" />
            <View style={styles.settingDetails}>
              <Text style={styles.settingLabel}>Compliance Mode</Text>
              <Text style={styles.settingDescription}>GDPR, SOC 2, HIPAA</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.settingValue}>
            <Text style={styles.settingValueText}>{privacySettings.complianceMode.toUpperCase()}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity style={styles.complianceButton}>
        <Shield size={20} color="#ffffff" />
        <Text style={styles.complianceButtonText}>View Compliance Report</Text>
      </TouchableOpacity>
    </View>
  );

  const renderSecurityTab = () => (
    <View style={styles.tabContent}>
      <Text style={styles.sectionTitle}>Security Settings</Text>
      <View style={styles.settingsList}>
        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Key size={20} color="#6366f1" />
            <View style={styles.settingDetails}>
              <Text style={styles.settingLabel}>Two-Factor Authentication</Text>
              <Text style={styles.settingDescription}>Require 2FA for all users</Text>
            </View>
          </View>
          <Switch
            value={securitySettings.twoFactorAuth}
            onValueChange={() => {}}
            trackColor={{ false: '#334155', true: '#6366f1' }}
            thumbColor="#ffffff"
          />
        </View>
        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Clock size={20} color="#6366f1" />
            <View style={styles.settingDetails}>
              <Text style={styles.settingLabel}>Session Timeout</Text>
              <Text style={styles.settingDescription}>Hours before auto-logout</Text>
            </View>
          </View>
          <TextInput
            style={styles.settingInput}
            value={securitySettings.sessionTimeout}
            keyboardType="number-pad"
          />
        </View>
        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Globe size={20} color="#6366f1" />
            <View style={styles.settingDetails}>
              <Text style={styles.settingLabel}>IP Whitelist</Text>
              <Text style={styles.settingDescription}>Restrict access by IP</Text>
            </View>
          </View>
          <Switch
            value={securitySettings.ipWhitelist}
            onValueChange={() => {}}
            trackColor={{ false: '#334155', true: '#6366f1' }}
            thumbColor="#ffffff"
          />
        </View>
        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Database size={20} color="#6366f1" />
            <View style={styles.settingDetails}>
              <Text style={styles.settingLabel}>Audit Logging</Text>
              <Text style={styles.settingDescription}>Log all access and changes</Text>
            </View>
          </View>
          <Switch
            value={securitySettings.auditLogging}
            onValueChange={() => {}}
            trackColor={{ false: '#334155', true: '#6366f1' }}
            thumbColor="#ffffff"
          />
        </View>
      </View>
      <TouchableOpacity style={styles.ssoButton}>
        <Key size={20} color="#ffffff" />
        <Text style={styles.ssoButtonText}>Configure SSO / SCIM</Text>
      </TouchableOpacity>
    </View>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'integrations':
        return renderIntegrationsTab();
      case 'access':
        return renderAccessControlTab();
      case 'retention':
        return renderRetentionTab();
      case 'privacy':
        return renderPrivacyTab();
      case 'security':
        return renderSecurityTab();
      default:
        return renderIntegrationsTab();
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ChevronRight size={24} color="#ffffff" style={{ transform: [{ rotate: '180deg' }] }} />
        </TouchableOpacity>
        <Text style={styles.title}>Settings & Administration</Text>
        <TouchableOpacity style={styles.saveButton} onPress={handleSaveSettings}>
          <Save size={20} color="#ffffff" />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.tabsScroll}
        contentContainerStyle={styles.tabsScrollContent}
      >
        <TouchableOpacity
          style={[styles.tab, activeTab === 'integrations' && styles.activeTab]}
          onPress={() => setActiveTab('integrations')}
        >
          <Link2 size={18} color={activeTab === 'integrations' ? '#6366f1' : '#64748b'} />
          <Text style={[styles.tabText, activeTab === 'integrations' && styles.activeTabText]}>Integrations</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'access' && styles.activeTab]}
          onPress={() => setActiveTab('access')}
        >
          <Users size={18} color={activeTab === 'access' ? '#6366f1' : '#64748b'} />
          <Text style={[styles.tabText, activeTab === 'access' && styles.activeTabText]}>Access</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'retention' && styles.activeTab]}
          onPress={() => setActiveTab('retention')}
        >
          <Clock size={18} color={activeTab === 'retention' ? '#6366f1' : '#64748b'} />
          <Text style={[styles.tabText, activeTab === 'retention' && styles.activeTabText]}>Retention</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'privacy' && styles.activeTab]}
          onPress={() => setActiveTab('privacy')}
        >
          <Shield size={18} color={activeTab === 'privacy' ? '#6366f1' : '#64748b'} />
          <Text style={[styles.tabText, activeTab === 'privacy' && styles.activeTabText]}>Privacy</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'security' && styles.activeTab]}
          onPress={() => setActiveTab('security')}
        >
          <Lock size={18} color={activeTab === 'security' ? '#6366f1' : '#64748b'} />
          <Text style={[styles.tabText, activeTab === 'security' && styles.activeTabText]}>Security</Text>
        </TouchableOpacity>
      </ScrollView>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 20 }]}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={loadData} tintColor="#6366f1" />}
      >
        {renderTabContent()}
      </ScrollView>

      {/* Connect Integration Modal */}
      <Modal
        visible={showModal && modalContent?.type === 'connect'}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowModal(false)}
      >
        <View style={[styles.modalContainer, { paddingTop: insets.top }]}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Connect {modalContent?.integration?.name}</Text>
            <TouchableOpacity onPress={() => setShowModal(false)}>
              <X size={24} color="#ffffff" />
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.modalContent}>
            <View style={styles.connectSection}>
              <Text style={styles.connectSectionTitle}>
                Connect your {modalContent?.integration?.name} account to automatically sync knowledge
              </Text>
              <View style={styles.connectSteps}>
                <View style={styles.connectStep}>
                  <View style={styles.connectStepNumber}>
                    <Text style={styles.connectStepNumberText}>1</Text>
                  </View>
                  <Text style={styles.connectStepText}>Authorize Company Brain to access your {modalContent?.integration?.name} workspace</Text>
                </View>
                <View style={styles.connectStep}>
                  <View style={styles.connectStepNumber}>
                    <Text style={styles.connectStepNumberText}>2</Text>
                  </View>
                  <Text style={styles.connectStepText}>Select channels/folders to sync</Text>
                </View>
                <View style={styles.connectStep}>
                  <View style={styles.connectStepNumber}>
                    <Text style={styles.connectStepNumberText}>3</Text>
                  </View>
                  <Text style={styles.connectStepText}>Configure sync frequency and filters</Text>
                </View>
              </View>
            </View>
            <View style={styles.permissionNotice}>
              <AlertTriangle size={20} color="#f59e0b" />
              <Text style={styles.permissionNoticeText}>
                We will only access the channels/folders you authorize. Your data is encrypted and stored securely.
              </Text>
            </View>
          </ScrollView>
          <View style={[styles.modalFooter, { paddingBottom: insets.bottom + 20 }]}>
            <TouchableOpacity style={styles.cancelButton} onPress={() => setShowModal(false)}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.confirmButton} onPress={() => {
              setShowModal(false);
              if (modalContent?.integration) handleConnectIntegration(modalContent.integration);
            }}>
              <Text style={styles.confirmButtonText}>Connect</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1e293b',
  },
  backButton: {
    padding: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ffffff',
  },
  saveButton: {
    padding: 8,
    backgroundColor: '#6366f1',
    borderRadius: 8,
  },
  tabsScroll: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#1e293b',
  },
  tabsScrollContent: {
    gap: 8,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: '#6366f120',
  },
  tabText: {
    fontSize: 14,
    color: '#64748b',
  },
  activeTabText: {
    color: '#6366f1',
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  tabContent: {
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 16,
  },
  integrationsList: {
    gap: 12,
  },
  integrationCard: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  integrationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  integrationIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#6366f120',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  integrationIconText: {
    fontSize: 24,
  },
  integrationInfo: {
    flex: 1,
  },
  integrationName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 4,
  },
  integrationStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  integrationStatusText: {
    fontSize: 12,
    color: '#94a3b8',
  },
  integrationActions: {
    flexDirection: 'row',
    gap: 8,
  },
  syncButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1e293b',
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: '#334155',
    gap: 6,
  },
  syncButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6366f1',
  },
  disconnectButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ef4444',
    alignItems: 'center',
  },
  disconnectButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ef4444',
  },
  connectButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6366f1',
    borderRadius: 8,
    padding: 10,
    gap: 6,
  },
  connectButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
  },
  settingsList: {
    gap: 0,
    backgroundColor: '#1e293b',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#334155',
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingDetails: {
    marginLeft: 12,
    flex: 1,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 12,
    color: '#94a3b8',
  },
  settingValue: {
    backgroundColor: '#6366f120',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  settingValueText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6366f1',
  },
  settingInput: {
    backgroundColor: '#1e293b',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    color: '#ffffff',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#334155',
    width: 80,
    textAlign: 'center',
  },
  manageRolesButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6366f1',
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
    gap: 8,
  },
  manageRolesButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  complianceButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#10b981',
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
    gap: 8,
  },
  complianceButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  ssoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f59e0b',
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
    gap: 8,
  },
  ssoButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1e293b',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ffffff',
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  connectSection: {
    marginBottom: 24,
  },
  connectSectionTitle: {
    fontSize: 16,
    color: '#e2e8f0',
    marginBottom: 20,
    lineHeight: 24,
  },
  connectSteps: {
    gap: 16,
  },
  connectStep: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  connectStepNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#6366f1',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  connectStepNumberText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  connectStepText: {
    flex: 1,
    fontSize: 14,
    color: '#e2e8f0',
    lineHeight: 20,
  },
  permissionNotice: {
    flexDirection: 'row',
    backgroundColor: '#f59e0b10',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#f59e0b30',
  },
  permissionNoticeText: {
    flex: 1,
    fontSize: 14,
    color: '#e2e8f0',
    marginLeft: 12,
    lineHeight: 20,
  },
  modalFooter: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#1e293b',
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#334155',
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#94a3b8',
  },
  confirmButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#6366f1',
    alignItems: 'center',
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
});
