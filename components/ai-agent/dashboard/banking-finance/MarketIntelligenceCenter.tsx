import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { TrendingUp, TrendingDown, Globe, Newspaper, AlertTriangle, Activity, Radar } from 'lucide-react-native';
import { MarketIntelligenceCenterConfig } from '../types';

interface MarketIntelligenceCenterProps {
  config: MarketIntelligenceCenterConfig;
}

export default function MarketIntelligenceCenter({ config }: MarketIntelligenceCenterProps) {
  const { theme } = useTheme();

  const getImpactColor = (impact: 'positive' | 'negative' | 'neutral') => {
    switch (impact) {
      case 'positive': return '#10B981';
      case 'negative': return '#EF4444';
      case 'neutral': return '#6B7280';
    }
  };

  const getSentimentColor = (sentiment: 'positive' | 'negative' | 'neutral') => {
    switch (sentiment) {
      case 'positive': return '#10B981';
      case 'negative': return '#EF4444';
      case 'neutral': return '#6B7280';
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: '#05070A' }]}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={[styles.marketBadge, { backgroundColor: '#06B6D420', borderColor: '#06B6D4' }]}>
            <Radar size={16} color="#06B6D4" />
            <Text style={styles.marketBadgeText}>MARKET INTEL</Text>
          </View>
          <Text style={[styles.title, { color: '#FFFFFF' }]}>
            Intelligence Center
          </Text>
        </View>
        <View style={[styles.liveIndicator, { backgroundColor: '#10B98120', borderColor: '#10B981' }]}>
          <Activity size={12} color="#10B981" />
          <Text style={styles.liveText}>LIVE</Text>
        </View>
      </View>
      
      <View style={[styles.section, { backgroundColor: '#0A0F14', borderColor: '#1F2937' }]}>
        <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>Global Indices</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {config.globalIndices.map((index, i) => (
            <View key={i} style={[styles.indexCard, { backgroundColor: '#0A0F14', borderColor: index.trend === 'up' ? '#10B981' : '#EF4444' }]}>
              <Text style={[styles.indexName, { color: '#FFFFFF' }]}>{index.index}</Text>
              <Text style={[styles.indexValue, { color: '#FFFFFF' }]}>{index.value.toLocaleString()}</Text>
              <View style={styles.indexChange}>
                {index.trend === 'up' ? (
                  <TrendingUp size={12} color="#10B981" />
                ) : (
                  <TrendingDown size={12} color="#EF4444" />
                )}
                <Text style={[styles.changeText, { color: index.trend === 'up' ? '#10B981' : '#EF4444' }]}>
                  {index.change}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

      <View style={[styles.section, { backgroundColor: '#0A0F14', borderColor: '#1F2937' }]}>
        <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>Macro Indicators</Text>
        {config.macroIndicators.map((indicator, index) => (
          <View key={index} style={styles.indicatorItem}>
            <Text style={[styles.indicatorLabel, { color: '#FFFFFF' }]}>{indicator.indicator}</Text>
            <Text style={[styles.indicatorValue, { color: '#FFFFFF' }]}>{indicator.value}</Text>
            <View style={[styles.impactBadge, { backgroundColor: getImpactColor(indicator.impact) + '20', borderColor: getImpactColor(indicator.impact) }]}>
              <Text style={[styles.impactText, { color: getImpactColor(indicator.impact) }]}>
                {indicator.change}
              </Text>
            </View>
          </View>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: '#0A0F14', borderColor: '#1F2937' }]}>
        <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>News Sentiment</Text>
        {config.newsSentiment.map((news, index) => (
          <View key={index} style={[styles.newsItem, { backgroundColor: '#0A0F14', borderColor: getSentimentColor(news.sentiment) }]}>
            <View style={[styles.newsIcon, { backgroundColor: getSentimentColor(news.sentiment) + '20' }]}>
              <Newspaper size={16} color={getSentimentColor(news.sentiment)} />
            </View>
            <View style={styles.newsContent}>
              <Text style={[styles.newsTitle, { color: '#FFFFFF' }]}>{news.title}</Text>
              <Text style={[styles.newsMeta, { color: '#9CA3AF' }]}>
                {news.source} • {news.time}
              </Text>
            </View>
            <View style={[styles.sentimentBadge, { backgroundColor: getSentimentColor(news.sentiment) + '20', borderColor: getSentimentColor(news.sentiment) }]}>
              <Text style={[styles.sentimentText, { color: getSentimentColor(news.sentiment) }]}>{news.sentiment}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: '#0A0F14', borderColor: '#1F2937' }]}>
        <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>Geopolitical Events</Text>
        {config.geopoliticalEvents.map((event, index) => (
          <View key={index} style={[styles.eventCard, { backgroundColor: '#0A0F14', borderColor: '#F59E0B' }]}>
            <View style={[styles.eventIcon, { backgroundColor: '#F59E0B20' }]}>
              <Globe size={16} color="#F59E0B" />
            </View>
            <View style={styles.eventContent}>
              <Text style={[styles.eventName, { color: '#FFFFFF' }]}>{event.event}</Text>
              <Text style={[styles.eventDetails, { color: '#9CA3AF' }]}>
                Impact: {event.impact} | Probability: {event.probability}% | {event.timeframe}
              </Text>
            </View>
            <AlertTriangle size={16} color={event.probability > 60 ? '#EF4444' : '#F59E0B'} />
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 12,
    marginTop: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  marketBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    gap: 6,
  },
  marketBadgeText: {
    color: '#06B6D4',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
  },
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    gap: 6,
  },
  liveText: {
    color: '#10B981',
    fontSize: 10,
    fontWeight: '700',
  },
  section: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
  },
  indexCard: {
    padding: 12,
    borderRadius: 8,
    marginRight: 8,
    minWidth: 120,
    borderWidth: 1,
  },
  indexName: {
    fontSize: 11,
    marginBottom: 4,
  },
  indexValue: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 4,
  },
  indexChange: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  changeText: {
    fontSize: 11,
    fontWeight: '600',
    marginLeft: 4,
  },
  indicatorItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  indicatorLabel: {
    flex: 1,
    fontSize: 12,
  },
  indicatorValue: {
    fontSize: 13,
    fontWeight: '600',
    marginRight: 8,
  },
  impactBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    borderWidth: 1,
  },
  impactText: {
    fontSize: 11,
    fontWeight: '600',
  },
  newsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
  },
  newsIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  newsContent: {
    flex: 1,
  },
  newsTitle: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 2,
  },
  newsMeta: {
    fontSize: 11,
  },
  sentimentBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    borderWidth: 1,
  },
  sentimentText: {
    fontSize: 10,
    fontWeight: '600',
  },
  eventCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
  },
  eventIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  eventContent: {
    flex: 1,
  },
  eventName: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 2,
  },
  eventDetails: {
    fontSize: 11,
  },
});
