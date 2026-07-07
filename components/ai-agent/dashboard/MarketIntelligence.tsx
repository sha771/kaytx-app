import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Newspaper, MessageCircle, AlertTriangle, Calendar, TrendingUp, Activity } from 'lucide-react-native';

interface NewsItem {
  id: string;
  title: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  time: string;
  source: string;
}

interface SocialSentiment {
  platform: string;
  sentiment: number;
  mentions: number;
}

interface WhaleAlert {
  id: string;
  asset: string;
  amount: string;
  type: 'buy' | 'sell';
  time: string;
}

interface MarketIntelligenceProps {
  news: NewsItem[];
  socialSentiment: SocialSentiment[];
  whaleAlerts: WhaleAlert[];
  fearGreedIndex: number;
}

export default function MarketIntelligence({ 
  news, 
  socialSentiment, 
  whaleAlerts, 
  fearGreedIndex 
}: MarketIntelligenceProps) {
  const { theme } = useTheme();

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return '#10B981';
      case 'negative': return '#EF4444';
      case 'neutral': return '#6B7280';
      default: return '#6B7280';
    }
  };

  const getFearGreedColor = (index: number) => {
    if (index < 25) return '#EF4444';
    if (index < 50) return '#F59E0B';
    if (index < 75) return '#10B981';
    return '#3B82F6';
  };

  const getFearGreedLabel = (index: number) => {
    if (index < 25) return 'Extreme Fear';
    if (index < 50) return 'Fear';
    if (index < 75) return 'Greed';
    return 'Extreme Greed';
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <View style={styles.header}>
        <View style={styles.headerTitle}>
          <Activity size={20} color={theme.colors.primary} />
          <Text style={[styles.title, { color: theme.colors.text }]}>
            Market Intelligence
          </Text>
        </View>
      </View>

      {/* Fear & Greed Index */}
      <View style={[styles.fearGreedCard, { backgroundColor: theme.colors.background }]}>
        <Text style={[styles.fearGreedLabel, { color: theme.colors.textSecondary }]}>
          Fear & Greed Index
        </Text>
        <View style={styles.fearGreedValue}>
          <Text style={[styles.fearGreedNumber, { color: getFearGreedColor(fearGreedIndex) }]}>
            {fearGreedIndex}
          </Text>
        </View>
        <Text style={[styles.fearGreedStatus, { color: getFearGreedColor(fearGreedIndex) }]}>
          {getFearGreedLabel(fearGreedIndex)}
        </Text>
      </View>

      {/* News Sentiment */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Newspaper size={16} color={theme.colors.primary} />
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            News Sentiment
          </Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.newsScroll}>
          <View style={styles.newsContainer}>
            {news.map((item) => (
              <View key={item.id} style={[styles.newsCard, { backgroundColor: theme.colors.background }]}>
                <View style={[styles.newsDot, { backgroundColor: getSentimentColor(item.sentiment) }]} />
                <Text style={[styles.newsTitle, { color: theme.colors.text }]} numberOfLines={2}>
                  {item.title}
                </Text>
                <Text style={[styles.newsMeta, { color: theme.colors.textSecondary }]}>
                  {item.source} • {item.time}
                </Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Social Sentiment */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MessageCircle size={16} color={theme.colors.primary} />
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Social Sentiment
          </Text>
        </View>
        <View style={styles.socialGrid}>
          {socialSentiment.map((item, index) => (
            <View key={index} style={[styles.socialCard, { backgroundColor: theme.colors.background }]}>
              <Text style={[styles.socialPlatform, { color: theme.colors.text }]}>
                {item.platform}
              </Text>
              <Text style={[styles.socialSentiment, { color: getSentimentColor(item.sentiment > 0 ? 'positive' : 'negative') }]}>
                {item.sentiment > 0 ? '+' : ''}{item.sentiment}%
              </Text>
              <Text style={[styles.socialMentions, { color: theme.colors.textSecondary }]}>
                {item.mentions.toLocaleString()} mentions
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Whale Alerts */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <AlertTriangle size={16} color="#F59E0B" />
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Whale Alerts
          </Text>
        </View>
        <View style={styles.whaleContainer}>
          {whaleAlerts.map((alert) => (
            <View key={alert.id} style={[styles.whaleCard, { backgroundColor: theme.colors.background }]}>
              <View style={[
                styles.whaleType, 
                { backgroundColor: alert.type === 'buy' ? '#10B981' + '20' : '#EF4444' + '20' }
              ]}>
                <Text style={[
                  styles.whaleTypeText,
                  { color: alert.type === 'buy' ? '#10B981' : '#EF4444' }
                ]}>
                  {alert.type.toUpperCase()}
                </Text>
              </View>
              <View style={styles.whaleInfo}>
                <Text style={[styles.whaleAsset, { color: theme.colors.text }]}>
                  {alert.asset}
                </Text>
                <Text style={[styles.whaleAmount, { color: theme.colors.text }]}>
                  {alert.amount}
                </Text>
              </View>
              <Text style={[styles.whaleTime, { color: theme.colors.textSecondary }]}>
                {alert.time}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
  },
  header: {
    marginBottom: 16,
  },
  headerTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  fearGreedCard: {
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  fearGreedLabel: {
    fontSize: 12,
    marginBottom: 8,
  },
  fearGreedValue: {
    marginBottom: 4,
  },
  fearGreedNumber: {
    fontSize: 48,
    fontWeight: '700',
  },
  fearGreedStatus: {
    fontSize: 14,
    fontWeight: '600',
  },
  section: {
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  newsScroll: {
    marginBottom: 8,
  },
  newsContainer: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 4,
  },
  newsCard: {
    width: 200,
    padding: 12,
    borderRadius: 12,
  },
  newsDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginBottom: 8,
  },
  newsTitle: {
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 4,
  },
  newsMeta: {
    fontSize: 10,
  },
  socialGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -6,
  },
  socialCard: {
    width: '50%',
    padding: 12,
    borderRadius: 12,
    marginHorizontal: 6,
    marginBottom: 12,
  },
  socialPlatform: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 4,
  },
  socialSentiment: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  socialMentions: {
    fontSize: 10,
  },
  whaleContainer: {
    gap: 8,
  },
  whaleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
  },
  whaleType: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 12,
  },
  whaleTypeText: {
    fontSize: 10,
    fontWeight: '700',
  },
  whaleInfo: {
    flex: 1,
  },
  whaleAsset: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 2,
  },
  whaleAmount: {
    fontSize: 11,
  },
  whaleTime: {
    fontSize: 10,
  },
});
