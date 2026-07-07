import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Activity, TrendingUp, TrendingDown, Minus, Brain } from 'lucide-react-native';

interface SignalNode {
  id: string;
  type: 'buy' | 'sell' | 'hold';
  confidence: number;
  label: string;
}

interface AIDecisionMatrixProps {
  signals: SignalNode[];
  marketSentiment: 'bullish' | 'bearish' | 'neutral';
  macroSentiment: 'bullish' | 'bearish' | 'neutral';
  volatilityPrediction: number;
}

export default function AIDecisionMatrix({ 
  signals, 
  marketSentiment, 
  macroSentiment, 
  volatilityPrediction 
}: AIDecisionMatrixProps) {
  const { theme } = useTheme();

  const getSignalColor = (type: string) => {
    switch (type) {
      case 'buy': return '#10B981';
      case 'sell': return '#EF4444';
      case 'hold': return '#6B7280';
      default: return '#6B7280';
    }
  };

  const getSignalIcon = (type: string) => {
    switch (type) {
      case 'buy': return TrendingUp;
      case 'sell': return TrendingDown;
      case 'hold': return Minus;
      default: return Minus;
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'bullish': return '#10B981';
      case 'bearish': return '#EF4444';
      case 'neutral': return '#6B7280';
      default: return '#6B7280';
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <View style={styles.header}>
        <View style={styles.headerTitle}>
          <Brain size={20} color={theme.colors.primary} />
          <Text style={[styles.title, { color: theme.colors.text }]}>
            AI Decision Matrix
          </Text>
        </View>
      </View>

      {/* Sentiment Overview */}
      <View style={styles.sentimentRow}>
        <View style={[styles.sentimentCard, { backgroundColor: theme.colors.background }]}>
          <Text style={[styles.sentimentLabel, { color: theme.colors.textSecondary }]}>
            Market Sentiment
          </Text>
          <Text style={[styles.sentimentValue, { color: getSentimentColor(marketSentiment) }]}>
            {marketSentiment.toUpperCase()}
          </Text>
        </View>
        <View style={[styles.sentimentCard, { backgroundColor: theme.colors.background }]}>
          <Text style={[styles.sentimentLabel, { color: theme.colors.textSecondary }]}>
            Macro Sentiment
          </Text>
          <Text style={[styles.sentimentValue, { color: getSentimentColor(macroSentiment) }]}>
            {macroSentiment.toUpperCase()}
          </Text>
        </View>
        <View style={[styles.sentimentCard, { backgroundColor: theme.colors.background }]}>
          <Text style={[styles.sentimentLabel, { color: theme.colors.textSecondary }]}>
            Volatility Prediction
          </Text>
          <Text style={[styles.sentimentValue, { color: theme.colors.text }]}>
            {volatilityPrediction.toFixed(1)}%
          </Text>
        </View>
      </View>

      {/* Signal Nodes */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.signalsScroll}>
        <View style={styles.signalsContainer}>
          {signals.map((signal) => {
            const Icon = getSignalIcon(signal.type);
            return (
              <View 
                key={signal.id} 
                style={[
                  styles.signalNode, 
                  { 
                    backgroundColor: getSignalColor(signal.type) + '20',
                    borderColor: getSignalColor(signal.type)
                  }
                ]}
              >
                <Icon size={24} color={getSignalColor(signal.type)} />
                <Text style={[styles.signalLabel, { color: theme.colors.text }]}>
                  {signal.label}
                </Text>
                <View style={styles.confidenceBar}>
                  <View 
                    style={[
                      styles.confidenceFill, 
                      { 
                        backgroundColor: getSignalColor(signal.type),
                        width: `${signal.confidence}%`
                      }
                    ]} 
                  />
                </View>
                <Text style={[styles.confidenceText, { color: theme.colors.textSecondary }]}>
                  {signal.confidence}% confidence
                </Text>
              </View>
            );
          })}
        </View>
      </ScrollView>

      {/* Neural Network Visualization Placeholder */}
      <View style={[styles.neuralNetwork, { backgroundColor: theme.colors.background }]}>
        <Activity size={32} color={theme.colors.primary} />
        <Text style={[styles.neuralText, { color: theme.colors.textSecondary }]}>
          Neural Network Processing
        </Text>
        <Text style={[styles.neuralSubtext, { color: theme.colors.textSecondary }]}>
          1,247 active nodes • 89% confidence
        </Text>
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
  sentimentRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  sentimentCard: {
    flex: 1,
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  sentimentLabel: {
    fontSize: 11,
    marginBottom: 4,
  },
  sentimentValue: {
    fontSize: 14,
    fontWeight: '700',
  },
  signalsScroll: {
    marginBottom: 16,
  },
  signalsContainer: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 4,
  },
  signalNode: {
    width: 120,
    padding: 12,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: 'center',
  },
  signalLabel: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 8,
    marginBottom: 8,
  },
  confidenceBar: {
    width: '100%',
    height: 4,
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 2,
    marginBottom: 4,
  },
  confidenceFill: {
    height: '100%',
    borderRadius: 2,
  },
  confidenceText: {
    fontSize: 10,
  },
  neuralNetwork: {
    padding: 24,
    borderRadius: 12,
    alignItems: 'center',
  },
  neuralText: {
    fontSize: 12,
    marginTop: 8,
  },
  neuralSubtext: {
    fontSize: 10,
  },
});
