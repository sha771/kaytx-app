 
import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  TextInput,
  Alert,
  Linking,
  Image,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import {
  Plus,
  Search,
  ListFilter,
  Smartphone,
  MessageSquare,
  Activity,
  Mail,
  Phone,
  Info,
  Shield,
  Cloud,
  X,
  QrCode,
  CircleCheck,
} from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RelatedFeatures, QuickLinks } from '@/components/RelatedFeatures';
import { PlatformCard } from '@/components/platforms/PlatformCard';
import { PLATFORMS_DATA, Platform } from '@/constants/platforms';
import { usePlatformConnection } from '@/hooks/usePlatformConnection';
import { usePlatforms } from '@/lib/react-query-provider';
import { trpc } from '@/lib/trpc';

// Consolidated platform data moved to @/constants/platforms

type ConnectionStep = 'method' | 'qr-code' | 'linking' | '2fa' | 'success';

export default function PlatformsScreen() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const connection = usePlatformConnection();
  const {
    disconnectPlatform,
    syncPlatform,
  } = usePlatforms();

  // tRPC data fetching
  const { refetch: refetchPlatforms } = trpc.platforms.getAll.useQuery();
  const { refetch: refetchConnected } = trpc.platforms.listAll.useQuery();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [platforms, setPlatforms] = useState<Platform[]>(PLATFORMS_DATA);

  const loadPlatforms = useCallback(async () => {
    try {
      await refetchPlatforms();
      await refetchConnected();
    } catch (error) {
      console.error('Failed to load platforms:', error);
    }
  }, [refetchPlatforms, refetchConnected]);

  // Load platforms from backend on component mount
  useEffect(() => {
    loadPlatforms();
  }, [loadPlatforms]);

  const { data: searchResultsData } = trpc.platforms.search.useQuery(searchQuery, {
    enabled: searchQuery.trim().length > 0
  });

  useEffect(() => {
    if (searchResultsData) {
      setPlatforms(searchResultsData || []);
    } else if (!searchQuery.trim()) {
      setPlatforms(PLATFORMS_DATA);
    }
  }, [searchResultsData, searchQuery]);

  const handleSync: (platform: Platform) => void = (platform: Platform) => {
    syncPlatform(platform.id).then(() => {
      Alert.alert('Sync Started', 'Platform synchronization has been initiated.');
    }).catch((error: any) => {
      console.error('Failed to sync platform:', error);
      Alert.alert('Sync Failed', 'Unable to sync platform. Please try again.');
    });
  };

  const handleDisconnect: (platform: Platform) => void = (platform: Platform) => {
    disconnectPlatform(platform.id).then(() => {
      loadPlatforms();
    }).catch((error: any) => {
      console.error('Failed to disconnect platform:', error);
      Alert.alert('Disconnection Failed', 'Unable to disconnect platform. Please try again.');
    });
  };

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

  const closeConnectionModal = () => {
    setConnectionModal({ visible: false, platform: null, step: 'method' });
    connection.resetAuthData();
  };

  const openConnectionModal = (platform: Platform) => {
    setConnectionModal({
      visible: true,
      platform,
      step: 'method',
    });
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
    const result = await connection.handleGoogleAccountConnect(connectionModal.platform);
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

  const connectedPlatformList = platforms.filter((p) => p.isConnected);
  const availablePlatformList = platforms.filter((p) => !p.isConnected);

  const filteredConnected = connectedPlatformList
    .filter((p) => selectedCategory === 'all' || p.category === selectedCategory)
    .filter((p) => searchQuery === '' || p.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const filteredAvailable = availablePlatformList
    .filter((p) => selectedCategory === 'all' || p.category === selectedCategory)
    .filter((p) => searchQuery === '' || p.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <>
      <View style={[styles.enterpriseHero, { paddingTop: insets.top + 20, backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.statsOverview}>
          <View style={styles.overviewItem}>
            <Text style={[styles.overviewValue, { color: theme.colors.text }]}>$128.5k</Text>
            <Text style={[styles.overviewLabel, { color: theme.colors.secondaryText }]}>Total Revenue Flow</Text>
          </View>
          <View style={styles.overviewDivider} />
          <View style={styles.overviewItem}>
            <Text style={[styles.overviewValue, { color: theme.colors.text }]}>892k</Text>
            <Text style={[styles.overviewLabel, { color: theme.colors.secondaryText }]}>Autonomous Actions</Text>
          </View>
          <View style={styles.overviewDivider} />
          <View style={styles.overviewItem}>
            <Text style={[styles.overviewValue, { color: '#34C759' }]}>99.99%</Text>
            <Text style={[styles.overviewLabel, { color: theme.colors.secondaryText }]}>Sync Reliability</Text>
          </View>
        </View>

        <View style={[styles.syncStatusBar, { backgroundColor: theme.colors.background }]}>
          <View style={styles.syncPulse} />
          <Text style={[styles.syncText, { color: theme.colors.text }]}>Unified Cloud Bridge: ACTIVE</Text>
          <View style={styles.latencyBadge}>
            <Activity size={10} color="#34C759" />
            <Text style={styles.latencyText}>8ms Global Latency</Text>
          </View>
        </View>
      </View>

      <View style={[styles.header, { backgroundColor: theme.colors.background }]}>
        <View>
          <Text style={[styles.title, { color: theme.colors.text }]}>Omnichannel Control</Text>
          <Text style={[styles.subtitle, { color: theme.colors.secondaryText }]}>
            Managing {connectedPlatformList.length} active channels across the enterprise.
          </Text>
        </View>
        <TouchableOpacity style={[styles.addButton, { backgroundColor: theme.colors.primary }]} onPress={() => router.push('/add-service')}>
          <Plus size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={[styles.enterpriseBanner, { backgroundColor: theme.colors.primary + '10', borderColor: theme.colors.primary + '30' }]}>
          <Shield size={20} color={theme.colors.primary} />
          <View style={styles.enterpriseBannerContent}>
            <Text style={[styles.enterpriseBannerTitle, { color: theme.colors.text }]}>End-to-End Encryption</Text>
            <Text style={[styles.enterpriseBannerText, { color: theme.colors.secondaryText }]}>
              All platform connections utilize hardware-level HSM modules for key storage.
            </Text>
          </View>
        </View>

        <View style={styles.searchContainer}>
          <View style={[styles.searchBar, { backgroundColor: theme.colors.cardBackground }]}>
            <Search size={20} color={theme.colors.secondaryText} />
            <TextInput
              style={[styles.searchInput, { color: theme.colors.text }]}
              placeholder="Search platforms, features, or protocols..."
              placeholderTextColor={theme.colors.secondaryText}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          <TouchableOpacity style={[styles.filterButton, { backgroundColor: theme.colors.cardBackground }]}>
            <ListFilter size={20} color={theme.colors.text} />
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
            <Text style={[styles.overviewValue, { color: theme.colors.text }]}>{connectedPlatformList.length}</Text>
            <Text style={[styles.overviewLabel, { color: theme.colors.secondaryText }]}>Connected</Text>
          </View>
          <View style={styles.overviewItem}>
            <Smartphone size={20} color="#34C759" />
            <Text style={[styles.overviewValue, { color: theme.colors.text }]}>
              {connectedPlatformList.filter((p) => p.connectionMethod === 'on-device').length}
            </Text>
            <Text style={[styles.overviewLabel, { color: theme.colors.secondaryText }]}>On-device</Text>
          </View>
          <View style={styles.overviewItem}>
            <Cloud size={20} color="#FF9500" />
            <Text style={[styles.overviewValue, { color: theme.colors.text }]}>
              {connectedPlatformList.filter((p) => p.connectionMethod === 'cloud').length}
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
            <Text style={{ fontWeight: '600' }}>Enterprise On-device:</Text> Most secure. Messages go directly from your device to
            the platform&apos;s servers with enterprise-grade encryption and compliance.{'\n\n'}
            <Text style={{ fontWeight: '600' }}>Enterprise Cloud:</Text> Messages are relayed through our encrypted enterprise servers with
            SOC 2, GDPR, and HIPAA compliance for platforms without native multi-device support.{'\n\n'}
            <Text style={{ fontWeight: '600' }}>Enterprise Features:</Text> Advanced security, audit logging, role-based access control,
            real-time monitoring, automated failover, and 99.999% uptime SLA.
          </Text>
        </View>
      </ScrollView>

      {/* Related Features */}
      <RelatedFeatures
        featureId="communications-hub"
        title="Related Communication Features"
        maxItems={6}
        layout="horizontal"
      />

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
        onSetStep={(step: any) => setConnectionModal((prev) => ({ ...prev, step }))}
        onAuthDataChange={(data: any) => connection.setAuthData((prev) => ({ ...prev, ...data }))}
        onQRStateChange={(data: any) => connection.setQrState((prev) => ({ ...prev, ...data }))}
        getColorForService={getColorForService}
      />
    </>
  );
}

// Sub-component for Connection Modal
const ConnectionModal = ({ visible, platform, step, onSetStep, onClose, ...props }: any) => {
  const { theme } = useTheme();
  if (!visible || !platform) return null;

  return (
    <View style={StyleSheet.absoluteFillObject}>
      <TouchableOpacity
        style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.6)' }}
        activeOpacity={1}
        onPress={onClose}
      />
      <View style={{
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: theme.colors.background,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 24,
        minHeight: 400
      }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: '800', color: theme.colors.text }}>
            Connect {platform.name}
          </Text>
          <TouchableOpacity onPress={onClose}>
            <X size={24} color={theme.colors.text} />
          </TouchableOpacity>
        </View>

        {step === 'method' && (
          <View>
            <Text style={{ color: theme.colors.secondaryText, marginBottom: 20 }}>
              Choose your preferred authentication method.
            </Text>
            <TouchableOpacity
              style={{
                padding: 20,
                borderRadius: 15,
                backgroundColor: theme.colors.cardBackground,
                marginBottom: 12,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 15
              }}
              onPress={props.onQRConnect}
            >
              <QrCode size={24} color={theme.colors.primary} />
              <Text style={{ color: theme.colors.text, fontWeight: '600' }}>QR Code Pairing</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                padding: 20,
                borderRadius: 15,
                backgroundColor: theme.colors.cardBackground,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 15
              }}
              onPress={props.onOAuthConnect}
            >
              <Cloud size={24} color={theme.colors.primary} />
              <Text style={{ color: theme.colors.text, fontWeight: '600' }}>Cloud OAuth</Text>
            </TouchableOpacity>
          </View>
        )}

        {step === 'qr-code' && (
          <View style={{ alignItems: 'center' }}>
            {props.qrCode ? (
              <Image source={{ uri: props.qrCode }} style={{ width: 200, height: 200, marginBottom: 20 }} />
            ) : (
              <ActivityIndicator size="large" color={theme.colors.primary} style={{ marginVertical: 40 }} />
            )}
            <Text style={{ color: theme.colors.secondaryText, textAlign: 'center' }}>
              Scan this code with your mobile app.
            </Text>
          </View>
        )}

        {step === 'success' && (
          <View style={{ alignItems: 'center', paddingVertical: 40 }}>
            <CircleCheck size={64} color="#34C759" />
            <Text style={{ fontSize: 24, fontWeight: '800', color: theme.colors.text, marginTop: 20 }}>
              Success!
            </Text>
            <Text style={{ color: theme.colors.secondaryText, marginTop: 10 }}>
              Bridge established successfully.
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};


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
  enterpriseHero: {
    paddingBottom: 24,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.05,
    shadowRadius: 15,
    elevation: 10,
    zIndex: 10,
  },
  statsOverview: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  overviewItem: {
    flex: 1,
    alignItems: 'center',
  },
  overviewValue: {
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  overviewLabel: {
    fontSize: 10,
    fontWeight: '700',
    marginTop: 2,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  overviewDivider: {
    width: 1,
    height: 30,
    backgroundColor: 'rgba(150,150,150,0.1)',
  },
  syncStatusBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    gap: 12,
  },
  syncPulse: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#34C759',
    shadowColor: '#34C759',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
  syncText: {
    fontSize: 13,
    fontWeight: '700',
    flex: 1,
  },
  latencyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#34C75915',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  latencyText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#34C759',
  },

  title: {
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 13,
    lineHeight: 18,
    marginTop: 2,
  },
  addButton: {
    width: 48,
    height: 48,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  enterpriseBanner: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 20,
    marginBottom: 24,
    gap: 12,
    borderWidth: 1,
  },
  enterpriseBannerContent: {
    flex: 1,
  },
  enterpriseBannerTitle: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 2,
  },
  enterpriseBannerText: {
    fontSize: 12,
    lineHeight: 18,
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 12,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 52,
    borderRadius: 16,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
  },
  filterButton: {
    width: 52,
    height: 52,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryContainer: {
    marginBottom: 24,
  },
  categoryChip: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 14,
    marginRight: 10,
  },
  categoryText: {
    fontSize: 13,
    fontWeight: '700',
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
  },
  badge: {
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  platformsList: {
    gap: 14,
  },
  guideCard: {
    padding: 24,
    borderRadius: 24,
    marginBottom: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 4,
  },
  guideHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  guideTitle: {
    fontSize: 18,
    fontWeight: '800',
  },
  guideText: {
    fontSize: 14,
    lineHeight: 22,
    opacity: 0.8,
  },
});

