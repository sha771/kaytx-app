 
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import { Send, Instagram, Twitter, Facebook, Linkedin, Youtube, CheckCircle, Settings, Sparkles, Clock, Globe } from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';

interface Platform {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  color: string;
  connected: boolean;
  autoOptimize: boolean;
  bestTime: string;
}

export default function CrossPlatformPublishing() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();

  const [platforms, setPlatforms] = useState<Platform[]>([
    { id: 'instagram', name: 'Instagram', icon: Instagram, color: '#E4405F', connected: true, autoOptimize: true, bestTime: '2:00 PM' },
    { id: 'twitter', name: 'Twitter/X', icon: Twitter, color: '#1DA1F2', connected: true, autoOptimize: true, bestTime: '4:00 PM' },
    { id: 'facebook', name: 'Facebook', icon: Facebook, color: '#1877F2', connected: true, autoOptimize: false, bestTime: '1:00 PM' },
    { id: 'linkedin', name: 'LinkedIn', icon: Linkedin, color: '#0A66C2', connected: true, autoOptimize: true, bestTime: '9:00 AM' },
    { id: 'youtube', name: 'YouTube', icon: Youtube, color: '#FF0000', connected: false, autoOptimize: false, bestTime: '6:00 PM' },
  ]);

  const toggleOptimize = (id: string) => {
    setPlatforms(prev => prev.map(p => p.id === id ? { ...p, autoOptimize: !p.autoOptimize } : p));
  };

  const features = [
    { title: 'Smart Content Adaptation', desc: 'Automatically adjust content for each platform', icon: Sparkles, color: '#AF52DE' },
    { title: 'Optimal Timing', desc: 'Post at the best time for each platform', icon: Clock, color: '#FF9500' },
    { title: 'Unified Publishing', desc: 'Publish to all platforms with one click', icon: Send, color: '#007AFF' },
    { title: 'Cross-Platform Analytics', desc: 'Compare performance across platforms', icon: Globe, color: '#34C759' },
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Stack.Screen
        options={{
          title: 'Cross-Platform',
          headerStyle: { backgroundColor: theme.colors.background },
          headerTintColor: theme.colors.text,
          headerShadowVisible: false,
        }}
      />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}>
        {/* Quick Publish */}
        <TouchableOpacity style={[styles.publishCard, { backgroundColor: theme.colors.primary }]}>
          <Send size={24} color="#FFF" />
          <View style={styles.publishInfo}>
            <Text style={styles.publishTitle}>Publish to All Platforms</Text>
            <Text style={styles.publishDesc}>Create once, post everywhere</Text>
          </View>
        </TouchableOpacity>

        {/* Features */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Features</Text>
          <View style={styles.featuresGrid}>
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <View key={index} style={[styles.featureCard, { backgroundColor: theme.colors.cardBackground }]}>
                  <View style={[styles.featureIcon, { backgroundColor: `${feature.color}15` }]}>
                    <IconComponent size={20} color={feature.color} />
                  </View>
                  <Text style={[styles.featureTitle, { color: theme.colors.text }]}>{feature.title}</Text>
                  <Text style={[styles.featureDesc, { color: theme.colors.secondaryText }]}>{feature.desc}</Text>
                </View>
              );
            })}
          </View>
        </View>

        {/* Platform Settings */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Platform Settings</Text>
          {platforms.map((platform) => {
            const IconComponent = platform.icon;
            return (
              <View key={platform.id} style={[styles.platformCard, { backgroundColor: theme.colors.cardBackground }]}>
                <View style={styles.platformHeader}>
                  <View style={[styles.platformIcon, { backgroundColor: `${platform.color}15` }]}>
                    <IconComponent size={22} color={platform.color} />
                  </View>
                  <View style={styles.platformInfo}>
                    <Text style={[styles.platformName, { color: theme.colors.text }]}>{platform.name}</Text>
                    <View style={styles.platformStatus}>
                      {platform.connected ? (
                        <>
                          <CheckCircle size={12} color="#34C759" />
                          <Text style={styles.connectedText}>Connected</Text>
                        </>
                      ) : (
                        <Text style={[styles.disconnectedText, { color: theme.colors.secondaryText }]}>Not connected</Text>
                      )}
                    </View>
                  </View>
                  <TouchableOpacity style={[styles.settingsBtn, { backgroundColor: 'rgba(0,0,0,0.05)' }]}>
                    <Settings size={16} color={theme.colors.secondaryText} />
                  </TouchableOpacity>
                </View>

                {platform.connected && (
                  <>
                    <View style={[styles.platformDivider, { backgroundColor: theme.colors.border }]} />
                    <View style={styles.platformSettings}>
                      <View style={styles.settingRow}>
                        <View style={styles.settingInfo}>
                          <Sparkles size={16} color="#AF52DE" />
                          <Text style={[styles.settingLabel, { color: theme.colors.text }]}>Auto-optimize content</Text>
                        </View>
                        <Switch
                          value={platform.autoOptimize}
                          onValueChange={() => toggleOptimize(platform.id)}
                          trackColor={{ false: '#E5E5EA', true: `${theme.colors.primary}50` }}
                          thumbColor={platform.autoOptimize ? theme.colors.primary : '#F4F4F4'}
                        />
                      </View>
                      <View style={styles.bestTimeRow}>
                        <Clock size={14} color={theme.colors.secondaryText} />
                        <Text style={[styles.bestTimeText, { color: theme.colors.secondaryText }]}>Best posting time: {platform.bestTime}</Text>
                      </View>
                    </View>
                  </>
                )}
              </View>
            );
          })}
        </View>

        {/* Tips */}
        <View style={[styles.tipsCard, { backgroundColor: '#34C75910', borderColor: '#34C759' }]}>
          <Sparkles size={20} color="#34C759" />
          <View style={styles.tipsContent}>
            <Text style={[styles.tipsTitle, { color: theme.colors.text }]}>Cross-Platform Tip</Text>
            <Text style={[styles.tipsText, { color: theme.colors.secondaryText }]}>
              Enable auto-optimize to let AI adjust your content&apos;s format, hashtags, and length for each platform automatically.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, paddingHorizontal: 16 },
  publishCard: { flexDirection: 'row', alignItems: 'center', padding: 20, borderRadius: 16, marginBottom: 20, gap: 16 },
  publishInfo: { flex: 1 },
  publishTitle: { color: '#FFF', fontSize: 18, fontWeight: '700', marginBottom: 4 },
  publishDesc: { color: 'rgba(255,255,255,0.8)', fontSize: 14 },
  section: { marginBottom: 24 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 14 },
  featuresGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  featureCard: { width: '48%', padding: 14, borderRadius: 14 },
  featureIcon: { width: 40, height: 40, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
  featureTitle: { fontSize: 13, fontWeight: '600', marginBottom: 4 },
  featureDesc: { fontSize: 11, lineHeight: 15 },
  platformCard: { borderRadius: 16, marginBottom: 12, overflow: 'hidden' },
  platformHeader: { flexDirection: 'row', alignItems: 'center', padding: 14 },
  platformIcon: { width: 48, height: 48, borderRadius: 14, justifyContent: 'center', alignItems: 'center', marginRight: 14 },
  platformInfo: { flex: 1 },
  platformName: { fontSize: 16, fontWeight: '600', marginBottom: 4 },
  platformStatus: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  connectedText: { fontSize: 12, color: '#34C759', fontWeight: '500' },
  disconnectedText: { fontSize: 12 },
  settingsBtn: { width: 36, height: 36, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  platformDivider: { height: 1, marginHorizontal: 14 },
  platformSettings: { padding: 14 },
  settingRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  settingInfo: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  settingLabel: { fontSize: 14, fontWeight: '500' },
  bestTimeRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  bestTimeText: { fontSize: 12 },
  tipsCard: { flexDirection: 'row', padding: 16, borderRadius: 14, borderLeftWidth: 4, gap: 12, marginBottom: 20 },
  tipsContent: { flex: 1 },
  tipsTitle: { fontSize: 14, fontWeight: '600', marginBottom: 4 },
  tipsText: { fontSize: 12, lineHeight: 17 },
});
