import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft, Target, TrendingUp, Users, DollarSign, Calendar, Play } from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';

export default function AdvertisingScreen() {
  const { theme } = useTheme();
  const [selectedPlatform, setSelectedPlatform] = useState<string>('google');
  const [budget, setBudget] = useState<string>('1000');

  const platforms = [
    { id: 'google', name: 'Google Ads', color: '#4285F4' },
    { id: 'facebook', name: 'Facebook Ads', color: '#1877F2' },
    { id: 'instagram', name: 'Instagram Ads', color: '#E4405F' },
    { id: 'linkedin', name: 'LinkedIn Ads', color: '#0A66C2' },
    { id: 'twitter', name: 'Twitter Ads', color: '#1DA1F2' },
    { id: 'tiktok', name: 'TikTok Ads', color: '#000000' },
  ];

  const campaigns = [
    {
      id: '1',
      name: 'Summer Sale Campaign',
      platform: 'Google Ads',
      status: 'Active',
      budget: 2500,
      spent: 1850,
      impressions: 125000,
      clicks: 3200,
      conversions: 89,
    },
    {
      id: '2',
      name: 'Brand Awareness',
      platform: 'Facebook Ads',
      status: 'Active',
      budget: 1800,
      spent: 1200,
      impressions: 89000,
      clicks: 2100,
      conversions: 45,
    },
    {
      id: '3',
      name: 'Product Launch',
      platform: 'Instagram Ads',
      status: 'Paused',
      budget: 3000,
      spent: 2800,
      impressions: 156000,
      clicks: 4500,
      conversions: 156,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return theme.colors.success;
      case 'Paused': return theme.colors.warning;
      case 'Ended': return theme.colors.error;
      default: return theme.colors.secondaryText;
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.header, { borderBottomColor: theme.colors.border }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.colors.text }]}>Advertising</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={[styles.card, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.cardHeader}>
            <Target size={24} color={theme.colors.primary} />
            <Text style={[styles.cardTitle, { color: theme.colors.text }]}>Ad Management</Text>
          </View>
          <Text style={[styles.cardDescription, { color: theme.colors.secondaryText }]}>
            Create, manage, and optimize your advertising campaigns across multiple platforms
          </Text>
        </View>

        <View style={styles.statsGrid}>
          <View style={[styles.statCard, { backgroundColor: theme.colors.cardBackground }]}>
            <DollarSign size={20} color={theme.colors.primary} />
            <Text style={[styles.statValue, { color: theme.colors.text }]}>$5,850</Text>
            <Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>Total Spent</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: theme.colors.cardBackground }]}>
            <Users size={20} color={theme.colors.success} />
            <Text style={[styles.statValue, { color: theme.colors.text }]}>370K</Text>
            <Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>Impressions</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: theme.colors.cardBackground }]}>
            <TrendingUp size={20} color={theme.colors.warning} />
            <Text style={[styles.statValue, { color: theme.colors.text }]}>9.8K</Text>
            <Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>Clicks</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: theme.colors.cardBackground }]}>
            <Target size={20} color={theme.colors.error} />
            <Text style={[styles.statValue, { color: theme.colors.text }]}>290</Text>
            <Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>Conversions</Text>
          </View>
        </View>

        <View style={[styles.card, { backgroundColor: theme.colors.cardBackground }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Create New Campaign</Text>
          
          <View style={styles.formGroup}>
            <Text style={[styles.label, { color: theme.colors.text }]}>Platform</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.platformSelector}>
                {platforms.map((platform) => (
                  <TouchableOpacity
                    key={platform.id}
                    style={[
                      styles.platformButton,
                      {
                        backgroundColor: selectedPlatform === platform.id ? platform.color : 'transparent',
                        borderColor: platform.color,
                      },
                    ]}
                    onPress={() => setSelectedPlatform(platform.id)}
                  >
                    <Text
                      style={[
                        styles.platformButtonText,
                        {
                          color: selectedPlatform === platform.id ? '#FFFFFF' : platform.color,
                        },
                      ]}
                    >
                      {platform.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>

          <View style={styles.formGroup}>
            <Text style={[styles.label, { color: theme.colors.text }]}>Daily Budget</Text>
            <View style={[styles.inputContainer, { borderColor: theme.colors.border }]}>
              <Text style={[styles.currencySymbol, { color: theme.colors.text }]}>$</Text>
              <TextInput
                style={[styles.input, { color: theme.colors.text }]}
                value={budget}
                onChangeText={setBudget}
                placeholder="Enter budget"
                placeholderTextColor={theme.colors.secondaryText}
                keyboardType="numeric"
              />
            </View>
          </View>

          <TouchableOpacity 
            style={[styles.createButton, { backgroundColor: theme.colors.primary }]}
          >
            <Play size={20} color="#FFFFFF" />
            <Text style={styles.createButtonText}>Create Campaign</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.card, { backgroundColor: theme.colors.cardBackground }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Active Campaigns</Text>
          
          <View style={styles.campaignsList}>
            {campaigns.map((campaign) => (
              <View key={campaign.id} style={[styles.campaignCard, { borderColor: theme.colors.border }]}>
                <View style={styles.campaignHeader}>
                  <View>
                    <Text style={[styles.campaignName, { color: theme.colors.text }]}>
                      {campaign.name}
                    </Text>
                    <Text style={[styles.campaignPlatform, { color: theme.colors.secondaryText }]}>
                      {campaign.platform}
                    </Text>
                  </View>
                  <View style={[styles.statusBadge, { backgroundColor: getStatusColor(campaign.status) }]}>
                    <Text style={styles.statusText}>{campaign.status}</Text>
                  </View>
                </View>

                <View style={styles.campaignStats}>
                  <View style={styles.statRow}>
                    <Text style={[styles.statRowLabel, { color: theme.colors.secondaryText }]}>
                      Budget:
                    </Text>
                    <Text style={[styles.statRowValue, { color: theme.colors.text }]}>
                      ${campaign.budget.toLocaleString()}
                    </Text>
                  </View>
                  <View style={styles.statRow}>
                    <Text style={[styles.statRowLabel, { color: theme.colors.secondaryText }]}>
                      Spent:
                    </Text>
                    <Text style={[styles.statRowValue, { color: theme.colors.text }]}>
                      ${campaign.spent.toLocaleString()}
                    </Text>
                  </View>
                  <View style={styles.statRow}>
                    <Text style={[styles.statRowLabel, { color: theme.colors.secondaryText }]}>
                      Impressions:
                    </Text>
                    <Text style={[styles.statRowValue, { color: theme.colors.text }]}>
                      {campaign.impressions.toLocaleString()}
                    </Text>
                  </View>
                  <View style={styles.statRow}>
                    <Text style={[styles.statRowLabel, { color: theme.colors.secondaryText }]}>
                      Clicks:
                    </Text>
                    <Text style={[styles.statRowValue, { color: theme.colors.text }]}>
                      {campaign.clicks.toLocaleString()}
                    </Text>
                  </View>
                  <View style={styles.statRow}>
                    <Text style={[styles.statRowLabel, { color: theme.colors.secondaryText }]}>
                      Conversions:
                    </Text>
                    <Text style={[styles.statRowValue, { color: theme.colors.text }]}>
                      {campaign.conversions}
                    </Text>
                  </View>
                </View>

                <View style={styles.progressContainer}>
                  <View style={[styles.progressBar, { backgroundColor: theme.colors.border }]}>
                    <View
                      style={[
                        styles.progressFill,
                        {
                          width: `${(campaign.spent / campaign.budget) * 100}%`,
                          backgroundColor: theme.colors.primary,
                        },
                      ]}
                    />
                  </View>
                  <Text style={[styles.progressText, { color: theme.colors.secondaryText }]}>
                    {Math.round((campaign.spent / campaign.budget) * 100)}% of budget used
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={[styles.card, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.cardHeader}>
            <Calendar size={24} color={theme.colors.primary} />
            <Text style={[styles.cardTitle, { color: theme.colors.text }]}>Optimization Tips</Text>
          </View>
          
          <View style={styles.tipsList}>
            <Text style={[styles.tipText, { color: theme.colors.text }]}>
              • Monitor your campaigns daily for the first week after launch
            </Text>
            <Text style={[styles.tipText, { color: theme.colors.text }]}>
              • A/B test different ad creatives and copy variations
            </Text>
            <Text style={[styles.tipText, { color: theme.colors.text }]}>
              • Adjust bids based on time of day and day of week performance
            </Text>
            <Text style={[styles.tipText, { color: theme.colors.text }]}>
              • Use negative keywords to prevent irrelevant clicks
            </Text>
            <Text style={[styles.tipText, { color: theme.colors.text }]}>
              • Set up conversion tracking to measure ROI accurately
            </Text>
          </View>
        </View>
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
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  backButton: {
    padding: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
  },
  placeholder: {
    width: 32,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  card: {
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 12,
  },
  cardDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    minWidth: '45%',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    gap: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
  },
  statLabel: {
    fontSize: 12,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  platformSelector: {
    flexDirection: 'row',
    gap: 8,
  },
  platformButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
  },
  platformButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  currencySymbol: {
    fontSize: 16,
    fontWeight: '500',
    marginRight: 8,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
  },
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  createButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  campaignsList: {
    gap: 16,
  },
  campaignCard: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
  },
  campaignHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  campaignName: {
    fontSize: 16,
    fontWeight: '600',
  },
  campaignPlatform: {
    fontSize: 12,
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
  },
  campaignStats: {
    gap: 4,
    marginBottom: 12,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statRowLabel: {
    fontSize: 14,
  },
  statRowValue: {
    fontSize: 14,
    fontWeight: '500',
  },
  progressContainer: {
    gap: 4,
  },
  progressBar: {
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 12,
  },
  tipsList: {
    gap: 8,
  },
  tipText: {
    fontSize: 14,
    lineHeight: 20,
  },
});