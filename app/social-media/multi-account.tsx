 
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import { Instagram, Twitter, Facebook, Linkedin, Youtube, Plus, Settings, RefreshCw, Trash2, CheckCircle, AlertCircle, ExternalLink } from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';

interface Account {
  id: string;
  platform: string;
  platformIcon: React.ComponentType<any>;
  platformColor: string;
  username: string;
  followers: string;
  status: 'connected' | 'expired' | 'error';
  autoPost: boolean;
  lastSync: string;
}

export default function MultiAccountManager() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  
  const [accounts, setAccounts] = useState<Account[]>([
    { id: '1', platform: 'Instagram', platformIcon: Instagram, platformColor: '#E4405F', username: '@yourcompany', followers: '125.4K', status: 'connected', autoPost: true, lastSync: '2 min ago' },
    { id: '2', platform: 'Twitter/X', platformIcon: Twitter, platformColor: '#1DA1F2', username: '@yourcompany', followers: '89.2K', status: 'connected', autoPost: true, lastSync: '5 min ago' },
    { id: '3', platform: 'Facebook', platformIcon: Facebook, platformColor: '#1877F2', username: 'Your Company', followers: '234.1K', status: 'connected', autoPost: false, lastSync: '10 min ago' },
    { id: '4', platform: 'LinkedIn', platformIcon: Linkedin, platformColor: '#0A66C2', username: 'Your Company Inc', followers: '45.6K', status: 'expired', autoPost: false, lastSync: '3 days ago' },
    { id: '5', platform: 'YouTube', platformIcon: Youtube, platformColor: '#FF0000', username: 'Your Company', followers: '67.8K', status: 'connected', autoPost: true, lastSync: '1 hour ago' },
  ]);

  const toggleAutoPost = (id: string) => {
    setAccounts(prev => prev.map(a => a.id === id ? { ...a, autoPost: !a.autoPost } : a));
  };

  const handleReconnect = (account: Account) => {
    Alert.alert('Reconnect Account', `Reconnect ${account.platform} account?`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Reconnect', onPress: () => console.log('Reconnecting...') },
    ]);
  };

  const handleRemove = (account: Account) => {
    Alert.alert('Remove Account', `Remove ${account.username} from ${account.platform}?`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Remove', style: 'destructive', onPress: () => setAccounts(prev => prev.filter(a => a.id !== account.id)) },
    ]);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected': return <CheckCircle size={16} color="#34C759" />;
      case 'expired': return <AlertCircle size={16} color="#FF9500" />;
      case 'error': return <AlertCircle size={16} color="#FF3B30" />;
      default: return null;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'connected': return 'Connected';
      case 'expired': return 'Token Expired';
      case 'error': return 'Error';
      default: return status;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Stack.Screen
        options={{
          title: 'Connected Accounts',
          headerStyle: { backgroundColor: theme.colors.background },
          headerTintColor: theme.colors.text,
          headerShadowVisible: false,
        }}
      />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}>
        {/* Summary */}
        <View style={[styles.summaryCard, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.summaryRow}>
            <View style={styles.summaryItem}>
              <Text style={[styles.summaryValue, { color: theme.colors.text }]}>{accounts.length}</Text>
              <Text style={[styles.summaryLabel, { color: theme.colors.secondaryText }]}>Accounts</Text>
            </View>
            <View style={[styles.summaryDivider, { backgroundColor: theme.colors.border }]} />
            <View style={styles.summaryItem}>
              <Text style={[styles.summaryValue, { color: '#34C759' }]}>{accounts.filter(a => a.status === 'connected').length}</Text>
              <Text style={[styles.summaryLabel, { color: theme.colors.secondaryText }]}>Active</Text>
            </View>
            <View style={[styles.summaryDivider, { backgroundColor: theme.colors.border }]} />
            <View style={styles.summaryItem}>
              <Text style={[styles.summaryValue, { color: '#FF9500' }]}>{accounts.filter(a => a.status !== 'connected').length}</Text>
              <Text style={[styles.summaryLabel, { color: theme.colors.secondaryText }]}>Needs Attention</Text>
            </View>
          </View>
        </View>

        {/* Add Account */}
        <TouchableOpacity style={[styles.addButton, { borderColor: theme.colors.primary }]}>
          <Plus size={20} color={theme.colors.primary} />
          <Text style={[styles.addButtonText, { color: theme.colors.primary }]}>Connect New Account</Text>
        </TouchableOpacity>

        {/* Accounts List */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Your Accounts</Text>
          {accounts.map((account) => {
            const PlatformIcon = account.platformIcon;
            return (
              <View key={account.id} style={[styles.accountCard, { backgroundColor: theme.colors.cardBackground }, account.status !== 'connected' && styles.warningCard]}>
                <View style={styles.accountHeader}>
                  <View style={[styles.platformIcon, { backgroundColor: `${account.platformColor}15` }]}>
                    <PlatformIcon size={22} color={account.platformColor} />
                  </View>
                  <View style={styles.accountInfo}>
                    <Text style={[styles.accountPlatform, { color: theme.colors.text }]}>{account.platform}</Text>
                    <Text style={[styles.accountUsername, { color: theme.colors.secondaryText }]}>{account.username}</Text>
                  </View>
                  <View style={styles.statusContainer}>
                    {getStatusIcon(account.status)}
                    <Text style={[styles.statusText, { color: account.status === 'connected' ? '#34C759' : '#FF9500' }]}>
                      {getStatusText(account.status)}
                    </Text>
                  </View>
                </View>

                <View style={styles.accountStats}>
                  <View style={styles.statItem}>
                    <Text style={[styles.statValue, { color: theme.colors.text }]}>{account.followers}</Text>
                    <Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>Followers</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={[styles.statValue, { color: theme.colors.text }]}>{account.lastSync}</Text>
                    <Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>Last Sync</Text>
                  </View>
                </View>

                <View style={[styles.accountDivider, { backgroundColor: theme.colors.border }]} />

                <View style={styles.accountSettings}>
                  <View style={styles.settingRow}>
                    <Text style={[styles.settingLabel, { color: theme.colors.text }]}>Auto-post enabled</Text>
                    <Switch
                      value={account.autoPost}
                      onValueChange={() => toggleAutoPost(account.id)}
                      trackColor={{ false: '#E5E5EA', true: `${theme.colors.primary}50` }}
                      thumbColor={account.autoPost ? theme.colors.primary : '#F4F4F4'}
                    />
                  </View>
                </View>

                <View style={styles.accountActions}>
                  {account.status !== 'connected' ? (
                    <TouchableOpacity style={[styles.reconnectButton, { backgroundColor: '#FF950015' }]} onPress={() => handleReconnect(account)}>
                      <RefreshCw size={16} color="#FF9500" />
                      <Text style={styles.reconnectText}>Reconnect</Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity style={[styles.actionButton, { backgroundColor: 'rgba(0,0,0,0.05)' }]}>
                      <ExternalLink size={16} color={theme.colors.secondaryText} />
                      <Text style={[styles.actionButtonText, { color: theme.colors.secondaryText }]}>View Profile</Text>
                    </TouchableOpacity>
                  )}
                  <TouchableOpacity style={[styles.actionButton, { backgroundColor: 'rgba(0,0,0,0.05)' }]}>
                    <Settings size={16} color={theme.colors.secondaryText} />
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#FF3B3010' }]} onPress={() => handleRemove(account)}>
                    <Trash2 size={16} color="#FF3B30" />
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, paddingHorizontal: 16 },
  summaryCard: { padding: 16, borderRadius: 16, marginBottom: 16 },
  summaryRow: { flexDirection: 'row', alignItems: 'center' },
  summaryItem: { flex: 1, alignItems: 'center' },
  summaryValue: { fontSize: 24, fontWeight: '700', marginBottom: 4 },
  summaryLabel: { fontSize: 12 },
  summaryDivider: { width: 1, height: 36 },
  addButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 16, borderRadius: 14, borderWidth: 2, borderStyle: 'dashed', gap: 10, marginBottom: 24 },
  addButtonText: { fontSize: 15, fontWeight: '600' },
  section: { marginBottom: 24 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 14 },
  accountCard: { borderRadius: 16, padding: 16, marginBottom: 12 },
  warningCard: { borderWidth: 1, borderColor: '#FF9500' },
  accountHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 14 },
  platformIcon: { width: 48, height: 48, borderRadius: 14, justifyContent: 'center', alignItems: 'center', marginRight: 14 },
  accountInfo: { flex: 1 },
  accountPlatform: { fontSize: 16, fontWeight: '600', marginBottom: 2 },
  accountUsername: { fontSize: 13 },
  statusContainer: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  statusText: { fontSize: 12, fontWeight: '600' },
  accountStats: { flexDirection: 'row', gap: 24, marginBottom: 14 },
  statItem: {},
  statValue: { fontSize: 15, fontWeight: '600', marginBottom: 2 },
  statLabel: { fontSize: 11 },
  accountDivider: { height: 1, marginBottom: 14 },
  accountSettings: { marginBottom: 14 },
  settingRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  settingLabel: { fontSize: 14, fontWeight: '500' },
  accountActions: { flexDirection: 'row', gap: 10 },
  reconnectButton: { flexDirection: 'row', alignItems: 'center', flex: 1, justifyContent: 'center', padding: 12, borderRadius: 10, gap: 8 },
  reconnectText: { fontSize: 14, fontWeight: '600', color: '#FF9500' },
  actionButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 12, borderRadius: 10, gap: 6, flex: 1 },
  actionButtonText: { fontSize: 13, fontWeight: '500' },
});
