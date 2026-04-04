import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Stack, router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Brain, Shield, Sparkles, ArrowLeft, Search, Bookmark, Target, Handshake, Users } from 'lucide-react-native';

import { useTheme } from '@/providers/ThemeProvider';

type MemoryType = 'customer' | 'deal' | 'objection' | 'outcome' | 'team';

interface MemoryItem {
  id: string;
  type: MemoryType;
  title: string;
  summary: string;
  confidence: number;
  lastUpdatedAt: string;
  tags: string[];
}

const TYPE_META: Record<MemoryType, { label: string; icon: any; color: string }> = {
  customer: { label: 'Customer', icon: Users, color: '#007AFF' },
  deal: { label: 'Deal', icon: Target, color: '#34C759' },
  objection: { label: 'Objection', icon: Handshake, color: '#FF3B30' },
  outcome: { label: 'Outcome', icon: Bookmark, color: '#FF9500' },
  team: { label: 'Team', icon: Shield, color: '#5856D6' },
};

const MOCK_MEMORIES: MemoryItem[] = [
  {
    id: 'mem-1',
    type: 'customer',
    title: 'Acme Corp — VP Ops: “Speed matters most”',
    summary: 'Prefers short, bullet-point updates. Likes weekly rollups on Fridays. Avoid long decks.',
    confidence: 0.86,
    lastUpdatedAt: '2026-01-12T18:30:00.000Z',
    tags: ['tone:direct', 'cadence:weekly', 'persona:ops'],
  },
  {
    id: 'mem-2',
    type: 'deal',
    title: 'Deal #4821 — Pricing sensitivity on per-seat',
    summary: 'Accepted annual commitment if onboarding included. Push back on per-seat expansion.',
    confidence: 0.78,
    lastUpdatedAt: '2026-01-09T10:05:00.000Z',
    tags: ['pricing', 'annual', 'onboarding'],
  },
  {
    id: 'mem-3',
    type: 'objection',
    title: '“We already use HubSpot” objection pattern',
    summary: 'Respond best with “augment, don’t replace”: connect, unify inbox, keep workflows intact.',
    confidence: 0.91,
    lastUpdatedAt: '2026-01-10T13:15:00.000Z',
    tags: ['crm', 'integration', 'positioning'],
  },
  {
    id: 'mem-4',
    type: 'outcome',
    title: 'Follow-up within 2 hours increases reply rate',
    summary: 'When response time <2h after demo, replies increase ~1.6x. Trigger auto follow-ups.',
    confidence: 0.73,
    lastUpdatedAt: '2026-01-06T09:20:00.000Z',
    tags: ['sla', 'followup', 'automation'],
  },
];

export default function MemoryContextScreen() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();

  const [query, setQuery] = useState<string>('');
  const [selectedType, setSelectedType] = useState<MemoryType | 'all'>('all');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return MOCK_MEMORIES.filter((m) => {
      const typeOk = selectedType === 'all' ? true : m.type === selectedType;
      if (!typeOk) return false;
      if (!q) return true;
      const hay = `${m.title} ${m.summary} ${m.tags.join(' ')}`.toLowerCase();
      return hay.includes(q);
    });
  }, [query, selectedType]);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}> 
      <Stack.Screen
        options={{
          title: 'Memory & Context',
          headerStyle: { backgroundColor: theme.colors.background },
          headerTitleStyle: { color: theme.colors.text },
          headerTintColor: theme.colors.text,
        }}
      />

      <View style={[styles.hero, { paddingTop: 14 }]}> 
        <View style={[styles.heroIcon, { backgroundColor: theme.colors.primary + '18' }]}> 
          <Brain size={26} color={theme.colors.primary} />
        </View>
        <View style={styles.heroText}>
          <Text style={[styles.heroTitle, { color: theme.colors.text }]}>Compounding memory layer</Text>
          <Text style={[styles.heroSubtitle, { color: theme.colors.secondaryText }]}>Remembers customers, deals, objections, and outcomes across all agents.</Text>
        </View>
        <TouchableOpacity
          style={[styles.backPill, { backgroundColor: theme.colors.cardBackground }]}
          onPress={() => (router.canGoBack() ? router.back() : router.replace('/(tabs)/ai-assistant'))}
          testID="memoryContext.back"
        >
          <ArrowLeft size={18} color={theme.colors.text} />
          <Text style={[styles.backPillText, { color: theme.colors.text }]}>Back</Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.searchRow, { paddingTop: 8, paddingBottom: 10, paddingHorizontal: 16 }]}> 
        <View style={[styles.searchBox, { backgroundColor: theme.colors.cardBackground, borderColor: theme.colors.border }]}> 
          <Search size={16} color={theme.colors.secondaryText} />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search memory…"
            placeholderTextColor={theme.colors.secondaryText}
            style={[styles.searchInput, { color: theme.colors.text }]}
            testID="memoryContext.search"
          />
        </View>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chipsContainer}
        style={{ paddingHorizontal: 16 }}
      >
        {(['all', 'customer', 'deal', 'objection', 'outcome', 'team'] as const).map((t) => {
          const isSelected = selectedType === t;
          const meta = t === 'all' ? { label: 'All', icon: Sparkles, color: theme.colors.primary } : TYPE_META[t];
          const Icon = meta.icon;
          return (
            <TouchableOpacity
              key={t}
              onPress={() => setSelectedType(t)}
              style={[
                styles.chip,
                {
                  backgroundColor: isSelected ? meta.color : theme.colors.cardBackground,
                  borderColor: isSelected ? meta.color : theme.colors.border,
                },
              ]}
              testID={`memoryContext.chip.${t}`}
            >
              <Icon size={14} color={isSelected ? '#FFFFFF' : meta.color} />
              <Text style={[styles.chipText, { color: isSelected ? '#FFFFFF' : theme.colors.text }]}>{meta.label}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 + insets.bottom }}
      >
        <View style={[styles.noticeCard, { backgroundColor: theme.colors.cardBackground, borderColor: theme.colors.border }]}> 
          <Shield size={18} color={theme.colors.primary} />
          <Text style={[styles.noticeText, { color: theme.colors.secondaryText }]}>This is a UI surface for “memory & context”. Wire it to your storage/LLM later.</Text>
        </View>

        {filtered.length === 0 ? (
          <View style={[styles.empty, { backgroundColor: theme.colors.cardBackground, borderColor: theme.colors.border }]}> 
            <Text style={[styles.emptyTitle, { color: theme.colors.text }]}>No memories found</Text>
            <Text style={[styles.emptySub, { color: theme.colors.secondaryText }]}>Try a different search or category.</Text>
          </View>
        ) : (
          filtered.map((m) => {
            const meta = TYPE_META[m.type];
            const Icon = meta.icon;
            const confidencePct = Math.round(m.confidence * 100);
            return (
              <View
                key={m.id}
                style={[styles.card, { backgroundColor: theme.colors.cardBackground, borderColor: theme.colors.border }]}
                testID={`memoryContext.card.${m.id}`}
              >
                <View style={styles.cardTop}>
                  <View style={[styles.typePill, { backgroundColor: meta.color + '20' }]}> 
                    <Icon size={14} color={meta.color} />
                    <Text style={[styles.typePillText, { color: meta.color }]}>{meta.label}</Text>
                  </View>
                  <Text style={[styles.confidence, { color: theme.colors.secondaryText }]}>{confidencePct}%</Text>
                </View>

                <Text style={[styles.cardTitle, { color: theme.colors.text }]} numberOfLines={2}>
                  {m.title}
                </Text>
                <Text style={[styles.cardSummary, { color: theme.colors.secondaryText }]} numberOfLines={3}>
                  {m.summary}
                </Text>

                <View style={styles.tagsRow}>
                  {m.tags.slice(0, 4).map((tag) => (
                    <View key={tag} style={[styles.tag, { backgroundColor: theme.colors.background }]}> 
                      <Text style={[styles.tagText, { color: theme.colors.secondaryText }]}>{tag}</Text>
                    </View>
                  ))}
                </View>

                <Text style={[styles.updated, { color: theme.colors.secondaryText }]}>
                  Updated {new Date(m.lastUpdatedAt).toLocaleDateString()}
                </Text>
              </View>
            );
          })
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  hero: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  heroIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroText: { flex: 1 },
  heroTitle: {
    fontSize: 16,
    fontWeight: '700' as const,
    letterSpacing: -0.2,
  },
  heroSubtitle: {
    marginTop: 2,
    fontSize: 12,
    lineHeight: 16,
  },
  backPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 999,
  },
  backPillText: {
    fontSize: 13,
    fontWeight: '600' as const,
  },
  searchRow: {},
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 14,
    borderWidth: 1,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    paddingVertical: 0,
  },
  chipsContainer: {
    paddingVertical: 10,
    gap: 10,
    paddingRight: 12,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 999,
    borderWidth: 1,
  },
  chipText: {
    fontSize: 13,
    fontWeight: '600' as const,
  },
  noticeCard: {
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 10,
    marginBottom: 12,
  },
  noticeText: {
    flex: 1,
    fontSize: 12,
    lineHeight: 16,
  },
  empty: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 18,
    marginTop: 10,
  },
  emptyTitle: {
    fontSize: 15,
    fontWeight: '700' as const,
  },
  emptySub: {
    marginTop: 6,
    fontSize: 12,
    lineHeight: 16,
  },
  card: {
    borderWidth: 1,
    borderRadius: 18,
    padding: 16,
    marginTop: 12,
  },
  cardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  typePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  typePillText: {
    fontSize: 12,
    fontWeight: '700' as const,
  },
  confidence: {
    fontSize: 12,
    fontWeight: '700' as const,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '800' as const,
    letterSpacing: -0.2,
  },
  cardSummary: {
    marginTop: 8,
    fontSize: 13,
    lineHeight: 18,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 12,
  },
  tag: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  tagText: {
    fontSize: 11,
    fontWeight: '600' as const,
  },
  updated: {
    marginTop: 12,
    fontSize: 11,
  },
});
