/**
 * @copyright Copyright (c) 2026 Kaytx & Antigravity Ecosystem ("kaytx")
 * @license MIT - See LICENSE file for full terms
 */

import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Search, Brain, FileText, Network, Users, Settings, TrendingUp, BookOpen } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function CompanyBrainIndex() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const features = [
    {
      id: 'dashboard',
      title: 'Knowledge Dashboard',
      description: 'Overview of your company\'s knowledge base',
      icon: Brain,
      route: '/company-brain/dashboard',
      color: '#6366f1',
    },
    {
      id: 'search',
      title: 'Search',
      description: 'Find information across all knowledge sources',
      icon: Search,
      route: '/company-brain/search',
      color: '#8b5cf6',
    },
    {
      id: 'documents',
      title: 'Documents',
      description: 'Upload and manage knowledge documents',
      icon: FileText,
      route: '/company-brain/documents',
      color: '#06b6d4',
    },
    {
      id: 'graph',
      title: 'Knowledge Graph',
      description: 'Visualize connections between knowledge',
      icon: Network,
      route: '/company-brain/graph',
      color: '#10b981',
    },
    {
      id: 'onboarding',
      title: 'Onboarding',
      description: 'Guide new hires through company knowledge',
      icon: BookOpen,
      route: '/company-brain/onboarding',
      color: '#f59e0b',
    },
    {
      id: 'team',
      title: 'Team Knowledge',
      description: 'Team-specific knowledge bases',
      icon: Users,
      route: '/company-brain/team',
      color: '#ef4444',
    },
    {
      id: 'analytics',
      title: 'Analytics',
      description: 'Knowledge health and usage metrics',
      icon: TrendingUp,
      route: '/company-brain/analytics',
      color: '#ec4899',
    },
    {
      id: 'settings',
      title: 'Settings',
      description: 'Configure integrations and preferences',
      icon: Settings,
      route: '/company-brain/settings',
      color: '#64748b',
    },
  ];

  return (
    <ScrollView 
      style={[styles.container, { paddingTop: insets.top }]}
      contentContainerStyle={[styles.contentContainer, { paddingBottom: insets.bottom + 20 }]}
    >
      <View style={styles.header}>
        <Brain size={48} color="#6366f1" strokeWidth={2} />
        <Text style={styles.title}>Company Brain</Text>
        <Text style={styles.subtitle}>Your Company's Collective Intelligence, Preserved and Accessible</Text>
      </View>

      <View style={styles.grid}>
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <TouchableOpacity
              key={feature.id}
              style={[styles.card, { borderLeftColor: feature.color }]}
              onPress={() => router.push(feature.route as any)}
              activeOpacity={0.7}
            >
              <View style={[styles.iconContainer, { backgroundColor: `${feature.color}20` }]}>
                <Icon size={32} color={feature.color} strokeWidth={2} />
              </View>
              <Text style={styles.cardTitle}>{feature.title}</Text>
              <Text style={styles.cardDescription}>{feature.description}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  contentContainer: {
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
    paddingTop: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#94a3b8',
    marginTop: 8,
    textAlign: 'center',
    paddingHorizontal: 20,
    lineHeight: 24,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    color: '#94a3b8',
    lineHeight: 20,
  },
});
