 
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Stack } from 'expo-router';
import { Target, TrendingUp, DollarSign, Users, Calendar, ChevronRight } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface Channel {
  id: string;
  name: string;
  conversions: number;
  revenue: number;
  cost: number;
  roi: number;
  firstTouch: number;
  lastTouch: number;
  assisted: number;
}

export default function AttributionScreen() {
  const insets = useSafeAreaInsets();
  const [model, setModel] = useState<'first-touch' | 'last-touch' | 'linear' | 'time-decay'>('linear');
  const [channels] = useState<Channel[]>([
    {
      id: '1',
      name: 'Organic Search',
      conversions: 1245,
      revenue: 156000,
      cost: 12000,
      roi: 1200,
      firstTouch: 45,
      lastTouch: 32,
      assisted: 23,
    },
    {
      id: '2',
      name: 'Paid Search',
      conversions: 892,
      revenue: 112000,
      cost: 28000,
      roi: 300,
      firstTouch: 38,
      lastTouch: 41,
      assisted: 21,
    },
    {
      id: '3',
      name: 'Social Media',
      conversions: 654,
      revenue: 82000,
      cost: 15000,
      roi: 447,
      firstTouch: 12,
      lastTouch: 8,
      assisted: 80,
    },
    {
      id: '4',
      name: 'Email Marketing',
      conversions: 543,
      revenue: 68000,
      cost: 5000,
      roi: 1260,
      firstTouch: 2,
      lastTouch: 15,
      assisted: 83,
    },
    {
      id: '5',
      name: 'Direct Traffic',
      conversions: 432,
      revenue: 54000,
      cost: 0,
      roi: 0,
      firstTouch: 3,
      lastTouch: 4,
      assisted: 93,
    },
  ]);

  const totalRevenue = channels.reduce((sum, ch) => sum + ch.revenue, 0);
  const totalCost = channels.reduce((sum, ch) => sum + ch.cost, 0);
  const totalConversions = channels.reduce((sum, ch) => sum + ch.conversions, 0);
  const avgROI = ((totalRevenue - totalCost) / totalCost * 100).toFixed(0);

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{
          title: 'Marketing Attribution',
          headerStyle: { backgroundColor: '#0A0F1E' },
          headerTintColor: '#FFFFFF',
        }}
      />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Attribution Model</Text>
        <View style={styles.modelSelector}>
          {[
            { key: 'first-touch', label: 'First Touch' },
            { key: 'last-touch', label: 'Last Touch' },
            { key: 'linear', label: 'Linear' },
            { key: 'time-decay', label: 'Time Decay' },
          ].map((m) => (
            <TouchableOpacity
              key={m.key}
              style={[styles.modelButton, model === m.key && styles.modelButtonActive]}
              onPress={() => setModel(m.key as typeof model)}
            >
              <Text style={[styles.modelButtonText, model === m.key && styles.modelButtonTextActive]}>
                {m.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <DollarSign size={20} color="#10B981" />
          <Text style={styles.statValue}>${(totalRevenue / 1000).toFixed(0)}K</Text>
          <Text style={styles.statLabel}>Total Revenue</Text>
        </View>
        <View style={styles.statCard}>
          <Users size={20} color="#60A5FA" />
          <Text style={styles.statValue}>{totalConversions.toLocaleString()}</Text>
          <Text style={styles.statLabel}>Conversions</Text>
        </View>
        <View style={styles.statCard}>
          <TrendingUp size={20} color="#F59E0B" />
          <Text style={styles.statValue}>{avgROI}%</Text>
          <Text style={styles.statLabel}>Avg ROI</Text>
        </View>
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
      >
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Target size={20} color="#60A5FA" />
            <Text style={styles.sectionTitle}>Channel Performance</Text>
          </View>

          {channels.map((channel) => (
            <TouchableOpacity key={channel.id} style={styles.channelCard}>
              <View style={styles.channelHeader}>
                <Text style={styles.channelName}>{channel.name}</Text>
                <ChevronRight size={20} color="#6B7280" />
              </View>

              <View style={styles.channelMetrics}>
                <View style={styles.metric}>
                  <Text style={styles.metricValue}>${(channel.revenue / 1000).toFixed(0)}K</Text>
                  <Text style={styles.metricLabel}>Revenue</Text>
                </View>
                <View style={styles.metric}>
                  <Text style={styles.metricValue}>{channel.conversions}</Text>
                  <Text style={styles.metricLabel}>Conversions</Text>
                </View>
                <View style={styles.metric}>
                  <Text style={[styles.metricValue, { color: '#10B981' }]}>{channel.roi}%</Text>
                  <Text style={styles.metricLabel}>ROI</Text>
                </View>
              </View>

              <View style={styles.touchPoints}>
                <View style={styles.touchPoint}>
                  <View style={styles.touchBar}>
                    <View style={[styles.touchBarFill, { width: `${channel.firstTouch}%`, backgroundColor: '#60A5FA' }]} />
                  </View>
                  <Text style={styles.touchLabel}>First Touch: {channel.firstTouch}%</Text>
                </View>
                <View style={styles.touchPoint}>
                  <View style={styles.touchBar}>
                    <View style={[styles.touchBarFill, { width: `${channel.lastTouch}%`, backgroundColor: '#10B981' }]} />
                  </View>
                  <Text style={styles.touchLabel}>Last Touch: {channel.lastTouch}%</Text>
                </View>
                <View style={styles.touchPoint}>
                  <View style={styles.touchBar}>
                    <View style={[styles.touchBarFill, { width: `${channel.assisted}%`, backgroundColor: '#F59E0B' }]} />
                  </View>
                  <Text style={styles.touchLabel}>Assisted: {channel.assisted}%</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Calendar size={20} color="#60A5FA" />
            <Text style={styles.sectionTitle}>Customer Journey Insights</Text>
          </View>

          <View style={styles.insightCard}>
            <Text style={styles.insightTitle}>Average Touchpoints to Conversion</Text>
            <Text style={styles.insightValue}>5.2 interactions</Text>
            <Text style={styles.insightDescription}>
              Customers typically interact with 5-6 marketing channels before converting
            </Text>
          </View>

          <View style={styles.insightCard}>
            <Text style={styles.insightTitle}>Most Common Path</Text>
            <Text style={styles.insightValue}>Organic → Social → Email → Direct</Text>
            <Text style={styles.insightDescription}>
              32% of conversions follow this journey pattern
            </Text>
          </View>

          <View style={styles.insightCard}>
            <Text style={styles.insightTitle}>Average Time to Convert</Text>
            <Text style={styles.insightValue}>12.5 days</Text>
            <Text style={styles.insightDescription}>
              From first interaction to final conversion
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0F1E',
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1F2937',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  modelSelector: {
    flexDirection: 'row',
    gap: 8,
  },
  modelButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 8,
    backgroundColor: '#1F2937',
    alignItems: 'center',
  },
  modelButtonActive: {
    backgroundColor: '#60A5FA',
  },
  modelButtonText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#9CA3AF',
  },
  modelButtonTextActive: {
    color: '#FFFFFF',
  },
  statsContainer: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#1F2937',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 11,
    color: '#9CA3AF',
    marginTop: 4,
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
  },
  section: {
    padding: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  channelCard: {
    backgroundColor: '#1F2937',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  channelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  channelName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  channelMetrics: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 16,
  },
  metric: {
    flex: 1,
  },
  metricValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  metricLabel: {
    fontSize: 11,
    color: '#9CA3AF',
  },
  touchPoints: {
    gap: 12,
  },
  touchPoint: {
    gap: 6,
  },
  touchBar: {
    height: 6,
    backgroundColor: '#374151',
    borderRadius: 3,
    overflow: 'hidden',
  },
  touchBarFill: {
    height: '100%',
    borderRadius: 3,
  },
  touchLabel: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  insightCard: {
    backgroundColor: '#1F2937',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  insightTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  insightValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#60A5FA',
    marginBottom: 8,
  },
  insightDescription: {
    fontSize: 13,
    color: '#9CA3AF',
    lineHeight: 18,
  },
});
