import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  useColorScheme,
  Switch,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ArrowLeft,
  MessageCircle,
  Slack,
  MessageSquare,
  Smartphone,
  Plus,
  CircleCheck,
  CircleX,
  CircleAlert,
  Settings,
  ChevronRight,
  Hash,
  Users,
  Link,
  Copy,
  RefreshCw,
} from 'lucide-react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInUp } from 'react-native-reanimated';

// Mock Platform Connections
const CONNECTIONS = [
  {
    id: '1',
    platform: 'slack',
    name: 'Sales Team Slack',
    status: 'connected',
    workspace: 'acme-sales',
    channels: 12,
    users: 156,
    messagesReceived: 2847,
    messagesSent: 1523,
    autoReply: true,
    mentionRequired: true,
  },
  {
    id: '2',
    platform: 'teams',
    name: 'Support Teams',
    status: 'connected',
    workspace: 'acme-corp',
    channels: 8,
    users: 89,
    messagesReceived: 1456,
    messagesSent: 892,
    autoReply: true,
    mentionRequired: false,
  },
  {
    id: '3',
    platform: 'whatsapp',
    name: 'Customer Service',
    status: 'pending',
    workspace: '+1-555-0123',
    channels: 1,
    users: 0,
    messagesReceived: 0,
    messagesSent: 0,
    autoReply: false,
    mentionRequired: false,
  },
];

const PLATFORM_CONFIGS = {
  slack: {
    name: 'Slack',
    icon: Slack,
    color: '#4A154B',
    description: 'Connect to your Slack workspace to enable AI agents in channels and DMs',
    fields: ['User Token', 'Signing Secret', 'App Token'],
  },
  teams: {
    name: 'Microsoft Teams',
    icon: MessageSquare,
    color: '#6264A7',
    description: 'Integrate with Microsoft Teams for enterprise chat capabilities',
    fields: ['App ID', 'App Password', 'Tenant ID'],
  },
  whatsapp: {
    name: 'WhatsApp',
    icon: Smartphone,
    color: '#25D366',
    description: 'Connect WhatsApp Business API for customer communication',
    fields: ['Phone Number ID', 'Access Token', 'Webhook Verify Token'],
  },


};
export default function ChatPlatformsScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [activeTab, setActiveTab] = useState<'connections' | 'add'>('connections');
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);

  const colors = {
    background: isDark ? '#0a0a0f' : '#f8f9fa',
    card: isDark ? '#1a1a2e' : '#ffffff',
    text: isDark ? '#ffffff' : '#1a1a2e',
    textSecondary: isDark ? '#a0a0b0' : '#6c757d',
    border: isDark ? '#2a2a3e' : '#e9ecef',
    accent: '#6366f1',
    success: '#22c55e',
    warning: '#f59e0b',
    danger: '#ef4444',
  };

  const renderConnectionCard = (connection: typeof CONNECTIONS[0], index: number) => {
    const config = PLATFORM_CONFIGS[connection.platform as keyof typeof PLATFORM_CONFIGS];
    const Icon = config?.icon || MessageCircle;
    
    return (
      <Animated.View
        key={connection.id}
        entering={FadeInUp.delay(index * 100).duration(600)}
        style={[styles.connectionCard, { backgroundColor: colors.card, borderColor: colors.border }]}
      >
        <View style={styles.connectionHeader}>
          <View style={[styles.platformIcon, { backgroundColor: config?.color || colors.accent }]}>
            <Icon size={20} color="#fff" />
          </View>
          <View style={styles.connectionInfo}>
            <Text style={[styles.connectionName, { color: colors.text }]}>{connection.name}</Text>
            <Text style={[styles.connectionWorkspace, { color: colors.textSecondary }]}>
              {connection.workspace}
            </Text>
          </View>
          <View
            style={[
              styles.statusBadge,
              {
                backgroundColor:
                  connection.status === 'connected'
                    ? isDark
                      ? 'rgba(34, 197, 94, 0.2)'
                      : 'rgba(34, 197, 94, 0.1)'
                    : isDark
                    ? 'rgba(245, 158, 11, 0.2)'
                    : 'rgba(245, 158, 11, 0.1)',
              },
            ]}
          >
            <Text
              style={[
                styles.statusText,
                {
                  color: connection.status === 'connected' ? colors.success : colors.warning,
                },
              ]}
            >
              {connection.status === 'connected' ? 'CONNECTED' : 'PENDING'}
            </Text>
          </View>
        </View>

        <View style={styles.connectionStats}>
          <View style={styles.stat}>
            <Hash size={14} color={colors.textSecondary} />
            <Text style={[styles.statValue, { color: colors.text }]}>{connection.channels}</Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Channels</Text>
          </View>
          <View style={styles.stat}>
            <Users size={14} color={colors.textSecondary} />
            <Text style={[styles.statValue, { color: colors.text }]}>{connection.users}</Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Users</Text>
          </View>
          <View style={styles.stat}>
            <MessageCircle size={14} color={colors.textSecondary} />
            <Text style={[styles.statValue, { color: colors.text }]}>
              {connection.messagesReceived.toLocaleString()}
            </Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Messages</Text>
          </View>
        </View>

        <View style={[styles.settingsRow, { borderTopColor: colors.border }]}>
          <View style={styles.setting}>
            <Text style={[styles.settingLabel, { color: colors.textSecondary }]}>Auto-reply</Text>
            <Switch
              value={connection.autoReply}
              trackColor={{ false: colors.border, true: colors.accent }}
              thumbColor="#fff"
            />
          </View>
          <View style={styles.setting}>
            <Text style={[styles.settingLabel, { color: colors.textSecondary }]}>Require @mention</Text>
            <Switch
              value={connection.mentionRequired}
              trackColor={{ false: colors.border, true: colors.accent }}
              thumbColor="#fff"
            />
          </View>
        </View>

        <View style={styles.connectionActions}>
          <TouchableOpacity style={[styles.actionBtn, { backgroundColor: colors.border }]}>
            <Settings size={16} color={colors.text} />
            <Text style={[styles.actionText, { color: colors.text }]}>Configure</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionBtn, { backgroundColor: colors.danger + '20' }]}>
            <CircleX size={16} color={colors.danger} />
            <Text style={[styles.actionText, { color: colors.danger }]}>Disconnect</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    );
  };

  const renderAddPlatform = () => (
    <Animated.View entering={FadeInUp.duration(600)} style={styles.addContainer}>
      {!selectedPlatform ? (
        <>
          <Text style={[styles.addTitle, { color: colors.text }]}>Select Platform</Text>
          <Text style={[styles.addSubtitle, { color: colors.textSecondary }]}>
            Choose a chat platform to integrate with your AI agents
          </Text>
          {Object.entries(PLATFORM_CONFIGS).map(([key, config]) => (
            <TouchableOpacity
              key={key}
              style={[styles.platformCard, { backgroundColor: colors.card, borderColor: colors.border }]}
              onPress={() => setSelectedPlatform(key)}
            >
              <View style={[styles.platformIconLarge, { backgroundColor: config.color }]}>
                <config.icon size={28} color="#fff" />
              </View>
              <View style={styles.platformInfo}>
                <Text style={[styles.platformName, { color: colors.text }]}>{config.name}</Text>
                <Text style={[styles.platformDesc, { color: colors.textSecondary }]}>
                  {config.description}
                </Text>
              </View>
              <ChevronRight size={20} color={colors.textSecondary} />
            </TouchableOpacity>
          ))}
        </>
      ) : (
        <View style={[styles.formCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <TouchableOpacity
            style={styles.backToPlatforms}
            onPress={() => setSelectedPlatform(null)}
          >
            <ArrowLeft size={20} color={colors.textSecondary} />
            <Text style={[styles.backText, { color: colors.textSecondary }]}>Back to platforms</Text>
          </TouchableOpacity>
          
          {(() => {
            const config = PLATFORM_CONFIGS[selectedPlatform as keyof typeof PLATFORM_CONFIGS];
            return (
              <>
                <View style={styles.formHeader}>
                  <View style={[styles.platformIconLarge, { backgroundColor: config.color }]}>
                    <config.icon size={28} color="#fff" />
                  </View>
                  <View>
                    <Text style={[styles.formTitle, { color: colors.text }]}>Connect {config.name}</Text>
                    <Text style={[styles.formSubtitle, { color: colors.textSecondary }]}>
                      Enter your credentials to connect
                    </Text>
                  </View>
                </View>
                
                {config.fields.map((field, index) => (
                  <View key={field} style={styles.inputGroup}>
                    <Text style={[styles.inputLabel, { color: colors.text }]}>{field}</Text>
                    <TextInput
                      style={[styles.input, { 
                        backgroundColor: colors.background, 
                        color: colors.text,
                        borderColor: colors.border 
                      }]}
                      placeholder={`Enter ${field}`}
                      placeholderTextColor={colors.textSecondary}
                      secureTextEntry={field.toLowerCase().includes('token') || field.toLowerCase().includes('password')}
                    />
                  </View>
                ))}
                
                <TouchableOpacity style={[styles.connectBtn, { backgroundColor: config.color }]}>
                  <Link size={20} color="#fff" />
                  <Text style={styles.connectBtnText}>Connect {config.name}</Text>
                </TouchableOpacity>
              </>
            );
          })()}
        </View>
      )}
    </Animated.View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={colors.text} />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={[styles.headerTitle, { color: colors.text }]}>Chat Platforms</Text>
          <Text style={[styles.headerSubtitle, { color: colors.textSecondary }]}>
            Slack, Teams & WhatsApp Integration
          </Text>
        </View>
      </View>

      {/* Tabs */}
      <View style={[styles.tabContainer, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'connections' && { backgroundColor: colors.accent + '20' }]}
          onPress={() => setActiveTab('connections')}
        >
          <Link size={18} color={activeTab === 'connections' ? colors.accent : colors.textSecondary} />
          <Text style={[styles.tabText, { color: activeTab === 'connections' ? colors.accent : colors.textSecondary }]}>
            Connections
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'add' && { backgroundColor: colors.accent + '20' }]}
          onPress={() => { setActiveTab('add'); setSelectedPlatform(null); }}
        >
          <Plus size={18} color={activeTab === 'add' ? colors.accent : colors.textSecondary} />
          <Text style={[styles.tabText, { color: activeTab === 'add' ? colors.accent : colors.textSecondary }]}>
            Add Platform
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {activeTab === 'connections' ? (
          <>
            {/* Stats Overview */}
            <Animated.View entering={FadeInUp.duration(600)} style={styles.statsRow}>
              <View style={[styles.statCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
                <LinearGradient colors={['#22c55e', '#16a34a']} style={styles.statIcon}>
                  <CircleCheck size={18} color="#fff" />
                </LinearGradient>
                <Text style={[styles.statCardValue, { color: colors.text }]}>2</Text>
                <Text style={[styles.statCardLabel, { color: colors.textSecondary }]}>Connected</Text>
              </View>
              <View style={[styles.statCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
                <LinearGradient colors={['#f59e0b', '#d97706']} style={styles.statIcon}>
                  <CircleAlert size={18} color="#fff" />
                </LinearGradient>
                <Text style={[styles.statCardValue, { color: colors.text }]}>1</Text>
                <Text style={[styles.statCardLabel, { color: colors.textSecondary }]}>Pending</Text>
              </View>
              <View style={[styles.statCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
                <LinearGradient colors={['#6366f1', '#8b5cf6']} style={styles.statIcon}>
                  <MessageCircle size={18} color="#fff" />
                </LinearGradient>
                <Text style={[styles.statCardValue, { color: colors.text }]}>4.3K</Text>
                <Text style={[styles.statCardLabel, { color: colors.textSecondary }]}>Messages</Text>
              </View>
            </Animated.View>

            {/* Connection List */}
            <Text style={[styles.sectionTitle, { color: colors.text, marginHorizontal: 16, marginBottom: 12 }]}>
              Active Connections
            </Text>
            {CONNECTIONS.map((connection, index) => renderConnectionCard(connection, index))}
          </>
        ) : (
          renderAddPlatform()
        )}
        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  backButton: {
    padding: 8,
  },
  headerContent: {
    flex: 1,
    marginLeft: 12,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    fontSize: 14,
    marginTop: 2,
  },
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    borderWidth: 1,
    padding: 4,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 8,
    gap: 6,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 12,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statCardValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  statCardLabel: {
    fontSize: 12,
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  connectionCard: {
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
  },
  connectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  platformIcon: {
    width: 44,
    height: 44,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  connectionInfo: {
    flex: 1,
    marginLeft: 12,
  },
  connectionName: {
    fontSize: 16,
    fontWeight: '600',
  },
  connectionWorkspace: {
    fontSize: 13,
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  connectionStats: {
    flexDirection: 'row',
    gap: 20,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  statLabel: {
    fontSize: 12,
  },
  settingsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
  },
  setting: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  settingLabel: {
    fontSize: 13,
  },
  connectionActions: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 12,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    flex: 1,
    justifyContent: 'center',
  },
  actionText: {
    fontSize: 13,
    fontWeight: '600',
  },
  addContainer: {
    paddingHorizontal: 16,
  },
  addTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  addSubtitle: {
    fontSize: 14,
    marginBottom: 20,
  },
  platformCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 12,
  },
  platformIconLarge: {
    width: 56,
    height: 56,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  platformInfo: {
    flex: 1,
    marginLeft: 16,
    marginRight: 12,
  },
  platformName: {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 4,
  },
  platformDesc: {
    fontSize: 13,
    lineHeight: 18,
  },
  formCard: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
  },
  backToPlatforms: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 20,
  },
  backText: {
    fontSize: 14,
  },
  formHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 24,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  formSubtitle: {
    fontSize: 14,
    marginTop: 2,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  input: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    fontSize: 15,
  },
  connectBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 8,
  },
  connectBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
