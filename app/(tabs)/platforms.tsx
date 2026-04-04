import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  TextInput,
  Alert,
  Linking,
} from 'react-native';
import {
  Plus,
  Search,
  Filter,
  Smartphone,
  MessageSquare,
  Activity,
  Mail,
  Phone,
  CheckCircle,
  Shield,
  Cloud,
  Info,
} from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PlatformCard, Platform } from '@/components/platforms/PlatformCard';
import { ConnectionModal } from '@/components/platforms/ConnectionModal';
import { usePlatformConnection } from '@/hooks/usePlatformConnection';
import type { ConnectionStep } from '@/hooks/usePlatformConnection';

const MOCK_PLATFORMS: Platform[] = [
  {
    id: '1',
    name: 'WhatsApp',
    service: 'whatsapp',
    isConnected: false,
    isEnabled: false,
    accountName: 'Not connected',
    avatar: '',
    messageCount: 0,
    lastSync: 'Never',
    category: 'messaging',
    description: 'End-to-end encrypted messaging with enhanced QR linking, business API, multi-device sync, and automated responses',
    features: ['QR Code', 'On-device', 'E2E encrypted', 'Multi-device', 'Business API'],
    popularity: 98,
    isVerified: true,
    connectionType: 'qr-code',
    connectionMethod: 'on-device',
    status: 'active',
    monthlyMessages: 0,
    responseTime: 'N/A',
    websiteUrl: 'https://www.whatsapp.com',
    apiDocUrl: 'https://developers.facebook.com/docs/whatsapp',
    appStoreUrl: 'https://apps.apple.com/app/whatsapp-messenger/id310633997',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.whatsapp',
  },
  {
    id: '2',
    name: 'Signal',
    service: 'signal',
    isConnected: false,
    isEnabled: false,
    accountName: 'Not connected',
    avatar: '',
    messageCount: 0,
    lastSync: 'Never',
    category: 'messaging',
    description: 'Privacy-focused messaging with QR code pairing',
    features: ['QR Code', 'On-device', 'Privacy-first'],
    popularity: 85,
    isVerified: true,
    connectionType: 'qr-code',
    connectionMethod: 'on-device',
    status: 'active',
    monthlyMessages: 0,
    responseTime: 'N/A',
    websiteUrl: 'https://signal.org',
    apiDocUrl: 'https://signal.org/docs/',
    appStoreUrl: 'https://apps.apple.com/app/signal-private-messenger/id874139669',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=org.thoughtcrime.securesms',
  },
  {
    id: '3',
    name: 'Instagram',
    service: 'instagram',
    isConnected: false,
    isEnabled: false,
    accountName: 'Not connected',
    avatar: '',
    messageCount: 0,
    lastSync: 'Never',
    category: 'social',
    description: 'Direct messages via cloud bridge with 2FA support',
    features: ['Username/Password', 'Cloud', '2FA'],
    popularity: 96,
    isVerified: true,
    connectionType: 'credentials',
    connectionMethod: 'cloud',
    status: 'active',
    monthlyMessages: 0,
    responseTime: 'N/A',
    websiteUrl: 'https://www.instagram.com',
    apiDocUrl: 'https://developers.facebook.com/docs/instagram',
    appStoreUrl: 'https://apps.apple.com/app/instagram/id389801252',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.instagram.android',
  },
  {
    id: '4',
    name: 'Telegram',
    service: 'telegram',
    isConnected: false,
    isEnabled: false,
    accountName: 'Not connected',
    avatar: '',
    messageCount: 0,
    lastSync: 'Never',
    category: 'messaging',
    description: 'Fast, secure messaging with bot capabilities',
    features: ['QR Code', 'Cloud', 'Bots'],
    popularity: 92,
    isVerified: true,
    connectionType: 'qr-code',
    connectionMethod: 'cloud',
    status: 'active',
    monthlyMessages: 0,
    responseTime: 'N/A',
    websiteUrl: 'https://telegram.org',
    apiDocUrl: 'https://core.telegram.org/api',
    appStoreUrl: 'https://apps.apple.com/app/telegram-messenger/id686449807',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=org.telegram.messenger',
  },
  {
    id: '7',
    name: 'Facebook Messenger',
    service: 'messenger',
    isConnected: false,
    isEnabled: false,
    accountName: 'Not connected',
    avatar: '',
    messageCount: 0,
    lastSync: 'Never',
    category: 'social',
    description: 'Facebook messaging via OAuth',
    features: ['OAuth', 'Cloud', 'Rich media'],
    popularity: 94,
    isVerified: true,
    connectionType: 'oauth',
    connectionMethod: 'cloud',
    status: 'active',
    monthlyMessages: 0,
    responseTime: 'N/A',
    websiteUrl: 'https://www.messenger.com',
    apiDocUrl: 'https://developers.facebook.com/docs/messenger-platform',
    appStoreUrl: 'https://apps.apple.com/app/messenger/id454638411',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.facebook.orca',
  },
  {
    id: '9',
    name: 'Slack',
    service: 'slack',
    isConnected: false,
    isEnabled: false,
    accountName: 'Not connected',
    avatar: '',
    messageCount: 0,
    lastSync: 'Never',
    category: 'business',
    description: 'Team collaboration via OAuth',
    features: ['OAuth', 'Cloud', 'Channels'],
    popularity: 91,
    isVerified: true,
    connectionType: 'oauth',
    connectionMethod: 'cloud',
    status: 'active',
    monthlyMessages: 0,
    responseTime: 'N/A',
    websiteUrl: 'https://slack.com',
    apiDocUrl: 'https://api.slack.com',
    appStoreUrl: 'https://apps.apple.com/app/slack/id618783545',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.Slack',
  },
];

export default function PlatformsScreen() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [platforms, setPlatforms] = useState<Platform[]>(MOCK_PLATFORMS);
  const [connectionModal, setConnectionModal] = useState<{
    visible: boolean;
    platform: Platform | null;
    step: ConnectionStep;
    qrCode?: string;
    linkingCode?: string;
  }>({
    visible: false,
    platform: null,
    step: 'method',
  });

  const connection = usePlatformConnection();
  const countdownIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const closeConnectionModal = React.useCallback(() => {
    setConnectionModal({
      visible: false,
      platform: null,
      step: 'method',
    });
    connection.resetAuthData();
  }, [connection]);

  useEffect(() => {
    if (!connectionModal.visible || connectionModal.step !== 'qr-code') {
      if (countdownIntervalRef.current) {
        clearInterval(countdownIntervalRef.current);
        countdownIntervalRef.current = null;
      }
      return;
    }

    const tick = () => {
      connection.setQrState((prev) => ({
        ...prev,
        remainingSeconds: connection.computeRemainingSeconds(prev.expiresAtIso),
      }));
    };

    tick();
    countdownIntervalRef.current = setInterval(tick, 1000);

    return () => {
      if (countdownIntervalRef.current) {
        clearInterval(countdownIntervalRef.current);
        countdownIntervalRef.current = null;
      }
    };
  }, [connectionModal.step, connectionModal.visible, connection]);

  const modalPlatformService = connectionModal.platform?.service;
  const modalStep = connectionModal.step;
  const modalVisible = connectionModal.visible;
  const autoVerifyEnabled = connection.qrState.autoVerifyEnabled;
  const currentSessionId = connection.sessionData.sessionId;

  useEffect(() => {
    const shouldRun = modalVisible && modalStep === 'qr-code';

    if (!shouldRun || !autoVerifyEnabled) {
      if (connection.autoVerifyIntervalRef.current) {
        clearInterval(connection.autoVerifyIntervalRef.current);
        connection.autoVerifyIntervalRef.current = null;
      }
      connection.setQrState((prev) => (prev.isAutoVerifying ? { ...prev, isAutoVerifying: false } : prev));
      return;
    }

    if (!currentSessionId || !modalPlatformService) return;

    const isWhatsApp = modalPlatformService === 'whatsapp';
    if (!isWhatsApp) return;

    const intervalMs = 2500;
    let inFlight = false;
    let isMounted = true;
    const currentPlatform = connectionModal.platform;
    const currentLinkingCode = connectionModal.linkingCode;

    const poll = async () => {
      if (!isMounted || inFlight || !currentPlatform) return;
      if (connection.qrRemainingSecondsRef.current <= 0) return;

      inFlight = true;
      try {
        const result = await connection.completeQRConnection(
          currentPlatform,
          currentLinkingCode
        );
        if (result && result.verified && result.accountName) {
          setPlatforms((prev) =>
            prev.map((p) =>
              p.id === currentPlatform.id
                ? { ...p, isConnected: true, accountName: result.accountName || 'Connected', status: 'active' as const }
                : p
            )
          );
          setConnectionModal((prev) => ({ ...prev, step: 'success' }));
          setTimeout(() => closeConnectionModal(), 2000);
        }
      } catch (e) {
        console.log('[Platforms] auto-verify error', e);
      } finally {
        inFlight = false;
      }
    };

    if (connection.autoVerifyIntervalRef.current) {
      clearInterval(connection.autoVerifyIntervalRef.current);
    }

    connection.setQrState((prev) => (prev.isAutoVerifying ? prev : { ...prev, isAutoVerifying: true }));
    poll();
    connection.autoVerifyIntervalRef.current = setInterval(poll, intervalMs);

    return () => {
      isMounted = false;
      if (connection.autoVerifyIntervalRef.current) {
        clearInterval(connection.autoVerifyIntervalRef.current);
        connection.autoVerifyIntervalRef.current = null;
      }
      connection.setQrState((prev) => (prev.isAutoVerifying ? { ...prev, isAutoVerifying: false } : prev));
    };
  }, [modalStep, modalVisible, modalPlatformService, autoVerifyEnabled, currentSessionId, connectionModal.platform, connectionModal.linkingCode, connection, closeConnectionModal]);

  const openConnectionModal = (platform: Platform) => {
    setConnectionModal({
      visible: true,
      platform,
      step: 'method',
    });
    connection.resetAuthData();
  };

  const handleQRConnect = async () => {
    if (!connectionModal.platform) return;
    const result = await connection.handleQRCodeConnect(connectionModal.platform);
    if (result) {
      setConnectionModal((prev) => ({
        ...prev,
        step: 'qr-code',
        qrCode: result.qrCode,
        linkingCode: result.linkingCode,
      }));
    }
  };

  const handleCompleteQR = async () => {
    if (!connectionModal.platform) return;
    const result = await connection.completeQRConnection(connectionModal.platform, connectionModal.linkingCode);
    if (result && result.verified) {
      setPlatforms((prev) =>
        prev.map((p) =>
          p.id === connectionModal.platform!.id
            ? { ...p, isConnected: true, accountName: result.accountName || 'Connected', status: 'active' as const }
            : p
        )
      );
      setConnectionModal((prev) => ({ ...prev, step: 'success' }));
      setTimeout(() => closeConnectionModal(), 2000);
    }
  };

  const handleOAuthConnect = async () => {
    if (!connectionModal.platform) return;
    const result = await connection.handleOAuthConnect(connectionModal.platform);
    if (result?.success) {
      setPlatforms((prev) =>
        prev.map((p) =>
          p.id === connectionModal.platform!.id
            ? { ...p, isConnected: true, accountName: result.accountName, status: 'active' as const }
            : p
        )
      );
      setConnectionModal((prev) => ({ ...prev, step: 'success' }));
      setTimeout(() => closeConnectionModal(), 2000);
    }
  };

  const handleCredentialsConnect = async () => {
    if (!connectionModal.platform) return;
    const result = await connection.handleCredentialsConnect(connectionModal.platform);
    if (result?.requires2FA) {
      setConnectionModal((prev) => ({ ...prev, step: '2fa' }));
    } else if (result?.success) {
      setPlatforms((prev) =>
        prev.map((p) =>
          p.id === connectionModal.platform!.id
            ? { ...p, isConnected: true, accountName: result.accountName, status: 'active' as const }
            : p
        )
      );
      setConnectionModal((prev) => ({ ...prev, step: 'success' }));
      setTimeout(() => closeConnectionModal(), 2000);
    }
  };

  const handle2FAVerify = async () => {
    if (!connectionModal.platform) return;
    const result = await connection.handle2FAVerification(connectionModal.platform);
    if (result && result.verified) {
      setPlatforms((prev) =>
        prev.map((p) =>
          p.id === connectionModal.platform!.id
            ? { ...p, isConnected: true, accountName: result.accountName || connection.authData.email || 'Connected', status: 'active' as const }
            : p
        )
      );
      setConnectionModal((prev) => ({ ...prev, step: 'success' }));
      setTimeout(() => closeConnectionModal(), 2000);
    }
  };

  const handleGoogleAccountConnect = async () => {
    if (!connectionModal.platform) return;
    setConnectionModal((prev) => ({ ...prev, step: 'linking' }));
    const result = await connection.handleGoogleAccountConnect();
    const platform = connectionModal.platform;
    if (result && platform) {
      setPlatforms((prev) =>
        prev.map((p) =>
          p.id === platform.id
            ? { ...p, isConnected: true, accountName: 'Google Account', status: 'active' as const }
            : p
        )
      );
      setConnectionModal((prev) => ({ ...prev, step: 'success' }));
      setTimeout(() => closeConnectionModal(), 2000);
    }
  };

  const handleDisconnect = (platform: Platform) => {
    Alert.alert('Disconnect Platform', `Are you sure you want to disconnect ${platform.name}?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Disconnect',
        style: 'destructive',
        onPress: () => {
          setPlatforms((prev) =>
            prev.map((p) =>
              p.id === platform.id
                ? {
                    ...p,
                    isConnected: false,
                    isEnabled: false,
                    accountName: 'Not connected',
                    status: 'active' as const,
                    messageCount: 0,
                    monthlyMessages: 0,
                    lastSync: 'Never',
                  }
                : p
            )
          );
        },
      },
    ]);
  };

  const handleSync = (platform: Platform) => {
    setPlatforms((prev) =>
      prev.map((p) => (p.id === platform.id ? { ...p, status: 'syncing' as const, lastSync: 'Syncing...' } : p))
    );

    setTimeout(() => {
      setPlatforms((prev) =>
        prev.map((p) => (p.id === platform.id ? { ...p, status: 'active' as const, lastSync: 'Just now' } : p))
      );
    }, 2000);
  };

  const togglePlatformEnabled = (platformId: string) => {
    setPlatforms((prev) =>
      prev.map((platform) => (platform.id === platformId ? { ...platform, isEnabled: !platform.isEnabled } : platform))
    );
  };

  const openPlatformUrl = async (url: string, platformName: string) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert('Error', `Cannot open ${platformName}. Please install the app first.`);
      }
    } catch {
      Alert.alert('Error', 'Failed to open platform');
    }
  };

  const openApiDocs = async (url: string) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert('Error', 'Cannot open documentation');
      }
    } catch {
      Alert.alert('Error', 'Failed to open documentation');
    }
  };

  const getIconForService = (service: string) => {
    const icons: { [key: string]: any } = {
      whatsapp: MessageSquare,
      telegram: MessageSquare,
      instagram: MessageSquare,
      messenger: MessageSquare,
      discord: MessageSquare,
      sms: Smartphone,
      email: Mail,
      voice: Phone,
      twitter: MessageSquare,
      signal: Shield,
      slack: MessageSquare,
    };
    return icons[service] || MessageSquare;
  };

  const getColorForService = (service: string) => {
    const colors: { [key: string]: string } = {
      whatsapp: '#25D366',
      telegram: '#0088CC',
      instagram: '#E4405F',
      messenger: '#006AFF',
      discord: '#5865F2',
      sms: '#34C759',
      email: '#FF9500',
      voice: '#AF52DE',
      twitter: '#1DA1F2',
      signal: '#3A76F0',
      slack: '#4A154B',
    };
    return colors[service] || '#007AFF';
  };

  const connectedPlatforms = platforms.filter((p) => p.isConnected);
  const availablePlatforms = platforms.filter((p) => !p.isConnected);

  const filteredConnected = connectedPlatforms
    .filter((p) => selectedCategory === 'all' || p.category === selectedCategory)
    .filter((p) => searchQuery === '' || p.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const filteredAvailable = availablePlatforms
    .filter((p) => selectedCategory === 'all' || p.category === selectedCategory)
    .filter((p) => searchQuery === '' || p.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View
        style={[
          styles.realTimeStatusBanner,
          { backgroundColor: '#E8F5E9', paddingTop: insets.top + 8 },
        ]}
      >
        <View style={styles.realTimeContent}>
          <CheckCircle size={16} color="#4CAF50" />
          <Text style={styles.realTimeText}>Real-time Platform Sync Active</Text>
          <View style={styles.realTimeBadge}>
            <Activity size={12} color="#2196F3" />
          </View>
        </View>
      </View>

      <View style={[styles.header, { backgroundColor: theme.colors.background, paddingTop: 20 }]}>
        <View>
          <Text style={[styles.title, { color: theme.colors.text }]}>Connected Platforms</Text>
          <Text style={[styles.subtitle, { color: theme.colors.secondaryText }]}>
            Manage your messaging accounts
          </Text>
        </View>
        <TouchableOpacity
          style={[styles.addButton, { backgroundColor: theme.colors.primary }]}
          onPress={() => router.push('/add-service')}
        >
          <Plus size={20} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.searchContainer}>
          <View style={[styles.searchBar, { backgroundColor: theme.colors.cardBackground }]}>
            <Search size={20} color={theme.colors.secondaryText} />
            <TextInput
              style={[styles.searchInput, { color: theme.colors.text }]}
              placeholder="Search platforms..."
              placeholderTextColor={theme.colors.secondaryText}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          <TouchableOpacity style={[styles.filterButton, { backgroundColor: theme.colors.cardBackground }]}>
            <Filter size={20} color={theme.colors.text} />
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryContainer}>
          {['all', 'messaging', 'social', 'business', 'email', 'voice'].map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryChip,
                {
                  backgroundColor: selectedCategory === category ? theme.colors.primary : theme.colors.cardBackground,
                },
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text
                style={[
                  styles.categoryText,
                  {
                    color: selectedCategory === category ? 'white' : theme.colors.text,
                  },
                ]}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={[styles.statsOverview, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.overviewItem}>
            <Activity size={20} color={theme.colors.primary} />
            <Text style={[styles.overviewValue, { color: theme.colors.text }]}>{connectedPlatforms.length}</Text>
            <Text style={[styles.overviewLabel, { color: theme.colors.secondaryText }]}>Connected</Text>
          </View>
          <View style={styles.overviewItem}>
            <Smartphone size={20} color="#34C759" />
            <Text style={[styles.overviewValue, { color: theme.colors.text }]}>
              {connectedPlatforms.filter((p) => p.connectionMethod === 'on-device').length}
            </Text>
            <Text style={[styles.overviewLabel, { color: theme.colors.secondaryText }]}>On-device</Text>
          </View>
          <View style={styles.overviewItem}>
            <Cloud size={20} color="#FF9500" />
            <Text style={[styles.overviewValue, { color: theme.colors.text }]}>
              {connectedPlatforms.filter((p) => p.connectionMethod === 'cloud').length}
            </Text>
            <Text style={[styles.overviewLabel, { color: theme.colors.secondaryText }]}>Cloud</Text>
          </View>
        </View>

        {filteredConnected.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Connected Platforms</Text>
              <View style={styles.badge}>
                <Text style={[styles.badgeText, { color: theme.colors.primary }]}>{filteredConnected.length}</Text>
              </View>
            </View>
            <FlatList
              data={filteredConnected}
              renderItem={({ item }) => (
                <PlatformCard
                  platform={item}
                  onConnect={openConnectionModal}
                  onDisconnect={handleDisconnect}
                  onSync={handleSync}
                  onToggleEnabled={togglePlatformEnabled}
                  onOpenUrl={openPlatformUrl}
                  onOpenApiDocs={openApiDocs}
                  getIconForService={getIconForService}
                  getColorForService={getColorForService}
                />
              )}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              contentContainerStyle={styles.platformsList}
            />
          </View>
        )}

        {filteredAvailable.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Available Platforms</Text>
              <View style={styles.badge}>
                <Text style={[styles.badgeText, { color: theme.colors.primary }]}>{filteredAvailable.length}</Text>
              </View>
            </View>
            <FlatList
              data={filteredAvailable}
              renderItem={({ item }) => (
                <PlatformCard
                  platform={item}
                  onConnect={openConnectionModal}
                  onDisconnect={handleDisconnect}
                  onSync={handleSync}
                  onToggleEnabled={togglePlatformEnabled}
                  onOpenUrl={openPlatformUrl}
                  onOpenApiDocs={openApiDocs}
                  getIconForService={getIconForService}
                  getColorForService={getColorForService}
                />
              )}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              contentContainerStyle={styles.platformsList}
            />
          </View>
        )}

        <View style={[styles.guideCard, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.guideHeader}>
            <Info size={24} color={theme.colors.primary} />
            <Text style={[styles.guideTitle, { color: theme.colors.text }]}>Connection Methods</Text>
          </View>
          <Text style={[styles.guideText, { color: theme.colors.secondaryText }]}>
            <Text style={{ fontWeight: '600' }}>On-device:</Text> Most secure. Messages go directly from your device to
            the platform&apos;s servers.{'\n\n'}
            <Text style={{ fontWeight: '600' }}>Cloud:</Text> Messages are relayed through our encrypted servers for
            platforms without native multi-device support.
          </Text>
        </View>
      </ScrollView>

      <ConnectionModal
        visible={connectionModal.visible}
        platform={connectionModal.platform}
        step={connectionModal.step}
        qrCode={connectionModal.qrCode}
        linkingCode={connectionModal.linkingCode}
        isConnecting={connection.isConnecting}
        authData={connection.authData}
        qrState={connection.qrState}
        onClose={closeConnectionModal}
        onQRConnect={handleQRConnect}
        onOAuthConnect={handleOAuthConnect}
        onCredentialsConnect={handleCredentialsConnect}
        on2FAVerify={handle2FAVerify}
        onGoogleAccountConnect={handleGoogleAccountConnect}
        onCompleteQR={handleCompleteQR}
        onRefreshQR={handleQRConnect}
        onSetStep={(step) => setConnectionModal((prev) => ({ ...prev, step }))}
        onAuthDataChange={(data) => connection.setAuthData((prev) => ({ ...prev, ...data }))}
        onQRStateChange={(data) => connection.setQrState((prev) => ({ ...prev, ...data }))}
        getColorForService={getColorForService}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
  },
  addButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 12,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  filterButton: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryContainer: {
    marginBottom: 20,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
  },
  statsOverview: {
    flexDirection: 'row',
    padding: 20,
    borderRadius: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  overviewItem: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  overviewValue: {
    fontSize: 20,
    fontWeight: '700',
  },
  overviewLabel: {
    fontSize: 12,
    textAlign: 'center',
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  badge: {
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  platformsList: {
    gap: 12,
  },
  guideCard: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  guideHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  guideTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  guideText: {
    fontSize: 14,
    lineHeight: 22,
  },
  realTimeStatusBanner: {
    paddingHorizontal: 20,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  realTimeContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  realTimeText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#2E7D32',
    flex: 1,
  },
  realTimeBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
