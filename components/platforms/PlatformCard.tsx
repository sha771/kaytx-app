import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Switch } from 'react-native';
import {
  Wifi,
  WifiOff,
  MoreVertical,
  ExternalLink,
  Smartphone,
  Cloud,
  Check,
  RefreshCw,
  Trash2,
  Info,
} from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Platform } from '@/constants/platforms';

interface PlatformCardProps {
  platform: Platform;
  onConnect: (platform: Platform) => void;
  onDisconnect: (platform: Platform) => void;
  onSync: (platform: Platform) => void;
  onToggleEnabled: (platformId: string) => void;
  onOpenUrl: (url: string, platformName: string) => void;
  onOpenApiDocs: (url: string) => void;
  getIconForService: (service: string) => any;
  getColorForService: (service: string) => string;
}

export const PlatformCard: React.FC<PlatformCardProps> = React.memo(
  ({
    platform,
    onConnect,
    onDisconnect,
    onSync,
    onToggleEnabled,
    onOpenUrl,
    onOpenApiDocs,
    getIconForService,
    getColorForService,
  }) => {
    const { theme } = useTheme();
    const ServiceIcon = getIconForService(platform.service);
    const serviceColor = getColorForService(platform.service);

    return (
      <View style={[styles.platformCard, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.platformHeader}>
          <View style={styles.platformInfo}>
            <View style={styles.platformIconContainer}>
              <View style={[styles.serviceIcon, { backgroundColor: serviceColor }]}>
                <ServiceIcon size={20} color="white" />
              </View>
              {platform.isConnected ? (
                <View style={styles.connectionStatus}>
                  <Wifi size={12} color="#34C759" />
                </View>
              ) : (
                <View style={styles.connectionStatus}>
                  <WifiOff size={12} color="#FF3B30" />
                </View>
              )}
            </View>
            <View style={styles.platformDetails}>
              <View style={styles.nameContainer}>
                <Text style={[styles.platformName, { color: theme.colors.text }]}>{platform.name}</Text>
                {platform.isVerified && (
                  <View style={styles.verifiedBadge}>
                    <Check size={12} color="white" />
                  </View>
                )}
              </View>
              <Text style={[styles.accountName, { color: theme.colors.secondaryText }]}>
                {platform.accountName}
              </Text>
              <View style={styles.statusContainer}>
                <View
                  style={[
                    styles.connectionMethodBadge,
                    {
                      backgroundColor: platform.connectionMethod === 'on-device' ? '#34C75920' : '#FF950020',
                    },
                  ]}
                >
                  {platform.connectionMethod === 'on-device' ? (
                    <Smartphone size={10} color="#34C759" />
                  ) : (
                    <Cloud size={10} color="#FF9500" />
                  )}
                  <Text
                    style={[
                      styles.connectionMethodText,
                      {
                        color: platform.connectionMethod === 'on-device' ? '#34C759' : '#FF9500',
                      },
                    ]}
                  >
                    {platform.connectionMethod === 'on-device' ? 'On-device' : 'Cloud'}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <TouchableOpacity style={styles.moreButton}>
            <MoreVertical size={16} color={theme.colors.secondaryText} />
          </TouchableOpacity>
        </View>

        <View style={styles.platformDescription}>
          <Text style={[styles.description, { color: theme.colors.secondaryText }]}>
            {platform.description}
          </Text>
          <View style={styles.featuresContainer}>
            {platform.features.map((feature) => (
              <View key={feature} style={[styles.featureTag, { backgroundColor: `${serviceColor}20` }]}>
                <Text style={[styles.featureText, { color: serviceColor }]}>{feature}</Text>
              </View>
            ))}
          </View>
        </View>

        {platform.isConnected && (
          <View style={styles.platformStats}>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: theme.colors.text }]}>
                {platform.messageCount.toLocaleString()}
              </Text>
              <Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>Messages</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: theme.colors.text }]}>
                {platform.monthlyMessages.toLocaleString()}
              </Text>
              <Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>Monthly</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: theme.colors.text }]}>{platform.responseTime}</Text>
              <Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>Response</Text>
            </View>
          </View>
        )}

        <View style={styles.platformLinksContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.platformLinks}>
            <TouchableOpacity
              style={[styles.linkButton, { backgroundColor: `${serviceColor}20` }]}
              onPress={() => onOpenUrl(platform.websiteUrl, platform.name)}
            >
              <ExternalLink size={14} color={serviceColor} />
              <Text style={[styles.linkButtonText, { color: serviceColor }]}>Open Website</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.linkButton, { backgroundColor: `${theme.colors.primary}20` }]}
              onPress={() => onOpenApiDocs(platform.apiDocUrl)}
            >
              <Info size={14} color={theme.colors.primary} />
              <Text style={[styles.linkButtonText, { color: theme.colors.primary }]}>API Docs</Text>
            </TouchableOpacity>
            {platform.appStoreUrl && (
              <TouchableOpacity
                style={[styles.linkButton, { backgroundColor: '#00000015' }]}
                onPress={() => onOpenUrl(platform.appStoreUrl!, platform.name)}
              >
                <Smartphone size={14} color="#000" />
                <Text style={[styles.linkButtonText, { color: '#000' }]}>App Store</Text>
              </TouchableOpacity>
            )}
            {platform.playStoreUrl && (
              <TouchableOpacity
                style={[styles.linkButton, { backgroundColor: '#34C75920' }]}
                onPress={() => onOpenUrl(platform.playStoreUrl!, platform.name)}
              >
                <Smartphone size={14} color="#34C759" />
                <Text style={[styles.linkButtonText, { color: '#34C759' }]}>Play Store</Text>
              </TouchableOpacity>
            )}
          </ScrollView>
        </View>

        <View style={styles.platformActions}>
          <View style={styles.enableToggle}>
            <Text style={[styles.toggleLabel, { color: theme.colors.text }]}>
              {platform.isEnabled ? 'Enabled' : 'Disabled'}
            </Text>
            <Switch
              value={platform.isEnabled}
              onValueChange={() => onToggleEnabled(platform.id)}
              trackColor={{ false: '#767577', true: theme.colors.primary }}
              thumbColor={platform.isEnabled ? '#fff' : '#f4f3f4'}
              disabled={!platform.isConnected}
            />
          </View>
          {!platform.isConnected ? (
            <TouchableOpacity
              style={[styles.connectButton, { backgroundColor: theme.colors.primary }]}
              onPress={() => onConnect(platform)}
            >
              <Text style={styles.connectButtonText}>Connect</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.connectedActions}>
              <TouchableOpacity
                style={[styles.actionButton, { backgroundColor: `${serviceColor}20` }]}
                onPress={() => onOpenUrl(platform.websiteUrl, platform.name)}
              >
                <ExternalLink size={16} color={serviceColor} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton} onPress={() => onSync(platform)}>
                <RefreshCw size={16} color={theme.colors.text} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton} onPress={() => onDisconnect(platform)}>
                <Trash2 size={16} color="#FF3B30" />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    );
  }
);

PlatformCard.displayName = 'PlatformCard';

const styles = StyleSheet.create({
  platformCard: {
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  platformHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  platformInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  platformIconContainer: {
    position: 'relative',
    marginRight: 12,
  },
  serviceIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  connectionStatus: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  platformDetails: {
    flex: 1,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  platformName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  verifiedBadge: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#34C759',
    justifyContent: 'center',
    alignItems: 'center',
  },
  accountName: {
    fontSize: 13,
    marginBottom: 4,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  connectionMethodBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  connectionMethodText: {
    fontSize: 10,
    fontWeight: '600',
  },
  moreButton: {
    padding: 8,
  },
  platformDescription: {
    marginBottom: 16,
  },
  description: {
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 8,
  },
  featuresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  featureTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  featureText: {
    fontSize: 11,
    fontWeight: '500',
  },
  platformStats: {
    flexDirection: 'row',
    marginBottom: 16,
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 11,
    textAlign: 'center',
  },
  platformActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  enableToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  toggleLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  connectButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  connectButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  connectedActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: 'rgba(0,0,0,0.05)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  platformLinksContainer: {
    marginBottom: 16,
  },
  platformLinks: {
    flexDirection: 'row',
  },
  linkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginRight: 8,
  },
  linkButtonText: {
    fontSize: 12,
    fontWeight: '600',
  },
});
