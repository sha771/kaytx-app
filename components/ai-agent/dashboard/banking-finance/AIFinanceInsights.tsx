import React from 'react';
import { View, StyleSheet, Text, ScrollView, Animated } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Lightbulb, AlertTriangle, TrendingUp, ArrowRight, Sparkles, Zap } from 'lucide-react-native';
import { AIInsightsConfig } from '../types';

interface AIFinanceInsightsProps {
  config: AIInsightsConfig;
}

export default function AIFinanceInsights({ config }: AIFinanceInsightsProps) {
  const { theme } = useTheme();

  const getInsightColor = (type: 'opportunity' | 'risk' | 'recommendation') => {
    switch (type) {
      case 'opportunity': return '#10B981';
      case 'risk': return '#EF4444';
      case 'recommendation': return '#06B6D4';
      default: return '#6B7280';
    }
  };

  const getInsightIcon = (type: 'opportunity' | 'risk' | 'recommendation') => {
    switch (type) {
      case 'opportunity': return TrendingUp;
      case 'risk': return AlertTriangle;
      case 'recommendation': return Sparkles;
      default: return Lightbulb;
    }
  };

  const getImpactColor = (impact: 'high' | 'medium' | 'low') => {
    switch (impact) {
      case 'high': return '#EF4444';
      case 'medium': return '#F59E0B';
      case 'low': return '#10B981';
      default: return '#6B7280';
    }
  };

  const getGlowColor = (type: 'opportunity' | 'risk' | 'recommendation') => {
    switch (type) {
      case 'opportunity': return '#10B98120';
      case 'risk': return '#EF444420';
      case 'recommendation': return '#06B6D420';
      default: return '#6B728020';
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: '#05070A' }]}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={[styles.aiBadge, { backgroundColor: '#06B6D420' }]}>
            <Zap size={16} color="#06B6D4" />
            <Text style={styles.aiBadgeText}>AI INTELLIGENCE</Text>
          </View>
          <Text style={[styles.title, { color: '#FFFFFF' }]}>
            Finance Insights
          </Text>
        </View>
        <View style={[styles.insightCount, { backgroundColor: '#10B98120', borderColor: '#10B981' }]}>
          <Text style={styles.insightCountText}>
            {config.insights.length} Active
          </Text>
        </View>
      </View>
      
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollContainer}>
        {config.insights.map((insight, index) => {
          const Icon = getInsightIcon(insight.type);
          return (
            <View key={insight.id} style={[styles.insightCard, { 
              backgroundColor: '#0A0F14',
              borderColor: getInsightColor(insight.type),
              shadowColor: getInsightColor(insight.type)
            }]}>
              <View style={[styles.glowEffect, { backgroundColor: getGlowColor(insight.type) }]} />
              
              <View style={styles.insightHeader}>
                <View style={[styles.iconContainer, { 
                  backgroundColor: getInsightColor(insight.type),
                  shadowColor: getInsightColor(insight.type)
                }]}>
                  <Icon size={20} color="#FFFFFF" />
                </View>
                <View style={styles.insightTitleContainer}>
                  <Text style={[styles.insightTitle, { color: '#FFFFFF' }]}>{insight.title}</Text>
                  <View style={[styles.impactBadge, { backgroundColor: getImpactColor(insight.impact) }]}>
                    <Text style={styles.impactText}>{insight.impact.toUpperCase()}</Text>
                  </View>
                </View>
              </View>
              
              <Text style={[styles.insightDescription, { color: '#9CA3AF' }]}>
                {insight.description}
              </Text>
              
              <View style={[styles.actionContainer, { backgroundColor: '#10B98110' }]}>
                <ArrowRight size={14} color="#10B981" />
                <Text style={[styles.actionText, { color: '#10B981' }]}>
                  {insight.action}
                </Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
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
  aiBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 6,
  },
  aiBadgeText: {
    color: '#06B6D4',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
  },
  insightCount: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
  },
  insightCountText: {
    color: '#10B981',
    fontSize: 11,
    fontWeight: '700',
  },
  scrollContainer: {
    maxHeight: 400,
  },
  insightCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
    position: 'relative',
    overflow: 'hidden',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  glowEffect: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.1,
  },
  insightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    zIndex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    shadowOpacity: 0.4,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  insightTitleContainer: {
    flex: 1,
  },
  insightTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  impactBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  impactText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },
  insightDescription: {
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 12,
    zIndex: 1,
  },
  actionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
    zIndex: 1,
  },
  actionText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 6,
  },
});
